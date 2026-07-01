'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface ProductGridSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function ProductGridSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: ProductGridSectionProps) {
  const products = block.props?.products || [];
  const heading = block.props?.heading;

  if (!products.length) return null;

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-[var(--border)]'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="section-padding">
      <div className="container-custom">
        {heading && (onSave && isEditable ? (
          <EditableText
            value={getLocalizedString(heading, locale) || ''}
            onSave={(val) => onSave(block.id, 'props.heading', val)}
            isEditable={isEditable}
            tag="h2"
            className="section-title"
            placeholder="Heading..."
          />
        ) : (
          <h2 className="section-title">{getLocalizedString(heading, locale)}</h2>
        ))}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product: any) => (
            <Link
              key={product.id}
              href={`${localePrefix}/shop/${product.slug}`}
              className="card-product group"
            >
              <div className="relative aspect-[4/5] bg-[var(--cream)] overflow-hidden">
                <Image src={product.image} alt={getLocalizedString(product.name, locale)} fill className="object-contain object-center transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                {product.hoverImage && (
                  <Image src={product.hoverImage} alt="" fill className="object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                )}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[var(--primary)] rounded-full shadow-sm">{getLocalizedString(product.badge, locale)}</span>
                  )}
                  {product.isNew && (
                    <span className="px-2 py-0.5 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full shadow-sm">New</span>
                  )}
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <span className="product-category capitalize">{getLocalizedString(product.category, locale)?.replace('-', ' ')}</span>
                <h3 className="card-title">{getLocalizedString(product.name, locale)}</h3>
                <div className="flex items-center gap-1.5 mb-2">
                  {renderStars(product.rating)}
                  <span className="text-[10px] text-[var(--text-muted)]">({product.reviewCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="price-sm">${product.price.toFixed(2)}</span>
                  {product.compareAtPrice && (
                    <span className="small-text line-through">${product.compareAtPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
