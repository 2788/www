/* eslint-disable react/no-danger */
import React from 'react'
import { Table } from 'react-icecream'
import { ColumnProps } from 'react-icecream/lib/table'

// 渲染模板
function renderTemplate(text: string) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}

const columns: Array<ColumnProps<any>> = [
  {
    title: '资源类型',
    dataIndex: 'type',
    width: 125,
    render(type, _, idx) {
      const result = { children: type, props: {} as { rowSpan: number; colSpan: number } }

      // 弹性公网 IP
      if (idx === 4) {
        result.props.rowSpan = 3
      }

      if (idx === 5 || idx === 6) {
        result.props.rowSpan = 0
      }

      // VPN 网关
      if (idx === 8) {
        result.props.rowSpan = 3
      }

      if (idx > 8 && idx <= 10) {
        result.props.rowSpan = 0
      }

      // RDS 云数据库
      if (idx === 15) {
        result.props.rowSpan = 5
      }

      if (idx > 15 && idx <= 19) {
        result.props.rowSpan = 0
      }

      // MongoDB 云数据库
      if (idx === 20) {
        result.props.rowSpan = 2
      }

      if (idx === 21) {
        result.props.rowSpan = 0
      }

      // BGP 高防 IP
      if (idx === 22) {
        result.props.rowSpan = 4
      }

      if (idx > 22 && idx <= 25) {
        result.props.rowSpan = 0
      }

      // 新 BGP 高防 IP
      if (idx === 26) {
        result.props.rowSpan = 6
      }

      if (idx > 26 && idx <= 31) {
        result.props.rowSpan = 0
      }

      return result
    }
  },
  {
    title: '计费模式',
    dataIndex: 'mode',
    width: 170,
    render(mode, _, idx) {
      const result = { children: renderTemplate(mode), props: {} as { rowSpan: number; colSpan: number } }

      // 弹性公网 IP
      if (idx === 5) {
        result.props.rowSpan = 2
      }

      if (idx === 6) {
        result.props.rowSpan = 0
      }

      // VPN 网关
      if (idx === 8) {
        result.props.rowSpan = 3
      }

      if (idx > 8 && idx <= 10) {
        result.props.rowSpan = 0
      }

      // RDS 云数据库
      if (idx === 15) {
        result.props.rowSpan = 2
      }

      if (idx === 16) {
        result.props.rowSpan = 0
      }

      if (idx === 17) {
        result.props.rowSpan = 3
      }

      if (idx > 17 && idx <= 19) {
        result.props.rowSpan = 0
      }

      // MongoDB 云数据库
      if (idx === 20) {
        result.props.rowSpan = 2
      }

      if (idx === 21) {
        result.props.rowSpan = 0
      }

      // BGP 高防 IP
      if (idx === 23) {
        result.props.rowSpan = 3
      }

      if (idx > 23 && idx <= 25) {
        result.props.rowSpan = 0
      }

      // 新 BGP 高防 IP
      if (idx === 28) {
        result.props.rowSpan = 4
      }

      if (idx > 28 && idx <= 31) {
        result.props.rowSpan = 0
      }

      return result
    }
  },
  {
    title: '类别',
    dataIndex: 'category',
    width: 300,
    render(category, _, __) {
      return renderTemplate(category)
    }
  },
  {
    title: '描述',
    dataIndex: 'desc',
    render(desc, _, idx) {
      const result = { children: renderTemplate(desc), props: {} as { rowSpan: number; colSpan: number } }

      // 弹性公网 IP
      if (idx === 5) {
        result.props.rowSpan = 2
      }

      if (idx === 6) {
        result.props.rowSpan = 0
      }

      return result
    }
  }
]

