import { IDemoCardProps } from 'components/pages/pandora-demos/DemoCard'

export const maintenanceDemos: IDemoCardProps[] = [
  {
    title: '异常检测 & 预测分析',
    content:
      '结合机器学习能力，通过日志实时分析秒级聚合亿级数据，识别异常问题，同时还能够深入调查快速定位问题原因。预测分析能力可以在故障或问题发生前提前针对事件告警，从而采取相应措施比如提前规划容量，防止即将发生的业务中断等，保障系统稳定、高效、长期可靠运行。通常应用于如故障检测、入侵检测、设备或系统健康度检测、预测性维护等各种领域，协助用户深入洞察服务运行状况和性能。'
  },
  {
    title: '服务器监控',
    link: 'https://pandora-express.qiniu.com/apps/application/metrics/metrics-overview',
    content:
      '提供开箱即用的一站式服务器监控解决方案，包括服务器资源使用情况概览、报警事件概览、报警规则管理、机器/机器组管理模块，实时监控机器/机器集群的硬件资源、性能等，分析判断服务器的异常问题、性能瓶颈及安全隐患，并完成告警配置管理，提升企业 IT 运维效率。'
  },
  {
    title: '全链路追踪',
    link: 'https://pandora-express.qiniu.com/apps/application/traceViz/chart',
    content:
      '全链路追踪监控应用性能，兼容 zipkin、pinpoint、skywalking 和 jaeger 等开源 Tracing 方案。采集埋点日志数据，实时分析得出同一次请求上各服务间的调用链关系，定位性能消耗原因、辅助性能优化、进行异常定位等。'
  },
  {
    title: 'K8S 日志分析',
    link: 'https://pandora-express.qiniu.com/apps/application/kubenetesDashboard/Nodes',
    content: `采集 Kubernetes 集群日志，面向基础架构和业务应用的不同场景下全景监控及下钻分析。
1、支持跨 Kubernetes 堆栈的全面可观测。
2、使用 Kubernetes 模型实时监控应用端到端的服务质量快速定位故障。
3、实现端到端安全风险的实时监控，利用机器学习自动发现异常。`
  },
  {
    title: 'AWS CloudTrail',
    content: `采集并实时分析 AWS ClouTrail 日志，并与其他 AWS 服务数据集成实现全面实时监控分析。
1、审计用户操作及行为活动，针对可疑活动实时告警。
2、监视平台配置更改情况，例如新的 VM 配置，ACL 更改等。
3、监控 AWS 服务的账户设置，使用情况和账单状态等。`
  },
  {
    title: '阿里云日志分析',
    content:
      '快速高效采集分析阿里云产品日志，包括 ECS、OSS、RDS、SLB 等，采集云产品的操作信息、运行状况、业务动态等数据，开箱即用，实现数据采集、分析可视化及告警全生命周期管理。'
  },
  {
    title: 'Windows',
    content: `集中监控 windows 操作系统环境及性能。
实时分析 windows server 日志快速定位故障并隔离系统中的问题，确定性能瓶颈，通过机器学习检测异常，并将 Windows 事件与 IT 基础架构相关联，另外结合监控分析用户使用行为及交互模式，提升系统安全性和可用性。`
  },
  {
    title: 'Linux',
    link: 'https://pandora-express.qiniu.com/apps/application/linux/overview',
    content: `集中监控 linux 操作系统环境
1、使用机器学习感知并防范对环境的已知和未知威胁，发现安全事件简化安全性和合规审计工作。
2、统一采集 Linux 环境服务器、应用程序、安全、进程等日志和指标数据并作关联分析，实时设置访问、安全事件告警规则，快速定位故障，洞察操作系统性能，提高系统可靠性。`
  },
  {
    title: 'Nginx',
    link: 'https://pandora-express.qiniu.com/apps/application/Nginx/overview',
    content:
      '分析 NGINX 服务使用情况、性能和用户访问链路，跟踪用户行为、快速定位故障及了解关键瓶颈以优化用户体验。'
  },
  {
    title: 'Apache',
    link: 'https://pandora-express.qiniu.com/apps/application/Apache/overview',
    content:
      '采集并实时分析 Apache 的 access 和 error 日志，进行可视化展现，通过内置解析和分析模型深入详细分析。洞察用户访问行为，快速发现所有不同类型的访客以及定位问题请求，提高服务器性能。查看访问者使用资产，以便优化网络，改善用户体验。'
  },
  {
    title: 'Mysql',
    link: 'https://pandora-express.qiniu.com/apps/application/mysql/overview',
    content: `汇总并监视您的关键 MySQL 基础结构日志
1、轻松汇总所有 MySQL 日志，以获得全面的可见性。
2、使用预建的仪表板，搜索和警报，可轻松进行实时监控。
3、获得对复制问题的见解，尤其是在大规模环境中。`
  }
]

