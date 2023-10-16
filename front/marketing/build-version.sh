#!/bin/bash
basename=$1
host="//static.qiniu.com"
polyfill=$(ls $basename/fec__polyfill-*.js)
polyfillName=${polyfill##*/}
renderer=$(ls $basename/www-marketing-*.js)
rendererName=${renderer##*/}
css=$(ls $basename/www-marketing-*.css)
cssName=${css##*/}
cat > $basename/version.js << END_TEXT
window['__qiniuWWWMarketingVersion__'] = {
  polyfillUrl: '${host}/static/${polyfillName}',
  rendererUrl: '${host}/static/${rendererName}',
  cssUrl: '${host}/static/${cssName}'
}
END_TEXT
