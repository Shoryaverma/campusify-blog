import Link from 'next/link';
import { fetchAllPages } from '@/lib/api';
import { extractExcerpt } from '@/lib/contentCleaner';

export default async function Home() {
  const pages = await fetchAllPages();

  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog Posts</h1>
        
        {pages.length === 0 ? (
          <p className="text-gray-600">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page) => {
              const excerpt = extractExcerpt(page.content.rendered, 150);
              
              return (
                <article
                  key={page.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <Link href={`/${page.slug}`}>
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {page.title.rendered}
                      </h2>
                      {excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {excerpt}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <time dateTime={page.date}>
                          {new Date(page.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>

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

