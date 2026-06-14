export const injectSchemaMarkup = (schema, id) => {
  if (typeof document === "undefined" || !schema) return;
  const existing = document.querySelector(`script[data-schema="${id}"]`);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", id);
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

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
