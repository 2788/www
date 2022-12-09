/**
 * @file 校园开发者成长计划页面 - 学习中心
 */

import React, { PropsWithChildren, ReactNode } from 'react'
import { useMobile } from 'hooks/ua'

import * as pc from './pc'
import * as mobile from './mobile'

export interface StepProps {
  icon?: ReactNode
  url?: string
  number?: number
}

export function Step(props: PropsWithChildren<StepProps>) {
  const isMobile = useMobile()
  return isMobile ? <mobile.Step {...props} /> : <pc.Step {...props} />
}

export default function CertificationProcess({
  children
}: { children: ReactNode }) {
  const isMobile = useMobile()
  return isMobile
    ? <mobile.CertificationProcess>{children}</mobile.CertificationProcess>
    : <pc.CertificationProcess>{children}</pc.CertificationProcess>
}
