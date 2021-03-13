export const DateType = {
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year',
    empty: 'empty',
}

export const RangeTypes = Object.values(DateType)

export const DefaultRanges = [
    {
        key: 'today',
        type: DateType.day,
        name: '今日',
        num: 0,
    },
    {
        key: 'nearly7',
        type: DateType.day,
        name: '近7天',
        num: -7,
    },
    {
        key: 'nearly30',
        type: DateType.day,
        name: '近30天',
        num: -30,
    },
]
