import React, { useState, useRef, useEffect } from 'react'
import CalcPane from 'components/Price/Banner/CalcPane'
import Alert from 'react-icecream/lib/alert'
import Checkbox from 'react-icecream/lib/checkbox'
import Select from 'react-icecream/lib/select'

import InputNumber from 'components/UI/InputNumber'
import { useLocalStorage } from 'hooks/storage'
import transform from 'components/Price/transform'
import { STORAGE_KEY, Product } from 'components/Price/Banner/CalcPane/ShoppingCart'

import Calculator, { CalcInput, Unit } from '../../Calculator'
import style from './index.less'
import rules from './rules'
import DynamicAcc from './DynamicAcc'
import Duration from './Duration'

// icecream 没暴露出来
export declare type CheckboxValueType = string | number | boolean

const regionOptions = [
  { label: '大陆地区', value: 'mainland' },
  { label: '欧洲/北美洲', value: 'eu/ua' },
  { label: '大亚洲（港澳台/东南亚/印度）陆地区', value: 'asia' },
  { label: '亚洲（其他地区）', value: 'asia_other' },
  { label: '南美洲', value: 'sa' },
  { label: '大洋洲与其他', value: 'oc' }
]

export default function CdnCalc() {
  const [regions, setRegions] = useState(['mainland'])
  const calculator = useRef(Calculator.fromRules(rules)).current
  const [total, setTotal] = useState('0.00')

  const [goods, setGoods] = useLocalStorage<Product[]>(STORAGE_KEY)

  useEffect(() => calculator.listen(setTotal), [calculator])

  function handleRegionChange(checkdValues: CheckboxValueType[]) {
    setRegions(checkdValues as string[])
  }

  function handleRegionItemChange(input: CalcInput) {
    calculator.setInput(input)
  }

  function handleAdd() {
    setGoods([...(goods || []), transform('CDN', calculator.evaluate(), calculator.getInputs())])
  }

  const regionSections = regions.map(region => (
    <section key={region} className={style.area}>
      <Region
        region={region}
        desc={regionOptions.find(option => option.value === region)!.label}
        onChange={handleRegionItemChange}
      />
    </section>
  ))

  return (
    <CalcPane onAdd={handleAdd} buyLink="https://portal.qiniu.com/financial/respack/fusion-composite" total={total}>
      <Tip />
      <section className={style.region}>
        <div>加速区域</div>
        <div>
          <Checkbox.Group options={regionOptions} value={regions} onChange={handleRegionChange} />
        </div>
      </section>
      {regionSections}
      <DynamicAcc onChange={calculator.setInput} />
      <Duration onChange={calculator.setDuration} />
    </CalcPane>
  )
}

function Tip() {
  const message = (
    <a href="https://marketing.qiniu.com/activity/20200423?entry=portal-cdnoverview" target="_blank" rel="noopener">
      CDN 日间流量包限时 <span className={style.discount}>5折</span> 优惠
    </a>
  )

  return <Alert type="info" message={message} closable />
}

type RegionProps = {
  desc: string
  region: string
  onChange(input: CalcInput): void
}

function Region({ region, desc, onChange }: RegionProps) {
  const inputRef = useRef<CalcInput>({
    region,
    desc,
    items: [
      { name: 'http', count: 0, unit: 'GB' },
      { name: 'https', count: 0, unit: 'GB' }
    ]
  })

  function handleHttpChange(value: number) {
    inputRef.current.items[0].count = value
    onChange(inputRef.current)
  }

  function handleHttpsChange(value: number) {
    inputRef.current.items[1].count = value
    onChange(inputRef.current)
  }

  function handleUnitChange(unit: Unit) {
    inputRef.current.items[0].unit = unit
    inputRef.current.items[1].unit = unit
    onChange(inputRef.current)
  }

  const selectAfter = (
    <Select defaultValue="GB" style={{ width: 62 }} onChange={value => handleUnitChange(value as Unit)}>
      <Select.Option key="1" value="GB">GB</Select.Option>
      <Select.Option key="2" value="TB">TB</Select.Option>
      <Select.Option key="3" value="PB">PB</Select.Option>
    </Select>
  )

  return (
    <div>
      <div className={style.areaTitle}>{desc}</div>
      <div className={style.areaItem}>
        <p>HTTP 下载流量/月</p>
        <InputNumber onChange={handleHttpChange} addonAfter={selectAfter} />
      </div>
      <div className={style.areaItem}>
        <p>HTTPS 下载流量/月</p>
        <InputNumber onChange={handleHttpsChange} addonAfter={selectAfter} />
      </div>
    </div>
  )
}
