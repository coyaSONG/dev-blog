import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

export const formatDate = (date: string) => {
  return format(parseISO(date), 'PPP', { locale: ko })
} 