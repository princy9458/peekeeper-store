export function getLocalizedString(
  value: string | { [locale: string]: string } | undefined | null,
  locale: string = 'en'
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    return value[locale] || value['en'] || '';
  }
  return '';
}

export function getLocalizedUrl(path: string, locale: string = 'en'): string {
  if (locale === 'en') return path;
  return `/${locale}${path === '/' ? '' : path}`;
}
