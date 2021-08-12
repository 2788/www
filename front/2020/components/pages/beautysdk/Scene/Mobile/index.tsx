import React from 'react'
import Menu, { MenuItem, SubMenu } from 'components/UI/Menu'
import style from './style.less'
import { ItemType } from '..'

export default function ForMobile({ scenes }: any) {
  return (
    <Menu mode="inline" className={style.menu}>
      {
        scenes.map((item: ItemType, index: number) => (
          <SubMenu key={index} mode="inline" title={item.title}>
            <div>
              <MenuItem className={style.menuItem}>
                <div className={style.container}>
                  <p className={style.desc}>{item.desc}</p>
                  <img src={item.url} className={style.pic} />
                </div>
              </MenuItem>
            </div>
          </SubMenu>
        ))
      }
    </Menu>
  )
}
