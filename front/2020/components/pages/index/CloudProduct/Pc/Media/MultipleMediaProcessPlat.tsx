import React from 'react'
import { urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Positioned from '../share/Positioned'
import { Node } from '..'
import Icon from '../icons/machine/MultipleMediaProcessPlat'
import MultiMediaService from './MultiMediaService'
import ContentCensor from './ContentCensor'
import AIMarket from './AIMarket'

import AIIcon from '../icons/machine/AI'
import Text from '../share/Text'
import Product from '../share/Product'

export default function MultipleMediaProcessPlat() {
  return (
    <>
      <Positioned identity={Node.MultiMediaDataProcessDetail} top={0} left={130 + 64} animationArea={false}>
        <svg width="660" height="310" viewBox="0 0 660 310" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="&#231;&#188;&#150;&#231;&#187;&#132; 66&#229;&#164;&#135;&#228;&#187;&#189; 6">
            <rect id="&#231;&#159;&#169;&#229;&#189;&#162;" x="0.5" y="0.5" width="659" height="309" rx="3.5" stroke="#07BEFF" strokeDasharray="4 4" />
            <g id="Frame 228">
              <path id="&#232;&#183;&#175;&#229;&#190;&#132; 6" d="M81 139V159H588V139" stroke="#A7E8FF" />
              <path id="&#232;&#183;&#175;&#229;&#190;&#132; 7" d="M244 159V139" stroke="#A7E8FF" />
              <path id="&#232;&#183;&#175;&#229;&#190;&#132; 7_2" d="M416 159V139" stroke="#A7E8FF" />
              <path id="&#232;&#183;&#175;&#229;&#190;&#132; 7_3" d="M330.5 173V159" stroke="#A7E8FF" />
            </g>
            <g id="Frame 201">
              <g id="&#231;&#188;&#150;&#231;&#187;&#132; 18">
                <path id="&#232;&#167;&#134;&#232;&#167;&#137;&#230;&#149;&#176;&#230;&#141;&#174;&#229;&#136;&#134;&#230;&#158;&#144;&#229;&#185;&#179;&#229;&#143;&#176;" d="M404.934 112.004L401 122H402.232L403.296 119.2H407.888L408.952 122H410.198L406.264 112.004H404.934ZM403.66 118.234L405.578 113.236H405.634L407.524 118.234H403.66ZM411.293 112.004V122H412.427V112.004H411.293Z" fill="#07BEFF" />
              </g>
            </g>
          </g>
          <defs>
            <filter id="filter0_i_701_416" x="319.364" y="199.091" width="18.9092" height="12.4399" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_701_416" />
            </filter>
            <filter id="filter1_di_701_416" x="231.565" y="46.5952" width="20.1624" height="16.147" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_701_416" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_701_416" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_701_416" />
            </filter>
            <filter id="filter2_i_701_416" x="570" y="32" width="24" height="15.4556" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_701_416" />
            </filter>
            <filter id="filter3_i_701_416" x="399" y="32.8689" width="20" height="16.9688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.581333 0 0 0 0 0.908333 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_701_416" />
            </filter>
            <linearGradient id="paint0_linear_701_416" x1="241" y1="25.7676" x2="241" y2="82.01" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7CDCFF" />
              <stop offset="1" stopColor="#46BEFF" />
            </linearGradient>
            <clipPath id="clip0_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(300.455 209.273)" />
            </clipPath>
            <clipPath id="clip1_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(300.455 197.636)" />
            </clipPath>
            <clipPath id="clip2_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(300.455 186)" />
            </clipPath>
            <clipPath id="clip3_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(551.455 46.2727)" />
            </clipPath>
            <clipPath id="clip4_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(551.455 34.6365)" />
            </clipPath>
            <clipPath id="clip5_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(551.455 23)" />
            </clipPath>
            <clipPath id="clip6_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(377.455 46.2727)" />
            </clipPath>
            <clipPath id="clip7_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(377.455 34.6365)" />
            </clipPath>
            <clipPath id="clip8_701_416">
              <rect width="61.0909" height="40" fill="white" transform="translate(377.455 23)" />
            </clipPath>
          </defs>
        </svg>
        <Positioned top={22} left={12} zIndex={1}>
          <MultiMediaService />
        </Positioned>
        <Positioned top={22} left={375}><AIIcon /></Positioned>
        <Positioned top={22} left={196}><ContentCensor /></Positioned>
        <Positioned top={22} left={524}><AIMarket /></Positioned>
      </Positioned>
      <Positioned identity={Node.MultiMediaDataProcess} top={186} left={443}>
        <Product
          icon={<Icon />}
          textArea={
            <Text
              name="多媒体数据处理平台"
              url={urlMap[ProductEnum.Dora]}
              tooltipTitle="多媒体数据处理平台"
              tooltipDesc={descMap[ProductEnum.Dora]}
            />
          }
        />
      </Positioned>
    </>
  )
}
