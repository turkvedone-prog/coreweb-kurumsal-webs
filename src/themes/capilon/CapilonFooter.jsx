import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { Phone } from 'lucide-react';

export default function CapilonFooter() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    return `${prefix}${path}`;
  };

  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  return (
    <>
      {/* Footer */}
      <footer className="mega-footer" aria-label="Site Footer" id="iletisim-footer">
        <div className="footer-main-container">
          <div className="footer-links-area">
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Takımlar', 'Popular Sets')}</h4>
              <ul className="footer-list">
                <li><a href={getLocalizedPath('/#koltuk')}>{translate('Koltuk Takımları', 'Living Room Sets')}</a></li>
                <li><a href={getLocalizedPath('/#kose')}>{translate('Köşe Takımları', 'Corner Sofa Sets')}</a></li>
                <li><a href={getLocalizedPath('/#yemek')}>{translate('Yemek Odası Takımları', 'Dining Room Sets')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Yatak Odası Takımları', 'Bedroom Sets')}</a></li>
                <li><a href={getLocalizedPath('/#genc')}>{translate('Genç Odası Takımları', 'Teen Room Sets')}</a></li>
                <li><a href="#evlilik-paketleri">{translate('Düğün Paketleri', 'Wedding Packages')}</a></li>
                <li><a href={getLocalizedPath('/#mutfak')}>{translate('Mutfak Takımları', 'Kitchen Sets')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Popüler Kategoriler', 'Popular Categories')}</h4>
              <ul className="footer-list">
                <li><a href={getLocalizedPath('/#koltuk')}>{translate('Oturma Grubu', 'Living Room')}</a></li>
                <li><a href={getLocalizedPath('/#yemek')}>{translate('Yemek Odası', 'Dining Room')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Yatak Odası', 'Bedroom')}</a></li>
                <li><a href={getLocalizedPath('/#genc')}>{translate('Genç ve Çocuk Odası', 'Teen & Kid Room')}</a></li>
                <li><a href="#bahce-mobilyalari">{translate('Bahçe Mobilyaları', 'Garden Furniture')}</a></li>
                <li><a href="#dolaplar">{translate('Dolaplar', 'Wardrobes')}</a></li>
                <li><a href={getLocalizedPath('/#tv')}>{translate('TV Üniteleri', 'TV Units')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Capilon Yatak', 'Capilon Mattress')}</h4>
              <ul className="footer-list">
                <li><a href="#yataklar">{translate('Yataklar', 'Mattresses')}</a></li>
                <li><a href="#yastik-yorgan">{translate('Yastık & Yorgan', 'Pillows & Quilts')}</a></li>
                <li><a href="#baza-baslik">{translate('Baza & Başlık', 'Bases & Headboards')}</a></li>
                <li><a href="#yatak-odasi-tekstili">{translate('Yatak Odası Tekstili', 'Bedroom Textile')}</a></li>
                <li><a href="#yatak-odasi-ceyiz">{translate('Yatak Odası Çeyiz Listesi', 'Bedroom Dowry List')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Tek Kişilik Yataklar', 'Single Mattresses')}</a></li>
                <li><a href={getLocalizedPath('/#yatak')}>{translate('Çift Kişilik Yataklar', 'Double Mattresses')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('2026 Kataloglar', '2026 Catalogs')}</h4>
              <p className="footer-desc">{translate('Koleksiyonlarımızın kataloglarını inceleyin.', 'Examine the catalogs of our collections.')}</p>
              <div className="footer-catalogs-grid">
                <img src="/assets/capilon/images/hero_living_room_1779477814666.png" alt="Katalog 1" loading="lazy" />
                <img src="/assets/capilon/images/hero_bedroom_1779477829254.png" alt="Katalog 2" loading="lazy" />
                <img src="/assets/capilon/images/product_dining_1779477859352.png" alt="Katalog 3" loading="lazy" />
                <img src="/assets/capilon/images/capilon_banner_couple_1779566197653.png" alt="Katalog 4" loading="lazy" />
              </div>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">Capilon Kurumsal</h4>
              <ul className="footer-list">
                <li><a href="#kurumsal">{translate('Hakkımızda', 'About Us')}</a></li>
                <li><Link to={getLocalizedPath('/iletisim')}>{translate('İletişim', 'Contact')}</Link></li>
                <li><a href="#is-ortakligi">{translate('İş Ortaklığı', 'Partnership')}</a></li>
                <li><a href="#kataloglar">{translate('Kataloglar', 'Catalogs')}</a></li>
                <li><a href="#magazalar">{translate('Mağazalar', 'Stores')}</a></li>
                <li><Link to={getLocalizedPath('/blog')}>{translate('Blog', 'Blog')}</Link></li>
                <li><a href="#tedarikci">{translate('Tedarikçi Başvuru', 'Supplier Application')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Hızlı Erişim', 'Quick Access')}</h4>
              <ul className="footer-list">
                <li><a href="#dekorasyon">{translate('Dekorasyon Önerileri', 'Decoration Tips')}</a></li>
                <li><a href="#siparislerim">{translate('Siparişlerim', 'My Orders')}</a></li>
                <li><a href="#hesabim">{translate('Hesabım', 'My Account')}</a></li>
                <li><a href="#siparis-takibi">{translate('Sipariş Takibi', 'Order Tracking')}</a></li>
                <li><a href="#sifremi-unuttum">{translate('Şifremi Unuttum', 'Forgot Password')}</a></li>
                <li><a href="#destek">{translate('Destek Merkezi', 'Support Center')}</a></li>
                <li><a href="#kampanyalar">{translate('Kampanyalar', 'Campaigns')}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-heading">{translate('Sözleşmeler', 'Agreements')}</h4>
              <ul className="footer-list">
                <li><a href="#iptal">{translate('İptal ve İade Şartları', 'Cancellation & Return Policy')}</a></li>
                <li><a href="#bilgi">{translate('Bilgi Toplumu Hizmetleri', 'Information Society Services')}</a></li>
                <li><a href="#gizlilik">{translate('Gizlilik ve Güvenlik', 'Privacy & Security')}</a></li>
                <li><a href="#kvkk">{translate('KVKK Aydınlatma Metni', 'KVKK Disclosure')}</a></li>
                <li><a href="#aydinlatma">{translate('Aydınlatma Metni', 'Clarification Text')}</a></li>
                <li><a href="#ziyaretci">{translate('Ziyaretçi Aydınlatma Metni', 'Visitor Clarification Text')}</a></li>
                <li><a href="#kargo">{translate('Kargo ve Teslimat Politikası', 'Shipping & Delivery Policy')}</a></li>
                <li><a href="#cerez">{translate('Çerez Politikası', 'Cookie Policy')}</a></li>
              </ul>
            </div>
            <div className="footer-col contact-col">
              <h4 className="footer-heading">{translate('İletişim Merkezi', 'Contact Center')}</h4>
              <p className="footer-desc">{translate('Bize yazarak yada arayarak ulaşabilirsiniz.', 'You can reach us by writing or calling.')}</p>
              <Link to={getLocalizedPath('/iletisim')} className="footer-contact-btn">{translate('İletişim', 'Contact')}</Link>
              <a href="tel:08503333333" className="footer-contact-btn tel-btn">
                <Phone size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                0850 333 33 33
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-logo-left">
            <Link to={getLocalizedPath('/')}>
              <img src="/assets/capilon/images/Capilon-Mobilya-Logo.svg" alt="Capilon Mobilya Grubu" style={{ height: '30px' }} />
            </Link>
          </div>
          <div className="footer-copyright">
            Copyright © 2026 Capilon Mobilya. {translate('Tüm hakları saklıdır.', 'All rights reserved.')}
          </div>
          <div className="footer-signature">
            {translate('Tasarım & Yazılım:', 'Design & Software:')} <strong>Kreatiffikirler.com</strong>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/905000000000" className="floating-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="34" height="34" fill="#fff">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </>
  );
}
