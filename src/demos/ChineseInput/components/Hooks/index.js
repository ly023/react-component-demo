import React, {useState} from 'react'

let composing = false

function ChineseInput() {
    const [value, setValue] = useState('')

    const search = (val) => {
        if (val) {
            console.log(`===请求===：${val}`)
        }
    }

    const onChange = (e) => {
        const val = e.target.value
        // console.log('onChange', val, composing)
        setValue(val)
        if (!composing) {
            search(val)
        }
    }

    const onCompositionStart = () => {
        // console.log('onCompositionStart')
        composing = true
    }

    const onCompositionEnd = (e) => {
        // console.log('onCompositionEnd')
        composing = false
        search(e.target.value)
    }

    return <div>
        <h2>中文输入搜索 Hooks</h2>
        <input
            value={value}
            onChange={onChange}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
        />
    </div>
}

export default ChineseInput
