import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { updateSEOMeta } from '../../utils/seo';

export default function CapilonContact({
  formData,
  consentAccepted,
  setConsentAccepted,
  loading,
  success,
  error,
  handleSubmit,
  handleChange,
  translate,
  mockToken,
  setMockToken,
  tripHoneypot,
  setTripHoneypot
}) {
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('No File Chosen');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    } else {
      setUploadedFileName('No File Chosen');
    }
  };

  useEffect(() => {
    const titleText = translate(
      "Bizimle İletişime Geçin",
      "Contact Us"
    );
    const descText = translate(
      "Capilon Mobilya iletişim bilgileri, adres, telefon ve online iletişim formu.",
      "Capilon Furniture contact information, address, phone number, and online message form."
    );

    updateSEOMeta({
      title: titleText,
      description: descText,
      companyName: 'Capilon Mobilya'
    });
  }, [translate]);

  // Submit helper that validates both consents
  const handleFormSubmit = (e) => {
    if (!marketingAccepted || !consentAccepted) {
      e.preventDefault();
      alert(translate(
        'Lütfen tüm onay kutularını işaretleyin.',
        'Please check all consent boxes.'
      ));
      return;
    }
    handleSubmit(e);
  };

  return (
    <main id="main-content">
      {/* 1. Hero Section */}
      <section className="contact-hero-clean">
        <div className="contact-hero-container">
          <h1>{translate('Bizimle İletişime Geçin', 'Contact Us')}</h1>
          <p>
            {translate(
              'Sorularınız, talepleriniz ve diğer tüm merak ettikleriniz için bize ulaşın. Ekibimiz en kısa sürede sizinle bağlantı kuracaktır.',
              'Get in touch with us for your questions, requests and all other inquiries. Our team will contact you as soon as possible.'
            )}
          </p>
        </div>
      </section>

      {/* 2. New Dark Contact Form Section (Nurus Style) */}
      <section className="nurus-contact-section">
        <div className="nurus-form-box">
          {success ? (
            <div className="contact-success-banner-nurus">
              <h3>{translate('Tebrikler!', 'Thank You!')}</h3>
              <p>
                {translate(
                  'Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.',
                  'Your message has been sent successfully. We will contact you as soon as possible.'
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="nurus-styled-form" noValidate>
              {error && (
                <div className="nurus-error-banner">
                  <span>{error}</span>
                </div>
              )}

              <div className="nurus-form-group full-width">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={translate('İsim Soyisim', 'Full Name')}
                  required
                  disabled={loading}
                  aria-label={translate('İsim Soyisim', 'Full Name')}
                />
              </div>

              <div className="nurus-form-row">
                <div className="nurus-form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={translate('Telefon', 'Phone')}
                    required
                    disabled={loading}
                    aria-label={translate('Telefon', 'Phone')}
                  />
                </div>
                <div className="nurus-form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={translate('E-Mail', 'E-Mail')}
                    required
                    disabled={loading}
                    aria-label={translate('E-Mail', 'E-Mail')}
                  />
                </div>
              </div>

              {/* File Upload Input */}
              <div className="nurus-form-group full-width">
                <div className="nurus-file-upload-wrapper">
                  <input
                    type="file"
                    id="nurus-file"
                    className="nurus-file-input"
                    onChange={handleFileChange}
                    disabled={loading}
                  />
                  <label htmlFor="nurus-file" className="nurus-file-btn">
                    {translate('Dosya Seç', 'Choose File')}
                  </label>
                  <span className="nurus-file-name" id="file-name-label">
                    {uploadedFileName}
                  </span>
                </div>
              </div>

              {/* Honeypot field (hidden from real users) */}
              <div style={{ display: 'none' }}>
                <label>If you are a human, do not fill this field.</label>
                <input
                  type="text"
                  name="website_dummy"
                  value={formData.website_dummy}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Dev Mode Tokens Input for Testing */}
              {import.meta.env.DEV && (
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '6px', background: '#3a3a3a', padding: '12px', borderRadius: '8px', border: '1px dashed #555', color: '#ccc', marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>[DEV-ONLY] Bypass reCAPTCHA:</span>
                    <input
                      type="checkbox"
                      checked={!!mockToken}
                      onChange={(e) => setMockToken(e.target.checked ? 'mock-pass' : '')}
                      style={{ width: '14px', height: '14px', accentColor: '#f58220' }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>[DEV-ONLY] Trigger Honeypot (Spam):</span>
                    <input
                      type="checkbox"
                      checked={tripHoneypot}
                      onChange={(e) => setTripHoneypot(e.target.checked)}
                      style={{ width: '14px', height: '14px', accentColor: '#f58220' }}
                    />
                  </div>
                </div>
              )}

              {/* Consents */}
              <div className="nurus-checkbox-group">
                <div className="nurus-checkbox-item">
                  <input
                    type="checkbox"
                    id="marketing-consent"
                    checked={marketingAccepted}
                    onChange={() => !loading && setMarketingAccepted(!marketingAccepted)}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="marketing-consent">
                    {translate(
                      'Kampanyalardan haberdar olabilmek için kişisel verilerimin işlenmesini ve tarafıma her türlü ileti gönderilmesini kabul ederim.',
                      'I accept the processing of my personal data and the sending of all kinds of communications to me in order to be informed of campaigns.'
                    )}
                  </label>
                </div>
                <div className="nurus-checkbox-item">
                  <input
                    type="checkbox"
                    id="kvkk-consent"
                    checked={consentAccepted}
                    onChange={() => !loading && setConsentAccepted(!consentAccepted)}
                    required
                    disabled={loading}
                  />
                  <label htmlFor="kvkk-consent">
                    <a
                      href="#"
                      className="kvkk-underline-link"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(translate('Aydınlatma Metni görüntüleniyor...', 'Showing disclosure text...'));
                      }}
                    >
                      {translate('KVKK Aydınlatma Metni', 'KVKK Disclosure')}
                    </a>{' '}
                    {translate('okudum ve kabul ediyorum.', 'read and accept.')}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="nurus-submit-btn"
                disabled={loading || !marketingAccepted || !consentAccepted}
              >
                {loading ? translate('GÖNDERİLİYOR...', 'SUBMITTING...') : translate('GÖNDER', 'SUBMIT')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 3. Address & Map Section (Premium Split Design) */}
      <section className="premium-contact-info-map-section">
        <div className="premium-info-map-container">
          {/* Left: Address & Contact Details */}
          <div className="premium-contact-details">
            <div className="premium-info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div className="info-content">
                <h3>{translate('Merkez Showroom & Fabrika', 'Headquarters Showroom & Factory')}</h3>
                <p>Balıkhisar Mah. Yıldırım Beyazıt Cad. No 94, Akyurt / Ankara</p>
              </div>
            </div>
            
            <div className="premium-info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-content">
                <h3>{translate('Telefon Numarası', 'Phone Number')}</h3>
                <p>
                  <a href="tel:+903123790333">0.312 379 0 333</a>
                </p>
                <p className="sub-detail">{translate('Müşteri İlişkileri & Fabrika', 'Customer Relations & Factory')}</p>
              </div>
            </div>

            <div className="premium-info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-content">
                <h3>{translate('E-posta Adresi', 'Email Address')}</h3>
                <p>
                  <a href="mailto:info@capilonmobilya.com">info@capilonmobilya.com</a>
                </p>
                <p className="sub-detail">{translate('Genel İletişim', 'General Info')}</p>
              </div>
            </div>
          </div>

          {/* Right: Map (No Border / Radius) */}
          <div className="premium-map-wrapper">
            <iframe
              src="https://maps.google.com/maps?q=Balıkhisar%20Mah.%20Yıldırım%20Beyazıt%20Cad.%20No%2094%20Akyurt%20Ankara&t=&z=14&ie=UTF8&iwloc=&output=embed"
              allowFullScreen=""
              loading="lazy"
              title={translate('Capilon Mobilya Google Haritası', 'Capilon Furniture Google Map')}
              aria-label={translate('Capilon Mobilya Google Haritası', 'Capilon Furniture Google Map')}
            />
          </div>
        </div>
      </section>

      {/* Harita altı 150px beyaz alan */}
      <div style={{ height: '150px', backgroundColor: '#ffffff', width: '100%' }}></div>
    </main>
  );
}
