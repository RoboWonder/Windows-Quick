export const inArray = (arr: [], query: string) => {
  const matched = [];
  query = query.toLowerCase();
  for (const elem of arr) {
    if (!elem.primaryText) continue;
    const primaryMatch = computeMatchScore(
      elem.primaryText,
      query
    );
    if(primaryMatch <= 0) continue;
 
    const elemWithScore = { ...elem, ...{ score: primaryMatch } };
    matched.push(elemWithScore);
  }
  return matched;
}

export const computeMatchScore = (text: string, query: string) => {
  text = text.toLowerCase();
  if(text.indexOf(query) == -1 ) return 0;
  if(text.indexOf(query) == 0 ) return query.length;
  if(text.indexOf(query) > 0 ) return 0.1*query.length;
  return 0;
}
