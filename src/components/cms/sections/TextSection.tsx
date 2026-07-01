'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface TextSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function TextSection({ block, locale = 'en', isEditable = false, onSave }: TextSectionProps) {
  const heading = block.props?.heading;
  const content = block.props?.content;
  const alignment = block.props?.alignment || 'left';

  if (!heading && !content) return null;

  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        {heading && (
          <div className={`text-center mb-8`} style={{ textAlign: alignment === 'center' ? 'center' : 'left' }}>
            {onSave && isEditable ? (
              <EditableText
                value={getLocalizedString(heading, locale)}
                onSave={(val) => onSave(block.id, 'props.heading', val)}
                isEditable={isEditable}
                tag="h1"
                className="text-4xl font-bold"
                placeholder="Heading..."
              />
            ) : (
              <h1 className="text-4xl font-bold">{getLocalizedString(heading, locale)}</h1>
            )}
            {content && (
              <>
                {onSave && isEditable ? (
                  <EditableText
                    value={getLocalizedString(content, locale)}
                    onSave={(val) => onSave(block.id, 'props.content', val)}
                    isEditable={isEditable}
                    tag="div"
                    className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line mt-4"
                    placeholder="Content..."
                    multiline
                    rows={6}
                  />
                ) : (
                  <div className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line mt-4">
                    {getLocalizedString(content, locale)}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
