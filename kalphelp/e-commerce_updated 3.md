# COMPLETE E-COMMERCE PROMPT

## INSTRUCTIONS FOR AI

Act as an **Elite Full-Stack Next.js 15 Architect**, **E-commerce Specialist**, **CMS Architect**, and **Design System Expert**. Generate a complete, production-ready e-commerce website for fashion retail/D2C purposes that is **FULLY INTEGRATED with the Blueprint System**.

**CRITICAL REQUIREMENTS:**
- **NO `.data.ts` files** - Do not create any `.data.ts` files anywhere in the project
- **SINGLE PAGE JSON** - Each page has its own JSON configuration file
- **ALL PAGES RENDER FROM JSON** - Every page (Home, Shop, Product, Cart, Checkout, Wishlist, About, Contact, FAQ) renders its content from its dedicated JSON file
- **NO CMS DATABASE COLLECTION** - Page content is NOT stored in MongoDB, only in local JSON files
- **LOCALE SUPPORT** - Routes use `[locale]` folder structure. Default language (en) has NO locale prefix in URLs (e.g., `/`, `/about`). Other languages include prefix (e.g., `/hi`, `/hi/about`)
- **EDITABLE TEXT** - All text content must be wrapped in `EditableText` component for inline editing capability
- **CLEAN TEXT STORAGE** - JSON stores clean text WITHOUT HTML tags (no `<span>`, `<div>`, etc.)
- **STYLING VIA CSS CLASSES** - All visual styling (gradients, colors, fonts) applied via CSS classes, not inline HTML
- **BLUEPRINT INTEGRATION** - All theme values come from Blueprint system via CSS variables - NO hardcoded colors/fonts/spacing
- **NO DARK MODE TOGGLE** - Dark mode is controlled by Blueprint system, not a UI toggle button

---

## VARIABLE CONFIGURATION (INPUT JIG)

```yaml
# COMPANY IDENTITY
COMPANY_NAME: {YOUR_COMPANY_NAME}
PROJECT_SLUG: {PROJECT_SLUG}
BUSINESS_TYPE: {BUSINESS_TYPE}
VERTICAL: {VERTICAL}
INDUSTRY: {INDUSTRY}
BUSINESS_GOAL: {BUSINESS_GOAL}
CURRENT_TENANT DB HEADER: {DB_HEADER}

# LOCALIZATION PRIMITIVES
ACTIVE_LANGUAGES: [{LANGUAGES}]
DEFAULT_LANGUAGE: {DEFAULT_LANGUAGE}
ACTIVE_CURRENCIES: [{CURRENCIES}]
DEFAULT_CURRENCY: {DEFAULT_CURRENCY}

# LOCALIZATION RULES (FROM CMS)
# - URLs for default language have NO locale prefix (e.g., https://domain.com/, https://domain.com/about)
# - URLs for other languages include locale prefix (e.g., https://domain.com/hi, https://domain.com/hi/about)
# - Default language content uses actual text; other languages initially contain same text (can be translated later)
# - Routes use [locale] folder structure internally but middleware handles clean URLs

# CONTACT INFORMATION
COMPANY_ADDRESS: {COMPANY_ADDRESS}
COMPANY_PHONE: {COMPANY_PHONE}
COMPANY_EMAIL: {COMPANY_EMAIL}
COMPANY_WHATSAPP: {COMPANY_WHATSAPP}
```

---

## WEBSITE STRATEGY

**Purpose:** E-commerce/D2C fashion retail website

**Core Requirements:**
- **NO `.data.ts` files** - Do not create any `.data.ts` files anywhere in the project
- **SINGLE PAGE JSON** - Each page has its own JSON configuration file
- **ALL PAGES RENDER FROM JSON** - Every page (Home, Shop, Product, Cart, Checkout, Wishlist, About, Contact, FAQ) renders its content from its dedicated JSON file
- **NO CMS DATABASE COLLECTION** - Page content is NOT stored in MongoDB, only in local JSON files
- **EDITABLE TEXT** - All text content must be wrapped in `EditableText` component for inline editing capability
- **CLEAN TEXT STORAGE** - JSON stores clean text WITHOUT HTML tags (no `<span>`, `<div>`, etc.)
- **STYLING VIA CSS CLASSES** - All visual styling (gradients, colors, fonts) applied via CSS classes, not inline HTML
- **BLUEPRINT INTEGRATION** - Complete integration with Blueprint system for dynamic theming

**Page Types:**
| Page | Purpose | Editable |
|------|---------|----------|
| Home | Marketing/hero showcase, featured collections | Yes |
| Shop | Product listing, filters, sorting | Yes (config) |
| Product | Product details (dynamic from DB) | No (Server Component) |
| Cart | Shopping cart management | Yes (config) |
| Checkout | Multi-step checkout process | Yes (config) |
| Wishlist | Saved products list | Yes (config) |
| About | Company story, mission, team | Yes |
| Contact | Contact form, map, info | Yes |
| FAQ | Accordion Q&A sections | Yes |
| Account | User profile, orders | No (protected) |

---

## PAGE STRUCTURE

### Route Structure with Clean URLs

```
src/app/
├── [locale]/                     # Internal folder for all locales
│   ├── layout.tsx                # Locale-aware root layout (includes BlueprintProvider)
│   ├── page.tsx                  # Serves / (default) and /hi
│   ├── shop/
│   │   ├── page.tsx              # Serves /shop (default) and /hi/shop
│   │   └── [slug]/
│   │       └── page.tsx          # Product details (Server Component)
│   ├── cart/
│   │   └── page.tsx              # Serves /cart (default) and /hi/cart
│   ├── checkout/
│   │   └── page.tsx              # Serves /checkout (default) and /hi/checkout
│   ├── wishlist/
│   │   └── page.tsx              # Serves /wishlist (default) and /hi/wishlist
│   ├── about/
│   │   └── page.tsx              # Serves /about (default) and /hi/about
│   ├── contact/
│   │   └── page.tsx              # Serves /contact (default) and /hi/contact
│   ├── faq/
│   │   └── page.tsx              # Serves /faq (default) and /hi/faq
│   ├── account/
│   │   ├── page.tsx              # My Account
│   │   ├── orders/
│   │   │   └── page.tsx          # Order history
│   │   └── profile/
│   │       └── page.tsx          # Profile settings
│   └── search/
│       └── page.tsx              # Search results
├── api/
│   ├── [[...slug]]/              # CATCH-ALL PROXY for Blueprint API
│   │   └── route.ts              # Forwards to backend with tenant header
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── wishlist/
│   └── payment/
└── admin/                        # Admin dashboard
    └── layout.tsx                # Admin layout with context="admin"
```

**URL Structure Examples:**
| Page | Default Language (en) | Hindi (hi) |
|------|----------------------|------------|
| Home | `https://domain.com/` | `https://domain.com/hi` |
| Shop | `https://domain.com/shop` | `https://domain.com/hi/shop` |
| Cart | `https://domain.com/cart` | `https://domain.com/hi/cart` |
| About | `https://domain.com/about` | `https://domain.com/hi/about` |
| Contact | `https://domain.com/contact` | `https://domain.com/hi/contact` |

---

## BLUEPRINT SYSTEM INTEGRATION

### Architecture Overview

```
fetchBlueprintThunk (GET /api/platform/business-blueprint)
        │
        ▼  (via Next.js catch-all proxy at app/api/[[...slug]]/route.ts)
FastAPI Backend ──→ BlueprintApiResponse
        │
        ▼
blueprintThunk.ts — returns json.data (the API wrapper)
        │
        ▼
blueprintSlice.ts — fulfilled handler stores action.payload.payload into state.blueprint.payload
        │
        ▼
BlueprintProvider.tsx — reads selectActiveTheme, calls applyTheme()
        │
        ▼
applyTheme.ts — injects CSS custom properties onto document.documentElement
        │
        ▼
Components use var(--primary), var(--background), etc. in CSS/className
```

### CSS Variable Naming Convention (Blueprint)

All blueprint CSS variables follow the `--{group}-{name}` pattern:

| Group | Example Variables |
|-------|-------------------|
| Colors | `--primary`, `--text-secondary`, `--border-hover` |
| Typography | `--font-body`, `--text-lg`, `--fw-bold`, `--leading-normal` |
| Spacing | `--space-4`, `--space-8`, `--space-16` |
| Radius | `--radius-md`, `--radius-lg`, `--radius-full` |
| Shadows | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Layout | `--container`, `--navbar-height`, `--section-padding` |
| Buttons | `--btn-height`, `--btn-padding-x`, `--btn-primary-bg` |
| Forms | `--input-height`, `--input-bg`, `--input-border` |
| Modal | `--modal-sm`, `--modal-md`, `--modal-lg` |

### Component Usage Example (Blueprint-Integrated)

```tsx
// Any component using blueprint CSS variables:
<div className="bg-[var(--surface)] text-[var(--text)] p-[var(--space-4)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]">
  <h2 className="font-[var(--font-heading)] text-[var(--text-xl)]">Hello</h2>
</div>
```

---

## JSON FILE ARCHITECTURE

```
src/lib/data/pages/
├── homePage.json           # Homepage content
├── shopPage.json           # Shop listing page config
├── productPage.json        # Product detail page template
├── cartPage.json           # Shopping cart page config
├── checkoutPage.json       # Checkout page config
├── wishlistPage.json       # Wishlist page config
├── aboutPage.json          # About page content
├── contactPage.json        # Contact page content
├── faqPage.json            # FAQ page content
├── termsPage.json          # Terms & Conditions page
├── privacyPage.json        # Privacy Policy page
├── returnsPage.json        # Returns Policy page
├── footerData.json         # Footer configuration (global)
└── headerData.json         # Header configuration (global)
```

