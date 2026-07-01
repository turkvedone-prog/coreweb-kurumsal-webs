import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen } from 'lucide-react';
import { useSite } from './layouts/SiteLayout';

export default function BurobigBlogList({ blogs = [], formatDate, getLocalizedPath }) {
  const { activeLang } = useSite();
  const translate = (tr, en, ar) => {
    if (activeLang === 'ar') return ar || en || tr;
    if (activeLang === 'en') return en || tr;
    return tr;
  };

  return (
    <main id="main-content" className="blog-list-page">
      {/* Blog Header */}
      <section className="blog-list-header">
        <h1 className="blog-list-title">{translate('Blog', 'Blog', 'المدونة')}</h1>
        <p className="blog-list-subtitle">
          {translate(
            'Ofis yaşamı, çalışma trendleri, ergonomi ve premium tasarım dünyasına dair en son makale ve fikirlerimizi keşfedin.',
            'Discover our latest articles and ideas on office life, working trends, ergonomics, and the world of premium design.',
            'اكتشف أحدث مقالاتنا وأفكارنا حول حياة المكتب، واتجاهات العمل، وبيئة العمل، وعالم التصميم المتميز.'
          )}
        </p>
      </section>

      {/* Blog Grid */}
      <div className="blog-list-grid-container">
        {blogs.length === 0 ? (
          <div className="text-center py-12" style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '3rem', backgroundColor: '#ffffff', maxWidth: '400px', margin: '0 auto' }}>
            <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">{translate('Yazı Bulunmadı', 'No Articles Found', 'لم يتم العثور على مقالات')}</h3>
            <p className="text-sm text-slate-500">{translate('Henüz yayınlanmış bir yazı bulunmuyor.', 'There are no published articles yet.', 'لا توجد مقالات منشورة بعد.')}</p>
          </div>
        ) : (
          <div className="blog-list-grid">
            {blogs.map((blog) => {
              const blogSlug = blog.slug || blog.id;
              const detailPath = getLocalizedPath(`/blog/${blogSlug}`);

              return (
                <article key={blog.id} className="blog-list-card">
                  <div className="blog-list-image-wrapper">
                    {blog.coverImageUrl ? (
                      <img src={blog.coverImageUrl} alt={blog.title} />
                    ) : (
                      <div className="blog-list-image-placeholder">
                        <BookOpen className="h-10 w-10 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="blog-list-card-content">
                    <div className="blog-list-date" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar className="h-3.5 w-3.5" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>
                      {blog.category && (
                        <>
                          <span style={{ color: '#dadce0' }}>•</span>
                          <span style={{ color: 'var(--accent-color)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {blog.category}
                          </span>
                        </>
                      )}
                    </div>
                    <Link to={detailPath} className="blog-list-card-title">
                      {blog.title}
                    </Link>
                    <p className="blog-list-card-summary">
                      {blog.summary || (blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...')}
                    </p>
                    <Link to={detailPath} className="blog-list-read-more">
                      <span>{translate('Hemen İncele', 'Read More', 'اقرأ المزيد')}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
