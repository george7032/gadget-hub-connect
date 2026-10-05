# Gadget Connect Hub

Below is a consolidated version of the website planning discussion we had for **Kings Gadget**.

# Kings Gadget Website Concept

**Website:** www.kingsgadgets.co.ke

**Business Type:**

A modern online gadget catalogue and WhatsApp-commerce website for selling electronics and accessories across Kenya.

**Tagline:**

*Technology Made Simple, Quality You Can Trust.*

---

# Business Overview

Kings Gadget is a trusted destination for quality electronics and technology accessories in Kenya. The business offers a wide range of gadgets including smart watches, earpods, chargers, projectors, sound systems, power banks, cameras, mobile accessories, and security devices.

The main objective of the website is to allow customers to browse products, view pricing and specifications, and contact the business directly via WhatsApp.

---

# Products Sold

### Smart Devices

- Oraimo Smart Watches

- Smart Bands

- Android Keyboards

### Audio Devices

- Earpods

- Bluetooth Earbuds

- Sound Bars

- Bluetooth Speakers

### Chargers & Accessories

- Samsung Original Chargers

- Oraimo Chargers

- Phone Holders

- Mobile Accessories

### Projectors

- T6 Projector

- A10 Projector

- HY300 Mini Projector

- Xnano Projector

- T7 Projector

- Epson Projectors

### Computer & TV Accessories

- HDMI Cables

- HDMI Splitters

- Adapters

### Content Creation

- Lapel Microphones

- Tripods

### Security Devices

- Bulb Cameras

- CCTV Accessories

### Power Solutions

- Power Banks

---

# Website Goal

The website should look and function like an e-commerce store similar to:

- Jumia

- Amazon

- AliExpress

But WITHOUT:

- User registration

- Login system

- Shopping cart

- Checkout process

The primary conversion method will be WhatsApp.

---

# Home Page Structure

### Hero Section

Large banner showcasing featured gadgets.

### Featured Products

Top-selling items.

### Hot Deals

Discounted products.

### Categories Section

Visual category navigation.

### Best Sellers

Popular products.

### New Arrivals

Latest products.

### Why Choose Us

- Genuine Products

- Affordable Prices

- Fast Delivery

- Excellent Support

### Testimonials

Customer reviews and feedback.

### Contact Section

Phone

WhatsApp

Email

Location

### Footer

Navigation links

Social media links

Contact details

---

# Product Catalogue

The website should support over 100 products.

Customers should be able to:

- Browse products

- Search products

- Filter products

- View images

- View prices

- View descriptions

- Contact via WhatsApp

---

# Product Card Layout

Each item should display:

- Product Image

- Product Name

- Price

- Product Tag

- View Details Button

- WhatsApp Button

Example:

HY300 Mini Projector

KSh 8,500

🔥 HOT DEAL

[View Details]

[Order on WhatsApp]

---

# Product Details Page

When a customer clicks a product they should see:

### Product Gallery

Multiple images

### Product Name

Example:

HY300 Mini Projector

### Price

### Description

### Specifications

### Availability

### Category

### Product Status

Buttons:

🟢 WhatsApp Enquiry

📞 Call Now

---

# WhatsApp Integration

Every product should have a WhatsApp icon.

When clicked it automatically opens:

```text

Hello Kings Gadget.

I am interested in the HY300 Mini Projector.

Please share more details.

```

Example link:

```html

https://wa.me/2547XXXXXXXX?text=Hello%20Kings%20Gadget.%20I%20am%20interested%20in%20the%20HY300%20Mini%20Projector.

```

---

# Categories

### Smart Watches

### Audio Devices

### Chargers

### Mobile Accessories

### Projectors

### Power Banks

### Security Devices

### Cameras

### Microphones

### Tripods

### Computer Accessories

### Sound Systems

---

# Product Tags

Products should support badges such as:

🔥 HOT DEAL

⭐ BEST SELLER

🆕 NEW ARRIVAL

🎉 OFFER

✅ FEATURED

⚡ TRENDING

⏳ LIMITED STOCK

❌ SOLD OUT

These appear on the product cards.

---

# Search Function

Users should search by:

- Product Name

- Category

- Brand

- Tags

Example:

Search:

"Samsung"

Returns:

- Samsung Charger

- Samsung Adapter

- Samsung Accessories

---

# Filters

### Category Filter

### Brand Filter

### Price Range Filter

### Availability Filter

### Product Tag Filter

---

# Social Media Integration

The website should prominently display:

- Facebook

- Instagram

- TikTok

- YouTube

- X (Twitter)

- WhatsApp

Links should appear:

- Header

- Footer

- Contact Section

---

# Floating Buttons

Visible while scrolling:

🟢 WhatsApp

📞 Call

⬆ Back To Top

---

# About Us

> Kings Gadget is your trusted destination for quality electronics and technology accessories in Kenya. We offer a wide range of smart watches, projectors, power banks, sound systems, mobile accessories, and security devices at affordable prices. Our mission is to provide reliable technology products coupled with excellent customer service.

---

# Product Management

Since you don't want a traditional backend, products can be managed using:

### Option A (Recommended)

WordPress + WooCommerce

Benefits:

- Add products easily

- Upload images

- Edit prices

- Set Sold Out labels

- Create categories

No coding required.

### Option B

Use a JSON-based catalogue.

Example:

```json

{

  "id": "001",

  "name": "HY300 Mini Projector",

  "price": 8500,

  "category": "Projectors",

  "tag": "Hot Deal",

  "image": "hy300.jpg",

  "description": "Portable HD projector"

}

```

The website automatically reads products from the file.

---

# SEO Requirements

The website should include:

- Meta Titles

- Meta Descriptions

- Product SEO URLs

- Open Graph Tags

- Structured Data

- Google Indexing Support

---

# Scalability

The system must comfortably handle:

- 100+ products

- Multiple categories

- Multiple product images

- New product additions

- Product updates

- Product tagging

without redesigning the website.

---

# Final Vision

A **modern gadget catalogue website** for Kings Gadget that feels like a full e-commerce platform but uses **WhatsApp as the primary ordering system**. Customers browse products, view details, see prices, and instantly contact the business through WhatsApp, while the owner can easily manage products, prices, images, offers, and sold-out statuses.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/97c9b84e-435b-4fd8-b52f-9ae9a02e5128).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
