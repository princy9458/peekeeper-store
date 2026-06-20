'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface TestimonialsSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function TestimonialsSection({ block, locale = 'en', isEditable = false, onSave }: TestimonialsSectionProps) {
  const props = block.props || {};
  const items = props.items || [];

  if (!items.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--cream-dark)' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          {onSave ? (
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
          {onSave ? (
            <EditableText
              value={getLocalizedString(props.heading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.heading', val)}
              isEditable={isEditable}
              tag="h2"
              className="section-title"
              placeholder="Heading..."
            />
          ) : (
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: getLocalizedString(props.heading, locale) }} />
          )}
          {onSave ? (
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
        <div className="testi-grid-3">
          {items.map((item: any, i: number) => (
            <div key={i} style={{
              background: 'white', borderRadius: 'var(--radius-lg)', padding: '28px 26px',
              border: '1px solid var(--cream-dark)', transition: 'transform 0.28s, box-shadow 0.28s', position: 'relative',
            }}>
              {item.verified && (
                <span style={{
                  position: 'absolute', top: 20, right: 20, background: 'rgba(139,175,133,0.15)',
                  borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sage-dk)',
                }}>Verified</span>
              )}
              <div style={{
                width: 36, height: 36, background: 'var(--lav-lt)', borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lavender)', marginBottom: 16,
              }}>
                <svg width="18" height="18" fill="#8B72B8" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              {onSave ? (
                <EditableText
                  value={getLocalizedString(item.text, locale) || ''}
                  onSave={(val) => onSave(block.id, `props.items.${i}.text`, val)}
                  isEditable={isEditable}
                  tag="p"
                  className="review-text"
                  placeholder="Testimonial Text..."
                />
              ) : (
                <p className="review-text" style={{ marginBottom: 20, fontStyle: 'italic' }}>
                  &ldquo;{getLocalizedString(item.text, locale)}&rdquo;
                </p>
              )}
              <div style={{ display: 'flex', gap: 3, color: 'var(--rose)', marginBottom: 14 }}>
                {Array.from({ length: item.rating }).map((_, si) => (
                  <svg key={si} width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--cream-dark)', paddingTop: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: item.avatar ? undefined : 'linear-gradient(135deg, var(--blush), var(--lavender))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontSize: 16, color: 'white', flexShrink: 0, overflow: 'hidden',
                }}>
                  {item.avatar ? <img src={item.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : item.initials}
                </div>
                <div>
                  {onSave ? (
                    <EditableText
                    value={getLocalizedString(item.name, locale) || ''}
                    onSave={(val) => onSave(block.id, `props.items.${i}.name`, val)}
                      isEditable={isEditable}
                      tag="div"
                      className=""
                      placeholder="Name..."
                    />
                  ) : (
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--warm-brown)' }}>{getLocalizedString(item.name, locale)}</div>
                  )}
                  {onSave ? (
                    <EditableText
                    value={getLocalizedString(item.role, locale) || ''}
                    onSave={(val) => onSave(block.id, `props.items.${i}.role`, val)}
                      isEditable={isEditable}
                      tag="div"
                      className=""
                      placeholder="Role..."
                    />
                  ) : (
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{getLocalizedString(item.role, locale)}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {props.ctaText && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#" className="btn-outline" style={{ display: 'inline-flex' }}>
              {onSave ? (
                <EditableText
                  value={getLocalizedString(props.ctaText, locale) || ''}
                  onSave={(val) => onSave(block.id, 'props.ctaText', val)}
                  isEditable={isEditable}
                  tag="span"
                  className=""
                  placeholder="CTA Text..."
                />
              ) : (
                <>{getLocalizedString(props.ctaText, locale)}</>
              )}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
