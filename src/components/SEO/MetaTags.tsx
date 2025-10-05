import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export function MetaTags({
  title = "DigiStore - Premium Digital Products & Electronics",
  description = "Discover premium digital products, electronics, and gadgets at DigiStore. Quality guaranteed with fast shipping worldwide.",
  keywords = "electronics, digital products, gadgets, headphones, smartphones, laptops, tech accessories",
  image = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=630&fit=crop&crop=center",
  url = "https://digistore.com"
}: MetaTagsProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[${property}]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(property, property.includes('property') ? property.split('=')[1] : property.split('=')[1]);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('name="description"', description);
    updateMetaTag('name="keywords"', keywords);

    // Open Graph tags
    updateMetaTag('property="og:title"', title);
    updateMetaTag('property="og:description"', description);
    updateMetaTag('property="og:image"', image);
    updateMetaTag('property="og:url"', url);
    updateMetaTag('property="og:type"', 'website');

    // Twitter Card tags
    updateMetaTag('name="twitter:card"', 'summary_large_image');
    updateMetaTag('name="twitter:title"', title);
    updateMetaTag('name="twitter:description"', description);
    updateMetaTag('name="twitter:image"', image);

    // Additional SEO tags
    updateMetaTag('name="viewport"', 'width=device-width, initial-scale=1');
    updateMetaTag('name="robots"', 'index, follow');
    updateMetaTag('name="author"', 'DigiStore');
  }, [title, description, keywords, image, url]);

  return null;
}