import { useState, useMemo } from "react";
import useNews from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
import CategoryFilter from "../components/CategoryFilter";
import NavBar from "../components/NavBar";
import { detectTrending } from "../lib/trendDetector";

function Dashboard() {
  const [category, setCategory] = useState("lebanon");
  const [lang, setLang] = useState("en");

  const { news, loading, error } = useNews(category);

  const safeNews = Array.isArray(news) ? news : [];
  const hero = safeNews[0] || null;
  const trending = useMemo(() => detectTrending(safeNews).slice(0, 5), [safeNews]);
  const feed = safeNews.slice(1);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 font-medium flex items-center justify-center tracking-wide">
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-white/20 selection:text-white antialiased">
      <NavBar />

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        
        {/* FILTERS & UTILITIES HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <CategoryFilter category={category} setCategory={setCategory} />

          {/* LANGUAGE TOGGLE */}
          <div className="flex items-center gap-1 bg-neutral-900/50 border border-neutral-800 p-1 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 text-xs font-medium tracking-wider rounded-md transition-all ${
                lang === "en" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ar")}
              className={`px-2.5 py-1 text-xs font-medium tracking-wider rounded-md transition-all ${
                lang === "ar" ? "bg-neutral-800 text-white shadow-sm" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              AR
            </button>
          </div>
        </div>

        {/* LOADING SKELETON PLACEHOLDER */}
        {loading && safeNews.length === 0 ? (
          <div className="space-y-12 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-neutral-900 h-[380px] w-full rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 bg-neutral-900 rounded w-1/4" />
                <div className="h-8 bg-neutral-900 rounded w-3/4" />
                <div className="h-4 bg-neutral-900 rounded w-full" />
                <div className="h-4 bg-neutral-900 rounded w-5/6" />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* HERO SECTION */}
            {hero && (
              <section className="group grid md:grid-cols-2 gap-8 items-center relative">
                {hero.image_url && (
                  <div className="overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800/50">
                    <img
                      src={hero.image_url}
                      alt={hero.title}
                      className="h-[380px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-center space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Top Story
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight group-hover:text-neutral-200 transition-colors">
                    {hero.title}
                  </h1>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light line-clamp-4">
                    {hero.description}
                  </p>
                </div>
              </section>
            )}

            {/* TRENDING SECTION */}
            {trending.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                  Trending
                </h2>

                <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                  {trending.map((a) => (
                    <div
                      key={a.id}
                      className="min-w-[260px] max-w-[260px] p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-sm hover:border-neutral-700 transition-all duration-300 group cursor-pointer"
                    >
                      <p className="text-sm font-medium text-neutral-300 line-clamp-2 group-hover:text-white transition-colors leading-snug">
                        {a.title}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* MAIN FEED */}
            {feed.length > 0 && (
              <section className="space-y-4 pt-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {feed.map((a) => (
                    <NewsCard key={a.id} article={a} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {loading && safeNews.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-neutral-900/90 border border-neutral-800 text-neutral-400 px-4 py-2 rounded-full text-xs font-medium tracking-wide shadow-2xl backdrop-blur-md animate-fade-in">
            Updating feed...
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;