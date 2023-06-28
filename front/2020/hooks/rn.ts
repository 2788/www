import { ReactNode, useMemo } from 'react'

import { getChildrenProps } from 'utils/rn'

export function useChildrenProps<P>(children: ReactNode): P[] {
  return useMemo(() => getChildrenProps<P>(children), [children])
}
