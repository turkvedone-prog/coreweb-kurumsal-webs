const puppeteer = require('../CoreWeb WEB PORTAL/node_modules/puppeteer');
const path = require('path');

async function run() {
  console.log('🚀 Starting local theme verification tests...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('net::ERR_') && !msg.text().includes('Failed to load resource')) {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(`[Runtime Exception] ${err.toString()}`);
  });

  // --- 1. COREWEB THEME VERIFICATION ---
  console.log('\n--- 1. Testing CoreWeb theme at http://localhost:3023/coreweb/tr ---');
  try {
    await page.goto('http://localhost:3023/coreweb/tr', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));

    // Page Title
    const title = await page.title();
    console.log(`📌 Page Title: "${title}"`);
    const expectedTitle = "CoreWeb | Yönetilebilir Web Altyapısı ve Kurumsal Web Siteleri";
    if (title === expectedTitle) {
      console.log('   ✅ PASSED: Title matches expected.');
    } else {
      console.log(`   ❌ FAILED: Title mismatch. Expected "${expectedTitle}"`);
    }

    // Theme scoping check
    const hasCoreWebClass = await page.evaluate(() => {
      return document.querySelector('.coreweb-theme') !== null;
    });
    console.log(`📌 Scoping Wrapper (.coreweb-theme): ${hasCoreWebClass ? '✅ FOUND' : '❌ NOT FOUND'}`);

    // Robots Meta Tag
    const robotsMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });
    console.log(`📌 Robots Meta tag: "${robotsMeta}"`);
    if (robotsMeta && robotsMeta.includes('noindex')) {
      console.log('   ⚠️ Robots tag contains noindex (Expected on localhost since it resolves locally).');
    } else {
      console.log('   ✅ Robots tag is indexable / not present.');
    }

    // Check Hero and important headings
    const heroTitle = await page.evaluate(() => {
      const h1 = document.querySelector('.hero__title');
      return h1 ? h1.textContent.replace(/\s+/g, ' ').trim() : null;
    });
    console.log(`📌 Hero Title: "${heroTitle}"`);
    if (heroTitle && heroTitle.includes("Web siteniz bir sayfa değil. İşletmenizin dijital işletim sistemi olmalı.")) {
      console.log('   ✅ PASSED: Hero title matches spec.');
    } else {
      console.log('   ❌ FAILED: Hero title mismatch.');
    }

    // Test Control Panel Tabs (summary is active by default)
    const activeTabDefault = await page.evaluate(() => {
      const activeBtn = document.querySelector('.panel-nav__btn--active h4');
      const activeContent = document.querySelector('.mock-tab-content--active');
      return {
        btnText: activeBtn ? activeBtn.textContent.trim() : null,
        contentId: activeContent ? activeContent.id : null
      };
    });
    console.log(`📌 Default active tab: Button="${activeTabDefault.btnText}", Content ID="${activeTabDefault.contentId}"`);

    // Click 'Gelen Formlar' tab
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('.panel-nav__btn'));
      const leadsTab = tabs.find(t => t.textContent.includes('Gelen Formlar'));
      if (leadsTab) leadsTab.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const activeTabAfterClick = await page.evaluate(() => {
      const activeBtn = document.querySelector('.panel-nav__btn--active h4');
      const activeContent = document.querySelector('.mock-tab-content--active');
      return {
        btnText: activeBtn ? activeBtn.textContent.trim() : null,
        contentId: activeContent ? activeContent.id : null
      };
    });
    console.log(`📌 Active tab after clicking Gelen Formlar: Button="${activeTabAfterClick.btnText}", Content ID="${activeTabAfterClick.contentId}"`);
    if (activeTabAfterClick.contentId === 'mock-tab-leads') {
      console.log('   ✅ PASSED: Tab switcher works correctly.');
    } else {
      console.log('   ❌ FAILED: Tab switcher did not update active tab content.');
    }

    // Test Sector Tabs (furniture is active by default)
    const activeSectorDefault = await page.evaluate(() => {
      const activeBtn = document.querySelector('.solutions-tabs__btn--active');
      const activeContent = document.querySelector('.sol-tab-pane--active h3');
      return {
        btnText: activeBtn ? activeBtn.textContent.trim() : null,
        contentText: activeContent ? activeContent.textContent.trim() : null
      };
    });
    console.log(`📌 Default active sector: Button="${activeSectorDefault.btnText}", Content="${activeSectorDefault.contentText}"`);

    // Click 'Lojistik ve Nakliye Firmaları'
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.solutions-tabs__btn'));
      const logisticsBtn = btns.find(b => b.textContent.includes('Lojistik ve Nakliye'));
      if (logisticsBtn) logisticsBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const activeSectorAfterClick = await page.evaluate(() => {
      const activeBtn = document.querySelector('.solutions-tabs__btn--active');
      const activeContent = document.querySelector('.sol-tab-pane--active h3');
      return {
        btnText: activeBtn ? activeBtn.textContent.trim() : null,
        contentText: activeContent ? activeContent.textContent.trim() : null
      };
    });
    console.log(`📌 Active sector after click: Button="${activeSectorAfterClick.btnText}", Content="${activeSectorAfterClick.contentText}"`);
    if (activeSectorAfterClick.contentText === 'Lojistik ve Nakliye Firmaları') {
      console.log('   ✅ PASSED: Sector tab switcher works correctly.');
    } else {
      console.log('   ❌ FAILED: Sector tab switcher did not update active content.');
    }

    // Form submission validation (checking the error message behavior)
    console.log('📌 Filling out contact form and submitting to verify fallback/offline behavior...');
    await page.type('#form-name', 'Test User');
    await page.type('#form-company', 'Test Company LLC');
    await page.type('#form-email', 'test@example.com');
    await page.type('#form-phone', '0555 123 45 67');
    await page.select('#form-projectType', 'Kurumsal Web Sitesi');
    await page.type('#form-message', 'Automated test message for theme integration.');
    
    // Check KVKK checkbox
    await page.evaluate(() => {
      const checkbox = document.querySelector('#form-kvkk');
      if (checkbox) checkbox.click();
    });

    // Clear console error list to isolate form submission errors
    consoleErrors.length = 0;

    // Submit form
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 2000)); // Wait for API response/timeout

    const formStatusMsg = await page.evaluate(() => {
      const el = document.querySelector('#form-status-msg');
      return el ? el.textContent.trim() : null;
    });
    console.log(`📌 Form Status Message: "${formStatusMsg}"`);
    const expectedFormError = "Form altyapısı yayın entegrasyonu sırasında aktif edilecektir.";
    if (formStatusMsg === expectedFormError) {
      console.log('   ✅ PASSED: Form displayed the correct friendly error on offline/API failure.');
    } else {
      console.log(`   ❌ FAILED: Expected friendly error message "${expectedFormError}"`);
    }

    console.log(`📌 Console Errors during Form Submit:`, consoleErrors);
    if (consoleErrors.length === 0) {
      console.log('   ✅ PASSED: No console.error was printed.');
    } else {
      console.log('   ❌ FAILED: Found console errors during submission!');
    }

    const scPath = path.resolve(__dirname, 'verify_coreweb_preview.png');
    await page.screenshot({ path: scPath });
    console.log(`📸 Screenshot saved to: ${scPath}`);

  } catch (err) {
    console.error('❌ CoreWeb verification failed:', err);
  }

  // --- 2. BUROBIG THEME REGRESSION CHECK ---
  console.log('\n--- 2. Testing Burobig theme regression at http://localhost:3023/burobig/tr ---');
  try {
    consoleErrors.length = 0;
    await page.goto('http://localhost:3023/burobig/tr', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    const title = await page.title();
    console.log(`📌 Burobig Title: "${title}"`);

    const hasBurobigClass = await page.evaluate(() => {
      return document.querySelector('.burobig-theme') !== null;
    });
    console.log(`📌 Scoping Wrapper (.burobig-theme): ${hasBurobigClass ? '✅ FOUND' : '❌ NOT FOUND'}`);

    // Check that CoreWeb style/class is not loaded
    const hasCoreWebClass = await page.evaluate(() => {
      return document.querySelector('.coreweb-theme') !== null;
    });
    console.log(`📌 Leak Check: Does Burobig have .coreweb-theme? ${hasCoreWebClass ? '❌ YES (Styles Leaking!)' : '✅ NO'}`);

    console.log(`📌 Burobig Console Errors:`, consoleErrors);
    if (consoleErrors.length === 0) {
      console.log('   ✅ PASSED: No Burobig page console errors.');
    } else {
      console.log('   ❌ FAILED: Found console errors on Burobig theme!');
    }

    const scPath = path.resolve(__dirname, 'verify_burobig_preview.png');
    await page.screenshot({ path: scPath });
    console.log(`📸 Burobig Screenshot saved to: ${scPath}`);
  } catch (err) {
    console.error('❌ Burobig verification failed:', err);
  }

  // --- 3. CAPILON THEME REGRESSION CHECK ---
  console.log('\n--- 3. Testing Capilon theme regression at http://localhost:3023/capilon/tr ---');
  try {
    consoleErrors.length = 0;
    await page.goto('http://localhost:3023/capilon/tr', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    const title = await page.title();
    console.log(`📌 Capilon Title: "${title}"`);

    const hasCapilonClass = await page.evaluate(() => {
      return document.querySelector('.capilon-theme') !== null;
    });
    console.log(`📌 Scoping Wrapper (.capilon-theme): ${hasCapilonClass ? '✅ FOUND' : '❌ NOT FOUND'}`);

    // Check that CoreWeb style/class is not loaded
    const hasCoreWebClass = await page.evaluate(() => {
      return document.querySelector('.coreweb-theme') !== null;
    });
    console.log(`📌 Leak Check: Does Capilon have .coreweb-theme? ${hasCoreWebClass ? '❌ YES (Styles Leaking!)' : '✅ NO'}`);

    console.log(`📌 Capilon Console Errors:`, consoleErrors);
    if (consoleErrors.length === 0) {
      console.log('   ✅ PASSED: No Capilon page console errors.');
    } else {
      console.log('   ❌ FAILED: Found console errors on Capilon theme!');
    }

    const scPath = path.resolve(__dirname, 'verify_capilon_preview.png');
    await page.screenshot({ path: scPath });
    console.log(`📸 Capilon Screenshot saved to: ${scPath}`);
  } catch (err) {
    console.error('❌ Capilon verification failed:', err);
  }

  await browser.close();
  console.log('\n🏁 Local verification completed.');
}

run();
