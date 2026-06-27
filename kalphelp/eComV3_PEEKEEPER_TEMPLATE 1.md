# CMS Website Generator — Standard Prompt Template v3

> **Purpose:** Generate a complete, production-ready single-product e-commerce CMS website.
> **Stack:** Next.js 15, TypeScript, Redux Toolkit, Tailwind CSS, MongoDB (orders/reviews), JSON (static pages), Shopify-inspired product variant model.
> **Pattern:** Tokenized, theme-driven, JSON-first, EditableText-enabled, SEO-ready, responsive, type-safe, component-driven.

---

## How To Use This Template

```
SECTION A — USER INPUTS: Fill these per website (company info, design system, pages, sections, products).
SECTION B — SYSTEM CONFIGURATION: Fixed architecture. Do NOT modify — applies to all CMS websites.
```

When generating a new website:
1. Copy this file
2. Replace all `{{PLACEHOLDER}}` values in SECTION A with your website's data
3. Keep SECTION B as-is
4. Feed the completed prompt to the AI

---

# SECTION A: USER INPUTS
## (Fill these per website — these are the ONLY values that change)

---

## A1. COMPANY INFORMATION

```yaml
COMPANY_NAME: PeeKeeper
PROJECT_SLUG: peekeeper
BUSINESS_TYPE: Pet Product E-Commerce
VERTICAL: Pet Supplies & Accessories
INDUSTRY: Pet Care, Dog Products, Incontinence Solutions
BUSINESS_GOAL: Provide escape-proof diapers and accessories for dogs, giving pet parents peace of mind
COMPANY_TAGLINE: "Escape-Proof Dog Diapers — Freedom for your dog, peace of mind for you."

FOUNDER:
  name: "Lisa"
  title: "Founder & Creator"
  story: "Lisa adopted a senior dog named Dash who needed diapers. Frustrated by products that slipped off or leaked, she created PeeKeeper — a harness-style diaper that stays put. What started on eBay grew into a trusted brand for pet parents worldwide."

LANGUAGES:
  default: en
  active:
    - en

CURRENCIES:
  default: USD
  active:
    - USD

CONTACT:
  email: ""    # Add contact email
  phone: ""    # Add contact phone
  address: ""
  googleMapsUrl: ""
```

---

## A2. DESIGN SYSTEM

### Color Palette

```yaml
colors:
  primary: "#2D6A4F"           # Forest green — buttons, links, accents, trust-building
  primaryLight: "#40916C"      # Hover/light variation
  primaryDark: "#1B4332"       # Active/visited state
  primaryHover: "#40916C"      # Button hover state

  secondary: "#F5F0E8"         # Warm cream — section backgrounds, soft surfaces
  accent: "#D4A373"            # Warm tan/amber — highlights, badges, sale tags, star ratings
  accentSoft: "#FAF7F2"        # Lightest warm surface

  background: "#FFFFFF"        # Page background
  surface: "#F8F9FA"           # Section background
  card: "#FFFFFF"              # Card background

  text: "#1A1A2E"              # Primary text (headings, strong)
  textSecondary: "#4A4A5A"     # Body text
  textMuted: "#8A8A9A"         # Secondary/meta text

  border: "#E2E2E8"            # Borders, dividers
  borderHover: "#C8C8D4"       # Border hover

  star: "#F4B740"              # Star rating color
  sale: "#E63946"              # Sale/price highlight
  success: "#2D6A4F"
  warning: "#F4B740"
  danger: "#E63946"
  error: "#E63946"
  info: "#3B82F6"
  overlay: "rgba(0,0,0,0.4)"

  # Dark mode overrides
  dark:
    background: "#0F172A"
    surface: "#1E293B"
    card: "#1E293B"
    text: "#F8FAFC"
    textSecondary: "#CBD5E1"
    textMuted: "#94A3B8"
    border: "#334155"
```

### Typography

```yaml
typography:
  bodyFont: "'Inter', sans-serif"
  headingFont: "'Inter', sans-serif"
  displayFont: "'Playfair Display', serif"   # Optional for hero/headings
  monoFont: "'JetBrains Mono', monospace"

  sizes:
    xs: "0.75rem"      # 12px
    sm: "0.875rem"     # 14px
    base: "1rem"       # 16px
    md: "1.125rem"     # 18px
    lg: "1.25rem"      # 20px
    xl: "1.5rem"       # 24px
    "2xl": "1.875rem"  # 30px
    "3xl": "2.25rem"   # 36px
    "4xl": "3rem"      # 48px
    "5xl": "3.75rem"   # 60px

  fw:
    light: "300"
    normal: "400"
    medium: "500"
    semibold: "600"
    bold: "700"
    extrabold: "800"

  lineHeight:
    tight: "1.15"
    normal: "1.4"
    relaxed: "1.65"
```

### Spacing, Radius, Shadows

```yaml
spacing:
  1: "0.25rem"  2: "0.5rem"  3: "0.75rem"  4: "1rem"
  5: "1.25rem"  6: "1.5rem"  8: "2rem"     10: "2.5rem"
  12: "3rem"    16: "4rem"   20: "5rem"    24: "6rem"

radius:
  sm: "0.25rem"   md: "0.375rem"   lg: "0.5rem"
  xl: "0.75rem"   "2xl": "1rem"    "3xl": "1.25rem"
  full: "9999px"   # Pill-shaped buttons

shadow:
  sm: "0 1px 3px rgba(0,0,0,.06)"
  md: "0 4px 12px rgba(0,0,0,.08)"
  lg: "0 10px 25px rgba(0,0,0,.1)"
  hover: "0 15px 35px rgba(0,0,0,.12)"
```

### Layout & Components

```yaml
layout:
  container: "1280px"
  navbarHeight: "72px"
  sectionPadding: "5rem"

buttons:
  height: "48px"
  paddingX: "1.75rem"
  radius: "9999px"                    # Pill-shaped buttons
  primaryBackground: "#2D6A4F"
  primaryText: "#FFFFFF"
  primaryHover: "#40916C"
  secondaryBackground: "transparent"
  secondaryText: "#1A1A2E"
  secondaryHover: "#F5F0E8"
  outlineBorder: "#E2E2E8"
  outlineText: "#1A1A2E"
  outlineHoverBackground: "#1A1A2E"
  outlineHoverText: "#FFFFFF"

forms:
  inputHeight: "48px"
  inputPaddingX: "1rem"
  inputPaddingY: "0.75rem"
  inputRadius: "0.5rem"
  inputBackground: "#FFFFFF"
  inputText: "#1A1A2E"
  inputBorder: "#E2E2E8"
  inputBorderHover: "#C8C8D4"
  inputPlaceholder: "#8A8A9A"
  inputFocusBorder: "#2D6A4F"
  inputFocusShadow: "0 0 0 3px rgba(45,106,79,.15)"
  inputDisabledBackground: "#F8F9FA"
  inputDisabledText: "#999999"
  textareaMinHeight: "120px"

modal:
  sm: "400px"
  md: "600px"
  lg: "800px"

product:
  imageMaxWidth: "600px"
  thumbnailSize: "80px"
  swatchSize: "36px"            # Color swatch circle size
  selectHeight: "48px"          # Size/option dropdown height
  quantityWidth: "120px"        # Quantity selector width
  addToCartHeight: "52px"       # Add to cart button height
```

---

## A3. PAGES & ROUTES

### Page Inventory

| # | Page | Slug | Type | Source | Description |
|---|------|------|------|--------|-------------|
| 1 | Home | `/` | Static JSON | `homePage.json` | Hero, brand story, product highlight, values (3 pillars), reviews snippet, CTA |
| 2 | Shop / Product | `/shop` | Static JSON | `shopPage.json` | Single product page with variant selector (size + color + length), add to cart, reviews |
| 3 | About | `/about` | Static JSON | `aboutPage.json` | Founder story (Lisa + Dash), brand mission, values |
| 4 | How to Measure | `/how-to-measure` | Static JSON | `howToMeasurePage.json` | Size guide with waist/length tables, measuring instructions, flexible tape recommendation |
| 5 | Customer Reviews | `/customer-reviews` | Static JSON | `customerReviewsPage.json` | Curated testimonials, review highlights, rating stats |
| 6 | Contact / FAQ | `/contact` | Static JSON | `contactPage.json` | Contact form, FAQ accordion, contact info |

### Route Structure

```
src/app/
  page.tsx                          # Home (/)
  shop/page.tsx                     # Product detail
  about/page.tsx                    # About Us
  how-to-measure/page.tsx           # Size Guide
  customer-reviews/page.tsx         # Reviews
  contact/page.tsx                  # Contact + FAQ
  api/
    [[slug]]/route.ts               # Universal proxy → FastAPI backend
    checkout/route.ts               # Checkout/order submission (proxied)
    reviews/route.ts                # Review submission (proxied)

src/lib/data/pages/
  homePage.json
  shopPage.json
  aboutPage.json
  howToMeasurePage.json
  customerReviewsPage.json
  contactPage.json
  headerData.json
  footerData.json
```

