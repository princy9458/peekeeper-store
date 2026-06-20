'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { removeItem, updateQuantity } from '@/redux/slices/ecommerce/cartSlice';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface CartSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function CartSection({ block, locale = 'en', localePrefix = '', isEditable, onSave }: CartSectionProps) {
  const props = block.props || {};
  const dispatch = useAppDispatch();
  const items = useAppSelector(s => s.cart.items);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 || items.length === 0 ? 0 : 9.99;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, 50 - subtotal);

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="text-center py-20">
            <svg className="w-20 h-20 mx-auto text-[var(--border)] mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
            {onSave ? (
              <EditableText value={getLocalizedString(props.emptyCtaLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.emptyCtaLabel', val)} isEditable={isEditable} tag="span" className="btn-primary inline-flex items-center gap-2" placeholder="CTA..." />
            ) : (
              <Link href={`${localePrefix}/shop`} className="btn-primary inline-flex items-center gap-2">
                {getLocalizedString(props.emptyCtaLabel, locale)}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
          {onSave ? (
            <EditableText value="Home" onSave={(val) => onSave(block.id, 'props.breadcrumbHomeLabel', val)} isEditable={isEditable} tag="span" className="hover:text-[var(--primary)]" placeholder="Home..." />
          ) : (
            <Link href={`${localePrefix}/`} className="hover:text-[var(--primary)]">Home</Link>
          )}
          <span>/</span>
          {onSave ? (
            <EditableText value={getLocalizedString(props.breadcrumbLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.breadcrumbLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text)]" placeholder="Breadcrumb..." />
          ) : (
            <span className="text-[var(--text)]">{getLocalizedString(props.breadcrumbLabel, locale)}</span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border border-[var(--border)] rounded-[var(--radius-lg)] mb-4">
                <div className="relative w-24 h-24 rounded-[var(--radius-md)] overflow-hidden bg-[var(--cream)] flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain object-center" sizes="96px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="card-title">{item.name}</h3>
                  {item.color && (
                    <p className="small-text mt-1">Color: {item.color}</p>
                  )}
                  {item.size && (
                    <p className="small-text">Size: {item.size}</p>
                  )}
                  <p className="price-sm mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-[var(--border)] rounded-full">
                      <button
                        className="w-8 h-8 flex items-center justify-center text-sm font-medium hover:bg-[var(--accent-soft)] rounded-l-full"
                        onClick={() => {
                          if (item.quantity > 1) dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                        }}
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center text-sm font-medium hover:bg-[var(--accent-soft)] rounded-r-full"
                        onClick={() => {
                          if (item.quantity < item.maxQuantity) dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      {onSave ? (
                        <EditableText value={getLocalizedString(props.removeLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.removeLabel', val)} isEditable={isEditable} tag="span" placeholder="Remove..." />
                      ) : (
                        getLocalizedString(props.removeLabel, locale)
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-[var(--border)] rounded-[var(--radius-lg)] p-6 self-start h-auto">
            {onSave ? (
              <EditableText value={getLocalizedString(props.orderSummaryTitle, locale) || ''} onSave={(val) => onSave(block.id, 'props.orderSummaryTitle', val)} isEditable={isEditable} tag="h3" className="font-bold text-lg mb-4" placeholder="Order summary title..." />
            ) : (
              <h3 className="font-bold text-lg mb-4">{getLocalizedString(props.orderSummaryTitle, locale)}</h3>
            )}

            {freeShippingRemaining > 0 && (
              <div className="bg-[var(--accent-soft)] rounded-[var(--radius-sm)] p-3 mb-4 text-xs text-[var(--text-secondary)]">
                {onSave ? (
                  <EditableText value={getLocalizedString(props.shippingThresholdLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingThresholdLabel', val)} isEditable={isEditable} tag="p" placeholder="Shipping threshold..." />
                ) : (
                  getLocalizedString(props.shippingThresholdLabel, locale)?.replace('{amount}', `$${freeShippingRemaining.toFixed(2)}`)
                )}
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                {onSave ? (
                  <EditableText value={getLocalizedString(props.subtotalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.subtotalLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text-secondary)]" placeholder="Subtotal..." />
                ) : (
                  <span className="text-[var(--text-secondary)]">{getLocalizedString(props.subtotalLabel, locale)}</span>
                )}
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                {onSave ? (
                  <EditableText value={getLocalizedString(props.shippingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingLabel', val)} isEditable={isEditable} tag="span" className="text-[var(--text-secondary)]" placeholder="Shipping..." />
                ) : (
                  <span className="text-[var(--text-secondary)]">{getLocalizedString(props.shippingLabel, locale)}</span>
                )}
                <span>{shipping === 0 ? (onSave ? <EditableText value={getLocalizedString(props.shippingFreeLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.shippingFreeLabel', val)} isEditable={isEditable} tag="span" placeholder="Free..." /> : getLocalizedString(props.shippingFreeLabel, locale)) : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold text-base">
                {onSave ? (
                  <EditableText value={getLocalizedString(props.totalLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.totalLabel', val)} isEditable={isEditable} tag="span" placeholder="Total..." />
                ) : (
                  <span>{getLocalizedString(props.totalLabel, locale)}</span>
                )}
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Link href={`${localePrefix}/checkout`} className="btn-primary w-full text-center mt-6">
              {onSave ? (
                <EditableText value={getLocalizedString(props.checkoutButtonLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.checkoutButtonLabel', val)} isEditable={isEditable} tag="span" className="btn-primary w-full text-center mt-6" placeholder="Checkout..." />
              ) : (
                getLocalizedString(props.checkoutButtonLabel, locale)
              )}
            </Link>

            <Link href={`${localePrefix}/shop`} className="block text-center text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] mt-3">
              {onSave ? (
                <EditableText value={getLocalizedString(props.continueShoppingLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.continueShoppingLabel', val)} isEditable={isEditable} tag="span" placeholder="Continue shopping..." />
              ) : (
                getLocalizedString(props.continueShoppingLabel, locale)
              )}
            </Link>

            <div className="mt-6 pt-4 border-t border-[var(--border)] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
{onSave ? (
                  <EditableText value={getLocalizedString(props.trustBadgeSecureLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.trustBadgeSecureLabel', val)} isEditable={isEditable} tag="span" placeholder="Secure label..." />
                ) : (
                  getLocalizedString(props.trustBadgeSecureLabel, locale)
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
{onSave ? (
                  <EditableText value={getLocalizedString(props.trustBadgeReturnsLabel, locale) || ''} onSave={(val) => onSave(block.id, 'props.trustBadgeReturnsLabel', val)} isEditable={isEditable} tag="span" placeholder="Returns label..." />
                ) : (
                  getLocalizedString(props.trustBadgeReturnsLabel, locale)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
