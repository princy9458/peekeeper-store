'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import {
  fetchBlueprintThunk,
  selectActiveTheme,
  selectThemeContext,
  selectBlueprintLastFetched,
  selectBlueprintLoading,
  setThemeContext,
} from '@/redux/slices/blueprint';
import { setEditableMode } from '@/redux/slices/pages/pagesSlice';
import applyTheme from '@/lib/applyTheme';

interface BlueprintProviderProps {
  children: ReactNode;
  context?: 'public' | 'admin';
}

const STALE_THRESHOLD = 5 * 60 * 1000;

export default function BlueprintProvider({ children, context = 'public' }: BlueprintProviderProps) {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);
  const themeContext = useAppSelector(selectThemeContext);
  const lastFetched = useAppSelector(selectBlueprintLastFetched);
  const isLoading = useAppSelector(selectBlueprintLoading);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (themeContext !== context) {
      dispatch(setThemeContext(context));
    }
  }, [dispatch, themeContext, context]);

  useEffect(() => {
    if (hasFetched.current) return;
    const shouldFetch = !lastFetched || (Date.now() - new Date(lastFetched).getTime()) > STALE_THRESHOLD;
    if (shouldFetch && !isLoading) {
      hasFetched.current = true;
      dispatch(fetchBlueprintThunk());
    }
  }, [dispatch, lastFetched, isLoading]);

  useEffect(() => {
    if (activeTheme) {
      applyTheme(activeTheme, themeContext);
    }
  }, [activeTheme, themeContext]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const editParam = urlParams.get('edit');
      if (editParam === 'true') {
        dispatch(setEditableMode(true));
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}
