import type { Page } from '@/redux/slices/pages/pageType';

const pageModules: Record<string, () => Page> = {
  home: () => require('@/lib/data/pages/homePage.json') as Page,
  shop: () => require('@/lib/data/pages/shopPage.json') as Page,
  about: () => require('@/lib/data/pages/aboutPage.json') as Page,
  contact: () => require('@/lib/data/pages/contactPage.json') as Page,
  faq: () => require('@/lib/data/pages/faqPage.json') as Page,
  terms: () => require('@/lib/data/pages/termsPage.json') as Page,
  privacy: () => require('@/lib/data/pages/privacyPage.json') as Page,
  returns: () => require('@/lib/data/pages/returnsPage.json') as Page,
  cart: () => require('@/lib/data/pages/cartPage.json') as Page,
  checkout: () => require('@/lib/data/pages/checkoutPage.json') as Page,
  wishlist: () => require('@/lib/data/pages/wishlistPage.json') as Page,
  search: () => require('@/lib/data/pages/searchPage.json') as Page,
  account: () => require('@/lib/data/pages/accountPage.json') as Page,
  profile: () => require('@/lib/data/pages/profilePage.json') as Page,
  orders: () => require('@/lib/data/pages/ordersPage.json') as Page,
  product: () => require('@/lib/data/pages/productPage.json') as Page,
};

export const PAGE_SLUGS = Object.keys(pageModules);

export function loadPageData(slug: string): Page | null {
  const loader = pageModules[slug];
  if (!loader) return null;
  return JSON.parse(JSON.stringify(loader()));
}

export function loadAllPages(): Record<string, Page> {
  const pages: Record<string, Page> = {};
  for (const slug of PAGE_SLUGS) {
    pages[slug] = loadPageData(slug)!;
  }
  return pages;
}
