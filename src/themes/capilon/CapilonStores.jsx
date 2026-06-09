import { useState, useEffect } from 'react';
import { useSite } from '../../layouts/SiteLayout';
import { ChevronDown, Phone, Mail } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';
import './capilon.css';

const storeData = [
  {
    id: 'ankara-fabrika',
    city: 'ankara',
    name: 'Ankara Fabrika',
    address: 'Balıkhisar Mah. Yıldırım Beyazıt Cad. No 94, Akyurt / Ankara',
    phone: '0312 379 03 33',
    email: 'info@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Bal%C4%B1khisar%20Mah.%20Y%C4%B1ld%C4%B1r%C4%B1m%20Beyaz%C4%B1t%20Cad.%20No%2094%20Akyurt%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Balıkhisar+Mah+Yıldırım+Beyazıt+Cad+No+94+Akyurt+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Balıkhisar+Mah+Yıldırım+Beyazıt+Cad+No+94+Akyurt+Ankara'
  },
  {
    id: 'ankara-esertepe',
    city: 'ankara',
    name: 'Ankara Esertepe Showroom',
    address: 'Esertepe Mah. Ahmet Şefik Kolaylı Cad. No: 42 Keçiören / Ankara',
    phone: '0312 378 10 10',
    email: 'esertepe@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Esertepe%20Mah.%20Ahmet%20%C5%9Eefik%20Kolayl%C4%B1%20Cad.%20No:%2042%20Ke%C3%A7i%C3%B6ren%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Esertepe+Mah+Ahmet+Şefik+Kolaylı+Cad+No+42+Keçiören+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Esertepe+Mah+Ahmet+Şefik+Kolaylı+Cad+No+42+Keçiören+Ankara'
  },
  {
    id: 'ankara-aeglence',
    city: 'ankara',
    name: 'Ankara Aşağı Eğlence Showroom',
    address: 'Giresun Cad. No: 88 Aşağı Eğlence, Keçiören / Ankara',
    phone: '0312 322 20 20',
    email: 'aeglence@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Giresun%20Cad.%20No:%2088%20A%C5%9Fa%C4%9F%C4%B1%20E%C4%9Flence%20Ke%C3%A7i%C3%B6ren%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Giresun+Cad+No+88+Aşağı+Eğlence+Keçiören+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Giresun+Cad+No+88+Aşağı+Eğlence+Keçiören+Ankara'
  },
  {
    id: 'ankara-istanbulyolu',
    city: 'ankara',
    name: 'Ankara İstanbul Yolu Showroom',
    address: 'İstanbul Yolu 8. Km No:344 (Ertex Plaza) Batıkent – ANKARA',
    phone: '0312 278 30 31',
    email: 'istanbulyolu@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q%C4%B0stanbul%20Yolu%208.%20Km%20No:344%20Ertex%20Plaza%20Bat%C4%B1kent%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=İstanbul+Yolu+8+Km+No+344+Ertex+Plaza+Batıkent+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=İstanbul+Yolu+8+Km+No+344+Ertex+Plaza+Batıkent+Ankara'
  },
  {
    id: 'ankara-elvankent',
    city: 'ankara',
    name: 'Ankara Elvankent Showroom',
    address: 'Topçu Mah. 1464. Cad. (14. Cad.) No: 45 Elvankent /Ankara',
    phone: '0312 260 77 78',
    email: 'elvankent@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Top%C3%A7u%20Mah.%201464.%20Cad.%20No:%2045%20Elvankent%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Topçu+Mah+1464+Cad+No+45+Elvankent+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Topçu+Mah+1464+Cad+No+45+Elvankent+Ankara'
  },
  {
    id: 'ankara-pursaklar',
    city: 'ankara',
    name: 'Ankara Pursaklar Showroom',
    address: 'Yavuz Bulvarı Şantiye Cad. No:1/14-15 Pursaklar/Ankara',
    phone: '0312 328 40 40',
    email: 'pursaklar@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Yavuz%20Bulvar%C4%B1%20%C5%9Eantiye%20Cad.%20No:1/14-15%20Pursaklar%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Yavuz+Bulvarı+Şantiye+Cad+No+1+14+15+Pursaklar+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Yavuz+Bulvarı+Şantiye+Cad+No+1+14+15+Pursaklar+Ankara'
  },
  {
    id: 'ankara-siteler',
    city: 'ankara',
    name: 'Ankara Siteler Showroom',
    address: 'Karacakaya Cad. No:69/1 Siteler Altındağ/Ankara',
    phone: '0312 348 00 86',
    email: 'siteler@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Karacakaya%20Cad.%20No:69/1%20Siteler%20Alt%C4%B1nda%C4%9F%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Karacakaya+Cad+No+69+1+Siteler+Altındağ+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Karacakaya+Cad+No+69+1+Siteler+Altındağ+Ankara'
  },
  {
    id: 'ankara-istanbulyolu2',
    city: 'ankara',
    name: 'Ankara İstanbul Yolu 2 Showroom',
    address: 'İnönü Mahallesi 1728. Sok. No:3/C Yenimahalle-Ankara',
    phone: '0312 278 74 75',
    email: 'istanbulyolu@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=%C4%B0n%C3%B6n%C3%BC%20Mahallesi%201728.%20Sok.%20No:3/C%20Yenimahalle%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=İnönü+Mahallesi+1728+Sok+No+3+C+Yenimahalle+Ankara',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=İnönü+Mahallesi+1728+Sok+No+3+C+Yenimahalle+Ankara'
  },
  {
    id: 'bursa-nilufer',
    city: 'bursa',
    name: 'Bursa Nilüfer Showroom',
    address: 'Odunluk Mah. Akademi Cad. No: 8, Nilüfer / Bursa',
    phone: '0224 453 03 33',
    email: 'bursa@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Odunluk%20Mah.%20Akademi%20Cad.%20No:%208%20Nil%C3%BCfer%20Bursa&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Odunluk+Mah+Akademi+Cad+No+8+Nilüfer+Bursa',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Odunluk+Mah+Akademi+Cad+No+8+Nilüfer+Bursa'
  },
  {
    id: 'bursa-inegol',
    city: 'bursa',
    name: 'Bursa İnegöl Showroom',
    address: 'Mahmudiye Mah. Ertuğrulgazi Cad. No: 154 İnegöl / Bursa',
    phone: '0224 715 50 50',
    email: 'inegol@capilonmobilya.com',
    mapUrl: 'https://maps.google.com/maps?q=Mahmudiye%20Mah.%20Ertu%C4%9Frulgazi%20Cad.%20No:%20154%20%C4%B0neg%C3%B6l%20Bursa&t=&z=14&ie=UTF8&iwloc=&output=embed',
    viewUrl: 'https://www.google.com/maps/search/?api=1&query=Mahmudiye+Mah+Ertuğrulgazi+Cad+No+154+İnegöl+Bursa',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Mahmudiye+Mah+Ertuğrulgazi+Cad+No+154+İnegöl+Bursa'
  }
];