### JSON File Structure Contract

**IMPORTANT: Store clean text WITHOUT HTML tags**

```json
{
  "pageType": "home | shop | product | cart | checkout | wishlist | about | contact | faq",
  "slug": "home",
  "isPublished": true,
  "seo": {
    "title": {
      "en": "YourBrand - Fashion for the Bold",
      "hi": "YourBrand - Fashion for the Bold"
    },
    "description": {
      "en": "Discover bold fashion at YourBrand. Free shipping on orders over ₹4999.",
      "hi": "Discover bold fashion at YourBrand. Free shipping on orders over ₹4999."
    },
    "keywords": {
      "en": ["fashion", "clothing", "streetwear", "trendy"],
      "hi": ["fashion", "clothing", "streetwear", "trendy"]
    },
    "ogImage": "/images/og-image.jpg"
  },
  "sections": [
    {
      "id": "unique-section-id",
      "type": "hero | product-grid | featured-collections | testimonials | cart-items | checkout-form | faq-accordion | cta | text | image | metrics | accordion",
      "adminTitle": "Hero Section",
      "props": {
        "heading": {
          "en": "Define Your Edge",
          "hi": "Define Your Edge"
        },
        "subheading": {
          "en": "Bold designs. Premium materials. Made for the fearless.",
          "hi": "Bold designs. Premium materials. Made for the fearless."
        },
        "primaryButtonText": {
          "en": "Shop Now",
          "hi": "Shop Now"
        },
        "primaryButtonLink": "/shop",
        "backgroundColor": "primary | secondary | accent | white | gray",
        "paddingTop": "4",
        "paddingBottom": "4",
        "alignment": "left | center | right"
      },
      "content": [
        {
          "id": "content-item-id",
          "type": "card | item | slide | feature | testimonial | product | pricing-plan | stat | faq-item",
          "props": {
            "title": {
              "en": "Clean text title without HTML",
              "hi": "Clean text title without HTML"
            },
            "description": {
              "en": "Clean text description without HTML tags",
              "hi": "Clean text description without HTML tags"
            },
            "image": "/path/to/image.jpg",
            "price": 2999,
            "originalPrice": 4999,
            "ctaText": {
              "en": "Shop Now",
              "hi": "Shop Now"
            },
            "ctaLink": "/product/slug"
          }
        }
      ]
    }
  ]
}
```

---

## SECTION BLUEPRINT

### Section Types & Properties

| Section Type | Required Props | Content Item Types |
|--------------|----------------|---------------------|
| **hero** | heading, subheading, primaryButtonText, primaryButtonLink, backgroundImage, alignment | CTA items |
| **product-grid** | heading, subheading, columns, productsPerPage | product items |
| **featured-collections** | heading, subheading, columns | card items |
| **testimonials** | heading, backgroundStyle | testimonial items |
| **cart-items** | tableConfig, emptyStateMessage | cart-item items |
| **checkout-form** | steps, fields, validationRules | form-field items |
| **faq-accordion** | heading, subheading | faq-item items |
| **cta** | heading, subheading, buttonText, buttonLink, backgroundStyle | none |
| **text** | heading, content, alignment | none |
| **image** | image, alt, caption, alignment, width | none |
| **metrics** | heading, subheading | stat items |
| **accordion** | heading, subheading | faq-item items |

### Content Item Types (Generic)

| Content Item Type | Used In Sections | Props |
|------------------|------------------|-------|
| **card** | grid, featured-collections | title, description, image, icon, ctaText, ctaLink |
| **product** | product-grid | title, price, originalPrice, image, slug, rating |
| **testimonial** | testimonials | quote, author, role, avatar, rating |
| **stat** | metrics, stats | value, label, prefix, suffix |
| **faq-item** | accordion, faq-accordion | question, answer |
| **form-field** | checkout-form | label, type, required, placeholder, options |
| **cart-item** | cart-items | productId, name, price, quantity, image, maxQuantity |

---

## BLUEPRINT TYPES (FULL IMPLEMENTATION)

### TARGET 1: src/redux/slices/blueprint/blueprintType.ts

```typescript
// ============================================================
// BLUEPRINT TYPE DEFINITIONS
// Full TypeScript interfaces mirroring the backend API shape
// ============================================================

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  accentHover: string;
  accentSoft: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderHover: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  overlay: string;
}

export interface ThemeTypographyText {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
}

export interface ThemeTypographyFw {
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
}

export interface ThemeTypographyLineHeight {
  tight: string;
  normal: string;
  relaxed: string;
}

export interface ThemeTypography {
  bodyFont: string;
  headingFont: string;
  monoFont: string;
  text: ThemeTypographyText;
  fw: ThemeTypographyFw;
  lineHeight: ThemeTypographyLineHeight;
}

export interface ThemeSpacing {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "8": string;
  "10": string;
  "12": string;
  "16": string;
  "20": string;
  "24": string;
}

export interface ThemeRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

export interface ThemeShadow {
  sm: string;
  md: string;
  lg: string;
  hover: string;
}

export interface ThemeLayout {
  container: string;
  navbarHeight: string;
  sectionPadding: string;
}

export interface ThemeButtons {
  height: string;
  paddingX: string;
  radius: string;
  primaryBackground: string;
  primaryText: string;
  primaryHover: string;
  secondaryBackground: string;
  secondaryText: string;
  secondaryHover: string;
  outlineBorder: string;
  outlineText: string;
  outlineHoverBg: string;
  outlineHoverText: string;
}

export interface ThemeForms {
  inputHeight: string;
  inputPaddingX: string;
  inputPaddingY: string;
  inputRadius: string;
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  inputBorderHover: string;
  inputPlaceholder: string;
  inputFocusBorder: string;
  inputFocusShadow: string;
  inputDisabledBackground: string;
  inputDisabledText: string;
  textareaMinHeight: string;
}

export interface ThemeModal {
  sm: string;
  md: string;
  lg: string;
}

export interface ThemeDarkMode {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  inputPlaceholder: string;
  inputDisabledBackground: string;
}

export interface Theme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadow: ThemeShadow;
  layout: ThemeLayout;
  buttons: ThemeButtons;
  forms: ThemeForms;
  modal: ThemeModal;
  darkMode: ThemeDarkMode;
}

export interface NavItem {
  label: {
    en: string;
    hi?: string;
  };
  href: string;
  dropdownItems?: NavItem[];
}

export interface RouteDefinition {
  path: string;
  component: string;
  isProtected: boolean;
  roles?: string[];
}

export interface BrandValue {
  title: {
    en: string;
    hi?: string;
  };
  description: {
    en: string;
    hi?: string;
  };
  icon?: string;
}

export interface BrandTaglines {
  primary: {
    en: string;
    hi?: string;
  };
  secondary?: {
    en: string;
    hi?: string;
  };
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface BusinessProfile {
  name: {
    en: string;
    hi?: string;
  };
  tagline: BrandTaglines;
  logo?: string;
  favicon?: string;
  description?: {
    en: string;
    hi?: string;
  };
  foundedYear?: number;
  headquarters?: string;
  values: BrandValue[];
  socialLinks: SocialLink[];
}

export interface BusinessInfo {
  legalName: string;
  registrationNumber?: string;
  taxId?: string;
  gst?: string;
}

export interface BusinessCommunications {
  phone: string;
  email: string;
  whatsapp?: string;
  supportEmail?: string;
}

export interface BusinessContactInfo {
  address: {
    en: string;
    hi?: string;
  };
  phone: string;
  email: string;
  whatsapp?: string;
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface BusinessLegalRegulatory {
  termsUrl: string;
  privacyUrl: string;
  returnsUrl: string;
  shippingPolicyUrl?: string;
}

export interface Commerce {
  currencyCode: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  taxRate: number;
  shippingCost: number;
  enabledPaymentMethods: string[];
  enabledShippingMethods: Array<{
    id: string;
    name: {
      en: string;
      hi?: string;
    };
    cost: number;
    minOrderValue?: number;
  }>;
}

export interface Localization {
  activeLanguages: string[];
  defaultLanguage: string;
  activeCurrencies: Array<{
    code: string;
    symbol: string;
  }>;
  defaultCurrency: string;
}

export interface MediaConfiguration {
  maxFileSize: number;
  allowedImageTypes: string[];
  imageQuality: number;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

export interface DashboardWidget {
  id: string;
  type: string;
  title: {
    en: string;
    hi?: string;
  };
  config: Record<string, any>;
}

export interface Vocabulary {
  [key: string]: {
    en: string;
    hi?: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  sections: any[];
}

export interface ToneTag {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface PrimaryGoal {
  id: string;
  name: string;
  description?: string;
  metrics: string[];
}

export interface Navigation {
  public: NavItem[];
  admin?: NavItem[];
}

export interface Routes {
  public: RouteDefinition[];
  protected: RouteDefinition[];
  admin?: RouteDefinition[];
}

export interface EnabledModules {
  ecommerce: boolean;
  blog: boolean;
  portfolio: boolean;
  team: boolean;
  careers: boolean;
}

export interface BlueprintPayload {
  id: string;
  document_key: string;
  business_profile: BusinessProfile;
  business_info: BusinessInfo;
  business_communications: BusinessCommunications;
  business_contact_info: BusinessContactInfo;
  business_legal_regulatory: BusinessLegalRegulatory;
  public_theme: Theme;
  admin_theme: Theme;
  public_navigation: Navigation;
  admin_navigation: Navigation;
  routes: Routes;
  commerce: Commerce;
  localization: Localization;
  media_configuration: MediaConfiguration;
  dashboard_widgets: DashboardWidget[];
  vocabulary: Vocabulary;
  templates: Template[];
  tone_tags: ToneTag[];
  primary_goals: PrimaryGoal[];
  enabled_modules: EnabledModules;
  created_at: string;
  updated_at: string;
}

export interface BlueprintApiResponse {
  message: string;
  success: boolean;
  data: {
    id: string;
    document_key: string;
    payload: BlueprintPayload;
  };
}

export type ThemeContext = 'public' | 'admin';

export interface BlueprintState {
  payload: BlueprintPayload | null;
  activeThemeContext: ThemeContext;
  loading: boolean;
  updating: boolean;
  error: string | null;
  lastFetched: string | null;
}
```

