import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, TAGS, type TagKey } from "@/lib/products";
import { brandsOf, priceMaxOf, toProducts } from "@/lib/catalog";
import { listProducts } from "@/lib/catalog.functions";
import { formatKsh } from "@/lib/site";

type ShopSearch = { q: string; category: string; brand: string; tag: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category: typeof search["category"] === "string" ? search["category"] : "",
    brand: typeof search["brand"] === "string" ? search["brand"] : "",
    tag: typeof search["tag"] === "string" ? search["tag"] : "",
  }),
  loader: async () => ({ products: toProducts(await listProducts()) }),
  head: () => ({
    meta: [
      { title: "Shop Gadgets in Kenya — Kings Gadget Catalogue" },
      {
        name: "description",
        content:
          "Browse 130+ gadgets: smart watches, projectors, earbuds, power banks, chargers and CCTV. Search, filter by price and order on WhatsApp.",
      },
      { property: "og:title", content: "Kings Gadget Catalogue" },
      {
        property: "og:description",
        content:
          "Search and filter over 130 gadgets with KSh prices. Order instantly on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const SORTS = ["Newest", "Price: low to high", "Price: high to low"] as const;

function ShopPage() {
  const search = Route.useSearch();
  const { products } = Route.useLoaderData();
  const BRANDS = useMemo(() => brandsOf(products), [products]);
  const PRICE_MAX = useMemo(() => priceMaxOf(products), [products]);
  const navigate = useNavigate({ from: "/shop" });
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Newest");

  const set = (patch: Partial<ShopSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) });

  const effectiveMax = maxPrice ?? PRICE_MAX;
  const results = useMemo(() => {
    const needle = search.q.trim().toLowerCase();
    let list = products.filter((p) => {
      if (search.category && p.category !== search.category) return false;
      if (search.brand && p.brand !== search.brand) return false;
      if (search.tag && !p.tags.includes(search.tag as TagKey)) return false;
      if (p.price > effectiveMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (!needle) return true;
      const haystack = `${p.name} ${p.brand} ${p.category} ${p.tags
        .map((t) => TAGS[t].label)
        .join(" ")}`.toLowerCase();
      return haystack.includes(needle);
    });
    if (sort === "Price: low to high")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low")
      list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, search, effectiveMax, inStockOnly, sort]);

  const activeFilters =
    Boolean(search.category || search.brand || search.tag) ||
    inStockOnly ||
    effectiveMax < PRICE_MAX;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        Catalogue
      </p>
      <h1 className="mt-1 font-display text-4xl tracking-tight sm:text-5xl">
        Every gadget we stock
      </h1>
      <p className="mt-3 max-w-lg text-pretty text-muted-foreground">
        Search by product, brand or category. Prices are in Kenyan shillings and
        every item orders straight through WhatsApp.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6 self-start rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-32">
          <div>
            <label
              htmlFor="search"
              className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              Search
            </label>
            <input
              id="search"
              type="search"
              value={search.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Samsung, projector, earbuds…"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-accent"
            />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Category
            </p>
            <select
              value={search.category}
              onChange={(e) => set({ category: e.target.value })}
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Brand
            </p>
            <select
              value={search.brand}
              onChange={(e) => set({ brand: e.target.value })}
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">All brands</option>
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Max price · {formatKsh(effectiveMax)}
            </p>
            <input
              type="range"
              min={500}
              max={PRICE_MAX}
              step={500}
              value={effectiveMax}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
            />
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Tag
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(Object.keys(TAGS) as TagKey[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set({ tag: search.tag === t ? "" : t })}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                    search.tag === t
                      ? "border-transparent bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {TAGS[t].label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="size-4 accent-accent"
            />
            In stock only
          </label>

          {activeFilters ? (
            <button
              type="button"
              onClick={() => {
                setMaxPrice(null);
                setInStockOnly(false);
                set({ category: "", brand: "", tag: "" });
              }}
              className="w-full rounded-lg border border-border py-2 text-xs font-semibold transition-colors hover:bg-foreground/5"
            >
              Clear filters
            </button>
          ) : null}
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {results.length} {results.length === 1 ? "product" : "products"}
              {search.q ? ` matching “${search.q}”` : ""}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none focus:border-accent"
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {results.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-border bg-surface p-10 text-center">
              <p className="font-display text-2xl">Nothing matched that</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a shorter search word, or clear the filters and browse the
                full catalogue.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
