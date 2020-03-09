/**
 * @file URL polyfill
 * @author nighca <nighca@live.cn>
 */

import { URL } from 'whatwg-url'

// feature detect for URL constructor
// copy from https://github.com/Shopify/url-polyfill/blob/8896d3430a1980c56bdf7ab4d3fb70d1f606d5c5/url.js#L7
let hasWorkingUrl = false
try {
  const u = new URL('b', 'http://a')
  u.pathname = 'c%20d'
  hasWorkingUrl = u.href === 'http://a/c%20d'
} catch (e) {
  // do nothing
}

if (!hasWorkingUrl) {
  window.URL = URL as any
}
