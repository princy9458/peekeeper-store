'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import { getLocalizedString } from '@/lib/i18n/locale';
import EditableText from '@/components/cms/editable/EditableText';

interface MetricsSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function MetricsSection({ block, locale = 'en', isEditable = false, onSave }: MetricsSectionProps) {
  const title = block.props?.sectionTitle;
  const subtitle = block.props?.sectionSubtitle;
  const items = block.content || [];

  if (!items.length) return null;

  return (
    <div className="section-padding">
      <div className="container-custom">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && (onSave && isEditable ? (
              <EditableText
                value={getLocalizedString(title, locale)}
                onSave={(val) => onSave(block.id, 'props.sectionTitle', val)}
                isEditable={isEditable}
                tag="h2"
                className="text-3xl font-bold"
                placeholder="Section Title..."
              />
            ) : (
              <h2 className="text-3xl font-bold">{getLocalizedString(title, locale)}</h2>
            ))}
            {subtitle && (onSave && isEditable ? (
              <EditableText
                value={getLocalizedString(subtitle, locale)}
                onSave={(val) => onSave(block.id, 'props.sectionSubtitle', val)}
                isEditable={isEditable}
                tag="p"
                className="text-[var(--text-secondary)] mt-2"
                placeholder="Subtitle..."
              />
            ) : (
              <p className="text-[var(--text-secondary)] mt-2">{getLocalizedString(subtitle, locale)}</p>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item: any, idx: number) => (
            <div key={item.id} className="text-center">
              {onSave && isEditable ? (
                <EditableText
                  value={getLocalizedString(item.props?.value, locale) || ''}
                  onSave={(val) => onSave(block.id, `content.${idx}.props.value`, val)}
                  isEditable={isEditable}
                  tag="div"
                  className="text-3xl font-bold text-[var(--primary)]"
                  placeholder="Value..."
                />
              ) : (
                <div className="text-3xl font-bold text-[var(--primary)]">{getLocalizedString(item.props?.value, locale)}</div>
              )}
              {onSave && isEditable ? (
                <EditableText
                  value={getLocalizedString(item.props?.label, locale)}
                  onSave={(val) => onSave(block.id, `content.${idx}.props.label`, val)}
                  isEditable={isEditable}
                  tag="div"
                  className="text-sm text-[var(--text-secondary)] mt-1"
                  placeholder="Label..."
                />
              ) : (
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  {getLocalizedString(item.props?.label, locale)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
