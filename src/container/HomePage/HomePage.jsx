import React, { Component } from 'react'
import './HomePage.scss'

import Header from '../Header/Header'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="homepageWrapper">
        <Header />
      </div>
    )
  }
}

export default Homepage
