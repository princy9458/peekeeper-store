'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { PageBlock } from '@/redux/slices/pages/pageType';
import EditableText from '@/components/cms/editable/EditableText';
import { getLocalizedString } from '@/lib/i18n/locale';

interface ARToolSectionProps {
  block: PageBlock;
  locale?: string;
  localePrefix?: string;
  isEditable?: boolean;
  onSave?: (sectionId: string, fieldPath: string, value: string) => void;
}

export default function ARToolSection({ block, locale = 'en', localePrefix = '', isEditable = false, onSave }: ARToolSectionProps) {
  const props = block.props || {};
  const [waist, setWaist] = useState('');
  const [length, setLength] = useState('');
  const [result, setResult] = useState<{ size: string; lengths: string } | null>(null);
  const [camActive, setCamActive] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [scanY, setScanY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animRef = useRef<number | null>(null);

  const calcSize = useCallback(() => {
    const w = parseFloat(waist);
    if (!w || w < 5) { setResult(null); return; }
    let size: string, lengths: string;
    if (w >= 9 && w <= 12) { size = 'Extra Small (XS)'; lengths = '10" – 12"'; }
    else if (w >= 13 && w <= 16) { size = 'Small (SM)'; lengths = '12" – 16"'; }
    else if (w >= 17 && w <= 21) { size = 'Medium (MED)'; lengths = '14" – 18"'; }
    else if (w < 9) { size = 'Too Small'; lengths = 'Contact us'; }
    else { size = 'Too Large'; lengths = 'Contact us'; }
    setResult({ size, lengths });
  }, [waist]);

  useEffect(() => { calcSize(); }, [calcSize]);

  useEffect(() => {
    if (!demoMode) return;
    let y = 0, dir = 1;
    const animate = () => {
      y += 1.5 * dir;
      if (y >= 300) dir = -1;
      if (y <= 10) dir = 1;
      setScanY(y);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [demoMode]);

  const toggleCamera = async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setCamActive(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCamActive(true);
      setDemoMode(false);
    } catch {
      setDemoMode(true);
      setCamActive(false);
    }
  };

  const toggleDemo = () => {
    setDemoMode(d => !d);
    if (camActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        if (videoRef.current) videoRef.current.srcObject = null;
      }
      setCamActive(false);
    }
  };

  return (
    <section className="ar-wrapper" style={{ padding: '80px 0' }} id="ar-tool">
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='rgba(242,184,198,0.08)' stroke-width='1'/%3E%3C/svg%3E")`,
        pointerEvents: 'none',
      }} />
      <div className="ar-inner" style={{
        maxWidth: 'var(--container)', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2,
      }}>
        <div>
          <div className="sec-tag" style={{ color: 'var(--blush)', marginBottom: 16 }}>
            <span style={{ background: 'rgba(242,184,198,0.4)' }} />
            {isEditable && onSave ? (
              <EditableText value={getLocalizedString(props.tag, locale) || ''} onSave={(val) => onSave(block.id, 'props.tag', val)} isEditable={isEditable} tag="span" className="" />
            ) : (
              <span>{getLocalizedString(props.tag, locale)}</span>
            )}
            <span style={{ background: 'rgba(242,184,198,0.4)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(30px, 4vw, 50px)', color: 'white', lineHeight: 1.1, marginBottom: 18 }}>
            Find the Perfect Fit with <em style={{ color: 'var(--blush)', fontStyle: 'italic' }}>AR Preview</em>
          </h2>
          {isEditable && onSave ? (
            <EditableText value={getLocalizedString(props.subheading, locale) || ''} onSave={(val) => onSave(block.id, 'props.subheading', val)} isEditable={isEditable} tag="p" className="" />
          ) : (
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 28 }}>{getLocalizedString(props.subheading, locale)}</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {props.steps?.map((step: any, i: number) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)',
                padding: '14px 18px', border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--rose)',
                  color: 'white', fontSize: 12, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>{getLocalizedString(step.number, locale)}</div>
                {isEditable && onSave ? (
                  <EditableText value={getLocalizedString(step.text, locale) || ''} onSave={(val) => onSave(block.id, `props.steps.${i}.text`, val)} isEditable={isEditable} tag="p" className="" />
                ) : (
                  <p style={{ fontSize: 13, margin: 0, lineHeight: 1.5, color: 'white' }}>{getLocalizedString(step.text, locale)}</p>
                )}
              </div>
            ))}
          </div>
          <button onClick={toggleCamera} className="ar-launch-btn" style={{
            background: 'var(--rose)', color: 'white', fontSize: 15, fontWeight: 800,
            letterSpacing: '0.07em', textTransform: 'uppercase', padding: '16px 36px',
            borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center',
            gap: 10, border: 'none', cursor: 'pointer', transition: 'background 0.28s, transform 0.28s, box-shadow 0.28s',
          }}>
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 3l-4 4-4-4M8 21v-2M16 21v-2" />
            </svg>
            {camActive ? 'Stop Camera' : 'Launch AR Camera'}
          </button>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 18px', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
              PeeKeeper AR Size Finder
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
            </div>
          </div>

          <div id="arViewport" style={{
            position: 'relative', height: 320,
            background: demoMode ? 'linear-gradient(135deg, #1a1a2e 0%, #2d1b32 50%, #1a2a1a 100%)' : '#0D0D0D',
            overflow: 'hidden',
          }}>
            <video ref={videoRef} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1, display: camActive ? 'block' : 'none',
            }} autoPlay muted playsInline />

            {!camActive && !demoMode && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: 20 }}>
                  <svg width="60" height="60" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 3l-4 4-4-4M8 21v-2M16 21v-2" />
                  </svg>
                  <p style={{ fontSize: 13 }}>Click &quot;Launch AR Camera&quot; to begin<br />or enter measurements manually below</p>
                </div>
              </div>
            )}

            {(camActive || demoMode) && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
                <svg viewBox="0 0 540 320" style={{ width: '100%', height: '100%' }}>
                  <ellipse cx="270" cy="190" rx="140" ry="75" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="8,5" />
                  <path className="ar-line" d="M210 170 Q270 145 330 170" fill="none" stroke="#F2B8C6" strokeWidth="2.5" strokeDasharray="6,4" />
                  <circle cx="210" cy="170" r="5" fill="#F2B8C6" className="ar-line" />
                  <circle cx="330" cy="170" r="5" fill="#F2B8C6" className="ar-line" />
                  <rect x="230" y="132" width="82" height="24" rx="5" fill="rgba(217,84,122,0.85)" />
                  <text x="271" y="149" textAnchor="middle" fill="white" fontSize="11" fontFamily="Nunito,sans-serif" fontWeight="700">WAIST</text>
                  <line x1="210" y1="165" x2="210" y2="178" stroke="#F2B8C6" strokeWidth="2" className="ar-line" />
                  <line x1="330" y1="165" x2="330" y2="178" stroke="#F2B8C6" strokeWidth="2" className="ar-line" />
                  <line className="ar-line" x1="150" y1="190" x2="385" y2="190" stroke="#B4CDB0" strokeWidth="2.5" strokeDasharray="6,4" />
                  <circle cx="150" cy="190" r="5" fill="#8BAF85" className="ar-line" />
                  <circle cx="385" cy="190" r="5" fill="#8BAF85" className="ar-line" />
                  <rect x="228" y="196" width="84" height="24" rx="5" fill="rgba(90,140,84,0.85)" />
                  <text x="270" y="213" textAnchor="middle" fill="white" fontSize="11" fontFamily="Nunito,sans-serif" fontWeight="700">LENGTH</text>
                  <line x1="150" y1="183" x2="150" y2="200" stroke="#8BAF85" strokeWidth="2" className="ar-line" />
                  <line x1="385" y1="183" x2="385" y2="200" stroke="#8BAF85" strokeWidth="2" className="ar-line" />
                  <path d="M30 30 L30 60 M30 30 L60 30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <path d="M510 30 L510 60 M510 30 L480 30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <path d="M30 290 L30 260 M30 290 L60 290" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  <path d="M510 290 L510 260 M510 290 L480 290" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                  {demoMode && (
                    <line x1="0" y1={scanY} x2="540" y2={scanY} stroke="rgba(242,184,198,0.4)" strokeWidth="1.5" />
                  )}
                </svg>
              </div>
            )}
          </div>

          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Waist (inches)</label>
                <input type="number" placeholder="e.g. 14" min={5} max={30} value={waist}
                  onChange={e => setWaist(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '9px 13px', color: 'white', fontSize: 14, fontWeight: 600, outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Length (inches)</label>
                <input type="number" placeholder="e.g. 15" min={8} max={25} value={length}
                  onChange={e => setLength(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '9px 13px', color: 'white', fontSize: 14, fontWeight: 600, outline: 'none' }} />
              </div>
            </div>

            {result && (
              <div style={{
                background: 'rgba(217,84,122,0.15)', border: '1px solid rgba(217,84,122,0.3)',
                borderRadius: 'var(--radius-sm)', padding: '12px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Recommended Size</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--blush)' }}>{result.size}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>Available Lengths</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>{result.lengths}</div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={toggleCamera} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: 11, borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 800,
                letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer',
                border: 'none', background: 'var(--rose)', color: 'white',
              }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 3l-4 4-4-4" />
                </svg>
                {camActive ? 'Stop Camera' : 'Start Camera'}
              </button>
              <button onClick={toggleDemo} style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: 11, borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 800,
                letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)',
              }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {demoMode ? 'Hide Demo' : 'Show Demo'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
