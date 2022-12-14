import React from 'react'
import { GetServerSidePropsContext } from 'next'

import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { useAdminBtns } from 'hooks/product-btn'
import { IconMap } from 'components/LibIcon'
import Layout from 'components/Product/Layout'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section/v2'
import PageBanner from 'components/Product/PageBanner'
import SolutionUsageGuide from 'components/Solution/common/SolutionUsageGuide'
import { headerThemeContext } from 'components/Header/Pc'
import { getSolutionInfo, listAllSolutionInfos, SolutionInfo } from 'apis/admin/solution'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { ComponentMap } from 'constants/solutions/components'
import { useMobile } from 'hooks/ua'
import NotFoundPage from 'pages/404'

interface SolutionPageProps {
  solutionInfo: SolutionInfo | null
  iconMap: IconMap
  globalBanners: GlobalBanner[]
}

type PageContentProps = Omit<SolutionPageProps, 'iconMap' | 'globalBanners'> & { solutionInfo: SolutionInfo }

function PageContent({ solutionInfo }: PageContentProps) {
  const isMobile = useMobile()

  const { name, desc, banner, usageGuide, sections } = solutionInfo

  const btns = useAdminBtns(banner?.buttons ?? [], !banner?.light)

  return (
    <>
      {banner && (
        <PageBanner
          title={name}
          desc={desc.detail}
          bgImgUrl={isMobile ? (banner.bgImgUrl.small || banner.bgImgUrl.large) : banner.bgImgUrl.large}
          bgColor={banner.bgColor}
          btns={btns.banner}
          light={banner.light}
        />
      )}

      <Navigator>{btns.nav}</Navigator>

      {sections.map(section => {
        const { name: sectionName, title: sectionTitle, component } = section
        const Component = ComponentMap[component.name]
        if (!Component) {
          return null
        }
        return (
          <Section key={sectionName} name={sectionName} title={sectionTitle} withTailPadding>
            <Component {...component.props as any} />
          </Section>
        )
      })}

      {usageGuide && (<SolutionUsageGuide {...usageGuide} />)}
    </>
  )
}

export default function SolutionPage({
  globalBanners, solutionInfo, iconMap, ...otherProps
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

  // eslint-disable-next-line no-nested-ternary
  const theme = solutionInfo.banner?.light == null
    ? 'default'
    : (solutionInfo.banner.light ? 'light' : 'dark')

  return (
    <headerThemeContext.Provider value={theme}>
      <Layout {...metaInfo} globalBanners={globalBanners} iconMap={iconMap}>
        <PageContent solutionInfo={solutionInfo} {...otherProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export function hasSolutionPage(info: SolutionInfo) {
  return info.banner != null && info.sections.length > 0
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
