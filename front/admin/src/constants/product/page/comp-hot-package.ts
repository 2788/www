/**
 * @file 热销套餐
 */

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export interface ButtonProps {
  title: string
  url: string
}

export interface IntroductionProps {
  detail: string
}

export interface HotPackageItem {
  title: string
  desc: string
  button: ButtonProps
  introductions?: IntroductionProps[]
  price: number
  tag?: string
}

export type ProductComponentHotPackageProps = ProductComponentProps<{
  items: HotPackageItem[]
}>

export type ProductComponentHotPackageConfig = ProductComponentConfig<
  ProductComponentName.HotPackage,
  ProductComponentHotPackageProps
>
