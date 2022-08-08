import React, { useRef } from 'react'
import Select from 'react-icecream/lib/select'
import { CalcInput, Unit } from 'components/Price/Calculator'
import InputNumber from 'components/UI/InputNumber'

import style from './index.less'

type RegionProps = {
  desc: string
  region: string
  onChange(input: CalcInput): void
}

export default function Region({ region, desc, onChange }: RegionProps) {
  const inputRef = useRef<CalcInput>({
    region,
    desc,
    items: [
      { name: '存储空间费用', desc: '存储空间/月', count: 0, unit: 'GB' },
      { name: '外网流出流量', desc: '外网流出流量/月', count: 0, unit: 'GB' },
      { name: 'CDN', desc: 'CDN 回源流出流量/月', count: 0, unit: 'GB' },
      { name: 'GET', desc: 'GET 读请求数/月', count: 0, unit: '万次' },
      { name: 'PUT/DELETE', desc: 'PUT/DELETE 写请求数/月', count: 0, unit: '万次' },
      { name: '数据取回请求次数', desc: '数据取回请求次数/月', count: 0, unit: '万次' },
      { name: '数据取回', desc: '数据取回/月', count: 0, unit: 'GB' }
    ]
  })

  function handleValueChange(index: number) {
    return (value: number) => {
      inputRef.current.items[index].count = value
      onChange(inputRef.current)
    }
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
    <section className={style.area}>
      <div className={style.areaTitle}>{desc}</div>
      <div className={style.areaRow}>
        <div className={style.areaItem}>
          <p>存储空间/月</p>
          <InputNumber onChange={handleValueChange(0)} addonAfter={selectAfter(0)} />
        </div>
        <div className={style.areaItem}>
          <p>外网流出流量/月</p>
          <InputNumber onChange={handleValueChange(1)} addonAfter={selectAfter(1)} />
        </div>
        <div className={style.areaItem}>
          <p>CDN 回源流出流量/月</p>
          <InputNumber onChange={handleValueChange(2)} addonAfter={selectAfter(2)} />
        </div>
      </div>
      <div className={style.areaRow}>
        <div className={style.areaItem}>
          <p>GET 读请求数/月</p>
          <InputNumber onChange={handleValueChange(3)} addonAfter="万次" />
        </div>
        <div className={style.areaItem}>
          <p>PUT/DELETE 写请求数/月</p>
          <InputNumber onChange={handleValueChange(4)} addonAfter="万次" />
        </div>
        <div className={style.areaItem}>
          <p>数据取回请求次数/月</p>
          <InputNumber onChange={handleValueChange(5)} addonAfter="万次" />
        </div>
      </div>
      <div className={style.areaRow}>
        <div className={style.areaItem}>
          <p>数据取回/月</p>
          <InputNumber onChange={handleValueChange(6)} addonAfter="GB" />
        </div>
      </div>
    </section>
  )
}
