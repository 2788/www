/**
 * @file kodo 404 页面
 */

// 参考文档：https://developer.qiniu.com/kodo/manual/1659/download-setting

import { getGlobalBanners } from 'apis/admin/global-banners'

import { Props } from 'pages/404'

export { default } from 'pages/404'

export async function getServerSideProps() {
  const globalBanners = await getGlobalBanners()
  const props: Props = { globalBanners }
  return { props }
}
