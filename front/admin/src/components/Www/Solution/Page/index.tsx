/**
 * @file 解决方案页模块配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Loading, Alert, Dropdown, Menu, MenuItem, Checkbox, Dialog, DialogFooter } from 'react-icecream'
import { AddIcon, SettingIcon } from 'react-icecream/icons'
import { useInjection } from 'qn-fe-core/di'
import { RouterStore, useRouteTitle } from 'qn-fe-core/router'
import { ToasterStore } from 'admin-base/common/toaster'

import { solutionRoute, solutionPageTitle } from 'constants/route'
import { SolutionId } from 'constants/solution'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import { hasSolutionPage } from 'transforms/solution'
import SolutionApis, { SolutionInfo } from 'apis/solution'

import Preview from './Preview'
import List from './List'

import useCompBanner from './comps/banner'
import useCompUsageGuide from './comps/usage-guide'
import useCompAdvantage from './comps/advantage'
import useCompArchitecture from './comps/architecture'
import useCompFunction from './comps/function'
import useCompScene from './comps/scene'
import useCompRelatedProducts from './comps/related-products'
import useCompDemo from './comps/demo'

import styles from './style.m.less'

export interface Props {
  solutionId: SolutionId
}

export default observer(function PageInfo({ solutionId }: Props) {
  const toasterStore = useInjection(ToasterStore)
  const solutionApis = useInjection(SolutionApis)
  const routerStore = useInjection(RouterStore)

  useRouteTitle(`${solutionPageTitle}：${solutionId}`)

  const [solutionInfo, setSolutionInfo] = useState<SolutionInfo | undefined>(undefined)

  useEffect(() => {
    toasterStore.promise(
      solutionApis.get(solutionId).then(result => {
        setSolutionInfo(result)
      })
    )
  }, [solutionId, solutionApis, toasterStore])

  /** 固定按钮是否已勾选 */
  const [configFixed, setConfigFixed] = useState(true)
  /** 编辑弹窗是否弹出 */
  const [isEditingComp, setIsEditingComp] = useState(false)
  /** 保存成功后跳转弹窗是否弹出 */
  const [submittedConfirmVisible, setSubmittedConfirmVisible] = useState(false)
  /** 是否有待保存的数据（修改过） */
  const [unsaved, setUnsaved] = useState(false)
  /** 是否正在保存 */
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    function confirmUnsaved(event: BeforeUnloadEvent) {
      if (unsaved) {
        event.preventDefault()
        const text = '还没保存发布，确认离开？'
        event.returnValue = text
        return text
      }
    }

    // TODO: + on router change?
    window.addEventListener('beforeunload', confirmUnsaved, false)
    return () => { window.removeEventListener('beforeunload', confirmUnsaved, false) }
  }, [unsaved])

  const [configCompBanner, compBannerView] = useCompBanner(solutionInfo)
  const [configCompUsageGuide, compUsageGuideView] = useCompUsageGuide(solutionInfo)
  const [configCompAdvantage, compAdvantageView] = useCompAdvantage()
  const [configCompArchitecture, compArchitectureView] = useCompArchitecture()
  const [configCompFunction, compFunctionView] = useCompFunction()
  const [configCompScene, compSceneView] = useCompScene()
  const [configCompRelatedProducts, compRelatedProductsView] = useCompRelatedProducts()
  const [configCompDemo, compDemoView] = useCompDemo()

  function submit() {
    if (!solutionInfo) {
      toasterStore.error('暂无数据')
      return
    }

    if (!hasSolutionPage(solutionInfo)) {
      toasterStore.error('请配置 banner 和最少一个模块')
      return
    }

    setIsSubmitting(true)
    toasterStore.promise(
      solutionApis.update(solutionInfo)
        .then(() => {
          setUnsaved(false)
          setSubmittedConfirmVisible(true)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    )
  }

  function add(solutionModule: SolutionModule) {
    const info = solutionInfo!

    setIsEditingComp(true)

    let configSectionComp: Promise<SolutionSection>
    switch (solutionModule) {
      case SolutionModule.Banner:
        toasterStore.promise(
          configCompBanner().then(banner => {
            setSolutionInfo({ ...info, banner })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return
      case SolutionModule.UsageGuide:
        toasterStore.promise(
          configCompUsageGuide().then(usageGuide => {
            setSolutionInfo({ ...info, usageGuide })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return
      case SolutionModule.Advantage:
        configSectionComp = configCompAdvantage()
        break
      case SolutionModule.Architecture:
        configSectionComp = configCompArchitecture()
        break
      case SolutionModule.Function:
        configSectionComp = configCompFunction()
        break
      case SolutionModule.Scene:
        configSectionComp = configCompScene()
        break
      case SolutionModule.RelatedProducts:
        configSectionComp = configCompRelatedProducts()
        break
      case SolutionModule.Demo:
        configSectionComp = configCompDemo()
        break
      default:
        toasterStore.error(`未知模块 ${solutionModule}`)
        return
    }

    toasterStore.promise(
      configSectionComp.then(section => {
        setSolutionInfo({
          ...info,
          sections: [...info.sections, section]
        })
        setUnsaved(true)
      }).finally(() => {
        setIsEditingComp(false)
      })
    )
  }

  function edit(index: number) {
    const info = solutionInfo!
    const currentSection = info.sections[index]

    setIsEditingComp(true)

    let configComp: Promise<SolutionSection>
    switch (currentSection.component.name) {
      case SolutionComponentName.Advantage:
        configComp = configCompAdvantage({ ...currentSection, component: currentSection.component })
        break
      case SolutionComponentName.Architecture:
        configComp = configCompArchitecture({ ...currentSection, component: currentSection.component })
        break
      case SolutionComponentName.Function:
        configComp = configCompFunction({ ...currentSection, component: currentSection.component })
        break
      case SolutionComponentName.Scene:
        configComp = configCompScene({ ...currentSection, component: currentSection.component })
        break
      case SolutionComponentName.RelatedProducts:
        configComp = configCompRelatedProducts({ ...currentSection, component: currentSection.component })
        break
      case SolutionComponentName.Demo:
        configComp = configCompDemo({ ...currentSection, component: currentSection.component })
        break
      default:
        toasterStore.error(`未知组件 ${currentSection.name}`)
        return
    }

    toasterStore.promise(
      configComp.then(newSection => {
        const sections = [...info.sections]
        sections[index] = newSection
        setSolutionInfo({ ...info, sections })
        setUnsaved(true)
      }).finally(() => {
        setIsEditingComp(false)
      })
    )
  }

  const modules = useMemo(
    () => (
      solutionInfo
      ? Object.values(SolutionModule).filter(module => {
        if (module === SolutionModule.Banner) {
          return solutionInfo.banner == null
        }

        if (module === SolutionModule.UsageGuide) {
          return solutionInfo.usageGuide == null
        }

        return !solutionInfo.sections.some(section => section.name === module)
      })
      : []
    ),
    [solutionInfo]
  )

  if (solutionInfo == null) {
    return (<Loading />)
  }

  const configForm = (
    <div className={styles.list}>
      <div className={styles.fixedCheck}>
        <label>固定：<Checkbox checked={configFixed} onChange={setConfigFixed} /></label>
      </div>

      <List
        solutionInfo={solutionInfo}
        onBannerEdit={() => {
          setIsEditingComp(true)
          toasterStore.promise(
            configCompBanner().then(banner => {
              setSolutionInfo({ ...solutionInfo, banner })
              setUnsaved(true)
            }).finally(() => {
              setIsEditingComp(false)
            })
          )
        }}
        onUsageGuideEdit={() => {
          setIsEditingComp(true)
          toasterStore.promise(
            configCompUsageGuide().then(usageGuide => {
              setSolutionInfo({ ...solutionInfo, usageGuide })
              setUnsaved(true)
            }).finally(() => {
              setIsEditingComp(false)
            })
          )
        }}
        onUsageGuideRemove={() => {
          setSolutionInfo({ ...solutionInfo, usageGuide: null })
          setUnsaved(true)
        }}
        onSectionEdit={edit}
        onSectionsChange={sections => {
          setSolutionInfo({
            ...solutionInfo!,
            sections
          })
          setUnsaved(true)
        }}
      />

      {modules.length > 0 && (
        <div className={styles.btns}>
          <Dropdown
            overlay={
              <Menu className={styles.menu}>
                {modules.map(module => (
                  <MenuItem key={module} onClick={() => { add(module) }}>
                    {solutionModuleTitleMap[module]}
                  </MenuItem>
                ))}
              </Menu>
            }
          >
            <Button className={styles.menuBtn} icon={<AddIcon />}>添加模块</Button>
          </Dropdown>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.wrapper}>

      {unsaved && (<Alert type="info" message="还没保存发布" />)}

      <div className={styles.config}>
        <Button
          type="primary"
          disabled={!solutionInfo}
          loading={isSubmitting}
          onClick={() => submit()}
        >
          保存并发布
        </Button>
        <Dropdown
          // FIXME: 优化实现方式，不依赖于 undefined
          visible={configFixed && !isEditingComp || undefined}
          overlay={configForm}
        >
          <Button className={styles.menuBtn} icon={<SettingIcon />}>页面配置</Button>
        </Dropdown>
      </div>

      <div className={styles.preview}>
        <Preview solutionInfo={solutionInfo} />
      </div>

      <Dialog
        title="保存发布完成"
        visible={submittedConfirmVisible}
        footer={<DialogFooter okText="去列表页" okType="default" cancelText="留在这里" />}
        onOk={() => {
          setSubmittedConfirmVisible(false)
          routerStore.push(solutionRoute)
        }}
        onCancel={() => { setSubmittedConfirmVisible(false) }}
      >
        回到列表页还是留在这里？
      </Dialog>

      {compBannerView}
      {compUsageGuideView}
      {compAdvantageView}
      {compArchitectureView}
      {compFunctionView}
      {compSceneView}
      {compRelatedProductsView}
      {compDemoView}
    </div>
  )
})
