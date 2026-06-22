import { useEffect, useState } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useSite } from '../../layouts/SiteLayout';
import { updateSEOMeta } from '../../utils/seo';
import { getActiveProducts } from '../../services/publicContentService';
import { getLocalizedContent } from '../../utils/i18nContent';
import { resolveField } from '@coreweb/shared-ui';


export default function BurobigProductList({ products }) {
  const { activeLang } = useSite();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();


  const isUstYoneticiPath = location.pathname.endsWith('/ust-yonetici');
  const isYoneticiPath = location.pathname.endsWith('/yonetici');
  const isCalismaPath = location.pathname.endsWith('/calisma-masalari') || location.pathname.endsWith('/calisma');
  const isOfisKoltuklariPath = location.pathname.endsWith('/ofis-koltuklari');
  const isOperasyonelPath = location.pathname.endsWith('/operasyonel-masalar');
  const isToplantiPath = location.pathname.endsWith('/toplanti-masalari');
  const isCleanPath = isUstYoneticiPath || isYoneticiPath || isCalismaPath || isOfisKoltuklariPath || isOperasyonelPath || isToplantiPath;

  const catParam = searchParams.get('cat');
  const subParam = searchParams.get('sub');

  // Localized string translation helper
  const translate = (tr, en) => {
    return activeLang === 'tr' ? tr : en;
  };

  const getLocalizedPath = (path) => `/${activeLang}${path}`;

  // Helper to slugify strings for robust matching
  const slugify = (text) => {
    if (!text) return '';
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[ğĞ]/g, 'g')
      .replace(/[üÜ]/g, 'u')
      .replace(/[şŞ]/g, 's')
      .replace(/[ıİ]/g, 'i')
      .replace(/[öÖ]/g, 'o')
      .replace(/[çÇ]/g, 'c')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
  };

  // Determine current active category and subcategory target slugs
  let targetCatSlug = catParam ? slugify(catParam) : null;
  let targetSubcatSlug = subParam ? slugify(subParam) : null;

  if (isUstYoneticiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'ust-yonetici';
  } else if (isYoneticiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'yonetici';
  } else if (isCalismaPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'calisma';
  } else if (isOfisKoltuklariPath) {
    targetCatSlug = 'ofis-koltuklari';
  } else if (isOperasyonelPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'operasyonel';
  } else if (isToplantiPath) {
    targetCatSlug = 'masalar';
    targetSubcatSlug = 'toplanti';
  }

  // Determine current active filter tab
  const getActiveTab = () => {
    if (targetSubcatSlug === 'ust-yonetici') {
      return 'ust-yonetici';
    }
    if (targetCatSlug === 'ofis-koltuklari') {
      return 'ofis-koltuklari';
    }
    return 'all';
  };

  const activeTab = getActiveTab();

  // Handle Tab Switch
  const handleTabClick = (tab) => {
    if (tab === 'all') {
      setSearchParams({});
    } else if (tab === 'ust-yonetici') {
      setSearchParams({ cat: 'masalar', sub: 'ust-yonetici' });
    } else if (tab === 'ofis-koltuklari') {
      setSearchParams({ cat: 'ofis-koltuklari' });
    }
  };

  // Filter products dynamically
  const filteredProducts = products.filter(product => {
    const catSlug = slugify(product.category);
    const subcatSlug = slugify(product.subcategory);

    if (targetCatSlug) {
      const isCatMatch = catSlug.includes(targetCatSlug) || 
                         targetCatSlug.includes(catSlug) ||
                         (targetCatSlug === 'masalar' && (catSlug.includes('masa') || catSlug.includes('table') || catSlug.includes('desk'))) ||
                         (targetCatSlug === 'ofis-koltuklari' && (catSlug.includes('koltuk') || catSlug.includes('chair')));
      if (!isCatMatch) return false;
    }

    if (targetSubcatSlug) {
      if (targetSubcatSlug === 'yonetici') {
        // Strict matching for manager: subcat must be 'yonetici' and cannot be 'ust-yonetici'
        if (subcatSlug === 'ust-yonetici' || catSlug.includes('ust-yonetici')) return false;
        if (subcatSlug !== 'yonetici' && !catSlug.includes('yonetici-masasi')) return false;
      } else if (targetSubcatSlug === 'ust-yonetici') {
        // Strict matching for executive: subcat must be 'ust-yonetici'
        if (subcatSlug !== 'ust-yonetici' && !catSlug.includes('ust-yonetici-masasi')) return false;
      } else {
        // General dynamic matching for other categories (e.g. calisma)
        const isSubcatMatch = subcatSlug === targetSubcatSlug ||
                              (subcatSlug && subcatSlug.includes(targetSubcatSlug)) ||
                              (targetSubcatSlug === 'calisma' && (subcatSlug.includes('calis') || subcatSlug.includes('work') || catSlug.includes('calis') || catSlug.includes('work')));
        if (!isSubcatMatch) return false;
      }
    }

    return true;
  });

  // Get Page Title and Subtitle dynamically
  const getPageMeta = () => {
    const slugNames = {
      'ust-yonetici': { tr: 'Üst Yönetici Masaları', en: 'Executive Desks', pathTr: 'Masalar / Üst Yönetici', pathEn: 'Desks / Executive' },
      'yonetici': { tr: 'Yönetici Masaları', en: 'Manager Desks', pathTr: 'Masalar / Yönetici', pathEn: 'Desks / Manager' },
      'calisma': { tr: 'Çalışma Masaları', en: 'Work Desks', pathTr: 'Masalar / Çalışma', pathEn: 'Desks / Work' },
      'operasyonel': { tr: 'Operasyonel Masalar', en: 'Operational Desks', pathTr: 'Masalar / Operasyonel', pathEn: 'Desks / Operational' },
      'toplanti': { tr: 'Toplantı Masaları', en: 'Meeting Tables', pathTr: 'Masalar / Toplantı', pathEn: 'Desks / Meeting' },
      'ofis-koltuklari': { tr: 'Ofis Koltukları', en: 'Office Chairs', pathTr: 'Koltuklar / Ofis Koltukları', pathEn: 'Chairs / Office Chairs' },
      'masalar': { tr: 'Tüm Masalar', en: 'All Desks', pathTr: 'Bürobig / Ofis Masaları', pathEn: 'Bürobig / Office Desks' },
      'depolama-sistemleri': { tr: 'Depolama Sistemleri', en: 'Storage Systems', pathTr: 'Bürobig / Depolama', pathEn: 'Bürobig / Storage' },
      'kesonlar': { tr: 'Kesonlar', en: 'Pedestals', pathTr: 'Depolama / Kesonlar', pathEn: 'Storage / Pedestals' },
      'dolaplar': { tr: 'Dolaplar', en: 'Cabinets', pathTr: 'Depolama / Dolaplar', pathEn: 'Storage / Cabinets' },
      'kitaplik-raf': { tr: 'Kitaplık ve Raf Sistemleri', en: 'Bookcases & Shelves', pathTr: 'Depolama / Kitaplıklar', pathEn: 'Storage / Bookcases' },
      'tamamlayicilar': { tr: 'Tamamlayıcılar', en: 'Accessories', pathTr: 'Bürobig / Tamamlayıcılar', pathEn: 'Bürobig / Accessories' },
      'sehpalar': { tr: 'Sehpalar', en: 'Coffee Tables', pathTr: 'Tamamlayıcılar / Sehpalar', pathEn: 'Accessories / Coffee Tables' },
      'puflar': { tr: 'Puflar', en: 'Poufs', pathTr: 'Tamamlayıcılar / Puflar', pathEn: 'Accessories / Poufs' },
      'askiliklar': { tr: 'Askılıklar', en: 'Coat Hangers', pathTr: 'Tamamlayıcılar / Askılıklar', pathEn: 'Accessories / Coat Hangers' },
      'elektrifikasyon': { tr: 'Elektrifikasyon', en: 'Electrification', pathTr: 'Tamamlayıcılar / Elektrifikasyon', pathEn: 'Accessories / Electrification' }
    };

    const subNameMap = slugNames[targetSubcatSlug];
    if (subNameMap) {
      return {
        title: translate(subNameMap.tr, subNameMap.en),
        subtitle: translate(subNameMap.pathTr, subNameMap.pathEn)
      };
    }

    const catNameMap = slugNames[targetCatSlug];
    if (catNameMap) {
      return {
        title: translate(catNameMap.tr, catNameMap.en),
        subtitle: translate(catNameMap.pathTr, catNameMap.pathEn)
      };
    }

    if (targetSubcatSlug) {
      const sampleProduct = products.find(p => slugify(p.subcategory) === targetSubcatSlug);
      const name = sampleProduct ? sampleProduct.subcategory : subParam;
      return {
        title: translate(`${name} Koleksiyonu`, `${name} Collection`),
        subtitle: `Bürobig / ${name}`
      };
    }

    if (targetCatSlug) {
      const sampleProduct = products.find(p => slugify(p.category) === targetCatSlug);
      const name = sampleProduct ? sampleProduct.category : catParam;
      return {
        title: translate(`${name} Koleksiyonu`, `${name} Collection`),
        subtitle: `Bürobig / ${name}`
      };
    }

    return {
      title: translate('Tüm Koleksiyonlar', 'All Collections'),
      subtitle: translate('Bürobig / Ürün Kataloğu', 'Bürobig / Product Catalog')
    };
  };

  const { title, subtitle } = getPageMeta();

  useEffect(() => {
    let seoTitle = title;
    let seoDesc = translate(
      'Bürobig premium ofis mobilyaları ve ürün kataloğu.',
      'Bürobig premium office furniture and product catalog.'
    );

    if (isUstYoneticiPath) {
      seoDesc = translate(
        'Bürobig premium üst yönetici masaları koleksiyonu.',
        'Bürobig premium executive desks collection.'
      );
    } else if (isYoneticiPath) {
      seoDesc = translate(
        'Bürobig premium yönetici masaları koleksiyonu.',
        'Bürobig premium manager desks collection.'
      );
    } else if (isCalismaPath) {
      seoDesc = translate(
        'Bürobig premium çalışma masaları koleksiyonu.',
        'Bürobig premium work desks collection.'
      );
    } else if (isOfisKoltuklariPath) {
      seoDesc = translate(
        'Bürobig ergonomik ve estetik ofis koltukları koleksiyonu.',
        'Bürobig ergonomic and aesthetic office chairs collection.'
      );
    } else if (isOperasyonelPath) {
      seoDesc = translate(
        'Bürobig modern operasyonel masalar koleksiyonu.',
        'Bürobig modern operational desks collection.'
      );
    } else if (isToplantiPath) {
      seoDesc = translate(
        'Bürobig şık ve fonksiyonel toplantı masaları koleksiyonu.',
        'Bürobig stylish and functional meeting tables collection.'
      );
    }

    updateSEOMeta({
      title: seoTitle,
      description: seoDesc,
      companyName: 'Bürobig'
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLang, title, isUstYoneticiPath, isYoneticiPath, isCalismaPath, isOfisKoltuklariPath, isOperasyonelPath, isToplantiPath]);

  return (
    <main className="category-page">
      {/* Category Title Area */}
      <section className="category-hero">
        <div className="category-hero__container">
          <h1 className="category-hero__title">{title}</h1>
          <span className="category-hero__subtitle">{subtitle}</span>
        </div>
      </section>

      {/* Category Tab Filter Bar (Premium UI Enhancement) */}
      {!isCleanPath && (
        <section className="bg-white border-b border-slate-100 py-6">
          <div className="max-w-[1440px] mx-auto px-[5%] flex justify-center gap-8">
            <button
              onClick={() => handleTabClick('all')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'all'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Tümü', 'All')}
            </button>
            <button
              onClick={() => handleTabClick('ust-yonetici')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'ust-yonetici'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Üst Yönetici Masaları', 'Executive Desks')}
            </button>
            <button
              onClick={() => handleTabClick('ofis-koltuklari')}
              className={`pb-2 text-sm font-medium tracking-wider uppercase transition-colors relative ${
                activeTab === 'ofis-koltuklari'
                  ? 'text-[#c9a96e] border-b-2 border-[#c9a96e]'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              {translate('Ofis Koltukları', 'Office Chairs')}
            </button>
          </div>
        </section>
      )}

      {/* Product Grid Section */}
      <section className="category-grid-section">
        <div className="category-grid-container">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50/50 rounded-2xl border border-slate-100">
              <p className="text-slate-500 font-medium">
                {translate('Bu kategoride henüz ürün bulunmuyor.', 'No products found in this category.')}
              </p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product, index) => {
                const productSlug = resolveField(product, activeLang, 'slug') || product.slug || product.id;
                const detailPath = getLocalizedPath(`/urunler/${productSlug}`);
                const cardNumber = (index + 1).toString().padStart(2, '0');
                const fallbackImage = '/assets/burobig/images/INKA 01.jpg';
                const productTitle = resolveField(product, activeLang, 'title') || resolveField(product, activeLang, 'name') || '';

                return (
                  <article key={product.id} className="product-card">
                    <span className="product-card__number">{cardNumber}</span>
                    <div className="product-card__content">
                      <h2 className="product-card__title" style={{ fontSize: '20px', lineHeight: '1.2' }}>
                        {productTitle}
                      </h2>
                    </div>
                    <div className="product-card__image-wrapper">
                      <img 
                        src={product.coverImageUrl || fallbackImage} 
                        alt={productTitle || 'Bürobig Ürün'} 
                        loading="lazy"
                      />
                    </div>
                    <div className="product-card__footer" style={{ position: 'relative', top: '7px' }}>
                      <span className="product-card__explore">{translate('Keşfet →', 'Explore →')}</span>
                      <span className="product-card__category">{product.subcategory || product.category || ''}</span>
                    </div>
                    <Link 
                      to={detailPath} 
                      className="product-card__link" 
                      aria-label={`${productTitle} ${translate('Ürün Detayı', 'Product Detail')}`}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
