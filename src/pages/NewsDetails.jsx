import { useLocation, useNavigate, useParams } from "react-router-dom";

function NewsDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const article = state;

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-neutral-400 font-medium flex items-center justify-center tracking-wide">
        <div className="px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm">
          Article not found (open from homepage)
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-100 selection:bg-white/20 selection:text-white antialiased">
      <div className="max-w-3xl mx-auto px-6 py-12">
        
        {/* BACK ACTION */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group mb-8"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back
        </button>

        {/* IMAGE BREAKOUT */}
        {article.image_url && (
          <div className="rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-950 mb-8">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <article className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="h-[1px] bg-neutral-900 w-full my-6" />

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line">
            {article.description}
          </p>

          {/* EXTERNAL LINK BADGE */}
          <div className="pt-6">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/50 text-white transition-all shadow-sm"
            >
              Open original source
              <span className="text-neutral-500 text-[10px]">↗</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export default NewsDetails;