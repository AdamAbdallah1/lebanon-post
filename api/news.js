import Parser from "rss-parser";

const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (RSS Reader)"
  }
});

const FEEDS = {
  top: "https://www.lbcgroup.tv/Rss/latest-news/ar",
  highlights: "https://www.lbcgroup.tv/Rss/NewsHighlights/ar",

  lebanon: "https://www.lbcgroup.tv/Rss/News/ar/1/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D9%84%D8%A8%D9%86%D8%A7%D9%86",
  sports: "https://www.lbcgroup.tv/Rss/News/ar/107/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9",
  breaking: "https://www.lbcgroup.tv/Rss/News/ar/123/%D8%AE%D8%A8%D8%B1-%D8%B9%D8%A7%D8%AC%D9%84",
  world: "https://www.lbcgroup.tv/Rss/News/ar/6/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D8%AF%D9%88%D9%84%D9%8A%D8%A9",
  economy: "https://www.lbcgroup.tv/Rss/News/ar/25/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF",
  tech: "https://www.lbcgroup.tv/Rss/News/ar/49/%D8%B9%D9%84%D9%88%D9%85-%D9%88%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7",
  breaking: "https://www.lbcgroup.tv/Rss/News/ar/123/%D8%AE%D8%A8%D8%B1-%D8%B9%D8%A7%D8%AC%D9%84",
};

const extractImage = (item) => {
  const html = item.content || item.contentSnippet || "";
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);

  return (
    item.enclosure?.url ||
    item["media:content"]?.$?.url ||
    item["media:thumbnail"]?.$?.url ||
    (imgMatch ? imgMatch[1] : null) ||
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
      image_url: extractImage(item),
    }));

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: "RSS failed",
      message: err.message,
    });
  }
}