import React, { useMemo, useState } from 'react'
import cls from 'classnames'
import { debounce } from 'lodash'
import QRCode from 'qrcode.react'

import { useHoverHandlers } from 'hooks/hover'
import { useBtns } from 'hooks/product-btn'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'
import { useWechatConsultModal } from 'components/WechatConsultModal'

import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'

import style from './index.less'

export default function APaasScene() {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const [qrCodePanelVisible, setQrCodePanelVisible] = useState<boolean | null>(null)
  const handleQrCodeHover = useMemo(() => debounce(setQrCodePanelVisible, 100), [])
  const hoverHandlers = useHoverHandlers(handleQrCodeHover)

  const qrCodePanelView = (qrCodePanelVisible != null) && (
    <div className={cls(style.qrCodePanel, !qrCodePanelVisible && style.hidden)} {...hoverHandlers}>
      <div className={style.itemWrapper}>
        <div className={style.itemTitle}>iOS Demo体验</div>
        <div className={style.qrCodeWrapper}>
          <QRCode
            className={style.qrCode}
            renderAs="svg"
            fgColor="#333"
            value="http://fir.qnsdk.com/cube"
          />
        </div>
      </div>
      <div className={style.itemWrapper}>
        <div className={style.itemTitle}>Android Demo体验</div>
        <div className={style.qrCodeWrapper}>
          <QRCode
            className={style.qrCode}
            renderAs="svg"
            fgColor="#333"
            value="http://fir.qnsdk.com/s6py"
          />
        </div>
      </div>
    </div>
  )

  const scenes = [
    {
      url: image1,
      title: '泛娱乐互动直播',
      desc: '面向互动直播场景，高度抽象音视频通话、实时消息、直播间管理、PK/连麦等互动直播通用能力。',
      btn: useBtns(
        { onClick: hoverHandlers!.onMouseEnter, children: '扫码体验', pcOnly: true, type: 'primary', onMouseEnter: hoverHandlers?.onMouseEnter, onMouseLeave: hoverHandlers?.onMouseLeave },
        { href: 'http://fir.qnsdk.com/cube', children: 'iOS Demo体验', mobileOnly: true },
        { href: 'http://fir.qnsdk.com/s6py', children: 'Android Demo体验', mobileOnly: true },
        { href: 'https://developer.qiniu.com/lowcode', children: '接入文档', type: 'hollow' }
      ),
      value: [
        ['低接入门槛', '最快10行代码接入，快速上线自有互动直播应用。'],
        ['高可靠高并发', '支持百万并发直播推流，千万用户并发观看的稳定流畅直播服务。'],
        ['安全管控', '支持直播间禁言、消息审核、安全审核等，保障直播内容的安全播出。'],
        ['美颜特效', '提供美颜和特效功能，满足直播中画面美化需求。'],
        ['保障数据安全', '服务端开源，企业可自主选择数据服务器和数据库。']
      ]
    },
    {
      url: image2,
      title: '电商直播带货',
      desc: (<>帮助企业快速完成在自有APP、小程序、网站等平台的私域电商直播间的搭建<br />低成本验证电商直播商业模式。</>),
      btn: useBtns(
        { onClick: hoverHandlers!.onMouseEnter, children: '扫码体验', pcOnly: true, type: 'primary', onMouseEnter: hoverHandlers?.onMouseEnter, onMouseLeave: hoverHandlers?.onMouseLeave },
        { href: 'http://fir.qnsdk.com/cube', children: 'iOS Demo体验', mobileOnly: true },
        { href: 'http://fir.qnsdk.com/s6py', children: 'Android Demo体验', mobileOnly: true },
        { href: 'https://developer.qiniu.com/lowcode', children: '接入文档', type: 'hollow' }
      ),
      value: [
        ['低接入门槛', '最快10行代码接入，快速上线自有直播带货平台。'],
        ['私域流量沉淀', '用户流量得以沉淀在自有平台，降低流量成本，促进流量裂变。'],
        ['精细化运营', '与内部系统打通，提供多维度数据以进行用户的精细化运营。'],
        ['保障数据安全', '服务端开源，企业可自主选择数据服务器和数据库。']
      ]
    },
    {
      url: image3,
      title: '语聊房',
      desc: '语聊房作为语音社交的主打产品，指在在一个语音房间中，有一个房主，一个或者多个连麦者外加观众。',
      btn: useBtns(
        { onClick: hoverHandlers!.onMouseEnter, children: '扫码体验', pcOnly: true, type: 'primary', onMouseEnter: hoverHandlers?.onMouseEnter, onMouseLeave: hoverHandlers?.onMouseLeave },
        { href: 'http://fir.qnsdk.com/cube', children: 'iOS Demo体验', mobileOnly: true },
        { href: 'http://fir.qnsdk.com/s6py', children: 'Android Demo体验', mobileOnly: true },
        { onClick: showWechatConsultModal, children: '咨询客服接入', className: style.btn, type: 'hollow' }
      ),
      value: [
        ['低接入门槛', '开源demo，快速上线自有语聊房方案。'],
        ['玩法多样', '支持语音聊天室、语音电台房、互动游戏语聊房、相亲语聊房。'],
        ['高可靠高并发', '支持百万并发直播推流，千万用户并发观看的稳定流畅直播服务。'],
        ['安全管控', '支持直播间禁言、消息审核、安全审核等，保障直播内容的安全播出。']
      ]
    },
    {
      url: image4,
      title: '在线教育',
      desc: '覆盖大班课、小班课、一对一、公开课、在线监考，支持企业在自有网站、APP快速完成在线课堂直播应用和在线监考平台的搭建。',
      btn: useBtns(
        { href: 'https://niucube-class.qiniu.com/login', children: '在线课堂 demo', className: style.btn, type: 'primary' },
        { href: 'https://niucube-exam.qiniu.com/', children: '在线监考 demo', className: style.btn, type: 'primary' },
        { onClick: showWechatConsultModal, children: '咨询客服接入', className: style.btn, type: 'hollow' }
      ),
      value: [
        ['低接入门槛', '开源demo，快速上线自有在线课堂直播应用或在线监考应用。'],
        ['精细化数据分析', '与内部系统打通，可结合多方数据进行多维度分析。'],
        ['实时互动体验', '实现毫秒级延迟，保障老师和学生的实时交流。']
      ]
    }
  ]

  return (
    <Scene name="scene" title="应用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} className={style.scenePanel} key={index}>
            <SceneBlock blockType="fixed">
              <img src={scene.url} alt={scene.title} className={style.sceneIcon} />
            </SceneBlock>
            <SceneBlock className={style.blockRight}>
              <div className={style.sceneContainer}>
                <h3 className={style.sceneTitle}>场景说明</h3>
                <ul className={style.list}>
                  <li className={style.descItem}>
                    <p>{scene.desc}</p>
                  </li>
                </ul>
                <div className={style.sceneBtnPanelWrapper}>
                  {qrCodePanelView}
                  <div className={style.sceneBtnWrapper}>
                    {scene.btn.banner}
                  </div>
                </div>
                <h3 className={style.sceneTitle}>场景价值</h3>
                <ul className={style.list}>
                  {
                    scene.value.map((item, i) => (
                      <li className={style.item} key={i}>
                        <span className={style.title}>{item[0]}</span>
                        <p className={style.content}>{item[1]}</p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
