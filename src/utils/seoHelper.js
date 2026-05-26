export const updateMetaTag = (property, content) => {
  if (!content) return;
  
  // For og: and twitter: properties
  if (property.includes(':')) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  } else {
    // For standard meta tags (description, keywords)
    let tag = document.querySelector(`meta[name="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
};
