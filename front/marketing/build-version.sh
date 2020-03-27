#!/bin/bash
basename=$1
host="//qiniu.staticfile.org"
polyfill=$(ls $basename/fec__polyfill-*.js)
polyfillName=${polyfill##*/}
script=$(ls $basename/www-marketing-*.js)
scriptName=${script##*/}
css=$(ls $basename/www-marketing-*.css)
cssName=${css##*/}
cat > $basename/version.js << END_TEXT
window['__qiniuWWWMarketingVersion__'] = {
  polyfillUrl: '${host}/static/${polyfillName}',
  scriptUrl: '${host}/static/${scriptName}',
  cssUrl: '${host}/static/${cssName}'
}
END_TEXT
