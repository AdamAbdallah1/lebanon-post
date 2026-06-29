export function rankNews(news = []) {
  return [...news]
    .filter((a) => a?.title)
    .map((a) => {
      let score = 0;

      if (a.image_url) score += 3;
      if (a.description) score += 2;

      if (a.source_priority) {
        score += Math.max(0, 10 - a.source_priority / 200000);
      }

      const text = (a.title + (a.description || "")).toLowerCase();

      if (text.includes("عاجل") || text.includes("breaking")) {
        score += 5;
      }

      a._score = score;
      return a;
    })
    .sort((a, b) => b._score - a._score);
}