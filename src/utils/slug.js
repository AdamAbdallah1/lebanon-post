export function createNewsId(article) {
  return encodeURIComponent(article.id);
}

export function decodeNewsId(id) {
  return decodeURIComponent(id);
}