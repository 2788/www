import React, { useContext } from 'react'
import Positioned from './Positioned'
import { Context } from '.'

export default function Line2To7() {
  const { productType } = useContext(Context)
  if (productType !== 'all') {
    return null
  }
  return (
    <Positioned left={387} top={223}>
      <svg width="47px" height="224px" viewBox="0 0 47 224">
        <g id="首页" stroke="none" strokeWidth="1" fill="none">
          <g id="首页-云产品" transform="translate(-786.000000, -444.000000)" fill="#AEE1F3">
            <g id="云产品">
              <g id="编组-75" transform="translate(395.000000, 248.000000)">
                <path id="路径-17" d="M398,196.191347 L405,210.191347 L399,210.191 L399,412.05 L423.991,412.05 L423.991842,406.05097 L437.991842,413.05097 L423.991842,420.05097 L423.991,414.05 L397,414.05097 L397,210.191 L391,210.191347 L398,196.191347 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Positioned>
  )
}
