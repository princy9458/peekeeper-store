'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

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

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const isLegacyProductPage = pathname.includes('/shop/') && pathname.split('/').filter(Boolean).length >= 3;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        const bar = document.getElementById('announcement-bar');
        if (bar) {
          bar.style.maxHeight = '0';
          bar.style.padding = '0';
          bar.style.overflow = 'hidden';
          bar.style.transition = 'all 0.4s';
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLegacyProductPage) return null;

  if (!isVisible) return null;

  return (
    <div
      id="announcement-bar"
      className="announcement-bar"
      style={{
        background: 'var(--primary)',
        textAlign: 'center',
        padding: '9px 20px',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.05em',
        color: 'white',
        position: 'relative',
      }}
    >
      Free shipping on all USA orders &mdash; <Link href={buildLocalizedHref(localePrefix, '/shop')} style={{ color: 'white', textDecoration: 'underline', textUnderlineOffset: 3 }}>Shop Now</Link>
      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.25)',
          border: 'none',
          borderRadius: '50%',
          width: 22,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: 'background 0.28s',
        }}
        aria-label="Close"
      >
        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 10 10">
          <path d="M1 1l8 8M9 1L1 9" />
        </svg>
      </button>
    </div>
  );
}