import React, { PropsWithChildren, ReactNode } from 'react'

import PersonalSiteIcon from './images/personal-site.svg'
import EnterpriseSiteIcon from './images/enterprise-site.svg'

import {
  SiteType, DomainType, CategoryType, DisplayType, ChooseInfo, domainTypeDescMap,
  displayTypeTextMap, domainTypeTextMap, categoryTypeTextMap, displayTypeDescMap
} from './type'

import styles from './style.less'

interface ChooseItemProps {
  icon?: ReactNode
  desc?: ReactNode
  handleChoose: () => void
}

function ChooseItem({ children, desc, handleChoose }: PropsWithChildren<ChooseItemProps>) {
  return (
    <li className={styles.item} onClick={() => handleChoose()}>
      <div className={styles.site}>{children}</div>
      {desc && <p className={styles.desc}>{desc}</p>}
    </li>
  )
}

interface ChooseItem {
  key: keyof ChooseInfo
  value: SiteType | DomainType | CategoryType | DisplayType
  text: ReactNode
  desc?: ReactNode
}

interface ChooseProps {
  step: number
  info: ChooseInfo
  handleChoose: (info: ChooseInfo) => void
}

export function PersonalSiteChooseStep({ step, handleChoose }: ChooseProps) {
  const sites: ChooseItem[] = []
  switch (step) {
    case 1: {
      const chooseKeys: Array<keyof typeof DomainType> = ['Normal', 'Wildcard']
      chooseKeys.forEach(chooseKey => {
        sites.push(
          {
            key: 'domainType',
            value: DomainType[chooseKey],
            text: domainTypeTextMap[DomainType[chooseKey]]
          }
        )
      })
      break
    }
    default:
      sites.splice(0, sites.length)
  }
  return (
    <>
      <ul className={styles.list}>
        {
          sites.map(site => {
            const handleChooseItem = () => handleChoose({ [site.key]: site.value })
            return (
              <ChooseItem key={site.value} handleChoose={handleChooseItem}>{site.text}</ChooseItem>
            )
          })
        }
      </ul>
    </>
  )
}

export function EnterpriseSiteChooseStep({ step, info, handleChoose }: ChooseProps) {
  const sites: ChooseItem[] = []
  switch (step) {
    case 1: {
      const chooseKeys: Array<keyof typeof CategoryType> = ['Finance', 'Medicine', 'IT', 'Other']
      chooseKeys.forEach(displayKey => {
        sites.push(
          {
            key: 'categoryType',
            value: CategoryType[displayKey],
            text: categoryTypeTextMap[CategoryType[displayKey]]
          }
        )
      })
      break
    }
    case 2: {
      const chooseKeys: Array<keyof typeof DomainType> = []
      switch (info.categoryType) {
        case CategoryType.Finance:
          chooseKeys.push('Normal', 'Wildcard', 'Multiple')
          break
        case CategoryType.IT:
        case CategoryType.Medicine:
        case CategoryType.Other:
          chooseKeys.push('Normal', 'Wildcard', 'Multiple', 'MultipleWildcard')
          break
        default:
      }
      chooseKeys.forEach(chooseKey => {
        sites.push(
          {
            key: 'domainType',
            value: DomainType[chooseKey],
            text: domainTypeTextMap[DomainType[chooseKey]],
            desc: domainTypeDescMap[DomainType[chooseKey]]
          }
        )
      })
      break
    }
    case 3: {
      const chooseKeys: Array<keyof typeof DisplayType> = []
      switch (info.domainType) {
        case DomainType.Normal:
          chooseKeys.push('Show')
          if (info.categoryType !== CategoryType.Finance) {
            chooseKeys.push('Hidden')
          }
          break
        case DomainType.Wildcard:
          chooseKeys.push('Hidden')
          break
        case DomainType.Multiple:
          chooseKeys.push('Show')
          if (info.categoryType !== CategoryType.Finance) {
            chooseKeys.push('Hidden')
          }
          break
        case DomainType.MultipleWildcard:
          if (info.categoryType !== CategoryType.Finance) {
            chooseKeys.push('Hidden')
          }
          break
        default:
      }
      chooseKeys.forEach(chooseKey => {
        sites.push(
          {
            key: 'displayType',
            value: DisplayType[chooseKey],
            text: displayTypeTextMap[DisplayType[chooseKey]],
            desc: displayTypeDescMap[DisplayType[chooseKey]]
          }
        )
      })
      break
    }
    default:
      sites.splice(0, sites.length)
  }
  return (
    <>
      <ul className={styles.list}>
        {
          sites.map(site => {
            const handleChooseItem = () => handleChoose({ [site.key]: site.value })
            return (
              <ChooseItem key={site.value} desc={site.desc} handleChoose={handleChooseItem}>{site.text}</ChooseItem>
            )
          })
        }
      </ul>
    </>
  )
}

export function SiteChoose({ handleChoose }: ChooseProps) {
  return (
    <ul className={styles.list}>
      <ChooseItem handleChoose={() => handleChoose({ siteType: SiteType.Personal })}>
        <PersonalSiteIcon />个人网站
      </ChooseItem>
      <ChooseItem handleChoose={() => handleChoose({ siteType: SiteType.Enterprise })}>
        <EnterpriseSiteIcon />企业网站
      </ChooseItem>
    </ul>
  )
}
