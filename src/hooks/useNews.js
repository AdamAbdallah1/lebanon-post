import { useEffect, useState } from "react";

function useNews(category) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:3001/news?category=${category}`
        );

        const data = await res.json();

        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [category]);

  return { news, loading, error };
}

export default useNews;