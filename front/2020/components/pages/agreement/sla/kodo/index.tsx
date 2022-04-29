import React from 'react'

import style from 'components/agreement/content.less'

export default function Content() {
  return (
    <div className={style.content}>
      <h2>七牛云对象存储服务等级协议（SLA）</h2>
      <p style={{ textAlign: 'right' }}><b>版本生效日期：2019 年 4 月 28 日</b></p>
      <p>
        <strong>
          为使用七牛云对象存储服务（以下简称“本服务”），您应当阅读并遵守《七牛云对象存储服务等级协议》（以下简称“本协议”或“SLA”），以及
          <a
            href="https://www.qiniu.com/agreements/user-agreement"
            rel="noopener"
            target="_blank"
            title="《七牛云服务用户协议》"
          >
            《七牛云服务用户协议》
          </a>
          和
          <a
            href="https://www.qiniu.com/agreements/privacy-right"
            rel="noopener"
            target="_blank"
            title="《七牛云隐私权政策》"
          >
            《七牛云隐私权政策》
          </a>
          。 本协议包含本服务的术语和定义、服务可用性指标、赔偿方案、免责条款等相关内容。请您务必审慎阅读、充分理解各条款内容，
          特别是限制、免责条款或者其他涉及您重大权益的条款，这类条款可能会以加粗或/和加下划线等形式提示您重点注意。
        </strong>
      </p>
      <p>
        <strong>
          除非您已充分阅读、完全理解并接受本协议所有条款，否则，请您不要购买本服务。
          您单击“同意”、“下一步”或您的购买、使用等行为或者您以其他任何明示或者默示方式表示接受本协议的，即视为您已阅读并同意本协议的约束。
          本协议即在您与七牛云之间产生法律效力，成为对双方均具有约束力的法律文件。
        </strong>
      </p>

      <h3>1. 术语和定义</h3>
      <p>1.1 <b>七牛云对象存储</b>：
        对象存储是一种基于 HTTP 协议网络接口上传、下载和管理数据资源，按需扩容的非结构化数据存储服务。对象存储以预付费或后付费的方式提供服务。
      </p>
      <p>1.2 <b>服务周期</b>：服务周期是指购买本服务的服务期限所包含的自然月。如用户是 3 月 11 日开通服务，则服务周期计算到 3 月 31 日。</p>
      <p>1.3 <b>月度服务费用</b>：指客户的某一个七牛云账号在一个自然月中使用七牛云对象存储服务按地域和存储类型分别统计的服务费用。</p>
      <p>
        1.4 <b>有效请求</b>：
        七牛云对象存储服务端收到的请求视为有效请求，<b>但不包括以下类型的请求</b>：
      </p>
      <p>（1）未通过身份验证和鉴权失败的请求或欠费停服状态下的请求；</p>
      <p>（2）跨区域同步数据和生命周期管理等各类后端异步处理发起的所有请求；</p>
      <p>（3）获取 Bucket 列表发起的所有请求；</p>
      <p>（4）查询统计数据的请求；</p>
      <p>（5）客户的应用程序受到黑客攻击而发起的请求。</p>
      <p>
        1.5 <b>失败请求</b>：
        七牛云对象存储服务将 HTTP 状态码为 5XX 的请求和因七牛对象存储服务故障导致的用户正常请求未能到达服务端的请求均视为失败请求，
        <b>但不包括以下类型的请求</b>：
      </p>
      <p>（1）因采用不适当的访问模式导致请求超出对象存储服务的规定配额，造成请求被对象存储限制的错误请求 (HTTP 状态码 573)；</p>
      <p>（2）跨区域同步数据和生命周期管理等各类后端异步处理发起的失败请求；</p>
      <p>（3）获取 Bucket 列表产生的失败请求；</p>
      <p>（4）非七牛服务造成的慢请求或失败请求 (HTTP 状态码 579)：</p>
      <p style={{ paddingLeft: '40px' }}>1）镜像回源超时或失败的请求；</p>
      <p style={{ paddingLeft: '40px' }}>2）Callback 超时或失败的请求；</p>
      <p>（5）查询统计数据的失败请求；</p>
      <p>（6）由七牛云对象存储服务发起的合理升级、变更、停机而导致的错误请求或服务不可用情况；</p>
      <p>（7）客户的应用程序受到黑客攻击而导致被七牛云存储服务限制的请求。</p>
      <p>1.6 <b>每 5 分钟错误率</b>：
        根据地域和存储类型分别统计的失败请求占 5 分钟内客户有效请求数的比例，同一账号下相同地域、相同存储类型的多个 Bucket，将合并计算错误率。
        具体计算方式如下：
      </p>
      <p>每 5 分钟错误率 = (每 5 分钟失败请求数 / 每 5 分钟有效请求数) × 100%</p>

      <h3>2. 服务可用性</h3>
      <p><b>2.1 服务可用性计算</b></p>
      <p>七牛云对象存储根据不同地域和存储类型统计对应的服务可用性，同一账号下相同地域、相同存储类型的多个 Bucket，将合并计算服务可用性。服务可用性的具体计算方式如下：</p>
      <p>服务可用性 = (1 - (服务周期内的每 5 分钟错误率之和 / 服务周期内的 5 分钟总个数)) × 100%</p>
      <p>注：服务周期内的 5 分钟总个数 = 12 × 24 × 该服务周期的天数</p>
      <p><b>2.2 服务可用性承诺</b></p>
      <p>客户可以通过七牛云对象存储提供的 API、SDK、控制台或工具对数据进行上传、下载和管理。针对不同的存储类型，七牛云对象存储分别承诺服务可用性如下：</p>
      <table>
        <tr>
          <th>存储类型</th>
          <th>服务可用性标准</th>
        </tr>
        <tr style={{ backgroundColor: '#f6f8fa' }}>
          <td>标准存储</td>
          <td>99.9%</td>
        </tr>
        <tr>
          <td>低频存储 / 归档存储</td>
          <td>99.0%</td>
        </tr>
      </table>
      <p>如七牛云对象存储服务未达到上述服务可用性承诺，客户可依据本协议第 3 条约定获得赔偿</p>
      <h3>3. 赔偿方案</h3>
      <p>客户账号按地域及存储类型分别统计各服务周期内的服务可用性，如低于 2.2 承诺的可用性标准，可按照以下条款约定获得赔偿：</p>
      <p><b>3.1 赔偿标准</b></p>
      <p>
        （1）<strong>赔偿只针对已经使用七牛云对象存储服务并且正常支付费用的客户（除法律法规另有规定外，免费型服务不在赔偿范围内）；
          赔偿方式仅限于用于支付七牛云对象存储的抵用券，抵用券的使用遵循七牛云发布的相关规则。</strong>
      </p>
      <p>
        （2）<strong>赔偿额按照服务可用性未达标的服务月度单独计算，且不超过该服务周期内该地域该存储类型所支付月度服务费用的 50%（不含抵用券、优惠券等抵扣费用）。赔偿额具体计算方式如下：</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>存储类型</th>
            <th>服务可用性</th>
            <th>赔偿抵用券金额</th>
          </tr>
          <tr>
            <td rowSpan={2}>标准存储</td>
            <td style={{ backgroundColor: '#f6f8fa' }}>低于 99.90% 但高于或等于 95%</td>
            <td style={{ backgroundColor: '#f6f8fa' }}>月度服务费用的 30%</td>
          </tr>
          <tr>
            <td>低于 95%</td>
            <td>月度服务费用的 50%</td>
          </tr>
          <tr>
            <td rowSpan={2}>低频存储 / 归档存储</td>
            <td style={{ backgroundColor: '#f6f8fa' }}>低于 99.00% 但高于或等于 95%</td>
            <td style={{ backgroundColor: '#f6f8fa' }}>月度服务费用的 30%</td>
          </tr>
          <tr>
            <td>低于 95%</td>
            <td>月度服务费用的 50%</td>
          </tr>
        </tbody>
      </table>
      <p><b>3.2 赔偿申请时限</b></p>
      <p>（1）客户可以每月<b>第五（5）个工作日后</b>，
        对上个服务周期没有达到可用性的服务，通过账户的工单系统提出赔偿申请。
        赔偿申请提出后七牛云会进行相应审核，对于服务周期的服务可用性计算，若双方出现争议，<b>双方均同意最终以七牛云的后台记录为准</b>。
      </p>
      <p>
        （2）<strong>赔偿申请必须在服务可用性未达标的服务周期结束后两（2）个月内提出。
          若在两（2）个月内未提出赔偿申请，或是在服务可用性未达标的服务周期结束后的两（2）个月以后才提出赔偿申请，均视为客户主动放弃要求赔偿及向七牛云主张其他权利的权利，
          七牛云有权不受理客户的赔偿申请，不对客户进行任何赔偿或补偿。
        </strong>
      </p>

      <h3>4. 免责条款</h3>

      <p>由于以下原因造成的服务不可用，相应服务不可用时间不属于服务不可用的计算范畴和七牛云的赔偿范围，七牛云无需向客户承担责任：</p>

      <p>4.1 <strong>七牛云预先通知客户后进行系统维护所引起的，包括割接、维修、升级和模拟故障演练；</strong></p>
      <p>4.2 <strong>任何七牛云所属设备以外的网络、设备或配置调整引起的故障；</strong></p>
      <p>4.3 <strong>客户的应用程序或数据信息受到黑客攻击而引起的；</strong></p>
      <p>4.4 <strong>客户维护不当或保密不当致使数据、口令、密码等丢失或泄漏所引起的；</strong></p>
      <p>4.5 <strong>客户自行升级操作系统所引起的；</strong></p>
      <p>4.6 <strong>客户的应用程序或安装活动所引起的；</strong></p>
      <p>4.7 <strong>客户的疏忽或由用户授权的操作所引起的；</strong></p>
      <p>4.8 <strong>不可抗力以及意外事件引起的；</strong></p>
      <p>4.9 <strong>其他非七牛云原因所造成的不可用或服务不达标；</strong></p>
      <p>
        4.10 <strong>属于相关法律法规、相关协议、相关规则或七牛云单独发布的相关规则、说明等中所述的七牛云可以免责、免除赔偿责任等的情况。</strong>
      </p>

      <h3>5. 其他</h3>
      <p>5.1 <b>七牛云有权根据变化适时或必要时对本协议条款做出修改，您可以在七牛云官网的最新版本中查阅相关协议条款。
        如您不同意七牛云对协议所做的修改，您有权停止使用本服务，如您继续使用本服务，则视为您接受修改后的协议。</b>
      </p>
      <p>
        5.2 <b>
          本协议作为
          <a
            href="https://www.qiniu.com/agreements/user-agreement"
            rel="noopener"
            target="_blank"
            title="《七牛云服务用户协议》"
          >
            《七牛云服务用户协议》
          </a>
          的附属协议，
          具有与
          <a
            href="https://www.qiniu.com/agreements/user-agreement"
            rel="noopener"
            target="_blank"
            title="《七牛云服务用户协议》"
          >
            《七牛云服务用户协议》
          </a>
          同等效力，
          本协议未约定事项，您需遵守
          <a
            href="https://www.qiniu.com/agreements/user-agreement"
            rel="noopener"
            target="_blank"
            title="《七牛云服务用户协议》"
          >
            《七牛云服务用户协议》
          </a>
          的相关约定。
          若本协议与
          <a
            href="https://www.qiniu.com/agreements/user-agreement"
            rel="noopener"
            target="_blank"
            title="《七牛云服务用户协议》"
          >
            《七牛云服务用户协议》
          </a>
          中的条款相冲突或不一致，则以本协议为准，但仅在该冲突或不一致范围内适用。
        </b>
      </p>
    </div>
  )
}