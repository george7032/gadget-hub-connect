import { createFileRoute, Link } from "@tanstack/react-router";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Kings Gadget — Trusted Electronics in Kenya" },
      {
        name: "description",
        content:
          "Kings Gadget supplies genuine smart watches, projectors, power banks, sound systems and security devices across Kenya at affordable prices.",
      },
      { property: "og:title", content: "About Kings Gadget" },
      {
        property: "og:description",
        content:
          "Who we are: a Nairobi-based gadget shop selling genuine electronics with WhatsApp ordering and nationwide delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const PROMISES = [
  {
    title: "Genuine Products",
    body: "We stock authentic Samsung, Oraimo, Epson and JBL lines, plus tested accessories.",
  },
  {
    title: "Affordable Prices",
    body: "Fair KSh pricing with regular hot deals and offers on fast-moving items.",
  },
  {
    title: "Fast Delivery",
    body: "Same-day dispatch within Nairobi and courier delivery countrywide.",
  },
  {
    title: "Excellent Support",
    body: "A real person answers your WhatsApp — before and after you buy.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        About us
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl">
        Technology made simple, quality you can trust.
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-muted-foreground">
        {site.about}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <h2 className="font-display text-xl tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/shop"
          search={{ q: "", category: "", brand: "", tag: "" }}
          className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
        >
          Browse the catalogue
        </Link>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
        >
          <span className="size-2 rounded-full bg-whats" />
          Chat with us
        </a>
      </div>
    </div>
  );
}
