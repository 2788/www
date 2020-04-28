declare module '*.svg' {
  const exports: React.FC<React.HTMLAttributes<HTMLElement>>
  export default exports
}

declare module '*.less' {
  const cssModuleExport: {
    [className: string]: string
  }

  export = cssModuleExport
}
