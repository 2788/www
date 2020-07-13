import React from 'react'

// 多媒体数据
export default function MultiMediaDataIcon() {
  return (
    <svg width="120" height="141" viewBox="0 0 120 141">
      <defs>
        <linearGradient id="多媒体数据-a" x1="96.36%" x2="8.878%" y1="56.179%" y2="56.179%">
          <stop offset="0%" stopColor="#647EFF"></stop>
          <stop offset="100%" stopColor="#2C49D6"></stop>
        </linearGradient>
        <filter id="多媒体数据-c" width="115.4%" height="125.4%" x="-7.7%" y="-12.7%" filterUnits="objectBoundingBox">
          <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="1.5"></feGaussianBlur>
          <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
          <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
          <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0.223529412   0 0 0 0 0.325490196   0 0 0 0 0.831372549  0 0 0 1 0"></feColorMatrix>
        </filter>
      </defs>
      <g fill="none">
        <g transform="translate(0 109)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="25" y="21">多媒体数据</tspan>
          </text>
        </g>
        <polygon fill="#DEE9FF" points="0 60.857 60 96.498 120 60.857 60 28"></polygon>
        <g transform="translate(20 32)">
          <path fill="url(#多媒体数据-a)" d="M40,10 C54.582428,10 67.3423096,13.6090028 74.3318094,19.0011345 L80,19 L80,29 L79.9856219,29.0009009 C79.4117084,38.9866069 61.7292361,47 40,47 C18.2707639,47 0.588291642,38.9866069 0.0143780748,29.0009009 L0,29 L0,19 L5.66819061,19.0011345 C12.6576904,13.6090028 25.417572,10 40,10 Z"></path>
          <ellipse cx="40" cy="20" fill="#6D9DFF" rx="40" ry="20"></ellipse>
        </g>
        <g transform="translate(20 16)">
          <path fill="url(#多媒体数据-a)" d="M40,10 C54.582428,10 67.3423096,13.6090028 74.3318094,19.0011345 L80,19 L80,29 L79.9856219,29.0009009 C79.4117084,38.9866069 61.7292361,47 40,47 C18.2707639,47 0.588291642,38.9866069 0.0143780748,29.0009009 L0,29 L0,19 L5.66819061,19.0011345 C12.6576904,13.6090028 25.417572,10 40,10 Z"></path>
          <ellipse cx="40" cy="20" fill="#6D9DFF" rx="40" ry="20"></ellipse>
        </g>
        <g transform="translate(20)">
          <path fill="url(#多媒体数据-a)" d="M40,10 C54.582428,10 67.3423096,13.6090028 74.3318094,19.0011345 L80,19 L80,29 L79.9856219,29.0009009 C79.4117084,38.9866069 61.7292361,47 40,47 C18.2707639,47 0.588291642,38.9866069 0.0143780748,29.0009009 L0,29 L0,19 L5.66819061,19.0011345 C12.6576904,13.6090028 25.417572,10 40,10 Z"></path>
          <ellipse cx="40" cy="20" fill="#A4C2FF" rx="40" ry="20"></ellipse>
          <polygon points="25 15.579 44.95 28.73 51 13" fill="#6D9DFF"></polygon>
          <polygon points="25 15.579 44.95 28.73 51 13" fill="#000" filter="url(#多媒体数据-c)"></polygon>
        </g>
      </g>
    </svg>
  )
}
