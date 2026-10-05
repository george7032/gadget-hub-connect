import { createFileRoute } from "@tanstack/react-router";
import { site, telHref, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Kings Gadget — WhatsApp, Call or Email" },
      {
        name: "description",
        content:
          "Reach Kings Gadget on WhatsApp, phone or email for prices, stock and delivery anywhere in Kenya. Open Monday to Saturday.",
      },
      { property: "og:title", content: "Contact Kings Gadget" },
      {
        property: "og:description",
        content:
          "WhatsApp, call or email Kings Gadget in Nairobi for gadget prices, stock and nationwide delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: site.name,
          telephone: site.phoneDisplay,
          email: site.email,
          address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
          openingHours: "Mo-Sa 09:00-18:00",
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
        Talk to Kings Gadget
      </h1>
      <p className="mt-4 max-w-lg text-pretty text-muted-foreground">
        Tell us what you're looking for and we'll confirm price, stock and
        delivery. WhatsApp gets the fastest reply.
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                WhatsApp
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-tight">
                {site.phoneDisplay}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Phone
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-tight">
                {site.phoneDisplay}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Email
              </dt>
              <dd className="mt-1 text-sm">{site.email}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Location &amp; hours
              </dt>
              <dd className="mt-1 text-sm">
                {site.location} · {site.hours}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whats px-6 py-3 text-sm font-semibold text-whats-foreground transition-colors hover:bg-whats/90"
            >
              <span className="size-2 rounded-full bg-whats-foreground/90" />
              WhatsApp Enquiry
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:bg-foreground/5"
            >
              <span className="font-mono text-xs text-accent">📞</span>
              Call Now
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Follow us
          </p>
          <ul className="mt-4 space-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm transition-colors hover:bg-foreground/5"
                >
                  {s.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
