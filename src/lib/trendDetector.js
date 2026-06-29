export function detectTrending(news) {
  if (!Array.isArray(news)) return [];

  return [...news]
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (a.image_url) scoreA += 2;
      if (b.image_url) scoreB += 2;

      if (a.description?.length > 100) scoreA += 1;
      if (b.description?.length > 100) scoreB += 1;

      return scoreB - scoreA;
    })
    .slice(0, 5);
}