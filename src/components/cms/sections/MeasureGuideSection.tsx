'use client';

import type { PageBlock } from '@/redux/slices/pages/pageType';
import { getLocalizedString } from '@/lib/i18n/locale';

interface MeasureGuideSectionProps {
  block: PageBlock;
  locale?: string;
}

export default function MeasureGuideSection({ block, locale = 'en' }: MeasureGuideSectionProps) {
  const props = block.props || {};
  const steps = props.steps || [];
  const tools = props.tools || [];

  if (!steps.length) return null;

  return (
    <section style={{ padding: '80px 0', background: 'var(--white)' }}>
      <div className="container-custom" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 className="sec-title">{getLocalizedString(props.sectionTitle, locale)}</h2>
        </div>

        {tools.length > 0 && (
          <div style={{
            background: 'var(--lav-lt)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 28px',
            marginBottom: 40,
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
          }}>
            {tools.map((tool: any, i: number) => (
              <div key={i} style={{ flex: 1, minWidth: 200 }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                  display: 'block',
                  marginBottom: 4,
                }}>{getLocalizedString(tool.label, locale)}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--warm-brown)',
                  display: 'block',
                  marginBottom: 4,
                }}>{getLocalizedString(tool.tool, locale)}</span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  display: 'block',
                }}>{getLocalizedString(tool.note, locale)}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {steps.map((step: any, i: number) => (
            <div key={i} style={{
              display: 'flex',
              gap: 24,
              alignItems: 'flex-start',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              overflow: 'hidden',
            }}>
              <div style={{
                flexShrink: 0,
                width: 60,
                height: 60,
                background: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: 24,
                fontWeight: 700,
              }}>{i + 1}</div>
              <div style={{ padding: '20px 24px 20px 0', flex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 18,
                  color: 'var(--warm-brown)',
                  marginBottom: 8,
                }}>{getLocalizedString(step.title, locale)}</h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>{getLocalizedString(step.description, locale)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
