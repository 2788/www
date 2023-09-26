import { FieldState, FormState } from 'formstate-x'

import { ActivitySectionProps } from 'constants/activity/page'

export function createSectionState(init?: ActivitySectionProps | null) {
  const validator = title => {
    if (title.trim() === '') {
      return '不能为空'
    }
  }

  return new FormState({
    name: new FieldState(init?.name ?? ''),
    title: new FieldState(init?.title ?? '').withValidator(validator),
    subtitle: new FieldState(init?.subtitle ?? '')
  })
}
