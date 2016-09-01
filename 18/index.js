var arr = [];

function render() {
    var arrStr = '';
    for (var i = 0; i < arr.length; i++) {
        arrStr += `<li style="list-style:none;display:inline">${arr[i]} </li>`;
    }
    document.querySelector('.numbers').innerHTML = arrStr;
};

function init() {
    document.querySelector('.rightIn').addEventListener("click", function(event) {
        arr.push(document.querySelector('.input').value);
        render();
    });
    document.querySelector('.rightOut').addEventListener("click", function(event) {
        arr.pop();
        render();
    });
    document.querySelector('.leftOut').addEventListener("click", function(event) {
        arr.shift();
        render();
    });
    document.querySelector('.leftIn').addEventListener("click", function(event) {
        arr.unshift(document.querySelector('.input').value);
        render();
    });
};
init();
