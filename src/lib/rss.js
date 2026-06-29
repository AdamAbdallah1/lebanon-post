import Parser from "rss-parser";

const parser = new Parser();

// Google News Lebanon (BEST STARTING POINT)
const FEEDS = {
  lebanon: "https://news.google.com/rss/search?q=lebanon&hl=en&gl=US&ceid=US:en",
  business: "https://news.google.com/rss/search?q=lebanon+business&hl=en&gl=US&ceid=US:en",
  sports: "https://news.google.com/rss/search?q=lebanon+sports&hl=en&gl=US&ceid=US:en",
};

export async function fetchRSS(category = "lebanon") {
  const url = FEEDS[category] || FEEDS.lebanon;

  const feed = await parser.parseURL(url);

  return feed.items.map((item, index) => ({
    article_id: item.link || index,
    title: item.title,
    description: item.contentSnippet,
    image_url: null, // RSS usually no image
    link: item.link,
    pubDate: item.pubDate,
    source: "rss",
  }));
}