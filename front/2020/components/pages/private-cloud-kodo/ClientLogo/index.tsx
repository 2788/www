/**
 * @file 私有云存储客户 Logo 墙 index.tsx
 * @description 包含私有云存储客户 Logo 墙
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'

import styles from './style.less'

import ClientIconFinupURL from './client-icon-finup.png'
import ClientIconJiangsutvURL from './client-icon-jiangsutv.png'
import ClientIconPinganURL from './client-icon-pingan.png'
import ClientIconRenminwangURL from './client-icon-renminwang.png'
import ClientIconChinamobileURL from './client-icon-chinamobile.png'
import ClientIconCnpcURL from './client-icon-cnpc.png'
import ClientIconYingshiURL from './client-icon-yingshi.png'
import ClientIconEricssonURL from './client-icon-ericsson.png'

export default function PrivateCloudKodoClientLogo() {
  return (
    <CustomerCaseGroup name="client" title="他们都在用七牛" grey>
      <CustomerCase
        pic={(<img src={ClientIconFinupURL} className={styles.icon} title="凡普金科" alt="凡普金科" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconJiangsutvURL} className={styles.icon} title="江苏卫视" alt="江苏卫视" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconPinganURL} className={styles.icon} title="中国平安" alt="中国平安" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconRenminwangURL} className={styles.icon} title="人民网" alt="人民网" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconChinamobileURL} className={styles.icon} title="中国移动" alt="中国移动" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconCnpcURL} className={styles.icon} title="中国石油" alt="中国石油" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconYingshiURL} className={styles.icon} title="萤石" alt="萤石" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconEricssonURL} className={styles.icon} title="ERICSSON" alt="ERICSSON" />)}
      />
    </CustomerCaseGroup>
  )
}
