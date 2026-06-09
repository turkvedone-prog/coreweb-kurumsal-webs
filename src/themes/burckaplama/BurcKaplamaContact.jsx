import { Mail, Phone, MapPin, Loader2, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { burcKaplamaData } from './burcKaplamaData';

export default function BurcKaplamaContact({
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
  return (
    <main className="bk-contact-page">
      {/* Page Hero */}
      <section className="bk-page-hero">
        <div className="bk-page-hero-container">
          <span className="bk-page-hero-subtitle">
            {translate('İletişim / Bize Ulaşın', 'Contact / Get in Touch')}
          </span>
          <h1 className="bk-page-hero-title">
            {translate('Projeleriniz İçin Çözümler', 'Solutions for Your Projects')}
          </h1>
          <p className="bk-page-hero-desc">
            {translate(
              'Endüstriyel kaplama çözümlerimiz, teknik detaylar ve fiyat teklifleri hakkında bilgi almak için bizimle iletişime geçin.',
              'Get in touch with us to get information about our industrial coating solutions, technical details, and price offers.'
            )}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="bk-contact-section">
        <div className="bk-contact-container">
          {/* Left Column: Info Cards */}
          <div className="bk-contact-info-cards">
            <div className="bk-contact-info-intro">
              <span className="bk-info-tag">{translate('FABRİKA & MERKEZ', 'FACTORY & HQ')}</span>
              <h2>{translate('İletişim Bilgileri', 'Contact Details')}</h2>
              <p>
                {translate(
                  'Bursa Organize Sanayi Bölgesi\'ndeki modern tesislerimize gelebilir veya doğrudan telefon/e-posta yoluyla bize ulaşabilirsiniz.',
                  'You can visit our modern facilities in Bursa Organized Industrial Zone or reach us directly via phone/email.'
                )}
              </p>
            </div>

            <div className="bk-contact-info-list">
              <div className="bk-contact-info-item">
                <div className="bk-info-item-icon">
                  <MapPin size={20} />
                </div>
                <div className="bk-info-item-text">
                  <h4>{translate('Fabrika Adresi', 'Factory Address')}</h4>
                  <p>{translate(burcKaplamaData.company.address.tr, burcKaplamaData.company.address.en)}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    ({translate(burcKaplamaData.company.addressDetail.tr, burcKaplamaData.company.addressDetail.en)})
                  </p>
                </div>
              </div>

              <div className="bk-contact-info-item">
                <div className="bk-info-item-icon">
                  <Phone size={20} />
                </div>
                <div className="bk-info-item-text">
                  <h4>{translate('Telefon Numarası', 'Phone Number')}</h4>
                  <p>
                    {burcKaplamaData.company.phone.includes('bekleniyor') ? (
                      <span style={{ fontSize: '0.88rem', color: 'var(--bk-color-accent-orange)' }}>
                        {translate(burcKaplamaData.company.phone, 'Client phone number pending')}
                      </span>
                    ) : (
                      <a href={`tel:${burcKaplamaData.company.phone}`}>{burcKaplamaData.company.phone}</a>
                    )}
                  </p>
                </div>
              </div>

              <div className="bk-contact-info-item">
                <div className="bk-info-item-icon">
                  <Mail size={20} />
                </div>
                <div className="bk-info-item-text">
                  <h4>{translate('E-posta Adresi', 'Email Address')}</h4>
                  <p>
                    {burcKaplamaData.company.email.includes('bekleniyor') ? (
                      <span style={{ fontSize: '0.88rem', color: 'var(--bk-color-accent-orange)' }}>
                        {translate(burcKaplamaData.company.email, 'Client email address pending')}
                      </span>
                    ) : (
                      <a href={`mailto:${burcKaplamaData.company.email}`}>{burcKaplamaData.company.email}</a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bk-contact-form-wrapper">
            {success ? (
              <div className="bk-form-success">
                <div className="bk-success-icon-wrapper">
                  <CheckCircle2 size={48} />
                </div>
                <h3>{translate('Mesajınız İletildi!', 'Your Message is Sent!')}</h3>
                <p>
                  {translate(
                    'Bizimle iletişime geçtiğiniz için teşekkür ederiz. Talebiniz ekibimize ulaştı ve en kısa sürede dönüş yapılacaktır.',
                    'Thank you for contacting us. Your request has reached our team and we will respond shortly.'
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bk-contact-form" noValidate>
                <h3>{translate('Hızlı İletişim Formu', 'Quick Contact Form')}</h3>
                
                {error && (
                  <div className="bk-form-alert">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                {/* Ad Soyad */}
                <div className="bk-form-group">
                  <label>{translate('Ad Soyad', 'Full Name')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={translate('Adınız ve soyadınız', 'Your name and surname')}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Email & Phone */}
                <div className="bk-form-grid">
                  <div className="bk-form-group">
                    <label>{translate('E-posta', 'Email')} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="eposta@adresi.com"
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="bk-form-group">
                    <label>{translate('Telefon', 'Phone')} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05XXXXXXXXX"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="bk-form-group">
                  <label>{translate('Konu', 'Subject')}</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleChange}
                    placeholder={translate('Mesajınızın konusu', 'Subject of your message')}
                    disabled={loading}
                  />
                </div>

                {/* Message */}
                <div className="bk-form-group">
                  <label>{translate('Mesajınız', 'Your Message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={translate('Talebinizi buraya yazın...', 'Write your request here...')}
                    rows={5}
                    maxLength={1000}
                    disabled={loading}
                  />
                </div>

                {/* Honeypot field (hidden from real users) */}
                <div className="bk-website-dummy">
                  <label>Leave this empty</label>
                  <input
                    type="text"
                    name="website_dummy"
                    value={formData.website_dummy}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Dev-only controls for honeypot/spam verification testing */}
                {import.meta.env.DEV && (
                  <div className="bk-dev-controls">
                    <label className="flex items-center gap-2 text-[10px] text-zinc-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tripHoneypot}
                        onChange={(e) => setTripHoneypot(e.target.checked)}
                        className="rounded border-zinc-700 bg-zinc-800 text-amber-600 focus:ring-0"
                      />
                      <span>[Test] Bot Spam Korumasını Tetikle (Honeypot)</span>
                    </label>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-[9px] text-zinc-500">[Test] Mock reCAPTCHA token:</span>
                      <input
                        type="text"
                        value={mockToken}
                        onChange={(e) => setMockToken(e.target.value)}
                        className="text-[10px] bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-zinc-300 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* KVKK Checkbox */}
                <div
                  className="bk-form-checkbox-wrapper"
                  onClick={() => !loading && setConsentAccepted(!consentAccepted)}
                >
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={() => {}}
                    disabled={loading}
                  />
                  <span>
                    {translate(
                      'Kişisel verilerimin iletişim formu kapsamında işlenmesine izin veriyorum (KVKK Rıza Metni).',
                      'I consent to the processing of my personal data within the scope of the contact form (GDPR Statement).'
                    )}
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !consentAccepted}
                  className="bk-btn bk-btn-primary bk-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="bk-spinner" size={16} />
                      <span>{translate('Gönderiliyor...', 'Sending...')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>{translate('Mesaj Gönder', 'Send Message')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
