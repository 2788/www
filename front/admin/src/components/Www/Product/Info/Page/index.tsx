/**
 * @file 产品页面模块配置
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Button, Loading, Alert, Dropdown, Menu, MenuItem, Checkbox, Dialog, DialogFooter } from 'react-icecream'
import { AddIcon, SettingIcon } from 'react-icecream/icons'
import { useInjection } from 'qn-fe-core/di'
import { RouterStore, useRouteTitle } from 'qn-fe-core/router'
import { ToasterStore } from 'admin-base/common/toaster'

import { productPageInfoTitle } from 'constants/route'
import { ProductId } from 'constants/product'
import { ProductModule, productModuleTitleMap, ProductSection } from 'constants/product/page'
import { ProductComponentName } from 'constants/product/page/comp-common'
import ProductInfoApis, { ProductInfo } from 'apis/product/info'
import { getProductInfoPageUrl, hasProductPage } from 'transforms/product/info'

import Preview from './Preview'
import List from './List'

import useCompBanner from './comps/banner'
import useCompUsageGuide from './comps/usage-guide'
import useCompNews from './comps/news'
import useCompAdvantage from './comps/advantage'
import useCompArchitecture from './comps/architecture'
import useCompCase from './comps/case'
import useCompDocument from './comps/document'
import useCompFunction from './comps/function'
import useCompRelated from './comps/related'
import useCompScene from './comps/scene'

import styles from './style.m.less'

export interface Props {
  productId: ProductId
}

export default observer(function PageInfo({ productId }: Props) {
  const toasterStore = useInjection(ToasterStore)
  const productInfoApis = useInjection(ProductInfoApis)
  const routerStore = useInjection(RouterStore)

  useRouteTitle(`${productPageInfoTitle}：${productId}`)

  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>(undefined)

  useEffect(() => {
    toasterStore.promise(
      productInfoApis.get(productId).then(result => {
        setProductInfo(result)
      })
    )
  }, [productId, productInfoApis, toasterStore])

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

  const [configCompBanner, compBannerView] = useCompBanner(productInfo)
  const [configCompUsageGuide, compUsageGuideView] = useCompUsageGuide(productInfo)
  const [configCompNews, compNewsView] = useCompNews()
  const [configCompAdvantage, compAdvantageView] = useCompAdvantage()
  const [configCompArchitecture, compArchitectureView] = useCompArchitecture()
  const [configCompCase, compCaseView] = useCompCase()
  const [configCompDocument, compDocumentView] = useCompDocument()
  const [configCompFunction, compFunctionView] = useCompFunction()
  const [configCompRelated, compRelatedView] = useCompRelated()
  const [configCompScene, compSceneView] = useCompScene()

  function submit() {
    if (!productInfo) {
      toasterStore.error('暂无数据')
      return
    }

    if (!hasProductPage(productInfo)) {
      toasterStore.error('请配置 banner 和最少一个模块')
      return
    }

    setIsSubmitting(true)
    toasterStore.promise(
      productInfoApis.update(productInfo)
        .then(() => {
          setUnsaved(false)
          setSubmittedConfirmVisible(true)
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    )
  }

  function add(productModule: ProductModule) {
    const info = productInfo!

    setIsEditingComp(true)

    let configSectionComp: Promise<ProductSection>
    switch (productModule) {
      case ProductModule.Banner:
        toasterStore.promise(
          configCompBanner().then(banner => {
            setProductInfo({ ...info, banner })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return
      case ProductModule.UsageGuide:
        toasterStore.promise(
          configCompUsageGuide().then(usageGuide => {
            setProductInfo({ ...info, usageGuide })
            setUnsaved(true)
          }).finally(() => {
            setIsEditingComp(false)
          })
        )
        return
      case ProductModule.News:
        configSectionComp = configCompNews()
        break
      case ProductModule.Advantage:
        configSectionComp = configCompAdvantage()
        break
      case ProductModule.Architecture:
        configSectionComp = configCompArchitecture()
        break
      case ProductModule.Case:
        configSectionComp = configCompCase()
        break
      case ProductModule.Document:
        configSectionComp = configCompDocument()
        break
      case ProductModule.Function:
        configSectionComp = configCompFunction()
        break
      case ProductModule.Related:
        configSectionComp = configCompRelated()
        break
      case ProductModule.Scene:
        configSectionComp = configCompScene()
        break
      default:
        toasterStore.error(`未知模块 ${productModule}`)
        return
    }

    toasterStore.promise(
      configSectionComp.then(section => {
        setProductInfo({
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
    const info = productInfo!
    const currentSection = info.sections[index]

    setIsEditingComp(true)

    let configComp: Promise<ProductSection>
    switch (currentSection.component.name) {
      case ProductComponentName.News:
        toasterStore.error(`暂不支持编辑 ${currentSection.name}`)
        return
      case ProductComponentName.Advantage:
        configComp = configCompAdvantage({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Architecture:
        configComp = configCompArchitecture({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Case:
        configComp = configCompCase({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Document:
        configComp = configCompDocument({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Function:
        configComp = configCompFunction({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Related:
        configComp = configCompRelated({ ...currentSection, component: currentSection.component })
        break
      case ProductComponentName.Scene:
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
        setProductInfo({ ...info, sections })
        setUnsaved(true)
      }).finally(() => {
        setIsEditingComp(false)
      })
    )
  }

  const modules = useMemo(
    () => (
      productInfo
      ? Object.values(ProductModule).filter(module => {
        if (module === ProductModule.Banner) {
          return productInfo.banner == null
        }

        if (module === ProductModule.UsageGuide) {
          return productInfo.usageGuide == null
        }

        // TODO: 微调后重新放出来
        if (module === ProductModule.News) {
          return false
        }

        return !productInfo.sections.some(section => section.name === module)
      })
      : []
    ),
    [productInfo]
  )

  if (productInfo == null) {
    return (<Loading />)
  }

  const configForm = (
    <div className={styles.list}>
      <div className={styles.fixedCheck}>
        <label>固定：<Checkbox checked={configFixed} onChange={setConfigFixed} /></label>
      </div>

      <List
        productInfo={productInfo}
        onBannerEdit={() => {
          setIsEditingComp(true)
          toasterStore.promise(
            configCompBanner().then(banner => {
              setProductInfo({ ...productInfo, banner })
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
              setProductInfo({ ...productInfo, usageGuide })
              setUnsaved(true)
            }).finally(() => {
              setIsEditingComp(false)
            })
          )
        }}
        onUsageGuideRemove={() => {
          setProductInfo({ ...productInfo, usageGuide: null })
          setUnsaved(true)
        }}
        onSectionEdit={edit}
        onSectionsChange={sections => {
          setProductInfo({
            ...productInfo!,
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
                    {productModuleTitleMap[module]}
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
          disabled={!productInfo}
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
        <Preview productInfo={productInfo} />
      </div>

      <Dialog
        title="保存发布完成"
        visible={submittedConfirmVisible}
        footer={<DialogFooter okText="去列表页" okType="default" cancelText="留在这里" />}
        onOk={() => {
          setSubmittedConfirmVisible(false)
          routerStore.push(getProductInfoPageUrl())
        }}
        onCancel={() => { setSubmittedConfirmVisible(false) }}
      >
        回到列表页还是留在这里？
      </Dialog>

      {compBannerView}
      {compUsageGuideView}
      {compNewsView}
      {compAdvantageView}
      {compArchitectureView}
      {compCaseView}
      {compDocumentView}
      {compFunctionView}
      {compRelatedView}
      {compSceneView}
    </div>
  )
})
