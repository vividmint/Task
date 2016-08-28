/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData(aqiData) {}

/**
 * 渲染aqi-table表格
 */
// function renderAqiList(cityInput,airInput) {
//     if (initFlag === false) {
//         document.querySelector("#aqi-table").innerHTML = `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr><td>${cityInput}</td><td>${airInput}</td><td><button class = "delBtn">删除</button></td>`
//         initFlag = true;
//     }else{
//       var tr = document.createElement("tr");
//       document.querySelector("#aqi-table").appendChild(tr).innerHTML =`<td>${cityInput}</td><td>${airInput}</td><td><button class = "delBtn">删除</button></td>`;
//     }
// }

function renderAqiList(){
  var items = `<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>`;
for (var city in aqiData){
  items += `<tr><td>${city}</td><td>${aqiData[city]}</td><td><button class = "del-btn" data-key = "${city}">删除</button></td></tr>`
}
document.querySelector("#aqi-table").innerHTML = city?items:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var cityInput = document.querySelector("#aqi-city-input").value.trim();
    var airInput = document.querySelector("#aqi-value-input").value.trim();
    if(!cityInput.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!airInput.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[cityInput] = airInput;
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.querySelector('#add-btn').onclick = addBtnHandle;
    document.querySelector("#aqi-table").addEventListener("click",function(event){
      delBtnHandle(event.target.dataset.key);
    });


}

init();
