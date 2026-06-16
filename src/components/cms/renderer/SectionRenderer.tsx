'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import HeroSection from '@/components/cms/sections/HeroSection';
import TextSection from '@/components/cms/sections/TextSection';
import FAQSection from '@/components/cms/sections/FAQSection';
import FeaturedCollectionsSection from '@/components/cms/sections/FeaturedCollectionsSection';
import MetricsSection from '@/components/cms/sections/MetricsSection';
import CTASection from '@/components/cms/sections/CTASection';
import ProductGridSection from '@/components/cms/sections/ProductGridSection';
import TrustBarSection from '@/components/cms/sections/TrustBarSection';
import FeaturedProductsSection from '@/components/cms/sections/FeaturedProductsSection';
import FeaturesBentoSection from '@/components/cms/sections/FeaturesBentoSection';
import ARToolSection from '@/components/cms/sections/ARToolSection';
import SizeTableSection from '@/components/cms/sections/SizeTableSection';
import TestimonialsSection from '@/components/cms/sections/TestimonialsSection';
import PressSection from '@/components/cms/sections/PressSection';
import NewsletterSection from '@/components/cms/sections/NewsletterSection';
import FiltersSection from '@/components/cms/sections/FiltersSection';
import ContactFormSection from '@/components/cms/sections/ContactFormSection';
import CartSection from '@/components/cms/sections/CartSection';
import CheckoutSection from '@/components/cms/sections/CheckoutSection';
import WishlistSection from '@/components/cms/sections/WishlistSection';
import SearchSection from '@/components/cms/sections/SearchSection';
import AccountSection from '@/components/cms/sections/AccountSection';
import ProfileSection from '@/components/cms/sections/ProfileSection';
import OrdersSection from '@/components/cms/sections/OrdersSection';
import ProductDetailSection from '@/components/cms/sections/ProductDetailSection';

const BLOCK_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  text: TextSection,
  'faq-accordion': FAQSection,
  'featured-collections': FeaturedCollectionsSection,
  testimonials: TestimonialsSection,
  metrics: MetricsSection,
  cta: CTASection,
  'product-grid': ProductGridSection,
  productGrid: ProductGridSection,
  trustBadges: TrustBarSection,
  featuredProducts: FeaturedProductsSection,
  features: FeaturesBentoSection,
  arTool: ARToolSection,
  sizeTable: SizeTableSection,
  press: PressSection,
  newsletter: NewsletterSection,
  filters: FiltersSection,
  'contact-form': ContactFormSection,
  'cart-section': CartSection,
  'checkout-section': CheckoutSection,
  'wishlist-section': WishlistSection,
  'search-section': SearchSection,
  'account-section': AccountSection,
  'profile-section': ProfileSection,
  'orders-section': OrdersSection,
  'product-detail-section': ProductDetailSection,
  'product-section': ProductDetailSection,
};

interface SectionRendererProps {
  content: PageBlock[];
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function SectionRenderer({ content, ...rest }: SectionRendererProps) {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return null;
  }

  console.log('[CMS] SectionRenderer rendering', content.length, 'blocks');

  return (
    <>
      {content.map((block) => {
        console.log('[CMS] SectionRenderer rendering block - type:', block.type, 'id:', block.id);
        const Component = BLOCK_COMPONENTS[block.type];
        if (!Component) {
          console.warn(`SectionRenderer: unknown block type "${block.type}" for block "${block.adminTitle || block.id}"`);
          return (
            <div key={block.id} className="section-padding">
              <div className="container-custom">
                <p className="text-[var(--text-muted)] text-sm">
                  Unknown section type: <code>{block.type}</code>
                </p>
              </div>
            </div>
          );
        }
        console.log('[CMS] Component received props - type:', block.type, 'id:', block.id, 'editable:', rest.isEditable);
        return <Component key={block.id} block={block} {...rest} />;
      })}
    </>
  );
}
