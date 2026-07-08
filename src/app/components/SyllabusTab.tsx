import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  CheckCircle2, RefreshCw, Lock, BookOpen, FileText, PlayCircle, Wrench, Bot, MessageCircle,
  Plus, Pin, MoreVertical, Pencil, Sparkles, Copy, ChevronRight, ChevronUp, ChevronDown, Trash2,
  Check, Star, X,
} from "lucide-react";
import type { Bubble, Session, SessionStatus, BubbleLevel } from "../../types";
import { DatePicker } from "./DatePicker";

// ─── Status config ────────────────────────────────────────────────────────────

const STATUS_CFG: Record<SessionStatus, { icon: typeof CheckCircle2; label: string; color: string; bg: string }> = {
  'done':        { icon: CheckCircle2, label: 'Done',        color: '#065F46', bg: '#D1FAE5' },
  'in-progress': { icon: RefreshCw,    label: 'In Progress', color: '#1E3A8A', bg: '#DBEAFE' },
  'locked':      { icon: Lock,         label: 'Locked',      color: '#6C757D', bg: '#F1F3F5' },
};

const SECTION_ICONS: Record<string, typeof BookOpen> = {
  'learning-path': BookOpen,
  'brief':         FileText,
  'video':         PlayCircle,
  'sandbox':       Wrench,
  'ai-eval':       Bot,
  'reflection':    MessageCircle,
};

// ─── Menu item ────────────────────────────────────────────────────────────────

