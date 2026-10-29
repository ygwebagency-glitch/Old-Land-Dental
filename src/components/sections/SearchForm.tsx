import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

/** Inline search form; always routes to /search?q= */
export function SearchForm({ initial = "", autoFocus, onQuery }: { initial?: string; autoFocus?: boolean; onQuery?: (q: string) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initial);
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        navigate({ to: "/search", search: { q: q.trim() } });
      }}
      className="flex w-full max-w-2xl items-center gap-2 rounded-full border border-line bg-card p-1.5 pl-5 shadow-soft focus-within:border-teal"
    >
      <Search className="size-5 shrink-0 text-teal-dark" aria-hidden />
      <label htmlFor="search-page-input" className="sr-only">
        Search our website
      </label>
      <input
        id="search-page-input"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => {
          setQ(e.target.value);
          onQuery?.(e.target.value);
        }}
        placeholder="Search treatments, prices, team…"
        className="h-12 min-w-0 flex-1 bg-transparent text-base text-charcoal outline-none placeholder:text-ink-muted"
      />
      <button type="submit" className="inline-flex min-h-11 items-center rounded-full bg-charcoal px-6 font-semibold text-on-dark hover:bg-charcoal-deep">
        Search
      </button>
    </form>
  );
}
