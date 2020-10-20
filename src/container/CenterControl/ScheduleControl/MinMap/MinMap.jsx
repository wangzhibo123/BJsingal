import React, { Component } from 'react'
import "./MinMap.scss"
import mineMapConf from "../../../utils/minemapConf";
import { SearchOutlined } from "@ant-design/icons";
export default class MinMap extends Component {
    constructor(props) {
        super(props)
        this.state = {};
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
            <div className="minMapHome">            
                <div className="mapHome">
                    <div className="modeMainIptHome">
                    <input type="text" placeholder="查询…" className="modeMainIpt" />
                    <div className="modeMainIptBox">
                        <SearchOutlined />
                    </div>
                    </div>
                    <div className="mapContent">
                        <div id="mapContainer" className="map-container"></div>
                    </div>
                </div>
            </div>
        )
    }
}
