'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/store/hooks';
import { addItem } from '@/redux/slices/ecommerce/cartSlice';
import type { PeekeeperProduct, Review } from '@/lib/peekeeper-shop-data';

type ProductResponse = { product: PeekeeperProduct };
type ReviewsResponse = { items: Review[]; total: number; nextOffset: number; hasMore: boolean };
type InventoryResponse = { inventory: number; variant?: { stock: number; id: string; size: string; color: string; colorLabel: string; hex: string; image: string } | null };

const HERO_BLUE = '#69AEF5';
const PINK = '#E847A3';
const LIGHT_BLUE = '#D2EEF8';
const SOFT_BLUE = '#CBE7F7';
const GREY = '#6F6F6F';

const reviewFilterLabels: Record<string, string> = {
  all: 'All stars (125)',
  'with-images': 'With images (36)',
  verified: 'Verified (102)',
  'all-stars': 'All stars (125)',
};

function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2, lineHeight: 0 }} aria-label={`${value} stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < Math.round(value);
        return (
          <svg key={index} width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#F7B500' : 'none'} stroke={filled ? '#F7B500' : '#E8E0DD'} strokeWidth="1.5">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
          </svg>
        );
      })}
    </div>
  );
}

function LegacyHeader({ localePrefix }: { localePrefix: string }) {
  return (
    <header style={{ background: HERO_BLUE, borderBottom: '4px solid rgba(0,0,0,0.12)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <Link href={`${localePrefix}/shop`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image src="/images/premium-puppy-diapers/peekeeper-logo-new-1.png" alt="PeeKeeper" width={230} height={76} priority style={{ width: 128, height: 'auto' }} />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15, fontWeight: 700, letterSpacing: '0.01em' }}>
          <Link href={`${localePrefix}/`} style={{ color: '#111' }}>HOME</Link>
          <Link href={`${localePrefix}/about`} style={{ color: '#111' }}>ABOUT v</Link>
          <Link href={`${localePrefix}/shop`} style={{ color: PINK }}>SHOP</Link>
          <Link href={`${localePrefix}/faq`} style={{ color: '#111' }}>INFO v</Link>
          <Link href={`${localePrefix}/contact`} style={{ color: '#111' }}>CONTACT</Link>
          <Link href={`${localePrefix}/account`} style={{ color: '#111' }}>ACCOUNT</Link>
          <Link href={`${localePrefix}/cart`} aria-label="cart" style={{ color: '#111', fontSize: 18, lineHeight: 1, textDecoration: 'none' }}>CART</Link>
        </nav>
      </div>
    </header>
  );
}

function WaveDivider() {
  return (
    <div style={{ position: 'relative', height: 82, marginTop: -2, overflow: 'hidden', background: '#fff' }}>
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M0,64 C240,30 430,80 720,104 C1030,131 1190,42 1440,67 L1440,160 L0,160 Z" fill="#8CC0F7" opacity="0.9" />
        <path d="M0,84 C250,49 440,98 720,121 C1010,145 1220,66 1440,90 L1440,160 L0,160 Z" fill="#D9EBFB" opacity="0.95" />
      </svg>
    </div>
  );
}

function LegacyFooter({ localePrefix }: { localePrefix: string }) {
  return (
    <footer>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', minHeight: 420 }}>
        <div style={{ background: '#0A7BFA', padding: '80px 40px 60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
          <Image src="/images/premium-puppy-diapers/peekeeper-logo-new-1.png" alt="PeeKeeper logo" width={290} height={100} style={{ width: 240, height: 'auto' }} />
          <div style={{ alignSelf: 'flex-start', marginLeft: '18%', color: '#111', fontWeight: 700, fontSize: 22 }}>Follow Us</div>
          <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-start', marginLeft: '18%' }}>
            {['P', 'F', 'I', 'T'].map((label, index) => (
              <span key={index} style={{ width: 32, height: 32, borderRadius: 3, background: ['#E84C3D', '#4A6FA5', '#F94B72', '#FF4C55'][index], color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ background: PINK, padding: '80px 40px 60px', color: '#111', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 18 }}>Quick Links</div>
            <div style={{ display: 'grid', gap: 18, fontSize: 17 }}>
              <a href={`${localePrefix}/faq`}>How to Measure</a>
              <a href={`${localePrefix}/privacy`}>Privacy Policy</a>
              <a href={`${localePrefix}/returns`}>Return Policy</a>
              <a href="#reviews">Testimonials</a>
              <a href={`${localePrefix}/contact`}>Contact Us</a>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: 18, fontWeight: 700 }}>info@peekeeper.com</div>
            <div style={{ display: 'grid', gap: 4, fontSize: 16, marginBottom: 20 }}>
              <div>US Patent # 8302565</div>
              <div>Canada Patent #2771645</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <Image src="/images/product-1.svg" alt="Visa" width={62} height={28} style={{ width: 62, height: 28, objectFit: 'contain', background: 'white', borderRadius: 4 }} unoptimized />
              <Image src="/images/product-4.svg" alt="Mastercard" width={62} height={28} style={{ width: 62, height: 28, objectFit: 'contain', background: 'white', borderRadius: 4 }} unoptimized />
              <Image src="/images/product-6.svg" alt="Discover" width={62} height={28} style={{ width: 62, height: 28, objectFit: 'contain', background: 'white', borderRadius: 4 }} unoptimized />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ padding: '10px 12px', border: '2px solid rgba(255,255,255,0.45)', borderRadius: 6, background: 'rgba(255,255,255,0.25)' }}>
                <Image src="/images/product-1.svg" alt="Paypal" width={90} height={28} style={{ width: 90, height: 28, objectFit: 'contain' }} unoptimized />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#000', color: 'white', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>Copyright 2009-2025 PeeKeeper LLC.</div>
        <div>Designed &amp; Managed by <span style={{ color: PINK }}>CODIFIED</span></div>
      </div>
    </footer>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article style={{ breakInside: 'avoid', background: '#fff', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.12)', marginBottom: 16, overflow: 'hidden' }}>
      {review.image && (
        <div style={{ position: 'relative' }}>
          <Image src={review.image} alt={review.title} width={700} height={520} style={{ width: '100%', height: 'auto', display: 'block' }} unoptimized />
          {review.withImages && (
            <div style={{ position: 'absolute', right: 10, bottom: 10, width: 30, height: 30, borderRadius: 999, background: 'rgba(0,0,0,0.8)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>+2</div>
          )}
        </div>
      )}
      <div style={{ padding: '12px 14px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{review.name}{review.verified ? <span style={{ color: '#3ad10b', marginLeft: 4 }}>Verified</span> : null}</div>
          <div style={{ fontSize: 12, fontStyle: 'italic' }}>{review.date}</div>
        </div>
        <StarRating value={review.stars} size={14} />
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 6 }}>{review.title}</div>
        <p style={{ margin: 0, color: '#555', lineHeight: 1.65, fontSize: 15 }}>{review.text}</p>
        {review.reply && (
          <div style={{ borderTop: '1px solid #eee', marginTop: 12, paddingTop: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Reply from A*** P******:</div>
            <p style={{ margin: '6px 0 0', color: '#555', lineHeight: 1.65, fontSize: 15 }}>{review.reply}</p>
          </div>
        )}
      </div>
      <div style={{ borderTop: '1px solid #eee', padding: '10px 14px', display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center', fontWeight: 700 }}>
        <span>Helpful? {review.helpful}</span>
        <span style={{ fontSize: 18 }}>Like</span>
        <span>{review.notHelpful}</span>
        <span style={{ fontSize: 18 }}>Dislike</span>
      </div>
    </article>
  );
}

export default function PeekeeperProductPage({ locale = 'en', slug }: { locale?: string; slug: string }) {
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<PeekeeperProduct | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewFilter, setReviewFilter] = useState('all-stars');
  const [reviewOffset, setReviewOffset] = useState(0);
  const [reviewHasMore, setReviewHasMore] = useState(true);
  const [reviewForm, setReviewForm] = useState({ title: '', text: '', name: '', email: '', stars: 5 });
  const [productLoaded, setProductLoaded] = useState(false);
  const [loadMoreBusy, setLoadMoreBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadProduct() {
      const response = await fetch('/api/peekeeper/product');
      const data: ProductResponse = await response.json();
      if (!mounted) return;
      const nextProduct = data.product;
      setProduct(nextProduct);
      setMainImage(nextProduct.mainImage);
      setSelectedSize(nextProduct.sizeOptions[0]?.value || '');
      setSelectedColor(nextProduct.colorOptions[0]?.value || '');
      setStock(nextProduct.inventory);
      setProductLoaded(true);
    }

    loadProduct();
    return () => { mounted = false; };
  }, [slug]);

  useEffect(() => {
    const productInventory = product?.inventory ?? 0;
    if (!product) return;
    let cancelled = false;
    async function syncInventory() {
      const response = await fetch('/api/peekeeper/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: selectedSize, color: selectedColor }),
      });
      const data: InventoryResponse = await response.json();
      if (!cancelled) {
        setStock(data.inventory || productInventory);
        if (data.variant?.image) setMainImage(data.variant.image);
      }
    }
    syncInventory();
    return () => { cancelled = true; };
  }, [product, selectedSize, selectedColor]);

  useEffect(() => {
    let cancelled = false;
    async function loadReviews() {
      const response = await fetch(`/api/peekeeper/reviews?limit=4&offset=0&filter=${reviewFilter}`);
      const data: ReviewsResponse = await response.json();
      if (cancelled) return;
      setReviews(data.items);
      setReviewOffset(data.nextOffset);
      setReviewHasMore(data.hasMore);
    }

    loadReviews();
    return () => { cancelled = true; };
  }, [reviewFilter]);

  const handleAddToCart = () => {
    if (!product) return;
    const colorLabel = product.colorOptions.find((option) => option.value === selectedColor)?.label || selectedColor;
    const sizeLabel = product.sizeOptions.find((option) => option.value === selectedSize)?.label || selectedSize;

    dispatch(addItem({
      productId: `${product.slug}-${selectedSize}-${selectedColor}`,
      name: `${product.title} (${sizeLabel})`,
      price: product.price,
      quantity,
      image: mainImage,
      size: sizeLabel,
      color: colorLabel,
    }));
  };

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reviewForm.title || !reviewForm.text || !reviewForm.name || !reviewForm.email) return;

    const response = await fetch('/api/peekeeper/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewForm),
    });
    const data = await response.json();
    setReviews((current) => [data.review, ...current]);
    setReviewForm({ title: '', text: '', name: '', email: '', stars: 5 });
  };

  const handleLoadMore = async () => {
    if (!reviewHasMore || loadMoreBusy) return;
    setLoadMoreBusy(true);
    const response = await fetch(`/api/peekeeper/reviews?limit=4&offset=${reviewOffset}&filter=${reviewFilter}`);
    const data: ReviewsResponse = await response.json();
    setReviews((current) => [...current, ...data.items]);
    setReviewOffset(data.nextOffset);
    setReviewHasMore(data.hasMore);
    setLoadMoreBusy(false);
  };

  if (!productLoaded || !product) {
    return <div style={{ minHeight: 500, background: '#fff' }} />;
  }

  return (
    <div style={{ background: '#fff', color: '#111' }}>
      <LegacyHeader localePrefix={localePrefix} />

      <section style={{ background: HERO_BLUE, minHeight: 350, position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '74px 24px 96px' }}>
          <h1 style={{ fontSize: 72, lineHeight: 1.02, margin: '58px 0 0 230px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            PeeKeeper
            <br />
            <span style={{ display: 'inline-block' }}>(Unisex Design)</span>
          </h1>
        </div>
        <WaveDivider />
      </section>

      <section style={{ background: '#fff', padding: '28px 0 22px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)', gap: 36, alignItems: 'start' }}>
          <div>
            <div style={{ position: 'relative', minHeight: 520 }}>
              <Image src={mainImage} alt={product.title} fill priority sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'contain', objectPosition: 'center top' }} unoptimized />
              <div style={{ position: 'absolute', right: 8, top: 8, fontSize: 24 }}>Search</div>
            </div>
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, maxWidth: 540 }}>
              {product.thumbnails.map((thumb) => (
                <button key={thumb} onClick={() => setMainImage(thumb)} type="button" style={{ position: 'relative', aspectRatio: '1 / 1', background: 'transparent', border: 'none', cursor: 'pointer', opacity: mainImage === thumb ? 1 : 0.32 }}>
                  <Image src={thumb} alt="thumbnail" fill style={{ objectFit: 'contain' }} unoptimized />
                </button>
              ))}
            </div>
          </div>

          <div style={{ paddingTop: 6, paddingRight: 16 }}>
            <h2 style={{ fontSize: 52, lineHeight: 0.95, margin: 0, fontWeight: 800 }}>
              {product.title}
              <br />
              <span style={{ fontWeight: 800, display: 'inline-block' }}>{product.subtitle}</span>
            </h2>
            <div style={{ marginTop: 38, display: 'flex', alignItems: 'center', gap: 8 }}>
              <StarRating value={5} />
              <span style={{ color: PINK, fontSize: 15 }}>(125 customer reviews)</span>
            </div>
            <div style={{ marginTop: 24, color: PINK, fontSize: 32, fontWeight: 700 }}>${product.price.toFixed(2)}</div>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, maxWidth: 540 }}>{product.description}</p>

            <div style={{ marginTop: 26, display: 'grid', gap: 16, maxWidth: 535 }}>
              <label style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Size</span>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} style={{ width: '100%', appearance: 'none', background: '#e8e8e8', border: 'none', height: 22, padding: '0 12px', fontSize: 15, color: '#666' }}>
                  {product.sizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Color</span>
                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} style={{ width: '100%', appearance: 'none', background: '#e8e8e8', border: 'none', height: 22, padding: '0 12px', fontSize: 15, color: '#666' }}>
                  {product.colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <div style={{ color: PINK, fontSize: 15, marginLeft: 80 }}>Clear</div>
            </div>

            <div style={{ marginTop: 36, color: '#B08B00', fontSize: 16, fontWeight: 700 }}>In stock</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
              <input type="number" min={1} max={stock} value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || '1')))} style={{ width: 60, height: 58, border: '1px solid #111', textAlign: 'center', fontSize: 18, fontFamily: 'inherit' }} />
              <button onClick={handleAddToCart} type="button" style={{ height: 54, minWidth: 160, background: '#69A8F8', color: '#111', border: 'none', borderRadius: 4, fontSize: 22, fontWeight: 700, padding: '0 24px' }}>Add to cart</button>
            </div>
            <div style={{ marginTop: 6, fontSize: 14, color: '#111' }}>{product.payPalText}</div>
          </div>
        </div>
      </section>

      <section style={{ background: LIGHT_BLUE, border: '4px solid #E847A3', borderRadius: 2, maxWidth: 1180, margin: '0 auto', padding: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, alignItems: 'center', padding: '6px 8px 18px' }}>
          <div style={{ position: 'relative', minHeight: 250 }}>
            <Image src={product.netBag.image} alt={product.netBag.title} fill style={{ objectFit: 'contain', objectPosition: 'center' }} unoptimized />
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Net Bag</div>
            <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 720 }}>{product.netBag.description}</p>
            <div style={{ color: PINK, fontSize: 30, fontWeight: 700, margin: '28px 0 22px' }}>${product.netBag.price.toFixed(2)}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <input type="number" value={1} readOnly style={{ width: 60, height: 54, border: '1px solid #111', textAlign: 'center', fontSize: 18, fontFamily: 'inherit' }} />
              <button type="button" style={{ height: 50, minWidth: 144, background: '#69A8F8', color: '#111', border: 'none', borderRadius: 4, fontSize: 20, fontWeight: 700, padding: '0 22px' }}>Add to cart</button>
            </div>
            <div style={{ marginTop: 6, fontSize: 14, color: '#111' }}>Pay in 4 interest-free payments of $12.46 with PayPal. Learn more</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '28px auto 0', border: '4px solid #E847A3', padding: 0 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
          <button type="button" style={{ background: PINK, color: 'white', border: 'none', padding: '20px 34px', fontSize: 19, fontWeight: 800, letterSpacing: '0.12em' }}>DESCRIPTION</button>
          <button type="button" style={{ background: SOFT_BLUE, color: '#111', border: 'none', padding: '20px 34px', fontSize: 19, fontWeight: 800, letterSpacing: '0.08em' }}>SHIPPING &amp; RETURN POLICY</button>
          <div style={{ flex: 1, background: '#f5f5f5' }} />
        </div>
        <div style={{ padding: '28px 24px 26px' }}>
          <ul style={{ fontSize: 18, lineHeight: 1.85, paddingLeft: 28, margin: 0, maxWidth: 1180 }}>
            <li>Denim 100% cotton denim. Lilac 100% pima cotton, all other colors are 100% cotton flannel.</li>
            <li>Machine wash in cool water and dry on low heat. Use a net bag in washer machine to keep the straps from being pulled. To keep Velcro soft and pliable hang to dry.</li>
            <li>PeeKeeper should be used with either an adult incontinence pad (regular length), belly band, disposable dog diaper or baby diaper (will need to cut hole for tail).</li>
            <li>If you want to contain fecal matter use a disposable dog diaper under the PeeKeeper.</li>
            <li>Proudly family owned and made in the USA.</li>
          </ul>
        </div>
      </section>

      <section style={{ background: LIGHT_BLUE, marginTop: 28, padding: '64px 0 42px', borderTop: '4px solid #E847A3' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', fontSize: 34, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 46 }}>SIZE GUIDE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 38, alignItems: 'center' }}>
            <div style={{ textAlign: 'center', paddingTop: 10 }}>
              <div style={{ fontSize: 100, color: PINK, lineHeight: 1, marginBottom: 24 }}>+</div>
              <p style={{ maxWidth: 560, margin: '0 auto', fontSize: 18, lineHeight: 1.8 }}>{product.sizeGuide.intro}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Image src={product.sizeGuide.image} alt="Measure with flexible tape" width={640} height={420} style={{ width: '100%', height: 'auto', maxWidth: 520, margin: '0 auto' }} unoptimized />
            </div>
          </div>
          <div style={{ overflowX: 'auto', marginTop: 78 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 17 }}>
              <thead>
                <tr>
                  {['Size', 'Waist', 'Available Lengths', 'Weight'].map((heading) => (
                    <th key={heading} style={{ background: '#D69026', color: 'white', textAlign: 'left', padding: '16px 18px', border: '1px solid #444', fontWeight: 800 }}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.sizeGuide.table.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} style={{ background: '#F5EEDB', padding: '16px 18px', border: '1px solid #444', fontWeight: 700 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 54 }}>
            {product.cards.map((card, index) => (
              <div key={card.title} style={{ minHeight: 362, border: '2px solid #0D39FF', borderRadius: 12, padding: '56px 30px 30px', textAlign: 'center' }}>
                <div style={{ fontSize: index === 0 ? 34 : 32, fontWeight: 800, lineHeight: 1.15, marginBottom: 26, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' }}>{card.title}</div>
                <p style={{ fontSize: 18, lineHeight: 1.8, textAlign: 'left', margin: 0, fontStyle: 'italic' }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='reviews' style={{ padding: '62px 0 0', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', color: PINK, fontSize: 38, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 22 }}>REVIEWS ON PEEKEEPER</div>
          <form onSubmit={handleReviewSubmit} style={{ border: `3px solid ${PINK}`, borderRadius: 12, padding: '18px 28px 28px' }}>
            <div style={{ fontSize: 16, marginBottom: 14 }}>Your email address will not be published. Required fields are marked *</div>
            <input value={reviewForm.title} onChange={(e) => setReviewForm((current) => ({ ...current, title: e.target.value }))} placeholder="Review Title" style={{ width: '100%', height: 36, border: '1px solid #ccc', marginBottom: 12, padding: '0 12px', fontSize: 16 }} />
            <div style={{ color: '#F7B500', fontSize: 28, letterSpacing: 1, marginBottom: 8 }}>Stars</div>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Your review</label>
            <textarea value={reviewForm.text} onChange={(e) => setReviewForm((current) => ({ ...current, text: e.target.value }))} placeholder="What do you think of this product?" rows={6} style={{ width: '100%', border: '1px solid #ccc', padding: 12, fontSize: 16, resize: 'vertical', marginBottom: 16 }} />
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Choose pictures(maxsize: 500000 KB, max files: 5)</div>
            <button type="button" style={{ height: 50, background: '#69A8F8', border: 'none', color: '#111', fontSize: 20, fontWeight: 700, borderRadius: 4, padding: '0 22px', marginBottom: 20 }}>Choose pictures &amp; videos</button>
            <div style={{ display: 'grid', gap: 10 }}>
              <label style={{ fontWeight: 700 }}>Name</label>
              <input value={reviewForm.name} onChange={(e) => setReviewForm((current) => ({ ...current, name: e.target.value }))} style={{ height: 36, border: '1px solid #ccc', padding: '0 12px', fontSize: 16 }} />
              <label style={{ fontWeight: 700 }}>Email</label>
              <input value={reviewForm.email} onChange={(e) => setReviewForm((current) => ({ ...current, email: e.target.value }))} style={{ height: 36, border: '1px solid #ccc', padding: '0 12px', fontSize: 16 }} />
              <button type="submit" style={{ height: 48, marginTop: 12, background: PINK, border: '2px solid #69A8F8', color: '#111', fontSize: 22, fontWeight: 700 }}>Submit</button>
            </div>
          </form>
        </div>

        <div style={{ maxWidth: 1180, margin: '50px auto 0', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 34, fontWeight: 800, marginBottom: 16 }}>Customer reviews</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ background: '#252525', color: 'white', width: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderRadius: 4 }}>{product.reviewSummary.average.toFixed(2)}</div>
                <div>
                  <StarRating value={5} />
                  <div style={{ marginTop: 2, fontWeight: 700 }}>Based on {product.reviewSummary.total} reviews</div>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: 2 }}>
              {product.reviewSummary.distribution.map((row) => (
                <div key={row.stars} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 38px', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <StarRating value={row.stars} size={14} />
                  </div>
                  <div style={{ height: 6, background: '#ece7e5', position: 'relative', borderRadius: 999 }}>
                    <div style={{ width: `${(row.count / 107) * 100}%`, height: '100%', background: '#A664A6', borderRadius: 999 }} />
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 700 }}>{row.count}</div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 18, border: '1px solid #e7e1dd', padding: 10, flexWrap: 'wrap' }}>
                {['with-images', 'verified', 'all-stars'].map((filter) => (
                  <button key={filter} onClick={() => setReviewFilter(filter)} type="button" style={{ padding: '10px 22px', border: reviewFilter === filter ? 'none' : '1px solid #ddd', background: reviewFilter === filter ? '#000' : '#fff', color: PINK, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
                    {reviewFilterLabels[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 38, columns: '3 320px', columnGap: 22 }}>
            {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>

          <div style={{ textAlign: 'center', margin: '22px 0 42px' }}>
            <button onClick={handleLoadMore} type="button" style={{ background: GREY, color: 'white', border: 'none', borderRadius: 4, height: 34, minWidth: 92, fontWeight: 700, fontSize: 16, padding: '0 12px' }}>
              {loadMoreBusy ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </div>
      </section>

      <LegacyFooter localePrefix={localePrefix} />

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" type="button" style={{ position: 'fixed', right: 0, bottom: 120, width: 40, height: 40, background: '#7A7A7A', color: 'white', border: 'none', borderRadius: 4, boxShadow: '0 2px 4px rgba(0,0,0,0.2)', fontSize: 18, zIndex: 40 }}>^</button>

      <style jsx>{`
        :global(body) { background: #fff; }
        a { text-decoration: none; color: inherit; }
      `}</style>
    </div>
  );
}





