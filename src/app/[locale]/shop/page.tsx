'use client';

import { useParams } from 'next/navigation';
import CmsPage from '@/components/cms/CmsPage';

export default function ShopPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return <CmsPage slug="shop" locale={locale} localePrefix={localePrefix} />;
}
