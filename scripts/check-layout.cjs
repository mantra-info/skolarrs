/* Run against a production preview. See docs/layout.md for setup. */
const assert = require('node:assert/strict');
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3000';
const widths = [360, 390, 768, 1023, 1024, 1280, 1440, 1920];
const countries = ['canada', 'united-kingdom', 'ireland', 'australia', 'usa', 'france', 'germany', 'finland', 'netherlands', 'uae', 'singapore', 'spain', 'poland', 'italy', 'switzerland', 'china'];
const routes = ['/', '/about', '/services', '/study-abroad', '/study-india', '/study-mbbs', '/study-mbbs/russia', '/study-mbbs/private-medical-colleges', '/courses/engineering', '/colleges/adithya-institute-of-technology', ...countries.map(country => `/study-abroad/${country}`)];

(async () => {
  let checked = 0;
  const failures = [];
  for (const engine of ['Chrome', 'WebKit']) {
    const browser = await (engine === 'Chrome' ? chromium.launch({ channel: 'chrome' }) : webkit.launch());
    try {
      const page = await browser.newPage();
      for (const route of routes) {
        const response = await page.goto(`${baseURL}${route}`);
        assert.equal(response.status(), 200, `${engine} ${route}: HTTP status`);
        await page.evaluate(() => document.fonts.ready);
        for (const width of widths) {
          await page.setViewportSize({ width, height: 1080 });
          const metrics = await page.evaluate(() => {
            const root = document.documentElement;
            const containers = [...document.querySelectorAll('.container-x')].map(el => el.getBoundingClientRect().width);
            const spills = [...document.querySelectorAll('h1,h2,h3,p,a,button')].filter(el => {
              const style = getComputedStyle(el);
              return style.display !== 'inline' && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2 && style.overflowX === 'visible';
            }).map(el => el.textContent.slice(0, 100));
            const clips = [...document.querySelectorAll('h1,h2,h3,p,button')].flatMap(el => {
              if (!el.getBoundingClientRect().width) return [];
              const card = el.parentElement.closest('[class*="rounded-"]');
              if (!card) return [];
              const range = document.createRange();
              range.selectNodeContents(el);
              const text = range.getBoundingClientRect(), frame = card.getBoundingClientRect();
              return text.right > frame.right + 2 || text.left < frame.left - 2 || text.bottom > frame.bottom + 2 ? [el.textContent.slice(0, 100)] : [];
            });
            return { scroll: root.scrollWidth, rootSize: parseFloat(getComputedStyle(root).fontSize), containers, spills, clips };
          });
          const context = `${engine} ${route} @ ${width}`;
          try {
            assert.equal(metrics.scroll, width, `${context}: page overflow`);
            assert.ok(Math.abs(metrics.rootSize - (width >= 1024 ? width / 120 : 16)) < 0.001, `${context}: root scaling`);
            assert.ok(metrics.containers.length, `${context}: shared container missing`);
            const expected = width >= 1024 ? 1748 * width / 1920 : width;
            assert.ok(metrics.containers.every(value => Math.abs(value - expected) < 0.1), `${context}: container scaling`);
            assert.deepEqual(metrics.spills, [], `${context}: horizontal text spill`);
            assert.deepEqual(metrics.clips, [], `${context}: text outside card`);
          } catch (error) { failures.push(error.message); }
          checked++;
        }
      }
      await page.goto(baseURL);
      for (const width of [390, 768]) {
        await page.setViewportSize({ width, height: 1080 });
        await page.getByRole('button', { name: 'Open menu' }).click();
        const positioned = await page.locator('header').evaluate(header => {
          const triggerRow = header.firstElementChild.getBoundingClientRect();
          const menu = header.lastElementChild.getBoundingClientRect();
          return Math.abs(menu.top - triggerRow.bottom) <= 1 && menu.left >= 0 && menu.right <= innerWidth;
        });
        assert.ok(positioned, `${engine} @ ${width}: mobile menu placement`);
        await page.getByRole('button', { name: 'Close menu' }).click();
      }
      console.log(`${engine}: routes checked; menu checks passed`);
    } finally {
      await browser.close();
    }
  }
  assert.deepEqual(failures, [], 'Layout failures');
  console.log(`Passed ${checked} route/viewport checks.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
