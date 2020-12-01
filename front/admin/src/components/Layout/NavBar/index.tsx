import * as React from 'react'
import { observer } from 'mobx-react'
import { Menu, Icon, Dropdown } from 'react-icecream'
import { useInjection } from 'qn-fe-core/di'
import UserInfo from 'admin-base/user/stores/user-info'

import * as style from './style.m.less'

export default observer(function NavBar() {
  const userInfo = useInjection(UserInfo)

  const handleSignOut = () => userInfo.signOut(window.location.href)

  const dropdownView = (
    <Menu>
      <Menu.Item
        className={style.signout}
        onClick={handleSignOut}
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={style.wrapper}>
      <div className={style.navbar}>
        <Dropdown overlay={dropdownView}>
          <div className={style.header}>
            <span className={style.email}>{userInfo.email}</span>
            <Icon type="down" />
          </div>
        </Dropdown>
      </div>
    </div>
  )
})
