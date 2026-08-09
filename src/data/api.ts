// ─────────────────────────────────────────────────────────────────────────────
// Data access layer: every read/write the app performs against Supabase.
// Maps database rows (snake_case) to the frontend types (camelCase) so the
// UI components stay unchanged. All permission enforcement happens in the
// database via Row Level Security — these functions just make requests.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from '../lib/supabase';
import type {
  Bubble, Member, Resource, Session, SessionSection, User, VideoEntry,
} from '../types';

// ─── Formatting helpers ──────────────────────────────────────────────────────

function fmtDate(iso: string | null): string {
  if (!iso) return 'TBD';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtMonthYear(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// ─── Row → frontend type mapping ─────────────────────────────────────────────

type ProfileRow = { id: string; name: string; avatar_url: string | null; title: string | null };

type MemberRow = {
  user_id: string; role: 'founder' | 'member'; joined_at: string;
  profiles: ProfileRow | null;
};

function mapMember(row: MemberRow): Member {
  return {
    id: row.user_id,
    name: row.profiles?.name ?? 'Member',
    role: row.role,
    avatar: row.profiles?.avatar_url ?? '',
    title: row.profiles?.title ?? '',
    joinDate: fmtMonthYear(row.joined_at),
    postCount: 0,
    online: false,
  };
}

type SectionRow = {
  id: string; session_id: string; type: SessionSection['type']; title: string;
  content: string | null; videos: VideoEntry[] | null; position: number;
  deleted_at: string | null;
};

function mapSection(row: SectionRow): SessionSection {
  const videos = Array.isArray(row.videos) ? row.videos : [];
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    content: row.content ?? undefined,
    videos,
    videoUrl: videos[0]?.url,
    videoTitle: videos[0]?.title,
  };
}

type SessionRow = {
  id: string; bubble_id: string; number: number; title: string;
  status: Session['status']; session_date: string | null; duration: number;
  xp: number; level: Session['level'] | null;
  project_url: string | null; reflection_note: string | null;
  confidence_rating: number | null; deleted_at: string | null;
  session_sections: SectionRow[];
};

function mapSession(row: SessionRow): Session {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    status: row.status,
    date: fmtDate(row.session_date),
    duration: row.duration,
    xp: row.xp,
    level: row.level ?? 'Beginner',
    sections: (row.session_sections ?? [])
      .filter(s => !s.deleted_at)
      .sort((a, b) => a.position - b.position)
      .map(mapSection),
    projectUrl: row.project_url ?? undefined,
    reflectionNote: row.reflection_note ?? undefined,
    confidenceRating: row.confidence_rating ?? undefined,
  };
}

type VoteRow = { resource_id: string; user_id: string; vote: 'up' | 'down' };

type ResourceRow = {
  id: string; bubble_id: string; type: Resource['type']; title: string;
  url: string | null; description: string; uploaded_by: string;
  watched: boolean; personal_rating: 'up' | 'down' | null; created_at: string;
};

function mapResource(row: ResourceRow, votes: VoteRow[]): Resource {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    url: row.url ?? '',
    description: row.description,
    uploadedById: row.uploaded_by,
    uploadedAt: fmtDate(row.created_at),
    watched: row.watched,
    personalRating: row.personal_rating,
    communityRatings: votes
      .filter(v => v.resource_id === row.id)
      .map(v => ({ userId: v.user_id, vote: v.vote })),
  };
}

type BubbleRow = {
  id: string; title: string; topic: string; description: string;
  level: Bubble['level']; status: Bubble['status'];
  max_seats: number; taken_seats: number;
  schedule_day: string; schedule_time: string; start_date: string | null;
  founder_id: string; hero_image: string | null;
};

