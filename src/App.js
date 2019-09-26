import React from 'react'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import routes from './routes'
import './App.css'

const App = () => {
  return (
      <BrowserRouter>
        <div className="app">
          <ul className="nav">
            {
              routes.map((r) => {
                return <li key={r.path}>
                  <NavLink to={r.path} activeClassName="active">{r.name}</NavLink>
                </li>
              })
            }
          </ul>
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
      </BrowserRouter>
  )
}

export default App;
