import React, { Component } from 'react'
import './SingalParams.scss'


class SingalParams extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <div className="singalParamsBox">
        {this.props.renderComponent(this.props.paramsName)}
      </div>
    )
  }
}

export default SingalParams
