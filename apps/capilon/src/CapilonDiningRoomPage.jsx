import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from './layouts/SiteLayout';
import { ArrowRight } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';
import './capilon.css';

export default function CapilonDiningRoomPage() {
  const { activeLang } = useSite();

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    const titleText = translate(
      "Yemek Odaları | Capilon Mobilya Premium Yaşam Alanları",
      "Dining Rooms | Capilon Furniture Premium Living Spaces"
    );
    const descText = translate(
      "Capilon'un özgün ve estetik yemek odası koleksiyonlarını keşfedin. Konfor ve şıklığı bir arada sunan premium yemek odası takımları.",
      "Discover Capilon's unique and aesthetic dining room collections. Premium dining room sets offering comfort and elegance together."
    );

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLang]);

  const products = [
    { id: 'serenity', title: translate('Serenity Yemek Odası Takımı', 'Serenity Dining Room Set'), slug: 'serenity-yemek-odasi-takimi' },
    { id: 'lizbon', title: translate('Lizbon Yemek Odası Takımı', 'Lizbon Dining Room Set'), slug: 'lizbon-yemek-odasi-takimi' },
    { id: 'madrid', title: translate('Madrid Yemek Odası Takımı', 'Madrid Dining Room Set'), slug: 'madrid-yemek-odasi-takimi' },
    { id: 'valentina', title: translate('Valentina Yemek Odası Takımı', 'Valentina Dining Room Set'), slug: 'valentina-yemek-odasi-takimi' },
    { id: 'zirve', title: translate('Zirve Yemek Odası Takımı', 'Zirve Dining Room Set'), slug: 'zirve-yemek-odasi-takimi' },
    { id: 'bohem', title: translate('Bohem Yemek Odası Takımı', 'Bohem Dining Room Set'), slug: 'bohem-yemek-odasi-takimi' },
    { id: 'star', title: translate('Star Yemek Odası Takımı', 'Star Dining Room Set'), slug: 'star-yemek-odasi-takimi' },
    { id: 'natura', title: translate('Natura Yemek Odası Takımı', 'Natura Dining Room Set'), slug: 'natura-yemek-odasi-takimi' },
    { id: 'dolce', title: translate('Dolce Yemek Odası Takımı', 'Dolce Dining Room Set'), slug: 'dolce-yemek-odasi-takimi' },
    { id: 'roma', title: translate('Roma Yemek Odası Takımı', 'Roma Dining Room Set'), slug: 'roma-yemek-odasi-takimi' },
    { id: 'kumsal-takim', title: translate('Kumsal Yemek Odası Takımı', 'Kumsal Dining Room Set'), slug: 'kumsal-yemek-odasi-takimi' },
    { id: 'tesla', title: translate('Tesla Yemek Odası Takımı', 'Tesla Dining Room Set'), slug: 'tesla-yemek-odasi-takimi' },
    { id: 'story', title: translate('Story Yemek Odası Takımı', 'Story Dining Room Set'), slug: 'story-yemek-odasi-takimi' },
    { id: 'milano', title: translate('Milano Yemek Odası', 'Milano Dining Room'), slug: 'milano-yemek-odasi' },
    { id: 'panora', title: translate('Panora Yemek Odası', 'Panora Dining Room'), slug: 'panora-yemek-odasi' },
    { id: 'anatolia', title: translate('Anatolia Yemek Odası Takımı', 'Anatolia Dining Room Set'), slug: 'anatolia-yemek-odasi-takimi' },
    { id: 'alvin-ceviz', title: translate('Alvin Ceviz Yemek Odası Takımı', 'Alvin Walnut Dining Room Set'), slug: 'alvin-ceviz-yemek-odasi-takimi' },
    { id: 'alvin-beyaz', title: translate('Alvin Beyaz Yemek Odası Takımı', 'Alvin White Dining Room Set'), slug: 'alvin-beyaz-yemek-odasi-takimi' },
    { id: 'riva', title: translate('Riva Yemek Odası', 'Riva Dining Room'), slug: 'riva-yemek-odasi' },
    { id: 'secret', title: translate('Secret Yemek Odası Takımı', 'Secret Dining Room Set'), slug: 'secret-yemek-odasi-takimi' },
    { id: 'ruya', title: translate('Rüya Yemek Odası', 'Rüya Dining Room'), slug: 'ruya-yemek-odasi' },
    { id: 'almira', title: translate('Almira Yemek Odası Takımı', 'Almira Dining Room Set'), slug: 'almira-yemek-odasi-takimi' },
    { id: 'deco', title: translate('Deco Yemek Odası Takımı', 'Deco Dining Room Set'), slug: 'deco-yemek-odasi-takimi' },
    { id: 'atlas', title: translate('Atlas Yemek Odası Takımı', 'Atlas Dining Room Set'), slug: 'atlas-yemek-odasi-takimi' },
    { id: 'hedef', title: translate('Hedef Yemek Odası Takımı', 'Hedef Dining Room Set'), slug: 'hedef-yemek-odasi-takimi' },
    { id: 'ayasofya', title: translate('Ayasofya Yemek Odası', 'Ayasofya Dining Room'), slug: 'ayasofya-yemek-odasi' },
    { id: 'gucci', title: translate('Gucci Yemek Odası', 'Gucci Dining Room'), slug: 'gucci-yemek-odasi' },
    { id: 'halic', title: translate('Haliç Yemek Odası', 'Haliç Dining Room'), slug: 'halic-yemek-odasi' },
    { id: 'kumsal', title: translate('Kumsal Yemek Odası', 'Kumsal Dining Room'), slug: 'kumsal-yemek-odasi' },
    { id: 'luna', title: translate('Luna Yemek Odası', 'Luna Dining Room'), slug: 'luna-yemek-odasi' },
    { id: 'parma', title: translate('Parma Yemek Odası', 'Parma Dining Room'), slug: 'parma-yemek-odasi' },
    { id: 'riva-2', title: translate('Riva Yemek Odası (2)', 'Riva Dining Room (2)'), slug: 'riva-yemek-odasi-2' },
    { id: 'topkapi', title: translate('Topkapı Yemek Odası', 'Topkapı Dining Room'), slug: 'topkapi-yemek-odasi' }
  ];

  const productImg = '/assets/capilon/images/cat_armchair_warm.png';

  return (
    <div className="capilon-theme collections-page-wrapper">
      {/* Hero Header Section */}
      <section className="collections-hero-section">
        <div className="collections-container">
          <div className="collections-hero-content">
            <h1 className="collections-hero-title">{translate('Yemek Odaları', 'Dining Rooms')}</h1>
            <p className="collections-hero-subtitle">
              {translate(
                "Capilon’un tasarım ve konforu bir arada sunan, yaşam alanlarınıza sıcak ve zamansız dokunuşlar katan benzersiz mobilya dünyasını keşfedin.",
                "Discover Capilon's unique furniture world that offers design and comfort together, adding warm and timeless touches to your living spaces."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="collections-grid-section">
        <div className="collections-container">
          <div className="collections-page-grid dining-page-grid">
            {products.map((item) => (
              <Link 
                key={item.id} 
                id={`product-card-${item.id}`}
                to={getLocalizedPath(`/urunler/${item.slug}`)}
                className="product-grid-card"
                style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}
              >
                {/* Image Container */}
                <div className="card-image-wrapper">
                  <img 
                    src={productImg} 
                    alt={item.title} 
                    className="card-image"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="card-details">
                  <h2 className="card-title">{item.title}</h2>
                  
                  {/* Presentation CTA Indicator */}
                  <div className="card-cta-indicator">
                    <span>{translate('Ürünü İncele', 'View Product')}</span>
                    <ArrowRight size={16} className="cta-arrow" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Brand/Consultancy Banner */}
      <section className="collections-consultation-banner">
        <div className="collections-container">
          <div className="consultation-card">
            <div className="consultation-content">
              <span className="consultation-badge">
                {translate('MİMARİ DANIŞMANLIK', 'INTERIOR CONSULTANCY')}
              </span>
              <h2 className="consultation-title">
                {translate(
                  'Evinizi Birlikte Tasarlayalım',
                  'Let\'s Design Your Home Together'
                )}
              </h2>
              <p className="consultation-text">
                {translate(
                  'Alanında uzman iç mimarlarımız ve tasarım ekibimizle, hayalinizdeki yaşam alanlarını Capilon şıklığı ile buluşturuyoruz. Ücretsiz tasarım danışmanlığı için bize ulaşın.',
                  'With our expert interior architects and design team, we bring your dream living spaces together with Capilon elegance. Contact us for free design consultancy.'
                )}
              </p>
            </div>
            <div className="consultation-action">
              <Link 
                to={getLocalizedPath('/iletisim')} 
                className="consultation-btn"
                id="collections-consultation-cta"
              >
                <span>{translate('Tasarım Danışmanlığı Alın', 'Get Design Consultation')}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <div style={{ height: '150px', backgroundColor: 'transparent', width: '100%' }}></div>
    </div>
  );
}
