'use client';

import { useState } from 'react';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface ContactFormSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function ContactFormSection({ block, locale = 'en', isEditable = false, onSave }: ContactFormSectionProps) {
  const props = block.props || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="section-padding pt-0">
      <div className="container-custom max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8">
            {onSave ? (
              <EditableText
                value={getLocalizedString(props.formHeading, locale) || ''}
                onSave={(val) => onSave(block.id, 'props.formHeading', val)}
                isEditable={isEditable}
                tag="h2"
                className="text-2xl font-bold mb-6"
                placeholder="Form Heading..."
              />
            ) : (
              <h2 className="text-2xl font-bold mb-6">{getLocalizedString(props.formHeading, locale)}</h2>
            )}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(props.nameLabel, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.nameLabel', val)}
                    isEditable={isEditable}
                    tag="label"
                    className="block text-sm font-medium mb-1.5"
                    placeholder="Name Label..."
                  />
                ) : (
                  <label className="block text-sm font-medium mb-1.5">{getLocalizedString(props.nameLabel, locale)}</label>
                )}
                <input
                  type="text"
                  className="form-input"
                  placeholder={getLocalizedString(props.namePlaceholder, locale)}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(props.emailLabel, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.emailLabel', val)}
                    isEditable={isEditable}
                    tag="label"
                    className="block text-sm font-medium mb-1.5"
                    placeholder="Email Label..."
                  />
                ) : (
                  <label className="block text-sm font-medium mb-1.5">{getLocalizedString(props.emailLabel, locale)}</label>
                )}
                <input
                  type="email"
                  className="form-input"
                  placeholder={getLocalizedString(props.emailPlaceholder, locale)}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(props.messageLabel, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.messageLabel', val)}
                    isEditable={isEditable}
                    tag="label"
                    className="block text-sm font-medium mb-1.5"
                    placeholder="Message Label..."
                  />
                ) : (
                  <label className="block text-sm font-medium mb-1.5">{getLocalizedString(props.messageLabel, locale)}</label>
                )}
                <textarea
                  className="form-input"
                  rows={5}
                  placeholder={getLocalizedString(props.messagePlaceholder, locale)}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(props.buttonText, locale) || ''}
                    onSave={(val) => onSave(block.id, 'props.buttonText', val)}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="Button Text..."
                  />
                ) : getLocalizedString(props.buttonText, locale)}
              </button>
            </form>
          </div>
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-8">
            {onSave ? (
              <EditableText
                value={getLocalizedString(props.contactInfoHeading, locale) || ''}
                onSave={(val) => onSave(block.id, 'props.contactInfoHeading', val)}
                isEditable={isEditable}
                tag="h2"
                className="text-2xl font-bold mb-6"
                placeholder="Contact Info Heading..."
              />
            ) : (
              <h2 className="text-2xl font-bold mb-6">{getLocalizedString(props.contactInfoHeading, locale)}</h2>
            )}
            <div className="space-y-6">
              {props.contactMethods?.map((method: any, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <svg className="w-5 h-5 mt-1 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d={method.iconPath} />
                  </svg>
                  <div>
                    {onSave ? (
                      <EditableText
                        value={getLocalizedString(method.label, locale) || ''}
                        onSave={(val) => onSave(block.id, `props.contactMethods.${i}.label`, val)}
                        isEditable={isEditable}
                        tag="p"
                        className="font-medium"
                        placeholder="Label..."
                      />
                    ) : (
                      <p className="font-medium">{getLocalizedString(method.label, locale)}</p>
                    )}
                    {method.href ? (
                      <a href={method.href} className="text-[var(--primary)]">
                        {onSave ? (
                          <EditableText
                            value={getLocalizedString(method.value, locale) || ''}
                            onSave={(val) => onSave(block.id, `props.contactMethods.${i}.value`, val)}
                            isEditable={isEditable}
                            tag="span"
                            placeholder="Value..."
                          />
                        ) : (
                          getLocalizedString(method.value, locale)
                        )}
                      </a>
                    ) : (
                      <p className="text-[var(--text-secondary)]">
                        {onSave ? (
                          <EditableText
                            value={getLocalizedString(method.value, locale) || ''}
                            onSave={(val) => onSave(block.id, `props.contactMethods.${i}.value`, val)}
                            isEditable={isEditable}
                            tag="span"
                            placeholder="Value..."
                          />
                        ) : (
                          getLocalizedString(method.value, locale)
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
