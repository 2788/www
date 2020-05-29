/**
 * @file “精选案例”模块
 */

/* eslint-disable max-len */

import React, { PropsWithChildren } from 'react'
import Tabs, { TabPane } from 'components/UI/Tabs'
import { Product } from 'constants/products'
import ProductTag from 'components/Product/Tag'
import Link from 'components/Link'

import logoDanlan from './logos/danlan.png'
import logoJinsheng from './logos/jinsheng.png'
import logoKuaikan from './logos/kuaikan.png'
import logoLiulishuo from './logos/liulishuo.png'
import logoPinganhaoyisheng from './logos/pinganhaoyisheng.png'
import logoShimowendang from './logos/shimowendang.png'
import logoYinjifuli from './logos/yinjifuli.png'
import logoZhongguowang from './logos/zhongguowang.png'

import style from './style.less'

export default function Selected() {
  return (
    <Tabs defaultValue="1">
      <TabPane value="1" tab="互联网">
        <Case
          title="英语流利说"
          url="https://blog.qiniu.io/archives/8835"
          logo={logoLiulishuo}
          products={[Product.Kodo, Product.Cdn]}
        >
          “英语流利说”是一款融合创新口语教学理念和尖端语音评估技术的英语口语学习应用，是中国知名的“AI + 教育”公司，为个人、企业提供专业英语学习解决方案。
        </Case>
        <Case
          title="快看漫画"
          url="https://blog.qiniu.io/archives/8891"
          logo={logoKuaikan}
          products={[Product.Plsv]}
        >
          “快看漫画是是引领行业的新生代漫画阅读平台和兴趣社区。它为用户提供优质原创漫画内容,营造良好的二次元社区氛围,成为年轻一代的潮流文化阵地。
        </Case>
        <Case
          title="银基富力"
          url="https://blog.qiniu.io/archives/8894"
          logo={logoYinjifuli}
          products={[Product.Express]}
        >
          上海银基富力信息技术有限公司是一家新兴的创业企业，致力于大数据，人工智能领域的创新应用和研发，专注在数据中心领域的智能运维业务。
        </Case>
        <Case
          title="石墨文档"
          url="https://blog.qiniu.io/archives/8895"
          logo={logoShimowendang}
          products={[Product.Kodo, Product.Cdn, Product.Dora]}
        >
          石墨文档是中国第一款支持云端实时协作的企业办公服务软件，可以实现多人同时在同一文档及表格上进行编辑和实时讨论，同步响应速度达到毫秒级。在赋予产品高协作性功能的基础上，石墨文档还是一款具有中国式美感的科技产品，2015 年获得极客公园评选的最佳互联网创新产品 50 强。在 SaaS 类协作云文档国内市场占有规模排名第一。
        </Case>
        <Case
          title="淡蓝"
          url="https://mp.weixin.qq.com/s?__biz=MjM5NzAwNDI4Mg==&mid=2652194136&idx=1&sn=74115a38ca1caa2694f4f43aad475c22&chksm=bd0173cd8a76fadbb07b1b5722a9b920fcdca254aa3e08d627e50ad44eaf5444efdb62361fe0#rd"
          logo={logoDanlan}
          products={[Product.Cdn, Product.Dora]}
        >
          淡蓝网是华人地区有影响力的同志公益网站，秉承「人文、健康、公益、娱乐、互动」的办站宗旨， 倡导健康的同志生活，关注人群自我认同， 提供最前沿、最时尚、最权威的资讯与娱乐服务，引导同志生活新理念。
        </Case>
      </TabPane>
      <TabPane value="2" tab="医疗">
        <Case
          title="平安好医生"
          url="https://blog.qiniu.io/archives/8760"
          logo={logoPinganhaoyisheng}
          products={[Product.Plsv]}
        >
          平安好医生是中国一站式医疗健康生态平台，致力于让每个家庭拥有一个家庭医生；让每人拥有一份电子健康档案；让每人拥有一个健康管理计划。目前，平安好医生已经形成家庭医生服务、消费型医疗、健康商城、健康管理及健康互动四大业务板块。
        </Case>
      </TabPane>
      <TabPane value="3" tab="传媒">
        <Case
          title="中国网"
          url="https://blog.qiniu.io/archives/8864"
          logo={logoZhongguowang}
          products={[Product.Kodo, Product.Cdn, Product.Pili]}
        >
          中国网是国务院新闻办公室领导，中国外文出版发行事业局管理的国家重点新闻网站。自 2000 年成立以来，陆续实现了用中、英、法、西、德、日、俄、阿、韩、世界语 10 个语种 11 个文版，24 小时对外发布信息，访问用户覆盖全球 200 多个国家和地区，成为中国进行国际传播、信息交流的重要窗口。
        </Case>
      </TabPane>
      <TabPane value="4" tab="智能硬件">
        <Case
          title="晶盛机电"
          url="https://blog.qiniu.io/archives/8814"
          logo={logoJinsheng}
          products={[Product.Express]}
        >
          浙江晶盛机电股份有限公司创建于 2006 年 12 月，是一家以「发展绿色智能高科技制造产业」为使命的高端半导体装备和 LED 衬底材料制造的高新技术企业。拥有工业 4.0 方向的省级重点研究院、省级晶体装备研究院等研究平台、博士后工作站，是国内光伏产业链的装备龙头企业。
        </Case>
      </TabPane>
    </Tabs>
  )
}

type CaseProps = PropsWithChildren<{
  title: string
  url: string
  logo: string
  products: Product[]
}>

function Case({ title, children, url, logo, products }: CaseProps) {
  const productsView = products.map(
    product => <ProductTag key={product} product={product} />
  )
  return (
    <section className={style.case}>
      <img src={logo} alt={title} className={style.logo} />
      <h5 className={style.title}>
        <Link href={url}>{title}</Link>
      </h5>
      <div className={style.desc}>{children}</div>
      <div className={style.footer}>
        使用产品：{productsView}
      </div>
    </section>
  )
}
