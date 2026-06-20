'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface FeaturesBentoSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function FeaturesBentoSection({ block, locale = 'en', isEditable = false, onSave }: FeaturesBentoSectionProps) {
  const props = block.props || {};
  const items = props.items || [];

  const iconMap: Record<string, React.ReactNode> = {
    shield: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    box: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
    globe: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" /><path d="M10.5 21.39a10.9 10.9 0 0 1-8.5-8.5" /></svg>,
    'credit-card': <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
  };

  const iconColors: Record<string, string> = {
    rose: 'var(--rose)', sage: 'var(--sage-dk)', lav: 'var(--lavender)',
  };

  const iconBgColors: Record<string, string> = {
    rose: 'rgba(217,84,122,0.1)',
    sage: 'rgba(139,175,133,0.15)',
    lav: 'rgba(196,181,212,0.2)',
  };

  if (!items.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          {isEditable && onSave ? (
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
          {isEditable && onSave ? (
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
        </div>
        <div className="features-bento">
          {items.map((item: any, i: number) => {
            const isLarge = item.layout === 'large';
            const iconColor = iconColors[item.iconColor] || 'var(--rose)';
            const iconBg = iconBgColors[item.iconColor] || 'rgba(217,84,122,0.1)';

            return (
              <div key={item.id || i} className={`${isLarge ? 'feature-card-large' : ''} feature-card-hover`} style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: isLarge ? '32px 30px' : '32px 30px',
                border: '1px solid var(--cream-dark)',
                transition: 'transform 0.28s, box-shadow 0.28s',
              }}>
                {isLarge && item.image && (
                  <img src={item.image} alt="" style={{
                    width: 220, height: 200, objectFit: 'cover',
                    borderRadius: 'var(--radius-md)', flexShrink: 0,
                  }} />
                )}
                <div>
                  <div style={{
                    width: 52, height: 52, borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginBottom: 18, background: iconBg, color: iconColor,
                  }}>
                    {iconMap[item.icon] || iconMap.shield}
                  </div>
                  {onSave ? (
                    <EditableText
                      value={getLocalizedString(item.title, locale) || ''}
                      onSave={(val) => onSave(block.id, `props.items.${i}.title`, val)}
                      isEditable={isEditable}
                      tag="h3"
                      className=""
                      placeholder="Feature Title..."
                    />
                  ) : (
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--warm-brown)', marginBottom: 10 }}>{getLocalizedString(item.title, locale)}</h3>
                  )}
                  {onSave ? (
                    <EditableText
                      value={getLocalizedString(item.description, locale) || ''}
                      onSave={(val) => onSave(block.id, `props.items.${i}.description`, val)}
                      isEditable={isEditable}
                      tag="p"
                      className=""
                      placeholder="Feature Description..."
                    />
                  ) : (
                    <p style={{ fontSize: 14, color: 'var(--mid-brown)', lineHeight: 1.7 }}>{getLocalizedString(item.description, locale)}</p>
                  )}
                  {item.linkText && (
                    <a href={item.linkHref} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 800, color: 'var(--rose)', marginTop: 14,
                    }}>
                      {onSave ? (
                        <EditableText
                          value={getLocalizedString(item.linkText, locale) || ''}
                          onSave={(val) => onSave(block.id, `props.items.${i}.linkText`, val)}
                          isEditable={isEditable}
                          tag="span"
                          className=""
                          placeholder="Link Text..."
                        />
                      ) : (
                        <>{getLocalizedString(item.linkText, locale)}</>
                      )}
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
