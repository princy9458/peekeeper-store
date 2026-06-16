'use client';

import { useParams } from 'next/navigation';
import CmsPage from '@/components/cms/CmsPage';

export default function CheckoutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  return <CmsPage slug="checkout" locale={locale} localePrefix={localePrefix} />;
}
