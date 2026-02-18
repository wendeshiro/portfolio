let homeHeroTextPlayed = false;
let homeScrollHintShown = false;

export function shouldPlayHomeHeroText() {
  return !homeHeroTextPlayed;
}

export function markHomeHeroTextPlayed() {
  homeHeroTextPlayed = true;
}

export function hasShownHomeScrollHint() {
  return homeScrollHintShown;
}

export function markHomeScrollHintShown() {
  homeScrollHintShown = true;
}
