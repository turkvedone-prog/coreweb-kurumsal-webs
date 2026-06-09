# Capilon Tenant Manifestosu (Capilon Tenant Manifesto)

Bu doküman, CoreWeb çoklu tenant (multi-tenant) public site mimarisi içinde Capilon temasının (theme) geliştirilmesi, temizliği ve izolasyonu için uyulması zorunlu mimari standartları tanımlar.

## 1. Genel Tanımlar ve Kimlik Bilgileri
* **Tenant ID:** `TEN-CAPILON`
* **Tenant Slug:** `capilon`
* **Staging URL:** `capilon.coreweb.tr/tr`
* **Lokal Geliştirme Portu:** `5175` (`npm run dev:capilon`)

## 2. Geliştirme ve Entegrasyon Modeli
* **Tema Bazlı Geliştirme:** Capilon projesi, bağımsız (standalone) bir production projesi olarak ele alınmaz. `coreweb-public` dynamic resolver yapısı içinde bir tenant teması olarak geliştirilir.
* **Tasarım Kaynağı:** Standalone `Capilon-Web` deposu yalnızca tasarım, statik HTML ve CSS kaynaklarının tutulduğu bir referans deposudur. Canlı entegrasyon, düzeltme ve manifesto işlemleri sadece `coreweb-public` deposu altında yürütülür.
* **Noindex/Nofollow Politikası:** Capilon staging ortamlarında (`capilon.coreweb.tr`) arama motoru optimizasyonunun etkilenmemesi için `noindex, nofollow, noarchive` etiketleri kesinlikle korunur.

## 3. Kod ve Asset İzolasyonu
* **Klasör İzolasyonu:** Capilon bileşenleri ve stilleri yalnızca aşağıdaki dizinlerde tutulabilir:
  * Kod & Bileşenler: `src/themes/capilon/`
  * Görseller & Varlıklar: `public/assets/capilon/`
* **CSS Kapsamı (Scoping):** Capilon'a özel tüm stiller (CSS) mutlaka `.capilon-theme` sınıf kapsamı (scope) altında yazılmalıdır. Global CSS kuralları değiştirilmemeli veya diğer tenant'ların (örn. Burobig) görünümlerini etkileyecek sızmalara yol açmamalıdır.
* **Bileşen Koşulları:** Capilon bileşenleri yalnızca `tenantSlug === 'capilon'` veya `tenantId === 'TEN-CAPILON'` şartı sağlandığında render edilmelidir.
* **Sızdırmazlık (Non-Interference):** Capilon fazlarında yapılan çalışmalarda Burobig (`TEN-BUROBIG`), CoreWeb ana sitesi (`TEN-507`) veya diğer tenant dosyalarında değişiklik yapılmaz.

## 4. İletişim ve Bilgi Standartları
* **Placeholder ve Sahte Kayıt Yasağı:** Telefon, WhatsApp, alan adı veya sosyal medya bilgileri sahte/placeholder (örn. `0850 333 33 33`, `905000000000`, `example.com`, `lorem`) bırakılamaz. Kesin/onaylı bilgi yoksa ilgili alanlar nötr tutulur, gizlenir veya iletişim sayfasına yönlendirilir.
* **Adres ve Telefon Bilgileri:**
  * **Telefon:** `0312 379 03 33` (Ankara Merkez/Fabrika)
  * **WhatsApp:** Kesin numara onaylanana kadar gizlenir veya doğrudan `/iletisim` sayfasına yönlendirilir.

## 5. Canlı İşlemler ve Değişiklik İzinleri
* Aşağıdaki işlemler **ayrı ve yazılı onay** alınmadan kesinlikle yapılamaz:
  * Canlıya deploy (Production deployment)
  * Git push işlemleri (onaysız branch'lere)
  * Firestore veri yazma/güncelleme işlemleri
  * Firestore Security Rules veya Firebase Cloud Functions deploy işlemleri
  * Vercel domain/DNS değişiklikleri
  * Firebase Authentication ayarlarının değiştirilmesi

## 6. Çalışma Alanı, Port ve Karantina Kuralları
* **Aktif Hedef Repo (Entegrasyon):** `/Users/turkved/.gemini/antigravity/scratch/coreweb-public`
  * **Aktif Branch:** `dynamic-resolver`
  * **Aktif Geliştirme Portu:** `5175`
* **Referans Tasarım Reposu (Mockup):** `/Users/turkved/.gemini/antigravity/scratch/Capilon Web_Proje`
  * **Aktif Branch:** `main`
  * **Aktif Referans Portu:** `5179`
* **8080 Portu Yasaktır:** 8080 portu kesinlikle geliştirme veya test amacıyla kullanılmayacaktır.
* **Ajan Ön Doğrulama Zorunluluğu:** Geliştirici veya kod yazıcı ajanlar, çalışmaya başlamadan önce aktif dizini (`pwd`), git remote adresini, aktif branch adını ve çalışan lokal portları doğrulamak zorundadır. Bu kontroller yapılmadan hiçbir dosyada düzenleme/değişiklik yapılamaz.
* **Eski Kopya Karantinası:** Ana reponun eski/yedek kopyaları kesinlikle geliştirme amacıyla kullanılmaz. Tespit edilen şüpheli veya eski kopyalar silinmez, ancak karışıklığı önlemek için başına `_ARCHIVE_DO_NOT_USE_` ibaresi eklenerek karantinaya alınır.

## 7. Migration Standartları ve Sayfa Sırası
Capilon sayfalarının standalone tasarımdan React portalına geçişi, aşağıdaki sıralamaya göre sayfa sayfa (incremental) yapılacaktır:
1. **Anasayfa (Homepage):** `CapilonHome.jsx` ve `capilon.css` entegrasyonu.
2. **İletişim (Contact):** `CapilonContact.jsx` entegrasyonu.
3. **Koleksiyon/Kategori (Collections/Categories):** Koleksiyonlar ve Kategori (örn. Yemek Odaları) entegrasyonu.
4. **Ürün Detay (Product Detail):** Ürün detay sayfası entegrasyonu.
5. **Blog (Blog List/Detail):** Blog listesi ve blog detay sayfaları entegrasyonu.

Her sayfa geçişinde sırasıyla; fark analizi, JSX/CSS entegrasyonu, lokal visual smoke test, build/lint doğrulama ve regresyon testleri uygulanacaktır.
