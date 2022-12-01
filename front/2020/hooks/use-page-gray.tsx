/**
 * 整页置灰
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: 支持 IE https://www.zhangxinxu.com/wordpress/2012/08/css-svg-filter-image-grayscale/

import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect'

export default function usePageGray() {
  useIsomorphicLayoutEffect(() => {
    const htmlRoot = document && document.documentElement
    if (htmlRoot) {
      htmlRoot.className += ' page-gray'
    }
    return () => {
      if (htmlRoot) {
        htmlRoot.className = (htmlRoot.className || '').replace(/(\s|^)page-gray(\s|$)/, ' ')
      }
    }
  }, [])
}
