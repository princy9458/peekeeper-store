'use client';

import { useParams } from 'next/navigation';
import CmsPage from '@/components/cms/CmsPage';

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return <CmsPage slug="contact" locale={locale} />;
}
