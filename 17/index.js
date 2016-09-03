/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(400),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

console.log(aqiSourceData);

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}
var formGraTime = document.querySelector('#form-gra-time');
var citySelect = document.querySelector('#city-select');

function getTitle() {
    switch (pageState.nowGraTime) {
        case "day":
            return "每日";
        case "week":
            return "周平均";
        case "month":
            return "月平均";
    }
}
/**
 * 渲染图表
 */

function renderChart() {
    var data = {};
    var base = 500;
    var dataSource = aqiSourceData[pageState.nowSelectCity];
    var days = `<div class="title">${pageState.nowSelectCity}市01-03月：${getTitle()}空气质量报告</div>`;
    var innerHTML = "";
    if (pageState.nowGraTime == 'day') {
        data = dataSource;
        for (var key in data) {
            days += `<div class="wrap" title=${key}：[AQI]:${dataSource[key]} style="height:${data[key]/base*100}%"></div>`;
        }
    }
    if (pageState.nowGraTime == 'week') {
        base = 3500;
        var i = 0,
            weekSum = 0,
            j = 1;
            // k = 1;
        for (var key in dataSource) {
            if (i < 7) {
                weekSum += dataSource[key];
                i++;
                console.log(weekSum);

            } else {
                var m = `2016年第${j}周`;
                // console.log(m);
                data[m] = weekSum;
                i = 0;
                weekSum = 0;
                j++;
                // K++;
            }
        }
        for (var key in data) {
            days += `<div class="wrap" title=${key}：[AQI]:${data[key]} style="height:${data[key]/base*100}%"></div>`;
        }
    }
    if (pageState.nowGraTime == 'month') {
        base = 15500;
        var str = '';
        for (var key in dataSource) {
            str = key.substring(0, 7);
            data[str] = (data[str] ? data[str] : 0) + dataSource[key];
        }
        for (var key in data) {
            days += `<div class="wrap" title=${key}：[AQI]:${data[key]} style="height:${data[key]/base*100}%"></div>`;
        }
    }
    // var days = `<div class="title">${pageState.nowSelectCity}市01-03月：${getTitle()}空气质量报告</div>`;
    // var innerHTML = "";
    // for (var key in data) {
    //     days += `<div class="wrap" title=${key}[AQI]： style="height:${data[key]/base*100}%"></div>`;
    // }
    document.querySelector(".aqi-chart-wrap").innerHTML = days;



}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    document.querySelector("#city-select").addEventListener('change', citySelectChange, false);
    var cityChangeVal = event.target.value;
    // 确定是否选项发生了变化
    if (pageState.nowSelectCity == event.target.value) {
        return;
    } else {
        pageState.nowSelectCity = event.target.value;
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.querySelectorAll(".gra-time");
    var timeChangeVal = "";
    for (var i = 0; i < radios.length; i++) {
        radios[i].onclick = function(event) {
            timeChangeVal = event.target.value;
            if (pageState.nowGraTime == timeChangeVal) {
                return;
            } else {
                pageState.nowGraTime = timeChangeVal;
                renderChart();
            }
        }
    }
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var cityItems = "";
    for (var cityName in aqiSourceData) {
        cityItems += `<option>${cityName}</option>`
    }
    document.querySelector("#city-select").innerHTML = cityItems;
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var cityVal = document.querySelector("#city-select").value;
    // console.log(cityVal);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    document.querySelector("#city-select").addEventListener('change', citySelectChange, false);
}
/**
 * 初始化函数
 */
function init() {

    initGraTimeForm()
    initCitySelector();
    renderChart();

}

init();
