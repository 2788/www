/**
 * @file 产品页接入流程 Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Section, { SectionProps } from 'components/Product/Section'
import { useMobile } from 'hooks/ua'

import * as Mobile from './Mobile'
import * as Pc from './Pc'

export interface StepProps {
  icon: ReactNode
  url?: string
}

export function Step(props: PropsWithChildren<StepProps>) {
  const isMobile = useMobile()
  return isMobile ? <Mobile.Step {...props} /> : <Pc.Step {...props} />
}

export interface AccessProcessProps {
  subHeader?: ReactNode
}

AccessProcess.defaultProps = {
  name: 'access',
  title: '接入流程'
}

export function RawAccessProcess(props: PropsWithChildren<AccessProcessProps>) {
  const isMobile = useMobile()
  return (
    isMobile
    ? <Mobile.AccessProcess {...props} />
    : <Pc.AccessProcess {...props} />
  )
}

export default function AccessProcess({
  children, subHeader, ...sectionProps
}: PropsWithChildren<AccessProcessProps & SectionProps>) {
  return (
    <Section {...sectionProps}>
      <RawAccessProcess subHeader={subHeader}>{children}</RawAccessProcess>
    </Section>
  )
}
