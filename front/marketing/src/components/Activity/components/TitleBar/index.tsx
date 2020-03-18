/**
 * @file component TitleBar
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useEffect, forwardRef, Ref } from 'react'
import { observer } from 'mobx-react'
import Modal from 'react-icecream/lib/modal'

import { ComponentName, IComponentInfo } from 'apis/component'
import { IBaseProps } from '../..'

import * as styles from './style.m.less'

export interface IConfig {
  title: string // 标题内容，html str
  sub_title: string // 副标题内容，html str
  instruction?: string // 活动说明内容，html str
  title_style?: string // 标题样式，目前没用到（该字段为预留字段）
  background_to: string // 楼层标题组件背景色结束颜色
  background_from: string // 楼层标题组件背景色开始颜色
}

export interface IProps extends IBaseProps {
  info: IComponentInfo<ComponentName.TitleBar>
}

export default observer(forwardRef(function TitleBar({ info: { data } }: IProps, ref: Ref<any>) {
  const [mainElement, setMainElement] = useState() // 没用 useRef 是为了让 useEffect 能观察到
  const [modalVisible, setModalVisible] = useState(false)

  const { title, sub_title, title_style, instruction, background_from, background_to } = data

  function openModal() {
    setModalVisible(true)
  }

  function closeModal() {
    setModalVisible(false)
  }

  const modalView = (
    <Modal
      title={
        <h4 className={styles.title}>
          <span className={styles.titleMain} dangerouslySetInnerHTML={{ __html: title }}></span> - 活动说明
        </h4>
      }
      visible={modalVisible}
      onOk={closeModal}
      onCancel={closeModal}
      maskClosable={true}
      footer={null}
      className={styles.modal}
    >
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: instruction! }}></div>
    </Modal>
  )

  useEffect(() => {
    if (mainElement) {
      // HACK: inline style text
      const styleStr = `
        background-image: linear-gradient(${background_from}, ${background_to});
        ${title_style || ''}
      `
      mainElement.setAttribute('style', styleStr)
    }
  }, [mainElement])

  const mainView = (
    <div className={styles.main} ref={setMainElement}>
      <h3 className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></h3>
      <div className={styles.subTitle}>
        <span className={styles.subTitleMain} dangerouslySetInnerHTML={{ __html: sub_title }}></span>
        {/* TODO: 添加 & 检查埋点统计 */}
        {instruction && (
          <button className={styles.instructionEntry} onClick={openModal}>活动说明</button>
        )}
      </div>
    </div>
  )

  return (
    <div ref={ref}>
      {mainView}
      {modalView}
    </div>
  )
}))
