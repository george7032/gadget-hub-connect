import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, TAGS, type TagKey } from "@/lib/products";
import { imageSrc, slugify } from "@/lib/catalog";
import { formatKsh } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Product Manager — Kings Gadgets KE" },
      {
        name: "description",
        content:
          "Update product prices, photos, names, tags and stock for the Kings Gadgets KE catalogue.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Product Manager — Kings Gadgets KE" },
      {
        property: "og:description",
        content: "Private product manager for Kings Gadgets KE.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  old_price: number | null;
  tags: string[];
  in_stock: boolean;
  image_url: string | null;
  description: string;
  specs: { label: string; value: string }[];
  sort_order: number;
};

type Draft = {
  id: string | null;
  name: string;
  brand: string;
  category: string;
  price: string;
  oldPrice: string;
  tags: TagKey[];
  inStock: boolean;
  description: string;
  specsText: string;
  imageUrl: string | null;
};

const emptyDraft: Draft = {
  id: null,
  name: "",
  brand: "Generic",
  category: "Mobile Accessories",
  price: "",
  oldPrice: "",
  tags: [],
  inStock: true,
  description: "",
  specsText: "",
  imageUrl: null,
};

function toDraft(row: Row): Draft {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    price: String(row.price),
    oldPrice: row.old_price ? String(row.old_price) : "",
    tags: row.tags as TagKey[],
    inStock: row.in_stock,
    description: row.description,
    specsText: (row.specs ?? [])
      .map((s) => `${s.label}: ${s.value}`)
      .join("\n"),
    imageUrl: row.image_url,
  };
}

