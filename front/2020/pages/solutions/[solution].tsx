import React from 'react'
import { GetServerSidePropsContext } from 'next'

import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { useAdminBtns } from 'hooks/product-btn'
import { IconMap } from 'components/LibIcon'
import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section/v2'
import PageBanner from 'components/Product/PageBanner'
import { getSolutionInfo, listAllSolutionInfos, SolutionInfo } from 'apis/admin/solution'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { ComponentMap } from 'constants/solutions/componetns'
import { useMobile } from 'hooks/ua'
import NotFoundPage from 'pages/404'

interface SolutionPageProps {
  solutionInfo: SolutionInfo | null
  iconMap?: IconMap
  globalBanners?: GlobalBanner[]
  isPreview?: boolean
}

type PageContentProps = Omit<SolutionPageProps, 'iconMap' | 'globalBanners' | 'isPreview'> & { solutionInfo: SolutionInfo }

function PageContent({ solutionInfo }: PageContentProps) {
  const isMobile = useMobile()

  const { title, desc, banner, sections } = solutionInfo

  const btns = useAdminBtns(banner!.buttons)

  return (
    <>
      {banner && (
        <PageBanner
          title={title}
          desc={desc.detail}
          bgImgUrl={isMobile ? (banner.bgImgUrl.small || banner.bgImgUrl.large) : banner.bgImgUrl.large}
          bgColor={banner.bgColor}
          btns={btns.banner}
          light={banner.light} />
      )}

      <Navigator>{btns.nav}</Navigator>

      {sections.map(section => {
        const { name, title: sectionTitle, component } = section
        const Component = ComponentMap[component.name]
        if (!Component) {
          return null
        }
        return (
          <Section key={name} name={name} title={sectionTitle} withTailPadding>
            <Component {...component.props as any} />
          </Section>
        )
      })}
    </>
  )
}

export default function SolutionPage({
  globalBanners, isPreview, solutionInfo, iconMap, ...otherProps
}: SolutionPageProps) {
  if (!solutionInfo || !hasSolutionPage(solutionInfo)) {
    return <NotFoundPage globalBanners={globalBanners} />
  }
  const { title, keywords, desc } = solutionInfo
  const metaInfo = {
    title,
    keywords: keywords.join(','),
    description: desc.detail
  }

  return isPreview ? (
    <Layout {...metaInfo} forceSimple iconMap={iconMap}>
      <PageContent solutionInfo={solutionInfo} {...otherProps} />
    </Layout>
  ) : (
    <Layout {...metaInfo} globalBanners={globalBanners || []} iconMap={iconMap}>
      <PageContent solutionInfo={solutionInfo} {...otherProps} />
    </Layout>
  )
}

export function hasSolutionPage(info: SolutionInfo) {
  if (info.banner && info.sections.length) {
    return true
  }
  return false
}

export async function getServerSideProps({ params, res }: GetServerSidePropsContext<{ solution: string }>) {
  const solution = params!.solution

  const solutionInfo = await getSolutionInfo(solution)

  if (!solutionInfo || !hasSolutionPage(solutionInfo)) {
    // TODO：暂时这么处理，升级 next 后可以：return { notFound: true }
    // 参考：https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props#notfound
    res.statusCode = 404
    return { props: {} }
  }

  const icons = getIconIdsFromJson(solutionInfo)

  return {
    props: {
      solutionInfo,
      globalBanners: await getGlobalBanners(),
      iconMap: await getIconMap(icons)
    }
  }
}

export async function getServerSidePaths() {
  const solutions = await listAllSolutionInfos()
  const paths = solutions
    .filter(info => hasSolutionPage(info))
    .map(({ path }) => ({ params: { path } }))
  return {
    paths,
    fallback: false
  }
}
