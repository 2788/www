import React, { useState, useRef } from 'react'

import Section from 'components/Product/Section'

import { ChooseInfo, defaultChooseInfo, SiteType } from './type'
import { SiteChoose, PersonalSiteChooseStep, EnterpriseSiteChooseStep } from './choose'
import { RecommendCert, getCertFromChoose } from './cert'

import styles from './style.less'

export default function SslRecommend() {
  const chooseInfoRef = useRef<ChooseInfo>(defaultChooseInfo)
  const [step, setStep] = useState(0)
  const currentInfo = chooseInfoRef.current

  const cert = getCertFromChoose(currentInfo)

  function handleChooseItem(info: ChooseInfo) {
    setStep(step + 1)
    chooseInfoRef.current = { ...currentInfo, ...info }
  }

  function goBack() {
    if (cert) {
      setStep(0)
      chooseInfoRef.current = {}
    } else {
      setStep(step - 1)
    }
  }

  const chooseProps = {
    step,
    info: currentInfo,
    handleChoose: handleChooseItem
  }

  let chooseDom = null
  if (step === 0) {
    chooseDom = <SiteChoose {...chooseProps} />
  } else if (cert == null) {
    chooseDom = currentInfo.siteType === SiteType.Personal
    ? <PersonalSiteChooseStep {...chooseProps} />
    : <EnterpriseSiteChooseStep {...chooseProps} />
  }

  return (
    <Section title="推荐证书" name="recommend" header="帮您推荐证书" subtitle={getSubTitle(step, currentInfo)}>
      <div className={styles.recommend}>
        {chooseDom}
        {cert && <RecommendCert cert={cert} />}
        {
          step > 0 && <div className={styles.goback} onClick={goBack}>返回</div>
        }
      </div>
    </Section>
  )
}

function getSubTitle(step: number, info: ChooseInfo) {
  if (step === 0) {
    return '请选择您购买证书使用的网站规模'
  }
  if (info.siteType === SiteType.Enterprise && step === 1) {
    return '请选择您购买证书使用的网站类型'
  }
  if (
    info.siteType === SiteType.Enterprise && step === 2
    || info.siteType === SiteType.Personal && step === 1
  ) {
    return '请选择您购买证书使用的域名数量'
  }
  if (info.siteType === SiteType.Enterprise && step === 3) {
    return '请选择您的证书特征'
  }
  return null
}
