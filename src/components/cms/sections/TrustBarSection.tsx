'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface TrustBarSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function TrustBarSection({ block, locale = 'en', isEditable = false, onSave }: TrustBarSectionProps) {
  const items = block.props?.items || [];

  const icons: Record<string, React.ReactNode> = {
    card: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="22" height="18" rx="2" /><path d="m1 9h22" /></svg>,
    shield: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    globe: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg>,
    phone: <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.7a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  };

  if (!items.length) return null;

  return (
    <section style={{ background: 'var(--white)', borderTop: '1px solid var(--cream-dark)', borderBottom: '1px solid var(--cream-dark)' }}>
      <div className="trust-grid-4" style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        {items.map((item: any, i: number) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '22px 24px',
            borderRight: i < items.length - 1 ? '1px solid var(--cream-dark)' : 'none',
          }}>
            <div style={{
              width: 46, height: 46, flexShrink: 0,
              background: 'linear-gradient(135deg, var(--lav-lt), var(--cream))',
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--rose)',
            }}>
              {icons[item.icon] || icons.card}
            </div>
            <div>
              {isEditable && onSave ? (
                <EditableText
                  value={getLocalizedString(item.title, locale) || ''}
                  onSave={(val) => onSave(block.id, `props.items.${i}.title`, val)}
                  isEditable={isEditable}
                  tag="h4"
                  placeholder="Title..."
                />
              ) : (
                <h4 style={{ fontSize: 14, fontWeight: 800, color: 'var(--warm-brown)', marginBottom: 2 }}>{getLocalizedString(item.title, locale)}</h4>
              )}
              {isEditable && onSave ? (
                <EditableText
                  value={getLocalizedString(item.description, locale) || ''}
                  onSave={(val) => onSave(block.id, `props.items.${i}.description`, val)}
                  isEditable={isEditable}
                  tag="p"
                  placeholder="Description..."
                />
              ) : (
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{getLocalizedString(item.description, locale)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
