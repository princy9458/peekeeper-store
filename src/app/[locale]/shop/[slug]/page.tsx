'use client';

import { useParams } from 'next/navigation';
import CmsPage from '@/components/cms/CmsPage';

export default function ProductDetailPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return <CmsPage slug="product" locale={locale} localePrefix={localePrefix} />;
}
