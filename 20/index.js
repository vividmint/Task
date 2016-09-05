var arr = ["as","11","e"];

function render() {
    var arrStr = '';
    for (var i = 0; i < arr.length; i++) {
        arrStr += `<li>${arr[i]}</li>`;
    }
    document.querySelector('.screen').innerHTML = arrStr;
};

function buttonslistener() {
    document.querySelector('.buttons').addEventListener("click", function(event) {
        var target = event.target.className;
        console.log(target);
        switch (target) {
            case 'leftIn':
                arr.unshift(document.querySelector('.inputWords').value);
                break;
            case 'rightIn':
                arr.push(document.querySelector('.inputWords').value);
                break;
            case 'leftOut':
                arr.shift();
                break;
            case 'rightOut':
                arr.pop();
                break;
            // case 'search':
            //     searchSth(arr);
            //     break;
        }
        render();
    })
};
function searchListener(){
  document.querySelector('.search').onlick = searchSth;
}
function searchSth(arr) {
    var searchValue = document.querySelector('.content').value;
    var result = arr.test(searchValue);
    if (result == false) {
        alert("没有查询到该字符！");
    } else {
        return true;
    }
}

function init() {
    buttonslistener();
    searchListener();
};
init();
