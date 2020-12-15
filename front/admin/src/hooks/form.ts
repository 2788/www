import { useState, useEffect } from 'react'
import { ComposibleValidatable } from 'formstate-x'

export function useFormState<T extends ComposibleValidatable<unknown>>(createState: () => T) {
  const [state] = useState(createState)
  useEffect(() => state.dispose, [state])
  return state
}
