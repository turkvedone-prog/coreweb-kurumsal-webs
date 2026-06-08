import { useSite } from '../layouts/SiteLayout';
import CapilonCollectionsPage from '../themes/capilon/CapilonCollectionsPage';
import NotFoundSite from '../components/NotFoundSite';

export default function CollectionsPage() {
  const { tenantMapping } = useSite();
  const isCapilon = tenantMapping?.tenantSlug === 'capilon' || tenantMapping?.tenantId === 'TEN-CAPILON';

  if (isCapilon) {
    return <CapilonCollectionsPage />;
  }

  return <NotFoundSite reason="Sayfa bulunamadı." />;
}
