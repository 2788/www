/**
 * @file 申诉
 */

import React, { useState } from 'react'

import { Row } from 'components/UI/Card'
import { useMobile } from 'hooks/ua'

import SignInRequired from './SignInRequired'
import SubmitForm from './SubmitForm'
import HistoryList from './HistoryList'

import style from './style.less'

export default function Appeal() {
  const isMobile = useMobile()
  const [mainId, setMainId] = useState(0) // HACK: uuid for reload

  return (
    <Row className={style.main}>
      {
        isMobile
        ? (
          <p className={style.unavailableTips}>请在 PC 端打开使用</p>
        )
        : (
          <SignInRequired>
            <React.Fragment key={mainId}>
              <SubmitForm onSubmitted={() => { setMainId(currMainId => currMainId + 1) }} />
              <HistoryList />
            </React.Fragment>
          </SignInRequired>
        )
      }
    </Row>
  )
}
