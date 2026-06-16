import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PagesState, Page } from './pageType';
import type { RootState } from '@/redux/store';
import { loadPageData, loadAllPages } from '@/components/cms/loader';

const allPagesData = loadAllPages();

console.log('JSON Loaded - all CMS page files loaded into Redux');

const initialState: PagesState = {
  allPages: allPagesData,
  currentPage: null,
  editableMode: false,
};

console.log('Redux Updated - pages reducer initialized with', Object.keys(initialState.allPages).length, 'pages');

const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

const deepSetValue = (obj: any, path: string[], value: any): boolean => {
  if (path.length === 0) return false;
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
    if (typeof current !== 'object') return false;
  }
  const lastKey = path[path.length - 1];
  current[lastKey] = value;
  return true;
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      const foundPage = state.allPages[slug];
      state.currentPage = foundPage ? deepClone(foundPage) : null;
      console.log('[CMS] currentPage loaded - slug:', slug, 'content blocks:', state.currentPage?.content?.length ?? 0);
    },
    setEditableMode: (state, action: PayloadAction<boolean>) => {
      state.editableMode = action.payload;
    },
    updatePageField: (state, action: PayloadAction<{
      sectionId: string;
      fieldPath: string;
      value: string;
      locale?: string;
    }>) => {
      const { sectionId, fieldPath, value, locale = 'en' } = action.payload;
      if (!state.currentPage?.content || !Array.isArray(state.currentPage.content)) return;
      const sectionIndex = state.currentPage.content.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return;
      const pathParts = fieldPath.split('.');
      pathParts.push(locale);
      const updatedPage = deepClone(state.currentPage);
      const sectionToUpdate = (updatedPage.content as any[])[sectionIndex];
      const success = deepSetValue(sectionToUpdate, pathParts, value);
      if (success) {
        state.currentPage = updatedPage as Page;
        const pageInAll = state.allPages[updatedPage.slug];
        if (pageInAll) {
          const updatedAllPages = deepClone(state.allPages);
          const allPageSection = (updatedAllPages[updatedPage.slug].content as any[])?.find(s => s.id === sectionId);
          if (allPageSection) {
            deepSetValue(allPageSection, pathParts, value);
          }
          state.allPages = updatedAllPages;
        }
      }
    },
    refreshCurrentPage: (state) => {
      if (state.currentPage) {
        const refreshed = state.allPages[state.currentPage.slug];
        if (refreshed) {
          state.currentPage = deepClone(refreshed);
        }
      }
    },
  },
});

export const selectPageContent = (state: RootState, slug: string, locale: string): any => {
  const page = state.pages.allPages[slug];
  return page?.content || null;
};

export const { setCurrentPage, setEditableMode, updatePageField, refreshCurrentPage } = pagesSlice.actions;
export default pagesSlice.reducer;
