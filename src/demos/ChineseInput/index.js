import React from 'react'
import Comp from './components/Comp'
import Hooks from './components/Hooks'

export default class ChineseInput extends React.Component {

    render() {
        const contentStyle = {
            display: 'flex'
        }

        const boxStyle = {
            flex: 1,
            padding: '20px 10px',
            borderWidth: '0 1px',
            borderStyle: 'solid',
            borderColor: '#bbb'
        }

        return (
            <div style={contentStyle}>
                <div style={boxStyle}>
                    <Comp/>
                </div>
                <div style={boxStyle}>
                    <Hooks/>
                </div>
            </div>
        );
    }
}

