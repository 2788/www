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
    <Section title="企业发展历史" name="timeline">
      <div className={styles.timeline}>
        <TimeNode year={2020} height={124}>
          <Event title="2020 年 06 月" content="完成 F 轮 10 亿人民币融资，国调基金、交银国际、宏兆基金等知名机构共同投资" position="left" top={34} />
          <Event title="2020 年 04 月" content="七牛云完成从 IT 到 DT 的全新战略升级，致力于以数据科技全面驱动数字化未来，赋能各行各业全面进入数据时代" position="right" top={74} />
        </TimeNode>
        <TimeNode year={2019} height={124}>
          <Event title="2019 年 12 月" content="七牛云服务的企业用户已达百万级，覆盖国内 90% 网民" position="left" top={44} />
        </TimeNode>
        <TimeNode year={2017} height={124}>
          <Event title="2017 年 08 月" content="宣布完成新一轮 10 亿元融资，阿里集团、云锋基金领投" position="left" top={54} />
          <Event title="2017 年 01 月" content="智能大数据平台上线，结合七牛云生态，为用户赋能应用大数据的核心能力" position="right" top={97} />
        </TimeNode>
        <TimeNode year={2016} height={124}>
          <Event title="2016 年 02 月" content="完成 D 轮融资，投资方包括方广资本、嘉实投资、张江高科、澳洲电信等知名机构" position="left" top={64} />
        </TimeNode>
        <TimeNode year={2014} height={124}>
          <Event title="2014 年 08 月" content="获得 C 轮数千万美元融资，由宽带资本领投，经纬中国和启明创投跟投" position="right" top={44} />
        </TimeNode>
        <TimeNode year={2013} height={124}>
          <Event title="2013 年 01 月" content="获得启明创投、经纬中国千万美元 B 轮投资" position="left" top={44} />
        </TimeNode>
        <TimeNode year={2012} height={124}>
          <Event title="2012 年 02 月" content="获得数百万元 A 轮融资，由经纬中国投资" position="left" top={36} />
        </TimeNode>
        <TimeNode year={2011} height={124}>
          <Event title="2011 年 12 月" content="云平台上线运营" position="left" top={40} />
          <Event title="2011 年 08 月" content="七牛云成立" position="right" top={58} />
        </TimeNode>
      </div>
    </Section>
  )
}
