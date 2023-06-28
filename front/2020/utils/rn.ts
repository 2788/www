import React from 'react'

export function getChildrenProps<P>(children: React.ReactNode): P[] {
  return React.Children.toArray(children)
    .filter((item): item is React.ReactElement<P> => React.isValidElement<P>(item))
    .map(({ props }) => props)
}
