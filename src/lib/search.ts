// ─── Search helpers (typo-tolerant fuzzy matching) ─────────────────────────────

/** Classic Levenshtein edit distance between two strings. */
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[] = Array(n + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[n];
}

/**
 * True if `text` matches `query`, allowing for small typos.
 * Checks substring match first (fast path), then falls back to
 * a per-word edit-distance comparison so e.g. "phyton" still matches "Python".
 */
export function fuzzyMatch(text: string, query: string): boolean {
  const t = text.toLowerCase().trim();
  const q = query.toLowerCase().trim();
  if (!q) return true;
  if (t.includes(q)) return true;

  const words = t.split(/\s+/);
  const qWords = q.split(/\s+/);

  return qWords.every(qw => {
    if (qw.length < 2) return t.includes(qw);
    return words.some(w => {
      if (w.includes(qw) || qw.includes(w)) return true;
      // Allow ~1 typo per 4 characters (min 1, max 2)
      const threshold = Math.min(2, Math.max(1, Math.floor(qw.length / 4)));
      return levenshtein(w, qw) <= threshold;
    });
  });
}
