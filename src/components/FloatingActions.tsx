import { site, telHref, whatsappLink } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="grid size-12 place-items-center rounded-full border border-border bg-surface text-sm font-bold text-foreground shadow-sm transition-colors hover:bg-foreground/5"
      >
        ↑
      </button>
      <a
        href={telHref}
        aria-label={`Call ${site.name}`}
        className="grid size-12 place-items-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/90"
      >
        📞
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${site.name}`}
        className="grid size-12 place-items-center rounded-full bg-whats text-lg text-whats-foreground transition-colors hover:bg-whats/90"
      >
        ✆
      </a>
    </div>
  );
}