function AdminPage() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true })
      .limit(2000);
    setLoading(false);
    if (loadError) {
      setError(loadError.message);
      return;
    }
    setRows((data ?? []) as unknown as Row[]);
  }

  useEffect(() => {
    void load();
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) =>
      `${r.name} ${r.brand} ${r.category}`.toLowerCase().includes(needle),
    );
  }, [rows, query]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function uploadImage(file: File) {
    setStatus("Uploading photo…");
    setError("");
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${slugify(draft?.name || "product")}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (uploadError) {
      setStatus("");
      setError(uploadError.message);
      return;
    }
    setDraft((d) => (d ? { ...d, imageUrl: path } : d));
    setStatus("Photo ready — remember to save.");
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError("");
    setStatus("");

    const specs = draft.specsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const idx = line.indexOf(":");
        return idx === -1
          ? { label: line, value: "" }
          : {
              label: line.slice(0, idx).trim(),
              value: line.slice(idx + 1).trim(),
            };
      });

    const payload = {
      name: draft.name.trim(),
      brand: draft.brand.trim() || "Generic",
      category: draft.category,
      price: Number(draft.price) || 0,
      old_price: draft.oldPrice ? Number(draft.oldPrice) : null,
      tags: draft.tags,
      in_stock: draft.inStock,
      description: draft.description.trim(),
      specs,
      image_url: draft.imageUrl,
    };

    if (!payload.name) {
      setSaving(false);
      setError("Give the product a name first.");
      return;
    }

    let saveError = null;
    if (draft.id) {
      const { error: updateError } = await supabase
        .from("products")
        .update(payload)
        .eq("id", draft.id);
      saveError = updateError;
    } else {
      const { error: insertError } = await supabase.from("products").insert({
        ...payload,
        slug: `${slugify(payload.name)}-${Date.now().toString(36).slice(-4)}`,
        sort_order: (rows.at(-1)?.sort_order ?? 0) + 1,
      });
      saveError = insertError;
    }

    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setDraft(null);
    setStatus("Saved. The website is updated.");
    await load();
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete “${row.name}” from the website?`)) return;
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", row.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setStatus(`${row.name} deleted.`);
    await load();
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
            Product manager
          </p>
          <h1 className="mt-1 font-display text-4xl tracking-tight">
            Your catalogue
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {rows.length} products live on the website.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setDraft({ ...emptyDraft });
              setStatus("");
              setError("");
            }}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            + Add product
          </button>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground/5"
          >
            Sign out
          </button>
        </div>
      </div>

      {status ? (
        <p className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-whats">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="mt-4 rounded-lg border border-destructive/40 bg-surface px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {draft ? (
        <div className="mt-6 rounded-2xl border border-accent/40 bg-surface p-6">
          <h2 className="font-display text-2xl tracking-tight">
            {draft.id ? "Edit product" : "New product"}
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
            <div>
              <img
                src={imageSrc(draft.imageUrl, draft.category)}
                alt={draft.name || "Product photo"}
                width={512}
                height={384}
                className="aspect-[4/3] w-full rounded-xl bg-shelf object-cover"
              />
              <label className="mt-3 block cursor-pointer rounded-lg border border-border px-3 py-2 text-center text-xs font-semibold transition-colors hover:bg-foreground/5">
                Upload new photo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadImage(file);
                  }}
                />
              </label>
              {draft.imageUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => (d ? { ...d, imageUrl: null } : d))
                  }
                  className="mt-2 w-full text-xs text-muted-foreground underline"
                >
                  Use the default category photo
                </button>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Product name">
                <input
                  value={draft.name}
                  onChange={(e) =>
                    setDraft({ ...draft, name: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Brand">
                <input
                  value={draft.brand}
                  onChange={(e) =>
                    setDraft({ ...draft, brand: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Price (KSh)">
                <input
                  type="number"
                  min={0}
                  value={draft.price}
                  onChange={(e) =>
                    setDraft({ ...draft, price: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Old price (optional)">
                <input
                  type="number"
                  min={0}
                  value={draft.oldPrice}
                  onChange={(e) =>
                    setDraft({ ...draft, oldPrice: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Category">
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value })
                  }
                  className={inputClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Availability">
                <label className="mt-2 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.inStock}
                    onChange={(e) =>
                      setDraft({ ...draft, inStock: e.target.checked })
                    }
                    className="size-4 accent-accent"
                  />
                  In stock
                </label>
              </Field>

              <div className="sm:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Tags
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(Object.keys(TAGS) as TagKey[]).map((t) => {
                    const on = draft.tags.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() =>
                          setDraft({
                            ...draft,
                            tags: on
                              ? draft.tags.filter((x) => x !== t)
                              : [...draft.tags, t],
                          })
                        }
                        className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                          on
                            ? "border-transparent bg-foreground text-background"
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {TAGS[t].label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="sm:col-span-2">
                <Field label="Description">
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Specs — one per line, like  Battery: 10 days">
                  <textarea
                    rows={4}
                    value={draft.specsText}
                    onChange={(e) =>
                      setDraft({ ...draft, specsText: e.target.value })
                    }
                    className={`${inputClass} font-mono text-xs`}
                  />
                </Field>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => void save()}
              disabled={saving}
              className="rounded-full bg-whats px-6 py-2.5 text-sm font-semibold text-whats-foreground transition-colors hover:bg-whats/90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground/5"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your products…"
        className="mt-8 w-full max-w-sm rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading products…</p>
      ) : (
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
          {results.map((row) => (
            <div
              key={row.id}
              className="flex flex-wrap items-center gap-4 p-4"
            >
              <img
                src={imageSrc(row.image_url, row.category)}
                alt={row.name}
                width={128}
                height={96}
                loading="lazy"
                className="aspect-[4/3] w-20 shrink-0 rounded-lg bg-shelf object-cover"
              />
              <div className="min-w-[200px] flex-1">
                <p className="text-sm font-semibold">{row.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {row.category} · {row.brand} ·{" "}
                  {row.in_stock ? "In stock" : "Sold out"}
                </p>
              </div>
              <p className="font-display text-lg tracking-tight">
                {formatKsh(row.price)}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDraft(toDraft(row));
                    setStatus("");
                    setError("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-lg border border-border px-4 py-2 text-xs font-semibold transition-colors hover:bg-foreground/5"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => void remove(row)}
                  className="rounded-lg border border-destructive/40 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!results.length ? (
            <p className="p-6 text-sm text-muted-foreground">
              No products matched that search.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}
