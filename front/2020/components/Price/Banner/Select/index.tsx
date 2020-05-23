import React, { useState } from 'react'
import classnames from 'classnames'
import Dropdown, { DropdownMenu, DropdownMenuGroup, DropdownMenuItem } from 'components/UI/Dropdown'
import Button from 'components/UI/Button'
import Link from 'components/Link'

import CalcIcon from './calc.svg'
import ArrowUpIcon from './arrow-up.svg'
import style from './index.less'

export default function Select() {
  const [open, setOpen] = useState(false)

  return (
    <Dropdown trigger="click" overlay={Overlay} onVisibleChange={setOpen} overlayClassName={style.dropdown}>
      <Button className={style.btn}>
        查看其它产品价格<ArrowUpIcon className={classnames(style.arrow, open && style.open)} />
      </Button>
    </Dropdown>
  )
}

function Overlay() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuGroup title="存储与数据湖">
          <DropdownMenuItem>
            <Link href="/prices/kodo">对象存储<CalcIcon className={style.calc} /></Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup title="基础服务">
          <DropdownMenuItem>
            <Link href="/prices/cdn">CDN<CalcIcon className={style.calc} /></Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/pili">直播</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/ssl">SSL 证书</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/qvm">云主机<CalcIcon className={style.calc} /></Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/sms">云短信</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuGroup title="智能视频">
          <DropdownMenuItem>
            <Link href="/prices/dora">智能多媒体服务</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/products/plsv#price">短视频 SDK</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/faceid">人脸核验</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/prices/censor">内容审核</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup title="机器数据智能">
          <DropdownMenuItem>
            <Link href="/price/express">机器数据分析平台</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </>
  )
}
