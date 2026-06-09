import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import CapilonStores from '../themes/capilon/CapilonStores';
import NotFoundSite from '../components/NotFoundSite';

export default function Stores() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isCapilon = tenantSlug === 'capilon' || tenantId === 'TEN-CAPILON';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Mağazalarımız' : 'Our Stores';
    const description = activeLang === 'tr'
      ? `${companyName} mağaza adresleri, telefon bilgileri ve showroom harita konumları.`
      : `${companyName} store addresses, phone numbers, and showroom map locations.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isCapilon) {
    return <CapilonStores />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
