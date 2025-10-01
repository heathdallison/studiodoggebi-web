export const domainConfig = {
  order: ['studiodoggebi', 'legendarysisters'],
  defaultSection: 'studiodoggebi',
  sections: {
    studiodoggebi: {
      domain: 'StudioDoggebi.com',
      label: 'Studio Doggebi',
      masthead: 'Studio Doggebi, Inc.',
      assets: {
        logo: 'https://studiodoggebiassets.blob.core.windows.net/cdn/doggebi_logo.png',
      }
    },
    legendarysisters: {
      domain: 'LegendarySisters.com',
      label: 'Legendary Sisters',
      masthead: 'Legendary Sisters, Inc.',
      assets: {
        logo: 'https://studiodoggebiassets.blob.core.windows.net/cdn/doggebi_logolantern.png',
      }
    }, basicherostuff: {
      domain: 'LegendarySisters.com',
      label: 'Legendary Sisters',
      masthead: 'Legendary Sisters, Inc.',
      assets: {
        logo: 'https://studiodoggebiassets.blob.core.windows.net/cdn/logo_round_256.jpg'

      }
    }
  }
} as const;
