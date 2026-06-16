'use client';

import { useState } from 'react';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface FAQSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function FAQSection({ block, locale = 'en', isEditable = false, onSave }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const items = block.content || [];

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!items.length) return null;

  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <div className="space-y-3">
          {items.map((item: any, idx: number) => (
            <div key={item.id || idx} className="border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left font-medium hover:bg-[var(--surface)] transition-colors"
              >
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(item.props?.question, locale)}
                    onSave={(val) => onSave(block.id, `content.${idx}.props.question`, val)}
                    isEditable={isEditable}
                    tag="span"
                    className="flex-1 pr-4"
                    placeholder="Question..."
                  />
                ) : (
                  <span className="flex-1 pr-4">{getLocalizedString(item.props?.question, locale)}</span>
                )}
                <svg className={`w-5 h-5 text-[var(--text-secondary)] transition-transform ${openItems[item.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems[item.id] && (
                <div className="px-5 pb-5">
                  {onSave ? (
                    <EditableText
                      value={getLocalizedString(item.props?.answer, locale)}
                      onSave={(val) => onSave(block.id, `content.${idx}.props.answer`, val)}
                      isEditable={isEditable}
                      tag="p"
                      className="text-[var(--text-secondary)] leading-relaxed"
                      placeholder="Answer..."
                      multiline
                      rows={3}
                    />
                  ) : (
                    <p className="text-[var(--text-secondary)] leading-relaxed">{getLocalizedString(item.props?.answer, locale)}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
