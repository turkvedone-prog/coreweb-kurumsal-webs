import { Link, useSearchParams } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { burcKaplamaData, translate } from './burcKaplamaData';

export default function BurcKaplamaProductList({ products }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;
  const [searchParams, setSearchParams] = useSearchParams();

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const catParam = searchParams.get('cat');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const getActiveCategory = () => {
    if (catParam) return catParam;
    return 'all';
  };

  const activeCategory = getActiveCategory();

  const handleCategoryClick = (category) => {
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ cat: category });
    }
  };

  // Decide source: database products or static brief fallback services
  const hasDbProducts = products && products.length > 0;
  const rawSource = hasDbProducts ? products : burcKaplamaData.services;

  // Bilingual value renderer helper
  const getVal = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return translate(activeLang, val);
  };

  // Categories list
  const categories = ['all', ...new Set(rawSource.map(p => p.category).filter(Boolean))];

  // Filter
  const filteredServices = rawSource.filter(svc => {
    if (activeCategory === 'all') return true;
    return svc.category === activeCategory;
  });

  return (
    <main className="bk-products-page">
      {/* Category Hero */}
      <section className="bk-page-hero">
        <div className="bk-page-hero-container">
          <span className="bk-page-hero-subtitle">
            {activeLang === 'tr' ? 'Endüstriyel Çözümlerimiz' : 'Our Industrial Solutions'}
          </span>
          <h1 className="bk-page-hero-title">
            {activeLang === 'tr' ? 'Hizmetler ve Uygulamalar' : 'Services & Applications'}
          </h1>
          <p className="bk-page-hero-desc">
            {activeLang === 'tr'
              ? 'Sanayide güvenilirlik, yüksek mukavemet ve hassas işçilik sunan profesyonel kaplama ve yüzey işlem uygulamalarımız.'
              : 'Our professional plating and surface treatment applications offering reliability, high durability, and precision in industry.'}
          </p>
          {!hasDbProducts && (
            <span style={{ fontSize: '0.78rem', color: 'var(--bk-color-accent-orange)', background: 'rgba(249,115,22,0.1)', padding: '0.25rem 0.75rem', borderRadius: '4px', marginTop: '1rem' }}>
              ⚠️ {activeLang === 'tr' ? 'Müşteri hizmet listesi bekleniyor' : 'Client service list pending'}
            </span>
          )}
        </div>
      </section>

      {/* Category Filters */}
      {categories.length > 1 && (
        <section className="bk-filters-section">
          <div className="bk-filters-container">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`bk-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat === 'all' 
                  ? (activeLang === 'tr' ? 'Tüm Hizmetler' : 'All Services') 
                  : cat}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="bk-grid-section">
        <div className="bk-grid-container">
          {filteredServices.length === 0 ? (
            <div className="bk-no-products">
              <p>{activeLang === 'tr' ? 'Bu kategoride henüz hizmet bulunmuyor.' : 'No services found in this category.'}</p>
            </div>
          ) : (
            <div className="bk-product-grid">
              {filteredServices.map((svc) => {
                const serviceSlug = svc.slug || svc.id;
                const detailPath = getLocalizedPath(`/urunler/${serviceSlug}`);

                return (
                  <article key={svc.id} className="bk-product-card">
                    <div className="bk-product-img-wrapper">
                      <div className="bk-product-img-placeholder">
                        <span>{svc.category?.substring(0, 2).toUpperCase()}</span>
                      </div>
                      {svc.category && (
                        <span className="bk-product-badge">{svc.category}</span>
                      )}
                    </div>

                    <div className="bk-product-info">
                      <h2 className="bk-product-title">{getVal(svc.title)}</h2>
                      <p className="bk-product-summary">
                        {getVal(svc.summary)}
                      </p>
                      <div className="bk-product-card-footer">
                        <span className="bk-product-link-text">
                          {activeLang === 'tr' ? 'İncele →' : 'Details →'}
                        </span>
                      </div>
                    </div>
                    
                    <Link 
                      to={detailPath} 
                      className="bk-product-card-overlay-link" 
                      aria-label={getVal(svc.title)}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
