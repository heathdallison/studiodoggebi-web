export const domainConfig = {
  order: ['studiodoggebi', 'legendarysisters'],
  defaultSection: 'studiodoggebi',
  sections: {
    studiodoggebi: {
      domain: 'LegendarySisters.com',
      label: 'Studio Doggebi',
      masthead: 'Studio Doggebi, Inc.'
    },
    legendarysisters: {
      domain: 'StudioDoggebi.com',
      label: 'Sisters',
      masthead: 'Legendary Sisters, Inc.'
    }
  }
} as const;
