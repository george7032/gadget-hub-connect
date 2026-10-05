import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-gadgets.jpg";
import { ProductCard, TagBadge } from "@/components/ProductCard";
import { CATEGORIES, type Product } from "@/lib/products";
import { categoryCount, toProducts, withTag } from "@/lib/catalog";
import { listProducts } from "@/lib/catalog.functions";
import { formatKsh, site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: async () => ({ products: toProducts(await listProducts()) }),
  head: () => ({
    meta: [
      { title: "Kings Gadget — Gadgets & Electronics in Kenya" },
      {
        name: "description",
        content:
          "Buy genuine smart watches, projectors, earbuds, power banks, chargers and CCTV in Kenya. Browse prices in KSh and order instantly on WhatsApp.",
      },
      {
        property: "og:title",
        content: "Kings Gadget — Gadgets & Electronics in Kenya",
      },
      {
        property: "og:description",
        content:
          "Genuine electronics at fair KSh prices, delivered across Kenya. Browse the catalogue and order on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Kings Gadget",
          slogan: "Technology Made Simple, Quality You Can Trust.",
          description:
            "Online gadget catalogue selling electronics and accessories across Kenya with WhatsApp ordering.",
          telephone: "+254 700 000 000",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
        }),
      },
    ],
  }),
  component: Index,
});

const WHY = [
  { title: "Genuine Products", body: "Authentic Samsung, Oraimo, Epson and JBL stock." },
  { title: "Affordable Prices", body: "Fair KSh pricing with weekly hot deals." },
  { title: "Fast Delivery", body: "Same-day in Nairobi, courier countrywide." },
  { title: "Excellent Support", body: "A real person on WhatsApp, before and after." },
];

const TESTIMONIALS = [
  {
    name: "Brian K.",
    place: "Nairobi",
    body: "Ordered the HY300 projector on WhatsApp at lunchtime and it was delivered the same evening. Exactly as described.",
  },
  {
    name: "Aisha M.",
    place: "Mombasa",
    body: "Bought two Oraimo watches for my sisters. Genuine, sealed and cheaper than the shops in town.",
  },
  {
    name: "Peter O.",
    place: "Nakuru",
    body: "They talked me through the right sound bar for my TV instead of pushing the expensive one. Great service.",
  },
];

function Index() {
  const { products } = Route.useLoaderData();
  const hotDeals = withTag(products, "hot", 4);
  const bestSellers = withTag(products, "best", 4);
  const newArrivals = withTag(products, "new", 4);
  const featured = products[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 -rotate-12 animate-drift rounded-[2rem] glass-panel" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rotate-6 animate-drift2 rounded-[2rem] border border-white/30 bg-accent/10 backdrop-blur-2xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <p className="animate-fade font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Est. Nairobi · WhatsApp commerce
            </p>
            <h1 className="mt-4 animate-rise text-balance font-display text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              Technology made simple.
              <span className="block text-accent">Quality you can trust.</span>
            </h1>
            <p className="mt-5 max-w-md animate-rise text-pretty text-muted-foreground [animation-delay:120ms]">
              Smart watches, projectors, sound and security gear — genuine,
              fairly priced, delivered across Kenya. No cart. One tap to order.
            </p>
            <div className="mt-7 flex animate-rise flex-wrap items-center gap-3 [animation-delay:200ms]">
              <Link
                to="/shop"
                search={{ q: "", category: "", brand: "", tag: "" }}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
              >
                Browse the catalogue
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5"
              >
                <span className="size-2 rounded-full bg-whats" />
                Chat with us
              </a>
            </div>
            <div className="mt-8 flex gap-6 border-t border-border pt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <span>
                <b className="text-foreground">{products.length}+</b> products
              </span>
              <span>
                <b className="text-foreground">24h</b> dispatch
              </span>
              <span>
                <b className="text-foreground">100%</b> genuine
              </span>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="animate-slide rounded-3xl glass-panel p-3 [animation-delay:160ms]">
              <img
                src={heroImage}
                alt="Smart watch and wireless earbuds on a glass shelf"
                width={1024}
                height={1024}
                className="aspect-square w-full rounded-2xl object-cover"
              />
              {featured ? (
                <div className="flex items-center justify-between gap-3 px-2 py-3">
                  <div>
                    <p className="text-sm font-semibold">{featured.name}</p>
                    <p className="font-mono text-xs text-accent">
                      {formatKsh(featured.price)}
                    </p>
                  </div>
                  {featured.tags[0] ? <TagBadge tag={featured.tags[0]} /> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* HOT DEALS */}
      <ProductSection
        eyebrow="(a) Featured"
        title="Hot deals this week"
        products={hotDeals}
        tag="hot"
      />

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          (b) Categories
        </p>
        <h2 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
          Shop by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ q: "", category: c.name, brand: "", tag: "" }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <div className="mb-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {categoryCount(products, c.name)} items
                </p>
              </div>
              <img
                src={c.image}
                alt={c.name}
                width={512}
                height={512}
                loading="lazy"
                className="mb-3 mt-3 aspect-square w-full rounded-lg bg-shelf object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <ProductSection
        eyebrow="(c) Best sellers"
        title="What Kenya keeps buying"
        products={bestSellers}
        tag="best"
      />

      {/* NEW ARRIVALS */}
      <ProductSection
        eyebrow="(d) New arrivals"
        title="Just landed in the shop"
        products={newArrivals}
        tag="new"
      />

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          (e) Why choose us
        </p>
        <h2 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
          Four reasons people come back
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div
              key={w.title}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <h3 className="font-display text-xl tracking-tight">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          (f) Testimonials
        </p>
        <h2 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
          Straight from customers
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <blockquote className="text-pretty text-sm text-muted-foreground">
                “{t.body}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="text-foreground">{t.name}</span> · {t.place}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                (g) Contact
              </p>
              <h2 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
                Ready when you are
              </h2>
              <p className="mt-3 max-w-sm text-pretty text-sm text-muted-foreground">
                Send the product name on WhatsApp and we'll confirm price, stock
                and delivery to your area.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whats px-6 py-3 text-sm font-semibold text-whats-foreground transition-colors hover:bg-whats/90"
                >
                  <span className="size-2 rounded-full bg-whats-foreground/90" />
                  WhatsApp Enquiry
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
                >
                  All contact details
                </Link>
              </div>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  WhatsApp
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {site.phoneDisplay}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {site.phoneDisplay}
                </dd>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1 text-sm font-semibold">{site.email}</dd>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Location
                </dt>
                <dd className="mt-1 text-sm font-semibold">{site.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductSection({
  eyebrow,
  title,
  products,
  tag,
}: {
  eyebrow: string;
  title: string;
  products: Product[];
  tag: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-display text-3xl tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
        <Link
          to="/shop"
          search={{ q: "", category: "", brand: "", tag }}
          className="hidden shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:block"
        >
          View all →
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
