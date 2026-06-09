export const burcKaplamaData = {
  navigation: [
    { id: 'home', label: { tr: 'Anasayfa', en: 'Home' }, path: '/' },
    { id: 'about', label: { tr: 'Hakkımızda', en: 'About Us' }, path: '/hikayemiz' },
    { id: 'services', label: { tr: 'Hizmetler', en: 'Services' }, path: '/urunler' },
    { id: 'quality', label: { tr: 'Kalite Politikamız', en: 'Quality Policy' }, path: '/kalite-politikamiz' },
    { id: 'blog', label: { tr: 'Blog / Bilgi Merkezi', en: 'Blog' }, path: '/blog' },
    { id: 'contact', label: { tr: 'İletişim', en: 'Contact' }, path: '/iletisim' }
  ],
  company: {
    name: 'Burç Kaplama',
    title: {
      tr: 'Endüstriyel Kaplama ve Yüzey İşlem Teknolojileri',
      en: 'Industrial Coating and Surface Treatment Technologies'
    },
    address: {
      tr: 'Bursa Organize Sanayi Bölgesi (OSB), Bursa, Türkiye',
      en: 'Bursa Organized Industrial Zone (OIZ), Bursa, Turkey'
    },
    addressDetail: {
      tr: 'Müşteri adres detayı bekleniyor',
      en: 'Client address details pending'
    },
    phone: 'Müşteri telefon bilgisi bekleniyor',
    email: 'Müşteri e-posta bilgisi bekleniyor',
    workingHours: {
      tr: 'Pzt - Cmt: 08:30 - 18:30',
      en: 'Mon - Sat: 08:30 - 18:30'
    },
    slogan: {
      tr: 'Metale Değer Katan Yüksek Dayanım ve Güvenilirlik',
      en: 'High Durability and Reliability Adding Value to Metal'
    }
  },
  slider: [
    {
      id: 1,
      subtitle: { tr: 'SEKTÖREL LİDERLİK', en: 'INDUSTRY LEADERSHIP' },
      title: { tr: 'Endüstriyel Yüzey İşlemleri', en: 'Industrial Surface Treatments' },
      desc: { 
        tr: 'Metal ve endüstriyel yüzeylerin ömrünü uzatan yüksek mukavemetli koruyucu kaplama çözümleri sunuyoruz.', 
        en: 'We provide high-durability protective coating solutions extending the lifecycle of metal and industrial surfaces.' 
      },
      image: '/assets/burckaplama/surface-treatment.png'
    },
    {
      id: 2,
      subtitle: { tr: 'İLERİ TEKNOLOJİ', en: 'ADVANCED TECHNOLOGY' },
      title: { tr: 'Hassas Metal Kaplama', en: 'Precision Metal Plating' },
      desc: { 
        tr: 'Otomotiv ve makine imalatı sektörleri için mikron düzeyinde hassas yüzey kaplama uygulamaları.', 
        en: 'Micron-level precision surface plating applications for automotive and machinery manufacturing sectors.' 
      },
      image: '/assets/burckaplama/metal-plating.png'
    },
    {
      id: 3,
      subtitle: { tr: 'MAKSİMUM MUKAVEMET', en: 'MAXIMUM DURABILITY' },
      title: { tr: 'Koruyucu Kaplama Çözümleri', en: 'Protective Coating Solutions' },
      desc: { 
        tr: 'Korozyon, aşınma ve yüksek sıcaklığa karşı metal yüzeylerin mukavemetini artıran ileri kaplama teknikleri.', 
        en: 'Advanced coating techniques enhancing the resistance of metal surfaces against corrosion, wear, and high temperatures.' 
      },
      image: '/assets/burckaplama/protective-coating.png'
    }
  ],
  services: [
    {
      id: 'metal-kaplama',
      slug: 'metal-kaplama',
      title: { tr: 'Metal Kaplama Hizmetleri', en: 'Metal Plating Services' },
      category: 'Metal Kaplama',
      image: '/assets/burckaplama/metal-plating.png',
      summary: { 
        tr: 'Sanayi parçaları ve metaller için çinko, nikel ve krom kaplama çözümleri.', 
        en: 'Zinc, nickel, and chrome plating solutions for industrial parts and metals.' 
      },
      desc: { 
        tr: 'Yüksek kaliteli elektrolitik ve kimyasal metal kaplama uygulamalarımızla korozyon direnci ve estetik görünüm sağlıyoruz. Otomotiv, havacılık ve makine imalatı gibi sektörlerin teknik standartlarına tam uyum sağlıyoruz. (Nihai hizmet detayları için müşteri hizmet listesi bekleniyor)', 
        en: 'We provide corrosion resistance and aesthetic appearance with our high-quality electrolytic and chemical metal plating applications. Fully compliant with technical standards of automotive, aerospace, and machinery sectors. (Client service list pending for final details)' 
      },
      specs: [
        { key: { tr: 'Kaplama Türü', en: 'Plating Type' }, value: { tr: 'Elektrolitik & Kimyasal', en: 'Electrolytic & Chemical' } },
        { key: { tr: 'Kaplama Kalınlığı', en: 'Coating Thickness' }, value: { tr: '5 - 50 Mikron (Tolerans ±1µ)', en: '5 - 50 Microns (Tolerance ±1µ)' } },
        { key: { tr: 'Korozyon Dayanımı', en: 'Corrosion Resistance' }, value: { tr: 'Tuz Testi 400+ Saat (Müşteri verisi bekleniyor)', en: 'Salt Spray 400+ Hours (Client data pending)' } }
      ]
    },
    {
      id: 'endustriyel-yuzey',
      slug: 'endustriyel-yuzey',
      title: { tr: 'Endüstriyel Yüzey İşlemleri', en: 'Industrial Surface Treatments' },
      category: 'Yüzey İşlem',
      image: '/assets/burckaplama/surface-treatment.png',
      summary: { 
        tr: 'Yüzey pürüzlülüğü giderme, kumlama ve kimyasal temizleme işlemleri.', 
        en: 'Surface roughness elimination, sandblasting, and chemical cleaning processes.' 
      },
      desc: { 
        tr: 'Metal yüzeyleri kaplama öncesinde hazırlamak veya teknik pürüzlülük gereksinimlerini karşılamak amacıyla kumlama, asitleme ve pasivasyon gibi profesyonel yüzey işlemleri uyguluyoruz. (Nihai hizmet detayları için müşteri hizmet listesi bekleniyor)', 
        en: 'We apply professional surface treatments such as sandblasting, pickling, and passivation to prepare metal surfaces before coating or to meet technical roughness requirements. (Client service list pending for final details)' 
      },
      specs: [
        { key: { tr: 'İşlem Standartları', en: 'Process Standards' }, value: { tr: 'ISO 8501-1 (Sa 2.5 / Sa 3)', en: 'ISO 8501-1 (Sa 2.5 / Sa 3)' } },
        { key: { tr: 'Kullanılan Malzeme', en: 'Materials Used' }, value: { tr: 'Çelik Grid, Cam Küre, Alüminyum Oksit', en: 'Steel Grit, Glass Beads, Aluminum Oxide' } },
        { key: { tr: 'Uygulama Alanları', en: 'Application Areas' }, value: { tr: 'Döküm Parçalar, Kaynaklı Konstrüksiyonlar', en: 'Cast Parts, Welded Constructions' } }
      ]
    },
    {
      id: 'koruyucu-kaplama',
      slug: 'koruyucu-kaplama',
      title: { tr: 'Koruyucu Kaplama Uygulamaları', en: 'Protective Coating Applications' },
      category: 'Koruyucu Kaplama',
      image: '/assets/burckaplama/protective-coating.png',
      summary: { 
        tr: 'Korozyon ve aşınma önleyici yüksek performanslı kaplama teknikleri.', 
        en: 'High-performance coating techniques preventing corrosion and wear.' 
      },
      desc: { 
        tr: 'Ağır sanayi, inşaat ve dış ortam şartlarında çalışan makine aksamları için korozyon direncini maksimum seviyeye çıkaran koruyucu kaplamalar uyguluyoruz. (Nihai hizmet detayları için müşteri hizmet listesi bekleniyor)', 
        en: 'We apply protective coatings that maximize corrosion resistance for machinery components working in heavy industry, construction, and outdoor environments. (Client service list pending for final details)' 
      },
      specs: [
        { key: { tr: 'Çalışma Sıcaklığı', en: 'Operating Temperature' }, value: { tr: '-40°C ila +250°C', en: '-40°C to +250°C' } },
        { key: { tr: 'Standartlar', en: 'Standards' }, value: { tr: 'ASTM B117 / ISO 9227', en: 'ASTM B117 / ISO 9227' } },
        { key: { tr: 'Aşınma Dayanımı', en: 'Abrasion Resistance' }, value: { tr: 'Yüksek Mukavemet (Müşteri verisi bekleniyor)', en: 'High Durability (Client data pending)' } }
      ]
    },
    {
      id: 'ozel-proje',
      slug: 'ozel-proje',
      title: { tr: 'Özel Proje Kaplama Çözümleri', en: 'Special Project Coating Solutions' },
      category: 'Özel Çözümler',
      image: '/assets/burckaplama/lab-testing.png',
      summary: { 
        tr: 'Müşteriye özel teknik şartnameler ve niş kaplama uygulamaları.', 
        en: 'Custom technical specifications and niche coating applications for clients.' 
      },
      desc: { 
        tr: 'Standart dışı ölçülerdeki parçalar veya özel alaşımlı metaller için laboratuvar ortamında test edilmiş, projeye özel teknik kaplama çözümleri geliştiriyoruz. (Nihai hizmet detayları için müşteri hizmet listesi bekleniyor)', 
        en: 'We develop project-specific technical coating solutions tested in laboratory environments for non-standard size parts or special alloy metals. (Client service list pending for final details)' 
      },
      specs: [
        { key: { tr: 'Proje Tipi', en: 'Project Type' }, value: { tr: 'Özel Şartnameli Mühendislik Projeleri', en: 'Custom Specified Engineering Projects' } },
        { key: { tr: 'Test Metotları', en: 'Test Methods' }, value: { tr: 'X-Ray Kalınlık Ölçümü, Adhezyon Testleri', en: 'X-Ray Thickness Measurement, Adhesion Tests' } },
        { key: { tr: 'Teknik Destek', en: 'Technical Support' }, value: { tr: 'Tasarım ve Alaşım Seçim Desteği', en: 'Design & Alloy Selection Support' } }
      ]
    }
  ]
};

export function translate(lang, obj) {
  if (!obj) return '';
  return obj[lang] || obj['tr'] || '';
}
