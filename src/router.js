import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import loadable from 'loadable-components'

import LoadingPage from './container/LoadingPage/LoadingPage'

const HomePage = loadable(() => import('./container/HomePage/HomePage'), { LoadingComponent: LoadingPage })
const PlancontrolPage = loadable(() => import('./container/PlancontrolPage/PlancontrolPage'), { LoadingComponent: LoadingPage })
const Header = loadable(() => import('./container/Header/Header'), { LoadingComponent: LoadingPage })

const Parent = () => (
  <React.Fragment>
    <Route path="*" component={Header} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/plancontrolpage" component={PlancontrolPage} />
    <Redirect exact from="/" to="/home" />
  </React.Fragment>
)
export default function BasicRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Parent} />
      </Switch>
    </Router>
  )
}