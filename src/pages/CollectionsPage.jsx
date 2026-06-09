import { useParams } from 'react-router-dom';
import { useSite } from '../layouts/SiteLayout';
import CapilonCollectionsPage from '../themes/capilon/CapilonCollectionsPage';
import CapilonCategoryDetail from '../themes/capilon/CapilonCategoryDetail';
import NotFoundSite from '../components/NotFoundSite';

export default function CollectionsPage() {
  const { slug } = useParams();
  const { tenantMapping } = useSite();
  const isCapilon = tenantMapping?.tenantSlug === 'capilon' || tenantMapping?.tenantId === 'TEN-CAPILON';

  if (isCapilon) {
    if (slug) {
      return <CapilonCategoryDetail />;
    }
    return <CapilonCollectionsPage />;
  }

  return <NotFoundSite reason="Sayfa bulunamadı." />;
}
