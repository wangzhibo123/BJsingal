import React, { Component } from 'react'

class BaseMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <>
        {this.props.renderComponent(this.props.paramsName)}
      </>
    )
  }
}

export default BaseMessage
