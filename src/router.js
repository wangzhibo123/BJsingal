import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import HomePage from './container/HomePage/HomePage'
import Header from './container/Header/Header'

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