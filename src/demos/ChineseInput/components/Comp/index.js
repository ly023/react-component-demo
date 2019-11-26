import React from 'react'

class ChineseInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.composing = false
    }

    search = (val) => {
        if (val) {
            console.log(`===请求===：${val}`)
        }
    }

    handleChange = e => {
        const {value} = e.target

        // console.log("onChange", this.composing, value)

        this.setState({
            value: value
        })

        if (!this.composing) {
            this.search(value)
        }
    }

    onCompositionStart = () => {
        // console.log("onCompositionStart")
        this.composing = true
    }

    onCompositionEnd = (e) => {
        // console.log("onCompositionEnd")
        this.composing = false
        this.search(e.target.value)
    }

    render() {
        const {value} = this.state

        return (
            <div>
                <h2>中文输入搜索 Class Component</h2>
                <input
                    value={value}
                    onChange={this.handleChange}
                    onCompositionStart={this.onCompositionStart}
                    // onCompositionUpdate={this.onCompositionUpdate}
                    onCompositionEnd={this.onCompositionEnd}
                />
            </div>
        )
    }
}

export default ChineseInput
