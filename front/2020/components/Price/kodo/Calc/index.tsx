import React, { useState, useRef, useEffect } from 'react'
import CalcPane from 'components/Price/Tabs/CalcPane'
import Tabs, { TabPane } from 'components/UI/Tabs'
import Calculator from 'components/Price/Calculator'
import { useShoppingCart } from 'components/Price/Tabs/CalcPane/ShoppingCart'
import transform from 'components/Price/transform'

import Standard from './Standard'
import style from './index.less'
import LowFrequency from './LowFrequency'
import Archive from './Archive'
import DeepinArchive from './DeepinArchive'

const tabMap: { [key in string]: string } = {
  1: '标准存储',
  2: '低频存储',
  3: '归档存储',
  4: '深度归档存储'
}

export default function KodoCalc() {
  const [total, setTotal] = useState('0.00')
  const addProduct = useShoppingCart()
  const activeTabRef = useRef('1')
  const [calculator, setCalculator] = useState<Calculator>()
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
      addProduct(transform(
        tabMap[activeTabRef.current],
        calculator.evaluate(),
        calculator.getInputs(),
        calculator.getDuration()
      ))
    }
  }

  return (
    <CalcPane disabled={disabled} onAdd={handleAdd} buyLink="https://qmall.qiniu.com/template/NA?spec_combo=Nzk&ref=kodo-price" total={total}>
      <Tabs defaultValue="1" size="middle" className={style.tabs} onChange={value => { activeTabRef.current = value }}>
        <TabPane value="1" tab={tabMap[1]} autoDestroy><Standard setCalculator={setCalculator} /></TabPane>
        <TabPane value="2" tab={tabMap[2]} autoDestroy><LowFrequency setCalculator={setCalculator} /></TabPane>
        <TabPane value="3" tab={tabMap[3]} autoDestroy><Archive setCalculator={setCalculator} /></TabPane>
        <TabPane value="4" tab={tabMap[4]} autoDestroy><DeepinArchive setCalculator={setCalculator} /></TabPane>
      </Tabs>
    </CalcPane>
  )
}
