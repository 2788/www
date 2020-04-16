/**
 * @file component Footer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// TODO: i18n & mobile & media query

import React from 'react'

import { Logo, WeChat, CommonIcon, FooterExtraIcon } from 'constants/resource'

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

function IconLinks() {
  return (
    <div className={styles.iconLinks}>
      <a
        href="http://www.shjbzx.cn/"
        title="违法和不良信息举报中心"
        className={styles.shjbzx}
        style={{ backgroundImage: `url(${FooterExtraIcon.Shjbzx})` }}
        target="_blank"
        rel="noopener"
      ></a>
      <a
        href="https://www.cncf.io/"
        title="cncf"
        className={styles.cncf}
        style={{ backgroundImage: `url(${FooterExtraIcon.Cncf})` }}
        target="_blank"
        rel="noopener"
      ></a>
      <a
        href="#"
        title="iso"
        className={styles.iso}
        style={{ backgroundImage: `url(${FooterExtraIcon.Iso})` }}
        target="_blank"
        rel="noopener"
      ></a>
      <a
        href="#"
        title="CMMI3 国际认证企业"
        className={styles.cmni3}
        style={{ backgroundImage: `url(${FooterExtraIcon.Cmni3})` }}
        target="_blank"
        rel="noopener"
      ></a>
      <a
        href="https://www.kexinyun.org.cn/"
        title="可信云"
        className={styles.kexinyun}
        style={{ backgroundImage: `url(${FooterExtraIcon.Kexinyun})` }}
        target="_blank"
        rel="noopener"
      ></a>
    </div>
  )
}

function Info() {
  return (
    <div className={styles.mainInfo}>
      <section>
        <span>© {new Date().getFullYear()} 七牛云</span>
        <span className={styles.link}><a href="https://www.qiniu.com/user-agreement">用户协议</a></span>
        <span className={styles.link}><a href="https://www.qiniu.com/privacy-right">隐私权政策</a></span>
        <span className={styles.link}><a href="https://status.qiniu.com/" target="_blank">服务状态</a></span>
      </section>
      <section>
        24 小时互联网违法和不良信息举报：
        举报电话：<a href="tel:021-20703838">021-20703838</a>，
        举报邮箱：<a href="mailto:jubao@qiniu.com">jubao@qiniu.com</a>
      </section>
      <section>
        <a href="https://newsxmwb.xinmin.cn/special/mljbzsjs/index.html" target="_blank">『网络举报知识竞赛』</a>
      </section>
      <section>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502000961" target="_blank">
          <span className={styles.aq} style={{ backgroundImage: `url(${CommonIcon.Aq})` }}></span>
          沪公网安备 31011502000961 号
        </a>
        <a href="http://www.beian.miit.gov.cn/" target="_blank">
          <span className={styles.aq} style={{ backgroundImage: `url(${CommonIcon.Aq})` }}></span>
          沪 ICP 备 11037377 号-5
        </a>
      </section>
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
      <div className={styles.info}>
        <Info />
        <IconLinks />
      </div>
    </footer>
  )
}
