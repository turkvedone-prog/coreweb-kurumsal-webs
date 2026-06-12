import { useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';

export default function CapilonHistory() {
  const { activeLang } = useSite();

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    const titleText = activeLang === 'tr' ? "Hakkımızda" : "About Us";
    const descText = activeLang === 'tr'
      ? "Capilon Mobilya'nın kurumsal öyküsü, tasarım felsefesi, üretim vizyonu ve Ankara entegre tesisleri hakkında bilgi edinin."
      : "Learn about Capilon Furniture's corporate story, design philosophy, production vision and Ankara integrated facilities.";

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
  }, [activeLang]);

  return (
    <div className="capilon-theme about-page-wrapper">
      <main id="main-content">
        {/* Hero Section */}
        <section className="about-hero-clean">
          <div className="about-hero-container">
            <h1>{translate('Hakkımızda', 'About Us')}</h1>
            <p>
              {translate(
                'Gelenekten geleceğe, yaşam alanlarınıza değer katan bir dünya markasının hikayesi.',
                'The story of a global brand adding value to your living spaces, from tradition to the future.'
              )}
            </p>
          </div>
        </section>

        {/* About Content Section */}
        <section className="about-content-section">
          <div className="about-container">
            {/* 1. Philosophical Intro Quote */}
            <div className="about-philosophical-intro">
              <p>
                {translate(
                  '“Bilgi; Dünya’nın ilk oluşumdan beri süregelen toplumların aktarımları ile bütünleşerek oluşmuştur. Sümerler ilk yazıyı tabletlere yazdıklarında amaçları herkes tarafından erişilebilen bir hafızayı oluşturup, bilgi ve birikimleri gelecek nesiller için aktarmaktı. Zira insanlığın nesil ömrü her türlü bilgi, birikim ve deneyimi tecrübe edecek ve çözümler bulacak kadar uzun değildi.”',
                  '“Knowledge has been formed by integrating the transfers of societies that have been ongoing since the first formation of the Earth. When the Sumerians first wrote tablets, their aim was to create a memory accessible by everyone and to transfer knowledge and accumulation for future generations. For the generation lifespan of humanity was not long enough to experience all kinds of knowledge, accumulation, and experiences and find solutions.”'
                )}
              </p>
            </div>

            {/* 2. Split Story Content */}
            <div className="about-split-story">
              {/* Left: Story Text */}
              <div className="about-text-column">
                <h2>{translate('Ustalık ve Vizyon', 'Craftsmanship and Vision')}</h2>
                <p>
                  {translate(
                    'Bizler de esasen Dünya olarak kabul edilmiş bu davranış ile başladık hikayemize. Tüm Dünya’nın oluşturduğu bir refleks ve esasen yaşadığımız toplumun kültürel bir alışkanlığı ile usta ve çırak ilişkimizi geliştirdik.',
                    'We also basically started our story with this behavior accepted as the World. We developed our master and apprentice relationship with a reflex created by the whole World and basically a cultural habit of the society we live in.'
                  )}
                </p>
                <p>
                  {translate(
                    'Capilon’un kurucusunun bir aile geleneği olan “İnsanların yaşam alanlarına, değer katmak” fikrini daha büyük bir hacme ulaştırdık sadece ve gelenekten elde edindiğimiz bilgi ve birikimleri güncele göre yorumladık.',
                    'We just brought the idea of "adding value to people\'s living spaces", which is a family tradition of Capilon\'s founder, to a larger volume and interpreted the knowledge and accumulation we obtained from tradition according to the current.'
                  )}
                </p>
                <p>
                  {translate(
                    'Bizce eksik olan; Dünya trendlerini pazara kendi yorumları ile entegre eden meslektaşlarımızın bu ürünleri yaşam alanlarında barındıracak olan kitlenin istekleri ile birleştirememesi idi. Aslına bakacak olursanız bu durum ürünleri satın alan ve kullanan ürünlerin nihai sahipleri açısından oldukça da sorun oluşturan bir hal almıştı.',
                    'What was missing in our opinion was that our colleagues, who integrated world trends into the market with their own interpretations, could not combine these products with the wishes of the audience that would host them in their living spaces. In fact, this situation became quite problematic for the ultimate owners of the products who bought and used them.'
                  )}
                </p>
                <p>
                  {translate(
                    'Capilon; Tüm Dünya’yı okudu, trendleri ve moda otoritelerini izledi. Sıra bunları ürünleştirecek tasarımlar üretmeye geldiğinde ise nihai sahiplerinin kullanım alışkanlıklarını gözlemleyerek ürünleri türetti. Bu reaksiyonların akabinde ortaya katma değerini kullanıcıdan alan, estetik ancak kullanışlı, sağlam ama pratik modeller çıktı.',
                    'Capilon read the whole World, followed trends and fashion authorities. When it came to producing designs that would productize these, it derived products by observing the usage habits of their ultimate owners. Following these reactions, models that derive their value from the user, aesthetic but useful, solid but practical emerged.'
                  )}
                </p>
              </div>

              {/* Right: Factory Image */}
              <div className="about-image-column">
                <img
                  src="/assets/capilon/images/fabrika-1.webp"
                  alt={translate('Capilon Mobilya Entegre Fabrikası', 'Capilon Furniture Integrated Factory')}
                  loading="lazy"
                />
                <div className="about-image-overlay">
                  <h4>{translate('Endüstri 4.0 Üretim Üssü', 'Industry 4.0 Production Center')}</h4>
                  <p>
                    {translate(
                      'En yeni ve en kaliteli üretim ekipmanlarıyla donatılmış tesislerimiz',
                      'Our facilities equipped with the newest and highest quality production machinery'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Expansion Narrative */}
            <div className="about-text-column">
              <h2>{translate('Küresel Ölçekte Üretim ve Güç', 'Production and Power on a Global Scale')}</h2>
              <p>
                {translate(
                  'Capilon’un bu tutumu çok kısa sürede karşılık gördü. Kullanıcı bu ürünlere sahip olmak için yoğun bir talep oluşturdu. Bu durum Capilon için yoğun çalışma mesaileri ve yeni, büyük entegre fabrikalar demekti.',
                  'This attitude of Capilon was responded to in a very short time. The user created an intense demand to own these products. This meant intense working hours and new, large integrated factories for Capilon.'
                )}
              </p>
              <p>
                {translate(
                  'Tabii ki Capilon yapılması gerekenlerden ve sorumluluklarından geri durmayarak bölgede Endüstri 4.0 ile donatılmış, en yeni olmak ile beraber en kaliteli üretim ekipmanlarını bir araya getirerek mobilya ürünleri üzerinde otorite olabilme kapasitesine sahip tesis kurdu.',
                  'Of course, Capilon did not stand back from what needed to be done and its responsibilities, and established a facility equipped with Industry 4.0 in the region, bringing together the newest and highest quality production equipment, capable of being an authority on furniture products.'
                )}
              </p>
              <p>
                {translate(
                  'Capilon şimdi Ankara genelinde 8 Maxi Showroom ve Türkiye genelinde 100’e yakın bayisi yanı sıra Dünya’nın 3 kıtasına ürünlerini sevk eden bir marka olarak hizmetine devam etmektedir.',
                  'Capilon now continues its service as a brand shipping its products to 3 continents of the world, in addition to its 8 Maxi Showrooms in Ankara and close to 100 dealers across Turkey.'
                )}
              </p>
            </div>

            {/* 4. Stats Grid */}
            <div className="about-stats-grid">
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">{translate('Kıta', 'Continents')}</div>
                <div className="stat-desc">{translate('Dünya çapında aktif ihracat ağı', 'Active export network worldwide')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">{translate('Bayi', 'Dealers')}</div>
                <div className="stat-desc">{translate('Türkiye genelinde yaygın satış kanalı', 'Widespread sales channel across Turkey')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">8</div>
                <div className="stat-label">{translate('Maxi Showroom', 'Maxi Showrooms')}</div>
                <div className="stat-desc">{translate('Ankara genelindeki zengin konsept mağazalarımız', 'Our rich concept stores across Ankara')}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">4.0</div>
                <div className="stat-label">{translate('Teknoloji', 'Technology')}</div>
                <div className="stat-desc">{translate('Endüstri 4.0 standartlarında akıllı üretim tesisi', 'Smart production plant at Industry 4.0 standards')}</div>
              </div>
            </div>

            {/* 5. CTA Banner */}
            <div className="about-cta-banner">
              <h3>{translate('“Sizin için tasarlıyor, Türkiye için üretiyoruz.”', '“Designing for you, producing for Turkey.”')}</h3>
              <p>
                {translate(
                  'Yaşam alanlarınıza değer katan yenilikçi ve konforlu tasarımlarımızla evinizin her köşesindeyiz.',
                  'We are in every corner of your home with our innovative and comfortable designs that add value to your living spaces.'
                )}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <div style={{ height: '150px', backgroundColor: '#ffffff', width: '100%' }}></div>
    </div>
  );
}