function mapBubble(row: BubbleRow, members: Member[] = []): Bubble {
  return {
    id: row.id,
    title: row.title,
    topic: row.topic,
    description: row.description,
    level: row.level,
    status: row.status,
    maxSeats: row.max_seats,
    takenSeats: row.taken_seats,
    scheduleDay: row.schedule_day,
    scheduleTime: row.schedule_time,
    startDate: fmtDate(row.start_date),
    founderId: row.founder_id,
    memberIds: members.map(m => m.id),
    members,
    sessions: [],   // loaded lazily via fetchBubbleDetail
    resources: [],  // loaded lazily via fetchBubbleDetail
    heroImage: row.hero_image ?? undefined,
  };
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/** Load the signed-in user's profile + the bubble ids she belongs to. */
export async function fetchCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [{ data: profile }, { data: memberships }] = await Promise.all([
    supabase.from('profiles').select('id, name, avatar_url, title').eq('id', user.id).single(),
    supabase.from('bubble_members').select('bubble_id').eq('user_id', user.id),
  ]);

  return {
    id: user.id,
    name: profile?.name ?? user.email ?? 'Member',
    email: user.email ?? '',
    avatar: profile?.avatar_url ?? '',
    title: profile?.title ?? '',
    joinedBubbles: (memberships ?? []).map(m => m.bubble_id),
  };
}

export async function updateMyProfile(patch: { name?: string; title?: string }): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
  if (error) throw error;
}

// ─── Bubbles ─────────────────────────────────────────────────────────────────

/**
 * List all bubbles. Works signed-out (cards only, no member details —
 * that's the privacy model). When signed in, member lists are attached.
 */
export async function fetchBubbles(signedIn: boolean): Promise<Bubble[]> {
  const { data: rows, error } = await supabase
    .from('bubbles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;

  let membersByBubble = new Map<string, Member[]>();
  if (signedIn && rows && rows.length) {
    const { data: memberRows } = await supabase
      .from('bubble_members')
      .select('bubble_id, user_id, role, joined_at, profiles(id, name, avatar_url, title)');
    if (memberRows) {
      for (const r of memberRows as unknown as (MemberRow & { bubble_id: string })[]) {
        const list = membersByBubble.get(r.bubble_id) ?? [];
        list.push(mapMember(r));
        membersByBubble.set(r.bubble_id, list);
      }
    }
  }

  return (rows as BubbleRow[]).map(row =>
    mapBubble(row, membersByBubble.get(row.id) ?? []),
  );
}

/** Load one bubble's syllabus + resources (requires sign-in per security rules). */
export async function fetchBubbleDetail(bubbleId: string): Promise<{
  sessions: Session[]; resources: Resource[];
}> {
  const [sessionsRes, resourcesRes] = await Promise.all([
    supabase
      .from('sessions')
      .select('*, session_sections(*)')
      .eq('bubble_id', bubbleId)
      .is('deleted_at', null)
      .order('number', { ascending: true }),
    supabase
      .from('resources')
      .select('*')
      .eq('bubble_id', bubbleId)
      .order('created_at', { ascending: true }),
  ]);

  if (sessionsRes.error) throw sessionsRes.error;
  // resources may be blocked for non-members — that's expected, not an error
  const resourceRows = (resourcesRes.data ?? []) as ResourceRow[];

  let votes: VoteRow[] = [];
  if (resourceRows.length) {
    const { data: voteRows } = await supabase
      .from('resource_votes')
      .select('resource_id, user_id, vote')
      .in('resource_id', resourceRows.map(r => r.id));
    votes = (voteRows ?? []) as VoteRow[];
  }

  return {
    sessions: (sessionsRes.data as SessionRow[]).map(mapSession),
    resources: resourceRows.map(r => mapResource(r, votes)),
  };
}

export interface CreateBubbleInput {
  title: string; topic: string; description: string;
  level: Bubble['level']; maxSeats: number;
  scheduleDay: string; scheduleTime: string;
  startDate?: string | null; heroImage?: string | null;
  sessions?: Array<{
    number: number; title: string; level?: Session['level'];
    date?: string | null;
    sections: Array<{ type: SessionSection['type']; title: string; content?: string; videos?: VideoEntry[] }>;
  }>;
}

/** Create a bubble (+ founder membership) and optionally its syllabus. */
export async function createBubble(input: CreateBubbleInput): Promise<string> {
  const { data: bubbleId, error } = await supabase.rpc('create_bubble', {
    p_title: input.title,
    p_topic: input.topic,
    p_description: input.description,
    p_level: input.level,
    p_max_seats: input.maxSeats,
    p_schedule_day: input.scheduleDay,
    p_schedule_time: input.scheduleTime,
    p_start_date: input.startDate ?? null,
    p_hero_image: input.heroImage ?? null,
  });
  if (error) throw error;

  if (input.sessions?.length) {
    const { data: sessionRows, error: sErr } = await supabase
      .from('sessions')
      .insert(input.sessions.map((s, i) => ({
        bubble_id: bubbleId,
        number: s.number ?? i + 1,
        title: s.title,
        status: i === 0 ? 'in-progress' : 'locked',
        level: s.level ?? input.level,
        session_date: s.date ?? null,
      })))
      .select('id, number');
    if (sErr) throw sErr;

    const sectionInserts = input.sessions.flatMap(s => {
      const dbSession = sessionRows!.find(r => r.number === s.number);
      if (!dbSession) return [];
      return s.sections.map((sec, i) => ({
        session_id: dbSession.id,
        type: sec.type,
        title: sec.title,
        content: sec.content ?? null,
        videos: sec.videos ?? [],
        position: i,
      }));
    });
    if (sectionInserts.length) {
      const { error: secErr } = await supabase.from('session_sections').insert(sectionInserts);
      if (secErr) throw secErr;
    }
  }

  return bubbleId as string;
}

export async function updateBubbleRow(id: string, patch: Partial<{
  title: string; description: string; scheduleDay: string; scheduleTime: string;
  status: Bubble['status']; maxSeats: number; heroImage: string;
}>): Promise<void> {
  const row: Record<string, unknown> = {};
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.scheduleDay !== undefined) row.schedule_day = patch.scheduleDay;
  if (patch.scheduleTime !== undefined) row.schedule_time = patch.scheduleTime;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.maxSeats !== undefined) row.max_seats = patch.maxSeats;
  if (patch.heroImage !== undefined) row.hero_image = patch.heroImage;
  if (!Object.keys(row).length) return;
  const { error } = await supabase.from('bubbles').update(row).eq('id', id);
  if (error) throw error;
}