const data = [
  {
    key: 0,
    type: '实例',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: 'X86 实例集群<br />GPU 实例集群',
    desc: '<strong>费用：</strong>实例规格 vCPU 和内存'
  },
  {
    key: 1,
    type: '镜像',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '公共镜像<br />私有镜像<br />自定义镜像',
    desc: 'Windows Server 海外镜像收费<br />其他类型镜像及地域免费'
  },
  {
    key: 2,
    type: '块存储',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '高效云盘<br />SSD 云盘<br />ESSD云盘<br />本地盘',
    desc:
      '<strong>云盘：</strong>收取云盘容量费用，可以用作系统盘和数据盘。<br /><strong>本地盘：</strong>此处本地盘指与特定实例规格绑定的本地盘，不支持单独购买，且费用计入实例规格。<br /><br />说明：单独购买磁盘只支持按量付费模式'
  },
  {
    key: 3,
    type: '快照',
    mode: '按量付费（后付费）',
    category: '无',
    desc: '收取快照容量/时长费用'
  },
  {
    key: 4,
    type: '弹性公网 IP',
    mode: '包年包月（预付费）',
    category: '按固定带宽计费',
    desc: '<strong>带宽费：</strong>根据 EIP 带宽大小计费<br /><strong>配置费：</strong>0.02 ～ 0.06 元/个/小时'
  },
  {
    key: 5,
    type: '弹性公网 IP',
    mode: '按量付费（后付费)',
    category: '按固定带宽计费',
    desc: '<strong>带宽/流量费：</strong>根据 EIP 带宽/流量计费<br /><strong>配置费：</strong>0.02 ～ 0.06 元/个/小时'
  },
  {
    key: 6,
    type: '弹性公网 IP',
    mode: '按量付费（后付费)',
    category: '按使用流量计费',
    desc: ''
  },
  {
    key: 7,
    type: 'NAT 网关',
    mode: '按量付费（后付费）',
    category: '小型<br />中型<br />大型<br />超大型',
    desc: '<strong>费用</strong> = NAT 网关实例费+弹性公网 IP 费'
  },
  {
    key: 8,
    type: 'VPN 网关',
    mode: '包年包月（预付费）',
    category: '只开启 IPsec - VPN 功能',
    desc: '<strong>VPN 网关费用</strong> =（ IPsec - VPN 实例费 + 带宽费）x 购买时长'
  },
  {
    key: 9,
    type: 'VPN 网关',
    mode: '包年包月（预付费）',
    category: '只开启 SSL - VPN 功能',
    desc: '<strong>VPN 网关费用</strong> =（SSL - VPN实例费 + 带宽费 + SSL 规格费）x 购买时长'
  },
  {
    key: 10,
    type: 'VPN 网关',
    mode: '包年包月（预付费）',
    category: '同时开启 IPsec - VPN 和 SSL - VPN 功能',
    desc: '<strong>VPN 网关费用</strong> =（ IPsec - VPN 实例费 + SSL - VPN 实例费 + 带宽费 + SSL 规格费）x 购买时长'
  },
  {
    key: 11,
    type: '共享带宽',
    mode: '包年包月（预付费）<bt />按量付费（后付费）',
    category: '按固定带宽计费',
    desc: '<strong>费用</strong> = 按带宽计费 时长'
  },
  {
    key: 12,
    type: '云企业网',
    mode: '包年包月（预付费）',
    category: '带宽包费用<br /><br /><i>说明：跨地域才需带宽包</i>',
    desc: '<strong>费用</strong> = 带宽包大小（元/月） 购买时长'
  },
  {
    key: 13,
    type: '负载均衡',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '规格费用',
    desc: '<strong>费用</strong> = 所选规格费单价（元/月）× 购买时长'
  },
  {
    key: 14,
    type: '弹性伸缩',
    mode: '免费',
    category: '免费',
    desc: '开通弹性伸缩服务免费，弹性伸缩下的  实例收费'
  },
  {
    key: 15,
    type: 'RDS 云数据库',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '实例',
    desc: 'RDS 实例规格的费用。计费方式为包年包月或按量付费。'
  },
  {
    key: 16,
    type: 'RDS 云数据库',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '存储空间',
    desc: 'RDS 实例存储空间的费用。计费方式为包年包月或按量付费，与实例的计费方式一致。'
  },
  {
    key: 17,
    type: 'RDS 云数据库',
    mode: '按量付费（后付费）',
    category: '只读实例（可选）',
    desc: 'RDS 只读实例规格的费用。按量付费，费用取决于扣费时的只读实例规格。'
  },
  {
    key: 18,
    type: 'RDS 云数据库',
    mode: '按量付费（后付费）',
    category: '备份空间（可选）<br /><br/><strong>说明：超出免费备份空间的部分需按量付费。</strong>',
    desc: '备份文件占用空间的费用。<br /><br /><strong>备份空间的免费额度</strong> = 50% 实例购买的存储空间。<br />'
  },
  {
    key: 19,
    type: 'RDS 云数据库',
    mode: '按量付费（后付费）',
    category: '公网流量（可选）',
    desc: '申请外网地址后并使用外网地址连接 RDS ，会产生外网流量。价格为 1 元/GB。'
  },
  {
    key: 20,
    type: 'MongoDB 云数据库',
    mode: '包年包月（预付费）<br />按量付费（后付费）',
    category: '副本集实例',
    desc: '<strong>规格费用：</strong>根据实例规格和购买时长产生费用<br /><strong>磁盘空间费用：</strong>MongoDB实例存储空间的费用。计费方式为包年包月或按量付费，与实例的计费方式一致。'
  },
  {
    key: 21,
    type: '',
    mode: '',
    category: '分片集群实例（即将支持）',
    desc: `
      <strong>集群版本组成</strong> = mongos + shard + configserver<br />
      <strong>集群版本费用</strong> = mongos 规格费用 + shard（规格和磁盘空间费用） + configserve（规格和磁盘空间费用）<br />
      <br />
      <i>说明：</i><br />
      <i>1. shard 和 configserver 组件磁盘空间按量付费价格 0.0047 元/G</i><br />
      <i>2. shard 组件磁盘空间为 10 - 2000 G，步长 10 G 递增。</i><br />
      <i>3. configserver 组件配置为 20 G，不可修改。</i>
    `
  },
  {
    key: 22,
    type: 'BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '保底防护带宽',
    desc: '根据带宽规格和购买时长产生费用'
  },
  {
    key: 23,
    type: 'BGP 高防 IP',
    mode: '按量付费（后付费）',
    category: '弹性防护带宽',
    desc: '弹性防护免费开启，未发生弹性防护不收费。发生弹性防护后，取当天弹性防护峰值按区间单独按天结算。'
  },
  {
    key: 24,
    type: 'BGP 高防 IP',
    mode: '按量付费（后付费）',
    category: '转发规则数',
    desc: '默认免费为每个高防 IP 提供 60 个转发规则数。'
  },
  {
    key: 25,
    type: 'BGP 高防 IP',
    mode: '按量付费（后付费）',
    category: '转发流量费用<br></br><i>说明：清洗后转发回源站的业务流量所用的带宽。</i>',
    desc: '按转发流量收费 0.80 元/GB ，带宽限制 100 Mb 说明带宽以内。'
  },
  {
    key: 26,
    type: '新 BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '保底防护带宽',
    desc: '根据带宽规格和购买时长产生费用'
  },
  {
    key: 27,
    type: '新 BGP 高防 IP',
    mode: '按量付费（后付费）',
    category: '弹性防护带宽',
    desc: '弹性防护免费开启，未发生弹性防护不收费。发生弹性防护后，取当天弹性防护峰值按区间单独按天结算。'
  },
  {
    key: 28,
    type: '新 BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '防护域名数<br /><br /><i>说明：实例支持添加的 HTTP/HTTPS 域名数量。</i>',
    desc: `
      默认 50 个，增加数量计费参考如下：<br />
      <br />
      标准功能套餐：每 10 个域名 285 元/月<br />
      增强功能套餐：每 10 个域名 475 元/月<br />
    `
  },
  {
    key: 29,
    type: '新 BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '防护端口数<br /><br /><i>说明：实例支持添加的 TCP/UDP 端口数量。</i>',
    desc: '默认 50 个，增加数量计费每 10 个端口：475 元/月。'
  },
  {
    key: 30,
    type: '新 BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '业务带宽<br /><br /><i>说明：实例支持处理的无攻击情况下最大业务流量。</i>',
    desc: '默认 100 Mb，增加每 1 Mb ：95 元/月'
  },
  {
    key: 31,
    type: '新 BGP 高防 IP',
    mode: '包年包月（预付费）',
    category: '业务 QPS<br /><br /><i>说明：实例支持处理的无攻击情况下最大 HTTP/HTTPS 业务的并发请求速率。</i>',
    desc: '默认 3,000 QPS，增加每 100 QPS ：950 元/月'
  },
  {
    key: 32,
    type: 'Nas 文件存储',
    mode: '按量付费（后付费）',
    category: '性能型<br>容量型',
    desc: `
      每小时实际存储空间的最大值（峰值）<br />
      <br />
      <strong>费用</strong> = 每小时文件系统最大存储空间（峰值）* 每小时单价
    `
  }
]

export default function OverallSection() {
  return <Table bordered scroll={{ x: 'max-content' }} pagination={false} columns={columns} dataSource={data} />
}