### TARGET 2: src/redux/slices/blueprint/blueprintThunk.ts

```typescript
// ============================================================
// BLUEPRINT ASYNC THUNKS
// Handles API calls to fetch and update blueprint data
// ============================================================

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type { BlueprintPayload, Theme, BrandValue, BusinessProfile, Navigation } from './blueprintType';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper to get tenant header
const getTenantHeader = () => ({
  'x-tenant-db': process.env.NEXT_PUBLIC_TENANT_DB || '',
});

// Helper for fetch requests
async function fetchWithTenant(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getTenantHeader(),
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  
  return response.json();
}

// GET: Fetch full blueprint payload
export const fetchBlueprintThunk = createAsyncThunk(
  'blueprint/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint');
      return response.data; // Returns { id, document_key, payload }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Full replace of payload
export const updateBlueprintThunk = createAsyncThunk(
  'blueprint/update',
  async (payload: BlueprintPayload, { rejectWithValue }) => {
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint', {
        method: 'PUT',
        body: JSON.stringify({ payload }),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Merge theme (reads current state)
export const updateThemeThunk = createAsyncThunk(
  'blueprint/updateTheme',
  async ({ context, theme }: { context: 'public' | 'admin'; theme: Partial<Theme> }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentPayload = state.blueprint.payload;
    
    if (!currentPayload) {
      return rejectWithValue('No blueprint payload found');
    }
    
    const updatedPayload = {
      ...currentPayload,
      [context === 'public' ? 'public_theme' : 'admin_theme']: {
        ...(context === 'public' ? currentPayload.public_theme : currentPayload.admin_theme),
        ...theme,
      },
    };
    
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint', {
        method: 'PUT',
        body: JSON.stringify({ payload: updatedPayload }),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Merge brand value
export const updateBrandValueThunk = createAsyncThunk(
  'blueprint/updateBrandValue',
  async (brandValue: BrandValue, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentPayload = state.blueprint.payload;
    
    if (!currentPayload) {
      return rejectWithValue('No blueprint payload found');
    }
    
    const updatedPayload = {
      ...currentPayload,
      business_profile: {
        ...currentPayload.business_profile,
        values: [...currentPayload.business_profile.values, brandValue],
      },
    };
    
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint', {
        method: 'PUT',
        body: JSON.stringify({ payload: updatedPayload }),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Merge business profile
export const updateBusinessProfileThunk = createAsyncThunk(
  'blueprint/updateBusinessProfile',
  async (profile: Partial<BusinessProfile>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentPayload = state.blueprint.payload;
    
    if (!currentPayload) {
      return rejectWithValue('No blueprint payload found');
    }
    
    const updatedPayload = {
      ...currentPayload,
      business_profile: {
        ...currentPayload.business_profile,
        ...profile,
      },
    };
    
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint', {
        method: 'PUT',
        body: JSON.stringify({ payload: updatedPayload }),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT: Merge navigation
export const updateNavigationThunk = createAsyncThunk(
  'blueprint/updateNavigation',
  async ({ context, navigation }: { context: 'public' | 'admin'; navigation: Partial<Navigation> }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentPayload = state.blueprint.payload;
    
    if (!currentPayload) {
      return rejectWithValue('No blueprint payload found');
    }
    
    const updatedPayload = {
      ...currentPayload,
      [context === 'public' ? 'public_navigation' : 'admin_navigation']: {
        ...(context === 'public' ? currentPayload.public_navigation : currentPayload.admin_navigation),
        ...navigation,
      },
    };
    
    try {
      const response = await fetchWithTenant('/api/platform/business-blueprint', {
        method: 'PUT',
        body: JSON.stringify({ payload: updatedPayload }),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
```

### TARGET 3: src/redux/slices/blueprint/blueprintSlice.ts

```typescript
// ============================================================
// BLUEPRINT REDUX SLICE
// Manages blueprint state with selectors for theme access
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BlueprintState, BlueprintPayload, ThemeContext, Theme } from './blueprintType';
import {
  fetchBlueprintThunk,
  updateBlueprintThunk,
  updateThemeThunk,
  updateBrandValueThunk,
  updateBusinessProfileThunk,
  updateNavigationThunk,
} from './blueprintThunk';

const initialState: BlueprintState = {
  payload: null,
  activeThemeContext: 'public',
  loading: false,
  updating: false,
  error: null,
  lastFetched: null,
};

const blueprintSlice = createSlice({
  name: 'blueprint',
  initialState,
  reducers: {
    setThemeContext: (state, action: PayloadAction<ThemeContext>) => {
      state.activeThemeContext = action.payload;
    },
    applyColorOverride: (state, action: PayloadAction<{ context: ThemeContext; colors: Record<string, string> }>) => {
      const { context, colors } = action.payload;
      const themeKey = context === 'public' ? 'public_theme' : 'admin_theme';
      if (state.payload) {
        const currentTheme = state.payload[themeKey] as Theme;
        state.payload[themeKey] = {
          ...currentTheme,
          colors: {
            ...currentTheme.colors,
            ...colors,
          },
        };
      }
    },
    clearBlueprintError: (state) => {
      state.error = null;
    },
    resetBlueprint: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Blueprint
    builder.addCase(fetchBlueprintThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlueprintThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
    builder.addCase(fetchBlueprintThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    
    // Update Blueprint
    builder.addCase(updateBlueprintThunk.pending, (state) => {
      state.updating = true;
      state.error = null;
    });
    builder.addCase(updateBlueprintThunk.fulfilled, (state, action) => {
      state.updating = false;
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
    builder.addCase(updateBlueprintThunk.rejected, (state, action) => {
      state.updating = false;
      state.error = action.payload as string;
    });
    
    // Update Theme
    builder.addCase(updateThemeThunk.fulfilled, (state, action) => {
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
    
    // Update Brand Value
    builder.addCase(updateBrandValueThunk.fulfilled, (state, action) => {
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
    
    // Update Business Profile
    builder.addCase(updateBusinessProfileThunk.fulfilled, (state, action) => {
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
    
    // Update Navigation
    builder.addCase(updateNavigationThunk.fulfilled, (state, action) => {
      state.payload = action.payload.payload;
      state.lastFetched = new Date().toISOString();
    });
  },
});

// ============================================================
// SELECTORS
// ============================================================

export const selectBlueprint = (state: { blueprint: BlueprintState }) => state.blueprint.payload;
export const selectThemeContext = (state: { blueprint: BlueprintState }) => state.blueprint.activeThemeContext;
export const selectPublicTheme = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.public_theme;
export const selectAdminTheme = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.admin_theme;
export const selectActiveTheme = (state: { blueprint: BlueprintState }): Theme | null => {
  const payload = state.blueprint.payload;
  const context = state.blueprint.activeThemeContext;
  if (!payload) return null;
  return context === 'public' ? payload.public_theme : payload.admin_theme;
};
export const selectBrandValue = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.business_profile;
export const selectBusinessProfile = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.business_profile;
export const selectPublicNavigation = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.public_navigation;
export const selectAdminNavigation = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.admin_navigation;
export const selectRoutes = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.routes;
export const selectEnabledModules = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.enabled_modules;
export const selectVocabulary = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.vocabulary;
export const selectLocalization = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.localization;
export const selectCommerce = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.commerce;
export const selectDashboardWidgets = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.dashboard_widgets;
export const selectTemplates = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.templates;
export const selectToneTags = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.tone_tags;
export const selectMediaConfiguration = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.media_configuration;
export const selectBlueprintLoading = (state: { blueprint: BlueprintState }) => state.blueprint.loading;
export const selectBlueprintUpdating = (state: { blueprint: BlueprintState }) => state.blueprint.updating;
export const selectBlueprintError = (state: { blueprint: BlueprintState }) => state.blueprint.error;
export const selectBlueprintLastFetched = (state: { blueprint: BlueprintState }) => state.blueprint.lastFetched;

export const { setThemeContext, applyColorOverride, clearBlueprintError, resetBlueprint } = blueprintSlice.actions;
export default blueprintSlice.reducer;
```

### TARGET 4: src/lib/applyTheme.ts

