/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
var initFlag = false;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData(aqiData) {}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(cityInput,airInput) {
    if (initFlag === false) {
        document.querySelector("#aqi-table").innerHTML = `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr><td>${cityInput}</td><td>${airInput}</td><td><button class = "delBtn">删除</button></td>`
        initFlag = true;
    }else{
      var tr = document.createElement("tr");
      document.querySelector("#aqi-table").appendChild(tr).innerHTML =`<td>${cityInput}</td><td>${airInput}</td><td><button class = "delBtn">删除</button></td>`;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var cityInput = document.querySelector("#aqi-city-input").value;
    var airInput = document.querySelector("#aqi-value-input").value;
    console.log(cityInput);
    aqiData[cityInput] = airInput;
    console.log(aqiData);

    addAqiData();
    renderAqiList(cityInput,airInput);
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.querySelector('#add-btn').onclick = addBtnHandle;


}

init();
