import { Link } from "@tanstack/react-router";
import { TAGS, type Product } from "@/lib/products";
import { formatKsh, productWhatsappLink } from "@/lib/site";

export function TagBadge({ tag }: { tag: keyof typeof TAGS }) {
  const t = TAGS[tag];
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${t.tone}`}
    >
      {t.label}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const tag = product.tags[0];

  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-surface p-3 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden rounded-xl"
      >
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={800}
          loading="lazy"
          className={`aspect-[4/3] w-full bg-shelf object-cover transition-transform duration-500 group-hover:scale-105 ${
            product.inStock ? "" : "opacity-60 saturate-50"
          }`}
        />
        {tag ? (
          <span className="absolute left-2 top-2">
            <TagBadge tag={tag} />
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 font-sans text-sm font-semibold leading-snug">
          {product.name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">
            {formatKsh(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="font-mono text-xs text-muted-foreground line-through">
              {formatKsh(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex gap-2 pt-1">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="flex-1 rounded-lg border border-border py-2 text-center text-xs font-semibold transition-colors hover:bg-foreground/5"
          >
            View Details
          </Link>
          {product.inStock ? (
            <a
              href={productWhatsappLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg bg-whats py-2 text-center text-xs font-semibold text-whats-foreground transition-colors hover:bg-whats/90"
            >
              WhatsApp
            </a>
          ) : (
            <a
              href={productWhatsappLink(product.name)}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-lg bg-muted py-2 text-center text-xs font-semibold text-muted-foreground"
            >
              Waitlist
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
