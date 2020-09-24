/**
 * @file 渲染基础地图
 */
const styleUrl = process.env.NODE_ENV === 'development' ?
  'mapabc://style/mapabc80' :
  'mapabc://style/mapabc80'
const mineMapConf = {
  container: 'mapContainer',
  style: styleUrl,
  center: [ 116.391,  39.911],
  zoom: 8,
  pitch: 0,
  maxZoom: 17,
  minZoom: 3,
}
export default mineMapConf
