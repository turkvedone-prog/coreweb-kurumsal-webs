const puppeteer = require('../CoreWeb WEB PORTAL/node_modules/puppeteer');

async function run() {
  console.log('🚀 Launching Puppeteer browser to verify canonical tags locally...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit coreweb preview path
  console.log('\n--- 1. Testing CoreWeb preview path /coreweb/tr ---');
  try {
    await page.goto('http://localhost:3023/coreweb/tr', { waitUntil: 'networkidle2' });
    const canonical = await page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute('href') : null;
    });
    const robots = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`📌 Canonical Link: "${canonical}"`);
    if (canonical === 'https://www.coreweb.tr') {
      console.log('   ✅ PASSED: Canonical tag is generated correctly.');
    } else {
      console.log('   ❌ FAILED: Canonical tag is incorrect or missing!');
    }

    console.log(`📌 Robots Meta: "${robots}"`);
    // Note: Locally it might have noindex because hostname is localhost, which is expected.
    // In production (isCoreMainDomain = true), it will be indexed.
  } catch (err) {
    console.error('   ❌ Error:', err.message);
  }

  // 2. Visit burobig preview path (should not have canonical, but should have noindex)
  console.log('\n--- 2. Testing Burobig preview path /burobig/tr ---');
  try {
    await page.goto('http://localhost:3023/burobig/tr', { waitUntil: 'networkidle2' });
    const canonical = await page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute('href') : null;
    });
    const robots = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`📌 Canonical Link: "${canonical}"`);
    if (canonical === null) {
      console.log('   ✅ PASSED: No canonical tag exists for Burobig.');
    } else {
      console.log('   ❌ FAILED: Found canonical tag for Burobig when there should be none!');
    }

    console.log(`📌 Robots Meta: "${robots}"`);
    if (robots && robots.includes('noindex')) {
      console.log('   ✅ PASSED: Burobig noindex is preserved.');
    } else {
      console.log('   ❌ FAILED: Burobig is missing noindex!');
    }
  } catch (err) {
    console.error('   ❌ Error:', err.message);
  }

  // 3. Visit capilon preview path (should not have canonical, but should have noindex)
  console.log('\n--- 3. Testing Capilon preview path /capilon/tr ---');
  try {
    await page.goto('http://localhost:3023/capilon/tr', { waitUntil: 'networkidle2' });
    const canonical = await page.evaluate(() => {
      const link = document.querySelector('link[rel="canonical"]');
      return link ? link.getAttribute('href') : null;
    });
    const robots = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`📌 Canonical Link: "${canonical}"`);
    if (canonical === null) {
      console.log('   ✅ PASSED: No canonical tag exists for Capilon.');
    } else {
      console.log('   ❌ FAILED: Found canonical tag for Capilon when there should be none!');
    }

    console.log(`📌 Robots Meta: "${robots}"`);
    if (robots && robots.includes('noindex')) {
      console.log('   ✅ PASSED: Capilon noindex is preserved.');
    } else {
      console.log('   ❌ FAILED: Capilon is missing noindex!');
    }
  } catch (err) {
    console.error('   ❌ Error:', err.message);
  }

  await browser.close();
  console.log('\n🏁 Canonical verification tests completed.');
}

run().catch(console.error);
