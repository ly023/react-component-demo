import React from 'react'
import PropTypes from 'prop-types'
import {Select, Row, Col} from 'antd'
import provinceData from './province'
import cityData from './city'

const {Option} = Select

export default class ProvinceCity extends React.Component {
    static propTypes = {
        range: PropTypes.array,
    }

    static defaultProps = {
        range: [],
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    handleChange = (key, e) => {
        const [provinceName, cityName] = this.props.range
        let province = provinceName
        let city = cityName

        if (key === 'province') {
            province = e
            city = undefined
        } else {
            city = e
        }

        this.props.onChange([province, city])
    }

    render() {
        const [provinceName, cityName] = this.props.range

        let provinceId = ''

        // 省
        const provinceOptions = []
        provinceData.forEach((province) => {
            if (province.name === provinceName) {
                provinceId = province.id
            }
            provinceOptions.push(
                <Option key={province.id} value={province.name}>
                    {province.name}
                </Option>,
            )
        })

        // 市
        const cityOptions = []
        let cities = []
        if (provinceName) {
            cities = cityData[provinceId] || []
        }
        cities.forEach((city) => {
            cityOptions.push(
                <Option key={city.id} value={city.name}>
                    {city.name}
                </Option>,
            )
        })

        return (
            <Row gutter={10}>
                <Col span={12}>
                    <Select
                        allowClear
                        placeholder="请选择省份"
                        style={{width: '100%'}}
                        value={provinceName}
                        onChange={(e) => this.handleChange('province', e)}
                    >
                        <Option value="">未知</Option>
                        {provinceOptions}
                    </Select>
                </Col>
                <Col span={12}>
                    <Select
                        allowClear
                        placeholder="请选择城市"
                        value={cityName}
                        style={{width: '100%'}}
                        onChange={(e) => this.handleChange('city', e)}
                    >
                        <Option value="">未知</Option>
                        {cityOptions}
                    </Select>
                </Col>
            </Row>
        )
    }
}
