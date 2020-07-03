import React, { useContext } from 'react'
import Positioned from './Positioned'
import { Context } from '.'

export default function Line3To8() {
  const { productType } = useContext(Context)
  if (productType !== 'all') {
    return null
  }
  return (
    <Positioned left={688} top={223}>
      <svg xmlns="http://www.w3.org/2000/svg" width="47" height="224" viewBox="0 0 47 224">
        <path fill="#B2E5F7" d="M726.056439,199.667038 L733.056439,213.667038 L727.056,213.667 L727.056439,416.667038 L700.056,416.667 L700.056439,422.667038 L686.056439,415.667038 L700.056439,408.667038 L700.056,414.667 L725.056,414.667 L725.056,213.667 L719.056439,213.667038 L726.056439,199.667038 Z" transform="translate(-686 -199)" />
      </svg>
    </Positioned>
  )
}
