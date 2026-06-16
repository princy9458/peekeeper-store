import type { Theme } from '@/redux/slices/blueprint/blueprintType';

const injectGoogleFont = (family: string, id: string) => {
  if (typeof document === 'undefined') return;
  const cleanFamily = family.split(',')[0].trim().replace(/['"]/g, '');
  const existingLink = document.getElementById(id);
  if (existingLink) {
    if (!existingLink.getAttribute('href')?.includes(cleanFamily)) {
      existingLink.setAttribute('href', `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`);
    }
    return;
  }
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${cleanFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
};

export const applyTheme = (theme: Theme | null, context: 'public' | 'admin' = 'public') => {
  if (typeof document === 'undefined' || !theme) return;
  const root = document.documentElement;

  const cssVars: Record<string, string> = {
    '--primary': theme.colors.primary,
    '--primary-light': theme.colors.primaryLight,
    '--primary-dark': theme.colors.primaryDark,
    '--primary-hover': theme.colors.primaryHover,
    '--secondary': theme.colors.secondary,
    '--accent': theme.colors.accent,
    '--accent-hover': theme.colors.accentHover,
    '--accent-soft': theme.colors.accentSoft,
    '--background': theme.colors.background,
    '--surface': theme.colors.surface,
    '--card': theme.colors.card,
    '--text': theme.colors.text,
    '--text-secondary': theme.colors.textSecondary,
    '--text-muted': theme.colors.textMuted,
    '--border': theme.colors.border,
    '--border-hover': theme.colors.borderHover,
    '--success': theme.colors.success,
    '--warning': theme.colors.warning,
    '--error': theme.colors.error,
    '--info': theme.colors.info,
    '--overlay': theme.colors.overlay,
    '--font-body': theme.typography.bodyFont,
    '--font-heading': theme.typography.headingFont,
    '--font-mono': theme.typography.monoFont,
    '--text-xs': theme.typography.text.xs,
    '--text-sm': theme.typography.text.sm,
    '--text-base': theme.typography.text.base,
    '--text-md': theme.typography.text.md,
    '--text-lg': theme.typography.text.lg,
    '--text-xl': theme.typography.text.xl,
    '--text-2xl': theme.typography.text['2xl'],
    '--text-3xl': theme.typography.text['3xl'],
    '--text-4xl': theme.typography.text['4xl'],
    '--text-5xl': theme.typography.text['5xl'],
    '--fw-light': theme.typography.fw.light,
    '--fw-normal': theme.typography.fw.normal,
    '--fw-medium': theme.typography.fw.medium,
    '--fw-semibold': theme.typography.fw.semibold,
    '--fw-bold': theme.typography.fw.bold,
    '--fw-extrabold': theme.typography.fw.extrabold,
    '--leading-tight': theme.typography.lineHeight.tight,
    '--leading-normal': theme.typography.lineHeight.normal,
    '--leading-relaxed': theme.typography.lineHeight.relaxed,
    '--space-1': theme.spacing['1'],
    '--space-2': theme.spacing['2'],
    '--space-3': theme.spacing['3'],
    '--space-4': theme.spacing['4'],
    '--space-5': theme.spacing['5'],
    '--space-6': theme.spacing['6'],
    '--space-8': theme.spacing['8'],
    '--space-10': theme.spacing['10'],
    '--space-12': theme.spacing['12'],
    '--space-16': theme.spacing['16'],
    '--space-20': theme.spacing['20'],
    '--space-24': theme.spacing['24'],
    '--radius-sm': theme.radius.sm,
    '--radius-md': theme.radius.md,
    '--radius-lg': theme.radius.lg,
    '--radius-xl': theme.radius.xl,
    '--radius-2xl': theme.radius['2xl'],
    '--radius-full': theme.radius.full,
    '--shadow-sm': theme.shadow.sm,
    '--shadow-md': theme.shadow.md,
    '--shadow-lg': theme.shadow.lg,
    '--shadow-hover': theme.shadow.hover,
    '--container': theme.layout.container,
    '--navbar-height': theme.layout.navbarHeight,
    '--section-padding': theme.layout.sectionPadding,
    '--btn-height': theme.buttons.height,
    '--btn-padding-x': theme.buttons.paddingX,
    '--btn-radius': theme.buttons.radius,
    '--btn-primary-bg': theme.buttons.primaryBackground,
    '--btn-primary-text': theme.buttons.primaryText,
    '--btn-primary-hover': theme.buttons.primaryHover,
    '--btn-secondary-bg': theme.buttons.secondaryBackground,
    '--btn-secondary-text': theme.buttons.secondaryText,
    '--btn-secondary-hover': theme.buttons.secondaryHover,
    '--btn-outline-border': theme.buttons.outlineBorder,
    '--btn-outline-text': theme.buttons.outlineText,
    '--btn-outline-hover-bg': theme.buttons.outlineHoverBg,
    '--btn-outline-hover-text': theme.buttons.outlineHoverText,
    '--input-height': theme.forms.inputHeight,
    '--input-padding-x': theme.forms.inputPaddingX,
    '--input-padding-y': theme.forms.inputPaddingY,
    '--input-radius': theme.forms.inputRadius,
    '--input-bg': theme.forms.inputBackground,
    '--input-text': theme.forms.inputText,
    '--input-border': theme.forms.inputBorder,
    '--input-border-hover': theme.forms.inputBorderHover,
    '--input-placeholder': theme.forms.inputPlaceholder,
    '--input-focus-border': theme.forms.inputFocusBorder,
    '--input-focus-shadow': theme.forms.inputFocusShadow,
    '--input-disabled-bg': theme.forms.inputDisabledBackground,
    '--input-disabled-text': theme.forms.inputDisabledText,
    '--textarea-min-height': theme.forms.textareaMinHeight,
    '--modal-sm': theme.modal.sm,
    '--modal-md': theme.modal.md,
    '--modal-lg': theme.modal.lg,
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  injectGoogleFont(theme.typography.bodyFont, 'blueprint-body-font');
  injectGoogleFont(theme.typography.headingFont, 'blueprint-heading-font');
};

export default applyTheme;
