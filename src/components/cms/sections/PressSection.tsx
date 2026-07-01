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

  const renderMagazineCard = (logo: any, idx: number) => (
    <div key={idx} style={{
      width: 240,
      height: 340,
      background: 'white',
      border: '12px solid white',
      boxShadow: '0 15px 35px rgba(217, 84, 122, 0.55)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.28s, box-shadow 0.28s',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.03) translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(217, 84, 122, 0.7)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 15px 35px rgba(217, 84, 122, 0.55)';
    }}>
      <img 
        src={logo.src} 
        alt={getLocalizedString(logo.alt, locale)} 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }} 
      />
    </div>
  );

  return (
    <section style={{ padding: '80px 0', background: 'white' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          {onSave && isEditable ? (
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
          {onSave && isEditable ? (
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
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 48,
        }}>
          {/* Row 1: 4 items */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 48,
            width: '100%',
          }}>
            {logos.slice(0, 4).map((logo: any, i: number) => renderMagazineCard(logo, i))}
          </div>

          {/* Row 2: 3 items */}
          {logos.length > 4 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 48,
              width: '100%',
            }}>
              {logos.slice(4, 7).map((logo: any, i: number) => renderMagazineCard(logo, i + 4))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
