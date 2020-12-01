import React from 'react'
import { RendererUtils } from 'utils/test'

import Main from '.'

test('should render well.', () => {
  const utils = new RendererUtils()
  const renderer = utils.createWithAct(<Main />)

  expect(renderer).toMatchSnapshot()
})
