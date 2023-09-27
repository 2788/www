import React, { ReactNode, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, Modal } from 'react-icecream-2'

import { useMobile } from 'hooks/ua'

import { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'
import Markdown from 'components/pgc/content/Article/Markdown'
import Pc from './Pc'
import Mobile from './Mobile'

import style from './style.less'

export type CardType = 'default' | 'motivation'

export interface Props {
  serial: ReactNode
  title: string
  desc: ReactNode
  bgUrl: string
  popDir: 'up' | 'down'
  type?: CardType
}

export interface CardItemProps {
  serial: string
  title: string
  bgUrl: string
  description: string
  detail?: string
}

export interface CardListProps {
  list: CardItemProps[]
  type?: CardType
}

export function CardItem(props: Props) {
  const isMobile = useMobile()
  return isMobile ? (
    <Mobile title={props.title} desc={props.desc} />
  ) : (
    <Pc {...props} />
    )
}

function Detail(props: { detail: string }) {
  const { detail } = props
  const [articleHtmlAst, setArticleHtmlAst] = useState<AstRootNode | null>(null)

  useEffect(() => {
    mdTextToHTMLAst(detail).then(res => setArticleHtmlAst(res))
  }, [detail])

  if (articleHtmlAst == null) {
    return <></>
  }
  return <Markdown htmlAst={articleHtmlAst} />
}

export function CardList(props: CardListProps) {
  const { list, type = 'default' } = props
  const [modalIndex, setModal] = useState(-1)

  return (
    <div className={style.items}>
      {list.map((item, index) => {
        const desc = (
          <div>
            <div>{item.description}</div>
            {item.detail != null && (
              <>
                <Button
                  className={classNames(style.descButton)}
                  type="secondary"
                  onClick={() => setModal(index)}
                >
                  查看更多
                </Button>
                <Modal
                  title={item.title}
                  className={classNames(style.descModal)}
                  visible={index === modalIndex}
                  onCancel={() => setModal(-1)}
                  footer={null}
                >
                  <Detail detail={item.detail} />
                </Modal>
              </>
            )}
          </div>
        )
        const img = <img src={item.serial} />

        return (
          <CardItem
            key={index}
            serial={img}
            title={item.title ?? ''}
            desc={desc ?? ''}
            bgUrl={item.bgUrl ?? ''}
            popDir={index % 2 === 0 ? 'up' : 'down'}
            type={type}
          />
        )
      })}
    </div>
  )
}