### URL Mapping

| Page | URL |
|------|-----|
| Home | `/` |
| Shop / Product | `/shop` |
| About | `/about` |
| How to Measure | `/how-to-measure` |
| Customer Reviews | `/customer-reviews` |
| Contact | `/contact` |

---

## A4. SECTION CONTENT (Page Blocks)

### Home Page Sections

```yaml
homePage:
  - id: hero-001
    type: hero-split
    layout: split
    adminTitle: Hero Section
    props:
      heading: "Escape-Proof Dog Diapers"
      subheading: "Freedom for your dog. Peace of mind for you."
      description: "Harness-style diapers designed to stay on — no more slips, leaks, or constant monitoring. Created by a dog mom who needed a better solution."
      primaryButtonText: "Shop Now"
      primaryButtonHref: "/shop"
      secondaryButtonText: "How to Measure"
      secondaryButtonHref: "/how-to-measure"
      image:
        src: "/images/premium-puppy-diapers/hero-dog.jpg"
        alt: "Dog wearing PeeKeeper diaper"
      background: "#FFFFFF"

  - id: values-001
    type: values-pillars
    layout: three-column
    adminTitle: Three Pillars
    props:
      sectionTitle: "Why Pet Parents Love PeeKeeper"
      sectionDescription: "Three simple promises that make our diapers different."
      pillars:
        - icon: "ShieldCheck"     # Lucide icon name
          title: "Escape-Proof"
          description: "Our patented harness-style design wraps around your dog's waist and tail — no slipping, no sliding, no escapes. Your dog stays comfortable and covered."
        - icon: "Droplets"
          title: "Leak-Proof"
          description: "Multi-layer absorbent core locks moisture away from skin. Say goodbye to wet floors, furniture, and bedding. Washable and reusable."
        - icon: "Heart"
          title: "Dog-Loved"
          description: "Soft cotton flannel and long-staple cotton options. Gentle on sensitive skin. Dogs forget they're wearing them — and you get your peace of mind back."

  - id: product-highlight-001
    type: product-spotlight
    layout: split
    adminTitle: Product Highlight
    props:
      sectionTitle: "The Original Escape-Proof Dog Diaper"
      image:
        src: "/images/premium-puppy-diapers/product-spotlight.jpg"
        alt: "PeeKeeper diaper product shot"
      features:
        - "Harness-style wrap: wraps around waist and tail for a secure fit"
        - "Available in 3 sizes: XS, Small, Medium"
        - "7 beautiful colors: Denim, Fire Engine Red, Walnut, Lilac, Peri, Hot Pink, Pink Begonia"
        - "100% cotton flannel and long-staple cotton options"
        - "Machine washable and reusable"
      price: "$46.99"
      rating: 4.86
      reviewCount: 125
      ctaText: "Shop the Diaper"
      ctaHref: "/shop"

  - id: reviews-snippet-001
    type: reviews-carousel
    layout: centered
    adminTitle: Reviews Snippet
    props:
      sectionTitle: "What Pet Parents Are Saying"
      sectionDescription: "Join 1,000+ happy customers who found freedom with PeeKeeper."
      rating: 4.86
      maxRating: 5
      totalRatings: 113
      totalReviews: 125
      reviews:
        - name: "Sarah M."
          text: "Finally, a diaper that stays on my senior lab! We tried everything — this is the only one that works. Life-changing."
          rating: 5
        - name: "James K."
          text: "Our incontinent dachshund had us cleaning constantly. PeeKeeper gave us our sanity back. Can't recommend enough."
          rating: 5
        - name: "Maria R."
          text: "The Lilac color is adorable, and the fit is perfect for my rescue pup. True to size, easy to wash."
          rating: 5
      ctaText: "Read All Reviews"
      ctaHref: "/customer-reviews"

  - id: cta-001
    type: cta-centered
    layout: centered
    adminTitle: Final CTA
    props:
      heading: "Give Your Dog Freedom. Give Yourself Peace of Mind."
      description: "Join thousands of pet parents who trust PeeKeeper."
      buttonText: "Shop Now"
      buttonHref: "/shop"
      background: "#F5F0E8"
      textColor: "#1A1A2E"
```

### Shop / Product Page Sections

```yaml
shopPage:
  - id: product-main-001
    type: product-detail
    layout: split
    adminTitle: Product Detail
    props:
      product:
        id: "peekeeper-diaper"
        name: "The Original PeeKeeper — Escape-Proof Dog Diaper"
        price: 46.99
        compareAtPrice: null        # Was price (null if no sale)
        description: "Our signature harness-style diaper designed to stay on active dogs. Multi-layer absorbent core, 100% cotton exterior, machine washable. The only diaper your dog will forget they're wearing."
        features:
          - "Escape-proof harness design"
          - "Multi-layer absorbent core"
          - "100% cotton flannel or long-staple cotton"
          - "Machine washable & reusable"
          - "Sizes: XS (9-12″ waist), Small (13-16″ waist), Medium (17-21″ waist)"
          - "Elastic waistband and leg openings for secure fit"
        images:
          - src: "/images/premium-puppy-diapers/product-1.jpg"
            alt: "PeeKeeper diaper front view"
          - src: "/images/premium-puppy-diapers/product-2.jpg"
            alt: "PeeKeeper diaper back view"
          - src: "/images/premium-puppy-diapers/product-3.jpg"
            alt: "Dog wearing PeeKeeper diaper"
        options:
          - id: "size"
            name: "Size"
            type: "select"          # select, button-group, or radio
            required: true
            values:
              - value: "xs"
                label: "XS — 9″ to 12″ waist · 10″ / 11″ / 12″ length"
                available: true
              - value: "sm"
                label: "SM — 13″ to 16″ waist · 12″ – 16″ length"
                available: true
              - value: "med"
                label: "MED — 17″ to 21″ waist · 14″ – 18″ length"
                available: true
          - id: "color"
            name: "Color"
            type: "swatch"          # Color circle swatches
            required: true
            values:
              - value: "denim"
                label: "Denim"
                swatchColor: "#4A6FA5"        # Approximate denim blue
                material: "100% Cotton"
                available: true
              - value: "fire-engine-red"
                label: "Fire Engine Red"
                swatchColor: "#CC2936"
                material: "100% Cotton Flannel"
                available: true
              - value: "walnut"
                label: "Walnut"
                swatchColor: "#5C4033"
                material: "100% Cotton Flannel"
                available: true
              - value: "lilac"
                label: "Lilac"
                swatchColor: "#C8A2C8"
                material: "100% Long Staple Cotton"
                available: true
              - value: "peri"
                label: "Peri"
                swatchColor: "#7B9CC9"
                material: "100% Cotton Flannel"
                available: true
              - value: "hot-pink"
                label: "Hot Pink"
                swatchColor: "#FF69B4"
                material: "100% Cotton Flannel"
                available: true
              - value: "pink-begonia"
                label: "Pink Begonia"
                swatchColor: "#F4A4B8"
                material: "100% Cotton Flannel"
                available: true
          - id: "length"
            name: "Length (XS only)"
            type: "select"
            required: false         # Only for XS; hidden for SM/MED
            dependsOn:              # Conditional display
              optionId: "size"
              value: "xs"
            values:
              - value: "10"
                label: "10 inches"
                available: true
              - value: "11"
                label: "11 inches"
                available: true
              - value: "12"
                label: "12 inches"
                available: true
        rating:
          average: 4.86
          max: 5
          count: 113
          reviewCount: 125
        inventory:
          status: "in_stock"        # in_stock, low_stock, out_of_stock
          quantity: null             # null = unlimited / not tracked
      addToCartText: "Add to Cart"
      sizeGuideText: "Size Guide"
      sizeGuideHref: "/how-to-measure"
      shippingInfo: "Free shipping on orders over $50"
      returnPolicy: "30-day satisfaction guarantee"

  - id: product-accessory-001
    type: product-spotlight
    layout: split-reverse          # Image on right, text on left
    adminTitle: Net Bag Accessory
    props:
      sectionTitle: "Complete Your Kit — Net Bag for Washing"
      heading: "Keep Your Diaper Collection Organized"
      description: "Our custom mesh net bag makes washing your PeeKeeper diapers easy. Simply toss diapers in the bag and machine wash — no more hunting for lost diapers in the laundry."
      image:
        src: "/images/premium-puppy-diapers/net-bag.jpg"
        alt: "PeeKeeper net wash bag"
      price: "$9.99"                # TBD from source
      features:
        - "Fine mesh protects diapers in the wash"
        - "Holds multiple diapers at once"
        - "Durable zipper closure"
        - "Machine washable"
      ctaText: "Add Net Bag to Order"
      ctaHref: "/shop#net-bag"

  - id: product-details-001
    type: product-info-tabs
    layout: tabs
    adminTitle: Product Details Tabs
    props:
      tabs:
        - id: "description"
          label: "Description"
          content: "The PeeKeeper is a harness-style diaper that wraps around your dog's waist and tail for a secure, escape-proof fit. Unlike traditional diapers that rely on adhesive straps or simple elastic, the PeeKeeper uses a wrap-around design that stays put — even on active dogs. Available in 3 sizes and 7 colors, each diaper is made from 100% cotton flannel or long-staple cotton with a multi-layer absorbent core. Machine washable and reusable, the PeeKeeper saves you money and reduces waste compared to disposable diapers."
        - id: "sizing"
          label: "Sizing"
          content: "Measure your dog's waist at the narrowest point (just in front of the hind legs) and the length from the base of the tail to the waist. Use our size guide to find the perfect fit. When in doubt, size up for comfort. XS includes 3 length options (10\", 11\", 12\") for a custom fit. SM and MED adjust naturally for length."
        - id: "care"
          label: "Care Instructions"
          content: "Machine wash cold with like colors. Tumble dry low or line dry. Do not bleach. Do not iron. For best results, wash in a mesh laundry bag (sold separately). With proper care, your PeeKeeper will last for months of daily use."
        - id: "shipping"
          label: "Shipping & Returns"
          content: "Free shipping on orders over $50. All orders ship within 1-2 business days via USPS or UPS. 30-day satisfaction guarantee — if you're not happy, return for a full refund. See our full return policy for details."

  - id: product-reviews-001
    type: reviews-list
    layout: full
    adminTitle: Product Reviews
    props:
      sectionTitle: "Customer Reviews"
      rating: 4.86
      maxRating: 5
      totalRatings: 113
      totalReviews: 125
      ratingBreakdown:
        - stars: 5
          percentage: 88
          count: 99
        - stars: 4
          percentage: 8
          count: 9
        - stars: 3
          percentage: 3
          count: 3
        - stars: 2
          percentage: 1
          count: 1
        - stars: 1
          percentage: 0
          count: 0
      reviews:
        - id: "review-001"
          name: "Sarah M."
          verifiedPurchase: true
          rating: 5
          title: "Life-changing for our senior lab"
          text: "Finally, a diaper that stays on our senior lab! We tried everything — adhesive diapers, belly bands, you name it. The PeeKeeper is the only one that works. Our dog is comfortable, and we're not constantly cleaning up. Worth every penny."
          date: "2024-12-15"
        - id: "review-002"
          name: "James K."
          verifiedPurchase: true
          rating: 5
          title: "Perfect for incontinent dogs"
          text: "Our dachshund has incontinence issues and we were cleaning floors multiple times a day. PeeKeeper gave us our sanity back. The harness design really works — no escapes, no leaks. The Denim color looks great too."
          date: "2024-11-28"
        - id: "review-003"
          name: "Maria R."
          verifiedPurchase: true
          rating: 5
          title: "Adorable and functional"
          text: "Got the Lilac color for our rescue pup and it's so cute! The fit is perfect — true to size. Washes beautifully and comes out looking like new. So glad we found this."
          date: "2024-11-10"
        - id: "review-004"
          name: "David L."
          verifiedPurchase: true
          rating: 4
          title: "Great product, runs slightly large"
          text: "Very well made and truly escape-proof. I'd suggest sizing down if your dog is between sizes. Our medium-sized dog fits perfectly in the Small. Customer service was helpful with the exchange."
          date: "2024-10-22"
        - id: "review-005"
          name: "Emily T."
          verifiedPurchase: true
          rating: 5
          title: "Bought for my elderly dog"
          text: "My 14-year-old dog started having accidents in the house. The PeeKeeper has been a game changer. She doesn't seem bothered by it at all, and our floors are clean! The Hot Pink is gorgeous."
          date: "2024-10-05"
      writeReviewCta:
        text: "Write a Review"
        href: "#write-review"
```

