import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {DatePicker} from 'antd'
import dayjs from 'dayjs'

const {RangePicker} = DatePicker

function DateRange(props) {
    const {value = [], onChange, maxToday = false, disableToday = false, ...restProps} = props

    const disabledDate = useCallback(
        (current) => {
            if (maxToday) {
                const endMoment = disableToday ? dayjs().subtract(1, 'day') : dayjs()
                return current && current > endMoment.endOf('day')
            }
            return false
        },
        [maxToday, disableToday],
    )

    const handleDateChange = useCallback(
        (values) => {
            onChange && onChange(values || [])
        },
        [onChange],
    )

    return (
        <RangePicker
            {...restProps}
            value={value || []}
            disabledDate={disabledDate}
            onChange={handleDateChange}
        />
    )
}

DateRange.propTypes = {
    value: PropTypes.arrayOf(PropTypes.instanceOf(dayjs)),
    maxToday: PropTypes.bool,
    disableToday: PropTypes.bool,
    onChange: PropTypes.func,
}

export default DateRange