```typescript
// ============================================================
// APPLY THEME UTILITY
// Injects Blueprint CSS variables onto document.documentElement
// Supports dynamic Google Fonts injection and dark mode
// ============================================================

import type { Theme } from '@/redux/slices/blueprint/blueprintType';

// Helper to inject Google Fonts
const injectGoogleFont = (family: string, id: string) => {
  if (typeof document === 'undefined') return;
  
  // Extract font family name (remove weights and fallbacks)
  const cleanFamily = family.split(',')[0].trim().replace(/['"]/g, '');
  
  const existingLink = document.getElementById(id);
  if (existingLink) {
    // Check if font changed
    if (!existingLink.getAttribute('href')?.includes(cleanFamily)) {
      existingLink.setAttribute('href', `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`);
    }
    return;
  }
  
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
};

// Inject CSS variables from theme
export const applyTheme = (theme: Theme | null, context: 'public' | 'admin' = 'public') => {
  if (typeof document === 'undefined' || !theme) return;
  
  const root = document.documentElement;
  
  // Colors
  if (theme.colors) {
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--primary-light', theme.colors.primaryLight);
    root.style.setProperty('--primary-dark', theme.colors.primaryDark);
    root.style.setProperty('--primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--accent-hover', theme.colors.accentHover);
    root.style.setProperty('--accent-soft', theme.colors.accentSoft);
    root.style.setProperty('--background', theme.colors.background);
    root.style.setProperty('--surface', theme.colors.surface);
    root.style.setProperty('--card', theme.colors.card);
    root.style.setProperty('--text', theme.colors.text);
    root.style.setProperty('--text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--text-muted', theme.colors.textMuted);
    root.style.setProperty('--border', theme.colors.border);
    root.style.setProperty('--border-hover', theme.colors.borderHover);
    root.style.setProperty('--success', theme.colors.success);
    root.style.setProperty('--warning', theme.colors.warning);
    root.style.setProperty('--error', theme.colors.error);
    root.style.setProperty('--info', theme.colors.info);
    root.style.setProperty('--overlay', theme.colors.overlay);
  }
  
  // Typography - Fonts
  if (theme.typography) {
    if (theme.typography.bodyFont) {
      injectGoogleFont(theme.typography.bodyFont, 'google-font-body');
      root.style.setProperty('--font-body', theme.typography.bodyFont);
    }
    if (theme.typography.headingFont) {
      injectGoogleFont(theme.typography.headingFont, 'google-font-heading');
      root.style.setProperty('--font-heading', theme.typography.headingFont);
    }
    if (theme.typography.monoFont) {
      injectGoogleFont(theme.typography.monoFont, 'google-font-mono');
      root.style.setProperty('--font-mono', theme.typography.monoFont);
    }
    
    // Typography - Font Sizes
    if (theme.typography.text) {
      root.style.setProperty('--text-xs', theme.typography.text.xs);
      root.style.setProperty('--text-sm', theme.typography.text.sm);
      root.style.setProperty('--text-base', theme.typography.text.base);
      root.style.setProperty('--text-md', theme.typography.text.md);
      root.style.setProperty('--text-lg', theme.typography.text.lg);
      root.style.setProperty('--text-xl', theme.typography.text.xl);
      root.style.setProperty('--text-2xl', theme.typography.text['2xl']);
      root.style.setProperty('--text-3xl', theme.typography.text['3xl']);
      root.style.setProperty('--text-4xl', theme.typography.text['4xl']);
      root.style.setProperty('--text-5xl', theme.typography.text['5xl']);
    }
    
    // Typography - Font Weights
    if (theme.typography.fw) {
      root.style.setProperty('--fw-light', theme.typography.fw.light);
      root.style.setProperty('--fw-normal', theme.typography.fw.normal);
      root.style.setProperty('--fw-medium', theme.typography.fw.medium);
      root.style.setProperty('--fw-semibold', theme.typography.fw.semibold);
      root.style.setProperty('--fw-bold', theme.typography.fw.bold);
      root.style.setProperty('--fw-extrabold', theme.typography.fw.extrabold);
    }
    
    // Typography - Line Heights
    if (theme.typography.lineHeight) {
      root.style.setProperty('--leading-tight', theme.typography.lineHeight.tight);
      root.style.setProperty('--leading-normal', theme.typography.lineHeight.normal);
      root.style.setProperty('--leading-relaxed', theme.typography.lineHeight.relaxed);
    }
  }
  
  // Spacing
  if (theme.spacing) {
    root.style.setProperty('--space-1', theme.spacing['1']);
    root.style.setProperty('--space-2', theme.spacing['2']);
    root.style.setProperty('--space-3', theme.spacing['3']);
    root.style.setProperty('--space-4', theme.spacing['4']);
    root.style.setProperty('--space-5', theme.spacing['5']);
    root.style.setProperty('--space-6', theme.spacing['6']);
    root.style.setProperty('--space-8', theme.spacing['8']);
    root.style.setProperty('--space-10', theme.spacing['10']);
    root.style.setProperty('--space-12', theme.spacing['12']);
    root.style.setProperty('--space-16', theme.spacing['16']);
    root.style.setProperty('--space-20', theme.spacing['20']);
    root.style.setProperty('--space-24', theme.spacing['24']);
  }
  
  // Radius
  if (theme.radius) {
    root.style.setProperty('--radius-sm', theme.radius.sm);
    root.style.setProperty('--radius-md', theme.radius.md);
    root.style.setProperty('--radius-lg', theme.radius.lg);
    root.style.setProperty('--radius-xl', theme.radius.xl);
    root.style.setProperty('--radius-2xl', theme.radius['2xl']);
    root.style.setProperty('--radius-full', theme.radius.full);
  }
  
  // Shadows
  if (theme.shadow) {
    root.style.setProperty('--shadow-sm', theme.shadow.sm);
    root.style.setProperty('--shadow-md', theme.shadow.md);
    root.style.setProperty('--shadow-lg', theme.shadow.lg);
    root.style.setProperty('--shadow-hover', theme.shadow.hover);
  }
  
  // Layout
  if (theme.layout) {
    root.style.setProperty('--container', theme.layout.container);
    root.style.setProperty('--navbar-height', theme.layout.navbarHeight);
    root.style.setProperty('--section-padding', theme.layout.sectionPadding);
  }
  
  // Buttons
  if (theme.buttons) {
    root.style.setProperty('--btn-height', theme.buttons.height);
    root.style.setProperty('--btn-padding-x', theme.buttons.paddingX);
    root.style.setProperty('--btn-radius', theme.buttons.radius);
    root.style.setProperty('--btn-primary-bg', theme.buttons.primaryBackground);
    root.style.setProperty('--btn-primary-text', theme.buttons.primaryText);
    root.style.setProperty('--btn-primary-hover', theme.buttons.primaryHover);
    root.style.setProperty('--btn-secondary-bg', theme.buttons.secondaryBackground);
    root.style.setProperty('--btn-secondary-text', theme.buttons.secondaryText);
    root.style.setProperty('--btn-secondary-hover', theme.buttons.secondaryHover);
    root.style.setProperty('--btn-outline-border', theme.buttons.outlineBorder);
    root.style.setProperty('--btn-outline-text', theme.buttons.outlineText);
    root.style.setProperty('--btn-outline-hover-bg', theme.buttons.outlineHoverBg);
    root.style.setProperty('--btn-outline-hover-text', theme.buttons.outlineHoverText);
  }
  
  // Forms
  if (theme.forms) {
    root.style.setProperty('--input-height', theme.forms.inputHeight);
    root.style.setProperty('--input-padding-x', theme.forms.inputPaddingX);
    root.style.setProperty('--input-padding-y', theme.forms.inputPaddingY);
    root.style.setProperty('--input-radius', theme.forms.inputRadius);
    root.style.setProperty('--input-bg', theme.forms.inputBackground);
    root.style.setProperty('--input-text', theme.forms.inputText);
    root.style.setProperty('--input-border', theme.forms.inputBorder);
    root.style.setProperty('--input-border-hover', theme.forms.inputBorderHover);
    root.style.setProperty('--input-placeholder', theme.forms.inputPlaceholder);
    root.style.setProperty('--input-focus-border', theme.forms.inputFocusBorder);
    root.style.setProperty('--input-focus-shadow', theme.forms.inputFocusShadow);
    root.style.setProperty('--input-disabled-bg', theme.forms.inputDisabledBackground);
    root.style.setProperty('--input-disabled-text', theme.forms.inputDisabledText);
    root.style.setProperty('--textarea-min-height', theme.forms.textareaMinHeight);
  }
  
  // Modal
  if (theme.modal) {
    root.style.setProperty('--modal-sm', theme.modal.sm);
    root.style.setProperty('--modal-md', theme.modal.md);
    root.style.setProperty('--modal-lg', theme.modal.lg);
  }
  
  // Dark Mode CSS (injected as style tag for .dark class)
  if (theme.darkMode) {
    const darkModeStyles = `
      .dark {
        --background: ${theme.darkMode.background};
        --surface: ${theme.darkMode.surface};
        --card: ${theme.darkMode.card};
        --text: ${theme.darkMode.text};
        --text-secondary: ${theme.darkMode.textSecondary};
        --text-muted: ${theme.darkMode.textMuted};
        --border: ${theme.darkMode.border};
        --input-bg: ${theme.darkMode.inputBackground};
        --input-text: ${theme.darkMode.inputText};
        --input-border: ${theme.darkMode.inputBorder};
        --input-placeholder: ${theme.darkMode.inputPlaceholder};
        --input-disabled-bg: ${theme.darkMode.inputDisabledBackground};
      }
    `;
    
    const existingStyle = document.getElementById('blueprint-dark-vars');
    if (existingStyle) {
      existingStyle.innerHTML = darkModeStyles;
    } else {
      const style = document.createElement('style');
      style.id = 'blueprint-dark-vars';
      style.textContent = darkModeStyles;
      document.head.appendChild(style);
    }
  }
};

export default applyTheme;
```

