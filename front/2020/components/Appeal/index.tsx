/**
 * @file 申诉
 */

import React from 'react'

import { Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import SignInRequired from './SignInRequired'
import SubmitForm from './SubmitForm'
import HistoryList from './HistoryList'

import style from './style.less'

export default function Appeal() {
  const isMobile = useMobile()
  return (
    <Row className={style.main}>
      {
        isMobile
        ? (
          <p className={style.unavailableTips}>请在 PC 端打开使用</p>
        )
        : (
          <SignInRequired>
            <SubmitForm />
            <HistoryList />
          </SignInRequired>
        )
      }
    </Row>
  )
}
