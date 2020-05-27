/**
 * @file 公司介绍 七牛云点点滴滴
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'
import classnames from 'classnames'

import { useMobile } from 'hooks/ua'
import Section from 'components/Product/Section'

import styles from './style.less'

export interface TimeNodeProps {
  year: number
  height?: number
}

function TimeNode({ year, height, children }: PropsWithChildren<TimeNodeProps>) {
  const isMobile = useMobile()
  return (
    <div className={styles.node} style={{ height: isMobile ? 'auto' : height }}>
      <div className={styles.year}>{year}</div>
      {children}
    </div>
  )
}

export interface EventProps {
  title: string
  content: string
  position: 'left' | 'right'
  top?: number
}

function Event({ title, content, position, top }: EventProps) {
  const isMobile = useMobile()
  return (
    <div className={classnames(styles.event, !isMobile && styles[position])} style={{ top: !isMobile && top ? `${top}px` : '0' }}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.content}>{content}</p>
    </div>
  )
}

export default function Timeline() {
  return (
    <Section title="七牛点点滴滴" name="timeline" header="七牛云点点滴滴">
      <div className={styles.timeline}>
        <TimeNode year={2011} height={160}>
          <Event title="2011 年 08 月" content="七牛云成立" position="left" top={40} />
          <Event title="2011 年 12 月" content="云平台上线运营" position="right" top={60} />
        </TimeNode>
        <TimeNode year={2012} height={160}>
          <Event title="2012 年 02 月" content="获得数百万元 A 轮融资，由经纬中国投资" position="left" top={40} />
          <Event title="2012 年 12 月" content="七牛云著作《Go 语言编程》被评为“2012 年度十大图书之一”" position="right" top={100} />
        </TimeNode>
        <TimeNode year={2013} height={140}>
          <Event title="2013 年 01 月" content="获得启明创投、经纬中国千万美元 B 轮投资" position="left" top={40} />
        </TimeNode>
        <TimeNode year={2014} height={240}>
          <Event title="2014 年 07 月" content="存储 2.0 上线，节省单位存储成本 62%" position="left" top={40} />
          <Event title="2014 年 08 月" content="获得 C 轮数千万美元融资，由宽带资本领投，经纬中国和启明创投跟投" position="right" top={60} />
          <Event title="2014 年 12 月" content="海外加速服务上线，覆盖全球 31 个国家共 54 个地区" position="left" top={150} />
        </TimeNode>
        <TimeNode year={2015} height={160}>
          <Event title="2015 年 01 月" content="七牛云对象存储服务通过可信云认证" position="left" top={40} />
          <Event title="2015 年 08 月" content="基于容器服务技术的数据处理平台正式发布" position="right" top={60} />
        </TimeNode>
        <TimeNode year={2016} height={270}>
          <Event title="2016 年 02 月" content="完成 D 轮融资，投资方包括方广资本、嘉实投资、张江高科、澳洲电信等知名机构" position="left" top={40} />
          <Event title="2016 年 05 月" content="移动时代的直播云服务上线" position="right" top={60} />
          <Event title="2016 年 12 月" content="获得 ISO/IEC 27001:2013 信息安全管理体系认证证书" position="left" top={190} />
          <Event title="2016 年 11 月" content="获国家高新技术企业证书" position="right" top={170} />
        </TimeNode>
        <TimeNode year={2017} height={400}>
          <Event title="2017 年 01 月" content="智能大数据平台上线，结合七牛云生态，为用户赋能应用大数据的核心能力" position="left" top={40} />
          <Event title="2017 年 04 月" content="海外 CDN 服务上线，覆盖 6 大洲 100 多个国家" position="right" top={60} />
          <Event title="2017 年 08 月" content="宣布完成新一轮 10 亿元融资，阿里集团、云锋基金领投" position="left" top={170} />
          <Event title="2017 年 09 月" content="七牛云人工智能团队勇斩 ACMMM LSVC 竞赛亚军，视频识别能力获国际认可" position="right" top={180} />
          <Event title="2017 年 10 月" content="七牛云获工信部颁发的 CDN 牌照及云服务牌照" position="left" top={300} />
        </TimeNode>
        <TimeNode year={2018} height={270}>
          <Event title="2018 年 01 月" content="推出全自研内核跨平台多媒体播放器" position="left" top={40} />
          <Event title="2018 年 06 月" content="七牛云人工智能实验室荣获 ActivityNet 2018 竞赛季军" position="right" top={60} />
          <Event title="2018 年 07 月" content="推出一站式 AI 内容安全产品「明瞳 2.0」" position="left" top={150} />
          <Event title="2018 年 09 月" content="与复旦大学合作成立「复旦-七牛深度学习联合实验室" position="right" top={170} />
        </TimeNode>
        <TimeNode year={2019} height={160}>
          <Event title="2019 年 12 月" content=" 获中国科学院年度最佳大数据产品奖" position="left" top={40} />
        </TimeNode>
      </div>
    </Section>
  )
}
