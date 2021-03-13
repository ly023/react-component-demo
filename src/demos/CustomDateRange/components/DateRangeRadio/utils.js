import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import {DateType} from './constants'

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(isoWeek)

export function getStartEndOf(date, type) {
    const startDate = date.startOf(type)
    const endDate = date.endOf(type)
    return [startDate, endDate]
}

export function getDateRange(range, disableToday) {
    const {type, num, single} = range
    if (!type || type === DateType.empty) {
        return []
    }
    const parsedNum = parseInt(num, 10)
    const today = dayjs()

    if (num < 0) {
        const absNum = Math.abs(parsedNum)
        // 前n天
        if (type === DateType.day) {
            const yesterday = today.subtract(1, 'day')
            const endDate = disableToday ? yesterday : today
            const startDate = endDate.subtract(absNum - 1, 'day')
            if (single) {
                const date = today.subtract(absNum, 'day')
                return [date, date]
            }
            return [startDate, endDate]
        }
        // 前n周
        if (type === DateType.week) {
            const date = today.subtract(absNum, 'week')
            return getStartEndOf(date, 'isoWeek')
        }
        // 前n月
        if (type === DateType.month) {
            const date = today.subtract(absNum, 'month')
            return getStartEndOf(date, 'month')
        }
        // 前n年
        if (type === DateType.year) {
            const date = today.subtract(absNum, 'year')
            return getStartEndOf(date, 'year')
        }
        return
    }
    // 今日 本周 本月 今年
    if (num === 0) {
        // 今日
        if (type === DateType.day) {
            return [today, today]
        }
        // 本周一到本周日
        if (type === DateType.week) {
            return getStartEndOf(today, 'isoWeek')
        }
        // 当月
        if (type === DateType.month) {
            return getStartEndOf(today, 'month')
        }
        // 今年
        if (type === DateType.year) {
            return getStartEndOf(today, 'year')
        }
        return
    }
    // 后n天
    if (type === DateType.day) {
        const startDate = disableToday ? today.add(1, 'day') : today
        const endDate = startDate.add(parsedNum - 1, 'day')
        if (single) {
            const date = today.add(parsedNum, 'day')
            return [date, date]
        }
        return [startDate, endDate]
    }
    if (type === DateType.week) {
        const date = today.add(parsedNum, 'week')
        return getStartEndOf(date, 'isoWeek') // 周一到周日
    }
    if (type === DateType.month) {
        const date = today.add(parsedNum, 'month')
        return getStartEndOf(date, 'month')
    }
    if (type === DateType.year) {
        const date = today.add(parsedNum, 'year')
        return getStartEndOf(date, 'year')
    }
}
