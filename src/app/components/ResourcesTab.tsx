import { useState } from "react";
import {
  Video, FileText, Book, Wrench, Mic, Paperclip,
  ThumbsUp, ThumbsDown, ExternalLink, CheckCircle2,
  Pencil, Trash2, GripVertical, Plus, X,
} from "lucide-react";
import type { Bubble, Resource, ResourceType } from "../../types";
import { useApp } from "../../context/AppContext";
import { getMemberById } from "../../data/mock";

// ─── Config ───────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<ResourceType, { icon: typeof Video; label: string }> = {
  video:   { icon: Video,     label: 'Video'   },
  article: { icon: FileText,  label: 'Article' },
  book:    { icon: Book,      label: 'Book'    },
  tool:    { icon: Wrench,    label: 'Tool'    },
  podcast: { icon: Mic,       label: 'Podcast' },
  other:   { icon: Paperclip, label: 'Other'   },
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  bubble: Bubble;
  isFounder: boolean;
}

// ─── Resource Card ────────────────────────────────────────────────────────────

function ResourceCard({
  resource,
  canDelete,
  canEdit,
  editMode,
  onDelete,
  onVote,
  dragHandleProps,
}: {
  resource: Resource;
  canDelete: boolean;
  canEdit: boolean;
  editMode?: boolean;
  onDelete: () => void;
  onVote: (vote: 'up' | 'down') => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const cfg = TYPE_CONFIG[resource.type];
  const TypeIcon = cfg.icon;
  const upCount   = resource.communityRatings.filter(r => r.vote === 'up').length;
  const downCount = resource.communityRatings.filter(r => r.vote === 'down').length;
  const uploader  = getMemberById(resource.uploadedById);

  return (
    <div className="bg-white rounded-xl p-4 flex gap-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
      {/* Drag handle */}
      {editMode && (
        <div {...dragHandleProps} className="self-center shrink-0 cursor-grab active:cursor-grabbing text-[#ADB5BD] hover:text-[#495057]" title="Drag to reorder">
          <GripVertical className="size-4" strokeWidth={1.75} />
        </div>
      )}

      {/* Type icon */}
      <div className="size-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
        <TypeIcon className="size-5 text-[#2BBFAA]" strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[15px] text-[#212529] hover:text-[#2BBFAA] transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {resource.title}
              <ExternalLink className="size-3.5 opacity-50" strokeWidth={1.75} />
            </a>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-[#ADB5BD] bg-[#F8F9FA] px-2 py-0.5 rounded-full"
                style={{ fontFamily: 'var(--font-body)' }}>
                {cfg.label}
              </span>
              {resource.watched && (
                <span className="inline-flex items-center gap-1 text-[11px] text-[#40C057]" style={{ fontFamily: 'var(--font-body)' }}>
                  <CheckCircle2 className="size-3" strokeWidth={2} /> Verified by uploader
                </span>
              )}
            </div>
          </div>

          {/* Delete */}
          {(canDelete || editMode) && (
            <button
              onClick={onDelete}
              className="shrink-0 text-[#ADB5BD] hover:text-[#FA5252] transition-colors"
              title="Delete resource"
            >
              <Trash2 className="size-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <p className="text-[13px] text-[#6C757D] mt-2 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          {resource.description}
        </p>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          {/* Uploader */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#ADB5BD]"
            style={{ fontFamily: 'var(--font-body)' }}>
            {uploader && <img src={uploader.avatar} alt="" className="size-4 rounded-full object-cover" />}
            Shared by {uploader?.name ?? 'Unknown'} · {resource.uploadedAt}
          </div>

          {/* Community ratings */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onVote('up')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] hover:bg-[#E8F9F7] transition-colors"
              style={{ fontFamily: 'var(--font-body)', color: upCount > 0 ? '#2BBFAA' : '#6C757D' }}
            >
              <ThumbsUp className="size-3.5" strokeWidth={1.75} /> {upCount}
            </button>
            <button
              onClick={() => onVote('down')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] hover:bg-[#FEE2E2] transition-colors"
              style={{ fontFamily: 'var(--font-body)', color: downCount > 0 ? '#FA5252' : '#6C757D' }}
            >
              <ThumbsDown className="size-3.5" strokeWidth={1.75} /> {downCount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Upload Form ──────────────────────────────────────────────────────────────

function UploadForm({ onSubmit }: { onSubmit: (r: Omit<Resource, 'id' | 'communityRatings'>) => void }) {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);
  const [url, setUrl]   = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ResourceType>('article');
  const [desc, setDesc] = useState('');
  const [watched, setWatched] = useState(false);
  const [rating, setRating] = useState<'up' | 'down' | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url || !title) return;
    onSubmit({
      type, title, url, description: desc,
      uploadedById: currentUser?.id ?? 'user-me',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      watched, personalRating: rating,
    });
    setUrl(''); setTitle(''); setDesc(''); setWatched(false); setRating(null);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[#A8E8E2] text-[#2BBFAA] hover:bg-[#E8F9F7] transition-colors text-[14px] font-medium"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <Plus className="size-4" strokeWidth={2} />
        Share a resource with the group
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 flex flex-col gap-4"
      style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[16px] text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
          Share a resource
        </p>
        <button type="button" onClick={() => setOpen(false)} className="text-[#ADB5BD] hover:text-[#495057]">
          <X className="size-5" strokeWidth={1.75} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
            URL *
          </label>
          <input
            type="url" value={url} onChange={e => setUrl(e.target.value)} required
            placeholder="https://..."
            className="px-3 py-2 rounded-lg border border-[#E9ECEF] text-[14px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA]"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
            Title *
          </label>
          <input
            type="text" value={title} onChange={e => setTitle(e.target.value)} required
            placeholder="Resource title"
            className="px-3 py-2 rounded-lg border border-[#E9ECEF] text-[14px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA]"
            style={{ fontFamily: 'var(--font-body)' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_CONFIG) as ResourceType[]).map(t => {
            const Icon = TYPE_CONFIG[t].icon;
            return (
              <button
                key={t} type="button"
                onClick={() => setType(t)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] transition-colors border"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: type === t ? '#E8F9F7' : 'white',
                  borderColor: type === t ? '#A8E8E2' : '#E9ECEF',
                  color: type === t ? '#1FA090' : '#6C757D',
                  fontWeight: type === t ? 600 : 400,
                }}
              >
                <Icon className="size-3.5" strokeWidth={1.75} /> {TYPE_CONFIG[t].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
          Short description
        </label>
        <textarea
          value={desc} onChange={e => setDesc(e.target.value)} rows={2}
          placeholder="Why are you sharing this? What's it about?"
          className="px-3 py-2 rounded-lg border border-[#E9ECEF] text-[14px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA] resize-none"
          style={{ fontFamily: 'var(--font-body)' }}
        />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 text-[13px] text-[#495057]"
          style={{ fontFamily: 'var(--font-body)' }}>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={watched} onChange={e => setWatched(e.target.checked)}
              className="size-4 accent-[#2BBFAA]" />
            I've watched / read it
          </label>
        </div>

        <div className="flex items-center gap-2 text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
          <span className="text-[#6C757D]">Your rating:</span>
          <button type="button" onClick={() => setRating(r => r === 'up' ? null : 'up')}
            className={`px-3 py-1.5 rounded-full border transition-colors ${rating === 'up' ? 'bg-[#E8F9F7] border-[#A8E8E2] text-[#2BBFAA]' : 'border-[#E9ECEF] text-[#6C757D]'}`}>
            <ThumbsUp className="size-3.5" strokeWidth={1.75} />
          </button>
          <button type="button" onClick={() => setRating(r => r === 'down' ? null : 'down')}
            className={`px-3 py-1.5 rounded-full border transition-colors ${rating === 'down' ? 'bg-[#FEE2E2] border-[#FCA5A5] text-[#FA5252]' : 'border-[#E9ECEF] text-[#6C757D]'}`}>
            <ThumbsDown className="size-3.5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 justify-end pt-1">
        <button type="button" onClick={() => setOpen(false)}
          className="px-4 py-2 rounded-xl text-[13px] text-[#6C757D] hover:bg-neutral-50"
          style={{ fontFamily: 'var(--font-body)' }}>
          Cancel
        </button>
        <button type="submit"
          className="px-5 py-2 rounded-xl bg-[#2BBFAA] text-white text-[13px] font-semibold hover:bg-[#1FA090] transition-colors"
          style={{ fontFamily: 'var(--font-body)' }}>
          Share resource
        </button>
      </div>
    </form>
  );
}

// ─── ResourcesTab ─────────────────────────────────────────────────────────────

export function ResourcesTab({ bubble, isFounder }: Props) {
  const { currentUser } = useApp();
  const [resources, setResources] = useState<Resource[]>(bubble.resources);
  const [filter, setFilter] = useState<ResourceType | 'all'>('all');
  const [editMode, setEditMode] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const filtered = resources.filter(r => filter === 'all' || r.type === filter);

  function addResource(partial: Omit<Resource, 'id' | 'communityRatings'>) {
    setResources(rs => [{
      ...partial,
      id: `r-${Date.now()}`,
      communityRatings: [],
    }, ...rs]);
  }

  function deleteResource(id: string) {
    setResources(rs => rs.filter(r => r.id !== id));
  }

  function moveResource(dragged: string, target: string) {
    if (dragged === target) return;
    setResources(rs => {
      const next = [...rs];
      const from = next.findIndex(r => r.id === dragged);
      const to = next.findIndex(r => r.id === target);
      if (from === -1 || to === -1) return rs;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function vote(resourceId: string, vote: 'up' | 'down') {
    if (!currentUser) return;
    setResources(rs => rs.map(r => {
      if (r.id !== resourceId) return r;
      const existing = r.communityRatings.find(cr => cr.userId === currentUser.id);
      let updated = r.communityRatings.filter(cr => cr.userId !== currentUser.id);
      if (!existing || existing.vote !== vote) {
        updated = [...updated, { userId: currentUser.id, vote }];
      }
      return { ...r, communityRatings: updated };
    }));
  }

  const allTypes = [...new Set(resources.map(r => r.type))];

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[18px] font-bold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            Resources
          </h2>
          <p className="text-[13px] text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            {resources.length} shared by members
          </p>
        </div>
        <button
          onClick={() => setEditMode(e => !e)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[13px] font-medium transition-colors"
          style={{
            fontFamily: 'var(--font-body)',
            background: editMode ? '#E8F9F7' : 'white',
            borderColor: editMode ? '#A8E8E2' : '#E9ECEF',
            color: editMode ? '#1FA090' : '#6C757D',
          }}
        >
          <Pencil className="size-3.5" strokeWidth={1.75} />
          {editMode ? 'Done editing' : 'Edit'}
        </button>
      </div>

      {/* Upload form */}
      <UploadForm onSubmit={addResource} />

      {/* Type filters */}
      {allTypes.length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className="px-3 py-1.5 rounded-full text-[13px] border transition-colors"
            style={{
              fontFamily: 'var(--font-body)',
              background: filter === 'all' ? '#212529' : 'white',
              color: filter === 'all' ? 'white' : '#6C757D',
              borderColor: filter === 'all' ? '#212529' : '#E9ECEF',
            }}
          >
            All ({resources.length})
          </button>
          {allTypes.map(t => {
            const Icon = TYPE_CONFIG[t].icon;
            return (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] border transition-colors"
                style={{
                  fontFamily: 'var(--font-body)',
                  background: filter === t ? '#E8F9F7' : 'white',
                  color: filter === t ? '#1FA090' : '#6C757D',
                  borderColor: filter === t ? '#A8E8E2' : '#E9ECEF',
                }}
              >
                <Icon className="size-3.5" strokeWidth={1.75} /> {TYPE_CONFIG[t].label}
              </button>
            );
          })}
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
          No resources yet. Be the first to share something!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(r => (
            <div
              key={r.id}
              draggable={editMode}
              onDragStart={() => setDragId(r.id)}
              onDragOver={e => { if (editMode) e.preventDefault(); }}
              onDrop={e => {
                e.preventDefault();
                if (dragId !== null) moveResource(dragId, r.id);
                setDragId(null);
              }}
              onDragEnd={() => setDragId(null)}
              style={{ opacity: dragId === r.id ? 0.5 : 1 }}
            >
              <ResourceCard
                resource={r}
                canDelete={isFounder || r.uploadedById === currentUser?.id}
                canEdit={r.uploadedById === currentUser?.id}
                editMode={editMode}
                onDelete={() => deleteResource(r.id)}
                onVote={(vote) => vote_handler(r.id, vote)}
                dragHandleProps={{ draggable: editMode }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  function vote_handler(id: string, v: 'up' | 'down') { vote(id, v); }
}
