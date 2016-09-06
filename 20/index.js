var searchValue = document.querySelector('.content').value.trim();
var str = document.querySelector('.inputWords').value.trim();
  var arr = [{
    className: "normal",
    value: "letters"
}, {
    className: "normal",
    value: "words"
}, {
    className: "normal",
    value: "234"
}, {
    className: "normal",
    value: "中文字符"
}];

function getInput(str, direct) {
    strValue = str.split(/[，、,\n\s]/);
    for (var i = 0; i < strValue.length; i++) {
        if (direct == 'leftIn') {
            arr.unshift({
                className: "normal",
                value: strValue[i]
            });
        } else {
            arr.push({
                className: "normal",
                value: strValue[i]
            })
        }
    }
};

function render() {
    var arrStr = '';
    for (var i = 0; i < arr.length; i++) {
        arrStr += `<li class="${arr[i].className}">${arr[i].value}</li>`;
    }
    document.querySelector('.screen').innerHTML = arrStr;
};

function buttonslistener() {
    document.querySelector('.buttons').addEventListener("click", function(event) {
        var target = event.target.className;
        switch (target) {
            case 'leftIn':
                getInput(document.querySelector(".inputWords").value, 'leftIn');
                break;
            case 'rightIn':
                getInput(document.querySelector(".inputWords").value, 'rightIn');
                break;
            case 'leftOut':
                arr.shift();
                break;
            case 'rightOut':
                arr.pop();
                break;
        }
        render();
        document.querySelector('.inputWords').value = '';
    })
};

function searchListener() {
    document.querySelector('.search').onclick = function() {
        var k = document.querySelector('.content').value;
        for (var i = 0;i<arr.length;i++){
          arr[i].className = "normal";
        }
        searchSth(k, arr);
    }
};

function searchSth(key, arr) {
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
        var result = new RegExp(key).test(arr[i].value);
        if (result == false) {} else {
            flag = true;
            highLight(i, arr[i].value);
        }
    };

    if (!flag) {
        render();
        alert('没找到');
        return;
    }
    render();
};

function highLight(j, value) {
    arr[j].className = "light";
};

function init() {
    render();
    buttonslistener();
    searchListener();
};
init();
