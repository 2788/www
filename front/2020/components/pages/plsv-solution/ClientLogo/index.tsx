/**
 * @file 短视频客户案例 Logo 墙 index.tsx
 * @description 包含短视频客户案例 Logo 墙
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'

import styles from './style.less'

import ClientIconJumeiURL from './client-icon-jumei.png'
import ClientIconNioURL from './client-icon-nio.png'
import ClientIconZiroomURL from './client-icon-ziroom.png'
import ClientIconBluedURL from './client-icon-blued.png'
import ClientIconXiaoenaiURL from './client-icon-xiaoenai.png'
import ClientIconKuaikanURL from './client-icon-kuaikan.png'
import ClientIconPinganURL from './client-icon-pingan.png'
import ClientIconTranssionURL from './client-icon-transsion.png'

export default function PlsvClientLogo() {
  return (
    <CustomerCaseGroup
      name="client"
      title="客户案例"
      subtitle="群雄逐鹿短视频，他们都在用七牛"
    >
      <CustomerCase
        pic={(<img src={ClientIconJumeiURL} className={styles.icon} title="聚美优品" alt="聚美优品" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconNioURL} className={styles.icon} title="蔚来" alt="蔚来" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconZiroomURL} className={styles.icon} title="自如" alt="自如" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconBluedURL} className={styles.icon} title="Blued" alt="Blued" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconXiaoenaiURL} className={styles.icon} title="小恩爱" alt="小恩爱" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconKuaikanURL} className={styles.icon} title="快看" alt="快看" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconPinganURL} className={styles.icon} title="平安好医生" alt="平安好医生" />)}
      />
      <CustomerCase
        pic={(<img src={ClientIconTranssionURL} className={styles.icon} title="传声 TRANSSION" alt="传声 TRANSSION" />)}
      />
    </CustomerCaseGroup>
  )
}
