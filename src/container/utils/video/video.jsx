//<Video url={this.state.url} showB={true}></Video>
// url => 数据源 showB => 是否显示按钮
import React, { Component } from 'react'
//引入依赖
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'
import { Button} from "antd"
import "./video.scss"
import axiosInstance from '../../utils/getInterfaceData'

class VideoApp extends Component{
  constructor(props){
    super(props)
    this.state={
      nowPlay:"",
      showButton:this.props.showB && true,
      newState:[],
    }
    //视频接口
    this.videoState="/control-application-front/video/get/rtmp/url/1920/1080"
  }
//组件挂载完成之后初始化播放控件
  componentDidMount(){
    const {newState} =this.state;
      axiosInstance.post(this.videoState,{"cameraCode": "08143150969233750102#f0dfa07ea18f4a5da535fd251bdc5569","mediaURLParam": {"broadCastType": 0,"packProtocolType": 1,"protocolType": 2,"serviceType": 1,"streamType": 1,"transMode": 0}}).then(res=>{
        console.log(res.data)
        this.setState({newState:res.data})
        if(newState!=undefined){
          const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              // src: 'rtmp://192.168.1.124:9999/live/31434',
              src: res.data[0].url,
              type: 'rtmp/flv'
            }]
        }
        this.player = videojs(res.data[0].id.slice(0,6), videoJsOptions , function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
            videojs.log('Your player is ready!');
            // In this context, `this` is the player that was created by Video.js.
            this.play();
            // How about an event listener?
            this.on('ended', function() {
              videojs.log('Awww...over so soon?!');
            });
          });
        }
      })
  }
 
  handleClick(item){
      if(item.name===this.state.nowPlay){
          return
      }
      this.setState({
          nowPlay:item.name,
          displayStyle:item.displayStyle
      })
          this.player.pause();
          //切换网址
          this.player.src(item.url);
          this.player.load();
          this.player.play();
  }
  componentWillUnmount = () =>{
    // console.log(this.props.url,"url")
    const myVideoElem = document.getElementById(this.state.newState[0].id.slice(0,6));
    if(myVideoElem){
        const player = videojs(this.state.newState[0].id.slice(0,6));
        player.dispose();
    }
  }
  render(){ 
      let li = {
      }
      let playing = {
         color:"#fff"
      }
    return(
       <div className="VideoAppBox">
              <div>
                  <ul style={{marginBottom:"13px"}}>
                  {
                    this.state.showButton&&this.state.newState.map((item,index)=>{
                          return <Button  key={item.name} onClick={()=>this.handleClick(item)} style={{width:"66px",height:"40px",background: "#010F46",border: "1px solid #4289E1",color: "#515A8B",fontSize: "20px",boxShadow:"inset 0px 0px 1.7px 1px #4289E1",marginLeft: "18px"}}>
                                      <span style={this.state.displayStyle === item.displayStyle ? playing : li }>{item.name}</span>
                                  </Button>
                      })
                  }
                  </ul>
                  {
                    this.state.showButton&&this.state.newState.map((item,index)=>{
                      console.log(item.id.slice(0,6))
                      return <video key={index} style={{width:"483px",height:"292px",marginLeft:"18px"}} id={item.id.slice(0,6)} className="video-js vjs-default-skin">
                      </video>
                    })
                  }
                  
              </div>
        </div>
      )
  }
}

export default VideoApp