import React from 'react'

import animation from '../../animation.less'

export default function CDNIcon() {
  return (
    <svg width="64" height="76" viewBox="0 0 64 76" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M32 12L59.7128 28V60L32 76L4.28719 60V28L32 12Z" fill="#46BEFF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M32.0054 75.9968L31.9999 76L4.28711 60V28L4.32051 27.9807L9.76149 31.1221V56.9137L32.0054 69.7562V75.9968Z" fill="#079FF1" />
      <g clipPath="url(#clip0_731_4219)">
        <path fillRule="evenodd" clipRule="evenodd" d="M32 18.2439L54.3054 31.1219V56.878L32 69.7561L9.69456 56.878V31.1219L32 18.2439Z" fill="#AAE9FF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M54.3055 56.8426L54.2439 56.8782L31.9385 44.0001V18.2794L32 18.2439L54.3055 31.1219V56.8426Z" fill="#97E4FF" />
      </g>
      <g className={animation.levitate1}>
        <path fillRule="evenodd" clipRule="evenodd" d="M46.7406 34.5854L31.8703 26L17 34.5854V34.7561L31.8703 43.3415L46.7406 34.7561L46.7406 34.5854Z" fill="#66D7FF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M46.6578 34.8293L46.9115 34.9758V52.1465L32.083 60.7078L31.8293 60.5613V43.3906L46.6578 34.8293Z" fill="#46BEFF" />
        <path fillRule="evenodd" clipRule="evenodd" d="M31.6578 60.8293L31.9115 60.6829V43.5122L17.083 34.9509L16.8293 35.0974V52.2681L31.6578 60.8293Z" fill="#2BB3FD" />
      </g>
      <defs>
        <clipPath id="clip0_731_4219">
          <rect width="51.5122" height="51.5122" fill="white" transform="translate(6.2439 18.2439)" />
        </clipPath>
      </defs>
    </svg>
  )
}
