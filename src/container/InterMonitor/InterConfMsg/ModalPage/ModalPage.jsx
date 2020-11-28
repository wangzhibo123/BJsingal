import React, { Component } from 'react'


class ModalPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => { }
  render() {
    return (
      <>
        {this.props.renderComponent(this.props.modalName)}
      </>
    )
  }
}

export default ModalPage
