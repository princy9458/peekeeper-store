'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setCurrentPage } from '@/redux/slices/pages/pagesSlice';
import { saveField } from '@/redux/slices/pages/saveField';
import SectionRenderer from '@/components/cms/renderer/SectionRenderer';
import type { PageBlock } from '@/redux/slices/pages/pageType';

interface CmsPageProps {
  slug: string;
  locale?: string;
  localePrefix?: string;
}

export default function CmsPage({ slug, locale = 'en', localePrefix = '' }: CmsPageProps) {
  const dispatch = useAppDispatch();
  const loadedSlugRef = useRef<string | null>(null);
  const currentPage = useAppSelector((state) => state.pages.currentPage);
  const isEditable = useAppSelector((state) => state.pages.editableMode);

  useEffect(() => {
    if (loadedSlugRef.current !== slug) {
      loadedSlugRef.current = slug;
      dispatch(setCurrentPage(slug));
    }
  }, [dispatch, slug]);

  const handleSave = useCallback(async (sectionId: string, fieldPath: string, value: string) => {
    await saveField(dispatch, currentPage, sectionId, fieldPath, value, locale);
  }, [dispatch, currentPage, locale]);

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
      </div>
    );
  }

  return (
    <SectionRenderer
      content={currentPage.content as PageBlock[] | undefined || []}
      locale={locale}
      localePrefix={localePrefix}
      isEditable={isEditable}
      onSave={handleSave}
    />
  );
}
