import React, { useState, useRef, useEffect } from 'react'
import CalcPane from 'components/Price/Banner/CalcPane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Calculator from 'components/Price/Calculator'
import { useLocalStorage } from 'hooks/storage'
import { Product, STORAGE_KEY } from 'components/Price/Banner/CalcPane/ShoppingCart'
import transform from 'components/Price/transform'

import Standard from './Standard'
import style from './index.less'
import LowFrequency from './LowFrequency'
import Archive from './Archive'

const tabMap: { [key in string]: string } = {
  1: '标准存储',
  2: '低频存储',
  3: '归档存储'
}

export default function KodoCalc() {
  const [total, setTotal] = useState('0.00')
  const [goods, setGoods] = useLocalStorage<Product[]>(STORAGE_KEY)
  const activeTabRef = useRef('1')
  const [calculator, setCalculator] = useState<Calculator | null>(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (calculator) {
      setTotal(calculator.evaluate())
      return calculator.listen(_total => {
        setTotal(_total)
        // 如果没有输入，或者有输入但是全都是 0
        const shouldDisabled = calculator.getInputs().length === 0
          || calculator.getInputs().filter(input => input.items.find(item => item.count > 0)).length === 0

        setDisabled(shouldDisabled)
      })
    }
  }, [setTotal, calculator])

  function handleAdd() {
    if (calculator) {
      setGoods(
        [
          ...(goods || []),
          transform(
            tabMap[activeTabRef.current],
            calculator.evaluate(),
            calculator.getInputs(),
            calculator.getDuration()
          )
        ]
      )
    }
  }

  return (
    <CalcPane disabled={disabled} onAdd={handleAdd} buyLink="https://marketing.qiniu.com/activity/kodopackage" total={total}>
      <Tabs defaultValue="1" size="middle" className={style.tabs} onChange={value => { activeTabRef.current = value }}>
        <TabPane value="1" tab={tabMap[1]} autoDestroy><Standard setCalculator={setCalculator} /></TabPane>
        <TabPane value="2" tab={tabMap[2]} autoDestroy><LowFrequency setCalculator={setCalculator} /></TabPane>
        <TabPane value="3" tab={tabMap[3]} autoDestroy><Archive setCalculator={setCalculator} /></TabPane>
      </Tabs>
    </CalcPane>
  )
}
