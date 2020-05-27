declare module '*.file.svg' {
  const exports: string
  export default exports
}

declare module '*.svg' {
  const exports: React.FC<React.SVGAttributes<SVGElement>>
  export default exports
}

declare module '*.png' {
  const exports: string
  export default exports
}

declare module '*.jpg' {
  const exports: string
  export default exports
}

declare module '*.jpeg' {
  const exports: string
  export default exports
}

declare module '*.gif' {
  const exports: string
  export default exports
}

declare module '*.less' {
  const cssModuleExport: {
    [className: string]: string
  }

  export = cssModuleExport
}

declare module 'react-swipeable-views' {
  export type Props = React.PropsWithChildren<{
    index?: number
    onChangeIndex?(index: number): void
    children?: React.ReactNode
  }>

  // eslint-disable-next-line react/prefer-stateless-function
  class SwipeableViews extends React.Component<Props> { }

  export default SwipeableViews
}

declare module 'moveto' {
  export type Options = {
    duration?: number
    container?: HTMLElement
  }
  export class MoveTo extends IMoveTo {
    constructor(options?: Options)
    move(target: HTMLElement | number): void
  }
  export default MoveTo
}

declare module 'qrcode.react';
