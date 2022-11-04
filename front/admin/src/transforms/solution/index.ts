/**
 * @file 解决方案
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { solutionRoute, solutionPageRoute } from 'constants/route'
import { SolutionId } from 'constants/solution'

export function getSolutionPageUrl(solutionId: SolutionId): string {
  return solutionRoute + solutionPageRoute + '/' + solutionId
}
