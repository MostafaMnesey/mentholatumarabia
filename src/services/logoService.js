export const getLogo = (name) => {
  const logos = {
    'logo.webp': {
      name: 'logo.webp',
      baseName: 'logo',
      srcset: '/images/optimized/logos/logo/logo-150w.webp 150w, /images/optimized/logos/logo/logo-200w.webp 200w, /images/optimized/logos/logo/logo-250w.webp 250w, /images/optimized/logos/logo/logo-300w.webp 300w',
      webpFallback: '/images/optimized/logos/logo/logo.webp',
      webpVersions: ["/images/optimized/logos/logo/logo-150w.webp 150w","/images/optimized/logos/logo/logo-200w.webp 200w","/images/optimized/logos/logo/logo-250w.webp 250w","/images/optimized/logos/logo/logo-300w.webp 300w"]
    },
    'logo-white.webp': {
      name: 'logo-white.webp',
      baseName: 'logo-white',
      srcset: '/images/optimized/logos/logo-white/logo-white-150w.webp 150w, /images/optimized/logos/logo-white/logo-white-200w.webp 200w, /images/optimized/logos/logo-white/logo-white-250w.webp 250w, /images/optimized/logos/logo-white/logo-white-300w.webp 300w',
      webpFallback: '/images/optimized/logos/logo-white/logo-white.webp',
      webpVersions: ["/images/optimized/logos/logo-white/logo-white-150w.webp 150w","/images/optimized/logos/logo-white/logo-white-200w.webp 200w","/images/optimized/logos/logo-white/logo-white-250w.webp 250w","/images/optimized/logos/logo-white/logo-white-300w.webp 300w"]
    },
    'Group 3287.webp': {
      name: 'Group 3287.webp',
      baseName: 'Group-3287',
      srcset: '/images/optimized/logos/Group-3287/Group-3287-200w.webp 200w, /images/optimized/logos/Group-3287/Group-3287-300w.webp 300w, /images/optimized/logos/Group-3287/Group-3287-400w.webp 400w',
      webpFallback: '/images/optimized/logos/Group-3287/Group-3287.webp',
      webpVersions: ["/images/optimized/logos/Group-3287/Group-3287-200w.webp 200w","/images/optimized/logos/Group-3287/Group-3287-300w.webp 300w","/images/optimized/logos/Group-3287/Group-3287-400w.webp 400w"]
    },
    'image001.webp.webp': {
      name: 'image001.webp.webp',
      baseName: 'image001.webp',
      srcset: '/images/optimized/logos/image001.webp/image001.webp-100w.webp 100w, /images/optimized/logos/image001.webp/image001.webp-150w.webp 150w, /images/optimized/logos/image001.webp/image001.webp-200w.webp 200w',
      webpFallback: '/images/optimized/logos/image001.webp/image001.webp.webp',
      webpVersions: ["/images/optimized/logos/image001.webp/image001.webp-100w.webp 100w","/images/optimized/logos/image001.webp/image001.webp-150w.webp 150w","/images/optimized/logos/image001.webp/image001.webp-200w.webp 200w"]
    },
    'image003.webp.webp': {
      name: 'image003.webp.webp',
      baseName: 'image003.webp',
      srcset: '/images/optimized/logos/image003.webp/image003.webp-100w.webp 100w, /images/optimized/logos/image003.webp/image003.webp-150w.webp 150w, /images/optimized/logos/image003.webp/image003.webp-200w.webp 200w',
      webpFallback: '/images/optimized/logos/image003.webp/image003.webp.webp',
      webpVersions: ["/images/optimized/logos/image003.webp/image003.webp-100w.webp 100w","/images/optimized/logos/image003.webp/image003.webp-150w.webp 150w","/images/optimized/logos/image003.webp/image003.webp-200w.webp 200w"]
    },
    'SAMS-Logo-sm.webp.webp': {
      name: 'SAMS-Logo-sm.webp.webp',
      baseName: 'SAMS-Logo-sm.webp',
      srcset: '/images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-100w.webp 100w, /images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-150w.webp 150w, /images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-200w.webp 200w',
      webpFallback: '/images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp.webp',
      webpVersions: ["/images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-100w.webp 100w","/images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-150w.webp 150w","/images/optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-200w.webp 200w"]
    }
  };
  return logos[name];
};

export const getLogoSrcset = (name) => {
  const logo = getLogo(name);
  return logo ? logo.srcset : '';
};

export const getLogoFallback = (name) => {
  const logo = getLogo(name);
  return logo ? logo.webpFallback : '';
};
