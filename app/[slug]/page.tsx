import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchPageBySlug, getAllPageSlugs } from '@/lib/api';
import { cleanBlogContent, extractExcerpt } from '@/lib/contentCleaner';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all blog pages
 * This enables static generation for better performance
 */
export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = page.title.rendered;
  const description =
    page.excerpt.rendered
      ? extractExcerpt(page.excerpt.rendered, 160)
      : extractExcerpt(page.content.rendered, 160);
  const canonicalUrl = `https://Shorya-campusify-blog.vercel.app/${slug}`;
  const ogImage = page.yoast_head_json?.og_image?.[0]?.url || '';

  return {
    title: `${title} | Campusify Blog`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Campusify Blog',
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const cleanedContent = cleanBlogContent(page.content.rendered);
  const publishedDate = new Date(page.date);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Campusify Blog
            </Link>
            <Link
              href="https://campusify.io"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Visit Campusify
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Blog
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 text-sm">{page.title.rendered}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {page.title.rendered}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <time dateTime={page.date} className="flex items-center">
                {publishedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
          />
        </article>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © Campusify. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

