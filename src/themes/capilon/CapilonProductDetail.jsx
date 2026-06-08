import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { MessageCircle, Phone } from 'lucide-react';

// Standardized product structure that matches Firestore schema
const fallbackProduct = {
  id: "capilon-loft",
  name: "Loft",
  title: "Loft Koltuk Takımı",
  slug: "loft-koltuk-takimi",
  status: "active",
  order: 1,
  coverImageUrl: "/assets/capilon/images/product_sofa_1779477845050.png",
  category: "Oturma Grupları",
  defaultLanguage: "tr",
  enabledLanguages: ["tr", "en"],
  content: "Loft Koltuk Takımı, salonunuza zamansız bir şıklık ve benzersiz bir konfor getiriyor. Minimalist hatları, yüksek dansiteli HR sünger yapısı ve premium leke tutmaz kumaşıyla hem gözünüze hem bedeninize hitap eder. Doğal ahşap iskeleti sayesinde uzun yıllar ilk günkü formunu korur.",
  summary: "Loft Koltuk Takımı, modern ve şık tasarımıyla salonunuza estetik ve konforlu bir dokunuş katıyor.",
  technicalDetails: "İskelet: Fırınlanmış gürgen ağacı ve kontrplak\nSünger: 35 Dansite HR Soft Sünger + Kaz Tüyü Elyaf Katman\nKumaş: Su itici, leke tutmaz, kolay silinebilir premium dokuma\nÖlçüler (Üçlü Koltuk): G: 230cm / D: 95cm / Y: 85cm",
  usageAreas: "Salon, Yaşam Alanları, Lobi ve Dinlenme Alanları",
  gallery: [
    { id: "img-1", url: "/assets/capilon/images/product_sofa_1779477845050.png", order: 1 },
    { id: "hero-living", url: "/assets/capilon/images/hero_living_room_1779477814666.png", order: 2 },
    { id: "prod-dining", url: "/assets/capilon/images/product_dining_1779477859352.png", order: 3 }
  ],
  translations: {
    tr: {
      title: "Loft Koltuk Takımı",
      slug: "loft-koltuk-takimi",
      content: "Loft Koltuk Takımı, salonunuza zamansız bir şıklık ve benzersiz bir konfor getiriyor. Minimalist hatları, yüksek dansiteli HR sünger yapısı ve premium leke tutmaz kumaşıyla hem gözünüze hem bedeninize hitap eder. Doğal ahşap iskeleti sayesinde uzun yıllar ilk günkü formunu korur.",
      summary: "Loft Koltuk Takımı, modern ve şık tasarımıyla salonunuza estetik ve konforlu bir dokunuş katıyor.",
      category: "Oturma Grupları",
      technicalDetails: "İskelet: Fırınlanmış gürgen ağacı ve kontrplak\nSünger: 35 Dansite HR Soft Sünger + Kaz Tüyü Elyaf Katman\nKumaş: Su itici, leke tutmaz, kolay silinebilir premium dokuma\nÖlçüler (Üçlü Koltuk): G: 230cm / D: 95cm / Y: 85cm",
      usageAreas: "Salon, Yaşam Alanları, Lobi ve Dinlenme Alanları"
    },
    en: {
      title: "Loft Sofa Set",
      slug: "loft-sofa-set",
      content: "The Loft Sofa Set brings timeless elegance and unique comfort to your living room. With its minimalist lines, high-density HR foam structure, and premium stain-resistant fabric, it appeals to both your eye and your body. Thanks to its natural wooden frame, it maintains its shape for many years.",
      summary: "The Loft Sofa Set adds an aesthetic and comfortable touch to your living room with its modern and stylish design.",
      category: "Living Room Sets",
      technicalDetails: "Frame: Kiln-dried hornbeam wood and plywood\nFoam: 35 Density HR Soft Foam + Goose Down Fiber Layer\nFabric: Water repellent, stain resistant, easy to clean premium weave\nDimensions (Three-Seater): W: 230cm / D: 95cm / H: 85cm",
      usageAreas: "Living Room, Lounge Areas, Lobby and Rest Areas"
    }
  }
};

const swatchesData = {
  tr: {
    fabrics: [
      { name: "Krem Keten", color: "#EAE6D7" },
      { name: "Kum Gri", color: "#A09E96" },
      { name: "Adaçayı", color: "#788975" }
    ],
    legs: [
      { name: "Doğal Meşe", color: "#C7A15C" },
      { name: "Koyu Ceviz", color: "#6B4E38" }
    ]
  },
  en: {
    fabrics: [
      { name: "Cream Linen", color: "#EAE6D7" },
      { name: "Sand Grey", color: "#A09E96" },
      { name: "Sage Green", color: "#788975" }
    ],
    legs: [
      { name: "Natural Oak", color: "#C7A15C" },
      { name: "Dark Walnut", color: "#6B4E38" }
    ]
  }
};

