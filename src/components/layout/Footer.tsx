'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import footerData from '@/lib/data/pages/footerData.json';
import { getLocalizedString } from '@/lib/i18n/locale';

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

export default function Footer() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) || 'en';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  const isLegacyProductPage = pathname.includes('/shop/') && pathname.split('/').filter(Boolean).length >= 3;

  if (isLegacyProductPage) return null;

  const socialIcons: Record<string, React.ReactNode> = {
    pinterest: <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" /></svg>,
    facebook: <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>,
    instagram: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
    tiktok: <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.02a8.16 8.16 0 0 0 4.77 1.52V7.1a4.85 4.85 0 0 1-1-.41z" /></svg>,
  };

  return (
    <footer className="footer" style={{ background: 'var(--warm-brown)', padding: '64px 0 0', color: 'rgba(255,255,255,0.6)' }}>
      <div className="container-custom">
        <div className="footer-grid-4" style={{ paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <Link href={buildLocalizedHref(localePrefix, '/')} className="footer-brand-logo" style={{ display: 'flex', alignItems: 'center', marginBottom: 18, textDecoration: 'none' }}>
              <Image src="/images/premium-puppy-diapers/peekeeper-logo-new-1.png" alt="PeeKeeper logo" width={500} height={167} priority={false} sizes="(max-width: 640px) 220px, 320px" style={{ width: 'auto', height: '72px', maxWidth: '100%', objectFit: 'contain' }} />
            </Link>
            <p className="footer-brand-desc footer-link" style={{ lineHeight: 1.75, marginBottom: 20 }}>{getLocalizedString(footerData.brand.description, locale)}</p>
            <div className="footer-socials" style={{ display: 'flex', gap: 8 }}>
              {footerData.socialLinks.map((social, i) => (
                <a key={i} href={social.url} className="social-btn" aria-label={social.platform} style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', transition: 'background 0.28s, color 0.28s, border-color 0.28s' }}>
                  {socialIcons[social.platform]}
                </a>
              ))}
            </div>
          </div>

          {footerData.quickLinksColumns.map((column, i) => (
            <div key={i}>
              <div className="footer-heading" style={{ marginBottom: 20 }}>{getLocalizedString(column.title, locale)}</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, listStyle: 'none', margin: 0, padding: 0 }} className="footer-links">
                {column.links.map((item, idx) => (
                  <li key={idx}>
                    <Link href={buildLocalizedHref(localePrefix, item.href)} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.28s, gap 0.28s', textDecoration: 'none' }}>
                      <span style={{ display: 'block', width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                      {getLocalizedString(item.label, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="footer-heading" style={{ marginBottom: 20 }}>Get in Touch</div>
            <div className="footer-contact-items" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="footer-contact-item" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'rgba(242,184,198,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blush)', flexShrink: 0, marginTop: 2 }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="footer-link" style={{ margin: 0 }}>Email Us</p>
                  <a href={`mailto:${footerData.contact.email}`} className="footer-link" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.28s', textDecoration: 'none' }}>{footerData.contact.email}</a>
                </div>
              </div>
              <div className="footer-contact-item" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'rgba(242,184,198,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blush)', flexShrink: 0, marginTop: 2 }}>
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="footer-link" style={{ margin: 0 }}>Made in Pennsylvania, USA</p>
                  <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.28s', textDecoration: 'none' }}>Family-Owned Since 2009</span>
                </div>
              </div>
              <div className="footer-contact-item" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'rgba(242,184,198,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blush)', flexShrink: 0, marginTop: 2 }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <p className="footer-link" style={{ margin: 0 }}>Response Time</p>
                  <span className="footer-link" style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.28s', textDecoration: 'none' }}>Within 1 Business Day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', gap: 20, flexWrap: 'wrap' }}>
          <p className="small-text" style={{ margin: 0, color: 'rgba(255,255,255,0.5)' }}>&copy; {new Date().getFullYear()} PeeKeeper LLC. All Rights Reserved.</p>
          <div className="footer-payments" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginRight: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Secure</span>
            <span style={{ fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Visa</span>
            <span style={{ fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>MC</span>
            <span style={{ fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Amex</span>
            <span style={{ fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>PayPal</span>
            <span style={{ fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>Discover</span>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 0, paddingBottom: 20 }}>US Patent # 8302565 &bull; Canada Patent #2771645</p>
      </div>
    </footer>
  );
}