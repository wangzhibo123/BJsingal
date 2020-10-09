import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import loadable from 'loadable-components'

import LoadingPage from './container/LoadingPage/LoadingPage'

const Login = loadable(() => import('./container/Login/Login'), { LoadingComponent: LoadingPage })
const Header = loadable(() => import('./container/Header/Header'), { LoadingComponent: LoadingPage })
const HomePage = loadable(() => import('./container/HomePage/HomePage'), { LoadingComponent: LoadingPage })
const PlancontrolPage = loadable(() => import('./container/PlancontrolPage/PlancontrolPage'), { LoadingComponent: LoadingPage })
const InterMonitor = loadable(() => import('./container/InterMonitor/InterMonitor'), { LoadingComponent: LoadingPage })
const LineMon = loadable(() => import("./container/CenterControl/MainMonitoring/MainMonitoring"), { LoadingComponent: LoadingPage })
const AreaMon = loadable(() => import("./container/CenterControl/AreaMonitoring/AreaMonitoring"), { LoadingComponent: LoadingPage })
const Parent = () => (
  <React.Fragment>
    <Route path="*" component={Header} />
    <Route exact path="/home" component={HomePage} />
    <Route path="/lineMon" component={LineMon} />
    <Route path="/areaMon" component={AreaMon} />
    <Route exact path="/plancontrolpage" component={PlancontrolPage} />
    <Route exact path="/intermonitor" component={InterMonitor} />
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