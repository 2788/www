/**
 * @file 用于加载 external 内容的加载器
 * @description 注意该文件会不经处理地直接被插入页面运行，维护时需考虑代码的浏览器兼容性
 */

// 预期的使用姿势：
// <script src="https://xxx/loader.js"></script>
// <div id="header"></div>
// <script>window.__qiniu_www_externals__.load('header', document.getElementById('header'))</script>

(function() {

  function loadJs(url, parent) {
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script')
      script.onload = resolve
      script.onerror = reject
      script.src = url
      parent.appendChild(script)
    })
  }

  function loadCss(url, parent) {
    return new Promise(function(resolve, reject) {
      var link = document.createElement('link')
      link.onload = resolve
      link.onerror = reject
      link.rel = 'stylesheet'
      link.href = url
      parent.appendChild(link)
    })
  }

  // 在构建时会被替换为 externals 组件构建信息映射表
  var manifest = MANIFEST

  function load(component, targetElement) {
    var jsUrl = manifest['externals/' + component + '.js']
    var cssUrl = manifest['externals/' + component + '.css']
    if (!jsUrl || !cssUrl) {
      console.error('Failed to get js url & css url:', jsUrl, cssUrl)
      return
    }
    function loadComponent() {
      return Promise.all([
        loadCss(cssUrl, document.head),
        loadJs(jsUrl, document.body)
      ]).then(function() {
        window.__qiniu_www_externals__.components[component].render(targetElement)
      })
    }

    if (document.readyState !== 'loading') loadComponent()
    else window.addEventListener('DOMContentLoaded', loadComponent)
  }

  window.__qiniu_www_externals__ = { load: load, components: {} }
})()
