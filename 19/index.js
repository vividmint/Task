var arr = [];
document.querySelector('.input').value = randomValue(10, 100);

function randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initArr() {
    for (var i = 0; i < 10; i++) {
        arr[i] = randomValue(10, 100);
    }
    render();
}

function render() {
    var arrStr = '';
    for (var i = 0; i < arr.length; i++) {
        arrStr += `<li style="list-style:none;display:inline-block;height:${arr[i]}%;background-color:red;width:20px;margin:0 5px"></li>`;
    }
    document.querySelector('.numbers').innerHTML = arrStr;
};

function inputValue() {
    var result = document.querySelector('.input').value;
    var testValue = /^([1-9]\d|100)$/.test(result);
    if (testValue == false) {
        alert("必须输入10-100整数！");
        return false;
    } else {
        return true;
    }
};

function buttonslistener() {
    document.querySelector('.buttons').addEventListener("click", function(event) {
        inputValue();
        var target = event.target.className;
        switch (target) {
            case 'leftIn':
                arr.unshift(document.querySelector('.input').value);
                break;
            case 'rightIn':
                arr.push(document.querySelector('.input').value);
                break;
            case 'leftOut':
                arr.shift();
                break;
            case 'rightOut':
                arr.pop();
                break;
            case 'upset':
                upsetSort(arr);
                break;
            case 'bubble':
                bubbleSort(arr);
                break;
            case 'choose':
                chooseSort(arr);
            case 'insert':
                insertSort(arr);
        }
        render();
    })
}

function swap(arr, p1, p2) {
    var temp = arr[p1];
    arr[p1] = arr[p2];
    arr[p2] = temp;
}

function upsetSort(arr) {
    arr.sort(function() {
        return 0.5 - Math.random()
    })
    var upsetArr = arr.join();
    return upsetArr;
}

function bubbleSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
};

function chooseSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (i != min) {
            swap(arr, i, min);
        }
    }
    return arr;
};

function insertSort(arr) {
    var value, // 当前比较的值
        i, // 未排序部分的当前位置
        j; // 已排序部分的当前位置
    for (i = 0; i < arr.length; i++) {
        // 储存当前位置的值
        value = arr[i];
        /*
         * 当已排序部分的当前元素大于value，
         * 就将当前元素向后移一位，再将前一位与value比较
         */
        for (j = i - 1; j > -1 && arr[j] > value; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = value;
    }
}

function init() {
    buttonslistener();
    initArr();
};
init();
