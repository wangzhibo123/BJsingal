import React, { Component } from "react";
import "./MainMonitoring.scss";
import mineMapConf from "../../utils/minemapConf";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;
export default class MainMonitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateSelect: [
        {
          name: "海淀区",
          id: "1",
          children: [{
            name: "西二旗",
            id: "1_1"
          },
          {
            name: "西直门",
            id: "1_2"
          },
          {
            name: "东直门",
            id: "1_3"
          }]
        },
        {
          name: "朝阳区",
          id: "2",
          children: [{
            name: "奥林匹克",
            id: "2_1"
          },
          {
            name: "欢乐谷",
            id: "2_2"
          }]
        },
        {
          name: "上地",
          id: "3",
          children: [{
            name: "华联",
            id: "3_1"
          }, {
            name: "中关村",
            id: "3_2"
          }]
        },
        {
          name: "三里屯",
          id: "4",
          children: [
            {
              name: "太里古",
              id: "4_1"
            }, {
              name: "乾坤大厦",
              id: "4_2"
            }
          ]
        }
      ]
    };
  }
  componentDidMount() {
    this.renderMap();
  }

  addMarker = () => {
    if (this.map) {
      const el = document.createElement("div");
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "green";
      const marker = new window.mapabcgl.Marker(el)
        .setLngLat([116.391, 39.911])
        .addTo(this.map);
      console.log(marker);
    }
  };
  renderMap = () => {
    mineMapConf.zoom = 11;
    const map = new window.mapabcgl.Map(mineMapConf);
    map.addControl(
      new window.mapabcgl.NavigationControl({
        showCompass: true,
        position: "bottom-right",
      })
    );
    const options = {
      minzoom: 1, // 路况显示的最小级别(1-24)
      maxzoom: 24, // 路况显示的最大级别(1-24)
      type: "vector", // 路况图层类型:vector(矢量),raster(栅格)
      refresh: 30 * 1000, // 路况图层刷新时间，毫秒
      // before:'roads-symbol-49'
    };
    map.on("load", () => {
      map.trafficLayer(true, options);
      this.addMarker();
    });
    this.map = map;
  };
  render() {
    return (
      <div className="mainMon">
        <div className="NavMon">
          <div className="topNavMon">
            <div className="selectNav">
              <Select
                defaultValue="海淀区"
                style={{ width: 100, height: 30 }}
              >
                {
                  this.state.stateSelect.map((item, index) => {
                    return (
                      <Option value={index} style={{ width: 100, height: 30 }}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </div>
            <div className="iptSearchNav">
              <input type="text" placeholder="查询…" className="inptNavMon" />
              <div className="MagBox">
                <SearchOutlined />
              </div>
            </div>
          </div>

          <div className="listNav">
            <ul className="allNavList">
              <li>万泉河路</li>
              <div className="line"></div>
              <li>万泉河路</li>
              <div className="line"></div>
              <li>万泉河路</li>
              <div className="line"></div>
              <li>万泉河路</li>
              <div className="line"></div>
              <li>万泉河路</li>
              <div className="line"></div>
            </ul>
          </div>
        </div>
        <div className="mapContent">
          <div id="mapContainer" className="map-container"></div>
        </div>
      </div>
    );
  }
}
