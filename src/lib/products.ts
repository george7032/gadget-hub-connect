import catWatches from "@/assets/cat-watches.jpg";
import catAudio from "@/assets/cat-audio.jpg";
import catChargers from "@/assets/cat-chargers.jpg";
import catMobile from "@/assets/cat-mobile.jpg";
import catProjectors from "@/assets/cat-projectors.jpg";
import catPowerbanks from "@/assets/cat-powerbanks.jpg";
import catSecurity from "@/assets/cat-security.jpg";
import catCameras from "@/assets/cat-cameras.jpg";
import catCreator from "@/assets/cat-creator.jpg";
import catComputer from "@/assets/cat-computer.jpg";
import catSound from "@/assets/cat-sound.jpg";

export type TagKey =
  | "hot"
  | "best"
  | "new"
  | "offer"
  | "featured"
  | "trending"
  | "limited"
  | "sold";

export const TAGS: Record<TagKey, { label: string; tone: string }> = {
  hot: { label: "🔥 Hot Deal", tone: "bg-hot text-hot-foreground shimmer" },
  best: { label: "⭐ Best Seller", tone: "bg-foreground text-background" },
  new: { label: "🆕 New Arrival", tone: "bg-accent text-accent-foreground" },
  offer: { label: "🎉 Offer", tone: "bg-hot text-hot-foreground" },
  featured: { label: "✅ Featured", tone: "bg-whats text-whats-foreground" },
  trending: { label: "⚡ Trending", tone: "bg-accent text-accent-foreground" },
  limited: { label: "⏳ Limited Stock", tone: "bg-foreground text-background" },
  sold: { label: "❌ Sold Out", tone: "bg-sold text-foreground" },
};

export type Category =
  | "Smart Watches"
  | "Audio Devices"
  | "Chargers"
  | "Mobile Accessories"
  | "Projectors"
  | "Power Banks"
  | "Security Devices"
  | "Cameras"
  | "Microphones"
  | "Tripods"
  | "Computer Accessories"
  | "Sound Systems";

export const CATEGORY_IMAGES: Record<Category, string> = {
  "Smart Watches": catWatches,
  "Audio Devices": catAudio,
  Chargers: catChargers,
  "Mobile Accessories": catMobile,
  Projectors: catProjectors,
  "Power Banks": catPowerbanks,
  "Security Devices": catSecurity,
  Cameras: catCameras,
  Microphones: catCreator,
  Tripods: catCreator,
  "Computer Accessories": catComputer,
  "Sound Systems": catSound,
};

export const CATEGORY_BLURBS: Record<Category, string> = {
  "Smart Watches": "Watches and bands",
  "Audio Devices": "Earbuds and headsets",
  Chargers: "Adapters and cables",
  "Mobile Accessories": "Holders and add-ons",
  Projectors: "Home and business",
  "Power Banks": "Portable power",
  "Security Devices": "Cameras and CCTV",
  Cameras: "Action and webcams",
  Microphones: "Lapel and studio",
  Tripods: "Stands and lights",
  "Computer Accessories": "Cables and hubs",
  "Sound Systems": "Speakers and bars",
};

export const CATEGORIES: { name: Category; blurb: string; image: string }[] = (
  Object.keys(CATEGORY_IMAGES) as Category[]
).map((name) => ({
  name,
  blurb: CATEGORY_BLURBS[name],
  image: CATEGORY_IMAGES[name],
}));

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number | undefined;
  tags: TagKey[];
  inStock: boolean;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};
