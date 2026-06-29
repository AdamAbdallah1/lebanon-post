import express from "express";
import cors from "cors";
import Parser from "rss-parser";

const app = express();
app.use(cors());

const parser = new Parser({
  headers: {
    "User-Agent": "Mozilla/5.0 (RSS Reader)"
  }
});

const FEEDS = {
  // EN + general
  top: "https://www.lbcgroup.tv/Rss/latest-news/ar",
  highlights: "https://www.lbcgroup.tv/Rss/NewsHighlights/ar",

  // ARABIC categories
  lebanon: "https://www.lbcgroup.tv/Rss/News/ar/1/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D9%84%D8%A8%D9%86%D8%A7%D9%86",
  sports: "https://www.lbcgroup.tv/Rss/News/ar/107/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9",
  breaking: "https://www.lbcgroup.tv/Rss/News/ar/123/%D8%AE%D8%A8%D8%B1-%D8%B9%D8%A7%D8%AC%D9%84",
  world: "https://www.lbcgroup.tv/Rss/News/ar/6/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1-%D8%AF%D9%88%D9%84%D9%8A%D8%A9",
  economy: "https://www.lbcgroup.tv/Rss/News/ar/25/%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF",
  tech: "https://www.lbcgroup.tv/Rss/News/ar/49/%D8%B9%D9%84%D9%88%D9%85-%D9%88%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7",
  wrongnews: "https://www.lbcgroup.tv/Rss/News/ar/88/%D8%AE%D8%A8%D8%B1-%D9%83%D8%A7%D8%B0%D8%A8",
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

app.get("/news", async (req, res) => {
  try {
    const category = req.query.category || "top";
    const url = FEEDS[category] || FEEDS.top;

    console.log("Fetching RSS:", url);

    const feed = await parser.parseURL(url);

    const result = feed.items.map((item, i) => ({
  id: item.guid || item.link || String(i),
  title: item.title || "",
  description: item.contentSnippet || "",
  link: item.link || "",
  pubDate: item.pubDate || "",

  // FIXED IMAGE EXTRACTION
  image_url: extractImage(item),
}));

    res.json(result);
  } catch (err) {
    console.log("RSS ERROR:", err.message);

    res.status(500).json({
      error: "RSS failed",
      message: err.message
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});