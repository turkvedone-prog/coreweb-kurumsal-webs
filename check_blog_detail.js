const puppeteer = require('/Users/turkved/.gemini/antigravity/scratch/CoreWeb WEB PORTAL/node_modules/puppeteer');

async function run() {
  console.log('Connecting to browser and loading localhost:5175/tr/blog/toplanti-odasi-mobilyalari-ile-profesyonel-bir-ilk-izlenim-yaratin ...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(`[Runtime Exception] ${err.toString()}`);
  });

  try {
    const response = await page.goto('http://localhost:5175/tr/blog/toplanti-odasi-mobilyalari-ile-profesyonel-bir-ilk-izlenim-yaratin', { waitUntil: 'networkidle2', timeout: 15000 });
    console.log(`HTTP Status: ${response.status()}`);
    
    await new Promise(r => setTimeout(r, 3000)); // Wait for render

    const html = await page.evaluate(() => {
      const el = document.getElementById('main-content');
      return el ? el.outerHTML : 'Main content NOT found';
    });

    console.log('\n--- Rendered HTML of #main-content ---');
    console.log(html.substring(0, 1000) + '... [TRUNCATED]');

    console.log('\n--- Console / Runtime Errors ---');
    consoleErrors.forEach(err => console.log(err));

  } catch (err) {
    console.error('Error checking blog detail page:', err);
  } finally {
    await browser.close();
  }
}

run();
