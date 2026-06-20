'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { removeItem } from '@/redux/slices/ecommerce/wishlistSlice';
import { addItem } from '@/redux/slices/ecommerce/cartSlice';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface WishlistSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function WishlistSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: WishlistSectionProps) {
  const props = block.props || {};
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.wishlist.items);

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-[var(--border)] mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {onSave ? (
              <EditableText value={getLocalizedString(props.emptyTitle, locale) || ''} onSave={(val) => onSave(block.id, 'props.emptyTitle', val)} isEditable={isEditable} tag="h2" className="section-title" placeholder="Empty title..." />
            ) : (
              <h2 className="section-title">{getLocalizedString(props.emptyTitle, locale)}</h2>
            )}
            {onSave ? (
              <EditableText value={getLocalizedString(props.emptyDescription, locale) || ''} onSave={(val) => onSave(block.id, 'props.emptyDescription', val)} isEditable={isEditable} tag="p" className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto" placeholder="Empty description..." />
            ) : (
              <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">{getLocalizedString(props.emptyDescription, locale)}</p>
            )}
            <Link href={`${localePrefix}/shop`} className="btn-primary inline-flex items-center gap-2">
              {onSave ? (
                <EditableText value={getLocalizedString(props.emptyCtaLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.emptyCtaLabel', val)} isEditable={isEditable} tag="span" className="" />
              ) : (
                <>{getLocalizedString(props.emptyCtaLabel, locale)}</>
              )}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
          <Link href={`${localePrefix}/`} className="hover:text-[var(--primary)]">
            {onSave ? (
              <EditableText value={getLocalizedString(props.breadcrumbHomeLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.breadcrumbHomeLabel', val)} isEditable={isEditable} tag="span" className="" />
            ) : (
              <>Home</>
            )}
          </Link>
          <span>/</span>
          {onSave ? (
            <EditableText value={getLocalizedString(props.breadcrumbLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.breadcrumbLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text)]" />
          ) : (
            <span className="text-[var(--text)]">{getLocalizedString(props.breadcrumbLabel, locale)}</span>
          )}
        </div>

        {onSave ? (
          <EditableText value={getLocalizedString(props.heading, locale) || ''} onSave={(val) => onSave(block.id, 'props.heading', val)} isEditable={isEditable} tag="h1" className="section-title" placeholder="Heading..." />
        ) : (
          <h1 className="section-title">{getLocalizedString(props.heading, locale)}</h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden group">
              <Link href={`${localePrefix}/shop/${item.slug}`} className="block relative aspect-[4/5] bg-[var(--cream)] overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-contain object-center transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
              </Link>
              <div className="p-4">
                <Link href={`${localePrefix}/shop/${item.slug}`}>
                  <h3 className="card-title hover:text-[var(--primary)] transition-colors">{item.name}</h3>
                </Link>
                <p className="price-sm mt-1">{getLocalizedString(props.priceLabel, locale)}: ${item.price.toFixed(2)}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    className="btn-primary flex-1 text-xs py-2"
                    onClick={() => {
                      dispatch(addItem({ productId: item.productId, name: item.name, price: item.price, quantity: 1, image: item.image, slug: item.slug }));
                    }}
                  >
                    {onSave ? (
                      <EditableText value={getLocalizedString(props.addToCartButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.addToCartButtonLabel', val)} isEditable={isEditable} tag="span" className="" />
                    ) : (
                      <>{getLocalizedString(props.addToCartButtonLabel, locale)}</>
                    )}
                  </button>
                  <button
                    className="btn-outline text-xs py-2 px-3"
                    onClick={() => dispatch(removeItem(item.productId))}
                  >
                    {onSave ? (
                      <EditableText value={getLocalizedString(props.removeButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.removeButtonLabel', val)} isEditable={isEditable} tag="span" className="" />
                    ) : (
                      <>{getLocalizedString(props.removeButtonLabel, locale)}</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
