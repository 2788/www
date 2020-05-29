import React, { ReactNode, PropsWithChildren, useState } from 'react'
import QueueAnim from 'rc-queue-anim'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Menu, { SubMenu } from 'components/UI/Menu'
import Link from 'components/Link'
import {
  Card as UICard,
  Content as UIContent,
  Title as UITitle,
  Desc as UIDesc,
  Img as UIImg
} from 'components/UI/Card'

import styles from './style.less'

// 金融案例图片
import Finance1Icon from './images/finance/客户-凡普金科.png'
import Finance2Icon from './images/finance/客户-中国平安.png'
import Finance3Icon from './images/finance/客户-凤凰金融.png'
import Finance4Icon from './images/finance/客户-中信银行.png'
import Finance5Icon from './images/finance/客户-招商银行.png'
import Finance6Icon from './images/finance/客户-华泰证券.png'
import Finance7Icon from './images/finance/客户-中国太平.png'
import Finance8Icon from './images/finance/客户-安信证券.png'
// 广电案例图片
import RFT1Icon from './images/rft/客户-华数传媒.png'
import RFT2Icon from './images/rft/客户-中国电信.png'
import RFT3Icon from './images/rft/客户-吉林电视台.png'
import RFT4Icon from './images/rft/客户-江苏卫视.png'
import RFT5Icon from './images/rft/客户-芒果TV.png'
import RFT6Icon from './images/rft/客户-清博.png'
import RFT7Icon from './images/rft/客户-人民网.png'
import RFT8Icon from './images/rft/客户-浙报传媒.png'
import RFT9Icon from './images/rft/客户-中国移动.png'
import RFT10Icon from './images/rft/客户-搜狐视频.png'
// 制造案例图片
import Manufacture1Icon from './images/manufacture/客户-大疆.png'
import Manufacture2Icon from './images/manufacture/客户-爱立信.png'
import Manufacture3Icon from './images/manufacture/客户-蔚来.png'
import Manufacture4Icon from './images/manufacture/客户-传音.png'
import Manufacture5Icon from './images/manufacture/客户-萤石.png'
import Manufacture6Icon from './images/manufacture/客户-OPPO.png'
import Manufacture7Icon from './images/manufacture/客户-晶盛.png'
// 互联网案例图片
import Internet1Icon from './images/internet/客户-摩拜.png'
import Internet2Icon from './images/internet/客户-穷游.png'
import Internet3Icon from './images/internet/客户-Bilibili.png'
import Internet4Icon from './images/internet/客户-优信.png'
import Internet5Icon from './images/internet/客户-唱吧.png'
import Internet6Icon from './images/internet/客户-虎扑.png'
import Internet7Icon from './images/internet/客户-知乎.png'
import Internet8Icon from './images/internet/客户-蜻蜓.png'
import Internet9Icon from './images/internet/客户-faceu.png'
import Internet10Icon from './images/internet/客户-汽车之家.png'
// 物联网案例图片
import Iot1Icon from './images/iot/客户-步步高.png'
import Iot2Icon from './images/iot/客户-中兴.png'
import Iot3Icon from './images/iot/客户-华为.png'
import Iot4Icon from './images/iot/客户-平安好医生.png'
import Iot5Icon from './images/iot/客户-如新.png'
import Iot6Icon from './images/iot/客户-咕咚.png'
// 解决方案图标
import Solution1Icon from './images/智能视频云解决方案.svg'
import Solution2Icon from './images/监控视频解决方案.svg'
import Solution3Icon from './images/短视频解决方案.svg'
import Solution4Icon from './images/私有云解决方案.svg'
import Solution5Icon from './images/视频冷存储解决方案.svg'

interface CardProps {
  icon: ReactNode
  title: string
  href: string
}

export function Card({ icon, title, href, children }: PropsWithChildren<CardProps>) {
  return (
    <UICard className={styles.card}>
      <Link href={href} >
        {icon}
        <UIContent className={styles.content}>
          <UITitle className={styles.title}>{title}</UITitle>
          <UIDesc className={styles.desc}>{children}</UIDesc>
        </UIContent>
      </Link>
    </UICard>
  )
}

interface TitleProps {
  text: string
  en: string
}

export function Title({ text, en }: TitleProps) {
  return (
    <div className={styles.title}>
      {text}
      <span className={styles.en}>{en}</span>
    </div>
  )
}

interface PageNoProps {
  idx: number
  total: number
}

