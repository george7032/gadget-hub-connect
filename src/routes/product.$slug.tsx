import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard, TagBadge } from "@/components/ProductCard";
import { related, toProducts } from "@/lib/catalog";
import { listProducts } from "@/lib/catalog.functions";
import { formatKsh, productWhatsappLink, site, telHref } from "@/lib/site";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params }) => {
    const products = toProducts(await listProducts());
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product, products };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — Kings Gadget" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — ${formatKsh(product.price)} | Kings Gadget`;
    const description = `${product.description} Order the ${product.name} on WhatsApp from Kings Gadget Kenya.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${product.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/product/${product.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            brand: { "@type": "Brand", name: product.brand },
            category: product.category,
            sku: product.id,
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "KES",
              availability: product.inStock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              seller: { "@type": "Organization", name: site.name },
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, products } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link
          to="/shop"
          search={{ q: "", category: product.category, brand: "", tag: "" }}
          className="hover:text-foreground"
        >
          {product.category}
        </Link>
      </nav>

      <div className="mt-5 rounded-3xl border border-border bg-surface p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <img
              src={gallery[active]}
              alt={product.name}
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-2xl bg-shelf object-cover"
            />
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`${product.name} view ${i + 1}`}
                  className={`overflow-hidden rounded-lg border ${
                    active === i ? "border-accent" : "border-border"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    className="aspect-square w-full bg-shelf object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {product.category} · {product.brand}
              </span>
              {product.tags.map((t) => (
                <TagBadge key={t} tag={t} />
              ))}
            </div>

            <h1 className="mt-3 font-display text-4xl tracking-tight">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl tracking-tight text-accent">
                {formatKsh(product.price)}
              </span>
              {product.oldPrice ? (
                <span className="font-mono text-sm text-muted-foreground line-through">
                  {formatKsh(product.oldPrice)}
                </span>
              ) : null}
              <span
                className={`font-mono text-[11px] ${
                  product.inStock ? "text-whats" : "text-muted-foreground"
                }`}
              >
                {product.inStock
                  ? "In stock · ships in 24h"
                  : "Sold out · ask to be notified"}
              </span>
            </div>

            <p className="mt-4 text-pretty text-sm text-muted-foreground">
              {product.description}
            </p>

            <dl className="mt-5 grid gap-x-6 gap-y-2 rounded-xl border border-border bg-background p-4 font-mono text-xs sm:grid-cols-2">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex justify-between gap-3 ${
                    i < product.specs.length - 2
                      ? "border-b border-border pb-2"
                      : ""
                  }`}
                >
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="text-right">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={productWhatsappLink(product.name)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whats px-6 py-3 text-sm font-semibold text-whats-foreground transition-colors hover:bg-whats/90"
              >
                <span className="size-2 rounded-full bg-whats-foreground/90" />
                WhatsApp Enquiry
              </a>
              <a
                href={telHref}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
              >
                <span className="font-mono text-xs text-accent">📞</span>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          More in {product.category}
        </p>
        <h2 className="mt-1 font-display text-3xl tracking-tight">
          You may also like
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related(products, product).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
