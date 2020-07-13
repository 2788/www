import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

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
  sdk_url: 'https://static.sensorsdata.cn/sdk/1.15.12/sensorsdata.min.js',
  heatmap_url: 'https://static.sensorsdata.cn/sdk/1.15.12/heatmap.min.js',
  name: 'sensors',
  server_url: 'https://sensors.qiniu.com/sa?project=default',
  heatmap: {},
  show_log: false
});
`

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line react/no-danger */}
          <script dangerouslySetInnerHTML={{ __html: sensorsScriptContent }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* https://stackoverflow.com/a/42969608 修复 Chrome 下 transition 会立即触发的问题 */}
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
