import { useEffect } from 'react';

export default function BurobigEcoBanner() {
  // Safe Intersection Observer for scroll animation reveal-up
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="eco-section reveal-up" aria-label="Sürdürülebilirlik ve Çevre" id="eco-banner">
      <div className="eco-container">
        <div className="eco-card">
          <div className="eco-header">
            <h2 className="eco-title">Sürdürülebilir Üretim, Güvenilir Standartlar</h2>
            <p className="eco-subtitle">Doğaya duyarlı üretim anlayışımız, yeşil enerji kullanımı ve uluslararası kalite standartlarına uygun malzeme seçimimizle geleceğe değer katıyoruz.</p>
          </div>
          <div className="eco-grid">
            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7a8 8 0 0 1-7.9 8.07c-.4 0-.75-.1-.75-.1a7 7 0 0 1-1.35 3.03z"></path>
                  <path d="M19 2c-3 4-8 5.5-10 11"></path>
                </svg>
              </div>
              <h3 className="eco-item-title">Çevreye Duyarlı Üretim</h3>
              <p className="eco-item-text">Üretim süreçlerimizde doğaya saygılı, kaynakları verimli kullanan ve sürdürülebilir yöntemleri benimsiyoruz.</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3 className="eco-item-title">Yeşil Enerji Yaklaşımı</h3>
              <p className="eco-item-text">Enerji kullanımında çevresel etkiyi azaltan, yenilenebilir ve verimli çözümleri önceliklendiriyoruz.</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="eco-item-title">Kaliteli ve Güvenli Malzemeler</h3>
              <p className="eco-item-text">Kullanılan malzemeler dayanıklılık, hijyen, güvenlik ve uzun ömür kriterlerine göre titizlikle seçilir.</p>
            </div>

            <div className="eco-item">
              <div className="eco-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="eco-item-title">Uluslararası Standartlar</h3>
              <p className="eco-item-text">Ürün ve hizmet süreçlerimizde global kalite anlayışına uygun, güven veren standartları esas alıyoruz.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
