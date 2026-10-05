import {
  CATEGORY_IMAGES,
  type Category,
  type Product,
  type TagKey,
} from "@/lib/products";
import type { ProductRow } from "@/lib/catalog.functions";

export function imageSrc(imageUrl: string | null, category: string) {
  if (imageUrl) {
    if (imageUrl.startsWith("http") || imageUrl.startsWith("/")) return imageUrl;
    return `/api/public/product-image/${imageUrl}`;
  }
  return (
    CATEGORY_IMAGES[category as Category] ?? CATEGORY_IMAGES["Mobile Accessories"]
  );
}

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category as Category,
    price: row.price,
    oldPrice: row.old_price ?? undefined,
    tags: (row.in_stock ? row.tags : ["sold"]) as TagKey[],
    inStock: row.in_stock,
    image: imageSrc(row.image_url, row.category),
    description: row.description,
    specs: Array.isArray(row.specs) ? row.specs : [],
  };
}

export const toProducts = (rows: ProductRow[]) => rows.map(toProduct);

export function withTag(list: Product[], tag: TagKey, limit?: number) {
  const found = list.filter((p) => p.tags.includes(tag));
  return limit ? found.slice(0, limit) : found;
}

export function categoryCount(list: Product[], category: Category) {
  return list.filter((p) => p.category === category).length;
}

export function related(list: Product[], product: Product, limit = 4) {
  return list
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export const brandsOf = (list: Product[]) =>
  Array.from(new Set(list.map((p) => p.brand))).sort();

export const priceMaxOf = (list: Product[]) =>
  list.length ? Math.max(...list.map((p) => p.price)) : 20000;

export function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
