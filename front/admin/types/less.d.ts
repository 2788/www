// TODO
// https://github.com/Jimdo/typings-for-css-modules-loader

interface ICSSModuleExport {
  [className: string]: string
}

declare const cssModuleExport: ICSSModuleExport

declare module '*.less' {
  export = cssModuleExport
}
