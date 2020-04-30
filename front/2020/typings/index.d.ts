declare module '*.svg' {
  const exports: React.FC<React.HTMLAttributes<HTMLElement>>
  export default exports
}

declare module '*.png'

declare module '*.jpg'

declare module '*.jpeg'

declare module '*.gif'

declare module '*.less' {
  const cssModuleExport: {
    [className: string]: string
  }

  export = cssModuleExport
}
