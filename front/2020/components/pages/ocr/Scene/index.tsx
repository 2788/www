import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'

import style from './index.less'

const scenes = [
  {
    icon: <Icon1 />,
    title: '用户身份验证',
    content: '票证自动识别 OCR 能够帮助实现金融、在线教育、政务服务等场景下的用户证件上传的信息识别，提升用户体验，提高信息准确性。'
  },
  {
    icon: <Icon2 />,
    title: '商户身份核验',
    content: '票证自动识别 OCR 能够帮助实现电商、外卖、O2O、运输服务等场景下的商户身份认证、资质文件审核，以达到提高平台服务质量，规避恶意违规等业务风险等目的。'
  },
  {
    icon: <Icon3 />,
    title: '车主信息服务',
    content: '票证自动识别 OCR 能够帮助实现汽车保险理赔、二手车交易、车辆租借年审等场景下的用户快速录入车辆相关信息，提高业务人员的办公效率和服务准确性。'
  }
]
export default function OcrScene() {
  return (
    <Scene name="scene" title="适用场景">
      {
        scenes.map((scene, index) => (
          <ScenePanel name={`scene-tab-${index}`} title={scene.title} key={index} className={style.scenePanel}>
            <SceneBlock blockType="fixed" className={style.blockLeft}>
              {scene.icon}
            </SceneBlock>
            <SceneBlock shadow className={style.blockRight}>
              <div className={style.sceneContainer}>
                <p className={style.sceneTitle}>{scene.title}</p>
                <p className={style.sceneContent}>{scene.content}</p>
              </div>
            </SceneBlock>
          </ScenePanel>
        ))
      }
    </Scene>
  )
}
