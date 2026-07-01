'use client';

import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setEditableMode } from '@/redux/slices/pages/pagesSlice';
import { usePathname } from 'next/navigation';

export default function EditModeToggle() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isEditable = useAppSelector((state) => state.pages.editableMode);
  const isLegacyProductPage = pathname.includes('/shop/') && pathname.split('/').filter(Boolean).length >= 3;

  if (isLegacyProductPage) return null;

  return (
    <button
      onClick={() => dispatch(setEditableMode(!isEditable))}
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 50,
        padding: '8px 18px',
        borderRadius: 9999,
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.04em',
        border: '1px solid rgba(255,255,255,0.3)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: isEditable ? '#16a34a' : 'var(--rose)',
        color: '#fff',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isEditable ? '#15803d' : 'var(--rose-dk)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isEditable ? '#16a34a' : 'var(--rose)';
      }}
    >
      {isEditable ? 'Edit Mode ON' : 'Edit Mode OFF'}
    </button>
  );
}
