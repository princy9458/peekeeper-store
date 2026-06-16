import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPage, fetchAllPages as fetchAllPagesService } from '@/lib/services/cmsService';
import type { Page } from '@/redux/slices/pages/pageType';

export const fetchPageBySlug = createAsyncThunk<Page, string>(
  'pages/fetchPageBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      return await fetchPage(slug);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch page');
    }
  }
);

export const fetchAllPages = createAsyncThunk<Record<string, Page>, void>(
  'pages/fetchAllPages',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllPagesService();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch CMS pages');
    }
  }
);
