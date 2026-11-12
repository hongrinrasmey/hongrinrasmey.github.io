// Quick page check in a headless browser. No packages: needs Node 22+ and Edge or Chrome.
// Run from the project folder:   node tools/check.mjs
// Other browser:                 CHROME_PATH="C:/path/to/chrome.exe" node tools/check.mjs
// Checks at 360-1920px: no console errors, no sideways scroll, one <h1>, every "#..." link has a
// target, every image file exists, and on wide screens the hero text is in order and centred.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const page = resolve('index.html');
const browser = [process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome'].find(p => p && existsSync(p));
if (!browser) { console.error('No Edge/Chrome found: set CHROME_PATH'); process.exit(2); }

let failed = 0;
const report = (ok, msg) => { if (!ok) failed++; console.log((ok ? 'PASS ' : 'FAIL ') + msg); };

// 1. Image files named in index.html exist (src, data-next, poster)
const html = readFileSync(page, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const files = [...html.matchAll(/(?:src|data-next|data-poster)="([^"#:]+)"/g)].map(m => m[1]);
const missing = files.filter(f => !existsSync(resolve(f)));
report(!missing.length, `${files.length} image/script files exist` + (missing.length ? ': missing ' + missing.join(', ') : ''));

// 2. Browser checks
const profile = mkdtempSync(join(tmpdir(), 'portfolio-check-'));
const proc = spawn(browser, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let ws;
try {
  let port;
  for (let i = 0; i < 100 && !port; i++) {
    try { port = readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]; } catch { await new Promise(r => setTimeout(r, 100)); }
  }
  const target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page');
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = no; });

  let id = 0; const waiting = {}, errors = []; let loaded;
  ws.onmessage = m => {
    const d = JSON.parse(m.data);
    if (d.id) return waiting[d.id]?.(d);
    if (d.method === 'Runtime.exceptionThrown') errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push(d.params.args.map(a => a.value ?? a.description).join(' '));
    if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') errors.push(d.params.entry.text);
    if (d.method === 'Page.loadEventFired') loaded?.();
  };
  const send = (method, params = {}) => new Promise(r => { waiting[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
  await send('Runtime.enable'); await send('Log.enable'); await send('Page.enable');

  const measure = `(() => {
    const d = document.documentElement, out = {};
    out.sideways = d.scrollWidth - d.clientWidth;
    out.h1 = document.querySelectorAll('h1').length;
    out.badLinks = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href'))
      .filter(h => h.length > 1 && !document.getElementById(h.slice(1)));
    const inner = document.querySelector('.hero__inner');
    if (inner && getComputedStyle(inner).display === 'grid') {
      const box = inner.getBoundingClientRect();
      const items = [...inner.children].filter(e => !e.matches('.hero__photo')).map(e => e.getBoundingClientRect());
      out.heroOrder = items.every((r, i) => !i || r.top > items[i - 1].top);
      out.heroGap = Math.round(Math.abs((items[0].top - box.top) - (box.bottom - items.at(-1).bottom)));
    }
    return out;
  })()`;

  for (const [w, h] of [[360, 780], [390, 844], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]]) {
    errors.length = 0;
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
    const done = new Promise(r => { loaded = r; });
    await send('Page.navigate', { url: pathToFileURL(page).href });
    await done;
    await new Promise(r => setTimeout(r, 1500)); // hero entrance animation (~1s) moves the boxes
    const m = (await send('Runtime.evaluate', { expression: measure, returnByValue: true })).result.result.value;
    report(!errors.length, `${w}px no console errors` + (errors.length ? ': ' + errors.join(' | ') : ''));
    report(m.sideways <= 0, `${w}px no sideways scroll` + (m.sideways > 0 ? ` (${m.sideways}px too wide)` : ''));
    report(m.h1 === 1, `${w}px one <h1> (found ${m.h1})`);
    report(!m.badLinks.length, `${w}px in-page links have targets` + (m.badLinks.length ? ': ' + m.badLinks.join(' ') : ''));
    if ('heroOrder' in m) {
      report(m.heroOrder, `${w}px hero text in HTML order`);
      report(m.heroGap <= 2, `${w}px hero text centred (above/below differ by ${m.heroGap}px)`);
    }
  }
} finally {
  ws?.close();
  proc.kill();
  await new Promise(r => setTimeout(r, 500)); // let the browser release its profile folder
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* temp folder, the OS cleans it */ }
}
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
