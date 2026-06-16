'use client';

import { useState } from 'react';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface NewsletterSectionProps {
  block: PageBlock;
  locale?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function NewsletterSection({ block, locale = 'en', isEditable = false, onSave }: NewsletterSectionProps) {
  const props = block.props || {};
  const [name, setName] = useState('');
  const [dogName, setDogName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setName('');
    setDogName('');
    setEmail('');
  };

  return (
    <section className="nl-wrapper" style={{ padding: '70px 0' }}>
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)', top: -150, right: -100, pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 250, height: 250, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)', bottom: -80, left: -60, pointerEvents: 'none',
      }} />
      <div className="container-custom nl-inner">
        <div>
          {onSave ? (
            <EditableText
              value={getLocalizedString(props.heading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.heading', val)}
              isEditable={isEditable}
              tag="h2"
              placeholder="Heading..."
            />
          ) : (
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--warm-brown)', lineHeight: 1.1, marginBottom: 14 }}>
              {getLocalizedString(props.heading, locale)}
            </h2>
          )}
          {onSave ? (
            <EditableText
              value={getLocalizedString(props.subheading, locale) || ''}
              onSave={(val) => onSave(block.id, 'props.subheading', val)}
              isEditable={isEditable}
              tag="p"
              placeholder="Subheading..."
            />
          ) : (
            <p style={{ fontSize: 15, color: 'rgba(61,46,46,0.7)', lineHeight: 1.7, marginBottom: 20 }}>
              {getLocalizedString(props.subheading, locale)}
            </p>
          )}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {props.perks?.map((perk: string, i: number) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: 'rgba(61,46,46,0.65)' }}>
                <svg width="13" height="13" fill="none" stroke="var(--rose)" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {onSave ? (
                  <EditableText
                    value={getLocalizedString(perk, locale) || ''}
                    onSave={(val) => onSave(block.id, `props.perks.${i}`, val)}
                    isEditable={isEditable}
                    tag="span"
                    placeholder="Perk..."
                  />
                ) : (
                  getLocalizedString(perk, locale)
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {subscribed ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', background: 'rgba(255,255,255,0.3)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
              <svg width="40" height="40" fill="none" stroke="var(--rose)" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--warm-brown)', marginTop: 14 }}>Welcome to the Family!</h3>
              <p style={{ color: 'rgba(61,46,46,0.7)', fontSize: 14 }}>Check your inbox for 10% off your first order.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <input type="text" placeholder={getLocalizedString(props.placeholderName, locale)} value={name}
                  onChange={e => setName(e.target.value)} required
                  style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: 'var(--radius-full)', padding: '13px 20px', color: 'var(--warm-brown)', fontSize: 14, fontWeight: 600, outline: 'none', backdropFilter: 'blur(8px)' }} />
                <input type="text" placeholder={getLocalizedString(props.placeholderDog, locale)} value={dogName}
                  onChange={e => setDogName(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: 'var(--radius-full)', padding: '13px 20px', color: 'var(--warm-brown)', fontSize: 14, fontWeight: 600, outline: 'none', backdropFilter: 'blur(8px)' }} />
              </div>
              <input type="email" placeholder={getLocalizedString(props.placeholderEmail, locale)} value={email}
                onChange={e => setEmail(e.target.value)} required
                style={{ background: 'rgba(255,255,255,0.6)', border: '1.5px solid rgba(255,255,255,0.8)', borderRadius: 'var(--radius-full)', padding: '13px 20px', color: 'var(--warm-brown)', fontSize: 14, fontWeight: 600, outline: 'none', backdropFilter: 'blur(8px)' }} />
              <button type="submit" style={{
                background: 'var(--warm-brown)', color: 'white', fontSize: 14, fontWeight: 800,
                letterSpacing: '0.07em', textTransform: 'uppercase', padding: '14px 28px',
                borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'background 0.28s, transform 0.28s, box-shadow 0.28s',
              }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22l-4-9-9-4z" />
                </svg>
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
              {onSave ? (
                <EditableText
                  value={getLocalizedString(props.disclaimer, locale) || ''}
                  onSave={(val) => onSave(block.id, 'props.disclaimer', val)}
                  isEditable={isEditable}
                  tag="p"
                  placeholder="Disclaimer..."
                />
              ) : (
                <p style={{ fontSize: 11, color: 'rgba(61,46,46,0.5)', lineHeight: 1.6 }}>
                  {getLocalizedString(props.disclaimer, locale)}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