export function PageNo({ idx, total }: PageNoProps) {
  if (idx < 1 || total < 1) {
    throw new Error('PageNo 组件中的 idx 和 total 属性不能小于 1')
  }
  return (
    <div className={styles.pageNo}>
      {idx < 10 ? `0${idx}` : idx}/<span className={styles.total}>{total < 10 ? `0${total}` : total}</span>
    </div>
  )
}

interface PaneProps {
  title?: ReactNode
  desc: ReactNode
  active?: boolean
  pageNo?: ReactNode
  cards?: ReactNode[]
  footer?: ReactNode[]
}

export function Pane({ title, desc, active, pageNo, cards, footer }: PaneProps) {
  return (
    <div className={styles.pane}>
      <div className={styles.paneContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
        {pageNo}
      </div>
      <div className={styles.right}>
        <QueueAnim type={['bottom', 'top']}>
          {active ? cards : null}
        </QueueAnim>
      </div>
      <div className={styles.footer}>
        <QueueAnim type={['bottom', 'top']} >
          {active ? footer : null}
        </QueueAnim>
      </div>
    </div>
  )
}

function PaneForMobile({ desc, cards, footer }: PaneProps) {
  return (
    <div className={styles.mobilePane}>
      <p className={styles.desc}>{desc}</p>
      <div className={styles.cards}>{cards}</div>
      <div className={styles.footer}>{footer}</div>
    </div>
  )
}

function SolutionsForMobile() {
  return (
    <Menu mode="inline">
      <SubMenu title="金融">
        <PaneForMobile
          desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。"
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Finance1Icon} />,
            <UIImg key="2" className={styles.case} src={Finance2Icon} />,
            <UIImg key="3" className={styles.case} src={Finance3Icon} />,
            <UIImg key="4" className={styles.case} src={Finance4Icon} />,
            <UIImg key="5" className={styles.case} src={Finance5Icon} />,
            <UIImg key="6" className={styles.case} src={Finance6Icon} />,
            <UIImg key="7" className={styles.case} src={Finance7Icon} />,
            <UIImg key="8" className={styles.case} src={Finance8Icon} />
          ]}
        />
      </SubMenu>
      <SubMenu title="广电">
        <PaneForMobile
          desc="凭借七牛在云服务领域的技术积累和服务运营经验，结合存储、分发、处理、内容识别、大数据分析等能力，为广电行业媒体融合转型新趋势提供支撑。"
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution5Icon className={styles.icon} />}
              title="视频冷存储解决方案页"
              href="/solutions/vcs"
            >
              专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={RFT1Icon} />,
            <UIImg key="2" className={styles.case} src={RFT2Icon} />,
            <UIImg key="3" className={styles.case} src={RFT3Icon} />,
            <UIImg key="4" className={styles.case} src={RFT4Icon} />,
            <UIImg key="5" className={styles.case} src={RFT5Icon} />,
            <UIImg key="6" className={styles.case} src={RFT6Icon} />,
            <UIImg key="7" className={styles.case} src={RFT7Icon} />,
            <UIImg key="8" className={styles.case} src={RFT8Icon} />,
            <UIImg key="9" className={styles.case} src={RFT9Icon} />,
            <UIImg key="10" className={styles.case} src={RFT10Icon} />
          ]}
        />
      </SubMenu>
      <SubMenu title="制造">
        <PaneForMobile
          desc="依托七牛在云、AI、大数据等领域的多年经验沉淀和技术优势，帮助制造行业客户转型升级，创新商业模式，数据驱动降本升效，提升客户核心竞争力。"
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Manufacture1Icon} />,
            <UIImg key="2" className={styles.case} src={Manufacture2Icon} />,
            <UIImg key="3" className={styles.case} src={Manufacture3Icon} />,
            <UIImg key="4" className={styles.case} src={Manufacture4Icon} />,
            <UIImg key="5" className={styles.case} src={Manufacture5Icon} />,
            <UIImg key="6" className={styles.case} src={Manufacture6Icon} />,
            <UIImg key="7" className={styles.case} src={Manufacture7Icon} />
          ]}
        />
      </SubMenu>
      <SubMenu title="互联网">
        <PaneForMobile
          desc="作为国内领先的企业级云服务商，持续为互联网公司提供一站式方案，缩短从想法到产品的距离，从容面对业务爆发增长，持续挖掘海量数据的无限价值。"
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution3Icon className={styles.icon} />}
              title="短视频存储解决方案页"
              href="/solutions/plsv"
            >
              集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案
            </Card>,
            <Card
              key="3"
              icon={<Solution5Icon className={styles.icon} />}
              title="视频冷存储解决方案页"
              href="/solutions/vcs"
            >
              专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Internet1Icon} />,
            <UIImg key="2" className={styles.case} src={Internet2Icon} />,
            <UIImg key="3" className={styles.case} src={Internet3Icon} />,
            <UIImg key="4" className={styles.case} src={Internet4Icon} />,
            <UIImg key="5" className={styles.case} src={Internet5Icon} />,
            <UIImg key="6" className={styles.case} src={Internet6Icon} />,
            <UIImg key="7" className={styles.case} src={Internet7Icon} />,
            <UIImg key="8" className={styles.case} src={Internet8Icon} />,
            <UIImg key="9" className={styles.case} src={Internet9Icon} />,
            <UIImg key="10" className={styles.case} src={Internet10Icon} />
          ]}
        />
      </SubMenu>
      <SubMenu title="物联网">
        <PaneForMobile
          desc="依托七牛在云、AI、大数据等领域的多年经验沉淀和技术优势，专门针对物联网行业优化，帮助客户迅速迭代扩展业务并为终端用户的极致体验保驾护航。"
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Iot1Icon} />,
            <UIImg key="2" className={styles.case} src={Iot2Icon} />,
            <UIImg key="3" className={styles.case} src={Iot3Icon} />,
            <UIImg key="4" className={styles.case} src={Iot4Icon} />,
            <UIImg key="5" className={styles.case} src={Iot5Icon} />,
            <UIImg key="6" className={styles.case} src={Iot6Icon} />
          ]}
        />
      </SubMenu>
    </Menu>
  )
}

