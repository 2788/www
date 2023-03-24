import SolutionAdvantage from 'components/Solution/common/SolutionAdvantage'
import SolutionArchitecture from 'components/Solution/common/SolutionArchitecutre'
import SolutionFunction from 'components/Solution/common/SolutionFunction'
import SolutionScene from 'components/Solution/common/SolutionScene'
import SolutionRelatedProducts from 'components/Solution/common/SolutionRelatedProducts'
import SolutionDemos from 'components/Solution/common/SolutionDemos'

export enum ComponentName {
  // 应用场景
  Scene = 'Scene',
  // 方案架构
  Architecture = 'Architecture',
  // 方案优势
  Advantage = 'Advantage',
  // 方案功能
  Function = 'Function',
  // 相关产品
  RelatedProducts = 'RelatedProducts',
  // Demo 体验
  Demo = 'Demo',
}

export const ComponentMap = {
  [ComponentName.Scene]: SolutionScene,
  [ComponentName.Architecture]: SolutionArchitecture,
  [ComponentName.Advantage]: SolutionAdvantage,
  [ComponentName.Function]: SolutionFunction,
  [ComponentName.RelatedProducts]: SolutionRelatedProducts,
  [ComponentName.Demo]: SolutionDemos
}