### About Page Sections

```yaml
aboutPage:
  - id: about-hero-001
    type: hero-centered
    layout: centered
    adminTitle: About Hero
    props:
      heading: "A diaper made by a dog mom, for dog moms."
      description: "The PeeKeeper story starts with a senior dog named Dash and a simple frustration."
      background: "#FFFFFF"

  - id: story-001
    type: story-section
    layout: split
    adminTitle: The Story
    props:
      image:
        src: "/images/premium-puppy-diapers/dash-story.jpg"
        alt: "Lisa and Dash"
      heading: "From frustration to solution"
      paragraphs:
        - "When Lisa adopted Dash, a senior dog with incontinence issues, she quickly discovered that existing diaper products just didn't work. They slipped off, leaked, and left both Dash and Lisa frustrated."
        - "Determined to find a solution, Lisa designed a harness-style diaper that wraps securely around the waist and tail. The design was different from anything on the market — and it worked."
        - "What started as a single product listed on eBay quickly grew into a brand trusted by thousands of pet parents. Today, PeeKeeper offers escape-proof diapers in multiple sizes and colors, with the same commitment to quality and compassion that inspired the original design."
      signature:
        name: "Lisa"
        title: "Founder, PeeKeeper"

  - id: values-full-001
    type: values-full
    layout: three-column
    adminTitle: Our Values
    props:
      sectionTitle: "What We Stand For"
      values:
        - icon: "PawPrint"
          title: "Dog-First Design"
          description: "Every product starts with the question: 'Will this make a dog's life better?' Comfort, fit, and freedom are non-negotiable."
        - icon: "Recycle"
          title: "Reusable & Sustainable"
          description: "Our washable diapers reduce waste compared to disposables. We believe better pet care shouldn't cost the earth."
        - icon: "Users"
          title: "Community of Pet Parents"
          description: "We're pet parents too. We understand the struggle, the love, and the need for products that truly work. Our customers are our family."

  - id: about-cta-001
    type: cta-centered
    layout: centered
    adminTitle: About CTA
    props:
      heading: "Ready to try the diaper that started it all?"
      buttonText: "Shop PeeKeeper"
      buttonHref: "/shop"
      background: "#F5F0E8"
```

### How to Measure Page Sections

```yaml
howToMeasurePage:
  - id: measure-hero-001
    type: hero-centered
    layout: centered
    adminTitle: How to Measure Hero
    props:
      heading: "Find Your Dog's Perfect Fit"
      description: "Two simple measurements — waist and length — will get you the right size every time."
      background: "#FFFFFF"

  - id: measure-instructions-001
    type: measure-guide
    layout: two-column
    adminTitle: Measuring Instructions
    props:
      sectionTitle: "How to Measure Your Dog"
      tools:
        - label: "Recommended"
          tool: "Flexible measuring tape"
          note: "A cloth or vinyl tape measure gives the most accurate results."
        - label: "Alternative"
          tool: "String + ruler"
          note: "Wrap a piece of string around your dog, mark the spot, then measure with a ruler."
      steps:
        - title: "Measure the Waist"
          description: "Measure around the narrowest part of your dog's waist — just in front of the hind legs. The tape should be snug but not tight — you should be able to fit two fingers between the tape and your dog."
          image: "/images/premium-puppy-diapers/measure-waist.jpg"
          alt: "Measuring dog's waist"
        - title: "Measure the Length"
          description: "Measure from the base of the tail (where it meets the body) along the spine to the waist line. This ensures the diaper covers the right area."
          image: "/images/premium-puppy-diapers/measure-length.jpg"
          alt: "Measuring dog's length"
        - title: "Match to Size Chart"
          description: "Use the table below to find your dog's size. If your dog is between sizes or has a longer body, consider sizing up for comfort."
          image: ""
          alt: ""

  - id: size-chart-001
    type: size-table
    layout: full
    adminTitle: Size Chart
    props:
      sectionTitle: "PeeKeeper Size Chart"
      note: "All measurements are in inches. The XS size offers three length options for a more customized fit."
      sizes:
        - size: "XS"
          label: "Extra Small"
          waistMin: 9
          waistMax: 12
          lengthOptions: "10\", 11\", or 12\""
          notes: "Best for small breeds like Chihuahuas, Yorkies, and toy breeds"
          image: ""
        - size: "SM"
          label: "Small"
          waistMin: 13
          waistMax: 16
          lengthOptions: "12\" – 16\""
          notes: "Best for medium-small breeds like Dachshunds, Corgis, and French Bulldogs"
          image: ""
        - size: "MED"
          label: "Medium"
          waistMin: 17
          waistMax: 21
          lengthOptions: "14\" – 18\""
          notes: "Best for medium breeds like Beagles, Spaniels, and Terriers"
          image: ""

  - id: measure-tips-001
    type: tips-section
    layout: centered
    adminTitle: Sizing Tips
    props:
      sectionTitle: "Sizing Tips"
      tips:
        - icon: "Ruler"
          text: "Measure your dog while standing — not sitting or lying down — for the most accurate fit."
        - icon: "ArrowUpDown"
          text: "If your dog's measurements are close to the boundary between sizes, size up. A slightly larger diaper is more comfortable than one that's too tight."
        - icon: "RefreshCw"
          text: "Not sure? We offer hassle-free exchanges. Our customer service team is happy to help you find the right fit."
      ctaText: "Shop by Size"
      ctaHref: "/shop"
```

