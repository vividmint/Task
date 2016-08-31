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

/**
 * 渲染图表
 */

function renderChart() {
    if (pageState.nowGraTime == 'day') {
        var dayData = aqiSourceData[pageState.nowSelectCity];
        console.log(dayData);
        var days = '';
        for (var key in dayData) {
            days += `<div class="wrap" style="height:${dayData[key]/500*100}%"></div>`;
        }
        document.querySelector(".aqi-chart-wrap").innerHTML = days;
    }
    if (pageState.nowGraTime == 'week') {
      var dayData = aqiSourceData[pageState.nowSelectCity];
      console.log(dayData);
      var arr = [];
      for (var key in dayData){
        arr.push(`${dayData[key]}`);
        console,log(arr);
      }



        // for (var i = 0; i < dayData.length; i++) {
        //     var weekData = '';
        //     var arr = [];
        //     if (i <= 7) {
        //         var dayData = aqiSourceData[pageState.nowSelectCity];
        //         weekValue = dayData;
        //         weekValue += weekValue;
        //     } else {
        //         arr.push({
        //             value: weekValue
        //         });
        //         console.log(weekData);
        //     }
        // }
        // var weeks = '';
        // for (var key in weekData) {
        //     weeks += `<div class="wrap" style="height:${dayData[key]/500*100}%"></div>`;
        // }
        // document.querySelector(".aqi-chart-wrap").innerHTML = weeks;
    }
}
renderChart();

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var radios = document.querySelectorAll(".gra-time");
    var timeChangeVal = "";
    for (var i = 0; i < radios.length; i++) {
        radios[i].onclick = function(event) {
            timeChangeVal = event.target.value;
            pageState.nowGraTime = timeChangeVal;
            console.log(pageState.nowGraTime);
        }
    }
    if (pageState.nowGraTime == timeChangeVal) {
        return;
    } else {
        pageState.nowGraTime = timeChangeVal;
    }
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}
//
graTimeChange();


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
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    if (document.querySelector(".gra-time").checked) {
        var timeVal = document.querySelector(".gra-time").value;
    }
    // console.log(timeVal);
    pageState.nowGraTime = timeVal;
    // console.log(pageState);
}
initGraTimeForm();

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
initCitySelector();
/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    var nowCityData = aqiSourceData[pageState.nowSelectCity];
    //nowCityData是确定的一个城市的92天降水数组，key是日期，nowCityData[key]是降水量


    if (pageState.nowGraTime == 'week') {
        weekData = {};
        var countSum = 0,
            dayData = 0,
            week = 0;
        for (var item in nowCityData) {
            countSum += nowCityData[item];
            daySum++;
            if ((new Date(item)).getDay() == 6) {
                week++;
                chartData['第' + week + '周'] = Math.floor(countSum / daySum);
                countSum = 0;
                daySum = 0;
            }
        }
        if (daySum != 0) {
            week++;
            chartData['第' + week + '周'] = Math.floor(countSum / daySum);
        } //保证最后一周若不满也能算一周
    }
    if (pageState.nowGraTime == 'month') {
        chartData = {};
        var countSum = 0,
            daySum = 0,
            month = 0;
        for (var item in nowCityData) {
            countSum += nowCityData[item];
            daySum++;
            if ((new Date(item)).getMonth() !== month) {
                month++;
                chartData['第' + month + '月'] = Math.floor(countSum / daySum);
                countSum = 0
                daySum = 0;
            }
        }
        if (daySum != 0) {
            month++;
            chartData['第' + month + '月'] = Math.floor(countSum / daySum);
        } //逻辑同周，不知道对不对
    }
}
initAqiChartData();

/**
 * 初始化函数
 */
function init() {

    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