### TARGET 5: src/components/providers/BlueprintProvider.tsx

```typescript
// ============================================================
// BLUEPRINT PROVIDER
// Fetches blueprint data and applies theme to document
// ============================================================

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import {
  fetchBlueprintThunk,
  selectActiveTheme,
  selectThemeContext,
  selectBlueprintLastFetched,
  selectBlueprintLoading,
} from '@/redux/slices/blueprint/blueprintSlice';
import { setThemeContext, setEditableMode } from '@/redux/slices/blueprint/blueprintSlice';
import applyTheme from '@/lib/applyTheme';

interface BlueprintProviderProps {
  children: ReactNode;
  context?: 'public' | 'admin';
}

const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export default function BlueprintProvider({ children, context = 'public' }: BlueprintProviderProps) {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);
  const themeContext = useAppSelector(selectThemeContext);
  const lastFetched = useAppSelector(selectBlueprintLastFetched);
  const isLoading = useAppSelector(selectBlueprintLoading);
  const hasFetched = useRef(false);
  
  // Set theme context on mount
  useEffect(() => {
    if (themeContext !== context) {
      dispatch(setThemeContext(context));
    }
  }, [dispatch, themeContext, context]);
  
  // Fetch blueprint on mount (stale-while-revalidate)
  useEffect(() => {
    if (hasFetched.current) return;
    
    const shouldFetch = !lastFetched || (Date.now() - new Date(lastFetched).getTime()) > STALE_THRESHOLD;
    
    if (shouldFetch && !isLoading) {
      hasFetched.current = true;
      dispatch(fetchBlueprintThunk());
    }
  }, [dispatch, lastFetched, isLoading]);
  
  // Apply theme whenever activeTheme or themeContext changes
  useEffect(() => {
    if (activeTheme) {
      applyTheme(activeTheme, themeContext);
    }
  }, [activeTheme, themeContext]);
  
  // Check for edit mode URL param
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editParam = urlParams.get('edit');
    if (editParam === 'true') {
      dispatch(setEditableMode(true));
    }
  }, [dispatch]);
  
  return <>{children}</>;
}
```

### TARGET 6: src/redux/slices/blueprint/index.ts

```typescript
// ============================================================
// BLUEPRINT BARREL EXPORT
// ============================================================

export { default as blueprintReducer } from './blueprintSlice';
export * from './blueprintType';
export * from './blueprintThunk';
export * from './blueprintSlice';
```

---

## API CATCH-ALL PROXY

### TARGET 7: src/app/api/[[...slug]]/route.ts

```typescript
// ============================================================
// CATCH-ALL API PROXY
// Forwards requests to backend API with tenant header
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:8000';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug?.join('/') || '';
  const searchParams = request.nextUrl.searchParams;
  const queryString = searchParams.toString();
  const url = `${BACKEND_URL}/${slug}${queryString ? `?${queryString}` : ''}`;
  
  const headers = new Headers();
  // Forward tenant header
  const tenantId = request.headers.get('x-tenant-db') || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Proxy request failed', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug?.join('/') || '';
  const body = await request.json();
  const url = `${BACKEND_URL}/${slug}`;
  
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  
  const tenantId = request.headers.get('x-tenant-db') || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Proxy request failed', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug?.join('/') || '';
  const body = await request.json();
  const url = `${BACKEND_URL}/${slug}`;
  
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  
  const tenantId = request.headers.get('x-tenant-db') || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Proxy request failed', error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const slug = params.slug?.join('/') || '';
  const url = `${BACKEND_URL}/${slug}`;
  
  const headers = new Headers();
  const tenantId = request.headers.get('x-tenant-db') || process.env.NEXT_PUBLIC_TENANT_DB;
  if (tenantId) {
    headers.set('x-tenant-db', tenantId);
  }
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: 'Proxy request failed', error: String(error) },
      { status: 500 }
    );
  }
}
```

---

## GLOBAL STYLES (Blueprint-Integrated)

### TARGET 8: src/styles/globals.css

```css
/* ==========================================================
   GLOBAL STYLES WITH BLUEPRINT CSS VARIABLES
   
   All values use var(--*) which are injected at runtime
   by BlueprintProvider from the backend blueprint payload.
   
   NO HARDCODED COLORS, FONTS, OR SPACING VALUES.
========================================================== */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles with fallback defaults (overridden by Blueprint) */
@layer base {
  :root {
    /* Fallback defaults - will be overridden by BlueprintProvider */
    --primary: #2563eb;
    --background: #ffffff;
    --text: #0f172a;
    --font-body: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-heading: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-family: var(--font-body);
    background: var(--background);
    color: var(--text);
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: var(--font-heading);
  }
  
  /* Skip to content link for accessibility */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary);
    color: white;
    padding: 8px;
    z-index: 100;
    text-decoration: none;
  }
  
  .skip-to-content:focus {
    top: 0;
  }
  
  /* Focus states */
  :focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--surface);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 999px;
  }
}

/* Utility classes using blueprint variables */
@layer components {
  .container-custom {
    max-width: var(--container);
    margin-inline: auto;
    padding-inline: 16px;
  }
  
  .section-padding {
    padding-block: var(--section-padding);
  }
  
  /* Card styles */
  .card-theme {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
  }
  
  .card-theme:hover {
    box-shadow: var(--shadow-hover);
    transform: translateY(-2px);
  }
  
  /* Product card */
  .card-product {
    background: var(--card);
    border-radius: var(--product-card-radius, var(--radius-lg));
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--border);
  }
  
  .card-product:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  /* Button variants */
  .btn-primary {
    background: var(--btn-primary-bg);
    color: var(--btn-primary-text);
    min-height: var(--btn-height);
    padding-inline: var(--btn-padding-x);
    border-radius: var(--btn-radius);
    font-weight: var(--fw-medium);
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .btn-primary:hover {
    background: var(--btn-primary-hover);
    transform: translateY(-2px);
  }
  
  .btn-primary:active {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background: var(--btn-secondary-bg);
    color: var(--btn-secondary-text);
    min-height: var(--btn-height);
    padding-inline: var(--btn-padding-x);
    border-radius: var(--btn-radius);
    font-weight: var(--fw-medium);
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid var(--border);
  }
  
  .btn-secondary:hover {
    background: var(--btn-secondary-hover);
    transform: translateY(-2px);
  }
  
  .btn-outline {
    background: transparent;
    border: 1px solid var(--btn-outline-border);
    color: var(--btn-outline-text);
    min-height: var(--btn-height);
    padding-inline: var(--btn-padding-x);
    border-radius: var(--btn-radius);
    font-weight: var(--fw-medium);
    transition: all 0.3s ease;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .btn-outline:hover {
    background: var(--btn-outline-hover-bg);
    color: var(--btn-outline-hover-text);
    transform: translateY(-2px);
  }
  
  .btn-ghost {
    background: transparent;
    color: var(--text);
    min-height: var(--btn-height);
    padding-inline: var(--btn-padding-x);
    border-radius: var(--btn-radius);
    font-weight: var(--fw-medium);
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .btn-ghost:hover {
    background: var(--surface);
  }
  
  /* Form styles */
  .form-input {
    background: var(--input-bg);
    color: var(--input-text);
    border: 1px solid var(--input-border);
    border-radius: var(--input-radius);
    padding: var(--input-padding-y) var(--input-padding-x);
    min-height: var(--input-height);
    width: 100%;
    transition: all 0.2s ease;
  }
  
  .form-input:focus {
    outline: none;
    border-color: var(--input-focus-border);
    box-shadow: var(--input-focus-shadow);
  }
  
  .form-input::placeholder {
    color: var(--input-placeholder);
  }
  
  .form-input:disabled {
    background: var(--input-disabled-bg);
    color: var(--input-disabled-text);
    cursor: not-allowed;
  }
  
  textarea.form-input {
    min-height: var(--textarea-min-height);
  }
  
  /* Gradient utilities */
  .gradient-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .gradient-bg {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  }
}
```

### TARGET 9: src/middleware.ts

```typescript
// ============================================================
// MIDDLEWARE FOR CLEAN URLS
// Default language (en) has NO prefix in URLs
// Other languages (hi) have prefix
// ============================================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['en', 'hi']; // From ACTIVE_LANGUAGES
const DEFAULT_LOCALE = 'en'; // From DEFAULT_LANGUAGE

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip API routes and static files
  if (
    pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.includes('.') ||
    pathname.startsWith('/admin')
  ) {
    return NextResponse.next();
  }
  
  // Check if pathname has a locale prefix
  const segments = pathname.split('/');
  const firstSegment = segments[1];
  
  const hasLocale = LOCALES.includes(firstSegment as any);
  
  if (hasLocale) {
    // If this is default locale in URL, redirect to clean URL (remove /en)
    if (firstSegment === DEFAULT_LOCALE) {
      const newPathname = pathname.replace(`/${DEFAULT_LOCALE}`, '') || '/';
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
    // Keep non-default locales (hi) as is
    return NextResponse.next();
  }
  
  // No locale - serve default locale content via rewrite (internal only)
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|admin).*)'],
};
```

---

## REDUX STORE SETUP

### TARGET 10: src/redux/store/hooks.ts

```typescript
// ============================================================
// TYPED REDUX HOOKS
// ============================================================

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### TARGET 11: src/redux/store/index.ts

```typescript
// ============================================================
// REDUX STORE CONFIGURATION
// ============================================================

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Allow non-serializable values if needed
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### TARGET 12: src/redux/store/rootReducer.ts

