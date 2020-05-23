import React from 'react'
import Dropdown, { DropdownMenu, DropdownMenuGroup, DropdownMenuItem } from 'components/UI/Dropdown'
import Button from 'components/UI/Button'

import style from './index.less'

export default function Select() {
  return (
    <Dropdown trigger="click" overlay={Overlay}>
      <Button className={style.btn}>查看其它产品价格</Button>
    </Dropdown>
  )
}

function Overlay() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuGroup title="存储与数据湖">
          <DropdownMenuItem>对象存储</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup title="基础服务">
          <DropdownMenuItem>CDN</DropdownMenuItem>
          <DropdownMenuItem>直播</DropdownMenuItem>
          <DropdownMenuItem>SSL 证书</DropdownMenuItem>
          <DropdownMenuItem>云主机</DropdownMenuItem>
          <DropdownMenuItem>云短信</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuGroup title="存储与数据湖">
          <DropdownMenuItem>对象存储</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup title="基础服务">
          <DropdownMenuItem>CDN</DropdownMenuItem>
          <DropdownMenuItem>直播</DropdownMenuItem>
          <DropdownMenuItem>SSL 证书</DropdownMenuItem>
          <DropdownMenuItem>云主机</DropdownMenuItem>
          <DropdownMenuItem>云短信</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </>
  )
}