export default function CapilonStores() {
  const { activeLang } = useSite();
  const [filter, setFilter] = useState('all'); // 'all', 'ankara', 'bursa'
  const [expandedStoreId, setExpandedStoreId] = useState('ankara-fabrika');
  const [activeMapUrl, setActiveMapUrl] = useState(storeData[0].mapUrl);

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  useEffect(() => {
    const titleText = activeLang === 'tr' ? "Mağazalarımız" : "Our Stores";
    const descText = activeLang === 'tr'
      ? "Capilon Mobilya Türkiye genelindeki showroom ve satış noktaları. Size en yakın Capilon mağazasını bulun."
      : "Capilon Furniture showrooms and sales points across Turkey. Find the nearest Capilon store to you.";

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
  }, [activeLang]);

  // Filter stores based on active filter tab
  const filteredStores = storeData.filter(store => {
    if (filter === 'all') return true;
    return store.city === filter;
  });

  const handleStoreSelect = (store) => {
    if (expandedStoreId === store.id) {
      // Toggle accordion if clicked again (optional, but let's keep it open or toggleable)
      // To prevent closing the currently active map, we just expand/collapse
      setExpandedStoreId(expandedStoreId === store.id ? null : store.id);
    } else {
      setExpandedStoreId(store.id);
      setActiveMapUrl(store.mapUrl);
    }
  };

  return (
    <div className="capilon-theme stores-page-wrapper">
      <main id="main-content">
        {/* Hero Section */}
        <section className="stores-hero-clean">
          <div className="stores-hero-container">
            <h1>{translate('Mağazalarımız', 'Our Stores')}</h1>
            <p>
              {translate(
                'Türkiye genelindeki showroom ve satış noktalarımızla size en yakın Capilon konforunu keşfedin.',
                'Discover the nearest Capilon comfort with our showrooms and sales points across Turkey.'
              )}
            </p>
          </div>
        </section>

        {/* Stores Interactive Map Section */}
        <section className="stores-content-section">
          <div className="stores-container">
            {/* Split Grid Layout */}
            <div className="stores-split-grid">
              
              {/* Left: Interactive Accordion List */}
              <div className="stores-list-column" id="stores-accordion-list">
                
                {/* City Filter Segmented Control (100% width capsule) */}
                <div className="stores-filter-wrapper">
                  <button 
                    className={`store-filter-btn ${filter === 'all' ? 'active' : ''}`} 
                    onClick={() => setFilter('all')}
                  >
                    {translate('Tümü', 'All')}
                  </button>
                  <button 
                    className={`store-filter-btn ${filter === 'ankara' ? 'active' : ''}`} 
                    onClick={() => setFilter('ankara')}
                  >
                    Ankara
                  </button>
                  <button 
                    className={`store-filter-btn ${filter === 'bursa' ? 'active' : ''}`} 
                    onClick={() => setFilter('bursa')}
                  >
                    Bursa
                  </button>
                </div>

                {/* Showrooms Accordion */}
                <div className="stores-accordion-items-container">
                  {filteredStores.map((store) => {
                    const isExpanded = expandedStoreId === store.id;

                    return (
                      <div 
                        key={store.id}
                        className={`store-accordion-item ${isExpanded ? 'active' : ''}`}
                      >
                        {/* Header Click Selects Store & Toggles Accordion */}
                        <div 
                          className="store-header" 
                          onClick={() => handleStoreSelect(store)}
                          style={{ cursor: 'pointer' }}
                        >
                          <h3>{store.name}</h3>
                          <div className="store-header-right">
                            <ChevronDown 
                              size={16} 
                              className="store-chevron" 
                            />
                          </div>
                        </div>

                        {/* Accordion Body */}
                        <div className="store-body">
                          <div className="store-body-content">
                            <p>{store.address}</p>
                            
                            <div className="store-contact-row">
                              <Phone size={16} />
                              <a href={`tel:${store.phone.replace(/\s+/g, '')}`}>{store.phone}</a>
                            </div>
                            
                            <div className="store-contact-row">
                              <Mail size={16} />
                              <a href={`mailto:${store.email}`}>{store.email}</a>
                            </div>

                            {/* Akordeon İçi Kapsül Butonlar (Antrasit #414042) */}
                            <div className="store-actions-row">
                              <div className="map-capsule-button">
                                <a 
                                  href={store.viewUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="map-capsule-left"
                                >
                                  {translate('Haritada Aç', 'Open in Map')}
                                </a>
                                <a 
                                  href={store.directionsUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="map-capsule-right"
                                >
                                  {translate('Yol Tarifi', 'Get Directions')}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Sticky Iframe Map Container (No Border / Radius) */}
              <div className="stores-map-column">
                <iframe 
                  id="store-map-iframe" 
                  src={activeMapUrl} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title={translate('Seçili Capilon Mağazası Google Haritası', 'Selected Capilon Store Google Map')}
                  aria-label={translate('Seçili Capilon Mağazası Google Haritası', 'Selected Capilon Store Google Map')}
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      <div style={{ height: '150px', backgroundColor: '#ffffff', width: '100%' }}></div>
    </div>
  );
}
