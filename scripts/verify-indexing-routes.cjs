const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const legacyEvent = '/event/5375522/665726162/ladies-r-b-kickback-concert-valentine-s-day-edition-w-h-town-feat-charmin-greene-ginuwine-dru-hill-bobby-v-and-more';

test('reported legacy event has one permanent redirect to an existing public destination', () => {
  const rules = config.redirects.filter(rule => rule.source === legacyEvent);
  assert.deepEqual(rules, [{ source: legacyEvent, destination: '/events', permanent: true }]);
  assert.ok(fs.existsSync(path.join(root, 'events.html')));
  assert.match(fs.readFileSync(path.join(root, 'events.html'), 'utf8'), /rel="canonical" href="https:\/\/www\.charmingreene\.com\/events"/);
  assert.ok(!config.redirects.some(rule => rule.source === '/events'));
});

test('legacy recovery stays exact rather than redirecting private or unknown routes', () => {
  assert.ok(!config.redirects.some(rule => /[:*()]/.test(rule.source)), 'No catch-all redirects');
  for (const prefix of ['/client', '/proposal', '/sign', '/pay', '/api']) {
    assert.ok(!config.redirects.some(rule => rule.source === prefix || rule.source.startsWith(prefix + '/')));
  }
});

test('private client, proposal, signature and payment pages retain noindex headers', () => {
  for (const source of ['/client', '/proposal/:path*', '/sign/:path*', '/pay/:path*']) {
    assert.ok(config.headers.some(rule => rule.source === source && rule.headers.some(header =>
      header.key.toLowerCase() === 'x-robots-tag' && header.value === 'noindex, nofollow')));
  }
  assert.ok(!config.headers.some(rule => rule.source === '/(.*)' && rule.headers.some(header =>
    header.key.toLowerCase() === 'x-robots-tag')));
});
