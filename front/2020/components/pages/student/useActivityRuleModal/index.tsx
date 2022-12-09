/**
 * @file 校园开发者成长计划页面 - 活动规则
 */

import React, { PropsWithChildren, useCallback, useState } from 'react'
import { BaseModal } from 'components/UI/Modal'
import { useGlobalModal } from 'hooks/scroll'

import IconClose from './close.svg'
import styles from './style.less'

export default function useActivityRuleModal() {
  const [visible, setVisible] = useState(false)

  useGlobalModal(visible)

  const showModal = useCallback(() => { setVisible(true) }, [])
  const hideModal = useCallback(() => { setVisible(false) }, [])

  const activityRuleView = (
    <BaseModal mobileMode="slideUp" visible={visible} onCancel={hideModal} modalClassName={styles.wrapper}>
      <div title="关闭" className={styles.closeBtn} onClick={hideModal}>
        <IconClose />
      </div>

      <h1 className={styles.title}>活动细则</h1>

      <ul className={styles.content}>
        <MySection>
          <h3>活动对象</h3>
          <MyContent>
            完成七牛云注册及学生认证，历史上未有消费的用户。
          </MyContent>
        </MySection>

        <MySection>
          <h3>活动说明</h3>
          <MyContent>
            <ol>
              <li>1、本次活动区域为中国大陆地区，完成学生认证即可领用专属订单抵用券，抵用券将由系统自动发放至认证账户，用户可在商城页面下单使用。</li>
              <li>2、本活动可免费领取的产品额度以页面展示为准。</li>
              <li>3、如您在活动或使用过程中有任何疑问，请点击此处提交工单或发送邮件至 marketing@qiniu.com。</li>
              <li>4、为保证活动的公平公正，七牛云有权对恶意刷抢活动资源，利用系统漏洞购买规定数量以外的商品，长期资源闲置，利用资源从事违法违规行为的用户收回云资源。</li>
              <li>5、所有参加本活动的用户，均视为认可并同意遵守《七牛云用户协议》。</li>
            </ol>
            活动最终解释权在法律允许范围内归七牛云所有 。
          </MyContent>
        </MySection>

        <MySection>
          <h3>注释</h3>
          <MyContent>
            <ol>
              <li>
                1、合流转推通用资源包，可用于抵扣直播连麦合流纯音频、直播连麦合流普清、直播连麦合流高清、直播连麦合流超清，
                抵扣系数为 1:5.63:12.5:37.5。如实际使用直播连麦合流普清 100 分钟，相当于抵扣本资源包 563 分钟。
              </li>
              <li>
                2、单路转推通用资源包支持抵扣实时音视频单路转推纯音频、普清、高清、超清，
                抵扣系数为 1:1:1:1。如实际使用实时音视频单路转推纯音频 100 分钟，相当于抵扣本资源包 100 分钟。
              </li>
            </ol>
          </MyContent>
        </MySection>
      </ul>
    </BaseModal>
  )

  return {
    showModal,
    activityRuleView
  }
}

function MySection({ children }: PropsWithChildren<{}>) {
  return <li className={styles.section}>{children}</li>
}

function MyContent({ children }: PropsWithChildren<{}>) {
  return <div className={styles.myContent}>{children}</div>
}
