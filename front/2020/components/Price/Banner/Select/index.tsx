import React, { useState } from 'react'
import classnames from 'classnames'
import { categoryNameMap, Category, Product, nameMap } from 'constants/products'
import { urlForPrice } from 'utils/route'
import Dropdown, { DropdownMenu, DropdownMenuGroup, DropdownMenuItem } from 'components/UI/Dropdown'
import Button from 'components/UI/Button'
import Link from 'components/Link'

import CalcIcon from './calc.svg'
import ArrowDownIcon from './arrow-down.svg'
import style from './index.less'

export default function Select() {
  const [open, setOpen] = useState(false)

  return (
    <Dropdown trigger="click" overlay={Overlay} onVisibleChange={setOpen} overlayClassName={style.dropdown}>
      <Button className={style.btn}>
        查看其它产品价格<ArrowDownIcon className={classnames(style.arrow, open && style.open)} />
      </Button>
    </Dropdown>
  )
}

function Overlay() {
  function menuItemForProduct(product: Product, hasCalculator = false) {
    return (
      <DropdownMenuItem>
        <Link href={urlForPrice(product)}>
          {nameMap[product]}
          {hasCalculator && <CalcIcon className={style.calc} />}
        </Link>
      </DropdownMenuItem>
    )
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuGroup title={categoryNameMap[Category.Service]}>
          {menuItemForProduct(Product.Kodo, true)}
          {menuItemForProduct(Product.Cdn, true)}
          {menuItemForProduct(Product.Pili)}
          {menuItemForProduct(Product.Ssl)}
          {menuItemForProduct(Product.Qvm, true)}
          {menuItemForProduct(Product.Sms)}
        </DropdownMenuGroup>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuGroup title={categoryNameMap[Category.Video]}>
          {menuItemForProduct(Product.Dora)}
          {menuItemForProduct(Product.Plsv)}
          {menuItemForProduct(Product.FaceID)}
          {menuItemForProduct(Product.Censor)}
        </DropdownMenuGroup>
      </DropdownMenu>
    </>
  )
}
