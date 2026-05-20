const BASE_URL = 'https://ebba-mentholatum.imgix.net';

export const getOptimizedVideoUrl = (filename, options = {}) => {
  const params = new URLSearchParams({
    auto: 'compress,format',
    q: options.quality || '65',
    w: options.width || '1920',
    h: options.height || '1080',
    fit: 'crop',
    crop: 'center',
    fm: options.format || 'hls',
  });
  return `${BASE_URL}/${filename}?${params}`;
};

export const getResponsiveVideoSources = (filename) => {
  return {
    desktop: getOptimizedVideoUrl(filename, {
      quality: '70',
      width: '1920',
      height: '1080',
    }),
    tablet: getOptimizedVideoUrl(filename, {
      quality: '60',
      width: '1280',
      height: '720',
    }),
    mobile: getOptimizedVideoUrl(filename, {
      quality: '50',
      width: '720',
      height: '405',
    }),
  };
};

export const getOptimizedImageUrl = (filename, options = {}) => {
  const params = new URLSearchParams({
    auto: 'compress,format',
    q: options.quality || '80',
    w: options.width || '1920',
    h: options.height || '1080',
    fit: 'crop',
    crop: 'center',
    fm: options.format || 'webp',
  });
  return `${BASE_URL}/${filename}?${params}`;
};

export const getResponsivePosterSources = (filename) => {
  return {
    '1x': getOptimizedImageUrl(filename, {
      quality: '80',
      width: '1920',
    }),
    '2x': getOptimizedImageUrl(filename, {
      quality: '75',
      width: '3840',
    }),
  };
};

export const shouldLoadVideo = () => {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g'];
    if (slowConnections.includes(connection.effectiveType)) {
      return false;
    }
    if (connection.saveData) {
      return false;
    }
  }
  const memory = navigator.deviceMemory;
  if (memory && memory < 2) {
    return false;
  }
  return true;
};
