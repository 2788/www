import React, { useState } from 'react'
import classnames from 'classnames'
import { categoryNameMap, Category, Product, nameMap, categoryProductsMap } from 'constants/products'
import { urlForPrice, hasPrice } from 'utils/route'
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
  function menuItemForProduct(product: Product) {
    if (!hasPrice(product)) return null
    return (
      <DropdownMenuItem>
        <Link href={urlForPrice(product)}>
          {nameMap[product]}
          {hasCalculator(product) && <CalcIcon className={style.calc} />}
        </Link>
      </DropdownMenuItem>
    )
  }
  const serviceProducts = categoryProductsMap[Category.Service]
  const visionProducts = categoryProductsMap[Category.Vision].filter(
    product => !serviceProducts.includes(product) // 去除跟基础服务重复的项
  )
  return (
    <>
      <DropdownMenu>
        <DropdownMenuGroup title={categoryNameMap[Category.Service]}>
          {serviceProducts.map(menuItemForProduct)}
        </DropdownMenuGroup>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuGroup title={categoryNameMap[Category.Vision]}>
          {visionProducts.map(menuItemForProduct)}
          {/* TODO 去掉 */}
          <DropdownMenuItem>
            <Link href={urlForPrice(Product.OpenApi)}>
              {nameMap[Product.OpenApi]}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenu>
    </>
  )
}

function hasCalculator(product: Product) {
  // 目前就这仨有计算器
  return [Product.Kodo, Product.Cdn, Product.Qvm].includes(product)
}
