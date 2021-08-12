import React from 'react'
import Menu, { MenuItem, SubMenu } from 'components/UI/Menu'
import { ItemType } from '../index'
import style from './style.less'

export default function ForMobile({ productFunctions }: any) {
  return (
    <Menu mode="inline" className={style.menu}>
      {
        productFunctions.map((item: ItemType, index: number) => (
          <SubMenu key={index} title={item.title} className={style.subTitle}>
            {/* 加一个 div 防止 menu 组件和 submenu 组件挨着使用产生 padding */}
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
