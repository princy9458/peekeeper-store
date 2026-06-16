'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface PressSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function PressSection({ block, locale = 'en', isEditable = false, onSave }: PressSectionProps) {
  const props = block.props || {};
  const logos = props.logos || [];

  if (!logos.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
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
              className="sec-title"
              placeholder="Heading..."
            />
          ) : (
            <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: getLocalizedString(props.heading, locale) }} />
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          {logos.map((logo: any, i: number) => (
            <div key={i} className="press-item-hover" style={{
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
              border: '1px solid var(--cream-dark)', background: 'white',
              padding: 14, transition: 'box-shadow 0.28s, transform 0.28s',
              filter: 'grayscale(0.5) opacity(0.7)', cursor: 'pointer',
            }}>
              <img src={logo.src} alt={getLocalizedString(logo.alt, locale)} className="press-img" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