export const securityDemos: IDemoCardProps[] = [
  {
    title: '内部操作审计',
    content: `统一接入业务系统不同数据源，包括办公系统、业务系统、资产管理系统、风控系统、人事管理系统等，全面分析内控风险，建设企业内部数字化风险管理平台。
1、可视化配置风险规则，实时分析通过报表及告警输出结果。
2、统一管控平台打破信息孤岛，从全局评估事件或人员风险 `
  },
  {
    title: '车联网安全分析',
    link: 'https://pandora-express.qiniu.com/apps/application/car_security_events/screen',
    content:
      '统一采集车辆、app 端、云端及通信数据，实时展现网联车运行状态，针对网联车面临的各类安全风险，使用分析模型从协议层、事务层、环境层和行为层分析识别各类已知及未知威胁，比如车辆与云端服务中心的通信数据是否存在恶意代码，根据车辆状态数据分析是否存在异常指令，是否存在身份盗窃等。'
  },
  {
    title: '阿里云安全日志分析',
    content:
      '支持采集阿里云安全类日志包括操作审计日志、WAF、安骑士等，实现日志实时检索和分析，针对特定操作和安全事件进行实时监控和告警，确保关键业务异常时及时响应，针对操作异常进行实时排查与问题分析。'
  },
  {
    title: 'IT 安全分析',
    content:
      '互联网面临的安全威胁和攻击不断增加也日益多样化，pandora 提供多种安全数据源的接入，包括防火墙、DNS 服务器、路由器和防病毒应用程序等，进行典型安全场景的威胁识别与关联分析，实现安全事件管理，全面构建基于日志的安全分析管理系统，提升安全可见性，实现风险可知、事件可控、态势可见。'
  },
  {
    title: 'PCI 合规 Windows',
    link: 'https://pandora-express.qiniu.com/apps/application/pci_for_windows/pci_compliance_for_windows_system_service',
    content: `Windows PCI 合规性 App，可以满足不断发展的 PCI 要求，减轻监管合规负担。
1、通过日志快速检索及自定义数据可视化轻松满足 PCI 审核要求。
2、实时监控所有基础架构，发现安全漏洞。通过自定义规则或内置机器学习算法驱动主动分析，检测关键事件。`
  },
  {
    title: 'PCI 合规 Linux',
    link: 'https://pandora-express.qiniu.com/apps/application/pci_for_linux/pci_compliance_for_linux_system_monitoring',
    content: `Linux PCI 合规性 App，可以满足不断发展的 PCI 要求，减轻监管合规负担。
1、通过日志快速检索及自定义数据可视化轻松满足 PCI 审核要求。
2、实时监控所有基础架构，发现安全漏洞。通过自定义规则或内置机器学习算法驱动主动分析，检测关键事件。`
  },
  {
    title: '等保合规审计',
    content:
      '根据《中华人民共和国网络安全法》、《信息系统安全等级保护基本要求》等对日志审计提出的规范要求，日志审计是企业满足合规内控要求的必备功能。pandora 协助企业满足等保合规要求，针对海量异构日志进行高效采集、关联分析及统一管理，并实现安全事件管理的事前预警、事中处理及事后取证。'
  }
]

export const BIDemos: IDemoCardProps[] = [
  {
    title: '大屏应用',
    link: 'https://pandora-express.qiniu.com/apps/application/monitorViz/screen',
    content: `自定义数据可视化大屏应用，帮助数据分析师更专注业务，轻松搭建专业水准的可视化大屏，满足运维监控、业务运营等全面展示需求。 
1、提供丰富的模板，支持接入自定义组件。
2、支持接入多种数据源包括各种数据库、本地 CSV 等。
3、可视化配置界面通过拖拽即可完成大屏搭建。`
  },
  {
    title: '交易追踪\n &\n 业务链路分析',
    link: 'https://pandora-express.qiniu.com/apps/application/traceViz/chart',
    content:
      '通过唯一字段关联业务日志，实现端到端业务全链路监控及可视化，实时统计分析交易链路关键指标，快速调查业务流程中的任何问题，发现瓶颈和影响。'
  },
  {
    title: '游戏业务分析',
    content: `1、用户分析：统计平台核心 KPI，分析用户属性分布，用户活跃度。
2、用户标签：针对单个用户展现游戏行为流程，并针对用户行为及局况数据多维分析进行用户标签分类，实时根据预置规则判断新用户归属标签，便于精细化运营。
3、活动分析：分析活动或游戏配置变化后不同的用户行为趋势，评估活动效果。`
  },
  {
    title: '金融风控',
    content:
      '在国家监管日益趋严环境下，通过海量异构数据智能化分析结合机器学习、知识图谱等，建立模型有效识别及预测信贷过程中面临的各类欺诈风险或异常情况，进行拦截和风险提示，提升金融机构监测违约风险的能力，进一步降低不良贷款水平，辅助金融机构系统和流程建设的规范化。'
  }
]
