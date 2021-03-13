/**
 * 日期选择组件
 */
import React, {useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import classNames from 'classnames'
import {DefaultRanges, RangeTypes} from '../constants'
import {getDateRange} from '../utils'

import styles from './index.less'

function RangeRadio(props) {
    const {ranges = DefaultRanges, value, onChange, className = ''} = props

    const dateMap = useMemo(() => {
        const dates = {}
        ranges.forEach((range) => {
            const {key} = range
            dates[key] = getDateRange(range)
        })
        return dates
    }, [ranges])

    const activeRangeKey = useMemo(() => {
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
            if (filterValue.length === 0 && range.length === 0) {
                return key
            }
        }
    }, [value, dateMap])

    const handleRangeChange = useCallback(
        (key, range) => {
            const dateRange = dateMap[key] || []
            onChange && onChange(dateRange, range)
        },
        [dateMap, onChange],
    )

    return (
        <ul className={classNames(styles.ranges, className)}>
            {ranges.map((range) => {
                const {key, name} = range
                const isActive = activeRangeKey === key
                return (
                    <li
                        key={key}
                        className={`${styles.range} ${isActive ? styles.active : ''}`}
                        onClick={() => handleRangeChange(key, range)}
                    >
                        {name}
                    </li>
                )
            })}
        </ul>
    )
}

RangeRadio.propTypes = {
    ranges: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string, // 作为key
            type: PropTypes.oneOf(RangeTypes), // 年 月 周 日 空
            name: PropTypes.string,
            num: PropTypes.number, // 0 当前，< 0 上，> 0 下
        }),
    ),
    value: PropTypes.arrayOf(PropTypes.instanceOf(dayjs)),
    onChange: PropTypes.func,
    className: PropTypes.string,
}

export default RangeRadio
