import { Link } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { burcKaplamaData, translate } from './burcKaplamaData';
import './burckaplama.css';

export default function BurcKaplamaFooter() {
  const { tenantMapping, activeLang } = useSite();
  const { tenantSlug } = tenantMapping;

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === 'coreweb.tr' || hostname.endsWith('.vercel.app');

  const getLocalizedPath = (path) => {
    const prefix = isLocalOrPortal ? `/${tenantSlug}/${activeLang}` : `/${activeLang}`;
    if (path === '/') return prefix + '/';
    return `${prefix}${path}`;
  };

  return (
    <footer className="bk-footer">
      <div className="bk-footer-container">
        <div className="bk-footer-brand">
          <Link to={getLocalizedPath('/')} className="bk-logo-link">
            <div className="bk-logo-badge">B</div>
            <span style={{ color: '#ffffff' }}>{burcKaplamaData.company.name}</span>
          </Link>
          <p className="bk-footer-desc">
            {translate(activeLang, burcKaplamaData.company.title)}
          </p>
        </div>

        <div>
          <h4 className="bk-footer-title">
            {activeLang === 'tr' ? 'Kurumsal' : 'Corporate'}
          </h4>
          <ul className="bk-footer-links">
            {burcKaplamaData.navigation.map((item) => (
              <li key={item.id}>
                <Link to={getLocalizedPath(item.path)}>
                  {translate(activeLang, item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="bk-footer-title">
            {activeLang === 'tr' ? 'Hizmetler' : 'Services'}
          </h4>
          <ul className="bk-footer-links">
            {burcKaplamaData.services.map((svc) => (
              <li key={svc.id}>
                <Link to={getLocalizedPath(`/urunler?cat=${encodeURIComponent(svc.category)}`)}>
                  {translate(activeLang, svc.title)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="bk-footer-title">
            {activeLang === 'tr' ? 'İletişim' : 'Contact'}
          </h4>
          <div className="bk-footer-contact">
            <p style={{ margin: 0 }}>
              {translate(activeLang, burcKaplamaData.company.address)}
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>
              ({translate(activeLang, burcKaplamaData.company.addressDetail)})
            </p>
            <p style={{ margin: '0.5rem 0 0 0' }}>
              E: {burcKaplamaData.company.email}
            </p>
            <p style={{ margin: 0 }}>
              T: {burcKaplamaData.company.phone}
            </p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.82rem', opacity: 0.8 }}>
              {translate(activeLang, burcKaplamaData.company.workingHours)}
            </p>
          </div>
        </div>
      </div>

      <div className="bk-footer-bottom">
        <p className="bk-footer-copyright">
          &copy; {new Date().getFullYear()} {burcKaplamaData.company.name}. {activeLang === 'tr' ? 'Tüm Hakları Saklıdır.' : 'All Rights Reserved.'}
        </p>
        <div className="bk-footer-legal">
          <span style={{ fontSize: '0.78rem', opacity: 0.6 }}>
            {activeLang === 'tr' ? 'Müşteri hukuki metinleri bekleniyor' : 'Client legal texts pending'}
          </span>
        </div>
      </div>
    </footer>
  );
}
