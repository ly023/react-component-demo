/**
 * range
 */
import React from 'react'
import Range1 from './components/Range1'
import Range2 from './components/Range2'
import Range3 from './components/Range3'

export default class ChineseInput extends React.Component {

    render() {
        const contentStyle = {
            display: 'flex'
        }

        const boxStyle = {
            flex: 1,
            padding: '40px',
            borderWidth: '0 1px',
            borderStyle: 'solid',
            borderColor: '#bbb'
        }

        return (
            <div style={contentStyle}>
                <div style={boxStyle}>
                    <Range1/>
                </div>
                <div style={boxStyle}>
                    <Range2/>
                </div>
                <div style={boxStyle}>
                    <Range3/>
                </div>
            </div>
        );
    }
}

