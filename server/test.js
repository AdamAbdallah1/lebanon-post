try {
  const res = await fetch("https://www.lbcgroup.tv/Rss/News/en/8/lebanon-news");
  console.log("STATUS:", res.status);
  const text = await res.text();
  console.log(text.slice(0, 300));
} catch (e) {
  console.log("ERROR:", e.message);
}