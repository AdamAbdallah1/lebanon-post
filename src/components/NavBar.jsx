import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { dict } from "../i18n/dict";

function NavBar({ search, setSearch }) {
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  const t = dict[lang];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* LEFT: LANGUAGE RIG */}
        <div className="flex items-center gap-1 bg-neutral-950/80 border border-neutral-900 p-1 rounded-lg self-start sm:self-auto">
          {["en", "ar", "fr"].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-md transition-all ${
                lang === l ? "bg-neutral-800 text-white shadow" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* CENTER: BRAND */}
        <h1 className="tracking-[0.35em] text-sm font-bold uppercase text-white text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2 pointer-events-none">
          Lebanon Post
        </h1>

        {/* RIGHT: SEARCH & UTILITIES */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search}
              className="px-4 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 text-xs w-full sm:w-52 text-neutral-200 placeholder-neutral-500 transition-all"
            />
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-[11px] font-medium tracking-wide uppercase px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-700 bg-neutral-900/20 text-neutral-300 hover:text-white transition-all flex items-center justify-center min-w-[70px]"
          >
            {theme}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;