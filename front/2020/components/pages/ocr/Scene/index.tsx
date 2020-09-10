import React from 'react'
import Scene, {
  Panel as ScenePanel,
  Block as SceneBlock
} from 'components/Product/Scene'

import user from './images/user.png'
import car from './images/car.png'
import merchant from './images/merchant.png'

import style from './index.less'

export default function OcrScene() {
  return (
    <Scene name="scene" title="应用场景" grey >
      <ScenePanel name="scene-tab-1" title="用户身份验证" className={style.scenePanel} verticalCenter>
        <SceneBlock blockType="fixed" className={style.blockLeft}>
          <img src={user} className={style.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>用户身份验证</p>
            <p className={style.sceneContent}>
              票证自动识别 OCR 能够帮助实现金融、在线教育、政务服务等场景下的用户证件上传的信息识别，提升用户体验，提高信息准确性。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-2" title="商户身份核验" className={style.scenePanel} verticalCenter>
        <SceneBlock blockType="fixed" className={style.blockLeft}>
          <img src={merchant} className={style.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>商户身份核验</p>
            <p className={style.sceneContent}>
              票证自动识别 OCR 能够帮助实现电商、外卖、O2O、运输服务等场景下的商户身份认证、资质文件审核，以达到提高平台服务质量，规避恶意违规等业务风险等目的。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

      <ScenePanel name="scene-tab-3" title="车主信息服务" className={style.scenePanel} verticalCenter>
        <SceneBlock blockType="fixed" className={style.blockLeft}>
          <img src={car} className={style.sceneImg} />
        </SceneBlock>
        <SceneBlock shadow className={style.blockRight}>
          <div className={style.sceneContainer}>
            <p className={style.sceneTitle}>车主信息服务</p>
            <p className={style.sceneContent}>
              票证自动识别 OCR 能够帮助实现汽车保险理赔、二手车交易、车辆租借年审等场景下的用户快速录入车辆相关信息，提高业务人员的办公效率和服务准确性。
            </p>
          </div>
        </SceneBlock>
      </ScenePanel>

    </Scene>
  )
}
