import React from 'react'
import { IActivity } from 'apis/admin/activity'

const ctx = React.createContext<IActivity | null>(null)

export function ActivityProvider(props: { activity: IActivity, children: React.ReactNode }) {
  return (
    <ctx.Provider value={props.activity}>
      {props.children}
    </ctx.Provider>
  )
}

export function useActivity(): IActivity | null {
  return React.useContext(ctx)
}
