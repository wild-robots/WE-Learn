import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Bubble } from '../types';
import { MOCK_ME, MOCK_BUBBLES } from '../data/mock';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AppContextValue {
  // Auth
  currentUser: User | null;
  isLoggedIn: boolean;
  login: () => void;   // mock: instantly logs in as MOCK_ME
  logout: () => void;

  // Bubbles (mutable list)
  bubbles: Bubble[];
  addBubble: (bubble: Bubble) => void;
  updateBubble: (id: string, patch: Partial<Bubble>) => void;
  deleteBubble: (id: string) => void;

  // Join / Leave
  joinBubble: (bubbleId: string) => void;
  leaveBubble: (bubbleId: string) => void;
  isJoined: (bubbleId: string) => boolean;
  isFounder: (bubbleId: string) => boolean;

  // Recently viewed (for smart search)
  recentBubbleIds: string[];
  addRecentBubble: (bubbleId: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'welearn_state';

function loadFromStorage(): { userId: string | null; joinedBubbles: string[]; recentBubbleIds: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { recentBubbleIds: [], ...JSON.parse(raw) };
  } catch {}
  return { userId: null, joinedBubbles: [], recentBubbleIds: [] };
}

export function AppProvider({ children }: { children: ReactNode }) {
  const stored = loadFromStorage();

  // Always default to MOCK_ME in this demo — auth modal still works for join flow
  const [currentUser, setCurrentUser] = useState<User | null>(
    { ...MOCK_ME, joinedBubbles: stored.joinedBubbles }
  );
  const [bubbles, setBubbles] = useState<Bubble[]>(MOCK_BUBBLES);
  const [recentBubbleIds, setRecentBubbleIds] = useState<string[]>(stored.recentBubbleIds);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      userId: currentUser?.id ?? null,
      joinedBubbles: currentUser?.joinedBubbles ?? [],
      recentBubbleIds,
    }));
  }, [currentUser, recentBubbleIds]);

  function addRecentBubble(bubbleId: string) {
    setRecentBubbleIds(ids => [bubbleId, ...ids.filter(id => id !== bubbleId)].slice(0, 5));
  }

  function login() {
    setCurrentUser({ ...MOCK_ME, joinedBubbles: stored.joinedBubbles });
  }

  function logout() {
    setCurrentUser(null);
  }

  function joinBubble(bubbleId: string) {
    if (!currentUser) return;
    // Update user's joined list
    setCurrentUser(u => u ? { ...u, joinedBubbles: [...new Set([...u.joinedBubbles, bubbleId])] } : u);
    // Update bubble's member count + memberIds
    setBubbles(bs => bs.map(b => {
      if (b.id !== bubbleId) return b;
      const already = b.memberIds.includes(currentUser.id);
      if (already) return b;
      return {
        ...b,
        memberIds: [...b.memberIds, currentUser.id],
        takenSeats: Math.min(b.takenSeats + 1, b.maxSeats),
        status: b.takenSeats + 1 >= b.maxSeats ? 'full' : b.status,
      };
    }));
  }

  function leaveBubble(bubbleId: string) {
    if (!currentUser) return;
    setCurrentUser(u => u ? { ...u, joinedBubbles: u.joinedBubbles.filter(id => id !== bubbleId) } : u);
    setBubbles(bs => bs.map(b => {
      if (b.id !== bubbleId) return b;
      return {
        ...b,
        memberIds: b.memberIds.filter(id => id !== currentUser.id),
        takenSeats: Math.max(b.takenSeats - 1, 0),
        status: b.status === 'full' ? 'open' : b.status,
      };
    }));
  }

  function isJoined(bubbleId: string): boolean {
    return currentUser?.joinedBubbles.includes(bubbleId) ?? false;
  }

  function isFounder(bubbleId: string): boolean {
    const bubble = bubbles.find(b => b.id === bubbleId);
    const userId = currentUser?.id ?? 'user-me';
    return bubble?.founderId === userId;
  }

  function addBubble(bubble: Bubble) {
    setBubbles(bs => [bubble, ...bs]);
    joinBubble(bubble.id);
  }

  function updateBubble(id: string, patch: Partial<Bubble>) {
    setBubbles(bs => bs.map(b => b.id === id ? { ...b, ...patch } : b));
  }

  function deleteBubble(id: string) {
    setBubbles(bs => bs.filter(b => b.id !== id));
  }

  return (
    <AppContext.Provider value={{
      currentUser, isLoggedIn: !!currentUser,
      login, logout,
      bubbles, addBubble, updateBubble, deleteBubble,
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
