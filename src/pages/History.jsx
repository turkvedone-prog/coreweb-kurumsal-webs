import { useEffect } from 'react';
import { useSite } from '../layouts/SiteLayout';
import { updateSEOMeta } from '../utils/seo';
import BurobigHistory from '../themes/burobig/BurobigHistory';
import BurcKaplamaHistory from '../themes/burckaplama/BurcKaplamaHistory';
import CapilonHistory from '../themes/capilon/CapilonHistory';
import NotFoundSite from '../components/NotFoundSite';

export default function History() {
  const { tenantMapping, activeLang, settings } = useSite();
  const { tenantId, tenantSlug } = tenantMapping;
  
  const isBurobig = tenantSlug === 'burobig' || tenantId === 'TEN-BUROBIG';
  const isBurcKaplama = tenantSlug === 'burckaplama' || tenantId === 'TEN-BURCKAPLAMA';
  const isCapilon = tenantSlug === 'capilon' || tenantId === 'TEN-CAPILON';
  const companyName = settings?.companyName || tenantSlug || 'CoreWeb';

  useEffect(() => {
    const title = activeLang === 'tr' ? 'Hikayemiz' : 'Our Story';
    const description = activeLang === 'tr'
      ? `${companyName} kurumsal hikayesi ve kökenleri.`
      : `${companyName} corporate history and origin story.`;

    updateSEOMeta({
      title,
      description,
      companyName
    });
  }, [activeLang, companyName]);

  if (isCapilon) {
    return <CapilonHistory />;
  }

  if (isBurobig) {
    return <BurobigHistory />;
  }

  if (isBurcKaplama) {
    return <BurcKaplamaHistory />;
  }

  return (
    <NotFoundSite reason={activeLang === 'tr' ? 'Bu sayfa bu site için kullanılabilir değil.' : 'This page is not available for this site.'} />
  );
}
