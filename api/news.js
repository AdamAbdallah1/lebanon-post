import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (RSS Reader)"
  }
});

const FEEDS = {
  top: "https://news.google.com/rss/search?q=latest&hl=en&gl=US&ceid=US:en",
  lebanon: "https://news.google.com/rss/search?q=lebanon&hl=en&gl=US&ceid=US:en",
  sports: "https://news.google.com/rss/search?q=sports&hl=en&gl=US&ceid=US:en",
  world: "https://news.google.com/rss/search?q=world+news&hl=en&gl=US&ceid=US:en",
  middleeast: "https://news.google.com/rss/search?q=gaza+israel+iran+war&hl=en&gl=US&ceid=US:en"
};

const extractImage = (item) => {
  const html = item.content || item.contentSnippet || "";
  const match = html.match(/<img[^>]+src="([^">]+)"/);

  return (
    item.enclosure?.url ||
    item["media:content"]?.$?.url ||
    item["media:thumbnail"]?.$?.url ||
    (match ? match[1] : null) ||
    null
  );
};

export default async function handler(req, res) {
  try {
    const category = req.query.category || "top";
    const url = FEEDS[category] || FEEDS.top;

    const feed = await parser.parseURL(url);

    const result = feed.items.map((item, i) => ({
      id: item.guid || item.link || String(i),
      title: item.title || "",
      description: item.contentSnippet || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      image_url: extractImage(item)
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "RSS failed",
      message: err.message
    });
  }
}