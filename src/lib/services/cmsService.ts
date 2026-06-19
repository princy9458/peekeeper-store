import { fetchWithTenant } from '@/lib/apiProxy';
import type { Page } from '@/redux/slices/pages/pageType';
import { PAGE_SLUGS } from '@/components/cms/loader';

function normalizePageResponse(response: unknown): Page {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid CMS response: not an object');
  }

  const obj = response as Record<string, unknown>;

  if (
    obj.data &&
    typeof obj.data === 'object' &&
    obj.data !== null &&
    'slug' in (obj.data as Record<string, unknown>)
  ) {
    return obj.data as unknown as Page;
  }

  if (typeof obj.slug === 'string') {
    return response as Page;
  }

  throw new Error('Invalid CMS response: missing slug field');
}

export async function fetchPage(slug: string): Promise<Page> {
  const response = await fetchWithTenant(`/api/cms/pages/${slug}`);
  return normalizePageResponse(response);
}

function normalizeAllPagesResponse(response: unknown): Record<string, Page> {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid all-pages response');
  }

  const obj = response as Record<string, unknown>;
  const data = obj.data && typeof obj.data === 'object' ? obj.data : obj;

  if (Array.isArray(data)) {
    const pages: Record<string, Page> = {};
    for (const item of data) {
      if (item && typeof item === 'object' && typeof (item as Page).slug === 'string') {
        pages[(item as Page).slug] = item as Page;
      }
    }
    if (Object.keys(pages).length > 0) return pages;
  }

  if (!Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    const firstVal = Object.values(record)[0];
    if (firstVal && typeof firstVal === 'object' && typeof (firstVal as Page).slug === 'string') {
      return record as unknown as Record<string, Page>;
    }
  }

  throw new Error('Invalid all-pages response format');
}

export async function fetchAllPages(): Promise<Record<string, Page>> {
  try {
    const response = await fetchWithTenant('/api/cms/pages');
    return normalizeAllPagesResponse(response);
  } catch {
    const pages: Record<string, Page> = {};
    const results = await Promise.allSettled(PAGE_SLUGS.map(slug => fetchPage(slug)));
    for (let i = 0; i < PAGE_SLUGS.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled') {
        pages[PAGE_SLUGS[i]] = result.value;
      }
    }
    if (Object.keys(pages).length === 0) {
      throw new Error('Failed to fetch any CMS pages');
    }
    return pages;
  }
}
