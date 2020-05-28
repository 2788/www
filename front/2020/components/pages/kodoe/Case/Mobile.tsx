/**
 * @file 私有云存储客户案例 Mobile 端 index.tsx
 * @description 包含私有云存储客户案例 Mobile 端
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

/* eslint-disable max-len */

import React, { useState } from 'react'

import Menu, { SubMenu } from 'components/UI/Menu'

import styles from './style.less'

export default function Mobile() {
  const [active, setActive] = useState<string | null>('1')

  function handleSubMenusChange(activeKey: string) {
    if (active === activeKey) {
      setActive(null)
      return
    }

    setActive(activeKey)
  }

  return (
    <Menu
      className={styles.mobile}
      mode="inline"
      level={-1}
      openKeys={active ? [active] : []}
    >
      <SubMenu
        key="1"
        title="人民网"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、海量存储瓶颈：传统方案无法满足日益增长的计算与高并发需求；</p>
              <p>2、数据安全问题：传统方案系统稳定性较差、数据保护能力不完善；</p>
              <p>3、集团运营需求：缺少建设供子公司与最终客户共享的一站式媒体云经验。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、稳定的分布式集群与双活技术，无需担心扩容问题，保障数据万无一失；</p>
              <p>2、基于七牛多年的对象存储运营经验，帮助企业构建完整的用户侧运营系统；</p>
              <p>3、精细化的大数据服务，帮助企业满足网信办对媒体云的各类运营监管要求；</p>
              <p>4、七牛完善的 SDK 生态，满足用户各类功能需求，帮助企业提供最佳用户体验。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、打破原有数据孤岛格局，节省系统调度资源，完善系统稳定性与数据保护能力；</p>
              <p>2、建设子公司与最终用户共享的一站式媒体云，构建了完整的用户侧运营系统；</p>
              <p>3、新业务上线时间缩短 85%，新闻制作及时效性提升 60%，媒体资产回迁效率提升 60%。</p>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="2"
        title="江苏卫视"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、变革迫在眉睫：原有形式已难以满足大众需求，需从技术层面改变电视生产的运营模式与管理机制；</p>
              <p>2、效率低下问题：手动管理与资源调整效率低下，制作与发布时间冗长，难以满足信息爆发的形势；</p>
              <p>3、数据信息孤岛：不同部门之间存在信息孤岛问题，没有统一高效的平台进行统一管理调配；</p>
              <p>4、粗旷运营模式：数据混乱，缺少统一标准，难以进行加工分析，严重影响数据化运营进程。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、建立云平台资源池，打破原有数据孤岛格局，提高资源利用率，节省系统调度资源；</p>
              <p>2、实现服务自动化，一键式部署资源配置，真正实现新业务分钟级上线；</p>
              <p>3、提供丰富的多媒体数据加工和处理功能，图片和音视频处理效率显著提成；</p>
              <p>4、与 Hadoop、Spark 等大数据处理平台无缝对接，为打造数据驱动业务模式提供有力支撑。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、高效制作：打通各平台的信息流通，随时挑选新闻素材、编辑加工内容、传输发布节目；</p>
              <p>2、实时交互：将云平台与全媒体演播室相结合形成全即时、全互动的立体传播格局；</p>
              <p>3、用户分析：对用户行为信息进行深度分析与挖掘，更深层次地理解客户行为和消费趋势。</p>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="3"
        title="中国移动"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、原有的开源存储系统集群规模越大稳定性越差，难以维持大体量的存储系统；</p>
              <p>2、原有系统无法满足现有业务对数据的快速写入、快速回收等关键需求；</p>
              <p>3、原有系统维护服务严重滞后，服务质量差，运营效率低下。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、可利用现有服务器 + 七牛私有云存储搭建高性能对象存储；</p>
              <p>2、搭建云平台后真正实现 PB 级在线扩容，满足客户长期容量要求；</p>
              <p>3、数据误删后的可实现快速回收机制，节省了总体拥有成本；</p>
              <p>4、多地实现数据就近落地，重要数据实现互备，保障数据高可用。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、七牛云企业服务团队与客户一起完成方案规划，并进行了充分的测试验证，最终采用了性能卓越、稳定经济的七牛私有云存储替换原有存储；</p>
              <p>2、针对监控场景中空间回收、快速扩容高等要求，七牛私有云存储能够提供更为成熟高效的解决方案。</p>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="4"
        title="海康萤石"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、传统存储、媒体服务器并立运行，系统瓶颈明显；</p>
              <p>2、原有存储技术可扩展性较差，难以满足视频数据爆炸的今日；</p>
              <p>3、传统专用存储设备成本较高，且不采用 EC 纠删码技术，可靠性较差；</p>
              <p>4、市场需求推动传统商业模式改革，革新技术占领市场高点。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、存储，媒体服务器分离部署，媒体服务器不再转发视频流，视频流直接落存储，消除系统瓶颈分布式对象存储支持扩展到 EB 级别，并采用 Scale-out 存储架构，可支持更多的摄像头路数；</p>
              <p>2、采用通用 x86 服务器，相对于传统专用存储设备成本降低；</p>
              <p>3、基于 EC 纠删码技术，降低存储成本同时提升可靠性；</p>
              <p>4、集中存储便于跨地域，时间，进行视频智能分析，公有云部署便于移动平台多种场景在线视频浏览；</p>
              <p>5、创新性提供边缘存储 & 边缘计算功能，实现监控视频去 SD 化、带宽利用率平均提升 30% 以上。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、在消除原有各类痛点的同时，降低原有存储设备成本，同时利用边缘存储与边缘计算技术提高带宽利用率。真正实现监控视频去 SD 化，解决了传统监控设备的 SD 或 NVR 空间有限，成本较高，读写寿命短，数据安全，无法保障且运维复杂等问题。厂商无需再担心底层关键技术，专心业务层拓展。</p>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="5"
        title="中国平安"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、访问困难：传统数据库无法满足上亿文件的查询需求，访问效率极低；</p>
              <p>2、扩容问题：原有存储无法满足爆炸式增长的线性透明扩容需求；</p>
              <p>3、成本高昂：传统存储方案投入成本极高，前期投入资金庞大；</p>
              <p>4、运维艰难：原有 GlusterFS 系统稳定性不佳，运维压力极大。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、提供 UDMP（非结构化数据管理平台），实现 10 亿级别的影像标签数据管理和”秒级”查询；</p>
              <p>2、业内领先的对象存储服务完美满足线性扩容需求，无需担心扩容问题；</p>
              <p>3、提供整体解决方案，每年为企业节省数百万存储成本；</p>
              <p>4、提供高可靠远程代维服务，帮助企业解决运维困难问题；</p>
              <p>5、引入鉴黄、OCR 等视觉服务，保障数据安全，满足各类监管需求。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、提供支持百亿级业务属性存取的数据管理平台（UDMP），确保了平安银行各业务系统平滑在线迁移，实现了行内影像数据的统一存储、处理和管理，解决了业务系统之间数据实时共享和快速访问响应。</p>
            </div>
          </div>
        </div>
      </SubMenu>
      <SubMenu
        key="6"
        title="凤凰金融"
        mode="inline"
        onTitleClick={({ key }: any) => {
          handleSubMenusChange(key)
        }}
      >
        <div className={styles.panel}>
          <div className={styles.group}>
            <div className={styles.item}>
              <div className={styles.itemTitle}>客户痛点</div>
              <p>1、场景复杂：双录系统诉求复杂，需要现场、远程、自主等业务模式；</p>
              <p>2、业务效率低：在符合监管要求等同时，提高业务办理效率和质检效率；</p>
              <p>3、投资大：采用自建双录系统，不仅投资大周期长，也无法满足业务快速上线。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>解决方案</div>
              <p>1、实时音视频云：支持多种双录模式（远程双录，自助双录），支持多种风险揭示方式（图片、视频、语音、PPT ），后台管理系统，支持检索、回放、审核；</p>
              <p>2、监管需求与易用性：实时叠加水印、时间戳、防止篡改 朗读声明及电子签名，留痕符合监管要求 开放 SDK ，可与客户 APP 快速集成。</p>
            </div>
            <div className={styles.item}>
              <div className={styles.itemTitle}>实现价值</div>
              <p>1、AI 赋能金融场景、人脸识别及 OCR 技术；</p>
              <p>2、实时监控不合规信息及时预警；</p>
              <p>3、加强风控，符合监管要求；</p>
              <p>4、提升业务效率，降低运营成本。</p>
            </div>
          </div>
        </div>
      </SubMenu>
    </Menu>
  )
}
