import ProductAdvantage from 'components/Product/common/ProductAdvantage'
import ProductArchitecture from 'components/Product/common/ProductArchitecture'
import ProductCase from 'components/Product/common/ProductCase'
import ProductDocs from 'components/Product/common/ProductDocs'
import ProductFunction from 'components/Product/common/ProductFunction'
import ProductRelated from 'components/Product/common/ProductRelated'
import ProductScene from 'components/Product/common/ProductScene'
import ProductNews from 'components/Product/common/ProductNews'
import ProductHotPackage from 'components/Product/common/ProductHotPackage'

export enum ComponentName {
  // 产品动态
  News = 'News',
  // 核心优势
  Advantage = 'Advantage',
  // 产品功能及服务
  Function = 'Function',
  // 产品架构
  Architecture = 'Architecture',
  // 应用场景
  Scene = 'Scene',
  // 相关文档
  Documentation = 'Documentation',
  // 客户案例
  Case = 'Case',
  // 相关产品
  Related = 'Related',
  // 热销套餐
  HotPackage = 'HotPackage'
}

export const ComponentMap = {
  [ComponentName.News]: ProductNews,
  [ComponentName.Advantage]: ProductAdvantage,
  [ComponentName.Function]: ProductFunction,
  [ComponentName.Architecture]: ProductArchitecture,
  [ComponentName.Scene]: ProductScene,
  [ComponentName.Documentation]: ProductDocs,
  [ComponentName.Case]: ProductCase,
  [ComponentName.Related]: ProductRelated,
  [ComponentName.HotPackage]: ProductHotPackage
}
