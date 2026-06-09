import { useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';

export default function BurcKaplamaHistory() {
  const { activeLang } = useSite();

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    // Reveal animation observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bk-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bk-history-page">
      {/* Hero Header */}
      <section className="bk-page-hero">
        <div className="bk-page-hero-container">
          <span className="bk-page-hero-subtitle">
            {translate('Kurumsal / Hakkımızda', 'Corporate / About Us')}
          </span>
          <h1 className="bk-page-hero-title">
            {translate('Sanayi ve Yüzey Teknolojileri', 'Industrial & Surface Technologies')}
          </h1>
          <p className="bk-page-hero-desc">
            {translate(
              'Yüzey işlem ve kaplama sektöründeki tecrübemizle, endüstriyel metalleri korozyona ve aşınmaya karşı koruyarak değer katıyoruz.',
              'With our experience in the surface treatment and coating sector, we add value to industrial metals by protecting them against corrosion and wear.'
            )}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="bk-history-content bk-reveal">
        <div className="bk-history-intro-container">
          <div className="bk-history-intro-left">
            <h2>{translate('Deneyim ve Mühendisliğin Sinerjisi', 'Synergy of Experience & Engineering')}</h2>
            <div className="bk-gold-line"></div>
          </div>
          <div className="bk-history-intro-right">
            <p>
              {translate(
                'Burç Kaplama olarak, endüstriyel metal parçaların kullanım ömrünü uzatmak, mukavemetini artırmak ve yüzey kalitesini maksimize etmek amacıyla kurulduk. Bursa OSB\'de bulunan tesislerimizde, otomotivden savunma sanayiine, makine imalatından havacılığa kadar geniş bir yelpazede yüzey kaplama, kumlama, korozyon önleyici kaplamalar ve pasivasyon işlemleri gerçekleştiriyoruz.',
                'As Burç Kaplama, we were established to extend the service life, increase the strength, and maximize the surface quality of industrial metal parts. In our facilities located in Bursa OIZ, we perform surface plating, sandblasting, anti-corrosion coatings, and passivation processes for a wide range of industries from automotive to defense, machinery manufacturing to aerospace.'
              )}
            </p>
            <p>
              {translate(
                'Laboratuvar destekli kimyasal analiz süreçlerimiz, mikron düzeyinde kalınlık testlerimiz ve korozyon dayanım tuz testi kabinlerimizle, her projede sıfır hata hedefini benimsiyoruz. Gelişmiş teknolojik altyapımız ve uzman mühendis kadromuzla, küresel ve yerel sanayi kuruluşlarının en kritik çözüm ortaklarından biri olmayı sürdürüyoruz. (Kesin firma detayları ve resmi rakamlar için müşteri bilgisi bekleniyor)',
                'With our laboratory-backed chemical analysis processes, micron-level thickness tests, and corrosion resistance salt spray chambers, we adopt the zero-defect goal in every project. With our advanced technological infrastructure and expert engineering staff, we continue to be one of the most critical solution partners for global and local industrial organizations. (Client information pending for final corporate details and official figures)'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bk-timeline-section bk-reveal">
        <div className="bk-timeline-container">
          <h2 className="bk-timeline-section-title">{translate('Kilometre Taşlarımız', 'Our Milestones')}</h2>
          <div className="bk-timeline-wrapper">
            <div className="bk-timeline-line"></div>
            
            <div className="bk-timeline-item left">
              <div className="bk-timeline-dot"></div>
              <div className="bk-timeline-card">
                <span className="bk-timeline-year">1992</span>
                <h4>{translate('Kuruluş ve İlk Adımlar', 'Establishment & First Steps')}</h4>
                <p>
                  {translate(
                    'Bursa\'da fason metal kaplama ve kimyasal yüzey işlem atölyesi olarak sanayi faaliyetlerine başlandı.',
                    'Started industrial operations in Bursa as a contract metal plating and chemical surface treatment workshop.'
                  )}
                </p>
              </div>
            </div>

            <div className="bk-timeline-item right">
              <div className="bk-timeline-dot"></div>
              <div className="bk-timeline-card">
                <span className="bk-timeline-year">2005</span>
                <h4>{translate('Bursa OSB Tesisleri', 'Bursa OIZ Facility')}</h4>
                <p>
                  {translate(
                    'Üretim kapasitesini artırmak ve büyük sanayi projelerine hizmet vermek amacıyla Bursa Organize Sanayi Bölgesi\'ndeki modern fabrikaya taşınıldı.',
                    'Moved to the modern factory in Bursa Organized Industrial Zone to increase production capacity and serve large industrial projects.'
                  )}
                </p>
              </div>
            </div>

            <div className="bk-timeline-item left">
              <div className="bk-timeline-dot"></div>
              <div className="bk-timeline-card">
                <span className="bk-timeline-year">2015</span>
                <h4>{translate('Laboratuvar Yatırımı', 'Laboratory Investment')}</h4>
                <p>
                  {translate(
                    'Laboratuvar test altyapısı kurularak tuz testi kabinleri, X-Ray mikron ölçüm cihazları ve kimyasal analiz cihazları entegre edildi.',
                    'Established laboratory testing infrastructure, integrating salt spray test chambers, X-Ray thickness gauges, and chemical analysis devices.'
                  )}
                </p>
              </div>
            </div>

            <div className="bk-timeline-item right">
              <div className="bk-timeline-dot"></div>
              <div className="bk-timeline-card">
                <span className="bk-timeline-year">2026</span>
                <h4>{translate('Dijital Entegrasyon', 'Digital Integration')}</h4>
                <p>
                  {translate(
                    'CoreWeb portal altyapısına geçilerek üretim izlenebilirliği, kalite sertifikaları ve müşteri veri entegrasyonu dijitalleştirildi.',
                    'Transitioned to the CoreWeb portal infrastructure, digitalizing production traceability, quality certifications, and client data integration.'
                  )}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
