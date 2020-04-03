/**
 * @file component Footer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: i18n & mobile & media query

import React from 'react'

import { Logo, WeChat, CommonIcon } from 'constants/resource'

import Nav from './Nav'
import * as styles from './style.m.less'

export interface IProps {
  //
}

function Entry() {
  return (
    <div className={styles.entry}>
      <a href="/" className={styles.logo}>
        <img alt="Qiniu logo" src={Logo.Blue} />
      </a>
      <div className={styles.qrCode}>
        <img alt="WeChat Official Account QrCode" src={WeChat.OfficialAccountQrCode} />
      </div>
      <p className={styles.qrCodeTitle}>关注七牛云公众号</p>
      <div className={styles.sns}>
        <a className={styles.github} href="https://github.com/qiniu" target="_blank">
          <img alt="github entry" src={CommonIcon.Github} />
        </a>
        <a className={styles.weibo} href="http://weibo.com/qiniutek" target="_blank">
          <img alt="weibo entry" src={CommonIcon.Weibo} />
        </a>
      </div>
    </div>
  )
}

function Info() {
  return (
    <div className={styles.info}>
      <div className={styles.links}>
        <span>© {new Date().getFullYear()} 七牛云</span>
        <span className={styles.link}><a href="https://www.qiniu.com/user-agreement">用户协议</a></span>
        <span className={styles.link}><a href="https://www.qiniu.com/privacy-right">隐私权政策</a></span>
        <span className={styles.link}><a href="https://status.qiniu.com/" target="_blank">服务状态</a></span>
      </div>
    </div>
  )
}

export default function Header(_props: IProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <Nav />
        <Entry />
      </div>
      <Info />
    </footer>
  )
}
