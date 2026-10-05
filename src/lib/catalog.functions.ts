import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type ProductRow = {
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

export const listProducts = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductRow[]> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const client = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await client
      .from("products")
      .select(
        "id, slug, name, brand, category, price, old_price, tags, in_stock, image_url, description, specs, sort_order",
      )
      .order("sort_order", { ascending: true })
      .limit(2000);

    if (error) throw new Error(error.message);
    return (data ?? []) as ProductRow[];
  },
);
