import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/products";
import { site } from "@/lib/site";
import logoUrl from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="inline-flex items-center gap-2.5 rounded-lg bg-background p-2">
            <img
              src={logoUrl}
              alt={`${site.name} logo`}
              className="h-10 w-auto object-contain"
            />
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-lg tracking-wide text-foreground">
                KINGS GADGETS KE
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60">
                {site.domain}
              </span>
            </span>
          </span>
          <p className="mt-2 max-w-xs text-sm text-background/60">
            Genuine electronics, fairly priced, delivered across Kenya. Order in
            one tap on WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-background/20 px-3 py-1 transition-colors hover:bg-background/10"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/50">
            Get in touch
          </p>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            <li>WhatsApp · {site.phoneDisplay}</li>
            <li>Call · {site.phoneDisplay}</li>
            <li>Email · {site.email}</li>
            <li>
              {site.location} · {site.hours}
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/50">
            Categories
          </p>
          <ul className="mt-3 space-y-2 text-sm text-background/80">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.name}>
                <Link
                  to="/shop"
                  search={{ q: "", category: c.name, brand: "", tag: "" }}
                  className="transition-colors hover:text-background"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-background/50">
          <span>© {new Date().getFullYear()} Kings Gadget · Made in Nairobi</span>
          <span className="flex gap-4">
            <Link
              to="/shop"
              search={{ q: "", category: "", brand: "", tag: "" }}
              className="hover:text-background"
            >
              Catalogue
            </Link>
            <Link to="/about" className="hover:text-background">
              About
            </Link>
            <Link to="/contact" className="hover:text-background">
              Contact
            </Link>
            <Link to="/auth" className="hover:text-background">
              Login
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
