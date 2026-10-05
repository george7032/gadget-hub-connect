/**
 * Central business details. Update the phone number here and every WhatsApp
 * link, call button and contact line across the site updates with it.
 */
export const site = {
  name: "Kings Gadget",
  domain: "kingsgadgets.co.ke",
  tagline: "Technology Made Simple, Quality You Can Trust.",
  whatsapp: "254748123478",
  phoneDisplay: "+254 748 123478",
  email: "hello@kingsgadgets.co.ke",
  location: "Nairobi, Kenya",
  hours: "Mon–Sat · 9:00 – 18:00",
  about:
    "Kings Gadget is your trusted destination for quality electronics and technology accessories in Kenya. We offer a wide range of smart watches, projectors, power banks, sound systems, mobile accessories and security devices at affordable prices. Our mission is to provide reliable technology products coupled with excellent customer service.",
  socials: [
    { label: "Facebook", href: "https://facebook.com/kingsgadget" },
    { label: "Instagram", href: "https://instagram.com/kingsgadget" },
    { label: "TikTok", href: "https://tiktok.com/@kingsgadget" },
    { label: "YouTube", href: "https://youtube.com/@kingsgadget" },
    { label: "X", href: "https://x.com/kingsgadget" },
  ],
} as const;

export const telHref = `tel:+${site.whatsapp}`;

export function whatsappLink(message?: string) {
  const text =
    message ??
    `Hello ${site.name}. I would like to know more about your products.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function productWhatsappLink(productName: string) {
  return whatsappLink(
    `Hello ${site.name}. I am interested in the ${productName}. Please share more details.`,
  );
}

export function formatKsh(value: number) {
  if (!value) return "Ask for price";
  return `KSh ${value.toLocaleString("en-KE")}`;
}
