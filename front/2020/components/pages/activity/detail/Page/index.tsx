import React from 'react'

import { IActivity } from 'apis/admin/activity'
import { ComponentMap } from 'constants/activity/components'
import Navigator from 'components/Product/Navigator'
import PageBanner from 'components/Product/PageBanner'
import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import { useAdminBtns } from 'hooks/product-btn'
import UsageGuide from 'components/Activity/common/UsageGuide'
import { ActivityProvider } from 'components/Activity/common/ActivityContext'
import { RegistrationButton } from 'components/Activity/common/RegistrationButton'

interface Props {
  activity: IActivity
}

export function Page(props: Props) {
  const isMobile = useMobile()
  const btns = useAdminBtns([])

  const { banner, usageGuide, sections } = props.activity.page!

  return (
    <ActivityProvider activity={props.activity}>
      {banner && (
        <PageBanner
          title=""
          desc=""
          bgImgUrl={isMobile ? (banner.bgImgUrl.small || banner.bgImgUrl.large) : banner.bgImgUrl.large}
          bgColor={banner.bgColor}
        />
      )}

      <Navigator>
        {btns.nav}
        <RegistrationButton />
      </Navigator>

      {sections.map(section => {
        const { name: sectionName, title: sectionTitle, subtitle, component } = section
        const Component = ComponentMap[component.name]
        if (!Component) {
          return null
        }
        return (
          <Section
            withTailPadding
            key={sectionName + section.title}
            name={sectionName}
            title={sectionTitle}
            subtitle={subtitle}
          >
            <Component {...component.props as any} />
          </Section>
        )
      })}

      {usageGuide && (<UsageGuide {...usageGuide} />)}
    </ActivityProvider>
  )
}
