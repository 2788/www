import Link from 'components/Link'
import Menu, { MenuItem, SubMenu } from 'components/UI/Menu'
import React from 'react'
import ArrowIcon from './arrow.svg'
import style from './style.less'

const demoItems = [
  { title: '短视频特效 SDK', android: 'http://fir.qnsdk.com/654e', iOS: 'http://fir.qnsdk.com/5qwg' },
  { title: '直播特效 SDK', android: 'http://fir.qnsdk.com/5fdt', iOS: 'http://fir.qnsdk.com/b3jw' },
  { title: '实时音视频特效 SDK', android: 'http://fir.qnsdk.com/naem', iOS: 'http://fir.qnsdk.com/kzh9' }
]

export default function ForMobile() {
  return (
    <Menu mode="inline" className={style.menu}>
      {
        demoItems.map((item, index) => (
          <SubMenu key={index} title={item.title} >
            <div>
              <MenuItem>
                <Link href={item.android} className={style.card}>
                  <p className={style.title}>Android</p>
                  <ArrowIcon />
                </Link>
                <Link href={item.iOS} className={style.card}>
                  <p className={style.title}>iOS</p>
                  <ArrowIcon />
                </Link>
              </MenuItem>
            </div>
          </SubMenu>
        ))
      }
    </Menu>
  )
}
