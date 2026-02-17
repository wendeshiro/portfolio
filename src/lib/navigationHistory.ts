/**
 * Tracks the depth of internal (client-side) navigations so that
 * BackButton can decide whether to call router.back() or router.push("/").
 *
 * - SmoothScroll increments on every forward client-side navigation.
 * - SmoothScroll decrements on every popstate (back/forward) navigation.
 * - BackButton checks hasInternalHistory() before deciding how to navigate.
 *
 * Module-level state is intentional: it resets on full page reload, which
 * correctly reflects the absence of internal SPA history at that point.
 */

let internalHistoryDepth = 0;

export function incrementInternalHistory() {
  internalHistoryDepth++;
}

export function decrementInternalHistory() {
  if (internalHistoryDepth > 0) internalHistoryDepth--;
}

export function hasInternalHistory() {
  return internalHistoryDepth > 0;
}
