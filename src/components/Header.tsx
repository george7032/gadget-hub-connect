import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import logoUrl from "@/assets/logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoUrl}
            alt={`${site.name} logo`}
            className="h-10 w-auto object-contain"
          />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-lg tracking-wide">
              KINGS GADGETS KE
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              {site.domain}
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground md:flex">
          <Link
            to="/shop"
            search={{ q: "", category: "", brand: "", tag: "" }}
            activeProps={{ className: "text-foreground" }}
            className="transition-colors hover:text-foreground"
          >
            Catalogue
          </Link>
          <Link
            to="/shop"
            search={{ tag: "hot", q: "", category: "", brand: "" }}
            className="transition-colors hover:text-foreground"
          >
            Deals
          </Link>
          <Link
            to="/about"
            activeProps={{ className: "text-foreground" }}
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            to="/contact"
            activeProps={{ className: "text-foreground" }}
            className="transition-colors hover:text-foreground"
          >
            Support
          </Link>
        </nav>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-whats px-4 py-2 text-sm font-semibold text-whats-foreground transition-colors hover:bg-whats/90 md:ml-4"
        >
          <span className="size-2 rounded-full bg-whats-foreground/90" />
          <span className="hidden sm:inline">Order on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </a>
      </div>

      <div className="border-t border-border bg-surface/70">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-5 py-2.5">
          <span className="mr-1 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Browse
          </span>
          <Link
            to="/shop"
            search={{ q: "", category: "", brand: "", tag: "" }}
            className="shrink-0 rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold text-background"
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ q: "", category: c.name, brand: "", tag: "" }}
              className="shrink-0 rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
