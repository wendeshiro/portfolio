export const HOME_SNAP_PAUSE_EVENT = "home-snap-pause";
export const BACK_TO_TOP_SNAP_PAUSE_MS = 1300;

export function requestHomeSnapPause(ms = BACK_TO_TOP_SNAP_PAUSE_MS) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(HOME_SNAP_PAUSE_EVENT, {
      detail: { ms },
    }),
  );
}
