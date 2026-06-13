import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViolaHeader from './ViolaHeader.jsx';
import ViolaHome from './ViolaHome.jsx';
import ViolaFooter from './ViolaFooter.jsx';
import ViolaProductDetail from './ViolaProductDetail.jsx';

// Standalone Viola app — no SiteLayout/useSite dependency
// activeLang is hardcoded to 'tr' for this static template build

function NotFound() {
  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Sayfa Bulunamadı</h2>
      <a href="/" style={{ color: '#6c63ff' }}>Ana Sayfaya Dön</a>
    </div>
  );
}

// Placeholder product for demo routes
const betaProduct = {
  title: 'Beta Koleksiyonu',
  category: 'Yönetici Serisi',
  description: 'Ergonomik yapısı ve premium malzemeleriyle öne çıkan Beta, modern ofis ortamlarına uygun yönetici koltuk serisidir.',
  gallery: [
    { url: '/assets/viola/images/beta_main.png' },
    { url: '/assets/viola/images/beta_carousel_1.png' },
    { url: '/assets/viola/images/beta_carousel_2.png' },
  ],
};

export default function App() {
  return (
    <BrowserRouter>
      <ViolaHeader />
      <Routes>
        <Route path="/" element={<ViolaHome />} />
        <Route path="/urunler/beta" element={<ViolaProductDetail product={betaProduct} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ViolaFooter />
    </BrowserRouter>
  );
}
