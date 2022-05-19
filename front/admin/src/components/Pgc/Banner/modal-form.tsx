/**
 * @file edit / create
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'
import dayjs from 'dayjs'
import { FormState, DebouncedFieldState } from 'formstate-x'
import { observer } from 'mobx-react'
import { ModalForm, FormItem, useFormstateX, TextInput, NumberInput, RangeDatePicker } from 'react-icecream-form'
import { useInjection } from 'qn-fe-core/di'
import { ToasterStore } from 'admin-base/common/toaster'

import { StateProps as RecordRange, checkOverlap } from 'utils/check'
import { BannerInfo, Banner } from 'constants/pgc/conetnt-banner'
import PgcContentBannerApis from 'apis/pgc/content-banner'
import UploadImage, { createState as createUploadImageState } from 'components/common/Upload/Img'

import style from './modal-form.m.less'

interface Props {
  current?: number
  banners: BannerInfo[]
  visible: boolean
  onSubmit(bannerInfo: BannerInfo): Promise<void>
  onCancel(): void
}

function createState(banners: BannerInfo[]) {
  const state = new FormState({
    name: new DebouncedFieldState('').withValidator(name => {
      if (name.trim() === '') {
        return '不能为空'
      }
      if (name.length > 20) {
        return '不能超过 20 个字'
      }
      if (banners.some(banner => banner.name.trim() === name.trim())) {
        return '名称已存在'
      }
    }),
    img: createUploadImageState('').withValidator(
      v => !v && '不能为空'
    ),
    link: new DebouncedFieldState('').withValidator(
      v => !v && '不能为空'
    ),
    order: new DebouncedFieldState<number | null>(null).withValidator(order => {
      if (order == null) {
        return '不能为空'
      }
      if (order < 1) {
        return '不能小于 1'
      }
      if (order > 5) {
        return '不能大于 5'
      }
    }),
    dateRange: new DebouncedFieldState<{
      start: number | null
      end: number | null
    }>({ start: null, end: null }).withValidator(({ start, end }) => {
      if (start == null) {
        return '开始时间不能为空'
      }
      if (end == null) {
        return '结束时间不能为空'
      }
      const currentRange: RecordRange = {
        effectTime: dayjs(start).startOf('day').unix(),
        invalidTime: dayjs(end).endOf('day').unix()
      }
      const order = state.$.order.value
      const currentOrderBanners = banners.filter(banner => banner.order === order)
      if (checkOverlap(currentRange, currentOrderBanners)) {
        return '生效时间段内该顺序已存在 banner'
      }
    })
  })
  return state
}

const BannerModalForm = observer(function _BannerModalForm(props: Props) {
  const currentIndex = props.current
  const current = currentIndex != null ? props.banners[currentIndex] : null
  const banners = useMemo(
    () => props.banners.filter((_, index) => index !== currentIndex),
    [currentIndex, props.banners]
  )
  const state = useFormstateX(createState, [banners])

  useEffect(() => {
    if (!props.visible) {
      state.reset()
    } else if (current != null) {
      const { effectTime, invalidTime, ...base } = current
      const value = {
        ...base,
        dateRange: {
          start: effectTime * 1e3,
          end: invalidTime * 1e3
        }
      }
      state.set(value)
    }
  }, [props.visible, current, state])

  function handleSubmit() {
    const { dateRange, ...base } = state.value
    const bannerInfo = {
      ...base,
      order: base.order!,
      effectTime: dayjs(dateRange.start!).startOf('day').unix(),
      invalidTime: dayjs(dateRange.end!).endOf('day').unix()
    }
    return props.onSubmit(bannerInfo)
  }

  return (
    <ModalForm
      title={current ? '编辑' : '添加'}
      layout="horizontal"
      labelWidth="7em"
      visible={props.visible}
      state={state}
      onSubmit={handleSubmit}
      onCancel={() => { props.onCancel() }}
    >
      <FormItem label="banner 名称" required>
        <TextInput state={state.$.name} />
      </FormItem>
      <FormItem label="banner 图片" state={state.$.img} required>
        <UploadImage uploadBucketKeyRule="pgc-content" state={state.$.img} />
        <p className={style.img}>推荐尺寸： 2880 * 1000 px</p>
      </FormItem>
      <FormItem label="跳转路径" required>
        <TextInput state={state.$.link} />
      </FormItem>
      <FormItem label="展示顺序" required>
        <NumberInput min={1} max={5} state={state.$.order} />
      </FormItem>
      <FormItem label="生效起止时间" required>
        <RangeDatePicker state={state.$.dateRange} />
      </FormItem>
    </ModalForm>
  )
})

export function useAddModal(banners: Banner[], onRefresh: () => void) {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentBannerApis = useInjection(PgcContentBannerApis)

  const [visible, setVisible] = useState(false)

  async function open() {
    setVisible(true)
  }

  async function submit(bannerInfo: BannerInfo) {
    await toasterStore.promise(pgcContentBannerApis.client.post(bannerInfo))
    setVisible(false)
    onRefresh()
  }

  const view = (
    <BannerModalForm
      banners={banners}
      visible={visible}
      onSubmit={submit}
      onCancel={() => { setVisible(false) }}
    />
  )

  return [open, view] as const
}

export function useEditModal(banners: Banner[], onRefresh: () => void) {
  const toasterStore = useInjection(ToasterStore)
  const pgcContentBannerApis = useInjection(PgcContentBannerApis)

  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(-1)

  async function open(index: number) {
    setCurrent(index)
    setVisible(true)
  }

  async function submit(bannerInfo: BannerInfo) {
    const banner = {
      ...banners[current],
      ...bannerInfo
    }
    await toasterStore.promise(pgcContentBannerApis.client.put(banner))
    setVisible(false)
    onRefresh()
  }

  const view = (
    <BannerModalForm
      current={current}
      banners={banners}
      visible={visible}
      onSubmit={submit}
      onCancel={() => { setVisible(false) }}
    />
  )

  return [open, view] as const
}
