import { useState, useEffect } from 'react'
import { ComposibleValidatable } from 'formstate-x-v2'

export function useFormState<T extends ComposibleValidatable<unknown>>(createState: () => T) {
  const [state] = useState(createState)
  useEffect(() => state.dispose, [state])
  return state
}
