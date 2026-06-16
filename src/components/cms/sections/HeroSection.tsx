'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface HeroSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function HeroSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: HeroSectionProps) {
  const props = block.props || {};
  const [activeColor, setActiveColor] = useState(props.colors?.[0] || null);
  const [imgLoaded, setImgLoaded] = useState(true);

  const changeColor = (color: any) => {
    setActiveColor(color);
    setImgLoaded(false);
  };

  const currentImage = activeColor?.image || props.image;

  return (
    <section className="hero-wrapper">
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='35' fill='none' stroke='rgba(242,184,198,0.18)' stroke-width='1'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />
      <div className="hero-inner" style={{
        padding: '80px 28px',
        maxWidth: 'var(--container)',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--rose)',
            color: 'white',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            marginBottom: 20,
          }}>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
            </svg>
            {onSave ? (
              <EditableText
                value={getLocalizedString(props.tag, locale) || ''}
                onSave={(val) => onSave(block.id, 'props.tag', val)}
                isEditable={isEditable}
                tag="span"
                className=""
                placeholder="Tag..."
              />
            ) : (
              <>{getLocalizedString(props.tag, locale)}</>
            )}
          </div>
          {onSave ? (
            <EditableText
              value={getLocalizedString(props.heading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.heading', val)}
              isEditable={isEditable}
              tag="h1"
              className=""
              placeholder="Heading..."
            />
          ) : (
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 5vw, 68px)',
              lineHeight: 1.05,
              color: 'var(--warm-brown)',
              marginBottom: 22,
            }}>
              {getLocalizedString(props.heading, locale)}
            </h1>
          )}
          {onSave ? (
            <EditableText
              value={getLocalizedString(props.subheading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.subheading', val)}
              isEditable={isEditable}
              tag="p"
              className=""
              placeholder="Subheading..."
            />
          ) : (
            <p style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: 'var(--mid-brown)',
              maxWidth: 440,
              marginBottom: 36,
            }}>
              {getLocalizedString(props.subheading, locale)}
            </p>
          )}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href={`${localePrefix}${props.cta?.href || '/shop'}`} className="btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
              {onSave ? (
                <EditableText
                  value={getLocalizedString(props.cta?.label, locale) || ''}
                  onSave={(val) => onSave(block.id, 'props.cta.label', val)}
                  isEditable={isEditable}
                  tag="span"
                  className=""
                  placeholder="CTA Label..."
                />
              ) : (
                <>{getLocalizedString(props.cta?.label, locale) || 'Shop Now'}</>
              )}
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a href={props.secondaryCta?.href || '#ar-tool'} className="btn-outline" style={{ fontSize: 14, padding: '13px 28px' }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 3l-4 4-4-4M8 21v-2M16 21v-2" />
              </svg>
              {onSave ? (
                <EditableText
                  value={getLocalizedString(props.secondaryCta?.label, locale) || ''}
                  onSave={(val) => onSave(block.id, 'props.secondaryCta.label', val)}
                  isEditable={isEditable}
                  tag="span"
                  className=""
                  placeholder="Secondary CTA Label..."
                />
              ) : (
                <>{getLocalizedString(props.secondaryCta?.label, locale) || 'AR Size Tool'}</>
              )}
            </a>
          </div>
          {props.stats && (
            <div className="hero-stats">
              {props.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <strong style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 32,
                    color: 'var(--rose)',
                    lineHeight: 1,
                    display: 'block',
                  }}>{getLocalizedString(stat.value, locale)}</strong>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}>
                    {onSave ? (
                      <EditableText
                        value={getLocalizedString(stat.label, locale) || ''}
                        onSave={(val) => onSave(block.id, `props.stats.${i}.label`, val)}
                        isEditable={isEditable}
                        tag="span"
                        className=""
                        placeholder="Stat Label..."
                      />
                    ) : (
                      <>{getLocalizedString(stat.label, locale)}</>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="hero-visual-order" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            width: '100%',
            maxWidth: 520,
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <img
              src={currentImage}
              alt="PeeKeeper Dog Diaper"
              style={{
                width: '100%',
                height: 480,
                objectFit: 'cover',
                display: 'block',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.3s, transform 0.3s',
                transform: imgLoaded ? 'scale(1)' : 'scale(0.96)',
              }}
              onLoad={() => setImgLoaded(true)}
            />
            {props.badges?.[0] && (
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <svg width="22" height="22" fill="none" stroke="var(--rose)" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <div>
                  {onSave ? (
                    <EditableText
                      value={getLocalizedString(props.badges[0]?.title, locale) || ''}
                      onSave={(val) => onSave(block.id, 'props.badges.0.title', val)}
                      isEditable={isEditable}
                      tag="strong"
                      className=""
                      placeholder="Badge Title..."
                    />
                  ) : (
                    <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--warm-brown)', display: 'block' }}>{getLocalizedString(props.badges[0].title, locale)}</strong>
                  )}
                  {onSave ? (
                    <EditableText
                      value={getLocalizedString(props.badges[0]?.subtitle, locale) || ''}
                      onSave={(val) => onSave(block.id, 'props.badges.0.subtitle', val)}
                      isEditable={isEditable}
                      tag="span"
                      className=""
                      placeholder="Badge Subtitle..."
                    />
                  ) : (
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{getLocalizedString(props.badges[0].subtitle, locale)}</span>
                  )}
                </div>
              </div>
            )}
            {props.badges?.[1] && (
              <div style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                background: 'var(--rose)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
                boxShadow: 'var(--shadow-md)',
                color: 'white',
                fontWeight: 800,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.657 6.343a8 8 0 1 0 0 11.314 8 8 0 0 0 0-11.314zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                </svg>
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(props.badges[1]?.title, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.badges.1.title', val)}
                    isEditable={isEditable}
                    tag="span"
                    className=""
                    placeholder="Badge Title..."
                  />
                ) : (
                  <>{getLocalizedString(props.badges[1].title, locale)}</>
                )}
              </div>
            )}
          </div>
          {props.colors && (
            <div style={{
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 8,
              background: 'white',
              padding: '10px 16px',
              borderRadius: 'var(--radius-full)',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {props.colors.map((c: any, i: number) => (
                <button
                  key={i}
                  onClick={() => changeColor(c)}
                  title={c.name}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: activeColor?.name === c.name ? '2px solid var(--warm-brown)' : '2px solid transparent',
                    background: c.hex,
                    cursor: 'pointer',
                    transform: activeColor?.name === c.name ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.28s, border-color 0.28s',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
