import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import loadable from 'loadable-components'

import LoadingPage from './container/LoadingPage/LoadingPage'

const Login = loadable(() => import('./container/Login/Login'), { LoadingComponent: LoadingPage })
const Header = loadable(() => import('./container/Header/Header'), { LoadingComponent: LoadingPage })
const HomePage = loadable(() => import('./container/HomePage/HomePage'), { LoadingComponent: LoadingPage })
const PlancontrolPage = loadable(() => import('./container/PlancontrolPage/PlancontrolPage'), { LoadingComponent: LoadingPage })
const InterMonitor = loadable(() => import('./container/InterMonitor/InterMonitor'), { LoadingComponent: LoadingPage })
const LineMon = loadable(() => import("./container/CenterControl/MainMonitoring/MainMonitoring"), { LoadingComponent: LoadingPage })
const AreaMon = loadable(() => import("./container/CenterControl/AreaMonitoring/AreaMonitoring"), { LoadingComponent: LoadingPage })
const Intersection = loadable(() => import("./container/IntegratedManagement/Intersection/Intersection"), { LoadingComponent: LoadingPage })
const Region = loadable(() => import("./container/IntegratedManagement/Region/Region"), { LoadingComponent: LoadingPage })
const SignalParameters = loadable(() => import("./container/IntegratedManagement/SignalParameters/SignalParameters"), { LoadingComponent: LoadingPage })
const UserManagement = loadable(() => import("./container/SystemManagement/UserManagement/UserManagement"), { LoadingComponent: LoadingPage })
const AuthManagement = loadable(() => import("./container/SystemManagement/AuthManagement/AuthManagement"), { LoadingComponent: LoadingPage })
const OperationMonitoring = loadable(() => import("./container/SystemManagement/OperationMonitoring/OperationMonitoring"), { LoadingComponent: LoadingPage })
const OperationLog = loadable(() => import("./container/SystemManagement/OperationLog/OperationLog"), { LoadingComponent: LoadingPage })
const TimeControl = loadable(() => import("./container/CenterControl/ScheduleControl/ScheduleControl"), { LoadingComponent: LoadingPage })
const Parent = () => (
  <React.Fragment>
    <Route path="*" component={Header} />
    <Route exact path="/home" component={HomePage} />
    <Route path="/lineMon" component={LineMon} />
    <Route path="/areaMon" component={AreaMon} />
    <Route exact path="/plancontrolpage" component={PlancontrolPage} />
    <Route exact path="/intermonitor" component={InterMonitor} />
    <Route exact path="/intersection" component={Intersection} />
    <Route exact path="/region" component={Region} />
    <Route exact path="/signalParameters" component={SignalParameters} />
    <Route exact path="/UserManagement" component={UserManagement} />
    <Route exact path="/AuthManagement" component={AuthManagement} />
    <Route exact path="/OperationMonitoring" component={OperationMonitoring} />
    <Route exact path="/OperationLog" component={OperationLog} />
    <Route path="/timeControl" component={TimeControl} />
  </React.Fragment>
)
export default function BasicRouter() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="login" />
        <Route exact path="/login" component={Login} />
        <ConfigProvider locale={zhCN}>
          <Route path="/" component={Parent} />
        </ConfigProvider>
      </Switch>
    </Router>
  )
}