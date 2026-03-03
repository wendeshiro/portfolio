let hasHomeHeroTextPlayed = false;
let hasHomeScrollHintShown = false;

export function shouldPlayHomeHeroText() {
  return !hasHomeHeroTextPlayed;
}

export function markHomeHeroTextPlayed() {
  hasHomeHeroTextPlayed = true;
}

export function hasShownHomeScrollHint() {
  return hasHomeScrollHintShown;
}

export function markHomeScrollHintShown() {
  hasHomeScrollHintShown = true;
}
