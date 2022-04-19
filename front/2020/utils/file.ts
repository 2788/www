/**
 * @file file utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export function downloadFile(url: string, fileName = '') {
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.target = '_blank' // download 属性有局限性，用这个来兜底
  anchor.click()
}

export function saveFile(fileName: string, content: string) {
  const blob = new Blob([content])
  const url = window.URL.createObjectURL(blob)
  downloadFile(url, fileName)
  window.URL.revokeObjectURL(url)
}
