import { useState, useRef, useEffect } from "react";
import { Search, Clock, X, ArrowRight } from "lucide-react";
import type { Bubble } from "../../types";
import { fuzzyMatch } from "../../lib/search";

interface Props {
  bubbles: Bubble[];
  recentBubbleIds: string[];
  onSelect: (bubble: Bubble) => void;
}

export function SmartSearchBar({ bubbles, recentBubbleIds, onSelect }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const recentBubbles = recentBubbleIds
    .map(id => bubbles.find(b => b.id === id))
    .filter((b): b is Bubble => !!b);

  // Live "as you type" suggestions: title/topic of bubbles that start with
  // the query, falling back to fuzzy (typo-tolerant) matches.
  const suggestions = (() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const seen = new Set<string>();
    const items: Bubble[] = [];

    const pushUnique = (bubble: Bubble) => {
      if (!seen.has(bubble.id)) { seen.add(bubble.id); items.push(bubble); }
    };

    // Pass 1: starts-with matches (highest relevance)
    for (const b of bubbles) {
      if (b.title.toLowerCase().startsWith(q) || b.topic.toLowerCase().startsWith(q)) pushUnique(b);
    }
    // Pass 2: contains / fuzzy matches
    if (items.length < 6) {
      for (const b of bubbles) {
        if (fuzzyMatch(b.title, q) || fuzzyMatch(b.topic, q) || fuzzyMatch(b.description, q)) pushUnique(b);
        if (items.length >= 6) break;
      }
    }
    return items.slice(0, 6);
  })();

  function handleSelect(bubble: Bubble) {
    setQuery('');
    setOpen(false);
    onSelect(bubble);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
      (e.target as HTMLInputElement).blur();
    } else if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  }

  const showDropdown = open && (query.trim() ? true : recentBubbles.length > 0);

  return (
    <div ref={ref} className="relative w-full max-w-[700px]">
      <div
        className="bg-white flex items-center h-[60px] w-full rounded-[20px] px-5 gap-3"
        style={{
          boxShadow: open ? '0 8px 28px -6px rgba(43,191,170,0.25)' : '0 8px 24px -6px rgba(0,0,0,0.08)',
          border: open ? '2px solid #00a79d' : '2px solid #E9ECEF',
          transition: 'all 0.2s ease',
        }}
      >
        <Search className="size-5 shrink-0 text-[#ADB5BD]" strokeWidth={1.75} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search Bubbles by topic, title, or tag..."
          className="flex-1 bg-transparent outline-none text-[16px] text-[#212529] placeholder:text-[#ADB5BD]"
          style={{ fontFamily: 'var(--font-body)' }}
        />
        {query && (
          <button onClick={() => setQuery('')} className="shrink-0 text-[#ADB5BD] hover:text-[#495057] transition-colors">
            <X className="size-4" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-[#E9ECEF] overflow-hidden z-30 text-left"
          style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}>

          {!query.trim() && recentBubbles.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#ADB5BD] flex items-center gap-1.5"
                style={{ fontFamily: 'var(--font-body)' }}>
                <Clock className="size-3.5" strokeWidth={1.75} /> Recently viewed
              </p>
              {recentBubbles.map(b => (
                <button key={b.id} onClick={() => handleSelect(b)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F8F9FA] transition-colors">
                  <div className="size-8 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                    {b.heroImage && <img src={b.heroImage} alt="" className="size-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] text-[#212529] truncate font-medium" style={{ fontFamily: 'var(--font-body)' }}>{b.title}</p>
                    <p className="text-[12px] text-[#ADB5BD] truncate" style={{ fontFamily: 'var(--font-body)' }}>{b.topic}</p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-[#ADB5BD]" strokeWidth={1.75} />
                </button>
              ))}
            </div>
          )}

          {query.trim() && (
            suggestions.length > 0 ? (
              <div className="py-1">
                {suggestions.map(b => (
                  <button key={b.id} onClick={() => handleSelect(b)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#F8F9FA] transition-colors">
                    <div className="size-8 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                      {b.heroImage && <img src={b.heroImage} alt="" className="size-full object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] text-[#212529] truncate font-medium" style={{ fontFamily: 'var(--font-body)' }}>{b.title}</p>
                      <p className="text-[12px] text-[#ADB5BD] truncate" style={{ fontFamily: 'var(--font-body)' }}>{b.topic} · {b.level}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-[#ADB5BD]" strokeWidth={1.75} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-[13px] text-[#ADB5BD]" style={{ fontFamily: 'var(--font-body)' }}>
                No bubbles found for "{query}"
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
