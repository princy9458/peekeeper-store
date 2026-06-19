'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/store/hooks';
import { selectPublicNavigation } from '@/redux/slices/blueprint';
import { selectCartItemCount } from '@/redux/slices/ecommerce/cartSlice';

import { getLocalizedString } from '@/lib/i18n/locale';
import headerData from '@/lib/data/pages/headerData.json';

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<number | null>(null);

  const blueprintNav = useAppSelector(selectPublicNavigation);
  const cartCount = useAppSelector(selectCartItemCount);

  const navigationItems = (blueprintNav?.public || headerData.navigation) as any[];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMega(null);
  }, [pathname]);

  const localePrefix = locale === 'en' ? '' : `/${locale}`;

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
          height: 72,
          padding: '0 28px',
          maxWidth: 'var(--container)',
          margin: '0 auto',
        }}>
          {/* Logo */}
          <Link href={`${localePrefix}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
            textDecoration: 'none',
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'var(--rose)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: 'var(--warm-brown)', letterSpacing: '-0.01em' }}>
                PeeKeeper
              </strong>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--rose)' }}>
                Escape-Proof Diapers
              </span>
            </div>
          </Link>

          {/* Actions */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0,
          }}>
            <a href={`${localePrefix}/account`} className="hdr-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Account</span>
            </a>

            <Link href={`${localePrefix}/cart`} className="hdr-btn" aria-label="Cart" style={{ position: 'relative', textDecoration: 'none' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Cart</span>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 8,
                  background: 'var(--rose)',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 800,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="mobile-menu-btn"
              aria-label="Menu"
              style={{
                display: 'none',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--warm-brown)',
              }}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav style={{
        background: 'var(--cream)',
        borderBottom: '1px solid var(--cream-dark)',
        position: 'relative',
        zIndex: 800,
      }}>
        <div className="nav__inner" style={{
          display: 'flex',
          alignItems: 'stretch',
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 28px',
        }}>
          <ul style={{ display: 'flex', alignItems: 'stretch', width: '100%', listStyle: 'none', margin: 0, padding: 0 }}>
            {navigationItems.map((item, index) => (
              <NavItem
                key={index}
                item={item}
                localePrefix={localePrefix}
                isOpen={openMega === index}
                onMouseEnter={() => setOpenMega(index)}
                onMouseLeave={() => setOpenMega(null)}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'white',
          zIndex: 2000,
          padding: '20px 28px',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{
              background: 'none',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              color: 'var(--warm-brown)',
            }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navigationItems.map((item, index) => (
              <div key={index}>
                <Link
                  href={`${localePrefix}${item.href === '/' ? '' : item.href}`}
                  style={{
                    display: 'block',
                    padding: '14px 10px',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--mid-brown)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--cream-dark)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label.en}
                </Link>
                {item.megaColumns?.map((col: any, ci: number) => (
                  <div key={ci} style={{ paddingLeft: 20 }}>
                    <div style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--rose)',
                      padding: '8px 10px 4px',
                    }}>
                      {col.title}
                    </div>
                    {col.items.map((subItem: any, si: number) => (
                      <Link
                        key={si}
                        href={`${localePrefix}${subItem.href}`}
                        style={{
                          display: 'block',
                          padding: '8px 10px',
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'var(--mid-brown)',
                          textDecoration: 'none',
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
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

function NavItem({
  item, localePrefix, isOpen, onMouseEnter, onMouseLeave
}: {
  item: any; localePrefix: string;
  isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const hasMega = item.megaColumns && item.megaColumns.length > 0;
  const colCount = hasMega ? item.megaColumns.length : 1;
  const isAbout = item.label.en === 'About';

  return (
    <li
      style={{ position: 'relative', display: 'flex', alignItems: 'stretch' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={`${localePrefix}${item.href === '/' ? '' : item.href}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '0 18px',
          height: 46,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isOpen ? 'var(--rose)' : 'var(--mid-brown)',
          borderBottom: isOpen ? '2px solid var(--rose)' : '2px solid transparent',
          transition: 'color 0.28s, border-color 0.28s',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
      >
        {item.label.en}
        {item.label.en === 'Size Finder' && (
          <span style={{
            background: 'var(--sage)',
            color: 'white',
            fontSize: 9,
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            marginLeft: 4,
            letterSpacing: '0.06em',
          }}>AR</span>
        )}
        {hasMega && (
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 11 11"
            style={{ transition: 'transform 0.28s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
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
          borderRadius: '0 var(--radius-md) var(--radius-md) var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          padding: '28px 32px',
          display: 'grid',
          gridTemplateColumns: `repeat(${colCount}, 1fr)`,
          gap: '6px 32px',
          minWidth: isAbout ? 400 : 580,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.22s ease',
          pointerEvents: isOpen ? 'all' : 'none',
          zIndex: 100,
        }}>
          {item.megaColumns.map((col: any, idx: number) => (
            <div key={idx}>
              <div style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--rose)',
                marginBottom: 10,
                paddingBottom: 8,
                borderBottom: '1px solid var(--cream-dark)',
              }}>
                {col.title}
              </div>
              {col.items.map((subItem: any, si: number) => (
                <Link
                  key={si}
                  href={`${localePrefix}${subItem.href}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--mid-brown)',
                    padding: '5px 0',
                    transition: 'color 0.28s, padding-left 0.28s',
                    textDecoration: 'none',
                  }}
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ opacity: 0.35, flexShrink: 0 }}>
                    <path d="M5 12h14" />
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
