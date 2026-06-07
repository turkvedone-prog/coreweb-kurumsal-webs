import { useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import './capilon.css';

export default function CapilonHome() {
  const { activeLang } = useSite();

  // Set custom document title and description
  useEffect(() => {
    document.title = activeLang === 'tr'
      ? "Capilon Mobilya | Premium Ev Mobilyaları ve Yaşam Alanları"
      : "Capilon Furniture | Premium Home Furniture & Living Spaces";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }

    const descText = activeLang === 'tr'
      ? "Eviniz için ilham veren, sıcak ve zamansız dokunuşlar. Modern salon, yatak odası ve yemek odası mobilya koleksiyonunu keşfedin."
      : "Inspiring, warm and timeless touches for your home. Discover the modern living room, bedroom and dining room furniture collections.";
    
    metaDesc.setAttribute('content', descText);
  }, [activeLang]);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  return (
    <>
      {/* Skip to Content (Accessibility) */}
      <a href="#main-content" className="sr-only focus:not-sr-only" style={{ position: 'absolute', top: '-100px' }}>
        {translate('İçeriğe Atla', 'Skip to Content')}
      </a>

      {/* Top Bar (Capilon Orange) */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span>{translate('Yaşam Alanlarınıza Değer Katan Tasarımlar', 'Designs Adding Value to Your Living Spaces')}</span>
          </div>
          <div className="top-bar-right">
            <a href="tel:08503333333" className="whatsapp-link">
              0850 333 33 33
            </a>
            <a href="#iletisim">{translate('İletişim', 'Contact')}</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="site-header" id="site-header">
        <div className="header-container">
          <div className="header-brand">
            <a href="/" aria-label="Ana Sayfa — Capilon Mobilya">
              <img
                src="/assets/capilon/images/Capilon-Mobilya-Logo.svg"
                alt="Capilon Mobilya Logo"
                className="logo__img"
                width="180"
                height="50"
                loading="eager"
              />
            </a>
          </div>
          <div className="header-actions">
            <span className="action-icon">
              <span>{translate('E-Tahsilat', 'E-Payment')}</span>
            </span>
            <span className="action-icon">
              <span>{translate('Favoriler', 'Favorites')}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div
            className="hero-bg"
            style={{ backgroundImage: `url('/assets/capilon/images/hero_living_room_1779477814666.png')` }}
          />
          <div className="hero-content">
            <span className="hero-overline">{translate('YENİ SEZON KOLEKSİYONU', 'NEW SEASON COLLECTION')}</span>
            <h1 id="hero-heading">
              {translate('Zamanın Ötesinde', 'Beyond Time')}<br />
              {translate('Tasarım Anlayışı', 'Design Conception')}
            </h1>
            <p>
              {translate(
                "Capilon Mobilya'nın yeni dijital deneyimi ve premium ev koleksiyonları çok yakında bu adreste yayında olacaktır. Şu anda hazırlık aşamasındayız.",
                "Capilon Furniture's new digital experience and premium home collections will be live on this address very soon. We are currently in staging mode."
              )}
            </p>
            <a href="#koleksiyonlar" className="btn-primary">
              {translate('Detayları Keşfet', 'Discover Details')} <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Neden Capilon Manifesto Section */}
        <section className="manifesto-section" id="koleksiyonlar">
          <div className="manifesto-container">
            <div className="manifesto-header">
              <h2>{translate('Yaşam Alanınızı Yeniden Keşfedin', 'Rediscover Your Living Space')}</h2>
              <p>{translate('Tarzınızı yansıtacak seçkin ve modern bir tasarım çizgisi.', 'An exclusive and modern design line to reflect your style.')}</p>
            </div>
            <div className="manifesto-grid">
              <div className="manifesto-card">
                <div className="manifesto-number">01</div>
                <div className="manifesto-info">
                  <h3>{translate('Trendleri Araştırıyoruz', 'We Research Trends')}</h3>
                  <p>
                    {translate(
                      "Nelere ihtiyacınız olduğunu biliyor ve dünyanın en seçkin tasarım trendlerini araştırarak sizin için en doğrusunu üretiyoruz.",
                      "We know what you need and produce the most suitable pieces for you by researching the world's most elite design trends."
                    )}
                  </p>
                </div>
              </div>
              <div className="manifesto-card">
                <div className="manifesto-number">02</div>
                <div className="manifesto-info">
                  <h3>{translate('Özenle Geliştiriyoruz', 'We Carefully Develop')}</h3>
                  <p>
                    {translate(
                      "Kullanıcı deneyimine dayalı, sağlam, modern, kullanışlı ve şık ürünleri en yüksek kalite standartlarında fabrikamızda üretiyoruz.",
                      "We produce sturdy, modern, useful and stylish products based on user experience at the highest quality standards in our factory."
                    )}
                  </p>
                </div>
              </div>
              <div className="manifesto-card">
                <div className="manifesto-number">03</div>
                <div className="manifesto-info">
                  <h3>{translate('Türkiye\'nin Her Yerindeyiz', 'We Are Everywhere in Turkey')}</h3>
                  <p>
                    {translate(
                      "Özenle ambalajlanmış ürünlerimizi tüm Türkiye genelinde hızlı ve güvenli sevk ederek hak edilen kalitenin yaşanmasını sağlıyoruz.",
                      "We deliver our carefully packaged products rapidly and safely all around Turkey, ensuring you experience the quality you deserve."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="contact-cta-bar" id="iletisim">
          <div className="contact-cta-container">
            <h3>{translate('Projelerimiz Hakkında Bilgi Alın', 'Get Information About Our Projects')}</h3>
            <p>
              {translate(
                "Capilon Mobilya kurumsal katalogları, güncel kampanyalar ve ürün koleksiyonlarımız için temsilcilerimizle iletişime geçebilirsiniz.",
                "You can contact our representatives for Capilon Furniture corporate catalogs, current campaigns, and product collections."
              )}
            </p>
            <div className="contact-buttons">
              <a href="tel:08503333333" className="btn-outline">
                <Phone size={16} /> 0850 333 33 33
              </a>
              <a
                href="https://wa.me/905000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-whatsapp"
              >
                <Mail size={16} /> WhatsApp {translate('Destek Hattı', 'Support Line')}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer" aria-label="Site Footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img
              src="/assets/capilon/images/Capilon-Mobilya-Logo.svg"
              alt="Capilon Mobilya"
              width="130"
              height="36"
              loading="lazy"
            />
          </div>
          <div className="footer-copyright">
            Copyright © 2026 Capilon Mobilya. {translate('Tüm hakları saklıdır.', 'All rights reserved.')}
          </div>
          <div className="footer-signature">
            {translate('Altyapı:', 'Infrastructure:')} <strong>CoreWeb</strong>
          </div>
        </div>
      </footer>
    </>
  );
}