export async function deleteBubbleRow(id: string): Promise<void> {
  const { error } = await supabase.from('bubbles').delete().eq('id', id);
  if (error) throw error;
}

// ─── Membership ──────────────────────────────────────────────────────────────

/** Join a bubble. Returns 'joined' or 'waitlisted' (decided server-side). */
export async function joinBubbleRpc(bubbleId: string): Promise<'joined' | 'waitlisted'> {
  const { data, error } = await supabase.rpc('join_bubble', { target_bubble: bubbleId });
  if (error) throw error;
  return data as 'joined' | 'waitlisted';
}

export async function leaveBubbleApi(bubbleId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { error } = await supabase
    .from('bubble_members')
    .delete()
    .eq('bubble_id', bubbleId)
    .eq('user_id', user.id);
  if (error) throw error;
}

export async function removeMember(bubbleId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('bubble_members')
    .delete()
    .eq('bubble_id', bubbleId)
    .eq('user_id', userId);
  if (error) throw error;
}

// ─── Syllabus persistence ────────────────────────────────────────────────────

export async function createSessionRow(bubbleId: string, s: {
  number: number; title: string; status?: Session['status'];
  level?: Session['level']; date?: string | null; xp?: number; duration?: number;
}): Promise<string> {
  const { data, error } = await supabase
    .from('sessions')
    .insert({
      bubble_id: bubbleId,
      number: s.number,
      title: s.title,
      status: s.status ?? 'locked',
      level: s.level ?? null,
      session_date: s.date ?? null,
      xp: s.xp ?? 150,
      duration: s.duration ?? 90,
    })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateSessionRow(id: string, patch: Partial<{
  number: number; title: string; status: Session['status'];
  level: Session['level']; projectUrl: string | null;
  reflectionNote: string | null; confidenceRating: number | null;
}>): Promise<void> {
  const row: Record<string, unknown> = {};
  if (patch.number !== undefined) row.number = patch.number;
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.level !== undefined) row.level = patch.level;
  if (patch.projectUrl !== undefined) row.project_url = patch.projectUrl;
  if (patch.reflectionNote !== undefined) row.reflection_note = patch.reflectionNote;
  if (patch.confidenceRating !== undefined) row.confidence_rating = patch.confidenceRating;
  if (!Object.keys(row).length) return;
  const { error } = await supabase.from('sessions').update(row).eq('id', id);
  if (error) throw error;
}

