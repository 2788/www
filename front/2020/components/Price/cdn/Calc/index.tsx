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
    const currentInputs = calculator.getInputs().filter(input => checkdValues.find(value => value === input.region))
    calculator.setInput(currentInputs)
  }

  function handleRegionItemChange(input: CalcInput) {
    calculator.setInput(input)
  }

  function handleAdd() {
    setGoods([...(goods || []), transform('CDN', calculator.evaluate(), calculator.getInputs(), calculator.getDuration())])
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

  // 如果没有输入，或者有输入但是全都是 0
  const disabled = calculator.getInputs().length === 0
    || calculator.getInputs().filter(input => input.items.find(item => item.count > 0)).length === 0

  return (
    <CalcPane disabled={disabled} onAdd={handleAdd} buyLink="https://portal.qiniu.com/financial/respack/fusion-composite" total={total}>
      <Tip />
      <section className={style.region}>
        <div>加速区域</div>
        <div>
          <Checkbox.Group options={regionOptions} value={regions} onChange={handleRegionChange} />
        </div>
      </section>
      {regionSections}
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
      { name: 'http', desc: 'HTTP 下载流量/月', count: 0, unit: 'GB' },
      { name: 'https', desc: 'HTTPS 下载流量/月', count: 0, unit: 'GB' },
      { name: 'acc', desc: '动态加速请求次数', count: 0, unit: '万次' }
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

  // 动态加速次数
  function handleAccCountChange(value: number) {
    inputRef.current.items[2].count = value
    onChange(inputRef.current)
  }

  function handleCapacityUnitChange(unit: Unit, index: number) {
    inputRef.current.items[index].unit = unit
    onChange(inputRef.current)
  }

  const selectAfter = (index: number) => (
    <Select defaultValue="GB" style={{ width: 62 }} onChange={value => handleCapacityUnitChange(value as Unit, index)}>
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
        <InputNumber onChange={handleHttpChange} addonAfter={selectAfter(0)} />
      </div>
      <div className={style.areaItem}>
        <p>HTTPS 下载流量/月</p>
        <InputNumber onChange={handleHttpsChange} addonAfter={selectAfter(1)} />
      </div>
      <div className={style.areaItem}>
        <p>动态加速请求次数</p>
        <InputNumber onChange={handleAccCountChange} addonAfter="万次" />
      </div>
    </div>
  )
}
