import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';

import SiteLayout from './layouts/SiteLayout';
import { useSite } from './layouts/SiteLayout';
import CapilonHome from './CapilonHome';
import CapilonBlogList from './CapilonBlogList';
import CapilonBlogDetail from './CapilonBlogDetail';
import CapilonCollectionsPage from './CapilonCollectionsPage';
import CapilonContact from './CapilonContact';
import CapilonHistory from './CapilonHistory';
import CapilonProductDetail from './CapilonProductDetail';
import CapilonStores from './CapilonStores';
import CapilonCategoryDetail from './CapilonCategoryDetail';

// Wrapper: CapilonContact is a presentational component that needs props injected
function CapilonContactPage() {
  const { activeLang } = useSite();
  const translate = (tr, en) => activeLang === 'tr' ? tr : en;

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', subject: ''
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccess(true);
    } catch {
      setError(translate('Bir hata oluştu, lütfen tekrar deneyin.', 'An error occurred, please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CapilonContact
      formData={formData}
      consentAccepted={consentAccepted}
      setConsentAccepted={setConsentAccepted}
      loading={loading}
      success={success}
      error={error}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      translate={translate}
    />
  );
}


function CapilonRouteResolver() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [resolvedLang, setResolvedLang] = useState(null);

  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const langIndex = isLocalOrPortal ? 1 : 0;
    const urlLang = pathSegments[langIndex];
    const enabledLangs = ['tr', 'en'];
    const defaultLang = 'tr';

    if (urlLang && enabledLangs.includes(urlLang)) {
      setResolvedLang(urlLang);
    } else {
      // Redirect to default language
      const newSegments = [...pathSegments];
      if (urlLang && !enabledLangs.includes(urlLang)) {
        newSegments[langIndex] = defaultLang;
      } else if (!urlLang || (isLocalOrPortal && newSegments.length < 2)) {
        if (isLocalOrPortal) {
          newSegments[0] = 'capilon';
          newSegments[1] = defaultLang;
        } else {
          newSegments[0] = defaultLang;
        }
      }
      const redirectPath = '/' + newSegments.join('/');
      navigate(redirectPath, { replace: true });
    }
  }, [params.lang, location.pathname, isLocalOrPortal, navigate]);

  if (!resolvedLang) {
    return null;
  }

  return (
    <SiteLayout activeLang={resolvedLang}>
      <Routes>
        <Route path="/" element={<CapilonHome />} />
        <Route path="/blog" element={<CapilonBlogList />} />
        <Route path="/blog/:slug" element={<CapilonBlogDetail />} />
        <Route path="/koleksiyonlar" element={<CapilonCollectionsPage />} />
        <Route path="/koleksiyonlar/:slug" element={<CapilonCollectionsPage />} />
        <Route path="/urunler/:slug" element={<CapilonProductDetail />} />
        <Route path="/magazalarimiz" element={<CapilonStores />} />
        <Route path="/iletisim" element={<CapilonContactPage />} />
        <Route path="/hikayemiz" element={<CapilonHistory />} />
        <Route path="/kategori/:slug" element={<CapilonCategoryDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default function App() {
  const hostname = window.location.hostname;
  const isLocalOrPortal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.vercel.app');

  return (
    <BrowserRouter>
      <Routes>
        {isLocalOrPortal ? (
          <>
            <Route path="/capilon/:lang/*" element={<CapilonRouteResolver />} />
            <Route path="/capilon/*" element={<CapilonRouteResolver />} />
            <Route path="*" element={<Navigate to="/capilon/tr" replace />} />
          </>
        ) : (
          <>
            <Route path="/:lang/*" element={<CapilonRouteResolver />} />
            <Route path="*" element={<CapilonRouteResolver />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