### Customer Reviews Page Sections

```yaml
customerReviewsPage:
  - id: reviews-hero-001
    type: hero-centered
    layout: centered
    adminTitle: Reviews Hero
    props:
      heading: "Hear From Our Happy Customers"
      description: "Join 1,000+ pet parents who found freedom with PeeKeeper."
      background: "#FFFFFF"

  - id: reviews-stats-001
    type: reviews-stats
    layout: centered
    adminTitle: Review Statistics
    props:
      rating: 4.86
      maxRating: 5
      totalRatings: 113
      totalReviews: 125
      ratingBreakdown:
        - stars: 5
          percentage: 88
          count: 99
        - stars: 4
          percentage: 8
          count: 9
        - stars: 3
          percentage: 3
          count: 3
        - stars: 2
          percentage: 1
          count: 1
        - stars: 1
          percentage: 0
          count: 0

  - id: reviews-full-001
    type: reviews-full-list
    layout: full
    adminTitle: All Customer Reviews
    props:
      reviews:
        - id: "cr-001"
          name: "Sarah M."
          verifiedPurchase: true
          rating: 5
          title: "Life-changing for our senior lab"
          text: "Finally, a diaper that stays on our senior lab! We tried everything — adhesive diapers, belly bands, you name it. The PeeKeeper is the only one that works. Our dog is comfortable, and we're not constantly cleaning up. Worth every penny."
          date: "2024-12-15"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Denim"
          size: "Large"
        - id: "cr-002"
          name: "James K."
          verifiedPurchase: true
          rating: 5
          title: "Perfect for incontinent dogs"
          text: "Our dachshund has incontinence issues and we were cleaning floors multiple times a day. PeeKeeper gave us our sanity back. The harness design really works — no escapes, no leaks."
          date: "2024-11-28"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Denim"
          size: "Small"
        - id: "cr-003"
          name: "Maria R."
          verifiedPurchase: true
          rating: 5
          title: "Adorable and functional"
          text: "Got the Lilac color for our rescue pup and it's so cute! The fit is perfect — true to size. Washes beautifully and comes out looking like new. So glad we found this."
          date: "2024-11-10"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Lilac"
          size: "XS"
        - id: "cr-004"
          name: "David L."
          verifiedPurchase: true
          rating: 4
          title: "Great product, runs slightly large"
          text: "Very well made and truly escape-proof. I'd suggest sizing down if your dog is between sizes. Our medium-sized dog fits perfectly in the Small. Customer service was helpful with the exchange."
          date: "2024-10-22"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Walnut"
          size: "Medium"
        - id: "cr-005"
          name: "Emily T."
          verifiedPurchase: true
          rating: 5
          title: "Bought for my elderly dog"
          text: "My 14-year-old dog started having accidents in the house. The PeeKeeper has been a game changer. She doesn't seem bothered by it at all, and our floors are clean!"
          date: "2024-10-05"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Hot Pink"
          size: "Small"
        - id: "cr-006"
          name: "Rachel W."
          verifiedPurchase: true
          rating: 5
          title: "Best purchase for our rescue"
          text: "We adopted a senior dog who was nervous and incontinent. The PeeKeeper is soft, comfortable, and actually stays on. It's given our dog confidence and us peace of mind."
          date: "2024-09-18"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Peri"
          size: "Small"
        - id: "cr-007"
          name: "Tom B."
          verifiedPurchase: true
          rating: 5
          title: "Worth every penny"
          text: "I was skeptical at first given the price, but after trying cheap alternatives that didn't work, the PeeKeeper is actually a bargain. Well-made, effective, and reusable."
          date: "2024-08-30"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Fire Engine Red"
          size: "Medium"
        - id: "cr-008"
          name: "Lisa G."
          verifiedPurchase: true
          rating: 5
          title: "Net bag is a must-have"
          text: "Got the diaper and the net bag together. The bag makes laundry so easy — just toss everything in and wash. The Pink Begonia color is beautiful."
          date: "2024-08-12"
          product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
          color: "Pink Begonia"
          size: "XS"

  - id: reviews-shop-cta-001
    type: cta-centered
    layout: centered
    adminTitle: Reviews CTA
    props:
      heading: "Ready to join our happy customers?"
      buttonText: "Shop PeeKeeper"
      buttonHref: "/shop"
      background: "#F5F0E8"
```

### Contact / FAQ Page Sections

```yaml
contactPage:
  - id: contact-hero-001
    type: hero-centered
    layout: centered
    adminTitle: Contact Hero
    props:
      heading: "We're Here to Help"
      description: "Have a question about sizing, shipping, or our products? We'd love to hear from you."
      background: "#FFFFFF"

  - id: contact-form-001
    type: form
    layout: two_column
    adminTitle: Contact Form
    props:
      formHeading: "Send us a message"
      formDescription: "We typically respond within 24 hours."
      successHeading: "Thank you for reaching out!"
      successDescription: "We've received your message and will get back to you within 24 hours."
      successButtonText: "Back to Home"
      form:
        id: "contact-form"
        name: "Contact Form"
        settings:
          submitText: "Send Message"
          recaptcha: true
        fields:
          - id: "name"
            type: text
            name: "name"
            label: "Name"
            placeholder: "Your full name"
            required: true
            validation:
              minLength: 2
              maxLength: 100
          - id: "email"
            type: email
            name: "email"
            label: "Email"
            placeholder: "your@email.com"
            required: true
            validation:
              pattern: "^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$"
          - id: "order-number"
            type: text
            name: "orderNumber"
            label: "Order Number (optional)"
            placeholder: "e.g. PK-12345"
            required: false
          - id: "subject"
            type: select
            name: "subject"
            label: "Subject"
            placeholder: "Select a topic"
            required: true
            options:
              - value: "sizing"
                label: "Sizing Question"
              - value: "shipping"
                label: "Shipping Question"
              - value: "returns"
                label: "Returns & Exchanges"
              - value: "product"
                label: "Product Question"
              - value: "wholesale"
                label: "Wholesale Inquiry"
              - value: "other"
                label: "Other"
          - id: "message"
            type: textarea
            name: "message"
            label: "Message"
            placeholder: "How can we help you?"
            required: true
            validation:
              minLength: 10
              maxLength: 5000

  - id: faq-001
    type: accordion
    layout: centered
    adminTitle: FAQ Section
    props:
      sectionTitle: "Frequently Asked Questions"
      items:
        - question: "How do I choose the right size?"
          answer: "Measure your dog's waist (narrowest part just in front of hind legs) and length (from tail base to waist). Compare to our size chart. If between sizes, size up. See our full measuring guide at /how-to-measure."
        - question: "Are these diapers reusable?"
          answer: "Yes! PeeKeeper diapers are machine washable and reusable. With proper care, each diaper lasts for months of daily use. We recommend washing in a mesh net bag (sold separately)."
        - question: "How do they stay on?"
          answer: "Our patented harness-style design wraps around your dog's waist and tail — no adhesive, no straps, no clips. The secure wrap fit prevents slipping and escaping."
        - question: "Do they work for male and female dogs?"
          answer: "Yes! PeeKeeper diapers work for both male and female dogs. The harness design provides coverage and security regardless of gender."
        - question: "What's the return policy?"
          answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, return it for a full refund. See our return policy for details."
        - question: "How long does shipping take?"
          answer: "Orders ship within 1-2 business days via USPS or UPS. Standard shipping typically takes 3-7 business days depending on your location."
        - question: "Do you ship internationally?"
          answer: "Yes, we ship to select international destinations. Shipping costs and times vary by location. Contact us for a quote before placing your order."
        - question: "Can I use these for female dogs in heat?"
          answer: "Yes, PeeKeeper diapers work well for females in heat. They provide reliable coverage and are comfortable enough for extended wear."

  - id: contact-info-001
    type: contact-info
    layout: centered
    adminTitle: Contact Details
    props:
      email: ""                    # Add contact email
      phone: ""                    # Add contact phone
      social:
        - platform: "Instagram"
          url: ""
          icon: "Instagram"
        - platform: "Facebook"
          url: ""
          icon: "Facebook"
```

---

## A5. SHARED COMPONENT DATA

### Header

```yaml
header:
  logo:
    type: image
    src: "/peekeeper-logo-new-1.png"
    alt: "PeeKeeper logo"
    width: "auto"
    height: "40px"
  navigation:
    - label: "Home"
      href: "/"
    - label: "Shop"
      href: "/shop"
    - label: "About"
      href: "/about"
      children:                     # Dropdown menu
        - label: "About PeeKeeper"
          href: "/about"
        - label: "How to Measure"
          href: "/how-to-measure"
        - label: "Customer Reviews"
          href: "/customer-reviews"
    - label: "Info"
      href: "#"
      children:
        - label: "Blog"
          href: "/blog"
        - label: "Gallery"
          href: "/gallery"
        - label: "FAQs"
          href: "/contact#faq"
    - label: "Contact"
      href: "/contact"
  icons:
    - type: "search"                # Search icon (if enabled)
    - type: "account"               # Account/login icon
    - type: "cart"                  # Shopping cart icon with badge
  style:
    sticky: true
    background: "#FFFFFF"
    borderBottom: "1px solid #E2E2E8"
    navFont: "text-sm font-medium"
    navColor: "#1A1A2E"
    navHoverColor: "#2D6A4F"
    dropdownBackground: "#FFFFFF"
    dropdownShadow: "0 10px 25px rgba(0,0,0,.1)"
    iconColor: "#1A1A2E"
    iconHoverColor: "#2D6A4F"
    cartBadgeBackground: "#2D6A4F"
    cartBadgeText: "#FFFFFF"
```

