import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* https://stackoverflow.com/a/42969608 修复 Chrome 下 transition 会立即触发的问题 */}
          <script> </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
