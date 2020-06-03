/**
 * @file 开发者（工具、插件、SDK）合作页面
 */

import React from 'react'
import Layout from 'components/Layout'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import Section from 'components/Product/Section'
import { Navigatable } from 'components/Product/Navigator'
import ApplyForm from 'components/pages/cooperations/ApplyForm'

import IconStep1 from './_icons/step-1.svg'
import IconStep2 from './_icons/step-2.svg'
import IconStep3 from './_icons/step-3.svg'

import style from './style.less'

export default function CooperationsPage() {
  return (
    <Layout
      title="工具、插件、SDK 合作"
      keywords="工具, 插件, SDK, 开发者, 合作"
      description="七牛云欢迎广大开发者提交工具、插件、SDK，我们会及时跟进您的提交申请。通过审核的工具、插件、SDK 将会在七牛云开发者中心社区资源上线。并且，您可以免费享受一定额度的云服务一整年。"
    >
      <Navigatable>
        <div className={style.banner}>
          <div className={style.bannerContent}>
            <h1 className={style.title}>工具、插件、SDK 合作</h1>
            <p className={style.desc}>
              七牛云欢迎广大开发者提交工具、插件、SDK，我们会及时跟进您的提交申请。
              通过审核的工具、插件、SDK 将会在七牛云开发者中心社区资源上线。
              并且，您可以免费享受一定额度的云服务一整年。
            </p>
          </div>
        </div>
        <AccessProcess name="process" title="合作流程" grey>
          <Step icon={<IconStep1 />}>
            提交申请
            <p className={style.stepDesc}>点击下面「立即申请」按钮，填写合作申请表。</p>
          </Step>
          <Step icon={<IconStep2 />}>
            审核
            <p className={style.stepDesc}>收到您提交的工具、插件、SDK 后，我们将在 10 个工作日内审核完毕。</p>
          </Step>
          <Step icon={<IconStep3 />}>
            上线
            <p className={style.stepDesc}>如果您提交的资源通过审核后，我们会将其上线到社区资源。</p>
          </Step>
        </AccessProcess>
        <Section name="apply" title="七牛云开发合作申请表" grey={false}>
          <ApplyForm />
        </Section>
      </Navigatable>
    </Layout>
  )
}
