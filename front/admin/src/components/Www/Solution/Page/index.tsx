/**
 * @file 解决方案页模块配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Loading, Alert, Dropdown, Menu, MenuItem, Checkbox, Dialog, DialogFooter } from 'react-icecream-2'
import { AddIcon, SettingIcon } from 'react-icecream-2/icons'
import { useInjection } from 'qn-fe-core/di'
import { RouterStore, useRouteTitle } from 'qn-fe-core/router'
import { ToasterStore } from 'admin-base/common/toaster'

import { solutionRoute, solutionPageTitle } from 'constants/route'
import { SolutionId } from 'constants/solution'
import { SolutionModule, solutionModuleTitleMap, SolutionSection } from 'constants/solution/page'
import { SolutionComponentName } from 'constants/solution/page/comp-common'
import SolutionApis, { SolutionInfo } from 'apis/solution'

import Preview from './Preview'
import List from './List'

import useCompBanner from './comps/banner'
import useCompAdvantage from './comps/advantage'
import useCompArchitecture from './comps/architecture'
import useCompFunction from './comps/function'
import useCompScene from './comps/scene'

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

  const [configFixed, setConfigFixed] = useState(true)
  const [isEditingComp, setIsEditingComp] = useState(false)
  const [submittedConfirmVisible, setSubmittedConfirmVisible] = useState(false)
  const [unsaved, setUnsaved] = useState(false)

  useEffect(() => {
    function confirmUnsaved(event: BeforeUnloadEvent) {
      if (unsaved) {
        event.preventDefault()
        const text = '还没保存发布，确认离开？'
        event.returnValue = text
        return text
      }
    }

    window.addEventListener('beforeunload', confirmUnsaved, false)
    return () => { window.removeEventListener('beforeunload', confirmUnsaved, false) }
  }, [unsaved])

  const [configCompBanner, compBannerView] = useCompBanner(solutionInfo)
  const [configCompAdvantage, compAdvantageView] = useCompAdvantage()
  const [configCompArchitecture, compArchitectureView] = useCompArchitecture()
  const [configCompFunction, compFunctionView] = useCompFunction()
  const [configCompScene, compSceneView] = useCompScene()

  async function submit() {
    if (!solutionInfo) {
      return
    }

    if (solutionInfo.banner == null) {
      toasterStore.error('需要设置 banner')
      return
    }

    if (solutionInfo.sections.length === 0) {
      toasterStore.error('需要添加内容')
      return
    }

    await toasterStore.promise(solutionApis.update(solutionInfo))

    setUnsaved(false)
    setSubmittedConfirmVisible(true)
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
      ? Object.values(SolutionModule).filter(module => (
        module === SolutionModule.Banner
        ? solutionInfo.banner == null
        : !solutionInfo.sections.some(section => section.name === module)
      ))
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
        固定：<Checkbox value={configFixed} defaultChecked onChange={setConfigFixed} />
      </div>

      <List
        solutionInfo={solutionInfo}
        onSolutionInfoChange={setSolutionInfo}
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
        onSectionEdit={edit}
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
        <Button type="primary" disabled={!solutionInfo} onClick={() => submit()}>保存并发布</Button>
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
      {compAdvantageView}
      {compArchitectureView}
      {compFunctionView}
      {compSceneView}
    </div>
  )
})
