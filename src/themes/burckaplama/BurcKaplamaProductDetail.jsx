import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { burcKaplamaData, translate } from './burcKaplamaData';

export default function BurcKaplamaProductDetail({ product }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  // Bilingual value helper
  const getVal = (val) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return translate(activeLang, val);
  };

  // Load related services (derived state calculated directly during render)
  const currentId = product.id || product.slug;
  const relatedServices = burcKaplamaData.services
    .filter(item => item.id !== currentId && item.slug !== currentId)
    .slice(0, 3);

  const specsList = product.specs || [];

  return (
    <main className="bk-product-detail-page">
      {/* Back link */}
      <div className="bk-detail-nav-back-wrapper">
        <div className="bk-detail-nav-back-container">
          <Link to={getLocalizedPath('/urunler')} className="bk-back-link">
            ← {activeLang === 'tr' ? 'Tüm Hizmetlerimize Dön' : 'Back to All Services'}
          </Link>
        </div>
      </div>

      {/* Detail section */}
      <section className="bk-detail-section">
        <div className="bk-detail-container">
          {/* Visual column */}
          <div className="bk-detail-gallery">
            <div className="bk-detail-main-img-wrapper">
              {product.coverImageUrl ? (
                <img
                  src={product.coverImageUrl}
                  alt={getVal(product.title)}
                  className="bk-detail-main-img"
                />
              ) : (
                <div className="bk-detail-placeholder-img">
                  {product.category?.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="bk-detail-info">
            <span className="bk-detail-category">{product.category}</span>
            <h1 className="bk-detail-title">{getVal(product.title)}</h1>
            
            <div className="bk-detail-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }}></div>
            
            <p className="bk-detail-desc">{getVal(product.desc || product.content)}</p>

            {/* Technical Specifications table */}
            {specsList.length > 0 && (
              <div className="bk-spec-section">
                <h3 className="bk-spec-title">
                  {activeLang === 'tr' ? 'Teknik Parametreler ve Değerler' : 'Technical Parameters & Values'}
                </h3>
                <div className="bk-spec-table">
                  {specsList.map((spec, idx) => (
                    <div key={idx} className="bk-spec-row">
                      <span className="bk-spec-key">{getVal(spec.key)}</span>
                      <span className="bk-spec-val">{getVal(spec.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="bk-detail-cta" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <Link
                to={getLocalizedPath('/iletisim')}
                className="bk-btn bk-btn-primary"
                style={{ background: 'var(--bk-color-accent-orange)', borderColor: 'var(--bk-color-accent-orange)' }}
              >
                {activeLang === 'tr' ? 'Teklif Formu ve Bilgi Talebi' : 'Request Info & Quote'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="bk-related-section">
          <div className="bk-related-container">
            <h2 className="bk-related-title">
              {activeLang === 'tr' ? 'Diğer Hizmet ve Uygulamalarımız' : 'Other Services & Applications'}
            </h2>
            <div className="bk-product-grid">
              {relatedServices.map((svc) => {
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
                      <p className="bk-product-summary">{getVal(svc.summary)}</p>
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
          </div>
        </section>
      )}
    </main>
  );
}
