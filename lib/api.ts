/**
 * API utility functions for fetching blog data from WordPress API
 */

export interface BlogPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: Record<string, any>;
  yoast_head?: string;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
    canonical?: string;
  };
}

/**
 * Fetches all blog pages from the WordPress API
 */
export async function fetchAllPages(): Promise<BlogPage[]> {
  try {
    const response = await fetch('https://campusify.io/wp-json/wp/v2/pages', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }

    const data: BlogPage[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
}

/**
 * Fetches a single page by slug
 */
export async function fetchPageBySlug(slug: string): Promise<BlogPage | null> {
  try {
    const response = await fetch(
      `https://campusify.io/wp-json/wp/v2/pages?slug=${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const data: BlogPage[] = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

/**
 * Gets all page slugs for static generation
 */
export async function getAllPageSlugs(): Promise<string[]> {
  const pages = await fetchAllPages();
  return pages.map((page) => page.slug);
}

