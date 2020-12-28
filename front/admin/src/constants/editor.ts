export const DefaultFormItemLayout = {
  labelCol: { xs: { span: 12 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 12 }, sm: { span: 12 } }
}

export enum EditorStatus {
  Creating,
  Editing,
  Reading
}

export const titleMap = {
  [EditorStatus.Creating]: '创建',
  [EditorStatus.Editing]: '编辑',
  [EditorStatus.Reading]: '查看'
}

export type EditorProps = {
  status: EditorStatus
}
