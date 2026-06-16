export interface LocalizedText {
  en?: string;
  hi?: string;
  [key: string]: string | undefined;
}

export interface ContentItem {
  id?: string;
  type: string;
  props?: any;
  content?: any[];
  _id?: string;
}

export interface PageBlock {
  id: string;
  type: string;
  props?: any;
  layout: string;
  adminTitle?: string;
  content?: (PageBlock | ContentItem | any)[];
  columns?: any[][];
}

export interface Page {
  _id?: string;
  title: LocalizedText;
  slug: string;
  content?: PageBlock[] | string | any;
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  isPublished: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  status?: string;
  type?: string;
  template?: string;
  isHomepage?: boolean;
}

export interface PagesState {
  allPages: Record<string, Page>;
  currentPage: Page | null;
  editableMode: boolean;
}
