import React, { Component } from 'react'
import './Region.scss'

class ExpresswayControl extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {

  }

  render() {
    return (
      <div className='specialTopicBox' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
        快速路控制开发中...
      </div>  
      )
  }
}

export default ExpresswayControl