export default function CapilonProductDetail({ product }) {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  // 1. Resolve localized product data or fallback
  const getProductData = () => {
    if (product) {
      return product;
    }
    // Deep copy fallback and localize it
    const localized = { ...fallbackProduct };
    const translations = fallbackProduct.translations?.[activeLang] || fallbackProduct.translations?.tr;
    if (translations) {
      Object.assign(localized, translations);
    }
    return localized;
  };

  const p = getProductData();

  // Swatches data based on language
  const swatches = swatchesData[activeLang] || swatchesData.tr;

  // State Management
  const [activeImage, setActiveImage] = useState(p.coverImageUrl || '');
  const [activeFabric, setActiveFabric] = useState(swatches.fabrics[0]?.name || '');
  const [activeLeg, setActiveLeg] = useState(swatches.legs[0]?.name || '');
  const [activeTab, setActiveTab] = useState('materials');
  const [imageFade, setImageFade] = useState(false);
  const [prevCoverImageUrl, setPrevCoverImageUrl] = useState(p.coverImageUrl || '');

  // Sync active image with product changes directly in render
  if (p.coverImageUrl !== prevCoverImageUrl) {
    setActiveImage(p.coverImageUrl || '');
    setPrevCoverImageUrl(p.coverImageUrl || '');
  }

  // Handle Thumbnail clicks with smooth opacity transition
  const handleImageChange = (url) => {
    if (url === activeImage) return;
    setImageFade(true);
    setTimeout(() => {
      setActiveImage(url);
      setImageFade(false);
    }, 200);
  };

  // JSON-LD schema injection for SEO
  useEffect(() => {
    const schemaId = 'capilon-product-jsonld';
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.title || p.name,
      "description": p.summary || p.content,
      "image": p.coverImageUrl,
      "category": p.category,
      "brand": {
        "@type": "Brand",
        "name": "Capilon Mobilya"
      }
    });

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [p]);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  // WhatsApp/Phone placeholder links removed since no verified WhatsApp line exists.
  // Primary CTA directs to the contact page, and secondary CTA directs to the verified phone number.

  // Similar collection items
  const similarItems = [
    { title: translate('Nova Yemek Odası', 'Nova Dining Room'), category: translate('YEMEK ODASI', 'DINING ROOM'), img: '/assets/capilon/images/product_dining_1779477859352.png' },
    { title: translate('Lina Yatak Odası', 'Lina Bedroom'), category: translate('YATAK ODASI', 'BEDROOM'), img: '/assets/capilon/images/hero_bedroom_1779477829254.png' },
    { title: translate('Nova Koltuk Takımı', 'Nova Sofa Set'), category: translate('KOLTUK TAKIMI', 'SOFA SET'), img: '/assets/capilon/images/product_sofa_1779477845050.png' }
  ];

  return (
    <div className="product-page product-page--minimal">
      <div className="minimal-hero">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="breadcrumb-elegant" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
          <Link to={getLocalizedPath('/')}>{translate('Ana Sayfa', 'Home')}</Link>
          <span className="separator">/</span>
          <Link to={getLocalizedPath('/urunler')}>{translate('Ürünlerimiz', 'Products')}</Link>
          <span className="separator">/</span>
          <span className="current">{p.title}</span>
        </nav>

        {/* Gallery / Image Display Area */}
        <div 
          className="minimal-hero__image-container" 
          style={{ 
            backgroundColor: '#ffffff', 
            padding: '3rem', 
            borderRadius: '12px', 
            marginTop: '0px', 
            border: '1px solid rgba(74, 69, 65, 0.05)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
          }}
        >
          <img 
            src={activeImage} 
            alt={p.title} 
            className={`minimal-hero__img ${imageFade ? 'fading' : 'active'}`} 
            style={{ 
              mixBlendMode: 'multiply',
              transition: 'opacity 0.2s ease-in-out',
              opacity: imageFade ? 0.3 : 1
            }} 
          />
        </div>

        {/* Thumbnail Selector */}
        {p.gallery && p.gallery.length > 0 && (
          <div 
            className="gallery-thumbnails-wrap" 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              marginBottom: '4rem',
              width: '100%',
              maxWidth: '650px' 
            }}
          >
            {p.gallery.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => handleImageChange(img.url)}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '6px',
                  border: activeImage === img.url ? '1.5px solid #1a1a1a' : '1px solid #e5e5e5',
                  padding: '4px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={img.url} 
                  alt={`${p.title} - ${idx + 1}`} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                />
              </button>
            ))}
          </div>
        )}

        {/* Product Details Section */}
        <div className="minimal-hero__content">
          <span className="minimal-hero__subtitle" style={{ color: '#b87353' }}>{p.category}</span>
          <h1 className="minimal-hero__title" style={{ color: '#4a4541', marginBottom: '1rem' }}>{p.title}</h1>
          
          <p className="minimal-hero__desc" style={{ color: '#4a4541', marginBottom: '2.5rem' }}>
            {p.content}
          </p>

          <div className="product-actions-cta" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link 
              to={getLocalizedPath('/iletisim')} 
              className="btn-sharp"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}
            >
              <MessageCircle size={18} />
              <span>{translate('BİLGİ AL / TEKLİF AL', 'GET INFO / REQUEST QUOTE')}</span>
            </Link>
            <a 
              href="tel:+903123790333" 
              className="btn-sharp btn-sharp--outline"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.8rem'
              }}
            >
              <Phone size={18} />
              <span>0.312 379 0 333</span>
            </a>
          </div>
        </div>

        {/* Tab & Swatches Block */}
        <div className="white-bottom-area" style={{ width: '100%', marginTop: '3rem' }}>
          <section className="product-details-tabs" style={{ width: '100%' }}>
            <h2 className="apple-style-heading" style={{ color: '#4a4541' }}>
              {translate('Özellikler & Materyal', 'Specifications & Materials')}
            </h2>
            
            <div className="tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`} 
                onClick={() => setActiveTab('materials')}
              >
                {translate('Kumaş & Renkler', 'Fabrics & Colors')}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('specs')}
              >
                {translate('Teknik Detaylar', 'Technical Details')}
              </button>
            </div>

            <div className="tab-content-container" style={{ minHeight: '200px' }}>
              
              {/* Tab: Materials & Swatches */}
              <div className={`tab-content ${activeTab === 'materials' ? 'active' : ''}`}>
                <div className="material-group">
                  <h4>{translate('Kumaş Seçenekleri', 'Fabric Options')}</h4>
                  <div className="swatch-grid">
                    {swatches.fabrics.map((item) => (
                      <div 
                        key={item.name} 
                        className="swatch-item" 
                        onClick={() => setActiveFabric(item.name)}
                        title={item.name}
                      >
                        <div 
                          className="swatch-color" 
                          style={{ 
                            backgroundColor: item.color,
                            border: activeFabric === item.name ? '2px solid #1a1a1a' : '1px solid #e5e5e5',
                            boxShadow: activeFabric === item.name ? '0 0 0 2px rgba(26,26,26,0.1)' : 'none',
                            transform: activeFabric === item.name ? 'scale(1.05)' : 'none'
                          }}
                        />
                        <span style={{ fontWeight: activeFabric === item.name ? '600' : '400' }}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="material-group" style={{ marginTop: '2.5rem' }}>
                  <h4>{translate('Ahşap Ayak Seçenekleri', 'Wooden Leg Options')}</h4>
                  <div className="swatch-grid">
                    {swatches.legs.map((item) => (
                      <div 
                        key={item.name} 
                        className="swatch-item" 
                        onClick={() => setActiveLeg(item.name)}
                        title={item.name}
                      >
                        <div 
                          className="swatch-color" 
                          style={{ 
                            backgroundColor: item.color,
                            border: activeLeg === item.name ? '2px solid #1a1a1a' : '1px solid #e5e5e5',
                            boxShadow: activeLeg === item.name ? '0 0 0 2px rgba(26,26,26,0.1)' : 'none',
                            transform: activeLeg === item.name ? 'scale(1.05)' : 'none',
                            borderRadius: '50%'
                          }}
                        />
                        <span style={{ fontWeight: activeLeg === item.name ? '600' : '400' }}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab: Specs */}
              <div className={`tab-content ${activeTab === 'specs' ? 'active' : ''}`}>
                <ul className="doc-list" style={{ listStyle: 'none', padding: 0 }}>
                  {p.technicalDetails.split('\n').map((line, idx) => {
                    const parts = line.split(':');
                    if (parts.length > 1) {
                      return (
                        <li key={idx} style={{ padding: '1.2rem 0', borderBottom: '1px solid #f0f0f0' }}>
                          <strong>{parts[0].trim()}:</strong>
                          <span style={{ color: '#666' }}>{parts.slice(1).join(':').trim()}</span>
                        </li>
                      );
                    }
                    return (
                      <li key={idx} style={{ padding: '1.2rem 0', borderBottom: '1px solid #f0f0f0', color: '#666' }}>
                        {line}
                      </li>
                    );
                  })}
                  {p.usageAreas && (
                    <li style={{ padding: '1.2rem 0', borderBottom: '1px solid #f0f0f0' }}>
                      <strong>{translate('Kullanım Alanları', 'Usage Areas')}:</strong>
                      <span style={{ color: '#666' }}>{p.usageAreas}</span>
                    </li>
                  )}
                </ul>
              </div>

            </div>
          </section>
        </div>

        {/* Similar Products Recommendation */}
        <div style={{ width: '100%', maxWidth: '800px', margin: '6rem auto 2rem auto' }}>
          <h3 className="apple-style-heading" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            {translate('İlginizi Çekebilecek Diğer Koleksiyonlar', 'Other Collections You May Like')}
          </h3>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
              gap: '2rem' 
            }}
          >
            {similarItems.map((item, idx) => (
              <div 
                key={idx} 
                className="similar-card"
                style={{
                  backgroundColor: '#faf8f5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(74, 69, 65, 0.03)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden', backgroundColor: '#ffffff', padding: '1rem' }}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                  />
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                  <h4 style={{ fontSize: '1rem', color: '#4a4541', marginTop: '0.5rem', fontWeight: '500' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
