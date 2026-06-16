'use client';

import Link from 'next/link';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import { getLocalizedString } from '@/lib/i18n/locale';
import EditableText from '@/components/cms/editable/EditableText';

interface CTASectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function CTASection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: CTASectionProps) {
  const title = block.props?.title;
  const subtitle = block.props?.subtitle;
  const buttonText = block.props?.buttonText;
  const buttonLink = block.props?.buttonLink;

  if (!title && !subtitle) return null;

  return (
    <div className="section-padding">
      <div className="container-custom text-center">
        {title && (onSave ? (
          <EditableText
            value={getLocalizedString(title, locale)}
            onSave={(val) => onSave(block.id, 'props.title', val)}
            isEditable={isEditable}
            tag="h2"
            className="text-3xl font-bold"
            placeholder="Title..."
          />
        ) : (
          <h2 className="text-3xl font-bold">{getLocalizedString(title, locale)}</h2>
        ))}
        {subtitle && (onSave ? (
          <EditableText
            value={getLocalizedString(subtitle, locale)}
            onSave={(val) => onSave(block.id, 'props.subtitle', val)}
            isEditable={isEditable}
            tag="p"
            className="text-[var(--text-secondary)] mt-3 max-w-xl mx-auto"
            placeholder="Subtitle..."
          />
        ) : (
          <p className="text-[var(--text-secondary)] mt-3 max-w-xl mx-auto">{getLocalizedString(subtitle, locale)}</p>
        ))}
        {buttonText && buttonLink && (
          <Link href={`${localePrefix}${buttonLink}`} className="btn-primary mt-6 inline-block">
            {onSave ? (
              <EditableText
                value={getLocalizedString(buttonText, locale)}
                onSave={(val) => onSave(block.id, 'props.buttonText', val)}
                isEditable={isEditable}
                tag="span"
                className=""
                placeholder="Button Text..."
              />
            ) : (
              <>{getLocalizedString(buttonText, locale)}</>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
