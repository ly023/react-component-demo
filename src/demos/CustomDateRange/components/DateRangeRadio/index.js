/**
 * 日期范围选择组件
 */
import React, {useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Radio} from 'antd'
import dayjs from 'dayjs'
import DateRange from './components/DateRange'
import {DefaultRanges, RangeTypes} from './constants'
import {getDateRange} from './utils'

import styles from './index.less'

const {Group: RadioGroup, Button: RadioButton} = Radio

function DateRangeRadio(props) {
    const {
        ranges = DefaultRanges,
        value,
        onChange,
        disableToday = false,
        slot,
        ...restProps
    } = props

    const dateMap = useMemo(() => {
        const dates = {}
        ranges.forEach((range) => {
            const {key} = range
            dates[key] = getDateRange(range, disableToday)
        })
        return dates
    }, [ranges, disableToday])

    const handleDateChange = useCallback(
        (values) => {
            onChange && onChange(values)
        },
        [onChange],
    )

    const activeTimeRange = useMemo(() => {
        const filterValue = Array.isArray(value) ? value.filter((v) => !!v) : []
        const [startValue, endValue] = filterValue
        const keys = Object.keys(dateMap)
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const range = dateMap[key]
            const [startDate, endDate] = range || []
            if (startValue && endValue) {
                if (
                    startDate &&
                    startDate.isSame(startValue, 'day') &&
                    endDate &&
                    endDate.isSame(endValue, 'day')
                ) {
                    return key
                }
            }
            if (filterValue.length === 0 && (!range || range.length === 0)) {
                return key
            }
        }
    }, [value, dateMap])

    const handleRangeChange = useCallback(
        (e) => {
            const key = e.target?.value
            const range = dateMap[key] || []
            onChange && onChange(range)
        },
        [dateMap, onChange],
    )

    const renderGroup = useMemo(() => {
        if (ranges?.length) {
            return (
                <RadioGroup
                    value={activeTimeRange}
                    onChange={handleRangeChange}
                    className={styles.radioGroup}
                >
                    {ranges.map((range) => {
                        const {key, name} = range
                        return (
                            <RadioButton key={key} value={key}>
                                {name}
                            </RadioButton>
                        )
                    })}
                </RadioGroup>
            )
        }
    }, [ranges, activeTimeRange, handleRangeChange])

    return (
        <div className={styles.rangePicker}>
            {renderGroup}
            <DateRange {...restProps} value={value} onChange={handleDateChange} />
            {slot}
        </div>
    )
}

DateRangeRadio.propTypes = {
    ranges: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string, // 作为key
            type: PropTypes.oneOf(RangeTypes), // 年 月 周 日 空
            name: PropTypes.string,
            num: PropTypes.number, // 0 当前，< 0 上，> 0 下
            single: PropTypes.bool, // type为RangeTypes.day时有效，true单天
        }),
    ),
    value: PropTypes.arrayOf(PropTypes.instanceOf(dayjs)),
    disableToday: PropTypes.bool,
    maxToday: PropTypes.bool,
    slot: PropTypes.node,
    onChange: PropTypes.func,
}

export default DateRangeRadio
