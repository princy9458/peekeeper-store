'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface SizeTableSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function SizeTableSection({ block, locale = 'en', isEditable = false, onSave }: SizeTableSectionProps) {
  const props = block.props || {};
  const sizes = props.sizes || [];

  // Badge color tokens — exact match to reference
  const sizeTagStyles: Record<string, { bg: string; color: string; border: string }> = {
    XS:  { bg: '#EDE8F4',               color: '#7A5CA0', border: '1px solid #C4B5D4' },
    SM:  { bg: 'rgba(139,175,133,0.18)', color: '#5A8C54', border: '1px solid #8BAF85' },
    MED: { bg: 'rgba(217,84,122,0.1)',   color: '#D9547A', border: '1px solid #F2B8C6' },
  };

  if (!sizes.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom">

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          {onSave && isEditable ? (
            <EditableText value={getLocalizedString(props.tag, locale) || ''} onSave={(val) => onSave(block.id, 'props.tag', val)} isEditable={isEditable} tag="div" className="sec-tag" />
          ) : (
            <div className="sec-tag">{getLocalizedString(props.tag, locale)}</div>
          )}
          {onSave && isEditable ? (
            <EditableText value={getLocalizedString(props.heading, locale) || ''} onSave={(val) => onSave(block.id, 'props.heading', val)} isEditable={isEditable} tag="h2" className="sec-title" placeholder="Heading..." />
          ) : (
            <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: getLocalizedString(props.heading, locale) }} />
          )}
          {onSave && isEditable ? (
            <EditableText value={getLocalizedString(props.subheading, locale) || ''} onSave={(val) => onSave(block.id, 'props.subheading', val)} isEditable={isEditable} tag="p" className="sec-sub" />
          ) : (
            <p className="sec-sub">{getLocalizedString(props.subheading, locale)}</p>
          )}
        </div>

        {/* ── Two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 40,
          alignItems: 'start',
        }}>

          {/* Left: table + tip */}
          <div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
                fontFamily: 'var(--font-body)',
              }}>
                <thead>
                  <tr>
                    <th style={{
                      background: 'var(--rose)', color: 'white',
                      padding: '14px 18px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 11,
                      fontWeight: 800, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      borderRadius: 'var(--radius-sm) 0 0 0',
                    }}>Size</th>
                    <th style={{
                      background: 'var(--rose)', color: 'white',
                      padding: '14px 18px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 11,
                      fontWeight: 800, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>Waist</th>
                    <th style={{
                      background: 'var(--rose)', color: 'white',
                      padding: '14px 18px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 11,
                      fontWeight: 800, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}>Available Lengths</th>
                    <th style={{
                      background: 'var(--rose)', color: 'white',
                      padding: '14px 18px', textAlign: 'left',
                      fontFamily: 'var(--font-body)', fontSize: 11,
                      fontWeight: 800, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      borderRadius: '0 var(--radius-sm) 0 0',
                    }}>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s: any, i: number) => {
                    const tagStyle = sizeTagStyles[s.tag] || sizeTagStyles.XS;
                    return (
                      <tr key={i}>
                        <td style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid var(--cream-dark)',
                          color: 'var(--mid-brown)',
                          fontWeight: 600,
                        }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 14px',
                            borderRadius: '100px',
                            background: tagStyle.bg,
                            color: tagStyle.color,
                            border: tagStyle.border,
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}>
                            {getLocalizedString(s.name, locale)}
                          </span>
                        </td>
                        <td style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid var(--cream-dark)',
                          color: 'var(--mid-brown)',
                          fontWeight: 600,
                        }}>{getLocalizedString(s.waist, locale)}</td>
                        <td style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid var(--cream-dark)',
                          color: 'var(--mid-brown)',
                          fontWeight: 600,
                        }}>{getLocalizedString(s.lengths, locale)}</td>
                        <td style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid var(--cream-dark)',
                          color: 'var(--mid-brown)',
                          fontWeight: 600,
                        }}>{getLocalizedString(s.weight, locale)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Lavender tip box */}
            <div style={{
              marginTop: 16,
              padding: '14px 18px',
              background: 'var(--lav-lt)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--mid-brown)',
              lineHeight: 1.6,
            }}>
              <strong style={{ fontWeight: 700, color: 'var(--warm-brown)' }}>Tip:</strong>{' '}
              {onSave && isEditable ? (
                <EditableText value={getLocalizedString(props.tip, locale) || ''} onSave={(val) => onSave(block.id, 'props.tip', val)} isEditable={isEditable} tag="span" className="" />
              ) : (
                <>{getLocalizedString(props.tip, locale)}</>
              )}
            </div>
          </div>

          {/* Right: image card */}
          {props.image && (
            <div style={{
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              border: '1px solid var(--cream-dark)',
            }}>
              <img
                src={props.image}
                alt="How to measure your dog"
                style={{
                  width: '100%',
                  height: 260,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                padding: '20px 22px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--warm-brown)',
                  marginBottom: 6,
                }}>
                  Measure with flexible tape.
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: 'var(--mid-brown)',
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}>
                  Or use shoelace around belly &amp; mark where it meets. Measure the shoelace.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