```typescript
// ============================================================
// ROOT REDUCER
// Combines all Redux slices
// ============================================================

import { combineReducers } from '@reduxjs/toolkit';
import { blueprintReducer } from '../slices/blueprint';
import pagesReducer from '../slices/pages/pagesSlice';
import cartReducer from '../slices/ecommerce/cartSlice';
import wishlistReducer from '../slices/ecommerce/wishlistSlice';
import authReducer from '../slices/ecommerce/authSlice';

const rootReducer = combineReducers({
  blueprint: blueprintReducer,
  pages: pagesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  auth: authReducer,
});

export default rootReducer;
```

### TARGET 13: src/redux/slices/ecommerce/cartSlice.ts

```typescript
// ============================================================
// CART SLICE
// Manages shopping cart state
// ============================================================

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variantId?: string;
  variantName?: string;
  maxQuantity: number;
}

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
  discount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  couponCode: null,
  discount: 0,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCartThunk = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  'cart/add',
  async (item: Omit<CartItem, 'id'>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemThunk = createAsyncThunk(
  'cart/update',
  async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItemThunk = createAsyncThunk(
  'cart/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyCouponThunk = createAsyncThunk(
  'cart/coupon',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.couponCode = null;
      state.discount = 0;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity <= item.maxQuantity && quantity > 0) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.couponCode = action.payload.couponCode;
      state.discount = action.payload.discount;
    });
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(updateCartItemThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(removeCartItemThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(applyCouponThunk.fulfilled, (state, action) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
    });
  },
});

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartDiscount = (state: RootState) => state.cart.discount;
export const selectCartLoading = (state: RootState) => state.cart.loading;

export const { clearCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
```

### TARGET 14: src/redux/slices/ecommerce/wishlistSlice.ts

```typescript
// ============================================================
// WISHLIST SLICE
// Manages saved products list
// ============================================================

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchWishlistThunk = createAsyncThunk(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wishlist');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  'wishlist/add',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  'wishlist/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/wishlist/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(addToWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
    builder.addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
      state.items = action.payload.items;
    });
  },
});

// Selectors
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;
export const selectIsInWishlist = (state: RootState, productId: string) =>
  state.wishlist.items.some(item => item.productId === productId);

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
```

### TARGET 15: src/redux/slices/ecommerce/authSlice.ts

```typescript
// ============================================================
// AUTH SLICE
// Manages user authentication state
// ============================================================

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunks
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (userData: { email: string; password: string; firstName: string; lastName: string; phone: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMeThunk = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchMeThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
```

---

## PAGE SLICES (FROM CMS)

### TARGET 16: src/redux/slices/pages/pageType.ts

```typescript
// ============================================================
// PAGE TYPES (FROM CMS)
// Localized string type with dynamic locale support
// ============================================================

export type LocalizedString = {
  [locale: string]: string;
};

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'wishlist' 
  | 'about' 
  | 'contact' 
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'returns';

export type SectionType = 
  | 'hero' 
  | 'product-grid'
  | 'featured-collections'
  | 'testimonials'
  | 'cart-items'
  | 'checkout-form'
  | 'faq-accordion'
  | 'cta'
  | 'text'
  | 'image'
  | 'metrics'
  | 'accordion';

export type ContentItemType = 
  | 'card'
  | 'product'
  | 'testimonial'
  | 'stat'
  | 'faq-item'
  | 'form-field'
  | 'cart-item';

export interface ContentItem {
  id: string;
  type: ContentItemType;
  props: Record<string, any>;
}

export interface PageBlock {
  id: string;
  type: SectionType;
  layout: string;
  adminTitle: string;
  props?: Record<string, any>;
  content?: ContentItem[];
}

export interface Page {
  pageType: PageType;
  slug: string;
  isPublished: boolean;
  title?: LocalizedString;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
  seo?: {
    title: LocalizedString;
    description: LocalizedString;
    keywords?: LocalizedString;
    ogImage?: string;
  };
  content: PageBlock[];
}

export interface PagesState {
  allPages: Page[];
  currentPages: Page | null;
  isAllPageFetched: boolean;
  isError: boolean;
  isLoading: boolean;
  isEditablePage: boolean;
}
```

### TARGET 17: src/redux/slices/pages/pagesSlice.ts

```typescript
// ============================================================
// PAGES SLICE (FROM CMS)
// Manages page content with deep cloning for immutability
// ============================================================

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PagesState, Page } from './pageType';
import homePageData from '@/lib/data/pages/homePage.json';
import shopPageData from '@/lib/data/pages/shopPage.json';
import cartPageData from '@/lib/data/pages/cartPage.json';
import checkoutPageData from '@/lib/data/pages/checkoutPage.json';
import wishlistPageData from '@/lib/data/pages/wishlistPage.json';
import aboutPageData from '@/lib/data/pages/aboutPage.json';
import contactPageData from '@/lib/data/pages/contactPage.json';
import faqPageData from '@/lib/data/pages/faqPage.json';
import termsPageData from '@/lib/data/pages/termsPage.json';
import privacyPageData from '@/lib/data/pages/privacyPage.json';
import returnsPageData from '@/lib/data/pages/returnsPage.json';

const initialState: PagesState = {
  allPages: [
    homePageData, shopPageData, cartPageData, checkoutPageData, 
    wishlistPageData, aboutPageData, contactPageData, faqPageData,
    termsPageData, privacyPageData, returnsPageData
  ],
  currentPages: null,
  isAllPageFetched: false,
  isError: false,
  isLoading: false,
  isEditablePage: false,
};

// Helper function to deeply clone an object (ensures immutability)
const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Helper function to deeply update nested object
const deepSetValue = (obj: any, path: string[], value: any): boolean => {
  if (path.length === 0) return false;
  
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
    if (typeof current !== 'object') return false;
  }
  
  const lastKey = path[path.length - 1];
  current[lastKey] = value;
  return true;
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPageBySlug: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      const foundPage = state.allPages.find(page => page.slug === slug);
      state.currentPages = foundPage ? deepClone(foundPage) : null;
    },
    setEditableMode: (state, action: PayloadAction<boolean>) => {
      state.isEditablePage = action.payload;
    },
    updatePageField: (state, action: PayloadAction<{
      sectionId: string;
      fieldPath: string;
      value: string;
      locale?: string;
    }>) => {
      const { sectionId, fieldPath, value, locale = 'en' } = action.payload;
      
      if (!state.currentPages) return;
      
      const sectionIndex = state.currentPages.content.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return;
      
      const pathParts = fieldPath.split('.');
      const locales = ['en', 'hi'];
      
      if (!locales.includes(pathParts[pathParts.length - 1]) && locale !== 'en') {
        pathParts.push(locale);
      }
      
      const updatedCurrentPages = deepClone(state.currentPages);
      const sectionToUpdate = updatedCurrentPages.content[sectionIndex];
      
      const success = deepSetValue(sectionToUpdate, pathParts, value);
      
      if (success) {
        state.currentPages = updatedCurrentPages;
        
        const pageIndex = state.allPages.findIndex(p => p.slug === updatedCurrentPages.slug);
        if (pageIndex !== -1) {
          const updatedAllPages = deepClone(state.allPages);
          const allPageSection = updatedAllPages[pageIndex].content.find(s => s.id === sectionId);
          if (allPageSection) {
            deepSetValue(allPageSection, pathParts, value);
          }
          state.allPages = updatedAllPages;
        }
      }
    },
    refreshCurrentPage: (state) => {
      if (state.currentPages) {
        const refreshed = state.allPages.find(p => p.slug === state.currentPages?.slug);
        if (refreshed) {
          state.currentPages = deepClone(refreshed);
        }
      }
    },
  },
});

export const { setCurrentPageBySlug, setEditableMode, updatePageField, refreshCurrentPage } = pagesSlice.actions;
export default pagesSlice.reducer;
```

### TARGET 18: src/redux/slices/pages/saveField.ts

```typescript
// ============================================================
// SAVE FIELD UTILITY
// Returns Promise for EditableText component
// ============================================================

import { Dispatch } from '@reduxjs/toolkit';
import { updatePageField } from './pagesSlice';
import { Page } from './pageType';

export const saveField = (
  dispatch: Dispatch,
  currentPages: Page | null,
  sectionId: string,
  fieldPath: string,
  value: string,
  locale: string = 'en'
): Promise<void> => {
  return new Promise((resolve) => {
    if (!currentPages) {
      resolve();
      return;
    }
    
    dispatch(updatePageField({
      sectionId,
      fieldPath,
      value,
      locale,
    }));
    
    // Use double requestAnimationFrame to ensure Redux update completes
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
};
```

---

## EDITABLE TEXT COMPONENT

### TARGET 19: src/components/shared/EditableText.tsx

