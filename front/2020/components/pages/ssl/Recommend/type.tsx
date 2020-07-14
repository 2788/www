import { ReactNode } from 'react'
import { urlFor, UrlParams } from 'utils'

export enum SiteType {
  Personal,
  Enterprise
}

export enum DomainType {
  Normal,
  Wildcard,
  Multiple,
  MultipleWildcard
}

export const domainTypeTextMap = {
  [DomainType.Normal]: '一个域名',
  [DomainType.Wildcard]: '无限个同级子域名',
  [DomainType.Multiple]: '多个域名',
  [DomainType.MultipleWildcard]: '多个域名和无限个同级子域名'
}

export const domainTypeNameMap = {
  [DomainType.Normal]: '单域名',
  [DomainType.Multiple]: '多域名',
  [DomainType.Wildcard]: '泛域名',
  [DomainType.MultipleWildcard]: '多域名泛域名'
}

export const domainTypeDescMap = {
  [DomainType.Normal]: '例如：qiniu.com、a.qiniu.com或者a.b.qiniu.com',
  [DomainType.Wildcard]: '例如：*.qiniu.com，证书将保护qiniu.com和它的全部同一级子域名(如a.qiniu.com，b.qiniu.com…)',
  [DomainType.Multiple]: '例如：a.com、b.com、c.qiniu.com 共计为3个域名，买1张多域名证书，域名个数选择3个即可。',
  [DomainType.MultipleWildcard]: '例如：2个单独的标准域名（比如：domain.com、www.qiniu.cn）和1个泛域名（比如：*.example.com），买1张多域名泛域名证书选择标准域名2个，泛域名1个即可。'
}

export enum CategoryType {
  Finance,
  Medicine,
  IT,
  Other
}

export const categoryTypeTextMap = {
  [CategoryType.Finance]: '金融投资',
  [CategoryType.Medicine]: '医疗教育',
  [CategoryType.IT]: 'IT与通讯',
  [CategoryType.Other]: '其他行业'
}

export enum DisplayType {
  Show = 1,
  Hidden = 0
}

export const displayTypeTextMap = {
  [DisplayType.Show]: '展示公司名',
  [DisplayType.Hidden]: '不展示公司名'
}

export const displayTypeDescMap = {
  [DisplayType.Show]: '对域名所有权和企业身份信息进行验证，同时会审查第三方数据库如114查号台等，浏览器上有https提示并显示完整的单位名称。',
  [DisplayType.Hidden]: '对域名所有权和企业身份信息进行验证，浏览器上有https提示并有绿锁标记。'
}

export interface ChooseInfo {
  siteType?: SiteType,
  domainType?: DomainType,
  categoryType?: CategoryType,
  displayType?: DisplayType
}

export const defaultChooseInfo = {
  siteType: undefined,
  domainType: undefined,
  categoryType: undefined,
  displayType: undefined
}

export interface CertInfo {
  icon?: ReactNode
  brand: CertBrand
  type: CertType
  price: number
  unit: string
  link?: string
  chooseInfo?: ChooseInfo
}

export enum CertBrand {
  DigiCert = 'DigiCert',
  Geotrust = 'Geotrust',
  TrustAsia = 'TrustAsia'
}

enum CertType {
  Ev = 'ev',
  EvPro = 'ev_pro',
  Ov = 'ov',
  OvPro = 'ov_pro',
  Dv = 'dv',
  DvFree = 'dv_free',
  DvWildcard = 'dv_wildcard'
}

export enum CertShortName {
  TrustAsiaDVG5 = 'TrustAsiaDVG5',
  TrustAsiaDVSANsG5 = 'TrustAsiaDVSANsG5',
  TrustAsiaDVWildcardG5 = 'TrustAsiaDVWildcardG5',
  TrueBizIDEV = 'TrueBizIDEV',
  TrueBizIDWildcard = 'TrueBizIDWildcard',
  TrueBizID = 'TrueBizID',
  SecureSiteProEV = 'SecureSiteProEV',
  SecureSiteEV = 'SecureSiteEV',
  SecureSitePro = 'SecureSitePro',
  SecureSite = 'SecureSite',
  SecureSiteWildCard = 'SecureSiteWildCard',
  SecureSiteWildCardPro = 'SecureSiteWildCardPro',
  TrustAsiaOVWildcardD3 = 'TrustAsiaOVWildcardD3',
  TrustAsiaOVD3 = 'TrustAsiaOVD3',
  TrustAsiaOVSANsD3 = 'TrustAsiaOVSANsD3',
  TrustAsiaEVD3 = 'TrustAsiaEVD3',
  TrustAsiaEVSANsD3 = 'TrustAsiaEVSANsD3'
}

export const certTypeTipMap = {
  [CertType.Ov]: '对域名所有权和企业身份信息进行验证，浏览器上有 HTTPS 提示并有绿锁标记',
  [CertType.OvPro]: '对域名所有权和企业身份信息进行验证，浏览器上有 HTTPS 提示并有绿锁标记',
  [CertType.Ev]: '对域名所有权和企业身份信息进行验证，同时会审查第三方数据库如 114 查号台等，浏览器上有 HTTPS 提示并显示完整的单位名称',
  [CertType.EvPro]: '对域名所有权和企业身份信息进行验证，同时会审查第三方数据库如 114 查号台等，浏览器上有 HTTPS 提示并显示完整的单位名称',
  [CertType.DvWildcard]: '仅对域名所有权进行验证，浏览器上有 HTTPS 提示并有绿锁标记',
  [CertType.DvFree]: '仅对域名所有权进行验证，浏览器上有 HTTPS 提示并有绿锁标记',
  [CertType.Dv]: '仅对域名所有权进行验证，浏览器上有 HTTPS 提示并有绿锁标记'
}

