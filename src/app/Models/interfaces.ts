export type SectionId = 'studiodoggebi' | 'legendarysisters';

export interface SectionConfig {
  id: SectionId;
  label: string;
  masthead: string;
  path: `/${string}`;
  domain: string;
}

export interface NavItem {
  label: string;
  url: string;
  disabled: boolean;
}

export interface DomainConfig {
  defaultSection: SectionId;
  order: SectionId[];
  sections: Record<SectionId, SectionConfig>;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  published: string;
  author?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;  // URL (can be local asset for now)
  etsyUrl: string;    // external link
}