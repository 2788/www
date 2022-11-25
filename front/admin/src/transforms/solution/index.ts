/**
 * @file 解决方案
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { solutionRoute, solutionPageRoute } from 'constants/route'
import { SolutionId, SolutionInfo } from 'constants/solution'

export function getSolutionPageUrl(solutionId: SolutionId): string {
  return solutionRoute + solutionPageRoute + '/' + solutionId
}

export function hasSolutionPage(info: SolutionInfo): boolean {
  return info.banner != null && info.sections.length > 0
}
