//<Video showB={true}></Video>
// url => 数据源 showB => 是否显示按钮
import React, { Component } from 'react'
//引入axios
import axiosInstance from '../../../container/utils/getInterfaceData'
//引入依赖
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'
class VideoApp extends Component{
  constructor(props){
    super(props)
    this.state={
      nowPlay:"",
      width: this.props.width || "483px",
      height: this.props.height || "300px",
      // newState: this.props.url ? this.props.url : null,
      newState: this.props.url ? null : [{ url: "rtmp://58.200.131.2:1935/livetv/cctv13", name: "南", id: 'my_S' }],
    }
  }
  componentWillMount = () => {
    this.getVideoMonCarList()
  }
  //组件挂载完成之后初始化播放控件
  componentDidMount=()=>{
    setTimeout(() =>{
      console.log('进来没？', this.state.newState)
      if (this.state.newState) {
        const { newState } = this.state;
        if (newState !== null) {
          const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              // src: 'rtmp://192.168.1.124:9999/live/31434',
              src: newState[0].url,
              type: 'rtmp/flv'
            }]
          }
          this.player = videojs(newState[0].id, videoJsOptions, function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
            videojs.log('Your player is ready!');
            // In this context, `this` is the player that was created by Video.js.
            this.play();
            // How about an event listener?
            this.on('ended', function () {
              videojs.log('Awww...over so soon?!');
            });
          });
        }
      }
    },360)
  }
  getVideoMonCarList = () =>{
    axiosInstance.post(this.props.url,{"cameraCode": "08143150969233750102#f0dfa07ea18f4a5da535fd251bdc5569","mediaURLParam": {"broadCastType": 0,"packProtocolType": 1,"protocolType": 2,"serviceType": 1,"streamType": 1,"transMode": 0}}).then(res=>{
      if(res.data.code === 200){
        this.setState({
          newState:res.data.data
        })
        // setTimeout(() =>{
        //   console.log('进来没？', this.state.newState)
        //   if (this.state.newState) {
        //     const { newState } = this.state;
        //     if (newState !== null) {
        //       const videoJsOptions = {
        //         autoplay: true,
        //         controls: true,
        //         sources: [{
        //           // src: 'rtmp://192.168.1.124:9999/live/31434',
        //           src: newState[0].url,
        //           type: 'rtmp/flv'
        //         }]
        //       }
        //       this.player = videojs(newState[0].id, videoJsOptions, function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
        //         videojs.log('Your player is ready!');
        //         // In this context, `this` is the player that was created by Video.js.
        //         this.play();
        //         // How about an event listener?
        //         this.on('ended', function () {
        //           videojs.log('Awww...over so soon?!');
        //         });
        //       });
        //     }
        //   }
        // },1500)
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
    const { newState} =this.state;
    const myVideoElem = document.getElementById(newState[0].id);
    if(myVideoElem){
        const player = videojs(newState[0].id);
        player.dispose();
    }
  }
  render(){
      const { newState, width ,height} =this.state;
    return(
       <div className="VideoAppBox">
          {
            newState && newState.map((item,index) => {
              return <video key={index} style={{width:width,height:height,borderRadius:"6px",textAlign:"center",marginLeft:'15px'}} id={item.id} className="video-js vjs-default-skin">
              </video>
            })
          }
        </div>
      )
    }
}

export default VideoApp