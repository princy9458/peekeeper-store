'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store/hooks';
import { selectPublicNavigation } from '@/redux/slices/blueprint';
import { selectCartItemCount } from '@/redux/slices/ecommerce/cartSlice';
import { getLocalizedString } from '@/lib/i18n/locale';
import headerData from '@/lib/data/pages/headerData.json';

function buildLocalizedHref(localePrefix: string, href: string) {
  if (href.startsWith('/#')) {
    return localePrefix ? `${localePrefix}${href.slice(1)}` : href;
  }

  if (href.startsWith('#')) {
    return href;
  }

  if (href === '/') {
    return localePrefix || '/';
  }

  return `${localePrefix}${href}`;
}

function normalizePathname(pathname: string, localePrefix: string) {
  if (localePrefix && pathname.startsWith(localePrefix)) {
    const normalized = pathname.slice(localePrefix.length);
    return normalized === '' ? '/' : normalized;
  }

  return pathname || '/';
}

function isActiveNavHref(currentPath: string, href: string) {
  const baseHref = href.split('#')[0] || '/';

  if (baseHref === '/' || baseHref === '/home') {
    return currentPath === '/' || currentPath === '/home';
  }

  return currentPath === baseHref || currentPath.startsWith(`${baseHref}/`);
}

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isLegacyProductPage = pathname.includes('/shop/') && pathname.split('/').filter(Boolean).length >= 3;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<number | null>(null);

  const blueprintNav = useAppSelector(selectPublicNavigation);
  const cartCount = useAppSelector(selectCartItemCount);

  const navigationItems = (blueprintNav?.public || headerData.navigation) as any[];
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const currentPath = normalizePathname(pathname, localePrefix);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMega(null);
  }, [pathname]);

  if (isLegacyProductPage) return null;

  return (
    <>
      <header
        style={{
          background: 'var(--white)',
          boxShadow: isScrolled ? '0 2px 12px rgba(61,46,46,0.08)' : 'none',
          position: 'sticky',
          top: 0,
          zIndex: 900,
          borderBottom: '2px solid var(--cream-dark)',
          transition: 'box-shadow 0.3s',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 78,
          padding: '0 32px',
          maxWidth: 'var(--container)',
          margin: '0 auto',
        }}>
          <Link href={buildLocalizedHref(localePrefix, '/')} style={{ display: 'flex', alignItems: 'center', minWidth: 0, flexShrink: 0, textDecoration: 'none' }}>
            <Image
              src="/images/premium-puppy-diapers/peekeeper-logo-new-1.png"
              alt="PeeKeeper logo"
              width={500}
              height={167}
              priority
              sizes="(max-width: 640px) 180px, 260px"
              style={{
                width: 'auto',
                height: 'clamp(48px, 5vw, 66px)',
                maxWidth: '100%',
                flexShrink: 0,
                objectFit: 'contain',
                objectPosition: 'left center',
              }}
            />
          </Link>

          <div style={{ marginLeft: 'auto', paddingLeft: 12, display: 'flex', alignItems: 'center', minWidth: 0, gap: 4, flexShrink: 0 }}>
            <Link href={buildLocalizedHref(localePrefix, '/account')} className="hdr-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Account</span>
            </Link>

            <Link href={buildLocalizedHref(localePrefix, '/cart')} className="hdr-btn" aria-label="Cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Cart</span>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: 4, right: 8, background: 'var(--rose)', color: 'white', fontSize: 9, fontWeight: 800, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(true)} className="mobile-menu-btn" aria-label="Menu" style={{ display: 'none', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--warm-brown)' }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav style={{ background: 'var(--cream)', borderBottom: '1px solid var(--cream-dark)', position: 'relative', zIndex: 800 }}>
        <div className="nav__inner" style={{ display: 'flex', alignItems: 'stretch', maxWidth: 'var(--container)', margin: '0 auto', padding: '0 32px' }}>
          <ul style={{ display: 'flex', alignItems: 'stretch', width: '100%', listStyle: 'none', margin: 0, padding: 0 }}>
            {navigationItems.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                localePrefix={localePrefix}
                currentPath={currentPath}
                isOpen={openMega === index}
                onMouseEnter={() => setOpenMega(index)}
                onMouseLeave={() => setOpenMega(null)}
              />
            ))}
          </ul>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 2000, padding: '20px 28px', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: 'var(--warm-brown)' }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navigationItems.map((item, index) => (
              <div key={index}>
                <Link href={buildLocalizedHref(localePrefix, item.href)} className="nav-link" style={{ display: 'block', padding: '14px 10px', color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--cream-dark)' }} onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label.en}
                </Link>
                {item.megaColumns?.map((col: any, ci: number) => (
                  <div key={ci} style={{ paddingLeft: 20 }}>
                    <div className="mobile-mega-title" style={{ padding: '8px 10px 4px' }}>{col.title}</div>
                    {col.items.map((subItem: any, si: number) => (
                      <Link key={si} href={buildLocalizedHref(localePrefix, subItem.href)} className="mega-item" style={{ display: 'block', padding: '8px 10px', textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                        {subItem.label.en}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ item, localePrefix, currentPath, isOpen, onMouseEnter, onMouseLeave }: { item: any; localePrefix: string; currentPath: string; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void; }) {
  const hasMega = item.megaColumns && item.megaColumns.length > 0;
  const colCount = hasMega ? item.megaColumns.length : 1;
  const isAbout = item.label.en === 'About';
  const isActive = isActiveNavHref(currentPath, item.href);

  return (
    <li style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link
        href={buildLocalizedHref(localePrefix, item.href)}
        className="nav-link"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '0 18px',
          height: 46,
          color: isActive ? 'var(--primary)' : isOpen ? 'var(--primary)' : 'var(--text-secondary)',
          borderBottom: isActive || isOpen ? '2px solid var(--primary)' : '2px solid transparent',
          transition: 'color 0.28s, border-color 0.28s',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label.en}
        {item.label.en === 'Size Finder' && (
          <span style={{ background: 'var(--sage)', color: 'white', fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 'var(--radius-full)', marginLeft: 4, letterSpacing: '0.06em' }}>AR</span>
        )}
        {hasMega && (
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 11 11" style={{ transition: 'transform 0.28s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <path d="M2 3.5l3.5 4 3.5-4" />
          </svg>
        )}
      </Link>

      {hasMega && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          background: 'var(--white)',
          border: '1px solid var(--cream-dark)',
          borderRadius: '0 0 var(--radius-2xl) var(--radius-2xl)',
          boxShadow: 'var(--shadow-lg)',
          padding: '36px 40px',
          display: 'grid',
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          gap: '0 48px',
          minWidth: isAbout ? 500 : 660,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease, visibility 0.25s',
          pointerEvents: isOpen ? 'all' : 'none',
          zIndex: 100,
        }}>
          {item.megaColumns.map((col: any, idx: number) => (
            <div key={idx}>
              <div className="mega-title" style={{ marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--cream-dark)' }}>{col.title}</div>
              {col.items.map((subItem: any, si: number) => (
                <Link key={si} href={buildLocalizedHref(localePrefix, subItem.href)} className="mega-item mega-link" style={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: 10, padding: '7px 0', textDecoration: 'none' }}>
                  <svg width="5" height="5" fill="currentColor" viewBox="0 0 5 5" style={{ opacity: 0.4, flexShrink: 0 }}>
                    <circle cx="2.5" cy="2.5" r="2.5" />
                  </svg>
                  {subItem.label.en}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </li>
  );
}