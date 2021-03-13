import React from 'react'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import {ConfigProvider} from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import routes from './routes'

import styles from './App.less'

dayjs.locale('zh-cn')

const App = () => {
    return (
        <BrowserRouter>
            <ConfigProvider locale={locale}>
                <>
                    <ul className={styles.nav}>
                        {
                            routes.map((r) => {
                                return <li key={r.path}>
                                    <NavLink to={r.path} activeClassName={styles.active}>{r.name}</NavLink>
                                </li>
                            })
                        }
                    </ul>
                    <div className={styles.content}>
                        <Switch>
                            {
                                routes.map(({path, component: Page, exact, routes = []}, key) => {

                                    return <Route
                                        exact={exact}
                                        key={key}
                                        path={path}
                                        render={props => {
                                            return <Page {...props} routes={routes}/>
                                        }}
                                    />
                                })
                            }
                        </Switch>
                    </div>
                </>
            </ConfigProvider>
        </BrowserRouter>
    )
}

export default App;