/** Soft-delete (sets deleted_at) — supports the 5-second undo. */
export async function softDeleteSession(id: string): Promise<void> {
  const { error } = await supabase
    .from('sessions')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreSession(id: string): Promise<void> {
  const { error } = await supabase.from('sessions').update({ deleted_at: null }).eq('id', id);
  if (error) throw error;
}

/** Persist new session numbering after move/duplicate/delete reflows. */
export async function renumberSessions(ordered: Array<{ id: string; number: number }>): Promise<void> {
  await Promise.all(
    ordered.map(s =>
      supabase.from('sessions').update({ number: s.number }).eq('id', s.id),
    ),
  );
}

export async function createSectionRow(sessionId: string, sec: {
  type: SessionSection['type']; title: string; content?: string;
  videos?: VideoEntry[]; position: number;
}): Promise<string> {
  const { data, error } = await supabase
    .from('session_sections')
    .insert({
      session_id: sessionId,
      type: sec.type,
      title: sec.title,
      content: sec.content ?? null,
      videos: sec.videos ?? [],
      position: sec.position,
    })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateSectionRow(id: string, patch: Partial<{
  title: string; content: string | null; videos: VideoEntry[]; position: number;
}>): Promise<void> {
  const row: Record<string, unknown> = {};
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.content !== undefined) row.content = patch.content;
  if (patch.videos !== undefined) row.videos = patch.videos;
  if (patch.position !== undefined) row.position = patch.position;
  if (!Object.keys(row).length) return;
  const { error } = await supabase.from('session_sections').update(row).eq('id', id);
  if (error) throw error;
}

export async function softDeleteSection(id: string): Promise<void> {
  const { error } = await supabase
    .from('session_sections')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function restoreSection(id: string): Promise<void> {
  const { error } = await supabase
    .from('session_sections')
    .update({ deleted_at: null })
    .eq('id', id);
  if (error) throw error;
}

// ─── Resources ───────────────────────────────────────────────────────────────

export async function addResourceRow(bubbleId: string, r: {
  type: Resource['type']; title: string; url: string; description: string;
  watched: boolean; personalRating: 'up' | 'down' | null;
}): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  const { data, error } = await supabase
    .from('resources')
    .insert({
      bubble_id: bubbleId,
      type: r.type,
      title: r.title,
      url: r.url || null,
      description: r.description,
      uploaded_by: user.id,
      watched: r.watched,
      personal_rating: r.personalRating,
    })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateResourceRow(id: string, patch: Partial<{
  title: string; url: string; description: string; type: Resource['type'];
  watched: boolean; personalRating: 'up' | 'down' | null;
}>): Promise<void> {
  const row: Record<string, unknown> = {};
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.url !== undefined) row.url = patch.url || null;
  if (patch.description !== undefined) row.description = patch.description;
  if (patch.type !== undefined) row.type = patch.type;
  if (patch.watched !== undefined) row.watched = patch.watched;
  if (patch.personalRating !== undefined) row.personal_rating = patch.personalRating;
  if (!Object.keys(row).length) return;
  const { error } = await supabase.from('resources').update(row).eq('id', id);
  if (error) throw error;
}

export async function deleteResourceRow(id: string): Promise<void> {
  const { error } = await supabase.from('resources').delete().eq('id', id);
  if (error) throw error;
}

/** Cast/replace/remove my vote on a resource. Pass null to remove. */
export async function voteOnResource(resourceId: string, vote: 'up' | 'down' | null): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  if (vote === null) {
    const { error } = await supabase
      .from('resource_votes')
      .delete()
      .eq('resource_id', resourceId)
      .eq('user_id', user.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('resource_votes')
      .upsert({ resource_id: resourceId, user_id: user.id, vote });
    if (error) throw error;
  }
}
