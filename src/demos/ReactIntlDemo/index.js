/**
 * react-intl国际化
 */
import React, {useState} from 'react'
import {IntlProvider, FormattedMessage, FormattedDate, FormattedTime} from 'react-intl'

import zh_CN from './locale/zh_CN'
import en_US from './locale/en_US'

function App() {
    let languages = {
        en: en_US,
        zh: zh_CN
    }

    const [language, setLanguage] = useState('zh')

    return (
        <IntlProvider locale={language} messages={languages[language]}>
            <>
                {
                    Object.keys(languages).length ? <div>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{width: 100}}>
                            {
                                Object.keys(languages).map((l, i) => {
                                    return <option key={i} value={l}>{l}</option>
                                })
                            }
                        </select>
                    </div> : null
                }
                <FormattedMessage id="hello" values={{name: "Evelyn"}}/>
                <FormattedMessage id="lock"/>
                <FormattedDate
                    value={new Date(1459832991883)}
                    year="numeric"
                    month="long"
                    day="2-digit"
                />
                <FormattedTime value={new Date(1459832991883)}/>
            </>
        </IntlProvider>
    );
}

export default App;