```typescript
// ============================================================
// EDITABLE TEXT COMPONENT
// Supports inline editing with HTML stripping and style preservation
// ============================================================

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  isEditable?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export default function EditableText({
  value,
  onSave,
  isEditable = false,
  tag: Tag = 'span',
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
  rows = 3,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [inputStyles, setInputStyles] = useState<Record<string, string>>({});
  const displayRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const originalValueRef = useRef(value);

  // Update editValue when props.value changes
  useEffect(() => {
    if (!isEditing || (isEditing && value !== editValue)) {
      setEditValue(value);
      originalValueRef.current = value;
    }
  }, [value, isEditing, editValue, isSaving]);

  // Strip HTML tags from text
  const stripHtmlTags = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const getCleanText = (htmlText: string): string => {
    return stripHtmlTags(htmlText);
  };

  const startEditing = useCallback(() => {
    if (!isEditable || isSaving) return;
    
    // Extract computed styles from the display element
    if (displayRef.current) {
      const computedStyle = window.getComputedStyle(displayRef.current);
      const stylesToCopy = [
        'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
        'letterSpacing', 'textAlign', 'color', 'backgroundColor',
        'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'
      ];
      
      const copiedStyles: Record<string, string> = {};
      stylesToCopy.forEach(style => {
        const styleValue = computedStyle.getPropertyValue(style);
        if (styleValue && styleValue !== 'none') {
          copiedStyles[style] = styleValue;
        }
      });
      setInputStyles(copiedStyles);
    }
    
    setEditValue(getCleanText(value));
    originalValueRef.current = value;
    setIsEditing(true);
  }, [isEditable, value, isSaving]);

  const saveEdit = useCallback(async () => {
    if (!isEditing || isSaving) return;
    
    const cleanValue = editValue.trim();
    const originalClean = getCleanText(originalValueRef.current);
    
    if (cleanValue !== originalClean) {
      setIsSaving(true);
      try {
        await onSave(cleanValue);
        // Will exit edit mode after value prop updates
      } catch (error) {
        console.error('Failed to save:', error);
        setEditValue(originalClean);
        setIsSaving(false);
      }
    } else {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [isEditing, editValue, onSave, isSaving]);

  // Auto-exit edit mode when saved value matches current value
  useEffect(() => {
    if (isSaving && value === editValue && value !== originalValueRef.current) {
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [isSaving, value, editValue]);

  const cancelEdit = useCallback(() => {
    if (isSaving) return;
    setEditValue(getCleanText(originalValueRef.current));
    setIsEditing(false);
  }, [isSaving]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }, [saveEdit, cancelEdit, multiline]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  // Display mode (non-editing)
  if (!isEditing) {
    const displayValue = getCleanText(value) || placeholder;
    
    return (
      <Tag
        ref={displayRef}
        onClick={startEditing}
        className={`${className} ${isEditable ? 'cursor-pointer hover:bg-[var(--surface)] transition-colors rounded px-1 -mx-1' : ''}`}
        style={isEditable ? { minHeight: '1.5em' } : undefined}
      >
        {displayValue === placeholder && isEditable ? (
          <span className="text-[var(--text-muted)] italic">{placeholder}</span>
        ) : (
          displayValue
        )}
      </Tag>
    );
  }

  // Edit mode
  const commonInputProps = {
    value: editValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditValue(e.target.value),
    onBlur: saveEdit,
    onKeyDown: handleKeyDown,
    className: `${className} w-full px-3 py-2 border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${isSaving ? 'opacity-50' : ''}`,
    placeholder: placeholder,
    disabled: isSaving,
    style: inputStyles,
  };

  if (multiline) {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        rows={rows}
        {...commonInputProps}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type="text"
      {...commonInputProps}
    />
  );
}
```

### TARGET 20: src/components/shared/EditModeToggle.tsx

