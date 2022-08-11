/**
 * @file 构建 externals 内容
 * @description 使用与 next build 相似的构建行为，确保通过被导出的组件不需要做特别的调整
 */

const { readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs')
const { copySync } = require('fs-extra')
const { resolve, join } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const getBaseWebpackConfig = require('next/dist/build/webpack-config')
const { loadEnvConfig } = require('next/dist/lib/load-env-config')
const loadConfig = require('next/dist/next-server/server/config')
const { PHASE_PRODUCTION_BUILD } = require('next/dist/next-server/lib/constants')
const { runCompiler } = require('next/dist/build/compiler')

// 所有需要对外的 external 组件，对应 /externals/ 下的内容
const externals = [
  'header',
  'footer',
  'feedback-entry-v2',
  'feedback-entry-v3',
  'feedback-entry-v4',
  'cps-visit-reporter'
]

const dir = resolve('.')
const outputPath = resolve('.next')
const finalOutputPath = resolve('dist')

// 生成 loader 文件到 dist/public 目录
function generateLoader() {
  const loaderJs = readFileSync(resolve('externals/loader.js'), { encoding: 'utf8' })
  const manifest = require(join(outputPath, 'manifest.json'))
  const simplifiedManifest = Object.keys(manifest).reduce((o, key) => {
    if (key.indexOf('externals/') === 0 && key.slice(-4) !== '.map') {
      o[key] = manifest[key]
    }
    return o
  }, {})
  const loaderJsWithManifest = loaderJs.replace(/\bMANIFEST\b/g, JSON.stringify(simplifiedManifest))
  const loaderDirPath = join(finalOutputPath, 'public', 'externals')
  if (!existsSync(loaderDirPath)) mkdirSync(loaderDirPath)
  writeFileSync(join(finalOutputPath, 'public', 'externals/loader.js'), loaderJsWithManifest)
}

// 导出 externals 内容的构建结果（从 .next/ 到 dist/）
function exportFiles() {
  copySync(
    join(outputPath, 'static'),
    join(finalOutputPath, '.next', 'static'),
    { errorOnExist: true }
  )
}

async function main() {

  loadEnvConfig(dir, false)

  const nextConfig = loadConfig.default(PHASE_PRODUCTION_BUILD, dir, null)

  const webpackConfig = await getBaseWebpackConfig.default(resolve('.'), {
    buildId: 'externals',
    config: nextConfig,
    target: nextConfig.target,
    pagesDir: resolve('./pages'),
    entrypoints: {},
    rewrites: []
  })

  webpackConfig.entry = externals.reduce(
    (entries, key) => ({
      ...entries,
      [`externals/${key}`]: [
        // next 内置的 polyfill
        'next/dist/client/polyfills',
        './utils/polyfills.ts',
        `./externals/${key}.tsx`
      ]
    }),
    {}
  )

  console.log('entries:', webpackConfig.entry)

  let assetPrefix = nextConfig.assetPrefix
  assetPrefix = assetPrefix.endsWith('/') ? assetPrefix : (assetPrefix + '/')

  webpackConfig.output = {
    publicPath: assetPrefix + '_next/',
    path: outputPath,
    filename: 'static/[name].[contenthash].js',
    jsonpFunction: `webpackJsonpForExternals`
  }

  webpackConfig.plugins = webpackConfig.plugins.filter(
    p => p.constructor.name !== 'MiniCssExtractPlugin'
  ).concat(
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css'
    }),
    new ManifestPlugin()
  )

  webpackConfig.optimization.splitChunks = false
  webpackConfig.optimization.runtimeChunk = false

  // 本地调试时打开以提高构建效率
  // webpackConfig.optimization.minimize = false
  // webpackConfig.devtool = false

  await runCompiler(webpackConfig)
  exportFiles()
  generateLoader()
  console.log('done')
}

main().catch(e => {
  console.error(`[ERROR] build externals failed: ${e}`)
  process.exit(1)
})
