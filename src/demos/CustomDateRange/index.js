/**
 * 自定义日期范围选择组件
 */
import React, {useState, useCallback} from 'react'
import DateRangeRadio from './components/DateRangeRadio'
import RangeRadio from './components/DateRangeRadio/RangeRadio'
import {DateType} from './components/DateRangeRadio/constants'

const DateFormat = 'YYYY-MM-DD'

function CustomDateRange() {
    const [dateRangeRadioValue, setDateRangeRadioValue] = useState()
    const [rangeRadioValue, setRangeRadioValue] = useState()

    const handleDateRangeRadioChange = useCallback((val) => {
        setDateRangeRadioValue(val)
    }, [])

    const handleDateRangeChange = useCallback((val, range) => {
        console.log(val, range)
        setRangeRadioValue(val)
    }, [])

    return (
        <div>
            <h1>类型1</h1>
            <DateRangeRadio
                value={dateRangeRadioValue}
                onChange={handleDateRangeRadioChange}
                ranges={[
                    {
                        key: 'beforeYesterday',
                        type: DateType.day,
                        name: '前天',
                        num: -2,
                        single: true,
                    },
                    {
                        key: 'yesterday',
                        type: DateType.day,
                        name: '昨日',
                        num: -1,
                        single: true,
                    },
                    {
                        key: 'today',
                        type: DateType.day,
                        name: '今日',
                        num: 0,
                    },
                    {
                        key: 'tomorrow',
                        type: DateType.day,
                        name: '明日',
                        num: 1,
                        single: true,
                    },
                    {
                        key: 'thisWeek',
                        type: DateType.week,
                        name: '本周',
                        num: 0,
                    },
                    {
                        key: 'nearly7',
                        type: DateType.day,
                        name: '近7日',
                        num: -7,
                    },
                    {
                        key: 'prevMonth',
                        type: DateType.month,
                        name: '上月',
                        num: -1,
                    },
                    {
                        key: 'nextMonth',
                        type: DateType.month,
                        name: '下月',
                        num: 1,
                    },
                ]}
            />
            <h1>类型2</h1>
            <RangeRadio
                ranges={[
                    {
                        key: 'yesterday',
                        type: DateType.day,
                        name: '昨日',
                        num: -1,
                        single: true,
                    },
                    {
                        key: 'today',
                        type: DateType.day,
                        name: '今日',
                        num: 0,
                    },
                    {
                        key: 'thisWeek',
                        type: DateType.week,
                        name: '本周',
                        num: 0,
                    },
                    {
                        key: 'thisMonth',
                        type: DateType.month,
                        name: '本月',
                        num: 0,
                    },
                ]}
                value={rangeRadioValue}
                onChange={handleDateRangeChange}
            />
            {
                rangeRadioValue?.[0]
                    ? `value: ${rangeRadioValue?.[0]?.format(DateFormat)} ~ ${rangeRadioValue?.[1]?.format(DateFormat)}`
                    : null
            }
        </div>
    )
}

export default CustomDateRange
