import React from 'react'
import MachineData from './MachineData'
import MultipleMediaProcessPlat from './MutipleMediaProcessPlat'
import AnalysisPlat from './AnalysisPlat'
import Analyser from './Analyser'
import DataCollect from './DataCollect'

export default function Machine() {
  return (
    <>
      <MachineData />
      <DataCollect />
      <MultipleMediaProcessPlat />
      <AnalysisPlat />
      <Analyser />
    </>
  )
}