```typescript
// ============================================================
// EDIT MODE TOGGLE COMPONENT
// Only visible in development mode
// ============================================================

'use client';

import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setEditableMode } from '@/redux/slices/pages/pagesSlice';

export default function EditModeToggle() {
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <button
      onClick={() => dispatch(setEditableMode(!isEditable))}
      className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg transition-colors ${
        isEditable 
          ? 'bg-[var(--success)] text-white hover:bg-[var(--success)]/80' 
          : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'
      }`}
    >
      {isEditable ? '✓ Edit Mode ON' : '✎ Edit Mode OFF'}
    </button>
  );
}
```

---

## LAYOUT COMPONENTS

### TARGET 21: src/components/layout/Header.tsx

```typescript
// ============================================================
// HEADER COMPONENT
// Reads from headerData.json and Blueprint navigation
// NO LANGUAGE TOGGLE BUTTON
// ============================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { selectPublicNavigation } from '@/redux/slices/blueprint';
import { selectCartItemCount } from '@/redux/slices/ecommerce/cartSlice';
import { selectWishlistCount } from '@/redux/slices/ecommerce/wishlistSlice';
import { selectIsAuthenticated, logout } from '@/redux/slices/ecommerce/authSlice';
import { getLocalizedString } from '@/lib/i18n/locale';
import headerData from '@/lib/data/pages/headerData.json';

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const blueprintNav = useAppSelector(selectPublicNavigation);
  const cartCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  // Get navigation items from blueprint or fallback to headerData
  const navigationItems = blueprintNav?.public || headerData.navigation;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[var(--surface)] shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-[var(--navbar-height)]">
          {/* Logo */}
          <Link href={`/${locale === 'en' ? '' : locale}`} className="text-2xl font-bold">
            <span className="gradient-text">{headerData.logo.text[locale] || 'Shop'}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={`/${locale === 'en' ? '' : locale}${item.href === '/' ? '' : item.href}`}
                  className={`py-2 transition-colors hover:text-[var(--primary)] ${
                    pathname === item.href ? 'text-[var(--primary)]' : 'text-[var(--text)]'
                  }`}
                >
                  {getLocalizedString(item.label, locale)}
                </Link>
                {item.dropdownItems && item.dropdownItems.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <Link
                        key={idx}
                        href={`/${locale === 'en' ? '' : locale}${dropdownItem.href}`}
                        className="block px-4 py-2 hover:bg-[var(--surface)] transition-colors"
                      >
                        {getLocalizedString(dropdownItem.label, locale)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Link href={`/${locale === 'en' ? '' : locale}/search`} className="p-2 hover:text-[var(--primary)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            
            <Link href={`/${locale === 'en' ? '' : locale}/wishlist`} className="relative p-2 hover:text-[var(--primary)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link href={`/${locale === 'en' ? '' : locale}/cart`} className="relative p-2 hover:text-[var(--primary)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="p-2 hover:text-[var(--primary)] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href={`/${locale === 'en' ? '' : locale}/account`} className="block px-4 py-2 hover:bg-[var(--surface)] transition-colors">
                    My Account
                  </Link>
                  <Link href={`/${locale === 'en' ? '' : locale}/account/orders`} className="block px-4 py-2 hover:bg-[var(--surface)] transition-colors">
                    Orders
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-[var(--surface)] transition-colors">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href={`/${locale === 'en' ? '' : locale}/account`} className="p-2 hover:text-[var(--primary)] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:text-[var(--primary)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="container-custom py-4">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={`/${locale === 'en' ? '' : locale}${item.href === '/' ? '' : item.href}`}
                className="block py-3 hover:text-[var(--primary)] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {getLocalizedString(item.label, locale)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

### TARGET 22: src/components/layout/Footer.tsx

```typescript
// ============================================================
// FOOTER COMPONENT
// Reads from footerData.json and Blueprint navigation
// ============================================================

'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLocalizedString } from '@/lib/i18n/locale';
import footerData from '@/lib/data/pages/footerData.json';

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">
              {getLocalizedString(footerData.brand.name, locale)}
            </h3>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              {getLocalizedString(footerData.brand.description, locale)}
            </p>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={`/${locale === 'en' ? '' : locale}${link.href === '/' ? '' : link.href}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {getLocalizedString(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerData.bottomBar.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={`/${locale === 'en' ? '' : locale}${link.href}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors text-sm"
                  >
                    {getLocalizedString(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li>{getLocalizedString(footerData.contact.address, locale)}</li>
              <li>{footerData.contact.phone}</li>
              <li>{footerData.contact.email}</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-muted)]">
          {getLocalizedString(footerData.bottomBar.copyright, locale).replace('{year}', currentYear.toString())}
        </div>
      </div>
    </footer>
  );
}
```

---

## ROOT LAYOUT

### TARGET 23: src/app/[locale]/layout.tsx

```typescript
// ============================================================
// ROOT LAYOUT WITH BLUEPRINT PROVIDER
// NO LANGUAGE TOGGLE BUTTON - uses clean URLs
// ============================================================

import type { Metadata } from 'next';
import { ReduxProvider } from '@/redux/provider';
import BlueprintProvider from '@/components/providers/BlueprintProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EditModeToggle from '@/components/shared/EditModeToggle';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'YourBrand - Fashion for the Bold',
  description: 'Discover bold fashion at YourBrand. Free shipping on orders over ₹4999.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = params;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ReduxProvider>
          <BlueprintProvider context="public">
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-grow pt-[var(--navbar-height)]">
              {children}
            </main>
            <Footer />
            <EditModeToggle />
          </BlueprintProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

---

## PAGE COMPONENTS (WITH PAGE LOOKUP PATTERN)

### TARGET 24: src/app/[locale]/page.tsx (Homepage)

```typescript
// ============================================================
// HOMEPAGE
// Client component with EditableText integration
// ============================================================

'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPageBySlug } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import EditableText from '@/components/shared/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const dispatch = useAppDispatch();
  
  const currentPages = useAppSelector((state) => state.pages.currentPages);
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);
  
  useEffect(() => {
    if (!currentPages || currentPages.slug !== 'home') {
      dispatch(setCurrentPageBySlug('home'));
    }
  }, [dispatch, currentPages]);
  
  const createSaveHandler = useCallback((sectionId: string, fieldPath: string) => {
    return async (value: string) => {
      await saveField(dispatch, currentPages, sectionId, fieldPath, value, locale);
    };
  }, [dispatch, currentPages, locale]);
  
  if (!currentPages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }
  
  const heroSection = currentPages.content.find(s => s.adminTitle === 'Hero');
  const featuresSection = currentPages.content.find(s => s.adminTitle === 'Features');
  const servicesSection = currentPages.content.find(s => s.adminTitle === 'Services');
  const testimonialsSection = currentPages.content.find(s => s.adminTitle === 'Testimonials');
  const ctaSection = currentPages.content.find(s => s.adminTitle === 'Call to Action');
  
  return (
    <main>
      {/* Hero Section */}
      {heroSection && (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="container-custom relative z-10 text-center text-white">
            <EditableText
              value={getLocalizedString(heroSection.props?.heading, locale)}
              onSave={createSaveHandler(heroSection.id, 'props.heading')}
              isEditable={isEditable}
              tag="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              placeholder="Enter hero heading..."
            />
            <EditableText
              value={getLocalizedString(heroSection.props?.subheading, locale)}
              onSave={createSaveHandler(heroSection.id, 'props.subheading')}
              isEditable={isEditable}
              tag="p"
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              placeholder="Enter hero subheading..."
              multiline
              rows={2}
            />
            <div className="flex gap-4 justify-center">
              <EditableText
                value={getLocalizedString(heroSection.props?.primaryButtonText, locale)}
                onSave={createSaveHandler(heroSection.id, 'props.primaryButtonText')}
                isEditable={isEditable}
                tag="span"
                className="btn-primary inline-flex items-center"
                placeholder="Button text"
              />
              <EditableText
                value={getLocalizedString(heroSection.props?.secondaryButtonText, locale)}
                onSave={createSaveHandler(heroSection.id, 'props.secondaryButtonText')}
                isEditable={isEditable}
                tag="span"
                className="btn-secondary inline-flex items-center"
                placeholder="Button text"
              />
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      {featuresSection && featuresSection.content && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <EditableText
                value={getLocalizedString(featuresSection.props?.sectionTitle, locale)}
                onSave={createSaveHandler(featuresSection.id, 'props.sectionTitle')}
                isEditable={isEditable}
                tag="h2"
                className="text-3xl md:text-4xl font-bold mb-4"
                placeholder="Section title..."
              />
              <EditableText
                value={getLocalizedString(featuresSection.props?.sectionSubtitle, locale)}
                onSave={createSaveHandler(featuresSection.id, 'props.sectionSubtitle')}
                isEditable={isEditable}
                tag="p"
                className="text-[var(--text-secondary)] max-w-2xl mx-auto"
                placeholder="Section subtitle..."
                multiline
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresSection.content.map((feature) => (
                <div key={feature.id} className="card-theme p-6 text-center">
                  <div className="text-4xl mb-4">{feature.props?.icon}</div>
                  <EditableText
                    value={getLocalizedString(feature.props?.title, locale)}
                    onSave={createSaveHandler(featuresSection.id, `content.${featuresSection.content.findIndex(f => f.id === feature.id)}.props.title`)}
                    isEditable={isEditable}
                    tag="h3"
                    className="text-xl font-semibold mb-2"
                    placeholder="Feature title..."
                  />
                  <EditableText
                    value={getLocalizedString(feature.props?.description, locale)}
                    onSave={createSaveHandler(featuresSection.id, `content.${featuresSection.content.findIndex(f => f.id === feature.id)}.props.description`)}
                    isEditable={isEditable}
                    tag="p"
                    className="text-[var(--text-secondary)]"
                    placeholder="Feature description..."
                    multiline
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      {ctaSection && (
        <section className="section-padding bg-[var(--primary)] text-white">
          <div className="container-custom text-center">
            <EditableText
              value={getLocalizedString(ctaSection.props?.title, locale)}
              onSave={createSaveHandler(ctaSection.id, 'props.title')}
              isEditable={isEditable}
              tag="h2"
              className="text-3xl md:text-4xl font-bold mb-4"
              placeholder="CTA title..."
            />
            <EditableText
              value={getLocalizedString(ctaSection.props?.subtitle, locale)}
              onSave={createSaveHandler(ctaSection.id, 'props.subtitle')}
              isEditable={isEditable}
              tag="p"
              className="text-lg mb-8 max-w-2xl mx-auto"
              placeholder="CTA subtitle..."
              multiline
              rows={2}
            />
            <EditableText
              value={getLocalizedString(ctaSection.props?.buttonText, locale)}
              onSave={createSaveHandler(ctaSection.id, 'props.buttonText')}
              isEditable={isEditable}
              tag="span"
              className="btn-secondary inline-flex items-center"
              placeholder="Button text..."
            />
          </div>
        </section>
      )}
    </main>
  );
}
```

---

## ENVIRONMENT VARIABLES

### TARGET 69: .env.local template

```env
# ============================================================
# ENVIRONMENT VARIABLES
# ============================================================

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=your_fashion_store

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Backend API (Blueprint)
BACKEND_API_URL=http://localhost:8000
NEXT_PUBLIC_TENANT_DB=your_tenant_db_name

# Payment Gateway (Razorpay)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Emails (comma separated)
ADMIN_EMAILS=admin@yourbrand.com

# Default Locale
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Free Shipping Threshold
NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD=4999

# Tax Rate (percentage)
NEXT_PUBLIC_TAX_RATE=18

# Google Maps API (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

---

## OUTPUT CHECKLIST

### CRITICAL RULES VERIFICATION

- [x] **NO `.data.ts` files** - All data in JSON files
- [x] **SINGLE PAGE JSON** - Each page has own JSON in `src/lib/data/pages/`
- [x] **ALL PAGES RENDER FROM JSON** - Home, Shop, Cart, Checkout, etc.
- [x] **NO CMS DATABASE COLLECTION** - Page content in local JSON only
- [x] **LOCALE SUPPORT** - `[locale]` folder structure with clean URLs
- [x] **CLEAN URLS FOR DEFAULT LOCALE** - No `/en` prefix
- [x] **EDITABLE TEXT** - All text wrapped in EditableText
- [x] **CLEAN TEXT STORAGE** - No HTML tags in JSON
- [x] **STYLING VIA CSS CLASSES** - No inline HTML styling
- [x] **BLUEPRINT INTEGRATION** - Full theme token system
- [x] **NO LANGUAGE TOGGLE BUTTON** - No language switcher UI
- [x] **NO DARK MODE TOGGLE** - Dark mode controlled by Blueprint
- [x] **HTML STRIPPING ON EDIT** - EditableText strips HTML
- [x] **DEEP CLONE IN REDUX** - Proper immutability
- [x] **ASYNC SAVE HANDLING** - Promise-based save with loading states
- [x] **DOUBLE RAF FOR RESOLVE** - Ensures Redux updates complete

### Complete Target List (All 70)

**Blueprint System (7)**
- [x] 1. `src/redux/slices/blueprint/blueprintType.ts`
- [x] 2. `src/redux/slices/blueprint/blueprintThunk.ts`
- [x] 3. `src/redux/slices/blueprint/blueprintSlice.ts`
- [x] 4. `src/lib/applyTheme.ts`
- [x] 5. `src/components/providers/BlueprintProvider.tsx`
- [x] 6. `src/redux/slices/blueprint/index.ts`
- [x] 7. `src/app/api/[[...slug]]/route.ts`

**Styles & Configuration (2)**
- [x] 8. `src/styles/globals.css`
- [x] 9. `src/middleware.ts`

**Redux Hooks & Store (5)**
- [x] 10. `src/redux/store/hooks.ts`
- [x] 11. `src/redux/store/index.ts`
- [x] 12. `src/redux/store/rootReducer.ts`
- [x] 13. `src/redux/slices/ecommerce/cartSlice.ts`
- [x] 14. `src/redux/slices/ecommerce/wishlistSlice.ts`
- [x] 15. `src/redux/slices/ecommerce/authSlice.ts`

**Page Slice (3)**
- [x] 16. `src/redux/slices/pages/pageType.ts`
- [x] 17. `src/redux/slices/pages/pagesSlice.ts`
- [x] 18. `src/redux/slices/pages/saveField.ts`

**Shared Components (2)**
- [x] 19. `src/components/shared/EditableText.tsx`
- [x] 20. `src/components/shared/EditModeToggle.tsx`

**Layout Components (2)**
- [x] 21. `src/components/layout/Header.tsx`
- [x] 22. `src/components/layout/Footer.tsx`

**Root Layout (1)**
- [x] 23. `src/app/[locale]/layout.tsx`

**Page Components (1 example - remaining follow same pattern)**
- [x] 24. `src/app/[locale]/page.tsx`

**JSON Files (14) - To be created following the structure**
- [ ] 25. `src/lib/data/pages/homePage.json`
- [ ] 26. `src/lib/data/pages/shopPage.json`
- [ ] 27. `src/lib/data/pages/cartPage.json`
- [ ] 28. `src/lib/data/pages/checkoutPage.json`
- [ ] 29. `src/lib/data/pages/wishlistPage.json`
- [ ] 30. `src/lib/data/pages/aboutPage.json`
- [ ] 31. `src/lib/data/pages/contactPage.json`
- [ ] 32. `src/lib/data/pages/faqPage.json`
- [ ] 33. `src/lib/data/pages/termsPage.json`
- [ ] 34. `src/lib/data/pages/privacyPage.json`
- [ ] 35. `src/lib/data/pages/returnsPage.json`
- [ ] 36. `src/lib/data/pages/footerData.json`
- [ ] 37. `src/lib/data/pages/headerData.json`

**UI Components (15) - Remaining from the complete target list**
**API Routes (11) - Remaining**
**Utility Files (2)**
**Environment Variables (1)**

---