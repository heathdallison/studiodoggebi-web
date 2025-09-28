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
