import React ,{Component} from "react";
import "./calender.scss"
import {Select} from "antd"
import {LeftOutlined,RightOutlined, SolutionOutlined} from "@ant-design/icons"
const {Option} =Select
export default class CalenderPublic extends Component {
    constructor(props){
        super(props)
        this.state={
            calenderWeek:["一","二","三","四","五","六","日"],
            calenderSolarTerm:["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
            calenderSTermInfo:[0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],
            calenderNStr1:['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            calenderNStr2:['初', '十', '廿', '卅'],
            calenderSelectYear:["1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020"],
            calenderSelectMonth:["1","2","3","4","5","6","7","8","9","10","11","12"],
            calenderSolarMonth:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            calenderLunarInfo:[0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
                0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
                0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
                0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
                0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
                0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
                0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
                0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
                0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
                0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
                0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
                0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
                0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
                0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
                0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0],
            //公历节日
            calenderSFtv:["0101 元旦",
            "0214 情人节",
            "0308 妇女节",
            "0312 植树节",
            "0315 消费者权益日",
            "0401 愚人节",
            "0501 劳动节",
            "0504 青年节",
            "0512 护士节",
            "0601 儿童节",
            "0701 建党节",
            "0801 建军节",
            "0910 教师节",
            "0928 孔子诞辰",
            "1001 国庆节",
            "1006 老人节",
            "1024 联合国日",
            "1224 平安夜",
            "1225 圣诞节"],
            //农历节日
            calenderLFtv:[ "0101 春节",
            "0115 元宵节",
            "0505 端午节",
            "0707 七夕情人节",
            "0715 中元节",
            "0815 中秋节",
            "0909 重阳节",
            "1208 腊八节",
            "1224 小年"],
            eve:0,
            tY:new Date().getFullYear(),
            tM:new Date().getMonth(),
            tD:new Date().getDate(),
            cld:[],
            fat:9,
            mat:9,
            frontBox:[1,1,1,1,1,1],
            laterBox:[1,1,1,1,1,1],
            //内置表格比例开关
            tableSizeSwitch:true
        }
    }
    componentDidMount(){
        //初始日期  
        this.changeCld(this.state.tY,this.state.tM)
    }
    handleChange=(value)=>{
        if(+value<13){
            this.changeCld(this.state.tY,+value-1)
            this.setState({
                tM:+value-1
            })
        }else {
            this.changeCld(+value,this.state.tM)
            this.setState({
                tY:+value
            })
        }
    }
    //返回农历y年的总天数
    lYearDays(y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1)sum += (this.state.calenderLunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + this.leapDays(y));
    }
    //返回农历y年闰月的天数
    leapDays(y) {
        if (this.leapMonth(y)) return ((this.state.calenderLunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        else return (0);
    }
    //判断y年的农历中那个月是闰月,不是闰月返回0
    leapMonth(y) {
        return (this.state.calenderLunarInfo[y - 1900] & 0xf);
    }
    //返回农历y年m月的总天数
    monthDays(y, m) {
        return ((this.state.calenderLunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    }
    //算出当前月第一天的农历日期和 当前农历日期下一个月农历的第一天日期
    Dianaday(objDate) {
        var i, leap = 0, temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = this.lYearDays(i)
            offset -= temp;
            this.monCyl += 12;
        }
        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = this.leapMonth(i); //闰哪个月
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) {    //闰月
                --i; this.isLeap = true; temp = this.leapDays(this.year);
            }
            else {
                temp = this.monthDays(this.year, i);
            }
            if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;    //解除闰月
            offset -= temp;
            if (this.isLeap == false) this.monCyl++;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) { this.isLeap = false; }
            else { this.isLeap = true; --i; --this.monCyl; }
        if (offset < 0) { offset += temp; --i; --this.monCyl; }
        this.month = i;
        this.day = offset + 1;
        // console.log(this.month,this.day,"suanfa ")
        return {year:this.year,month:this.month,day:this.day,isLeap:this.isLeap}
    }
    //返回公历y年m+1月的天数
    solarDays(y, m) {
        if (m == 1)
            return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
        else
            return (this.state.calenderSolarMonth[m]);
    }
    //记录公历和农历某天的日期
    calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap) {
        this.isToday = false;
        //公历
        this.sYear = sYear;
        this.sMonth = sMonth;
        this.sDay = sDay;
        this.week = week;
        //农历
        this.lYear = lYear;
        this.lMonth = lMonth;
        let roundLDay=Math.round(lDay)
        if(roundLDay<=10){
             let round=roundLDay
             lDay='初'+this.state.calenderNStr1[round]
        }else if(10 < roundLDay && roundLDay<20){
            let round=roundLDay*1-10;
            lDay='十'+this.state.calenderNStr1[round]
        }else if(roundLDay==20){
            lDay="二十"
        }else if(20<roundLDay && roundLDay<30){
            let round=roundLDay*1-20
            lDay='廿'+this.state.calenderNStr1[round]
        }else if(roundLDay==30){
            lDay="三十"
        }else {
            lDay=""
        }
        this.lDay = lDay;
        this.isLeap = isLeap;
        //节日记录
        this.lunarFestival = ''; //农历节日
        this.solarFestival = ''; //公历节日
        this.solarTerms = ''; //节气
        // console.log(this.sYear,this.sMonth,this.sDay,this.week,"公历")
        // console.log(this.lYear,this.lMonth,this.lDay,this.isLeap,"农历")
        // console.log(this.lunarFestival,this.solarFestival,this.solarTerms,"节日")
        let obj = new Object();
        obj.sYear = this.sYear;
        obj.sMonth = this.sMonth;
        obj.sDay = this.sDay;
        if(this.week==="六"||this.week==="日"){
            obj.color="#FE6A02"
        }
        obj.week = this.week;
        obj.lYear = this.lYear;
        obj.lMonth = this.lMonth;
        obj.lDay = this.lDay;
        obj.isLeap = this.isLeap;
        obj.lunarFestival = this.lunarFestival;
        obj.solarFestival = this.solarFestival;
        obj.solarTerms = this.solarTerms;
        return obj
    }

     //返回某年的第n个节气为几日(从0小寒起算)
     sTerm(y, n) {
        var offDate = new Date((31556925974.7 * (y - 1900) + this.state.calenderSTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        return (offDate.getUTCDate())
    }

    //计算格子数
    CountTheCells(frontGrid,LaterGrid){
        let newFrontArray=[];
        let newLaterArray=[];
        for(var i=0;i<frontGrid;i++){
            newFrontArray.push(1)
        }
        for(var i=0;i<LaterGrid+1;i++){
            newLaterArray.push(1)
        }
        this.setState({
            frontBox:newFrontArray,
            laterBox:newLaterArray
        })
    }
    //保存y年m+1月的相关信息
    calendar(y, m) {
        //做好的数据给cld
        var fat =  0;
        var mat =  0;
        var sDObj,sLObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2;
        var lDPOS = new Array(3);
        var n = 0;
        var firstLM = 0;
        var arr=[];
        sDObj = new Date(y, m, 1);    //当月第一天的日期
          //当月最后一天的日期
        this.length = this.solarDays(y, m);    //公历当月天数   31
        sLObj=new Date(y,m,this.length);  
        this.firstWeek = sDObj.getDay();    //公历当月1日星期几
        this.lastWeek=sLObj.getDay();          //公历当月最后一天星期几
        if(this.firstWeek===0){
            this.firstWeek=7
        }else if(this.lastWeek===0){
            this.lastWeek=7
        }
        if(this.firstWeek < 6){
            this.setState({
                tableSizeSwitch:false
            })
        }else if(this.firstWeek > 6){
            this.setState({
                tableSizeSwitch:true
            })
        }else if(this.firstWeek===6&&this.length>29){
            this.setState({
                tableSizeSwitch:true
            })
        }
        //表格格子数
        this.frontGrid=this.firstWeek-1;
        this.LaterGrid=7-this.lastWeek-1;
        
        // console.log(this.frontGrid,this.LaterGrid,"爸爸")
        this.CountTheCells(this.frontGrid,this.LaterGrid)
        if ((m + 1) == 5) { fat = sDObj.getDay() }
        if ((m + 1) == 6) { mat = sDObj.getDay() }
        // console.log(this.length,"------------length")
        for (var i = 0; i < this.length; i++) {
            if (lD > lX) {
                sDObj = new Date(y, m, i + 1); //当月第一天的日期
                // console.log(sDObj.getDay(),"当月第一天的日期")
                lDObj = this.Dianaday(sDObj);     //农历

                // console.log(lDObj,"农历")/
                lY = lDObj.year;           //农历年
                lM = lDObj.month;          //农历月
                lD = lDObj.day;            //农历日
                lL = lDObj.isLeap;         //农历是否闰月
                lX = lL ? this.leapDays(lY) : this.monthDays(lY, lM); //农历当月最后一天
                // console.log(lX,"最后一天")
                if (lM == 12) { this.state.eve = lX }
                if (n == 0) firstLM = lM;
                lDPOS[n++] = i - lD + 1;
            }
            let arrList= this.calElement(y, m + 1, i + 1, this.state.calenderNStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL);
            arr.push(arrList)
        }
        //节气
            //本月第一个节气 日期-1
            let FirstSolarDate = this.sTerm(y, m * 2) - 1;
            //本月第二个节气 日期-1
            let LastSolarDate = this.sTerm(y, m * 2 + 1) - 1;
            //本月一个节气名称
            let FirstSolar = this.state.calenderSolarTerm[m * 2];
            //本月二个节气名称
            let lastSolar = this.state.calenderSolarTerm[m * 2 + 1];
            //添加节气名称到数组
            arr[FirstSolarDate].lunarFestival=FirstSolar;
            arr[LastSolarDate].lunarFestival=lastSolar;
            arr.splice(FirstSolarDate,1,arr[FirstSolarDate])
            arr.splice(LastSolarDate,1,arr[LastSolarDate])
            return arr
    }
     //用中文显示农历的日期
     cDay(d) {
        var s;
        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
            case 30:
                s = '三十';
                break;
            default:
                s = this.state.calenderNStr2[Math.floor(d / 10)];
                //s += nStr1[d % 10];
                s += this.state.calenderNStr1[parseInt(d % 10)];
                break;
        }
        return (s);
    }
    //在表格中显示公历和农历的日期,以及相关节日
    drawCld(SY, SM) {
        var TF = true;
        var p1 =  "";
        var p2 =  "";
        var i, sD, s, size;
        var cld = this.calendar (SY, SM);
        this.setState({
            cld:cld
        })
        // for (i = 0; i < 42; i++) {
        //     let sObj = eval('SD' + i);
        //     let lObj = eval('LD' + i);
        //     sObj.className = '';
        //     sD = i - this.state.cld.firstWeek;
        //     if (sD > -1 && sD < this.state.cld.length) { //日期内
        //         sObj.innerHTML = sD + 1;
        //         if (this.state.cld[sD].isToday) {
        //             sObj.style.color = 'white'; //今日颜色
        //             lObj.style.color = 'white'; //今日颜色
        //             sObj.parentNode.style.background = 'blue'; //今日背景
        //             sObj.parentNode.style['border-radius'] = '100px'; //圆角
        //         } else {
        //             sObj.style.color = '';
        //         }
        //         if (this.state.cld[sD].lDay == 1) { //显示农历月
        //             lObj.innerHTML = '<b>' + (this.state.cld[sD].isLeap ? '闰' : '') + this.state.cld[sD].lMonth + '月' + (this.monthDays(this.state.cld[sD].lYear, this.state.cld[sD].lMonth) == 29 ? '小' : '大') + '</b>';
        //         }
        //         else { //显示农历日
        //             lObj.innerHTML = this.cDay(this.state.cld[sD].lDay);
        //         }
        //         var Slfw =  null;
        //         var Ssfw =  null;
        //         s = this.state.cld[sD].solarFestival;
        //         for (var ipp = 0; ipp < this.state.calenderLFtv.length; ipp++) {    //农历节日
        //             if (parseInt(this.state.calenderLFtv[ipp].substr(0, 2)) === parseInt(this.state.cld[sD].lMonth)) {
        //                 if (parseInt(this.state.calenderLFtv[ipp].substr(2, 4)) === parseInt(this.state.cld[sD].lDay)) {
        //                     lObj.innerHTML = this.state.calenderLFtv[ipp].substr(5);
        //                     Slfw = this.state.calenderLFtv[ipp].substr(5);
        //                 }
        //             }
        //             if (12 == (this.state.cld[sD].lMonth)) {    //判断是否为除夕
        //                 if (this.state.eve == (this.state.cld[sD].lDay)) { lObj.innerHTML = "除夕"; Slfw = "除夕"; }
        //             }
        //         }
        //         for (var ipp = 0; ipp < this.state.calenderSLFtv.length; ipp++) {    //公历节日
        //             if (parseInt(this.state.calenderSFtv[ipp].substr(0, 2)) == (SM + 1)) {
        //                 if (parseInt(this.state.calenderSFtv[ipp].substr(2, 4)) == (sD + 1)) {
        //                     lObj.innerHTML = this.state.calenderSFtv[ipp].substr(5);
        //                     Ssfw = this.state.calenderSFtv[ipp].substr(5);
        //                 }
        //             }
        //         }
        //         if ((SM + 1) == 5) {    //母亲节
        //             if (this.state.fat == 0) {
        //                 if ((sD + 1) == 7) { Ssfw = "母亲节"; lObj.innerHTML = "母亲节" }
        //             }
        //             else if (this.state.fat < 9) {
        //                 if ((sD + 1) == ((7 - this.state.fat) + 8)) { Ssfw = "母亲节"; lObj.innerHTML = "母亲节" }
        //             }
        //         }
        //         if ((SM + 1) == 6) {    //父亲节
        //             if (this.state.mat == 0) {
        //                 if ((sD + 1) == 14) { Ssfw = "父亲节"; lObj.innerHTML = "父亲节" }
        //             }


        //             else if (this.state.mat < 9) {
        //                 if ((sD + 1) == ((7 - this.state.mat) + 15)) { Ssfw = "父亲节"; lObj.innerHTML = "父亲节" }
        //             }
        //         }
        //         if (s.length <= 0) {    //设置节气的颜色
        //             s = this.state.cld[sD].solarTerms;
        //             if (s.length > 0) s = s.fontcolor('limegreen');
        //         }
        //         if (s.length > 0) { lObj.innerHTML = s; Slfw = s; }    //节气
        //         if ((Slfw != null) && (Ssfw != null)) {
        //             lObj.innerHTML = Slfw + "/" + Ssfw;
        //         }
        //     }
        //     else { //非日期
        //         sObj.innerHTML = '';
        //         lObj.innerHTML = '';
        //     }
        // }
    }
    //在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
    changeCld(y,m) {
        var y, m;
        // y = CLD.SY.selectedIndex + 1900;
        // m = CLD.SM.selectedIndex;
        this.drawCld(y, m);
    }
    //打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
    initial() {
        // CLD.SY.selectedIndex = this.state.tY - 1900;
        // CLD.SM.selectedIndex = this.state.tM;
        this.drawCld(this.state.tY, this.state.tM);
    }
    subYearTime(){
        console.log("--")
    }
    render(){
        const {calenderWeek} =this.state;
        return (
            <div className="calenderPublicHome">
                <div className="calenderHeaderPublic">
                    {/* 年份 */}
                    <div className="calenderHeaderYear">
                        <div className="YearLeftBtn">
                            <LeftOutlined onClick={this.subYearTime}/>
                        </div>
                        <div className="YearSelect">
                            <Select style={{width:"100%"}} defaultValue={this.state.tY+"年"} onChange={this.handleChange}>
                                {
                                    this.state.calenderSelectYear.map((item,index)=>{
                                        return <Option value={item} key={index}>{item}年</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="YearRightBtn">
                            <RightOutlined/>
                        </div>
                    </div>
                    {/* 月份 */}
                    <div className="calenderHeaderMonth">
                        <div className="MonthLeftBtn">
                            <LeftOutlined />
                        </div>
                        <div className="MonthSelect">
                            <Select defaultValue={this.state.tM+1+"月"} style={{width:"100%"}}  onChange={this.handleChange}>
                                {
                                    this.state.calenderSelectMonth.map((item,index)=>{
                                        return <Option value={item} key={index}>{item}月</Option>
                                    })
                                }
                            </Select>
                        </div>
                        <div className="MonthRightBtn">
                            <RightOutlined />
                        </div>
                    </div>
                    {/* 放假安排 */}
                    <div className="holidayArr"><Select style={{width:'95%', height:"95%"}} value="放假安排"><Option>放假安排</Option></Select></div>
                    {/* 返回今天 */}
                    <div className="backDay"><div className="backToDay" title="返回今天">返回今天</div></div>
                </div>
                {/* 日期类 */}
                <div className="calenderContent">
                    <div className="calenderContentTable">
                        <div className="calenderContentTHead">
                            {
                                calenderWeek.map((item,index)=>{
                                    return <div className="calenderContentTh" key={index}>
                                    {item}
                                </div>
                                })
                            }
                        </div>
                        
                        <div className="calenderContentTBody">
                            {
                                this.state.frontBox.map((item,index)=>{
                                    return <div className="calenderContentTD" key={index} style={this.state.tableSizeSwitch?{height:"calc(100% / 6)"}:{height:"calc(100% / 5)"}}>
                                    </div>
                                })
                            }
                            {
                                
                                this.state.cld&&this.state.cld.map((item,index)=>{
                                    
                                    return (
                                        <div className="calenderContentTD" key={index} style={this.state.tableSizeSwitch?{height:"calc(100% / 6)"}:{height:"calc(100% / 5)"}}>
                                            <div style={item.color?{color:item.color}:{color:"#fff"}} className="calenderContentSDay">{item.sDay}</div>
                                            <div style={item.lunarFestival?{color:"#FE6A02"}:{color:"#fff"}}>{item.lunarFestival?item.lunarFestival:item.lDay}</div>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.state.laterBox.map((item,index)=>{
                                    return <div className="calenderContentTD" key={index} style={this.state.tableSizeSwitch?{height:"calc(100% / 6)"}:{height:"calc(100% / 5)"}}>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}