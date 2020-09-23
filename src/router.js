import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Loadable from 'react-loadable'

import LoadingPage from './container/LoadingPage/LoadingPage'

const HomePage = Loadable({
  loader: () => import('./container/HomePage/HomePage'),
  loading: LoadingPage,
})
const Header = Loadable({
  loader: () => import('./container/Header/Header'),
  loading: LoadingPage,
})

const Parent = () => (
  <React.Fragment>
    <Route path="*" component={Header} />
    <Route exact path="/home" component={HomePage} />
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