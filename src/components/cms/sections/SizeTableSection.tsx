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

export default function SizeTableSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: SizeTableSectionProps) {
  const props = block.props || {};
  const sizes = props.sizes || [];

  const sizeTagStyles: Record<string, { bg: string; color: string }> = {
    XS: { bg: 'var(--lav-lt)', color: '#7A5CA0' },
    SM: { bg: 'rgba(139,175,133,0.2)', color: 'var(--sage-dk)' },
    MED: { bg: 'rgba(217,84,122,0.1)', color: 'var(--rose)' },
  };

  if (!sizes.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          {onSave ? (
            <EditableText value={getLocalizedString(props.tag, locale) || ''} onSave={(val) => onSave(block.id, 'props.tag', val)} isEditable={isEditable} tag="div" className="sec-tag" />
          ) : (
            <div className="sec-tag">{getLocalizedString(props.tag, locale)}</div>
          )}
          {onSave ? (
            <EditableText value={getLocalizedString(props.heading, locale) || ''} onSave={(val) => onSave(block.id, 'props.heading', val)} isEditable={isEditable} tag="h2" className="sec-title" placeholder="Heading..." />
          ) : (
            <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: getLocalizedString(props.heading, locale) }} />
          )}
          {onSave ? (
            <EditableText value={getLocalizedString(props.subheading, locale) || ''} onSave={(val) => onSave(block.id, 'props.subheading', val)} isEditable={isEditable} tag="p" className="sec-sub" />
          ) : (
            <p className="sec-sub">{getLocalizedString(props.subheading, locale)}</p>
          )}
        </div>
        <div className="size-table-inner">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  {onSave ? (
                    <EditableText value={getLocalizedString(props.sizeHeader, locale) || 'Size'} onSave={(val) => onSave(block.id, 'props.sizeHeader', val)} isEditable={isEditable} tag="th" className="" />
                  ) : (
                    <th style={{ background: 'var(--rose)', color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left', borderRadius: 'var(--radius-sm) 0 0 0' }}>Size</th>
                  )}
                  {onSave ? (
                    <EditableText value={getLocalizedString(props.waistHeader, locale) || 'Waist'} onSave={(val) => onSave(block.id, 'props.waistHeader', val)} isEditable={isEditable} tag="th" className="" />
                  ) : (
                    <th style={{ background: 'var(--rose)', color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>Waist</th>
                  )}
                  {onSave ? (
                    <EditableText value={getLocalizedString(props.lengthHeader, locale) || 'Available Lengths'} onSave={(val) => onSave(block.id, 'props.lengthHeader', val)} isEditable={isEditable} tag="th" className="" />
                  ) : (
                    <th style={{ background: 'var(--rose)', color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left' }}>Available Lengths</th>
                  )}
                  {onSave ? (
                    <EditableText value={getLocalizedString(props.weightHeader, locale) || 'Weight'} onSave={(val) => onSave(block.id, 'props.weightHeader', val)} isEditable={isEditable} tag="th" className="" />
                  ) : (
                    <th style={{ background: 'var(--rose)', color: 'white', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 18px', textAlign: 'left', borderRadius: '0 var(--radius-sm) 0 0' }}>Weight</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sizes.map((s: any, i: number) => {
                  const tagStyle = sizeTagStyles[s.tag] || sizeTagStyles.XS;
                  return (
                    <tr key={i}>
                      <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--cream-dark)', color: 'var(--mid-brown)', fontWeight: 600 }}>
                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', background: tagStyle.bg, color: tagStyle.color }}>{getLocalizedString(s.name, locale)}</span>
                      </td>
                      <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--cream-dark)', color: 'var(--mid-brown)', fontWeight: 600 }}>{getLocalizedString(s.waist, locale)}</td>
                      <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--cream-dark)', color: 'var(--mid-brown)', fontWeight: 600 }}>{getLocalizedString(s.lengths, locale)}</td>
                      <td style={{ padding: '14px 18px', borderBottom: '1px solid var(--cream-dark)', color: 'var(--mid-brown)', fontWeight: 600 }}>{getLocalizedString(s.weight, locale)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ marginTop: 14, padding: 14, background: 'var(--lav-lt)', borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--mid-brown)' }}>
              {onSave ? (
                <EditableText value={getLocalizedString(props.tipPrefix, locale) || 'Tip:'} onSave={(val) => onSave(block.id, 'props.tipPrefix', val)} isEditable={isEditable} tag="strong" className="" />
              ) : (
                <strong>Tip:</strong>
              )} {onSave ? (
                <EditableText value={getLocalizedString(props.tip, locale) || ''} onSave={(val) => onSave(block.id, 'props.tip', val)} isEditable={isEditable} tag="span" className="" />
              ) : (
                <>{getLocalizedString(props.tip, locale)}</>
              )}
            </div>
          </div>
          {props.image && (
            <img src={props.image} alt="How to measure your dog" style={{
              borderRadius: 'var(--radius-lg)', width: '100%', maxHeight: 340,
              objectFit: 'cover', boxShadow: 'var(--shadow-md)',
            }} />
          )}
        </div>
      </div>
    </section>
  );
}