### Footer

```yaml
footer:
  background: "#1A1A2E"
  textColor: "#CBD5E1"
  headingColor: "#F8FAFC"
  accentColor: "#2D6A4F"
  layout: "4-column"
  logo:
    src: "/peekeeper-logo-new-1.png"
    alt: "PeeKeeper"
    height: "36px"
  columns:
    - title: "Shop"
      links:
        - label: "Escape-Proof Dog Diapers"
          href: "/shop"
        - label: "Net Wash Bag"
          href: "/shop#net-bag"
        - label: "How to Measure"
          href: "/how-to-measure"
        - label: "Size Guide"
          href: "/how-to-measure#size-chart"
    - title: "Learn"
      links:
        - label: "About Us"
          href: "/about"
        - label: "Customer Reviews"
          href: "/customer-reviews"
        - label: "Blog"
          href: "/blog"
        - label: "FAQs"
          href: "/contact#faq"
    - title: "Support"
      links:
        - label: "Contact Us"
          href: "/contact"
        - label: "Shipping Info"
          href: "/contact#shipping"
        - label: "Returns & Exchanges"
          href: "/contact#returns"
        - label: "Privacy Policy"
          href: "/privacy"
        - label: "Terms of Service"
          href: "/terms"
    - title: "Connect"
      social: true
  bottomBar:
    copyright: "© {year} PeeKeeper. All rights reserved."
    links:
      - label: "Privacy Policy"
        href: "/privacy"
      - label: "Terms of Service"
        href: "/terms"
```

---

## A6. PRODUCT CONFIGURATION

### Primary Product

```yaml
products:
  - id: "peekeeper-diaper"
    name: "The Original PeeKeeper — Escape-Proof Dog Diaper"
    slug: "escape-proof-dog-diaper"
    type: "simple"                  # simple, variable, bundled, accessory
    price: 46.99
    currency: USD
    description: "Harness-style dog diaper designed to stay on active dogs. Multi-layer absorbent core, 100% cotton exterior, machine washable."
    images:
      - src: "/images/premium-puppy-diapers/product-1.jpg"
        alt: "PeeKeeper diaper front view"
      - src: "/images/premium-puppy-diapers/product-2.jpg"
        alt: "PeeKeeper diaper back view"
      - src: "/images/premium-puppy-diapers/product-3.jpg"
        alt: "Dog wearing PeeKeeper diaper"
    variants:
      - id: "denim-xs-10"
        sku: "PK-DEN-XS-10"
        size: "xs"
        color: "denim"
        length: "10"
        price: 46.99
        inStock: true
      - id: "denim-xs-11"
        sku: "PK-DEN-XS-11"
        size: "xs"
        color: "denim"
        length: "11"
        price: 46.99
        inStock: true
      - id: "denim-xs-12"
        sku: "PK-DEN-XS-12"
        size: "xs"
        color: "denim"
        length: "12"
        price: 46.99
        inStock: true
      - id: "denim-sm"
        sku: "PK-DEN-SM"
        size: "sm"
        color: "denim"
        length: null
        price: 46.99
        inStock: true
      - id: "denim-med"
        sku: "PK-DEN-MED"
        size: "med"
        color: "denim"
        length: null
        price: 46.99
        inStock: true
      # (Repeat for all color × size combinations)
      # Colors: fire-engine-red, walnut, lilac, peri, hot-pink, pink-begonia
      # Sizes: xs (3 lengths), sm, med
    options:
      size:
        name: "Size"
        type: "select"
        required: true
        values:
          - value: "xs"
            label: "XS — Waist 9″–12″"
          - value: "sm"
            label: "SM — Waist 13″–16″"
          - value: "med"
            label: "MED — Waist 17″–21″"
      color:
        name: "Color"
        type: "swatch"
        required: true
        values:
          - value: "denim"
            label: "Denim — 100% Cotton"
            swatchColor: "#4A6FA5"
          - value: "fire-engine-red"
            label: "Fire Engine Red — 100% Cotton Flannel"
            swatchColor: "#CC2936"
          - value: "walnut"
            label: "Walnut — 100% Cotton Flannel"
            swatchColor: "#5C4033"
          - value: "lilac"
            label: "Lilac — 100% Long Staple Cotton"
            swatchColor: "#C8A2C8"
          - value: "peri"
            label: "Peri — 100% Cotton Flannel"
            swatchColor: "#7B9CC9"
          - value: "hot-pink"
            label: "Hot Pink — 100% Cotton Flannel"
            swatchColor: "#FF69B4"
          - value: "pink-begonia"
            label: "Pink Begonia — 100% Cotton Flannel"
            swatchColor: "#F4A4B8"
      length_xs:
        name: "Length"
        type: "select"
        required: false
        dependsOn:
          option: "size"
          value: "xs"
        values:
          - value: "10"
            label: "10 inches"
          - value: "11"
            label: "11 inches"
          - value: "12"
            label: "12 inches"
```

### Accessory Product

```yaml
  - id: "net-bag"
    name: "PeeKeeper Mesh Net Bag — Diaper Wash Bag"
    slug: "net-wash-bag"
    type: "accessory"
    price: 9.99                      # TBD — verify from source
    currency: USD
    description: "Fine mesh laundry bag for washing your PeeKeeper diapers. Holds multiple diapers, protects them in the wash."
    images:
      - src: "/images/premium-puppy-diapers/net-bag.jpg"
        alt: "PeeKeeper net wash bag"
    variants: []                     # No variants for accessory
    options: {}                      # No options for accessory
```

---

## A7. MONGODB SCHEMAS (Dynamic Content)

```yaml
collections:
  orders:
    fields:
      - name: orderNumber
        type: string
        required: true
      - name: customer
        type: object
        fields:
          - name: name
            type: string
          - name: email
            type: string
          - name: phone
            type: string
      - name: shippingAddress
        type: object
        fields:
          - name: line1
            type: string
          - name: line2
            type: string
          - name: city
            type: string
          - name: state
            type: string
          - name: zip
            type: string
          - name: country
            type: string
      - name: items
        type: array
        fields:
          - name: productId
            type: string
          - name: variantId
            type: string
          - name: sku
            type: string
          - name: name
            type: string
          - name: quantity
            type: number
          - name: unitPrice
            type: number
          - name: totalPrice
            type: number
      - name: subtotal
        type: number
      - name: shipping
        type: number
      - name: tax
        type: number
      - name: total
        type: number
      - name: currency
        type: string
      - name: status
        type: string
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled", "refunded"]
      - name: paymentStatus
        type: string
        enum: ["pending", "paid", "failed", "refunded"]
      - name: paymentMethod
        type: string
      - name: notes
        type: string
      - name: createdAt
        type: string
      - name: updatedAt
        type: string

  reviews:
    fields:
      - name: productId
        type: string
        required: true
      - name: productName
        type: string
      - name: customerName
        type: string
        required: true
      - name: email
        type: string
      - name: rating
        type: number
        required: true
        min: 1
        max: 5
      - name: title
        type: string
      - name: text
        type: string
        required: true
      - name: verifiedPurchase
        type: boolean
        default: false
      - name: color
        type: string
      - name: size
        type: string
      - name: isApproved
        type: boolean
        default: false
      - name: isPublished
        type: boolean
        default: false
      - name: createdAt
        type: string

  inquiries:
    fields:
      - name: name
        type: string
        required: true
      - name: email
        type: string
        required: true
      - name: orderNumber
        type: string
      - name: subject
        type: string
      - name: message
        type: string
        required: true
      - name: status
        type: string
        enum: ["new", "read", "replied", "closed"]
        default: "new"
      - name: createdAt
        type: string
```

---

## A8. FORM CONFIGURATIONS (Dynamic)

Every form on the website is defined entirely in JSON via `section.props.form`. Forms are rendered dynamically — no field names are hardcoded.

### Form JSON Structure

```yaml
form:
  id: "unique-form-id"            # Required — used in API submission
  name: "Human-readable name"     # Required — used in API submission
  settings:
    submitText: "Submit"          # Button text
    recaptcha: true               # Enable reCAPTCHA
    successRedirect: "/thank-you" # Optional redirect URL
  fields:
    - id: "field-id"              # Unique field identifier
      type: text                  # See supported field types below
      name: "field_name"          # Field name for form submission
      label: "Field Label"        # Display label
      placeholder: "Hint text"    # Placeholder
      defaultValue: ""            # Optional default
      required: true              # Is this field required?
      helperText: ""              # Optional help text below field
      validation:
        minLength: 2
        maxLength: 100
        pattern: "^[a-zA-Z]+$"    # Optional regex pattern
        min: 0                    # For number fields
        max: 100                  # For number fields
      options:                    # For select/multiselect/radio
        - value: "opt1"
          label: "Option 1"
      accept: ".pdf,.jpg"         # For file fields
      multiple: false             # For file fields
```

