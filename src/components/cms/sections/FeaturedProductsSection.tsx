'use client';

import { useState } from 'react';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { useAppDispatch } from '@/redux/store/hooks';
import { addItem } from '@/redux/slices/ecommerce/cartSlice';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface FeaturedProductsSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function FeaturedProductsSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: FeaturedProductsSectionProps) {
  const props = block.props || {};
  const dispatch = useAppDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const product = props.product;
  const allImages = product?.images || [];
  const allColors = product?.colors || [];
  const [selectedColor, setSelectedColor] = useState(allColors[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);

  const currentImage = allImages.find((img: any) => img.color === selectedColor?.name)?.src
    || allImages[0]?.src
    || '';

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.slug) return;
    dispatch(addItem({
      productId: product.slug,
      name: getLocalizedString(product.name, locale),
      price: product.price || 0,
      quantity: 1,
      image: currentImage || '',
      slug: product.slug,
      size: selectedSize?.tag || selectedSize?.name || '',
      color: selectedColor?.name || '',
    }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <section style={{ padding: '80px 0' }} id="shop">
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {onSave && isEditable ? (
            <EditableText
              value={getLocalizedString(props.tag, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.tag', val)}
              isEditable={isEditable}
              tag="div"
              className="sec-tag"
              placeholder="Tag..."
            />
          ) : (
            <div className="sec-tag">{getLocalizedString(props.tag, locale)}</div>
          )}
          {onSave && isEditable ? (
            <EditableText
              value={getLocalizedString(props.heading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.heading', val)}
              isEditable={isEditable}
              tag="h2"
              className="sec-title"
              placeholder="Heading..."
            />
          ) : (
            <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: getLocalizedString(props.heading, locale) }} />
          )}
          {onSave && isEditable ? (
            <EditableText
              value={getLocalizedString(props.subheading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.subheading', val)}
              isEditable={isEditable}
              tag="p"
              className="sec-sub"
              placeholder="Subheading..."
            />
          ) : (
            <p className="sec-sub">{getLocalizedString(props.subheading, locale)}</p>
          )}
        </div>

        <div className="single-product-wrapper">
          <div className="single-product-visual">
            <div className="single-product-main-image">
              <img src={currentImage} alt={getLocalizedString(product.name, locale)} className="single-product-img" />
            </div>
            <div className="single-product-thumbs">
              {allImages.map((img: any, i: number) => {
                const color = allColors.find((c: any) => c.name === img.color);
                return (
                  <button
                    key={i}
                    onClick={() => { if (color) setSelectedColor(color); }}
                    className={`single-product-thumb ${selectedColor?.name === img.color ? 'active' : ''}`}
                  >
                    <img src={img.src} alt={img.alt} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="single-product-info">
            <div className="product-category">{getLocalizedString(product.category, locale)}</div>
            <h2 className="single-product-title">{getLocalizedString(product.name, locale)}</h2>
            <div className="product-stars" style={{ marginBottom: 16 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" fill={i < Math.round(product.rating || 5) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={i < Math.round(product.rating || 5) ? 0 : 2} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
              <span style={{ fontSize: 14, marginLeft: 6 }}>{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <p className="single-product-desc">{getLocalizedString(product.description, locale)}</p>
            <div className="single-product-price">${product.price.toFixed(2)}</div>

            <div className="single-product-section">
              <div className="single-product-label">Color: <strong>{selectedColor?.name || 'Select'}</strong></div>
              <div className="single-product-colors">
                {allColors.map((c: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={`single-product-color-dot ${selectedColor?.name === c.name ? 'active' : ''}`}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="single-product-section">
              <div className="single-product-label">Size: <strong>{selectedSize?.name || 'Select'}</strong></div>
              <div className="single-product-sizes">
                {product.sizes?.map((s: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(s)}
                    className={`single-product-size-btn ${selectedSize?.tag === s.tag ? 'active' : ''}`}
                  >
                    <span className="single-product-size-tag">{s.tag}</span>
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button className="single-product-add-btn" onClick={handleAddToCart}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {addedToCart ? (
                <span>Added!</span>
              ) : (
                onSave && isEditable ? (
                  <EditableText
                    value={getLocalizedString(props.addToCartLabel, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.addToCartLabel', val)}
                    isEditable={isEditable}
                    tag="span"
                    className=""
                    placeholder="Add to Cart..."
                  />
                ) : (
                  <>{getLocalizedString(props.addToCartLabel, locale) || 'Add to Cart'}</>
                )
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
