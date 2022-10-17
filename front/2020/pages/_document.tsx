/* eslint-disable react/no-danger */

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { assetHost } from 'constants/env'

const sensorsScriptContent = `
(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
    return false;
  }
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    w[n].para = para;
    y.parentNode.insertBefore(x, y);
  }
})({
  sdk_url: 'https://static.sensorsdata.cn/sdk/1.15.14/sensorsdata.min.js',
  heatmap_url: 'https://static.sensorsdata.cn/sdk/1.15.14/heatmap.min.js',
  name: 'sensors',
  server_url: 'https://sensors.qiniu.com/sa?project=default',
  heatmap: {},
  preset_properties: {
    latest_referrer_host: true,
    latest_landing_page: true
  },
  show_log: false
});
`

const gaScriptContent = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('js', new Date());
gtag('config', 'UA-78944316-1');
`

const baiduhmScriptContent = `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?204fcf6777f8efa834fe7c45a2336bf1";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
`

const baiduzhanzhangScriptContent = `
(function() {
  var hostname = window.location.hostname;
  var domain = hostname.split('.').slice(-2).join('.');
  if (domain && domain !== 'localhost' && domain.indexOf('qiniu.io') < 0) {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  }
})();
`

// TODO
// 以下火眼云埋点代码用于测试
// 后续测试完成需要移除
// https://jira.qiniu.io/browse/UG-528
const huoyanScriptContent = `
(function(para) {
  var p = para.sdk_url, n = 'huoYan', w = window, d = document, s = 'script', x = null, y = null;
  if (typeof(w['huoyanDataAnalytic']) !== 'undefined') {
    return false;
  }
  w['huoyanDataAnalytic'] = n;
  w[n] = w[n] || function(a) {
    return function() {
      (w[n]._q = w[n]._q || []).push([a, arguments]);
    }
  };
  w[n]['quick'] = w[n].call(null, 'quick');
  w[n]['search'] = w[n].call(null, 'search');
  x = d.createElement(s), y = d.getElementsByTagName(s)[0];
  x.async = 1;
  x.src = p;
  w[n].para = para;
  y.parentNode.insertBefore(x, y);
})({
  sdk_url: 'https://identify.tankeai.com/assets/js/identify.js',
  server_url: 'https://identify.tankeai.com'
});

var g_huoyan_opt = {
  site_id: 2337,
  user_company: 2433
};

huoYan.quick('autoTrack', g_huoyan_opt);
`

const mikuInitScriptContent = `
(() => {
  const debug = window.location.search.includes('debug')
  const appInfo = { appID: 'ao89rvrjpyi4gn57', appSalt: 'reimp7tnc2y9p11hckwz10lt3tigw8e7' }
  mikuPerf.init(appInfo)
  if ('serviceWorker' in navigator) {
    fetch("https://api.qiniudns.com/v1/resolve?name=www-static.qbox.me&type=A", {
      headers: { authorization: "QApp ao89rvrjpyi4gn57:po9QFmCanN2pV2RZzR6p2ybTkMU=" }
    }).then(function (res) {
      res.json().then(function (body) {
        if (body.groups) {
          miku.initProxy('/miku-sw-0.9.1.js', {
            app: appInfo,
            domains: ['www-static.qbox.me'],
            debug
          })
        } else {
          navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
              registration.unregister()
            }
          })
        }
      })
    })
  }
})()
`

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <script dangerouslySetInnerHTML={{ __html: sensorsScriptContent }} />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-78944316-1"></script>
          <script dangerouslySetInnerHTML={{ __html: gaScriptContent }} />
          <script dangerouslySetInnerHTML={{ __html: baiduhmScriptContent }} />
          <script dangerouslySetInnerHTML={{ __html: baiduzhanzhangScriptContent }} />
          <script src={`${assetHost}/miku-perf-0.9.1.js`} />
          <script src={`${assetHost}/miku-0.9.1.js`} />
          <script dangerouslySetInnerHTML={{ __html: mikuInitScriptContent }} />
        </Head>
        <body>
          {/* https://stackoverflow.com/a/57888310 */}
          <script> </script>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: huoyanScriptContent }} />
          {/* https://stackoverflow.com/a/42969608 修复 Chrome 下 transition 会立即触发的问题 */}
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