### Supported Field Types

| Type | HTML Rendering | Validation |
|------|---------------|------------|
| `text` | `<input type="text">` | minLength, maxLength, pattern |
| `email` | `<input type="email">` | Built-in email + pattern |
| `phone` | `<input type="tel">` | Built-in tel + pattern |
| `password` | `<input type="password">` | minLength, maxLength |
| `textarea` | `<textarea>` | minLength, maxLength |
| `number` | `<input type="number">` | min, max, step |
| `select` | `<select>` | options array |
| `multiselect` | `<select multiple>` | options array |
| `checkbox` | `<input type="checkbox">` | — |
| `radio` | Radio group | options array |
| `switch` | Toggle switch | — |
| `date` | `<input type="date">` | min, max |
| `datetime` | `<input type="datetime-local">` | min, max |
| `file` | `<input type="file">` | accept, multiple |
| `hidden` | `<input type="hidden">` | — |
| `url` | `<input type="url">` | pattern |

Unknown field types must be ignored gracefully — never break rendering.

### Form Layout

Controlled by `section.layout`:
- `one_column` — single column (default)
- `two_column` — 2-column grid
- `three_column` — 3-column grid

### Form Behavior Rules (see B9 for full rendering spec)

1. Forms render entirely from `section.props.form` JSON — never hardcode fields
2. POST to `/api/form-data` with `Content-Type: application/json` (or `multipart/form-data` if files present)
3. Request body includes: `pageSlug`, `pageTitle`, `sectionId`, `formId`, `formName`, `submission: { fieldName: value }`
4. Client-side validation before submit: required, email, phone, pattern, min/max
5. Inline validation messages below each field
6. Submit button disabled while submitting + loading indicator
7. On success: hide form, show `successHeading` / `successDescription` + optional `successButtonText`
8. On error: preserve values, show server errors or generic message
9. Accessibility: `id`, `name`, `label`, `aria-*`, keyboard navigation

---

## A9. TESTIMONIALS (Curated Reviews)

```yaml
testimonials:
  - id: testimonial-001
    name: "Sarah M."
    verifiedPurchase: true
    rating: 5
    title: "Life-changing for our senior lab"
    text: "Finally, a diaper that stays on our senior lab! We tried everything — adhesive diapers, belly bands, you name it. The PeeKeeper is the only one that works."
    product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
    color: "Denim"
    size: "Medium"
  - id: testimonial-002
    name: "James K."
    verifiedPurchase: true
    rating: 5
    title: "Perfect for incontinent dogs"
    text: "Our dachshund has incontinence issues. PeeKeeper gave us our sanity back. The harness design really works — no escapes, no leaks."
    product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
    color: "Denim"
    size: "Small"
  - id: testimonial-003
    name: "Maria R."
    verifiedPurchase: true
    rating: 5
    title: "Adorable and functional"
    text: "Got the Lilac color for our rescue pup and it's so cute! The fit is perfect — true to size. Washes beautifully."
    product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
    color: "Lilac"
    size: "XS"
  - id: testimonial-004
    name: "Emily T."
    verifiedPurchase: true
    rating: 5
    title: "Bought for my elderly dog"
    text: "My 14-year-old dog started having accidents. The PeeKeeper has been a game changer. She doesn't seem bothered by it at all."
    product: "The Original PeeKeeper — Escape-Proof Dog Diaper"
    color: "Hot Pink"
    size: "Small"
```

---

# SECTION B: SYSTEM CONFIGURATION
## (Fixed — Do NOT modify. Applies to ALL CMS websites)

---

## B1. AI PERSONA

Act as an Elite Full-Stack Next.js 15 Architect, CMS Specialist, and E-Commerce Expert. Generate a complete, production-ready single-product e-commerce CMS website.

System constraints: Tokenized, theme-driven, JSON-first, EditableText-enabled, SEO-ready, responsive, type-safe, component-driven.

---

## B2. ARCHITECTURE OVERVIEW

```
src/lib/theme/config.ts       ← Source of truth (actual token values)
       │
scripts/generate-theme-css.js ← Compiler
       │
src/styles/globals.css         ← Token placeholders only
       │
Compiled CSS variables on :root
       │
Components consume var(--primary), var(--background), etc.

Data Flow: JSON → Redux → Component
Static pages rendered from local JSON files in src/lib/data/pages/
Dynamic content served via proxy API → FastAPI backend → MongoDB

API PROXY PATTERN:
  src/app/api/[[slug]]/route.ts  ← Single catch-all route
       │
  Proxies all HTTP methods (GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD)
       │
  Forwards to KALZERO_PUBLIC_API_URL + path
       │
  Special handling for PUT/PATCH /api/media/[id] — updates MongoDB directly

E-COMMERCE FLOW:
  Product variants defined in page JSON → rendered via ProductDetail component
  Options (size/color/length): select or swatch inputs, conditionally shown
  Variant selection updates price display, image gallery, add-to-cart state
  Cart managed client-side (localStorage + Redux)
  Checkout form → POST /api/orders → proxies to FastAPI → MongoDB
  Reviews form → POST /api/reviews → proxies to FastAPI → MongoDB
```

---

## B3. CORE REQUIREMENTS

1. NO `.data.ts` files anywhere
2. SINGLE PAGE JSON — each page has its own JSON in `src/lib/data/pages/`
3. ALL PAGES RENDER FROM JSON — static page content is never stored in MongoDB
4. DATA FLOW: JSON → Redux → Component
5. EDITABLE TEXT — all text wrapped in `EditableText` component
6. CLEAN TEXT STORAGE — JSON stores text WITHOUT HTML tags
7. THEME TOKENS DYNAMIC — `{category.subcategory.property}` placeholders in CSS
8. ALL FORMS ARE DYNAMIC — rendered entirely from JSON configuration in `section.props.form`
9. SINGLE API PROXY — all API calls go through `src/app/api/[[slug]]/route.ts`
10. SHOPPING CART — client-side cart with localStorage persistence + Redux store; cart icon in header with item count badge
11. PRODUCT VARIANTS — variant selection (size, color, length) updates the UI (price, image, add-to-cart button state) without page reload
12. CONDITIONAL OPTIONS — some options (e.g., length) only appear when a specific parent option value is selected
13. COLOR SWATCHES — color options render as circular swatches with the actual color; selected swatch has a visible ring/border
14. IMAGE GALLERY — main product image + clickable thumbnails; changes when variant/color selected
15. RESPONSIVE PRODUCT PAGE — single column on mobile, 2-column split on desktop (gallery left, details right)
16. ADD TO CART — button disabled when variant not fully selected; shows loading state; adds to cart with variant info
17. CART DROPDOWN — mini cart in header showing items, quantities, total; link to checkout
18. CHECKOUT FLOW — contact form → shipping → payment → order confirmation; stores order in MongoDB via API proxy
19. ORDER CONFIRMATION — generates order number, stores in MongoDB, returns confirmation to user
20. CUSTOMER REVIEWS — displayed both statically (from page JSON) and dynamically (from MongoDB via /api/reviews)
21. REVIEW SUBMISSION — form on product page to submit reviews with rating, title, text; stored in MongoDB via proxy
22. SIZE GUIDE — dedicated /how-to-measure page with measurement instructions and interactive size chart table

---

## B4. GENERATION TARGETS

