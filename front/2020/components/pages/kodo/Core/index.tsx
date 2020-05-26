/**
 * @file 存储核心功能及服务 index.tsx
 * @description 包含存储核心功能及服务
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'

import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'
import Icon5 from './images/icon5.svg'
import Icon6 from './images/icon6.svg'

export default function KodoCore() {
  return (
    <Feature name="core" title="核心功能及服务">
      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon1 />}
          title="多媒体数据处理"
        >
          <FeatureDesc>基于对象存储，您可以一站式地完成图片处理和音视频处理。</FeatureDesc>
          <FeatureLink href="/products/dora">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon2 />}
          title="跨区域同步"
        >
          <FeatureDesc>跨区域同步让用户通过简单操作即可对不同存储区域的数据进行高效迁移和同步，实现数据异地容灾。</FeatureDesc>
          <FeatureLink href="https://developer.qiniu.com/kodo/manual/1700/cross-regional-synchronization">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon3 />}
          title="生命周期管理"
        >
          <FeatureDesc>生命周期管理让用户可以根据业务需要，为存储空间制定规则，存储对象可自动化定时进行存储类型转化或删除操作。</FeatureDesc>
          <FeatureLink href="https://developer.qiniu.com/kodo/manual/3699/life-cycle-management">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>

      <FeatureGroup>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon4 />}
          title="低频存储"
        >
          <FeatureDesc>低频存储提供了比标准存储更低的价格，适用于数据访问实时，读取频率较低的业务场景（如企业数据备份、监控数据、网盘应用等）。</FeatureDesc>
          <FeatureLink href="https://developer.qiniu.com/kodo/manual/3737/infrequent-storage">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon5 />}
          title="镜像存储"
        >
          <FeatureDesc>镜像存储适用于迁移原有业务系统的已有数据。可以帮助用户实现无缝数据迁移，迁移过程中并不影响原有业务系统的访问。</FeatureDesc>
          <FeatureLink href="https://developer.qiniu.com/kodo/kb/1376/seven-cattle-image-storage-instruction-manuals">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
        <FeatureItem
          pos="top-down"
          align="left"
          icon={<Icon6 />}
          title="上传／下载"
        >
          <FeatureDesc>针对不同的上传 / 下载场景，七牛云提供了丰富的 API 接口和工具供用户使用，同时支持服务端上传和客户端直传，并提供加速服务。</FeatureDesc>
          <FeatureLink href="https://developer.qiniu.com/kodo/manual/1234/upload-types">了解更多 &gt;&gt;</FeatureLink>
        </FeatureItem>
      </FeatureGroup>
    </Feature>
  )
}
