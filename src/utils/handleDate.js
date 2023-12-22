import { format } from 'date-fns'

export const parseTime = (time, fmt = 'yyyy-MM-dd') => {
    // fmt = yyyy-MM-dd HH:mm:ss
    return format(time, fmt)
}
