import React from 'react'

import animation from '../../animation.less'

// AI
export default function AIIcon() {
  return (
    <svg>
      <defs>
        <filter id="智能视频服务-h" width="114.4%" height="118%" x="-7.2%" y="-9%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
          <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
          <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.0392156863   0 0 0 0 0.466666667   0 0 0 0 0.768627451  0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
      <g transform="translate(356 16)">
        <polygon fill="#C2E7FF" points="0 32.857 60 68.498 120 32.857 60 0" transform="translate(0 28)"></polygon>
        <g className={animation.levitate3}>
          <g transform="translate(18 32)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate2}>
          <g transform="translate(18 16)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#5EBDFF" points="0 23 42 47.949 84 23 42 0"></polygon>
          </g>
        </g>
        <g className={animation.levitate1}>
          <g transform="translate(18)">
            <polygon fill="#006EBB" points="0 23 42 23 42 55 0 29.2"></polygon>
            <polygon fill="#34A1EC" points="42 23 84 23 84 55 42 29.2" transform="matrix(-1 0 0 1 126 0)"></polygon>
            <polygon fill="#98D5FF" points="0 23 42 47.949 84 23 42 0"></polygon>
            <g>
              <path d="M30.9844423,18.7983669 L31.0247645,18.7986556 C31.0530481,18.7991774 31.0812724,18.8004998 31.1094035,18.8026124 C31.129879,18.8040426 31.1505177,18.8060234 31.1711771,18.8084433 C31.1986625,18.8117542 31.2256485,18.8156603 31.2524923,18.8202916 C31.2658177,18.8225379 31.2795486,18.8251068 31.2932789,18.8278742 C31.3292685,18.8351504 31.3646631,18.843617 31.399701,18.8533486 C31.4019576,18.8539774 31.4039677,18.8545404 31.4059777,18.8551078 L50.689253,24.298607 C51.4865224,24.5236691 51.950388,25.3524326 51.7253259,26.1497021 C51.5002637,26.9469715 50.6715002,27.4108371 49.8742308,27.185775 L42.9730828,25.2369537 L37.4500828,29.1169537 L39.9870159,33.8273345 C40.3797835,34.5567351 40.1068885,35.466432 39.377488,35.8591996 C38.6909934,36.2288632 37.8447898,36.0088742 37.420159,35.373608 L37.3456229,35.2496717 L29.6777701,21.0098604 L29.669852,20.9949633 C29.6562931,20.9691011 29.6434827,20.9428415 29.6314404,20.9162196 L29.6777701,21.0098604 C29.6518867,20.9617928 29.6288941,20.9129423 29.6087326,20.8635083 C29.6002441,20.8425321 29.5919952,20.8208825 29.5842454,20.7990374 C29.5759207,20.7758391 29.5684615,20.7530795 29.561575,20.7302363 C29.5555908,20.710016 29.5498715,20.6894779 29.5445879,20.6688039 C29.5385834,20.645704 29.533298,20.6227167 29.5285718,20.5996814 C29.5226453,20.5704588 29.5174834,20.5409063 29.5132106,20.5111532 C29.5110123,20.4959484 29.5091764,20.4815428 29.507553,20.4671323 C29.5049004,20.4438312 29.5027297,20.4195087 29.5011574,20.395086 C29.499945,20.3751778 29.4991109,20.3561921 29.4986387,20.3372212 L29.4981417,20.3127161 C29.4980238,20.2994622 29.4980827,20.2861856 29.4983202,20.2728893 C29.4989522,20.2441103 29.5002746,20.2158859 29.5023872,20.1877548 C29.5037756,20.1678363 29.5056914,20.1477562 29.5080229,20.1276563 C29.5113829,20.0994287 29.5154346,20.071384 29.5202692,20.0434933 C29.5228312,20.0284605 29.525614,20.01377 29.5286244,19.9990805 C29.5345757,19.9701175 29.5413421,19.9413527 29.5489447,19.912816 C29.5508093,19.9058183 29.5528169,19.8984982 29.5548826,19.8911807 L29.5684758,19.8457793 C29.57569,19.8229943 29.5834458,19.8003791 29.591737,19.7779547 L29.5548826,19.8911807 C29.5710748,19.8338206 29.590392,19.7781863 29.6125974,19.7244101 C29.6242364,19.6965085 29.6368245,19.6685051 29.6502711,19.6408872 C29.6572573,19.6261978 29.6645586,19.6117927 29.6720731,19.5975431 C29.684038,19.5751814 29.6965604,19.552832 29.7096646,19.5307911 C29.72348,19.5072973 29.7378576,19.4845758 29.7527921,19.4623234 C29.7620217,19.4487345 29.7715338,19.4350363 29.7812844,19.4214857 C29.7972044,19.3992838 29.8137557,19.3776087 29.8308472,19.3564493 C29.8439825,19.340153 29.8574385,19.3241629 29.8712544,19.308432 C29.8865399,19.2911462 29.9021648,19.2741958 29.9181496,19.2576371 C29.934538,19.2404492 29.952407,19.2227943 29.9707734,19.2055498 C29.986249,19.191238 30.0015332,19.1774862 30.0170802,19.1640642 C30.0342576,19.1490125 30.052618,19.1338905 30.0714033,19.119162 C30.0912983,19.1037458 30.1109063,19.0891332 30.130848,19.0750125 C30.1483944,19.0624684 30.1668329,19.0500195 30.1856222,19.0379343 C30.2098785,19.0223863 30.2341671,19.0077021 30.2588493,18.9937141 C30.2680017,18.9885205 30.2776096,18.9832123 30.287298,18.9779953 L30.3042298,18.9690124 C30.3291115,18.9560158 30.3543595,18.9437114 30.3799427,18.9321166 L30.287298,18.9779953 C30.3356472,18.9519602 30.3847886,18.92885 30.4345191,18.9086036 C30.4585815,18.8988781 30.4832348,18.889594 30.5081375,18.8809568 C30.5259798,18.8746614 30.5439886,18.8687903 30.5620506,18.8632779 C30.5896286,18.8549893 30.6168366,18.8475301 30.6442765,18.8408368 C30.6619103,18.836434 30.6796793,18.8324486 30.697477,18.828797 C30.7158655,18.8250992 30.7344411,18.8216426 30.7531018,18.8185364 C30.7837286,18.8134144 30.8138651,18.8093776 30.8440167,18.8062689 C30.8498545,18.8056532 30.8564985,18.805005 30.8631509,18.8044013 C30.8959931,18.801481 30.9279862,18.7996592 30.9599371,18.7988639 L30.9844423,18.7983669 L30.9844423,18.7983669 Z M33.9970828,22.7039537 L36.0180828,26.4569537 L39.2500828,24.1869537 L33.9970828,22.7039537 Z M43.6129815,14.0779608 L56.5278335,21.7131397 C57.2409595,22.1347353 57.4772916,23.0546088 57.055696,23.7677348 C56.6341004,24.4808608 55.7142268,24.7171929 55.0011009,24.2955973 L42.0862489,16.6604185 C41.3731229,16.2388229 41.1367908,15.3189493 41.5583864,14.6058233 C41.979982,13.8926973 42.8998555,13.6563652 43.6129815,14.0779608 Z" fill="#2C98E4"></path>
              <path d="M30.9844423,18.7983669 L31.0247645,18.7986556 C31.0530481,18.7991774 31.0812724,18.8004998 31.1094035,18.8026124 C31.129879,18.8040426 31.1505177,18.8060234 31.1711771,18.8084433 C31.1986625,18.8117542 31.2256485,18.8156603 31.2524923,18.8202916 C31.2658177,18.8225379 31.2795486,18.8251068 31.2932789,18.8278742 C31.3292685,18.8351504 31.3646631,18.843617 31.399701,18.8533486 C31.4019576,18.8539774 31.4039677,18.8545404 31.4059777,18.8551078 L50.689253,24.298607 C51.4865224,24.5236691 51.950388,25.3524326 51.7253259,26.1497021 C51.5002637,26.9469715 50.6715002,27.4108371 49.8742308,27.185775 L42.9730828,25.2369537 L37.4500828,29.1169537 L39.9870159,33.8273345 C40.3797835,34.5567351 40.1068885,35.466432 39.377488,35.8591996 C38.6909934,36.2288632 37.8447898,36.0088742 37.420159,35.373608 L37.3456229,35.2496717 L29.6777701,21.0098604 L29.669852,20.9949633 C29.6562931,20.9691011 29.6434827,20.9428415 29.6314404,20.9162196 L29.6777701,21.0098604 C29.6518867,20.9617928 29.6288941,20.9129423 29.6087326,20.8635083 C29.6002441,20.8425321 29.5919952,20.8208825 29.5842454,20.7990374 C29.5759207,20.7758391 29.5684615,20.7530795 29.561575,20.7302363 C29.5555908,20.710016 29.5498715,20.6894779 29.5445879,20.6688039 C29.5385834,20.645704 29.533298,20.6227167 29.5285718,20.5996814 C29.5226453,20.5704588 29.5174834,20.5409063 29.5132106,20.5111532 C29.5110123,20.4959484 29.5091764,20.4815428 29.507553,20.4671323 C29.5049004,20.4438312 29.5027297,20.4195087 29.5011574,20.395086 C29.499945,20.3751778 29.4991109,20.3561921 29.4986387,20.3372212 L29.4981417,20.3127161 C29.4980238,20.2994622 29.4980827,20.2861856 29.4983202,20.2728893 C29.4989522,20.2441103 29.5002746,20.2158859 29.5023872,20.1877548 C29.5037756,20.1678363 29.5056914,20.1477562 29.5080229,20.1276563 C29.5113829,20.0994287 29.5154346,20.071384 29.5202692,20.0434933 C29.5228312,20.0284605 29.525614,20.01377 29.5286244,19.9990805 C29.5345757,19.9701175 29.5413421,19.9413527 29.5489447,19.912816 C29.5508093,19.9058183 29.5528169,19.8984982 29.5548826,19.8911807 L29.5684758,19.8457793 C29.57569,19.8229943 29.5834458,19.8003791 29.591737,19.7779547 L29.5548826,19.8911807 C29.5710748,19.8338206 29.590392,19.7781863 29.6125974,19.7244101 C29.6242364,19.6965085 29.6368245,19.6685051 29.6502711,19.6408872 C29.6572573,19.6261978 29.6645586,19.6117927 29.6720731,19.5975431 C29.684038,19.5751814 29.6965604,19.552832 29.7096646,19.5307911 C29.72348,19.5072973 29.7378576,19.4845758 29.7527921,19.4623234 C29.7620217,19.4487345 29.7715338,19.4350363 29.7812844,19.4214857 C29.7972044,19.3992838 29.8137557,19.3776087 29.8308472,19.3564493 C29.8439825,19.340153 29.8574385,19.3241629 29.8712544,19.308432 C29.8865399,19.2911462 29.9021648,19.2741958 29.9181496,19.2576371 C29.934538,19.2404492 29.952407,19.2227943 29.9707734,19.2055498 C29.986249,19.191238 30.0015332,19.1774862 30.0170802,19.1640642 C30.0342576,19.1490125 30.052618,19.1338905 30.0714033,19.119162 C30.0912983,19.1037458 30.1109063,19.0891332 30.130848,19.0750125 C30.1483944,19.0624684 30.1668329,19.0500195 30.1856222,19.0379343 C30.2098785,19.0223863 30.2341671,19.0077021 30.2588493,18.9937141 C30.2680017,18.9885205 30.2776096,18.9832123 30.287298,18.9779953 L30.3042298,18.9690124 C30.3291115,18.9560158 30.3543595,18.9437114 30.3799427,18.9321166 L30.287298,18.9779953 C30.3356472,18.9519602 30.3847886,18.92885 30.4345191,18.9086036 C30.4585815,18.8988781 30.4832348,18.889594 30.5081375,18.8809568 C30.5259798,18.8746614 30.5439886,18.8687903 30.5620506,18.8632779 C30.5896286,18.8549893 30.6168366,18.8475301 30.6442765,18.8408368 C30.6619103,18.836434 30.6796793,18.8324486 30.697477,18.828797 C30.7158655,18.8250992 30.7344411,18.8216426 30.7531018,18.8185364 C30.7837286,18.8134144 30.8138651,18.8093776 30.8440167,18.8062689 C30.8498545,18.8056532 30.8564985,18.805005 30.8631509,18.8044013 C30.8959931,18.801481 30.9279862,18.7996592 30.9599371,18.7988639 L30.9844423,18.7983669 L30.9844423,18.7983669 Z M33.9970828,22.7039537 L36.0180828,26.4569537 L39.2500828,24.1869537 L33.9970828,22.7039537 Z M43.6129815,14.0779608 L56.5278335,21.7131397 C57.2409595,22.1347353 57.4772916,23.0546088 57.055696,23.7677348 C56.6341004,24.4808608 55.7142268,24.7171929 55.0011009,24.2955973 L42.0862489,16.6604185 C41.3731229,16.2388229 41.1367908,15.3189493 41.5583864,14.6058233 C41.979982,13.8926973 42.8998555,13.6563652 43.6129815,14.0779608 Z" fill="#000" filter="url(#智能视频服务-h)"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
