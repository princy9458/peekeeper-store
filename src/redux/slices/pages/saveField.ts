import type { Dispatch } from '@reduxjs/toolkit';
import { updatePageField } from './pagesSlice';
import type { Page } from './pageType';

export const saveField = (
  dispatch: Dispatch,
  currentPage: Page | null,
  sectionId: string,
  fieldPath: string,
  value: string,
  locale: string = 'en'
): Promise<void> => {
  return new Promise((resolve) => {
    if (!currentPage) {
      resolve();
      return;
    }
    dispatch(updatePageField({
      sectionId,
      fieldPath,
      value,
      locale,
    }));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resolve();
      });
    });
  });
};
