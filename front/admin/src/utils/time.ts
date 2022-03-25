import moment from 'moment'

export const timeFormatter = (format = 'YYYY-MM-DD HH:mm') => (time: number): string => (time ? moment.unix(time).format(format) : '-')

export const timeFormatterNum = (time?: string): number => moment(time).unix()
