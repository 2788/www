import React from 'react'
import Section from 'components/Product/Section'
import Link from 'components/Link'
import { Product, urlMap } from 'constants/products'
import { useMobile } from 'hooks/ua'

import style from './index.less'

export default function Architecture() {
  const isMobile = useMobile()

  return (
    <Section title="产品矩阵" name="arch">
      {
        isMobile
          ? (
            <svg viewBox="0 0 365 186">
              <defs>
                <path id="产品架构-移动端-a" d="M18.2722534,10.212766 L21.8875943,12.3404255 L18.4488082,14.4349905 L14.6569124,12.3238782 L18.2722534,10.212766 Z M22.3153409,7.65957447 L25.9306818,9.78723404 L22.4328661,11.881799 L18.7,9.77068673 L22.3153409,7.65957447 Z M13.8153409,7.65957447 L17.4306818,9.78723404 L13.9918958,11.881799 L10.2,9.77068673 L13.8153409,7.65957447 Z M18.0653409,5.10638298 L21.6806818,7.23404255 L18.0653409,9.31985662 L14.45,7.21749524 L18.0653409,5.10638298 Z"></path>
                <filter id="产品架构-移动端-b" width="125.4%" height="142.9%" x="-12.7%" y="-21.4%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
                <path id="产品架构-移动端-c" d="M18.1097718,4.25531915 L22.9992311,7.12483077 L21.871,7.80331915 L27.1104477,10.8538006 L19.6873458,15.4787437 C16.4806387,13.468931 14.7020069,12.3315227 14.3514503,12.0665187 L13.2846201,12.7103627 L8.5,9.75607231 L11.3097718,8.08510638 L16.1992311,10.954618 L15.143,11.5903191 L19.6911,14.473617 L25.46175,10.8782979 L21.031,8.30931915 L20.0846201,8.8805755 L15.3,5.92628508 L18.1097718,4.25531915 Z"></path>
                <filter id="产品架构-移动端-d" width="121.5%" height="135.6%" x="-10.7%" y="-17.8%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
                </filter>
                <path id="产品架构-移动端-e" d="M13.1773375,7.99932945 L13.1988653,7.99976879 C13.2228402,8.00071221 13.2469472,8.00302754 13.271089,8.00676929 C13.2817918,8.00846297 13.2918286,8.01027078 13.3018128,8.01231623 C13.3167093,8.01534936 13.3321387,8.01909689 13.3475405,8.02345013 L21.5429325,10.3398328 C21.881772,10.4356039 22.0789149,10.7882692 21.9832635,11.1275328 C21.8876121,11.4667964 21.5353876,11.664186 21.1965481,11.5684149 L18.2637228,10.7386824 L15.9157228,12.3896824 L16.9944818,14.3946104 C17.161408,14.7049936 17.0454276,15.0920987 16.7354324,15.2592339 C16.4436722,15.4165375 16.0840357,15.3229252 15.9035676,15.0525992 L15.8718897,14.9998603 L12.6130523,8.94036611 L12.6084578,8.93166742 C12.5968274,8.90923037 12.5865161,8.88609801 12.5775938,8.86239552 L12.6130523,8.94036611 C12.5951673,8.90711077 12.58053,8.87297469 12.5690311,8.83832279 C12.5623142,8.81789868 12.5566344,8.79738509 12.5519847,8.77657544 C12.5418533,8.73130296 12.5368661,8.68563442 12.5367276,8.64024498 C12.5364995,8.58206721 12.5442846,8.52299934 12.5608251,8.46433222 C12.5653745,8.44867662 12.5683999,8.43916716 12.5716456,8.4297318 L12.5608251,8.46433222 C12.5704869,8.43006317 12.5827664,8.39724166 12.5973856,8.36602362 C12.6025264,8.35520537 12.6078074,8.34471037 12.6133798,8.33435799 C12.6222901,8.31766389 12.6319559,8.30149466 12.6422634,8.28586092 C12.6496701,8.27468628 12.6575882,8.26345343 12.665884,8.25246362 C12.677157,8.23753956 12.6889316,8.22332381 12.7012611,8.20968417 C12.7104423,8.19946546 12.7199532,8.18958956 12.7298156,8.17999747 C12.7420071,8.16823662 12.7544942,8.15703365 12.7673825,8.14635218 C12.7791643,8.13649092 12.791832,8.12675347 12.8049395,8.11744861 C12.8214811,8.10575764 12.8382365,8.09499909 12.8554523,8.08504303 C12.8607651,8.08196457 12.8664006,8.07881642 12.8721016,8.07574267 L12.8807895,8.07114248 C12.9022467,8.05999211 12.9243407,8.05005264 12.9469616,8.04138558 L12.8721016,8.07574267 C12.9076668,8.05656758 12.9442406,8.04112091 12.9813754,8.02926827 C13.0395792,8.01075776 13.1006778,8.00046165 13.1630141,7.99937581 L13.1773375,7.99932945 L13.1773375,7.99932945 Z M14.4477228,9.66068243 L15.3067228,11.2586824 L16.6807228,10.2916824 L14.4477228,9.66068243 Z M18.5355171,5.99062162 L24.0243292,9.23963391 C24.3274078,9.41903628 24.4278489,9.81047185 24.2486708,10.1139297 C24.0694927,10.4173876 23.6785464,10.5179544 23.3754679,10.3385521 L17.8866558,7.08953977 C17.5835772,6.91013739 17.4831361,6.51870183 17.6623142,6.21524396 C17.8414923,5.9117861 18.2324386,5.81121925 18.5355171,5.99062162 Z"></path>
                <filter id="产品架构-移动端-f" width="133.9%" height="142.4%" x="-16.9%" y="-21.2%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
                </filter>
                <linearGradient id="产品架构-移动端-g" x1="50%" x2="50%" y1="0%" y2="97.606%">
                  <stop offset="0%" stopColor="#98D5FF"></stop>
                  <stop offset="100%" stopColor="#34A1EC"></stop>
                </linearGradient>
                <polygon id="产品架构-移动端-h" points="16.985 11.435 17.017 22.086 10.954 22.067 10.948 20.162 15.106 20.174 15.079 11.429"></polygon>
                <filter id="产品架构-移动端-i" width="165.9%" height="137.5%" x="-33%" y="-18.8%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
                <polygon id="产品架构-移动端-j" points="11.068 8.757 19.56 14.353 22.135 7.66"></polygon>
                <filter id="产品架构-移动端-k" width="136.1%" height="159.8%" x="-18.1%" y="-29.9%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="translate(0 2)">
                  <g transform="translate(0 46)">
                    <Link href={urlMap[Product.Dora]}>
                      <rect width="104" height="20" fill="#E0F7FF"></rect>
                      <text fill="#00AAE7">
                        <tspan x="3" y="15">智能多媒体服务</tspan>
                      </text>
                    </Link>
                  </g>
                  <g transform="translate(25)">
                    <polygon fill="#C2E7FF" points="0 13.982 25.5 29.148 51 13.982 25.5 0" transform="translate(0 11.915)"></polygon>
                    <g transform="translate(7.65 13.617)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                    </g>
                    <g transform="translate(7.65 6.809)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                    </g>
                    <g transform="translate(7.65)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#98D5FF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                      <use fill="#319EEA" xlinkHref="#产品架构-移动端-a"></use>
                      <use fill="#000" filter="url(#产品架构-移动端-b)" xlinkHref="#产品架构-移动端-a"></use>
                    </g>
                  </g>
                </g>
                <g transform="translate(299 2)">
                  <g transform="translate(0 45)">
                    <rect width="66" height="20" y="1" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7">
                      <tspan x="2" y="15.617">Open API</tspan>
                    </text>
                  </g>
                  <g transform="translate(8)">
                    <polygon fill="#C2E7FF" points="0 13.982 25.5 29.148 51 13.982 25.5 0" transform="translate(0 11.915)"></polygon>
                    <g transform="translate(7.65 13.617)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                    </g>
                    <g transform="translate(7.65 6.809)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                    </g>
                    <g transform="translate(7.65)">
                      <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                      <polygon fill="#98D5FF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                      <use fill="#2793DF" xlinkHref="#产品架构-移动端-c"></use>
                      <use fill="#000" filter="url(#产品架构-移动端-d)" xlinkHref="#产品架构-移动端-c"></use>
                    </g>
                  </g>
                </g>
                <g transform="translate(219 2)">
                  <g transform="translate(0 46)">
                    <rect width="51" height="20" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7">
                      <tspan x="19" y="15">AI</tspan>
                    </text>
                  </g>
                  <polygon fill="#C2E7FF" points="0 13.982 25.5 29.148 51 13.982 25.5 0" transform="translate(0 11.915)"></polygon>
                  <g transform="translate(7.65 13.617)">
                    <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                    <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                  </g>
                  <g transform="translate(7.65 6.809)">
                    <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                    <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                  </g>
                  <g transform="translate(7.65)">
                    <polygon fill="#006EBB" points="0 9.787 17.85 9.787 17.85 23.404 0 12.426"></polygon>
                    <polygon fill="#34A1EC" points="17.85 9.787 35.7 9.787 35.7 23.404 17.85 12.426" transform="matrix(-1 0 0 1 53.55 0)"></polygon>
                    <polygon fill="#98D5FF" points="0 9.787 17.85 20.404 35.7 9.787 17.85 0"></polygon>
                    <g fillRule="nonzero">
                      <use fill="#2C98E4" xlinkHref="#产品架构-移动端-e"></use>
                      <use fill="#000" filter="url(#产品架构-移动端-f)" xlinkHref="#产品架构-移动端-e"></use>
                    </g>
                  </g>
                </g>
                <g transform="translate(125)">
                  <g transform="translate(0 47)">
                    <Link href={urlMap[Product.Dora]}>
                      <rect width="62" height="20" y="1" fill="#E0F7FF"></rect>
                      <text fill="#00AAE7">
                        <tspan x="3" y="15.683">内容审核</tspan>
                      </text>
                    </Link>
                  </g>
                  <g transform="translate(6)">
                    <polygon fill="#C2E7FF" points="0 27.732 25.5 42.972 51 27.732 25.5 13.683"></polygon>
                    <g transform="translate(11.9)">
                      <polygon fill="#C1E6FF" points="0 4.941 .297 3.704 13.6 .054 27.008 3.704 27.2 4.941"></polygon>
                      <path fill="url(#产品架构-移动端-g)" d="M27.2,20.9042146 C27.2,28.4609935 21.1110726,34.5869732 13.6,34.5869732 C6.0889274,34.5869732 0,28.4609935 0,20.9042146 L0,4.94099617 L13.6,1.52030651 L27.2,4.94099617 L27.2,20.9042146 Z"></path>
                      <g transform="rotate(45 13.983 16.758)">
                        <use fill="#2C99E4" xlinkHref="#产品架构-移动端-h"></use>
                        <use fill="#000" filter="url(#产品架构-移动端-i)" xlinkHref="#产品架构-移动端-h"></use>
                      </g>
                    </g>
                  </g>
                </g>
                <g transform="translate(124 120)">
                  <g transform="translate(0 46)">
                    <rect width="115" height="20" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7" fontSize="12">
                      <tspan x="10" y="15">视觉数据分析平台</tspan>
                    </text>
                  </g>
                  <g transform="translate(33.96)">
                    <polygon fill="#C2E7FF" points="0 13.982 25.541 29.148 51.081 13.982 25.541 0" transform="translate(0 11.915)"></polygon>
                    <g transform="translate(7.662 13.617)">
                      <polygon fill="#006EBB" points="0 9.787 17.878 9.787 17.878 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.878 9.787 35.757 9.787 35.757 23.404 17.878 12.426" transform="matrix(-1 0 0 1 53.635 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.878 20.404 35.757 9.787 17.878 0"></polygon>
                    </g>
                    <g transform="translate(7.662 6.809)">
                      <polygon fill="#006EBB" points="0 9.787 17.878 9.787 17.878 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.878 9.787 35.757 9.787 35.757 23.404 17.878 12.426" transform="matrix(-1 0 0 1 53.635 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 9.787 17.878 20.404 35.757 9.787 17.878 0"></polygon>
                    </g>
                    <g transform="translate(7.662)">
                      <polygon fill="#006EBB" points="0 9.787 17.878 9.787 17.878 23.404 0 12.426"></polygon>
                      <polygon fill="#34A1EC" points="17.878 9.787 35.757 9.787 35.757 23.404 17.878 12.426" transform="matrix(-1 0 0 1 53.635 0)"></polygon>
                      <polygon fill="#98D5FF" points="0 9.787 17.878 20.404 35.757 9.787 17.878 0"></polygon>
                      <use fill="#319EEA" xlinkHref="#产品架构-移动端-j"></use>
                      <use fill="#000" filter="url(#产品架构-移动端-k)" xlinkHref="#产品架构-移动端-j"></use>
                    </g>
                  </g>
                </g>
                <g stroke="#AAC5FA" strokeWidth="2" transform="translate(46 87)">
                  <polyline points="0 9 0 0 287 0 287 9" transform="matrix(1 0 0 -1 0 9)"></polyline>
                  <line x1="136.214" x2="136.214" y1="9" y2="19" transform="matrix(1 0 0 -1 0 28)"></line>
                  <line x1="110.214" x2="110.214" y2="9" transform="matrix(1 0 0 -1 0 9)"></line>
                  <line x1="199.214" x2="199.214" y2="9" transform="matrix(1 0 0 -1 0 9)"></line>
                </g>
              </g>
            </svg>
          )
          : (
            <svg width="852" height="350" viewBox="0 0 852 350">
              <defs>
                <path id="产品架构-a" d="M42.9935373,24 L51.5002218,29 L43.4089605,33.9222276 L34.4868528,28.9611138 L42.9935373,24 Z M52.5066845,18 L61.013369,23 L52.7832144,27.9222276 L44,22.9611138 L52.5066845,18 Z M32.5066845,18 L41.013369,23 L32.9221078,27.9222276 L24,22.9611138 L32.5066845,18 Z M42.5066845,12 L51.013369,17 L42.5066845,21.9016631 L34,16.9611138 L42.5066845,12 Z"></path>
                <filter id="产品架构-b" width="110.8%" height="118.2%" x="-5.4%" y="-9.1%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
                <path id="产品架构-c" d="M42.6112279,10 L54.115838,16.7433523 L51.461,18.34 L63.7892887,25.5064313 L46.3231665,36.3750476 C38.7824219,31.6547726 34.5978933,28.9822309 33.7695807,28.3574227 L31.2579297,29.8693524 L20,22.9267699 L26.6112279,19 L38.115838,25.7433523 L35.631,27.237 L46.332,34.013 L59.91,25.564 L49.486,19.528 L47.2579297,20.8693524 L36,13.9267699 L42.6112279,10 Z"></path>
                <filter id="产品架构-d" width="109.1%" height="115.2%" x="-4.6%" y="-7.6%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
                </filter>
                <path id="产品架构-e" d="M30.9844423,18.7983669 L31.0247645,18.7986556 C31.0530481,18.7991774 31.0812724,18.8004998 31.1094035,18.8026124 C31.129879,18.8040426 31.1505177,18.8060234 31.1711771,18.8084433 C31.1986625,18.8117542 31.2256485,18.8156603 31.2524923,18.8202916 C31.2658177,18.8225379 31.2795486,18.8251068 31.2932789,18.8278742 C31.3292685,18.8351504 31.3646631,18.843617 31.399701,18.8533486 C31.4019576,18.8539774 31.4039677,18.8545404 31.4059777,18.8551078 L50.689253,24.298607 C51.4865224,24.5236691 51.950388,25.3524326 51.7253259,26.1497021 C51.5002637,26.9469715 50.6715002,27.4108371 49.8742308,27.185775 L42.9730828,25.2369537 L37.4500828,29.1169537 L39.9870159,33.8273345 C40.3797835,34.5567351 40.1068885,35.466432 39.377488,35.8591996 C38.6909934,36.2288632 37.8447898,36.0088742 37.420159,35.373608 L37.3456229,35.2496717 L29.6777701,21.0098604 L29.669852,20.9949633 C29.6562931,20.9691011 29.6434827,20.9428415 29.6314404,20.9162196 L29.6777701,21.0098604 C29.6518867,20.9617928 29.6288941,20.9129423 29.6087326,20.8635083 C29.6002441,20.8425321 29.5919952,20.8208825 29.5842454,20.7990374 C29.5759207,20.7758391 29.5684615,20.7530795 29.561575,20.7302363 C29.5555908,20.710016 29.5498715,20.6894779 29.5445879,20.6688039 C29.5385834,20.645704 29.533298,20.6227167 29.5285718,20.5996814 C29.5226453,20.5704588 29.5174834,20.5409063 29.5132106,20.5111532 C29.5110123,20.4959484 29.5091764,20.4815428 29.507553,20.4671323 C29.5049004,20.4438312 29.5027297,20.4195087 29.5011574,20.395086 C29.499945,20.3751778 29.4991109,20.3561921 29.4986387,20.3372212 L29.4981417,20.3127161 C29.4980238,20.2994622 29.4980827,20.2861856 29.4983202,20.2728893 C29.4989522,20.2441103 29.5002746,20.2158859 29.5023872,20.1877548 C29.5037756,20.1678363 29.5056914,20.1477562 29.5080229,20.1276563 C29.5113829,20.0994287 29.5154346,20.071384 29.5202692,20.0434933 C29.5228312,20.0284605 29.525614,20.01377 29.5286244,19.9990805 C29.5345757,19.9701175 29.5413421,19.9413527 29.5489447,19.912816 C29.5508093,19.9058183 29.5528169,19.8984982 29.5548826,19.8911807 L29.5684758,19.8457793 C29.57569,19.8229943 29.5834458,19.8003791 29.591737,19.7779547 L29.5548826,19.8911807 C29.5710748,19.8338206 29.590392,19.7781863 29.6125974,19.7244101 C29.6242364,19.6965085 29.6368245,19.6685051 29.6502711,19.6408872 C29.6572573,19.6261978 29.6645586,19.6117927 29.6720731,19.5975431 C29.684038,19.5751814 29.6965604,19.552832 29.7096646,19.5307911 C29.72348,19.5072973 29.7378576,19.4845758 29.7527921,19.4623234 C29.7620217,19.4487345 29.7715338,19.4350363 29.7812844,19.4214857 C29.7972044,19.3992838 29.8137557,19.3776087 29.8308472,19.3564493 C29.8439825,19.340153 29.8574385,19.3241629 29.8712544,19.308432 C29.8865399,19.2911462 29.9021648,19.2741958 29.9181496,19.2576371 C29.934538,19.2404492 29.952407,19.2227943 29.9707734,19.2055498 C29.986249,19.191238 30.0015332,19.1774862 30.0170802,19.1640642 C30.0342576,19.1490125 30.052618,19.1338905 30.0714033,19.119162 C30.0912983,19.1037458 30.1109063,19.0891332 30.130848,19.0750125 C30.1483944,19.0624684 30.1668329,19.0500195 30.1856222,19.0379343 C30.2098785,19.0223863 30.2341671,19.0077021 30.2588493,18.9937141 C30.2680017,18.9885205 30.2776096,18.9832123 30.287298,18.9779953 L30.3042298,18.9690124 C30.3291115,18.9560158 30.3543595,18.9437114 30.3799427,18.9321166 L30.287298,18.9779953 C30.3356472,18.9519602 30.3847886,18.92885 30.4345191,18.9086036 C30.4585815,18.8988781 30.4832348,18.889594 30.5081375,18.8809568 C30.5259798,18.8746614 30.5439886,18.8687903 30.5620506,18.8632779 C30.5896286,18.8549893 30.6168366,18.8475301 30.6442765,18.8408368 C30.6619103,18.836434 30.6796793,18.8324486 30.697477,18.828797 C30.7158655,18.8250992 30.7344411,18.8216426 30.7531018,18.8185364 C30.7837286,18.8134144 30.8138651,18.8093776 30.8440167,18.8062689 C30.8498545,18.8056532 30.8564985,18.805005 30.8631509,18.8044013 C30.8959931,18.801481 30.9279862,18.7996592 30.9599371,18.7988639 L30.9844423,18.7983669 L30.9844423,18.7983669 Z M33.9970828,22.7039537 L36.0180828,26.4569537 L39.2500828,24.1869537 L33.9970828,22.7039537 Z M43.6129815,14.0779608 L56.5278335,21.7131397 C57.2409595,22.1347353 57.4772916,23.0546088 57.055696,23.7677348 C56.6341004,24.4808608 55.7142268,24.7171929 55.0011009,24.2955973 L42.0862489,16.6604185 C41.3731229,16.2388229 41.1367908,15.3189493 41.5583864,14.6058233 C41.979982,13.8926973 42.8998555,13.6563652 43.6129815,14.0779608 Z"></path>
                <filter id="产品架构-f" width="114.4%" height="118%" x="-7.2%" y="-9%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
                </filter>
                <linearGradient id="产品架构-g" x1="50%" x2="50%" y1="0%" y2="97.606%">
                  <stop offset="0%" stopColor="#98D5FF"></stop>
                  <stop offset="100%" stopColor="#34A1EC"></stop>
                </linearGradient>
                <polygon id="产品架构-h" points="40 26.667 40 51.651 25.778 51.651 25.778 47.182 35.53 47.18 35.531 26.667"></polygon>
                <filter id="产品架构-i" width="128.1%" height="116%" x="-14.1%" y="-8%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
                <polygon id="产品架构-j" points="26 20.579 45.95 33.73 52 18"></polygon>
                <filter id="产品架构-k" width="115.4%" height="125.4%" x="-7.7%" y="-12.7%" filterUnits="objectBoundingBox">
                  <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
                  <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                  <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
                  <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="translate(0 4)">
                  <g transform="translate(0 109)">
                    <Link href={urlMap[Product.Dora]} className={style.link}>
                      <rect width="120" height="32" fill="#E0F7FF"></rect>
                      <text fill="#00AAE7">
                        <tspan x="11" y="21">智能多媒体服务</tspan>
                      </text>
                    </Link>
                  </g>
                  <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
                  <g transform="translate(18 32)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18 16)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
                    <use fill="#319EEA" xlinkHref="#产品架构-a"></use>
                    <use fill="#000" filter="url(#产品架构-b)" xlinkHref="#产品架构-a"></use>
                  </g>
                </g>
                <g transform="translate(732 4)">
                  <g transform="translate(0 109)">
                    <rect width="120" height="32" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7">
                      <tspan x="30" y="21">Open API</tspan>
                    </text>
                  </g>
                  <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
                  <g transform="translate(18 32)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18 16)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
                    <use fill="#2793DF" xlinkHref="#产品架构-c"></use>
                    <use fill="#000" filter="url(#产品架构-d)" xlinkHref="#产品架构-c"></use>
                  </g>
                </g>
                <g transform="translate(488 4)">
                  <g transform="translate(0 109)">
                    <rect width="120" height="32" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7">
                      <tspan x="54" y="21">AI</tspan>
                    </text>
                  </g>
                  <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
                  <g transform="translate(18 32)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18 16)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                  </g>
                  <g transform="translate(18)">
                    <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                    <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                    <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
                    <g fillRule="nonzero">
                      <use fill="#2C98E4" xlinkHref="#产品架构-e"></use>
                      <use fill="#000" filter="url(#产品架构-f)" xlinkHref="#产品架构-e"></use>
                    </g>
                  </g>
                </g>
                <g transform="translate(244)">
                  <g transform="translate(0 113)">
                    <Link href={urlMap[Product.Censor]} className={style.link}>
                      <rect width="120" height="32" fill="#E0F7FF"></rect>
                      <text fill="#00AAE7">
                        <tspan x="32" y="21">内容审核</tspan>
                      </text>
                    </Link>
                  </g>
                  <polygon fill="#C2E7FF" points="0 64.857 60 100.499 120 64.857 60 32"></polygon>
                  <g transform="translate(28)">
                    <polygon fill="#C1E6FF" points="0 11.556 .698 8.662 32 .127 63.547 8.662 64 11.556"></polygon>
                    <path fill="url(#产品架构-g)" d="M64,48.8888889 C64,66.5620009 49.673112,80.8888889 32,80.8888889 C14.326888,80.8888889 0,66.5620009 0,48.8888889 L0,11.5555556 L32,3.55555556 L64,11.5555556 L64,48.8888889 Z"></path>
                    <g transform="rotate(45 32.889 39.159)">
                      <use fill="#2C99E4" xlinkHref="#产品架构-h"></use>
                      <use fill="#000" filter="url(#产品架构-i)" xlinkHref="#产品架构-h"></use>
                    </g>
                  </g>
                </g>
                <g transform="translate(344 209)">
                  <g transform="translate(0 109)">
                    <rect width="148" height="32" fill="#E0F7FF"></rect>
                    <text fill="#00AAE7">
                      <tspan x="17" y="21">视觉数据分析平台</tspan>
                    </text>
                  </g>
                  <g transform="translate(14)">
                    <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
                    <g transform="translate(18 32)">
                      <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                      <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                    </g>
                    <g transform="translate(18 16)">
                      <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                      <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                      <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
                    </g>
                    <g transform="translate(18)">
                      <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
                      <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
                      <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
                      <use fill="#319EEA" xlinkHref="#产品架构-j"></use>
                      <use fill="#000" filter="url(#产品架构-k)" xlinkHref="#产品架构-j"></use>
                    </g>
                  </g>
                </g>
                <polyline stroke="#AAC5FA" strokeWidth="2" points="60 171 60 151 792 151 792 171" transform="matrix(1 0 0 -1 0 322)"></polyline>
                <line x1="304.5" x2="304.5" y1="151" y2="171" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 322)"></line>
                <line x1="548.5" x2="548.5" y1="151" y2="171" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 322)"></line>
                <line x1="418.5" x2="418.5" y1="171" y2="195" stroke="#AAC5FA" strokeWidth="2" transform="matrix(1 0 0 -1 0 366)"></line>
              </g>
            </svg>
          )
      }
    </Section>
  )
}