### TARGET 1: `src/styles/globals.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Playfair+Display:wght@400..700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: {colors.primary};
  --primary-light: {colors.primaryLight};
  --primary-dark: {colors.primaryDark};
  --primary-hover: {colors.primaryHover};
  --secondary: {colors.secondary};
  --accent: {colors.accent};
  --accent-hover: {colors.accentHover};
  --accent-soft: {colors.accentSoft};
  --background: {colors.background};
  --surface: {colors.surface};
  --card: {colors.card};
  --text: {colors.text};
  --text-secondary: {colors.textSecondary};
  --text-muted: {colors.textMuted};
  --border: {colors.border};
  --border-hover: {colors.borderHover};
  --star: {colors.star};
  --sale: {colors.sale};
  --success: {colors.success};
  --warning: {colors.warning};
  --danger: {colors.danger};
  --error: {colors.error};
  --info: {colors.info};
  --overlay: {colors.overlay};

  --card-hover-border: {colors.primary};

  --font-body: {typography.bodyFont};
  --font-heading: {typography.headingFont};
  --font-display: {typography.displayFont};
  --font-mono: {typography.monoFont};
  --text-xs: {typography.sizes.xs};
  --text-sm: {typography.sizes.sm};
  --text-base: {typography.sizes.base};
  --text-md: {typography.sizes.md};
  --text-lg: {typography.sizes.lg};
  --text-xl: {typography.sizes.xl};
  --text-2xl: {typography.sizes.2xl};
  --text-3xl: {typography.sizes.3xl};
  --text-4xl: {typography.sizes.4xl};
  --text-5xl: {typography.sizes.5xl};
  --font-light: {typography.fw.light};
  --font-normal: {typography.fw.normal};
  --font-medium: {typography.fw.medium};
  --font-semibold: {typography.fw.semibold};
  --font-bold: {typography.fw.bold};
  --font-extrabold: {typography.fw.extrabold};
  --leading-tight: {typography.lineHeight.tight};
  --leading-normal: {typography.lineHeight.normal};
  --leading-relaxed: {typography.lineHeight.relaxed};

  --space-1: {spacing.1};  --space-2: {spacing.2};
  --space-3: {spacing.3};  --space-4: {spacing.4};
  --space-5: {spacing.5};  --space-6: {spacing.6};
  --space-8: {spacing.8};  --space-10: {spacing.10};
  --space-12: {spacing.12};  --space-16: {spacing.16};
  --space-20: {spacing.20};  --space-24: {spacing.24};

  --radius-sm: {radius.sm};  --radius-md: {radius.md};
  --radius-lg: {radius.lg};  --radius-xl: {radius.xl};
  --radius-2xl: {radius.2xl};  --radius-3xl: {radius.3xl};
  --radius-full: {radius.full};

  --shadow-sm: {shadow.sm};  --shadow-md: {shadow.md};
  --shadow-lg: {shadow.lg};  --shadow-hover: {shadow.hover};

  --container: {layout.container};
  --navbar-height: {layout.navbarHeight};
  --section-padding: {layout.sectionPadding};

  --btn-height: {buttons.height};
  --btn-padding-x: {buttons.paddingX};
  --btn-radius: {buttons.radius};
  --btn-primary-bg: {buttons.primaryBackground};
  --btn-primary-text: {buttons.primaryText};
  --btn-primary-hover: {buttons.primaryHover};
  --btn-secondary-bg: {buttons.secondaryBackground};
  --btn-secondary-text: {buttons.secondaryText};
  --btn-secondary-hover: {buttons.secondaryHover};
  --btn-outline-border: {buttons.outlineBorder};
  --btn-outline-text: {buttons.outlineText};
  --btn-outline-hover-bg: {buttons.outlineHoverBackground};
  --btn-outline-hover-text: {buttons.outlineHoverText};

  --input-height: {forms.inputHeight};
  --input-padding-x: {forms.inputPaddingX};
  --input-padding-y: {forms.inputPaddingY};
  --input-radius: {forms.inputRadius};
  --input-bg: {forms.inputBackground};
  --input-text: {forms.inputText};
  --input-border: {forms.inputBorder};
  --input-border-hover: {forms.inputBorderHover};
  --input-placeholder: {forms.inputPlaceholder};
  --input-focus-border: {forms.inputFocusBorder};
  --input-focus-shadow: {forms.inputFocusShadow};
  --input-disabled-bg: {forms.inputDisabledBackground};
  --input-disabled-text: {forms.inputDisabledText};
  --textarea-min-height: {forms.textareaMinHeight};

  --modal-sm: {modal.sm};  --modal-md: {modal.md};  --modal-lg: {modal.lg};

  --product-image-max-w: {product.imageMaxWidth};
  --product-thumb-size: {product.thumbnailSize};
  --product-swatch-size: {product.swatchSize};
  --product-select-height: {product.selectHeight};
  --product-qty-width: {product.quantityWidth};
  --product-atc-height: {product.addToCartHeight};
}

