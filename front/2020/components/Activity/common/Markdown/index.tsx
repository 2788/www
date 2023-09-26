/**
 * @author yinxulai <yinxulai@qiniu.com>
 */

import React, { useEffect, useState } from 'react'
import BaseMarkdown, { AstRootNode, mdTextToHTMLAst } from 'components/pgc/content/Article/Markdown'

import styles from './style.less'

export interface Props {
  content: string
}

export default function Markdown(props: Props) {
  const [articleHtmlAst, setArticleHtmlAst] = useState<AstRootNode | null>(null)

  useEffect(() => {
    mdTextToHTMLAst(props.content)
      .then(res => setArticleHtmlAst(res))
  }, [props.content])

  if (articleHtmlAst == null) {
    return <></>
  }

  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line react/no-danger */}
      <div className={styles.content}>
        <BaseMarkdown htmlAst={articleHtmlAst} />
      </div>
    </div>
  )
}
