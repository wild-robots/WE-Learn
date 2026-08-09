import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from 'react';
import type { User, Bubble } from '../types';
import { supabase } from '../lib/supabase';
import * as api from '../data/api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppContextValue {
  // Auth
  currentUser: User | null;
  isLoggedIn: boolean;
  authReady: boolean;               // false until the initial session check completes
  login: () => void;                // starts the Google sign-in redirect
  logout: () => Promise<void>;

  // Bubbles
  bubbles: Bubble[];
  bubblesLoading: boolean;
  refreshBubbles: () => Promise<void>;
  loadBubbleDetail: (bubbleId: string) => Promise<void>;
  createBubble: (input: api.CreateBubbleInput) => Promise<string>;
  updateBubble: (id: string, patch: Partial<Bubble>) => void;
  deleteBubble: (id: string) => void;

  // Join / Leave
  joinBubble: (bubbleId: string) => Promise<'joined' | 'waitlisted'>;
  leaveBubble: (bubbleId: string) => Promise<void>;
  isJoined: (bubbleId: string) => boolean;
  isFounder: (bubbleId: string) => boolean;

  // Recently viewed (for smart search)
  recentBubbleIds: string[];
  addRecentBubble: (bubbleId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

const RECENT_KEY = 'welearn_recent';

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [bubblesLoading, setBubblesLoading] = useState(true);
  const [recentBubbleIds, setRecentBubbleIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentBubbleIds));
  }, [recentBubbleIds]);

  const refreshBubbles = useCallback(async (signedIn?: boolean) => {
    setBubblesLoading(true);
    try {
      const authed = signedIn ?? !!(await supabase.auth.getSession()).data.session;
      const fresh = await api.fetchBubbles(authed);
      // Preserve already-loaded details (sessions/resources) across refreshes.
      setBubbles(prev => fresh.map(b => {
        const old = prev.find(p => p.id === b.id);
        return old?.detailLoaded
          ? { ...b, sessions: old.sessions, resources: old.resources, detailLoaded: true }
          : b;
      }));
    } catch (err) {
      console.error('Failed to load bubbles', err);
    } finally {
      setBubblesLoading(false);
    }
  }, []);

  // ─── Auth lifecycle ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function syncUser(signedIn: boolean) {
      const user = signedIn ? await api.fetchCurrentUser() : null;
      if (cancelled) return;
      setCurrentUser(user);
      setAuthReady(true);
      refreshBubbles(signedIn);
    }

    supabase.auth.getSession().then(({ data: { session } }) => syncUser(!!session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        supabase.auth.getSession().then(({ data: { session } }) => syncUser(!!session));
      }
    });

    return () => { cancelled = true; subscription.unsubscribe(); };
  }, [refreshBubbles]);

  // ─── Auth actions ──────────────────────────────────────────────────────────

  function login() {
    // Redirects the browser to Google; the page navigates away and back.
    api.signInWithGoogle().catch(err => console.error('Sign-in failed', err));
  }

  async function logout() {
    await api.signOut();
    setCurrentUser(null);
    refreshBubbles(false);
  }

  // ─── Bubble data ───────────────────────────────────────────────────────────

  const loadBubbleDetail = useCallback(async (bubbleId: string) => {
    try {
      const { sessions, resources } = await api.fetchBubbleDetail(bubbleId);
      setBubbles(bs => bs.map(b =>
        b.id === bubbleId ? { ...b, sessions, resources, detailLoaded: true } : b,
      ));
    } catch (err) {
      // Signed-out visitors can't read syllabus/resources — that's by design.
      console.warn('Bubble detail unavailable', err);
    }
  }, []);

  async function createBubble(input: api.CreateBubbleInput): Promise<string> {
    const id = await api.createBubble(input);
    // Reload so the new bubble (and my membership in it) appears everywhere.
    await Promise.all([
      refreshBubbles(true),
      api.fetchCurrentUser().then(u => setCurrentUser(u)),
    ]);
    return id;
  }

  function updateBubble(id: string, patch: Partial<Bubble>) {
    // Optimistic local update…
    setBubbles(bs => bs.map(b => (b.id === id ? { ...b, ...patch } : b)));
    // …then persist the editable fields. RLS guarantees only the founder succeeds.
    api.updateBubbleRow(id, {
      title: patch.title,
      description: patch.description,
      scheduleDay: patch.scheduleDay,
      scheduleTime: patch.scheduleTime,
      status: patch.status,
      maxSeats: patch.maxSeats,
      heroImage: patch.heroImage,
    }).catch(err => {
      console.error('Failed to save bubble', err);
      refreshBubbles(); // roll back to server truth
    });
  }

  function deleteBubble(id: string) {
    setBubbles(bs => bs.filter(b => b.id !== id));
    api.deleteBubbleRow(id).catch(err => {
      console.error('Failed to delete bubble', err);
      refreshBubbles();
    });
  }

  // ─── Membership ────────────────────────────────────────────────────────────

  async function joinBubble(bubbleId: string): Promise<'joined' | 'waitlisted'> {
    const outcome = await api.joinBubbleRpc(bubbleId);
    if (outcome === 'joined') {
      setCurrentUser(u => u
        ? { ...u, joinedBubbles: [...new Set([...u.joinedBubbles, bubbleId])] }
        : u);
    }
    refreshBubbles(true);
    return outcome;
  }

  async function leaveBubble(bubbleId: string) {
    await api.leaveBubbleApi(bubbleId);
    setCurrentUser(u => u
      ? { ...u, joinedBubbles: u.joinedBubbles.filter(id => id !== bubbleId) }
      : u);
    refreshBubbles(true);
  }

  function isJoined(bubbleId: string): boolean {
    return currentUser?.joinedBubbles.includes(bubbleId) ?? false;
  }

  function isFounder(bubbleId: string): boolean {
    if (!currentUser) return false;
    const bubble = bubbles.find(b => b.id === bubbleId);
    return bubble?.founderId === currentUser.id;
  }

  function addRecentBubble(bubbleId: string) {
    setRecentBubbleIds(ids => [bubbleId, ...ids.filter(id => id !== bubbleId)].slice(0, 5));
  }

  return (
    <AppContext.Provider value={{
      currentUser, isLoggedIn: !!currentUser, authReady,
      login, logout,
      bubbles, bubblesLoading, refreshBubbles: () => refreshBubbles(),
      loadBubbleDetail, createBubble, updateBubble, deleteBubble,
      joinBubble, leaveBubble, isJoined, isFounder,
      recentBubbleIds, addRecentBubble,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