.dark {
  --background: {colors.dark.background};
  --surface: {colors.dark.surface};
  --card: {colors.dark.card};
  --text: {colors.dark.text};
  --text-secondary: {colors.dark.textSecondary};
  --text-muted: {colors.dark.textMuted};
  --border: {colors.dark.border};
  --input-bg: {colors.dark.inputBackground};
  --input-text: {colors.dark.inputText};
  --input-border: {colors.dark.inputBorder};
  --input-placeholder: {colors.dark.inputPlaceholder};
  --input-disabled-bg: {colors.dark.inputDisabledBackground};
}
```

### TARGET 2: `src/lib/theme/theme.config.ts`

Generate a complete theme config object with ALL values from SECTION A2 (Color Palette, Typography, Spacing, Radius, Shadows, Layout, Buttons, Forms, Modal, Dark Mode, Product).

### TARGET 3: `scripts/generate-theme-css.ts`

Same as existing — reads `theme.config.ts`, replaces `{path.placeholders}` in a CSS template, writes `globals.css`.

### TARGET 4: Page JSON files

Generate one JSON file per static page (from SECTION A4) in `src/lib/data/pages/` following the page block schema:

```typescript
interface PageBlock {
  id: string;
  type: string;
  layout: string;
  adminTitle: string;
  props?: Record<string, unknown>;
  content?: PageBlock[];
}
```

### TARGET 5: Header + Footer JSON

Generate `headerData.json` and `footerData.json` from SECTION A5.

### TARGET 6: MongoDB types (`src/lib/db/types.ts`)

Generate TypeScript interfaces for all dynamic collections listed in SECTION A6.

### TARGET 7: Redux Store (pages slice + cart slice + store setup)

- `pagesSlice` — same pattern as CMSV2: `setCurrentPageBySlug`, `updatePageField`, `setEditableMode`
- `cartSlice` — client-side cart: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, with localStorage persistence
- Store with Redux Toolkit

### TARGET 8: Shared Components

- `EditableText` — click-to-edit inline text component
- `Button` — primary/secondary variants (pill-shaped)
- `Card` — themed card container (rounded)
- `Modal` — overlay modal
- `Accordion` — expandable sections (for FAQ)
- `LoadingSkeleton` — loading placeholder
- `ThemeToggle` — light/dark toggle
- `StarRating` — renders stars based on rating value

### TARGET 9: Page Components per Section Type

For each unique `type` used in SECTION A4 page blocks, generate a render component:
- `HeroSplit` (split image/text hero)
- `HeroCentered` (centered text hero)
- `ValuesPillars` (3-column values section)
- `ProductSpotlight` (product highlight with features list, price, CTA)
- `ProductDetail` (full product detail with variant selector — size/color/length selectors, image gallery, add-to-cart)
- `ProductInfoTabs` (tabbed details: description, sizing, care, shipping)
- `ReviewsCarousel` (rotating review cards)
- `ReviewsStats` (rating breakdown bar chart)
- `ReviewsList` / `ReviewsFullList` (full customer review listing)
- `CtaCentered` (centered CTA section)
- `StorySection` (brand story with image + paragraphs + signature)
- `ValuesFull` (full values/ideals display)
- `MeasureGuide` (2-column measurement instructions with step list)
- `SizeTable` (interactive size chart with waist/length ranges)
- `TipsSection` (sizing tips with icons)
- `Accordion` (FAQ accordion)
- `ContactInfo` (contact details display)
- `DynamicForm` (renders forms entirely from JSON — see TARGET 14)

### TARGET 10: Cart Components

- `CartIcon` — header cart icon with item count badge, opens mini-cart dropdown
- `CartDropdown` — mini-cart showing items, quantities, remove button, subtotal, checkout link
- `CartPage` — full cart page (optional, if cart endpoint is desired)
- `AddToCartButton` — variant-aware add-to-cart button with loading state

### TARGET 11: `src/app/api/[[slug]]/route.ts`

Generate the universal API proxy route. This is the ONLY API route file in the project.

```typescript
import type { NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ProxyRouteContext {
  params: Promise<{ path?: string[] }>;
}

function normalizeAbsoluteUrl(value: string | undefined) {
  if (!value) return null;
  const trimmed = value.endsWith("/") ? value.slice(0, -1) : value;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return null;
}

function resolveApiProxyBaseUrl() {
  const envUrl = process.env.KALZERO_PUBLIC_API_URL?.trim();
  if (!envUrl) throw new Error("KALZERO_PUBLIC_API_URL is not defined");
  return normalizeAbsoluteUrl(envUrl) ?? envUrl;
}

function buildTargetUrl(request: NextRequest, path: string[] | undefined) {
  const incomingUrl = new URL(request.url);
  const pathname = path && path.length > 0 ? `/${path.join("/")}` : "";
  const baseUrl = resolveApiProxyBaseUrl();
  return `${baseUrl}${pathname}${incomingUrl.search}`;
}

// Forwards all HTTP methods to the FastAPI backend
// Special-cases PUT/PATCH /api/media/[id] for direct MongoDB updates
async function proxyRequest(request: NextRequest, context: ProxyRouteContext) {
  const { path } = await context.params;

  // Intercept media metadata updates to MongoDB
  if (
    (request.method === "PUT" || request.method === "PATCH") &&
    path &&
    ((path.length === 2 && path[0] === "media") ||
     (path.length === 3 && path[0] === "admin" && path[1] === "media"))
  ) {
    const id = path[path.length - 1];
    const tenantDbName = request.headers.get("x-tenant-db");
    if (!tenantDbName) {
      return Response.json({ error: "x-tenant-db header is required" }, { status: 400 });
    }
    try {
      const body = await request.json();
      const { filename, altText, foldername, isWatermark } = body;
      const client = await connectToDatabase();
      const db = client.db(tenantDbName);
      const collection = db.collection("media");
      const updateData: Record<string, unknown> = {};
      if (filename !== undefined) updateData.filename = filename;
      if (altText !== undefined) updateData.alt = altText;
      if (foldername !== undefined) updateData.foldername = foldername;
      if (isWatermark !== undefined) updateData.isWatermark = isWatermark;
      updateData.updatedAt = new Date();
      let query: Record<string, unknown> = {};
      if (ObjectId.isValid(id)) {
        query = { _id: new ObjectId(id) };
      } else {
        query = { id: id };
      }
      const result = await collection.updateOne(query, { $set: updateData });
      if (result.matchedCount === 0 && ObjectId.isValid(id)) {
        const altResult = await collection.updateOne({ id: id }, { $set: updateData });
        if (altResult.matchedCount === 0) {
          return Response.json({ error: "Media item not found" }, { status: 404 });
        }
      } else if (result.matchedCount === 0) {
        return Response.json({ error: "Media item not found" }, { status: 404 });
      }
      return Response.json({ success: true, message: "Media item updated successfully" });
    } catch (error: any) {
      return Response.json({ error: error.message || "Failed to update media item" }, { status: 500 });
    }
  }

  // Proxy everything else to FastAPI backend
  const incomingUrl = new URL(request.url);
  const targetUrl = buildTargetUrl(request, path);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("x-forwarded-host", incomingUrl.host);
  headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));
  const init: RequestInit = { method: request.method, headers, cache: "no-store", redirect: "manual" };
  let body: ArrayBuffer | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.arrayBuffer();
  }
  if (body && body.byteLength > 0) init.body = body;
  try {
    const response = await fetch(targetUrl, init);
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: new Headers(response.headers),
    });
  } catch (error: any) {
    const detail = error instanceof Error && error.message
      ? `API proxy request failed: ${error.message}`
      : "API proxy request failed.";
    return Response.json({ detail, targetUrl }, { status: 502 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const OPTIONS = proxyRequest;
export const HEAD = proxyRequest;
```

### TARGET 12: `src/middleware.ts`

Generate middleware if multi-language support is required.

### TARGET 13: `src/lib/i18n/locale.ts`

Export `getLocalizedString` helper for `LocalizedString` objects.

### TARGET 14: Dynamic Form Section Component

Generate a `FormSection` component that renders forms entirely from JSON config:

- Reads `section.props.form` for field definitions and settings
- Reads `section.props.formHeading`, `formDescription`, `successHeading`, `successDescription`, `successButtonText` for UI content
- Uses `section.layout` (one_column/two_column/three_column) for field grid layout
- Renders every field type from the dynamic field definitions (text, email, phone, password, textarea, number, select, multiselect, checkbox, radio, switch, date, datetime, file, hidden, url)
- Implements client-side validation: required, email, phone, pattern, min/max
- Shows inline validation messages below each field
- On submit: POSTs to `/api/form-data` with body `{ pageSlug, pageTitle, sectionId, formId, formName, submission: { fieldName: value } }`
- Auto-switches to `multipart/form-data` when file fields are present
- Submit button disabled + loading indicator during submission
- On success: hides form, shows success state with `successHeading`/`successDescription`/`successButtonText`
- On error: preserves values, shows server or generic error
- Full accessibility: `id`, `name`, `label`, `aria-*`, keyboard nav
- Unknown field types are ignored gracefully — never break rendering

### TARGET 15: API Form Submission Handler (included in proxy)

The proxy route at `src/app/api/[[slug]]/route.ts` forwards `POST /api/form-data` to the FastAPI backend. The frontend `FormSection` component sends submissions to `/api/form-data` — no additional route file needed.

### TARGET 16: Product Variant Selector Component

Generate a `ProductVariantSelector` component:

- Reads product config from `section.props.product`
- Renders option inputs based on `option.type`:
  - `select` → `<select>` dropdown
  - `swatch` → circular color swatches with check/ring on selected
  - `button-group` → button-style selectors
  - `radio` → radio button group
- Handles `dependsOn` (conditional options) — hides/shows option based on parent selection
- Updates `selectedVariant` state based on all option selections
- Displays current variant price (or base price if no variant selected)
- Updates main product image when variant changes (color variant → different image)
- Calls `onVariantChange` callback with the selected variant ID
- Validates all required options are selected before enabling add-to-cart
- Shows "out of stock" state when selected variant is not available

---

## B5. COMPONENT INVENTORY

| Component | Path | Purpose |
|-----------|------|---------|
| EditableText | `src/components/shared/EditableText.tsx` | Click-to-edit inline text |
| Button | `src/components/ui/Button.tsx` | Primary/secondary/outline buttons |
| Card | `src/components/ui/Card.tsx` | Themed card container |
| Modal | `src/components/ui/Modal.tsx` | Overlay dialog |
| Accordion | `src/components/ui/Accordion.tsx` | Expandable FAQ/list |
| LoadingSkeleton | `src/components/ui/LoadingSkeleton.tsx` | Loading state |
| ThemeToggle | `src/components/ui/ThemeToggle.tsx` | Light/dark toggle |
| StarRating | `src/components/ui/StarRating.tsx` | Star rating display |
| DynamicForm | `src/components/sections/DynamicForm.tsx` | Renders forms entirely from JSON config |
| ProductVariantSelector | `src/components/product/VariantSelector.tsx` | Size/color/length selection UI |
| AddToCartButton | `src/components/product/AddToCartButton.tsx` | Add to cart with state management |
| CartIcon | `src/components/cart/CartIcon.tsx` | Header cart icon with badge |
| CartDropdown | `src/components/cart/CartDropdown.tsx` | Mini-cart dropdown |
| [Section Components] | `src/components/sections/*.tsx` | One per page block type |

---

## B6. DATA FLOW SUMMARY

```
STATIC PAGES:
  src/lib/data/pages/*.json
       │
  pagesSlice.loadInitialData()
       │
  useSelector(state.pages.currentPages)
       │
  Page renders content.map() → <SectionRenderer block={...} />
       │
  <EditableText> dispatches updatePageField → Redux → UI updates

CART (CLIENT-SIDE):
  <VariantSelector> + <AddToCartButton>
       │
  dispatch(cartSlice.addItem({ variantId, quantity }))
       │
  localStorage persistence ← → Redux cart store
       │
  <CartIcon> reads cart item count
  <CartDropdown> reads full cart state

ORDER SUBMISSION:
  Checkout form → POST /api/orders
       │
  src/app/api/[[slug]]/route.ts proxies to FastAPI backend
       │
  FastAPI creates order in MongoDB
       │
  Returns order confirmation with order number

FORM SUBMISSION:
  <DynamicForm block={...}>
       │
  POST /api/form-data (pageSlug, sectionId, formId, submission)
       │
  src/app/api/[[slug]]/route.ts proxies to FastAPI backend
       │
  FastAPI stores submission in MongoDB
       │
  Returns success/error response → DynamicForm shows success/error state

MEDIA UPLOAD:
  PUT/PATCH /api/media/[id]
       │
  src/app/api/[[slug]]/route.ts intercepts and updates MongoDB directly
       │
  (Bypasses FastAPI for media metadata updates)
```

---

## B7. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Usage |
|-----------|-------|-------|
| Mobile | < 640px | Single column, stacked product layout |
| sm | ≥ 640px | 2-column grids |
| md | ≥ 768px | 2-3 column grids, larger font sizes, side-by-side product layout |
| lg | ≥ 1024px | Full multi-column layouts, desktop nav with dropdowns |
| xl | ≥ 1280px | Max-width container (1280px) |

Container max-width: 1280px

Product page responsive:
- Mobile: Image full-width, details below, options as full-width selects
- lg+: 2-column split — gallery left (50%), product details right (50%)

---

## B8. SEO REQUIREMENTS

1. Each page JSON includes `metaTitle` and `metaDescription`
2. `generateMetadata()` reads from Redux store or page JSON
3. Open Graph tags: `og:title`, `og:description`, `og:url`, `og:image` (product image for shop page)
4. Twitter card: `summary_large_image` for product pages
5. Canonical URL per page
6. robots: `index, follow`
7. Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`
8. `alt` text on all images (especially product images)
9. Focus-visible outlines for keyboard navigation
10. Skip-to-content link
11. Prefers-reduced-motion media query support
12. Structured data (JSON-LD) for Product schema on shop page: name, description, image, brand (PeeKeeper), offers (price, currency, availability)
13. Structured data for AggregateRating on shop page: ratingValue, bestRating, ratingCount, reviewCount
14. Sitemap generation including all static pages
