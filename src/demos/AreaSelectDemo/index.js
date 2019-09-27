/**
 * 省市选择
 */
import React from 'react'
import ProvinceCity from './components/ChinaRegions/ProvinceCity'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            range: [],
        }
    }

    handleChange = (range) => {
        this.setState({range})
    }

    render() {
        const {range} = this.state

        return (
            <div>
                <ProvinceCity
                    range={range}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
