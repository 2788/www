import React, { useState, useRef, useEffect, useCallback } from 'react'
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
  const calculatorRef = useRef<Calculator>()
  const calculator = calculatorRef.current

  const setCalculator = useCallback(_calculator => {
    calculatorRef.current = _calculator
  }, [])

  useEffect(() => {
    if (calculator) {
      setTotal(calculator.evaluate())
      return calculator.listen(setTotal)
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
    <CalcPane onAdd={handleAdd} buyLink="https://marketing.qiniu.com/activity/kodopackage" total={total}>
      <Tabs defaultValue="1" className={style.tabs} onChange={value => { activeTabRef.current = value }}>
        <TabPane value="1" tab="标准存储"><Standard active={activeTabRef.current === '1'} setCalculator={setCalculator} /></TabPane>
        <TabPane value="2" tab="低频存储"><LowFrequency active={activeTabRef.current === '2'} setCalculator={setCalculator} /></TabPane>
        <TabPane value="3" tab="归档存储"><Archive active={activeTabRef.current === '3'} setCalculator={setCalculator} /></TabPane>
      </Tabs>
    </CalcPane>
  )
}
