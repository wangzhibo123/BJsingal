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
const Header = loadable(() => import('./container/Header/Header'), { LoadingComponent: LoadingPage })
const Login = loadable(() => import('./container/Login/Login'), { LoadingComponent: LoadingPage })
const PlancontrolPage = loadable(() => import('./container/PlancontrolPage/PlancontrolPage'), { LoadingComponent: LoadingPage })

const Parent = () => (
  <React.Fragment>
    <Route path="*" component={Header} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/plancontrolpage" component={PlancontrolPage} />
  </React.Fragment>
)
export default function BasicRouter() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="login" />
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Parent} />
      </Switch>
    </Router>
  )
}