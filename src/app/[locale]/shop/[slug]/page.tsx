import PeekeeperProductPage from '@/components/peekeeper/PeekeeperProductPage';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale?: string; slug: string }>;
}) {
  const { locale = 'en', slug } = await params;
  return <PeekeeperProductPage locale={locale} slug={slug} />;
}
