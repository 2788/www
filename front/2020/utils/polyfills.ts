// https://reactjs.org/docs/javascript-environment-requirements.html
// 注意：在 dev 环境 react-refresh 会比 polyfills 先加载导致报错。prod 正常
import 'core-js/es/map'
import 'core-js/es/set'

// 目前主要版本的 safari 不支持 web animation（首页产品架构图模块依赖该能力）
// 不过最新版本 safari 号称已经支持，所以过一段时间应该可以去掉这里的 polyfill
// 参考 https://caniuse.com/#search=animation
// 以及 https://webkit.org/blog/10266/web-animations-in-safari-13-1/
import 'web-animations-js'
