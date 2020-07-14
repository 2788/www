/**
 * @file 人脸核验产品应用场景
 */

import React from 'react'
import Scene, { Panel, Block } from 'components/Product/Scene'
import Img1 from './01.svg'
import Img2 from './02.svg'
import Img3 from './03.svg'
import Img4 from './04.svg'
import Img5 from './05.svg'
import style from './style.less'

export default function Scenes() {
  return (
    <Scene name="scenes" title="使用场景">
      <Panel name="1" title="金融">
        <Block className={style.imgBlock}><Img1 /></Block>
        <Block className={style.detailBlock} shadow>
          <h5 className={style.title}>金融</h5>
          <p className={style.desc}>客户在离柜场景下进行操作（例如：申请理财账号等），可以自助上传身份信息，通过调用人脸核验服务核实身份。</p>
        </Block>
      </Panel>
      <Panel name="2" title="在线教育">
        <Block className={style.imgBlock}><Img2 /></Block>
        <Block className={style.detailBlock} shadow>
          <h5 className={style.title}>在线教育</h5>
          <p className={style.desc}>在线教育需要对老师、学生在注册、登录、播前、播中、考试等环节中进行身份核实，可以通过人脸核验服务确保教学双方真实可信。</p>
        </Block>
      </Panel>
      <Panel name="3" title="直播">
        <Block className={style.imgBlock}><Img3 /></Block>
        <Block className={style.detailBlock} shadow>
          <h5 className={style.title}>直播</h5>
          <p className={style.desc}>遵守“网络主播实名制”监管要求，在播前 / 播中（注册 / 登录）等环节对其身份进行核实。</p>
        </Block>
      </Panel>
      <Panel name="4" title="在线政务">
        <Block className={style.imgBlock}><Img4 /></Block>
        <Block className={style.detailBlock} shadow>
          <h5 className={style.title}>在线政务</h5>
          <p className={style.desc}>各地区政务办事处升级便民服务，陆续开展线上业务办理服务，用户可以通过各政务办事处的网页或微信公众号，通过七牛云的人脸核验服务进行实名验证注册，远程办理业务。</p>
        </Block>
      </Panel>
      <Panel name="5" title="网约车">
        <Block className={style.imgBlock}><Img5 /></Block>
        <Block className={style.detailBlock} shadow>
          <h5 className={style.title}>网约车</h5>
          <p className={style.desc}>司机实名登记，核实身份，保障乘客安全。</p>
        </Block>
      </Panel>
    </Scene>
  )
}
