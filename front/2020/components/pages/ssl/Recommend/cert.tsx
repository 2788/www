import React from 'react'

import UIButton from 'components/UI/Button'
import { useMobile } from 'hooks/ua'
import { CertInfo, ChooseInfo, certList, certTypeTextMap, domainTypeNameMap, CertBrand, DisplayType } from './type'

import GeoTrustImg from './images/GeoTrust.png'
import TrustAsianImg from './images/TrustAsian.png'
import DigiCertImg from './images/DigiCert.png'

import DemoWithBrandImg from './images/demo-with-brand.svg'
import DemoWithoutBrandImg from './images/demo-without-brand.svg'

import styles from './style.less'

export function getCertFromChoose(info: ChooseInfo) {
  const matchedCerts = certList.filter(cert => {
    const chooseItem = cert.chooseInfo
    return (
      info.siteType === chooseItem.siteType
      && (info.categoryType === undefined || info.categoryType === chooseItem.categoryType)
      && (info.displayType === undefined || info.displayType === chooseItem.displayType)
      && (info.domainType === undefined || info.domainType === chooseItem.domainType)
    )
  })
  if (matchedCerts && matchedCerts.length === 1) {
    return matchedCerts[0]
  }
  return null
}

interface RecommendCertProps {
  cert: CertInfo
}

const brandImgUrlMap = {
  [CertBrand.DigiCert]: DigiCertImg,
  [CertBrand.Geotrust]: GeoTrustImg,
  [CertBrand.TrustAsia]: TrustAsianImg
}

const demoImgUrlMap = {
  [DisplayType.Show]: <DemoWithBrandImg className={styles.demo} />,
  [DisplayType.Hidden]: <DemoWithoutBrandImg className={styles.demo} />
}

export function RecommendCert({ cert }: RecommendCertProps) {
  const isMobile = useMobile()
  const chooseInfo = cert && cert.chooseInfo
  return cert && chooseInfo && (
    <div className={styles.cert}>
      <span className={styles.info}>
        <span className={styles.name}>
          <img className={styles.brand} src={brandImgUrlMap[cert.brand]} />
          {cert.brand}&nbsp;
          {certTypeTextMap[cert.type]}&nbsp;
          {chooseInfo.domainType != null && domainTypeNameMap[chooseInfo.domainType]}
        </span>
        <span className={styles.demo}>{chooseInfo.displayType != null && demoImgUrlMap[chooseInfo.displayType]}</span>
      </span>
      <span>
        <span className={styles.price}>{cert.price}</span>
        <span className={styles.unit}>{cert.unit}</span>
        {
          !isMobile && <UIButton type="primary">立即购买</UIButton>
        }
      </span>
    </div>
  )
}
