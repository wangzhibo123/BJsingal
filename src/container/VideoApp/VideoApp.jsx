import React, { Component } from 'react'
//引入依赖
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'
import styles from './VideoApp.scss'
const url = [
    {
        // url:"rtmp://192.168.1.124:9999/live/25371",
        url:"rtmp://58.200.131.2:1935/livetv/hunantv",
        name:"湖南卫视"
    },
    {
        url:"rtmp://202.69.69.180:443/webcast/bshdlive-pc",
        name:"香港财经"
    }
]
class VideoApp extends Component{
  state={
      nowPlay:""
  }
//组件挂载完成之后初始化播放控件
  componentDidMount(){
  const videoJsOptions = {
          autoplay: true,
          controls: true,
          sources: [{
            // src: 'rtmp://192.168.1.124:9999/live/25371',
            src: 'rtmp://58.200.131.2:1935/livetv/hunantv',
            type: 'rtmp/flv'
          }]
        }
      this.player = videojs('my-video', videoJsOptions , function onPlayerReady() { //(id或者refs获取节点，options，回调函数)
          videojs.log('Your player is ready!');
          // In this context, `this` is the player that was created by Video.js.
          this.play();
          // How about an event listener?
          this.on('ended', function() {
            videojs.log('Awww...over so soon?!');
          });
        }); 
  }

  handleClick(item){
      if(item.name===this.state.nowPlay){
          return
      }
      this.setState({
          nowPlay:item.name
      })
          this.player.pause();
          this.player.src(item.url);
          this.player.load();
          this.player.play();
  }
  render(){
      let li = {
          background: "cadetblue",
          padding: "11px",
          width: "fit-content",
          marginBottom:"5px",
          cursor:"pointer"
      }
      let playing = {
          background: "rgb(141, 182, 28)",
          padding: "11px",
          width: "fit-content",
          marginBottom:"5px",
          cursor:"pointer"
      }
    return(
       <div className="VideoAppBox">
        {/* 视频流开发中... */}
            <div>rtmp 视频流Demo</div>
              <div>
                  <ul style={{marginTop:'-100px'}}>
                  {
                      url.map((item,index)=>{
                          return <li style={{height:60}} key={item.name} onClick={()=>this.handleClick(item)}>
                                      <span style={this.state.nowPlay === item.name ? playing : li }>{item.name}</span>
                                  </li>
                      })
                  }
                  </ul>
                  <video style={{width:"50vw",height:"50vh",margin:"0 auto"}} id="my-video" className="video-js vjs-default-skin">
                  </video>
              </div> 
          </div>   
      )
  }
}

export default VideoApp