function SolutionsForPc() {
  const [activeKey, setActiveKey] = useState('1')
  return (
    <Tabs theme="white" defaultValue="1" onChange={activeValue => setActiveKey(activeValue)}>
      <TabPane value="1" tab="金融">
        <Pane
          active={activeKey === '1'}
          title={<Title text="金融" en="Financial" />}
          desc="为银行、保险等业务提供量身定制的服务，合规安全、高性能、高可用。帮助金融客户重塑传统 IT 平台架构、科技创新、流程再造，洞察数据价值。"
          pageNo={<PageNo idx={1} total={5} />}
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Finance1Icon} />,
            <UIImg key="2" className={styles.case} src={Finance2Icon} />,
            <UIImg key="3" className={styles.case} src={Finance3Icon} />,
            <UIImg key="4" className={styles.case} src={Finance4Icon} />,
            <UIImg key="5" className={styles.case} src={Finance5Icon} />,
            <UIImg key="6" className={styles.case} src={Finance6Icon} />,
            <UIImg key="7" className={styles.case} src={Finance7Icon} />,
            <UIImg key="8" className={styles.case} src={Finance8Icon} />
          ]}
        />
      </TabPane>
      <TabPane value="2" tab="广电">
        <Pane
          active={activeKey === '2'}
          title={<Title text="广电" en="Media" />}
          desc="凭借七牛在云服务领域的技术积累和服务运营经验，结合存储、分发、处理、内容识别、大数据分析等能力，为广电行业媒体融合转型新趋势提供支撑。"
          pageNo={<PageNo idx={2} total={5} />}
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution5Icon className={styles.icon} />}
              title="视频冷存储解决方案页"
              href="/solutions/vcs"
            >
              专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={RFT1Icon} />,
            <UIImg key="2" className={styles.case} src={RFT2Icon} />,
            <UIImg key="3" className={styles.case} src={RFT3Icon} />,
            <UIImg key="4" className={styles.case} src={RFT4Icon} />,
            <UIImg key="5" className={styles.case} src={RFT5Icon} />,
            <UIImg key="6" className={styles.case} src={RFT6Icon} />,
            <UIImg key="7" className={styles.case} src={RFT7Icon} />,
            <UIImg key="8" className={styles.case} src={RFT8Icon} />,
            <UIImg key="9" className={styles.case} src={RFT9Icon} />,
            <UIImg key="10" className={styles.case} src={RFT10Icon} />
          ]}
        />
      </TabPane>
      <TabPane value="3" tab="制造">
        <Pane
          active={activeKey === '3'}
          title={<Title text="制造" en="Manufacture" />}
          desc="依托七牛在云、AI、大数据等领域的多年经验沉淀和技术优势，帮助制造行业客户转型升级，创新商业模式，数据驱动降本升效，提升客户核心竞争力。"
          pageNo={<PageNo idx={3} total={5} />}
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Manufacture1Icon} />,
            <UIImg key="2" className={styles.case} src={Manufacture2Icon} />,
            <UIImg key="3" className={styles.case} src={Manufacture3Icon} />,
            <UIImg key="4" className={styles.case} src={Manufacture4Icon} />,
            <UIImg key="5" className={styles.case} src={Manufacture5Icon} />,
            <UIImg key="6" className={styles.case} src={Manufacture6Icon} />,
            <UIImg key="7" className={styles.case} src={Manufacture7Icon} />
          ]}
        />
      </TabPane>
      <TabPane value="4" tab="互联网">
        <Pane
          active={activeKey === '4'}
          title={<Title text="互联网" en="Internet" />}
          desc="作为国内领先的企业级云服务商，持续为互联网公司提供一站式方案，缩短从想法到产品的距离，从容面对业务爆发增长，持续挖掘海量数据的无限价值。"
          pageNo={<PageNo idx={4} total={5} />}
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution3Icon className={styles.icon} />}
              title="短视频存储解决方案页"
              href="/solutions/plsv"
            >
              集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案
            </Card>,
            <Card
              key="3"
              icon={<Solution5Icon className={styles.icon} />}
              title="视频冷存储解决方案页"
              href="/solutions/vcs"
            >
              专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Internet1Icon} />,
            <UIImg key="2" className={styles.case} src={Internet2Icon} />,
            <UIImg key="3" className={styles.case} src={Internet3Icon} />,
            <UIImg key="4" className={styles.case} src={Internet4Icon} />,
            <UIImg key="5" className={styles.case} src={Internet5Icon} />,
            <UIImg key="6" className={styles.case} src={Internet6Icon} />,
            <UIImg key="7" className={styles.case} src={Internet7Icon} />,
            <UIImg key="8" className={styles.case} src={Internet8Icon} />,
            <UIImg key="9" className={styles.case} src={Internet9Icon} />,
            <UIImg key="10" className={styles.case} src={Internet10Icon} />
          ]}
        />
      </TabPane>
      <TabPane value="5" tab="物联网">
        <Pane
          active={activeKey === '5'}
          title={<Title text="物联网" en="Internet of Things" />}
          desc="依托七牛在云、AI、大数据等领域的多年经验沉淀和技术优势，专门针对物联网行业优化，帮助客户迅速迭代扩展业务并为终端用户的极致体验保驾护航。"
          pageNo={<PageNo idx={5} total={5} />}
          cards={[
            <Card
              key="1"
              icon={<Solution1Icon className={styles.icon} />}
              title="智能视频云解决方案页"
              href="/solutions/qavs"
            >
              集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案
            </Card>,
            <Card
              key="2"
              icon={<Solution4Icon className={styles.icon} />}
              title="私有云存储解决方案页"
              href="/solutions/kodoe"
            >
              为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型
            </Card>,
            <Card
              key="3"
              icon={<Solution2Icon className={styles.icon} />}
              title="监控视频边缘存储解决方案页"
              href="/solutions/ess"
            >
              满足监控视频及图片就近存储、加速传输、倍速播放等关键需求
            </Card>
          ]}
          footer={[
            <UIImg key="1" className={styles.case} src={Iot1Icon} />,
            <UIImg key="2" className={styles.case} src={Iot2Icon} />,
            <UIImg key="3" className={styles.case} src={Iot3Icon} />,
            <UIImg key="4" className={styles.case} src={Iot4Icon} />,
            <UIImg key="5" className={styles.case} src={Iot5Icon} />,
            <UIImg key="6" className={styles.case} src={Iot6Icon} />
          ]}
        />
      </TabPane>
    </Tabs>
  )
}

export default function Solutions() {
  const isMobile = useMobile()
  return (
    <Section
      grey
      rootClassName={styles.solutions}
      title={<span className={styles.sectionTitle}>丰富的行业场景解决方案</span>}
      style={{ padding: isMobile ? '0' : '16px 0' }}
    >
      {
        isMobile ? <SolutionsForMobile /> : <SolutionsForPc />
      }
    </Section>
  )
}
