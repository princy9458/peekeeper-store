'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { addItem } from '@/redux/slices/ecommerce/cartSlice';
import { addItem as addToWishlist, removeItem as removeFromWishlist } from '@/redux/slices/ecommerce/wishlistSlice';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';


interface ProductDetailSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function ProductDetailSection({ block, locale = 'en', localePrefix = '', isEditable, onSave }: ProductDetailSectionProps) {
  const props = block.props || {};
  const dispatch = useAppDispatch();
  const product = block.props?.productData;
  const wishlistItems = useAppSelector(s => s.wishlist.items);
  const isInWishlist = product ? wishlistItems.some(i => i.productId === product.slug) : false;

  const productImages = (product?.images || []) as string[];
  const [selectedImage, setSelectedImage] = useState(productImages[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.slug) return;
    dispatch(addItem({
      productId: product.slug,
      name: product.name || '',
      price: product.price || 0,
      quantity,
      image: selectedImage || '',
      slug: product.slug,
      size: selectedSize?.label,
      color: selectedColor?.label,
    }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!product.slug) return;
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.slug));
    } else {
      dispatch(addToWishlist({
        productId: product.slug,
        name: product.name || '',
        price: product.price || 0,
        image: product.images?.[0] || '',
        slug: product.slug,
      }));
    }
  };

  const tabs = [
    { key: 'description', label: getLocalizedString(props.tabDescriptionLabel, locale) || 'Description', fieldPath: 'props.tabDescriptionLabel' },
    { key: 'features', label: getLocalizedString(props.tabFeaturesLabel, locale) || 'Features', fieldPath: 'props.tabFeaturesLabel' },
    { key: 'reviews', label: getLocalizedString(props.tabReviewsLabel, locale) || `Reviews (${product.reviews?.length || 0})`, fieldPath: 'props.tabReviewsLabel' },
  ];

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
            <EditableText value="Shop" onSave={(val) => onSave(block.id, 'props.breadcrumbShopLabel', val)} isEditable={isEditable} tag="span" className="hover:text-[var(--primary)]" placeholder="Shop..." />
          ) : (
            <Link href={`${localePrefix}/shop`} className="hover:text-[var(--primary)]">Shop</Link>
          )}
          <span>/</span>
          <span className="text-[var(--text)]">{getLocalizedString(product.name, locale)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="relative aspect-[4/5] bg-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden mb-4">
              <Image src={selectedImage || ''} alt={getLocalizedString(product.name, locale) || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              {product.compareAtPrice && (
                <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {onSave ? (
                    <EditableText value={getLocalizedString(props.saleBadgeLabel, locale) || 'Sale'} onSave={(val) => onSave(block.id, 'props.saleBadgeLabel', val)} isEditable={isEditable} tag="span" placeholder="Sale badge..." />
                  ) : (
                    getLocalizedString(props.saleBadgeLabel, locale) || 'Sale'
                  )}
                </span>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {(product.images || []).map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-[var(--radius-md)] overflow-hidden flex-shrink-0 border-2 transition-colors ${selectedImage === img ? 'border-[var(--primary)]' : 'border-transparent'}`}
                >
                  <Image src={img} alt={`${getLocalizedString(product.name, locale)} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">{getLocalizedString(product.category, locale)}</p>
            <h1 className="text-3xl font-bold mb-3">{getLocalizedString(product.name, locale)}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(product.rating || 0) ? 'text-amber-400' : 'text-[var(--border)]'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[var(--text-muted)]">{product.rating} ({product.reviewCount || 0} {onSave ? <EditableText value={getLocalizedString(props.reviewsLabel, locale) || 'reviews'} onSave={(val) => onSave(block.id, 'props.reviewsLabel', val)} isEditable={isEditable} tag="span" placeholder="Reviews label..." /> : (getLocalizedString(props.reviewsLabel, locale) || 'reviews')})</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-[var(--primary)]">${(product.price || 0).toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-lg text-[var(--text-muted)] line-through">${product.compareAtPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{getLocalizedString(product.description, locale)}</p>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">{onSave ? <EditableText value={getLocalizedString(props.colorLabel, locale) || 'Color'} onSave={(val) => onSave(block.id, 'props.colorLabel', val)} isEditable={isEditable} tag="span" placeholder="Color..." /> : (getLocalizedString(props.colorLabel, locale) || 'Color')}: <strong>{selectedColor?.label || ''}</strong></p>
              <div className="flex gap-2">
                {(product.colors || []).map((c: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedColor(c); setSelectedImage((product.images || [])[i] || selectedImage); }}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor?.label === c.label ? 'border-[var(--primary)] scale-110' : 'border-transparent'} ${c.inStock ? 'cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
                    style={{ background: c.hex }}
                    disabled={!c.inStock}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">{onSave ? <EditableText value={getLocalizedString(props.sizeLabel, locale) || 'Size'} onSave={(val) => onSave(block.id, 'props.sizeLabel', val)} isEditable={isEditable} tag="span" placeholder="Size..." /> : (getLocalizedString(props.sizeLabel, locale) || 'Size')}: <strong>{selectedSize?.label || ''}</strong></p>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || []).map((s: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(s)}
                    disabled={!s.inStock}
                    className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${selectedSize?.label === s.label ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'border-[var(--border)] hover:border-[var(--primary)]'} ${s.inStock ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed line-through'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[var(--border)] rounded-full">
                <button
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-[var(--accent-soft)] rounded-l-full cursor-pointer"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center text-lg font-medium hover:bg-[var(--accent-soft)] rounded-r-full cursor-pointer"
                  onClick={() => setQuantity(q => Math.min(99, q + 1))}
                >
                  +
                </button>
              </div>

              {onSave ? (
                <EditableText value={getLocalizedString(props.qtyLabel, locale) || 'Qty'} onSave={(val) => onSave(block.id, 'props.qtyLabel', val)} isEditable={isEditable} tag="span" className="text-xs text-[var(--text-muted)]" placeholder="Qty..." />
              ) : (
                <span className="text-xs text-[var(--text-muted)]">{getLocalizedString(props.qtyLabel, locale) || 'Qty'}</span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 flex items-center justify-center gap-2 ${addedToCart ? 'bg-green-600' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {addedToCart ? (
                  onSave ? (
                    <EditableText value={getLocalizedString(props.addedToCartLabel, locale) || 'Added!'} onSave={(val) => onSave(block.id, 'props.addedToCartLabel', val)} isEditable={isEditable} tag="span" placeholder="Added label..." />
                  ) : (
                    getLocalizedString(props.addedToCartLabel, locale) || 'Added!'
                  )
                ) : (
                  onSave ? (
                    <EditableText value={getLocalizedString(props.addToCartLabel, locale) || 'Add to Cart'} onSave={(val) => onSave(block.id, 'props.addToCartLabel', val)} isEditable={isEditable} tag="span" placeholder="Add to cart..." />
                  ) : (
                    getLocalizedString(props.addToCartLabel, locale) || 'Add to Cart'
                  )
                )}
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`w-12 h-12 flex items-center justify-center rounded-full border transition-colors ${isInWishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-[var(--border)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-200'}`}
              >
                <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                {onSave ? (
                  <EditableText value={getLocalizedString(props.inStockLabel, locale) || 'In Stock'} onSave={(val) => onSave(block.id, 'props.inStockLabel', val)} isEditable={isEditable} tag="span" placeholder="In stock..." />
                ) : (
                  getLocalizedString(props.inStockLabel, locale) || 'In Stock'
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                {onSave ? (
                  <EditableText value={getLocalizedString(props.secureCheckoutLabel, locale) || 'Secure Checkout'} onSave={(val) => onSave(block.id, 'props.secureCheckoutLabel', val)} isEditable={isEditable} tag="span" placeholder="Secure checkout..." />
                ) : (
                  getLocalizedString(props.secureCheckoutLabel, locale) || 'Secure Checkout'
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--border)] pt-10">
          <div className="flex gap-6 border-b border-[var(--border)] mb-6">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none ${activeTab === tab.key ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
              >
                {onSave ? (
                  <EditableText value={getLocalizedString(tab.label, locale)} onSave={(val) => onSave(block.id, tab.fieldPath, val)} isEditable={isEditable} tag="span" className="pb-3 text-sm font-medium transition-colors" placeholder="Tab label..." />
                ) : (
                  getLocalizedString(tab.label, locale)
                )}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <p className="text-[var(--text-secondary)] leading-relaxed">{getLocalizedString(product.description, locale)}</p>
            </div>
          )}

          {activeTab === 'features' && (
            <ul className="max-w-3xl space-y-3">
              {(product.features || []).map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {getLocalizedString(f, locale)}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl space-y-6">
              {(product.reviews || []).map((review: any) => (
                <div key={review.id} className="border-b border-[var(--border)] pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Image src={review.avatar} alt={getLocalizedString(review.author, locale)} width={40} height={40} className="rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm">{getLocalizedString(review.author, locale)}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} className={`w-3 h-3 ${s <= review.rating ? 'text-amber-400' : 'text-[var(--border)]'}`} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                            </svg>
                          ))}
                        </div>
                        {review.verified && (
                          <>
                            {onSave ? (
                              <EditableText value={getLocalizedString(props.verifiedLabel, locale) || 'Verified Purchase'} onSave={(val) => onSave(block.id, 'props.verifiedLabel', val)} isEditable={isEditable} tag="span" className="text-[10px] text-green-600 font-medium" placeholder="Verified..." />
                            ) : (
                              <span className="text-[10px] text-green-600 font-medium">{getLocalizedString(props.verifiedLabel, locale) || 'Verified Purchase'}</span>
                            )}
                          </>
                        )}
                        <span className="text-xs text-[var(--text-muted)]">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-sm mb-1">{getLocalizedString(review.title, locale)}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{getLocalizedString(review.text, locale)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