export const certTypeTextMap = {
  [CertType.Ov]: 'OV',
  [CertType.OvPro]: 'OV Pro',
  [CertType.Ev]: 'EV',
  [CertType.EvPro]: 'EV Pro',
  [CertType.DvWildcard]: 'DV',
  [CertType.DvFree]: 'DV 免费',
  [CertType.Dv]: 'DV'
}

// todo 从接口获取
export const certList: CertInfo[] = [
  // 个人网站
  {
    brand: CertBrand.TrustAsia,
    type: CertType.Dv,
    price: 0,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrustAsiaDVG5,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Personal,
      domainType: DomainType.Normal,
      displayType: DisplayType.Hidden,
      categoryType: undefined
    }
  },
  {
    brand: CertBrand.TrustAsia,
    type: CertType.DvWildcard,
    price: 1699,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrustAsiaDVWildcardG5,
      wildcardLimit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Personal,
      domainType: DomainType.Wildcard,
      displayType: DisplayType.Hidden,
      categoryType: undefined
    }
  },
  // 金融企业网站
  {
    brand: CertBrand.DigiCert,
    type: CertType.EvPro,
    price: 9487.5,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteProEV,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Finance
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.EvPro,
    price: 18975,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteProEV,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Finance
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.OvPro,
    price: 51000,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteWildCardPro,
      wildcardLimit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Wildcard,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Finance
    }
  },
  // 医疗企业网站
  {
    brand: CertBrand.DigiCert,
    type: CertType.OvPro,
    price: 5355,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSitePro,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Medicine
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ev,
    price: 5565,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteEV,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Medicine
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.OvPro,
    price: 10710,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSitePro,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Medicine
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ev,
    price: 11130,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteEV,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Medicine
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.OvPro,
    price: 51000,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteWildCardPro,
      wildcardLimit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Wildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Medicine
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.OvPro,
    price: 58310,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSitePro,
      wildcardLimit: 1,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.MultipleWildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Medicine
    }
  },
  // it企业网站
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ov,
    price: 3637.5,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSite,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.IT
    }
  },
  {
    brand: CertBrand.TrustAsia,
    type: CertType.Ev,
    price: 6650,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrustAsiaEVD3,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Show,
      categoryType: CategoryType.IT
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ov,
    price: 7275,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSite,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.IT
    }
  },
  {
    brand: CertBrand.TrustAsia,
    type: CertType.Ev,
    price: 9100,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrustAsiaEVSANsD3,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Show,
      categoryType: CategoryType.IT
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ov,
    price: 28500,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteWildCard,
      wildcardLimit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Wildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.IT
    }
  },
  {
    brand: CertBrand.DigiCert,
    type: CertType.Ov,
    price: 35775,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.SecureSiteWildCard,
      wildcardLimit: 1,
      limit: 2,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.MultipleWildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.IT
    }
  },
  // 其他行业企业网站
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ov,
    price: 1995,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizID,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Other
    }
  },
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ev,
    price: 3637.5,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizIDEV,
      limit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Normal,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Other
    }
  },
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ov,
    price: 3815,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizID,
      limit: 5,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Other
    }
  },
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ev,
    price: 7237.5,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizIDEV,
      limit: 5,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Multiple,
      displayType: DisplayType.Show,
      categoryType: CategoryType.Other
    }
  },
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ov,
    price: 4795,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizIDWildcard,
      wildcardLimit: 1,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.Wildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Other
    }
  },
  {
    brand: CertBrand.Geotrust,
    type: CertType.Ov,
    price: 8610,
    unit: '元/年',
    link: formatCertLink({
      shortName: CertShortName.TrueBizID,
      wildcardLimit: 1,
      limit: 5,
      years: 1
    }),
    chooseInfo: {
      siteType: SiteType.Enterprise,
      domainType: DomainType.MultipleWildcard,
      displayType: DisplayType.Hidden,
      categoryType: CategoryType.Other
    }
  }
]

interface CertLinkParam {
  shortName: CertShortName
  limit?: number
  wildcardLimit?: number
  years?: number
}

export function formatCertLink(params: CertLinkParam) {
  const certLinkUrl = 'https://portal.qiniu.com/certificate/apply'
  return urlFor(certLinkUrl, params as unknown as UrlParams)
}

export const certForCompanySite = {
  brand: CertBrand.DigiCert,
  type: CertType.Ov,
  link: formatCertLink({
    shortName: CertShortName.SecureSite,
    limit: 1,
    years: 1
  }),
  price: 3637.5,
  unit: '元/年'
}

export const certForCompanyApp = {
  brand: CertBrand.Geotrust,
  type: CertType.Ov,
  link: formatCertLink({
    shortName: CertShortName.TrueBizID,
    limit: 1,
    years: 1
  }),
  price: 1995,
  unit: '元/年'
}

export const certForGov = {
  brand: CertBrand.DigiCert,
  type: CertType.EvPro,
  link: formatCertLink({
    shortName: CertShortName.SecureSiteProEV,
    limit: 1,
    years: 1
  }),
  price: 9487.5,
  unit: '元/年'
}

export const certForPay = {
  brand: CertBrand.DigiCert,
  type: CertType.Ev,
  link: formatCertLink({
    shortName: CertShortName.SecureSiteEV,
    limit: 1,
    years: 1
  }),
  price: 5565,
  unit: '元/年'
}

export const certForApi = {
  brand: CertBrand.TrustAsia,
  type: CertType.DvWildcard,
  link: formatCertLink({
    shortName: CertShortName.TrustAsiaDVWildcardG5,
    wildcardLimit: 1,
    years: 1
  }),
  price: 1699,
  unit: '元/年'
}
