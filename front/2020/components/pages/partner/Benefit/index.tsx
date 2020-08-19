import React from 'react'
import Section from 'components/Product/Section'

import style from './index.less'
import Checked from './checked.svg'

export default function Benefit() {
  return (
    <Section title="伙伴权益" name="benefit" withTailPadding>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>培训支持</th>
              <th>标准级</th>
              <th>精英级</th>
              <th>战略级</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>在线产品培训支持</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>现场专业技术培训</td>
              <td></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>高端客户定制化培训</td>
              <td></td>
              <td></td>
              <td><Checked /></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>技术支持</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>项目架构技术支持</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>项目测试支持</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>专属产品/产品组合</td>
              <td></td>
              <td></td>
              <td><Checked /></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>营销支持</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>客户沙龙会</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>代理伙伴授牌</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>七牛云生态圈分享活动</td>
              <td></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>七牛专家支持伙伴品牌活动</td>
              <td></td>
              <td></td>
              <td><Checked /></td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>培训支持</th>
              <th>标准级</th>
              <th>精英级</th>
              <th>战略级</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>在线产品培训支持</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>现场专业技术培训</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>高端客户定制化培训</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>项目架构技术支持</td>
              <td><Checked /></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>项目测试支持</td>
              <td></td>
              <td><Checked /></td>
              <td><Checked /></td>
            </tr>
            <tr>
              <td>专属产品/产品组合</td>
              <td></td>
              <td></td>
              <td><Checked /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}
