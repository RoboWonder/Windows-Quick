
const SECONDARY_RATIO = 0.5;
const MIN_SCORE = 0.01;
const MAX_MATCH_LENGTH = 15;
const MAX_MATCH_SCORE =
  (MAX_MATCH_LENGTH + MAX_MATCH_LENGTH * MAX_MATCH_LENGTH) * 0.5;

export const inArray = (arr: [], query: string) => {
  const matched = [];
  query = query.toLowerCase();
  for (const elem of arr) {
    if (!elem.primaryText) continue;
    const primaryMatch = computeMatchScore(
      elem.primaryText,
      query
    );
    let score = primaryMatch.score;

    if (elem.secondaryText) {
      const secondaryMatch = computeMatchScore(
        elem.secondaryText,
        query
      );
      const secondaryScore = secondaryMatch.score * SECONDARY_RATIO;
      score = Math.max(score, secondaryScore);
    }

    const failedToMatch = score <= MIN_SCORE;
    if (failedToMatch) continue;

    const elemWithScore = { ...elem, ...{ score } };
    matched.push(elemWithScore);
  }
  return matched;
}

export const computeMatchScore = (text: string, query: string) => {
  text = text.toLowerCase();
  let fuzzyScore = 0;
  let pattern = 0;
  let add = 1;

  for (let i = 0; i < text.length; i++) {
    const textChrCode = text.charCodeAt(i);
    const queryCharCode = query.charCodeAt(pattern);
    if (textChrCode !== queryCharCode) {
      add *= 0.5;
      continue;
    }
    pattern++;
    add += 1;
    fuzzyScore += add;

    const noMoreMatches =
      pattern >= query.length || pattern >= MAX_MATCH_LENGTH;
    if (noMoreMatches) break;
  }

  // Normalize Score
  fuzzyScore = Math.min(MAX_MATCH_SCORE, fuzzyScore);
  fuzzyScore /= MAX_MATCH_SCORE;

  return {
    score: fuzzyScore,
  };
}