function MenuItem({
  icon: Icon,
  label,
  disabled,
  disabledTitle,
  onClick,
  danger,
  hasSubmenu,
}: {
  icon: typeof Pencil;
  label: string;
  disabled?: boolean;
  disabledTitle?: string;
  onClick?: () => void;
  danger?: boolean;
  hasSubmenu?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={disabled ? disabledTitle : undefined}
      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-left transition-colors
        ${disabled
          ? 'opacity-40 cursor-not-allowed'
          : danger
            ? 'text-[#FA5252] hover:bg-[#FFF5F5]'
            : 'text-[#212529] hover:bg-[#F8F9FA]'}`}
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <Icon className="size-4 shrink-0" strokeWidth={1.75} />
      <span className="flex-1">{label}</span>
      {hasSubmenu && <ChevronRight className="size-3.5 text-[#ADB5BD]" strokeWidth={1.75} />}
    </button>
  );
}

// ─── Three-dot contextual menu ────────────────────────────────────────────────

function ThreeDotsMenu({
  isOpen,
  isLocked,
  isFirst,
  isLast,
  onOpen,
  onClose,
  onEdit,
  onEditAI,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete,
}: {
  isOpen: boolean;
  isLocked: boolean;
  isFirst: boolean;
  isLast: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEdit: () => void;
  onEditAI: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showMove, setShowMove] = useState(false);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={e => { e.stopPropagation(); isOpen ? onClose() : onOpen(); }}
        className="size-8 rounded-lg flex items-center justify-center text-[#4B5563] hover:text-[#212529] hover:bg-[#F8F9FA] transition-colors"
        title="Options"
        aria-label="Section options"
      >
        <MoreVertical className="size-4" strokeWidth={1.75} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl border border-[#E9ECEF] py-1"
          style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 180 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Edit */}
          <MenuItem
            icon={Pencil}
            label="Edit"
            disabled={isLocked}
            disabledTitle="Unlock section to edit"
            onClick={() => { if (!isLocked) { onEdit(); onClose(); } }}
          />

          {/* Edit with AI */}
          <MenuItem
            icon={Sparkles}
            label="Edit with AI"
            disabled={isLocked}
            disabledTitle="Unlock section to edit"
            onClick={() => { if (!isLocked) { onEditAI(); onClose(); } }}
          />

          {/* Duplicate */}
          <MenuItem
            icon={Copy}
            label="Duplicate"
            onClick={() => { onDuplicate(); onClose(); }}
          />

          {/* Move — nested submenu */}
          <div
            className="relative"
            onMouseEnter={() => setShowMove(true)}
            onMouseLeave={() => setShowMove(false)}
          >
            <MenuItem
              icon={ChevronUp}
              label="Move"
              hasSubmenu
              onClick={() => setShowMove(s => !s)}
            />
            {showMove && (
              <div
                className="absolute left-full top-0 ml-1 bg-white rounded-xl border border-[#E9ECEF] py-1"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 140 }}
              >
                <MenuItem
                  icon={ChevronUp}
                  label="Move Up"
                  disabled={isFirst}
                  onClick={() => { if (!isFirst) { onMoveUp(); onClose(); } }}
                />
                <MenuItem
                  icon={ChevronDown}
                  label="Move Down"
                  disabled={isLast}
                  onClick={() => { if (!isLast) { onMoveDown(); onClose(); } }}
                />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F1F3F5] my-1" />

          {/* Delete */}
          <MenuItem
            icon={Trash2}
            label="Delete"
            danger
            disabled={isLocked}
            disabledTitle="Unlock section to edit"
            onClick={() => { if (!isLocked) { onDelete(); onClose(); } }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Delete confirm modal ─────────────────────────────────────────────────────

function DeleteConfirmModal({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <div
        className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}
      >
        <div className="px-6 pt-6 pb-5 flex flex-col gap-3">
          <div className="size-11 rounded-xl bg-[#FEE2E2] flex items-center justify-center">
            <Trash2 className="size-5 text-[#FA5252]" strokeWidth={1.75} />
          </div>
          <h3 className="font-bold text-[17px] text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            Delete "{title}"?
          </h3>
          <p className="text-[13px] text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            This will hide the section from current and future views.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-[#E9ECEF] text-[14px] text-[#6C757D] hover:bg-[#F8F9FA] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-[#FA5252] text-white text-[14px] font-semibold hover:bg-[#E03131] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Session Card ─────────────────────────────────────────────────────────────

function SessionCard({
  session,
  isFirst,
  isLast,
  isMenuOpen,
  isEditing,
  isEditingAI,
  isAuthor,
  onOpenMenu,
  onCloseMenu,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onRequestDelete,
  onUpdate,
}: {
  session: Session;
  isFirst: boolean;
  isLast: boolean;
  isMenuOpen: boolean;
  isEditing: boolean;
  isEditingAI: boolean;
  isAuthor: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onStartEdit: (withAI: boolean) => void;
  onSaveEdit: (updates: Partial<Session>) => void;
  onCancelEdit: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRequestDelete: () => void;
  onUpdate: (updated: Session) => void;
}) {
  const [expanded, setExpanded] = useState(session.status === 'in-progress');
  const [projectUrl, setProjectUrl] = useState(session.projectUrl ?? '');
  const [reflectionNote, setNote] = useState(session.reflectionNote ?? '');
  const [confidence, setConfidence] = useState(session.confidenceRating ?? 0);
  const [savedProject, setSavedProject] = useState(!!session.projectUrl);
  const [savedReflect, setSavedReflect] = useState(!!session.reflectionNote);

  // Inline edit state
  const [editTitle,    setEditTitle]    = useState(session.title);
  const [editDate,     setEditDate]     = useState(session.date);
  const [editDuration, setEditDuration] = useState(String(session.duration));
  const [editXP,       setEditXP]       = useState(String(session.xp));
  const [editLevel,    setEditLevel]    = useState<BubbleLevel>(session.level);
  const [editSections, setEditSections] = useState(session.sections);

  useEffect(() => {
    if (isEditing) {
      setEditTitle(session.title);
      setEditDate(session.date);
      setEditDuration(String(session.duration));
      setEditXP(String(session.xp));
      setEditLevel(session.level);
      setEditSections(session.sections);
    }
  }, [isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateSection(idx: number, patch: Partial<Session['sections'][number]>) {
    setEditSections(ss => ss.map((s, i) => i === idx ? { ...s, ...patch } : s));
  }

  const cfg = STATUS_CFG[session.status];
  const isLocked = session.status === 'locked';
  const sNum = `S${String(session.number).padStart(2, '0')}`;
  const progress = session.status === 'done' ? 100 : session.status === 'in-progress' ? 45 : 0;

  const cardBorder = isEditing
    ? '2px solid #2BBFAA'
    : '1px solid #E9ECEF';

  return (
    <div
      className="rounded-2xl"
      style={{
        border: cardBorder,
        background: 'white',
        boxShadow: isEditing ? '0 0 0 4px rgba(43,191,170,0.12)' : 'var(--shadow-sm)',
        opacity: isLocked && !isEditing ? 0.65 : 1,
        transition: 'border 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Header row */}
      <div
        className={`flex items-start gap-3 p-4 ${!isLocked && !isEditing ? 'cursor-pointer hover:bg-neutral-50' : ''}`}
        onClick={() => !isLocked && !isEditing && setExpanded(e => !e)}
      >
        {/* Row 1: S-badge + title  |  Row 2: status · level · date */}
        <div className="flex-1 min-w-0">
          {/* Row 1 — primary */}
          <div className="flex items-center gap-2.5 mb-1.5">
            <div
              className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[13px] text-white"
              style={{ fontFamily: 'var(--font-display)', background: '#2BBFAA' }}
            >
              {sNum}
            </div>
            {isEditing ? (
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="flex-1 font-semibold text-[16px] text-[#212529] px-2 py-1 rounded-lg border border-[#2BBFAA] focus:outline-none bg-[#F8FFFE]"
                style={{ fontFamily: 'var(--font-display)' }}
                placeholder="Session title"
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <p className="font-bold text-[16px] text-[#212529] leading-snug" style={{ fontFamily: 'var(--font-display)' }}>
                {session.title}
              </p>
            )}
          </div>

          {/* Row 2 — secondary meta */}
          {!isEditing && (
            <div className="flex items-center gap-2 flex-wrap pl-[2.875rem]">
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                style={{ background: cfg.bg, color: cfg.color, fontFamily: 'var(--font-body)' }}
              >
                <cfg.icon className="size-3" strokeWidth={2} /> {cfg.label}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F1F3F5] text-[#6C757D] shrink-0"
                style={{ fontFamily: 'var(--font-body)' }}>
                {session.level}
              </span>
              <span className="text-[11px] text-[#6C757D] whitespace-nowrap" style={{ fontFamily: 'var(--font-body)' }}>
                {session.date} · {session.duration} min · {session.xp} XP
              </span>
            </div>
          )}

          {isEditing ? (
            <div className="flex flex-col gap-2 mt-2" onClick={e => e.stopPropagation()}>
              {/* Date + Duration */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-0.5 col-span-2">
                  <label className="text-[10px] text-[#ADB5BD] font-medium px-1" style={{ fontFamily: 'var(--font-body)' }}>Date</label>
                  <DatePicker value={editDate} onChange={setEditDate} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] text-[#ADB5BD] font-medium px-1" style={{ fontFamily: 'var(--font-body)' }}>Duration (min)</label>
                  <input
                    type="number" min="1"
                    value={editDuration}
                    onChange={e => setEditDuration(e.target.value)}
                    className="text-[13px] px-2 py-1.5 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] bg-[#F8F9FA]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>
              {/* XP + Level */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] text-[#ADB5BD] font-medium px-1" style={{ fontFamily: 'var(--font-body)' }}>XP</label>
                  <input
                    type="number" min="0"
                    value={editXP}
                    onChange={e => setEditXP(e.target.value)}
                    className="text-[13px] px-2 py-1.5 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] bg-[#F8F9FA]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <label className="text-[10px] text-[#ADB5BD] font-medium px-1" style={{ fontFamily: 'var(--font-body)' }}>Level</label>
                  <select
                    value={editLevel}
                    onChange={e => setEditLevel(e.target.value as BubbleLevel)}
                    className="text-[13px] px-2 py-1.5 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] bg-[#F8F9FA]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              {isEditingAI && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-[#ADB5BD] bg-[#F8F9FA] opacity-60 mt-1">
                  <Sparkles className="size-4 text-[#ADB5BD] shrink-0" strokeWidth={1.75} />
                  <span className="text-[12px] text-[#ADB5BD] italic" style={{ fontFamily: 'var(--font-body)' }}>
                    AI editing coming soon
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Right controls: ⋮ | ∨ */}
        {!isEditing && (
          <div className="shrink-0 flex items-center gap-1" onClick={e => e.stopPropagation()}>
            {isAuthor && (
              <ThreeDotsMenu
                isOpen={isMenuOpen}
                isLocked={isLocked}
                isFirst={isFirst}
                isLast={isLast}
                onOpen={onOpenMenu}
                onClose={onCloseMenu}
                onEdit={() => onStartEdit(false)}
                onEditAI={() => onStartEdit(true)}
                onDuplicate={onDuplicate}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                onDelete={onRequestDelete}
              />
            )}
            {!isLocked && (
              <button
                onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
                className="size-8 flex items-center justify-center text-[#4B5563] hover:text-[#212529] hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <ChevronDown
                  className="size-4 transition-transform"
                  strokeWidth={1.75}
                  style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Editable sections panel */}
      {isEditing && (
        <div className="border-t border-[#E9ECEF]" onClick={e => e.stopPropagation()}>
          {editSections.map((section, idx) => {
            const SectionIcon = SECTION_ICONS[section.type] ?? Pin;
            const isReadOnly = section.type === 'ai-eval' || section.type === 'reflection';

            return (
              <div
                key={section.id}
                className={`px-5 py-3.5 border-b border-[#F8F9FA] last:border-0 ${isReadOnly ? 'opacity-40' : ''}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SectionIcon className={`size-4 shrink-0 ${isReadOnly ? 'text-[#ADB5BD]' : 'text-[#2BBFAA]'}`} strokeWidth={1.75} />
                  <p className="text-[13px] font-semibold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.title}
                  </p>
                  {isReadOnly && (
                    <span className="ml-auto text-[11px] text-[#ADB5BD]" style={{ fontFamily: 'var(--font-body)' }}>
                      Member only
                    </span>
                  )}
                </div>

                {isReadOnly && (
                  <p className="text-[12px] text-[#ADB5BD] italic" style={{ fontFamily: 'var(--font-body)' }}>
                    {section.type === 'ai-eval' ? 'AI feedback is generated after project submission.' : 'Members fill this in after each session.'}
                  </p>
                )}

                {!isReadOnly && (section.type === 'learning-path' || section.type === 'brief' || section.type === 'sandbox') && (
                  <textarea
                    rows={3}
                    value={section.content ?? ''}
                    onChange={e => updateSection(idx, { content: e.target.value })}
                    placeholder={
                      section.type === 'sandbox'
                        ? 'Describe the project task for this session…'
                        : 'Enter content…'
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] text-[13px] bg-[#F8F9FA] resize-none"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                )}

                {!isReadOnly && section.type === 'video' && (
                  <div className="flex flex-col gap-2">
                    <input
                      value={section.videoTitle ?? ''}
                      onChange={e => updateSection(idx, { videoTitle: e.target.value })}
                      placeholder="Video title"
                      className="w-full px-3 py-2 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] text-[13px] bg-[#F8F9FA]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    <input
                      value={section.videoUrl ?? ''}
                      onChange={e => updateSection(idx, { videoUrl: e.target.value })}
                      placeholder="https://youtube.com/watch?v=…"
                      className="w-full px-3 py-2 rounded-lg border border-[#E9ECEF] focus:outline-none focus:border-[#2BBFAA] text-[13px] bg-[#F8F9FA]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Inline edit footer */}
      {isEditing && (
        <div
          className="px-4 py-3 border-t border-[#E9ECEF] flex items-center justify-end gap-2.5"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onCancelEdit}
            className="px-4 py-2 rounded-xl border border-[#E9ECEF] text-[13px] text-[#6C757D] hover:bg-[#F8F9FA] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSaveEdit({
              title:    editTitle.trim()    || session.title,
              date:     editDate.trim()     || session.date,
              duration: parseInt(editDuration) || session.duration,
              xp:       parseInt(editXP)       || session.xp,
              level:    editLevel,
              sections: editSections,
            })}
            className="px-4 py-2 rounded-xl bg-[#2BBFAA] text-white text-[13px] font-semibold hover:bg-[#1FA090] transition-colors"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Save
          </button>
        </div>
      )}

      {/* Progress bar */}
      {!isEditing && (
        <div className="h-1 bg-[#F1F3F5]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%`, background: '#2BBFAA' }}
          />
        </div>
      )}

      {/* Expanded sections */}
      {expanded && !isLocked && !isEditing && (
        <div className="border-t border-[#F1F3F5]">
          {session.sections.map(section => {
            const SectionIcon = SECTION_ICONS[section.type] ?? Pin;
            return (
              <div key={section.id} className="border-b border-[#F8F9FA] last:border-0 px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <SectionIcon className="size-4 text-[#2BBFAA]" strokeWidth={1.75} />
                  <p className="font-semibold text-[14px] text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
                    {section.title}
                  </p>
                </div>

                {(section.type === 'learning-path' || section.type === 'brief') && section.content && (
                  <p className="text-[13px] text-[#495057] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {section.content}
                  </p>
                )}

                {section.type === 'video' && (
                  <div>
                    {section.videoTitle && (
                      <p className="text-[13px] text-[#495057] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        {section.videoTitle}
                      </p>
                    )}
                    {section.videoUrl && (
                      <a href={section.videoUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] text-[#2BBFAA] font-medium hover:underline"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        <svg className="size-4" fill="none" viewBox="0 0 20 20">
                          <path d="M8 5.14v9.72L15.5 10 8 5.14z" fill="#2BBFAA" />
                          <circle cx="10" cy="10" r="8" stroke="#2BBFAA" strokeWidth="1.5" />
                        </svg>
                        Watch on YouTube
                      </a>
                    )}
                  </div>
                )}

                {section.type === 'sandbox' && (
                  <div className="flex flex-col gap-3">
                    {section.content && (
                      <p className="text-[13px] text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
                        {section.content}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)}
                        placeholder="https://your-project-url.com"
                        className="flex-1 px-3 py-2 rounded-lg border border-[#E9ECEF] text-[13px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                      <button
                        onClick={() => { setSavedProject(true); onUpdate({ ...session, projectUrl }); }}
                        className="px-4 py-2 rounded-lg bg-[#2BBFAA] text-white text-[13px] font-medium hover:bg-[#1FA090] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}>
                        {savedProject ? <><Check className="size-3.5 inline" strokeWidth={2.5} /> Saved</> : 'Submit'}
                      </button>
                    </div>
                  </div>
                )}

                {section.type === 'ai-eval' && (
                  section.content ? (
                    <div className="flex items-start gap-2 bg-[#E8F9F7] rounded-xl p-3 text-[13px] text-[#1FA090]"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      <Bot className="size-4 shrink-0 mt-0.5" strokeWidth={1.75} />
                      {section.content}
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#ADB5BD] italic" style={{ fontFamily: 'var(--font-body)' }}>
                      Submit your project above to receive AI feedback.
                    </p>
                  )
                )}

                {section.type === 'reflection' && (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-[13px] text-[#495057] mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                        Confidence level (1–5):
                      </p>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} onClick={() => setConfidence(n)}
                            className="size-9 rounded-full border text-[14px] font-semibold transition-all"
                            style={{
                              fontFamily: 'var(--font-body)',
                              background: confidence >= n ? '#2BBFAA' : 'white',
                              borderColor: confidence >= n ? '#2BBFAA' : '#E9ECEF',
                              color: confidence >= n ? 'white' : '#ADB5BD',
                            }}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={reflectionNote}
                      onChange={e => setNote(e.target.value)}
                      placeholder="What challenged you most? What did you learn?"
                      className="px-3 py-2 rounded-lg border border-[#E9ECEF] text-[13px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA] resize-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                    <button
                      onClick={() => { setSavedReflect(true); onUpdate({ ...session, reflectionNote, confidenceRating: confidence }); }}
                      className="self-end px-4 py-2 rounded-lg bg-[#2BBFAA] text-white text-[13px] font-medium hover:bg-[#1FA090] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}>
                      {savedReflect ? <><Check className="size-3.5 inline" strokeWidth={2.5} /> Saved</> : 'Save reflection'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SyllabusTab ──────────────────────────────────────────────────────────────

interface Props {
  bubble: Bubble;
  isFounder: boolean;
  isAuthor?: boolean;
}

export function SyllabusTab({ bubble, isFounder, isAuthor = true }: Props) {
  const [sessions, setSessions] = useState<Session[]>(bubble.sessions);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingWithAI, setEditingWithAI] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ session: Session; index: number } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const doneCount = sessions.filter(s => s.status === 'done').length;
  const totalXP = sessions.reduce((sum, s) => sum + s.xp, 0);
  const earnedXP = sessions.filter(s => s.status === 'done').reduce((sum, s) => sum + s.xp, 0);
  const progressPct = sessions.length > 0 ? Math.round((doneCount / sessions.length) * 100) : 0;

  function reflowNumbers(ss: Session[]): Session[] {
    return ss.map((s, i) => ({ ...s, number: i + 1 }));
  }

  function addSession(title: string, date: string, level: BubbleLevel) {
    const ts = Date.now();
    const newSession: Session = {
      id: `session-${ts}`,
      number: sessions.length + 1,
      title,
      status: 'in-progress',
      date,
      duration: 90,
      xp: 100,
      level,
      sections: [
        { id: `s-lp-${ts}`, type: 'learning-path', title: 'Learning Path', content: '' },
        { id: `s-br-${ts}`, type: 'brief', title: 'Conceptual Brief', content: '' },
        { id: `s-vd-${ts}`, type: 'video', title: 'Video Resources', videoTitle: '', videoUrl: '' },
        { id: `s-sb-${ts}`, type: 'sandbox', title: 'Project Sandbox', content: '' },
        { id: `s-ae-${ts}`, type: 'ai-eval', title: 'AI Evaluation', content: '' },
        { id: `s-rf-${ts}`, type: 'reflection', title: 'Reflection', content: '' },
      ],
    };
    setSessions(ss => [...ss, newSession]);
    toast.success(`Session "${title}" added`);
  }

  function startEdit(id: string, withAI: boolean) {
    setEditingId(id);
    setEditingWithAI(withAI);
    setOpenMenuId(null);
  }

  function saveEdit(id: string, updates: Partial<Session>) {
    setSessions(ss => ss.map(s => s.id === id ? { ...s, ...updates } : s));
    setEditingId(null);
    setEditingWithAI(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingWithAI(false);
  }

  function duplicate(id: string) {
    const idx = sessions.findIndex(s => s.id === id);
    if (idx === -1) return;
    const orig = sessions[idx];
    const copy: Session = {
      ...orig,
      id: `s-copy-${Date.now()}`,
      title: `${orig.title} (Copy)`,
      status: 'locked',
    };
    setSessions(ss => {
      const next = [...ss];
      next.splice(idx + 1, 0, copy);
      return reflowNumbers(next);
    });
    toast('Section duplicated.');
  }

  function moveUp(id: string) {
    setSessions(ss => {
      const idx = ss.findIndex(s => s.id === id);
      if (idx <= 0) return ss;
      const next = [...ss];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return reflowNumbers(next);
    });
    setOpenMenuId(null);
  }

  function moveDown(id: string) {
    setSessions(ss => {
      const idx = ss.findIndex(s => s.id === id);
      if (idx >= ss.length - 1) return ss;
      const next = [...ss];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return reflowNumbers(next);
    });
    setOpenMenuId(null);
  }

  function requestDelete(id: string) {
    const idx = sessions.findIndex(s => s.id === id);
    const session = sessions[idx];
    if (session) setDeleteTarget({ session, index: idx });
    setOpenMenuId(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const { session: removed, index: origIdx } = deleteTarget;
    setSessions(ss => ss.filter(s => s.id !== removed.id));
    setDeleteTarget(null);

    let undone = false;
    const timerId = setTimeout(() => { /* soft-deleted — stays removed */ }, 5000);

    toast('Section deleted.', {
      duration: 5000,
      action: {
        label: 'Undo',
        onClick: () => {
          if (undone) return;
          undone = true;
          clearTimeout(timerId);
          setSessions(ss => {
            const next = [...ss];
            next.splice(Math.min(origIdx, next.length), 0, removed);
            return reflowNumbers(next);
          });
        },
      },
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner */}
      <div className="rounded-2xl px-5 pt-5 pb-4 text-white"
        style={{ background: 'linear-gradient(135deg, #2BBFAA 0%, #1FA090 100%)' }}>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            {/* Session count + % */}
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[13px] font-semibold text-white" style={{ fontFamily: 'var(--font-body)' }}>
                {sessions.length === 0
                  ? 'No sessions yet'
                  : doneCount === 0
                    ? `0 of ${sessions.length} sessions · Ready to start`
                    : `${doneCount} of ${sessions.length} sessions done`}
              </p>
              {sessions.length > 0 && (
                <span className="text-[13px] font-semibold text-white ml-3 shrink-0" style={{ fontFamily: 'var(--font-body)' }}>
                  {progressPct}%
                </span>
              )}
            </div>
            {/* Progress bar — bottom of banner */}
            <div className="bg-white/30 rounded-full h-2 w-full">
              <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          {/* XP box — hidden when no sessions */}
          {totalXP > 0 && (
            <div className="bg-white/15 rounded-2xl px-4 py-3 text-center shrink-0 mb-0">
              <p className="text-[11px] text-white font-semibold mb-0.5" style={{ fontFamily: 'var(--font-body)' }}>XP</p>
              <p className="text-[20px] font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {earnedXP.toLocaleString()}
              </p>
              <p className="text-white/80 text-[11px]" style={{ fontFamily: 'var(--font-body)' }}>
                / {totalXP.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sessions header */}
      <h3 className="text-[16px] font-bold text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
        Sessions
      </h3>

      {/* Session list */}
      <div className="flex flex-col gap-3">
        {sessions.map((session, i) => (
          <SessionCard
            key={session.id}
            session={session}
            isFirst={i === 0}
            isLast={i === sessions.length - 1}
            isMenuOpen={openMenuId === session.id}
            isEditing={editingId === session.id}
            isEditingAI={editingId === session.id && editingWithAI}
            isAuthor={isAuthor}
            onOpenMenu={() => { setOpenMenuId(session.id); }}
            onCloseMenu={() => setOpenMenuId(null)}
            onStartEdit={withAI => startEdit(session.id, withAI)}
            onSaveEdit={updates => saveEdit(session.id, updates)}
            onCancelEdit={cancelEdit}
            onDuplicate={() => duplicate(session.id)}
            onMoveUp={() => moveUp(session.id)}
            onMoveDown={() => moveDown(session.id)}
            onRequestDelete={() => requestDelete(session.id)}
            onUpdate={updated => setSessions(ss => ss.map(s => s.id === updated.id ? updated : s))}
          />
        ))}
        {sessions.length === 0 && !isFounder && (
          <div className="text-center py-12 text-[#6C757D]" style={{ fontFamily: 'var(--font-body)' }}>
            Sessions coming soon.
          </div>
        )}
        {/* Add session — dashed card */}
        {isFounder && (
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed text-[14px] font-medium transition-colors"
            style={{
              borderColor: '#2BBFAA',
              color: '#2BBFAA',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#F0FDFB'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <Plus className="size-4" strokeWidth={2} />
            Add Session
          </button>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <DeleteConfirmModal
          title={deleteTarget.session.title}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Add session modal */}
      {showAddModal && (
        <AddSessionModalInline
          onClose={() => setShowAddModal(false)}
          onAdd={(title, date, level) => { addSession(title, date, level); setShowAddModal(false); }}
        />
      )}
    </div>
  );
}

// ─── Add Session Modal (local) ────────────────────────────────────────────────

function AddSessionModalInline({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (title: string, date: string, level: BubbleLevel) => void;
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [level, setLevel] = useState<BubbleLevel>('Intermediate');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-sm overflow-hidden"
        style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <div className="px-5 pt-5 pb-4 border-b border-[#E9ECEF] flex items-center justify-between">
          <h3 className="font-bold text-[17px] text-[#212529]" style={{ fontFamily: 'var(--font-display)' }}>
            Add a session
          </h3>
          <button onClick={onClose} className="text-[#4B5563] hover:text-[#212529] transition-colors">
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (!title.trim()) return; onAdd(title.trim(), date || 'TBD', level); }}
          className="px-5 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
              Session title *
            </label>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)} required autoFocus
              placeholder="e.g. Introduction & Foundations"
              className="px-3 py-2.5 rounded-xl border border-[#E9ECEF] text-[14px] bg-[#F8F9FA] focus:outline-none focus:border-[#2BBFAA]"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
              Date
            </label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#495057]" style={{ fontFamily: 'var(--font-body)' }}>
              Level
            </label>
            <div className="flex gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as BubbleLevel[]).map(l => (
                <button key={l} type="button" onClick={() => setLevel(l)}
                  className="flex-1 py-2 rounded-xl border text-[13px] font-medium transition-all"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: level === l ? '#E8F9F7' : 'white',
                    borderColor: level === l ? '#A8E8E2' : '#E9ECEF',
                    color: level === l ? '#1FA090' : '#6C757D',
                  }}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#E9ECEF] text-[14px] text-[#6C757D] hover:bg-[#F8F9FA] transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}>
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#2BBFAA] text-white text-[14px] font-semibold hover:bg-[#1FA090] transition-colors disabled:opacity-40"
              style={{ fontFamily: 'var(--font-body)' }}
              disabled={!title.trim()}>
              Add session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
