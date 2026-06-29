import { useNavigate } from "react-router-dom";
import { createNewsId } from "../utils/slug";

function NewsCard({ article }) {
  const navigate = useNavigate();
  const id = createNewsId(article);

  return (
    <div
      onClick={() => navigate(`/news/${id}`, { state: article })}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col h-full"
    >
      {article.image_url && (
        <div className="h-48 w-full overflow-hidden bg-neutral-950 border-b border-neutral-900">
          <img
            src={article.image_url}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow justify-between space-y-2">
        <div>
          <h2 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h2>
          <p className="text-xs text-neutral-400 font-light leading-relaxed mt-2 line-clamp-3">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;