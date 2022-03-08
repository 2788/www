import React from 'react'
import Form, { FormItemProps } from 'react-icecream-1/lib/form'

import { DefaultFormItemLayout as formItemLayout } from 'constants/editor'

export default function FormItem({ children, ...rest }: React.PropsWithChildren<FormItemProps>) {
  return (
    <Form.Item required {...formItemLayout} {...rest}>
      {children}
    </Form.Item>
  )
}
