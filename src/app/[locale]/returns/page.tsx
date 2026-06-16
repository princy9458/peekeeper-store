'use client';

import { useParams } from 'next/navigation';
import CmsPage from '@/components/cms/CmsPage';

export default function ReturnsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return <CmsPage slug="returns" locale={locale} />;
}
