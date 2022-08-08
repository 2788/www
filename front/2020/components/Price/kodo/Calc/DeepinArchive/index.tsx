import React, { useState, useEffect, useRef } from 'react'
import Checkbox from 'react-icecream/lib/checkbox'
import Calculator, { CalcInput } from 'components/Price/Calculator'

import rules from './rules'
import style from '../index.less'
import Region from './Region'
import RegionName, { defaultRegion, nameMap, regionOptions } from '../../region'
import Duration from '../Duration'

// icecream 没暴露出来
export declare type CheckboxValueType = string | number | boolean

export type Props = { setCalculator: (calc: Calculator) => void }

export default function DeepinArchive({ setCalculator }: Props) {
  const [regions, setRegions] = useState([defaultRegion])
  const calculator = useRef(Calculator.fromRules(rules)).current

  useEffect(() => {
    setCalculator(calculator)
  }, [setCalculator, calculator])

  function handleRegionChange(checkdValues: CheckboxValueType[]) {
    setRegions(checkdValues as RegionName[])
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
      desc={nameMap[region]}
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
