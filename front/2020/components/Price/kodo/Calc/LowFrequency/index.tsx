import React, { useState, useEffect, useRef } from 'react'
import Checkbox from 'react-icecream/lib/checkbox'
import Calculator, { CalcInput } from 'components/Price/Calculator'

import rules from './rules'
import style from '../index.less'
import Region, { regionOptions } from './Region'
import Duration from '../Duration'

// icecream 没暴露出来
export declare type CheckboxValueType = string | number | boolean

export type Props = { active: boolean, setCalculator: (calc: Calculator) => void }

export default function LowFrequency({ setCalculator, active = false }: Props) {
  const [regions, setRegions] = useState(['east'])
  const calculator = useRef(Calculator.fromRules(rules)).current

  useEffect(() => {
    if (active) {
      setCalculator(calculator)
    }
  }, [setCalculator, calculator, active])

  function handleRegionChange(checkdValues: CheckboxValueType[]) {
    setRegions(checkdValues as string[])
    const currentInputs = calculator.getInputs().filter(input => checkdValues.find(value => value === input.region))
    calculator.setInput(currentInputs)
  }

  function handleRegionItemChange(input: CalcInput) {
    calculator.setInput(input)
  }

  function handleDurationChange(value: number) {
    calculator.setDuration(value)
  }

  const regionSections = regions.map(region => (
    <Region
      key={region}
      region={region}
      desc={regionOptions.find(option => option.value === region)!.label}
      onChange={handleRegionItemChange}
    />
  ))

  return (
    <>
      <section className={style.region}>
        <div>存储区域</div>
        <div>
          <Checkbox.Group options={regionOptions} value={regions} onChange={handleRegionChange} />
        </div>
      </section>
      {regionSections}
      <Duration onChange={handleDurationChange} />
    </>
  )
}
