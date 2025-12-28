/**
 * Content cleaning utility to remove CSS, style tags, and junk classes
 * while preserving meaningful HTML structure
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Removes style tags, inline styles, and unnecessary CSS classes from HTML content
 * 
 * Approach:
 * 1. Use DOMPurify to sanitize and clean the HTML
 * 2. Remove all style tags and inline style attributes
 * 3. Strip unnecessary CSS classes while preserving semantic structure
 * 4. Keep meaningful HTML elements (headings, paragraphs, lists, images, links)
 * 
 * @param dirtyHtml - Raw HTML content from WordPress API
 * @returns Cleaned HTML string ready for rendering
 */
export function cleanBlogContent(dirtyHtml: string): string {
  if (!dirtyHtml) return '';

  // Configure DOMPurify to:
  // - Remove all style tags
  // - Remove all inline style attributes
  // - Allow semantic HTML elements
  // - Remove most classes (we'll handle this in a second pass)
  const cleanConfig = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'span',
      'ul', 'ol', 'li',
      'a', 'img',
      'blockquote', 'pre', 'code',
      'div', 'section', 'article',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height',
      'id', // Keep IDs for potential anchor links
    ],
    // Remove style attributes
    FORBID_ATTR: ['style', 'class'],
    // Remove style tags
    FORBID_TAGS: ['style', 'script'],
  };

  // First pass: Basic sanitization
  let cleaned = DOMPurify.sanitize(dirtyHtml, cleanConfig);

  // Second pass: Remove remaining style tags and inline styles using regex
  // (as a safety net in case DOMPurify missed any)
  cleaned = cleaned
    // Remove any remaining style tags
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // Remove any remaining inline style attributes
    .replace(/\s*style\s*=\s*["'][^"']*["']/gi, '')
    // Remove class attributes (keeping only the attribute removal, not the class value)
    .replace(/\s*class\s*=\s*["'][^"']*["']/gi, '')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    // Clean up spaces around tags
    .replace(/>\s+</g, '><')
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/gi, '')
    // Fix image sources to use absolute URLs if they're relative
    .replace(/<img([^>]*)\ssrc=["'](\/[^"']+)["']/gi, (match, attrs, src) => {
      if (src.startsWith('/')) {
        return `<img${attrs} src="https://campusify.io${src}"`;
      }
      return match;
    })
    // Add loading="lazy" to all images for performance
    .replace(/<img([^>]*?)>/gi, (match, attrs) => {
      // Check if loading attribute already exists
      if (/loading\s*=/i.test(attrs)) {
        return match; // Already has loading attribute
      }
      // Add loading="lazy" before closing >
      return `<img${attrs} loading="lazy">`;
    })
    // Remove data attributes that might contain junk
    .replace(/\s*data-[^=]*=["'][^"']*["']/gi, '');

  return cleaned.trim();
}

/**
 * Extracts a clean text excerpt from HTML (for meta descriptions)
 */
export function extractExcerpt(html: string, maxLength: number = 160): string {
  if (!html) return '';

  // Remove all HTML tags
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= maxLength) return text;

  // Truncate at word boundary
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

/**
 * Extracts the first heading from content (for page titles if needed)
 */
export function extractFirstHeading(html: string): string | null {
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) return h1Match[1].replace(/<[^>]*>/g, '').trim();

  const h2Match = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
  if (h2Match) return h2Match[1].replace(/<[^>]*>/g, '').trim();

  return null;
}

