var tagArr = [{
    className: 'normal',
    value: '标签示例',
    flag: false
}];
var hobbyArr = [{
    className: 'normal',
    value: '一颗赛艇',
    flag: false
}, {
    className: 'normal',
    value: '2',
    flag: false
}, {
    className: 'normal',
    value: '3',
    flag: false
}, {
    className: 'normal',
    value: '4',
    flag: false
}, {
    className: 'normal',
    value: '5',
    flag: false
}, {
    className: 'normal',
    value: '6',
    flag: false
}, {
    className: 'normal',
    value: '7',
    flag: false
}, {
    className: 'normal',
    value: '8',
    flag: false
}, {
    className: 'normal',
    value: '9',
    flag: false
}];
var tagInput = document.querySelector('#tag').value.trim();
var hobbyInput = document.querySelector('#hobby').value.trim();


function hobbyListener() {
    document.querySelector('#submit').addEventListener("click", function(event) {
        if (hobbyConfirm() == false) {
            return;
        } else {
            hobbyRender();
            document.querySelector('#hobby').value = '';
        }
    })
};

function tagListener() {
    document.querySelector('#tag').addEventListener('keypress', function(e) {
        if (e.keyCode == 13 || e.keyCode == 44 || e.keyCode == 32) {
            if (confirm(document.querySelector('#tag').value.trim(), tagArr) == false) {
                return;
            } else {
                var tagInput = document.querySelector('#tag').value.trim();
                if (tagArr.length > 9) {
                    tagArr.shift();
                }
                tagArr.push({
                    className: "normal",
                    value: tagInput
                });
                tagRender();
                document.querySelector('#tag').value = '';
            }
        }
    });
};

function tagRender() {
    var tagInput = '';
    for (var i = 0; i < tagArr.length; i++) {
        tagInput += `<li data-index="${i}" class='items ${tagArr[i].className}'>${tagArr[i].value} </li>`;
    }
    document.querySelector('#showTag').innerHTML = tagInput;
};

function hobbyRender() {
    var hobbyInput = '';
    for (var i = 0; i < hobbyArr.length; i++) {
        hobbyInput += `<li data-index="${i}" class='items ${hobbyArr[i].className}'>${hobbyArr[i].value} </li>`;
    }
    document.querySelector('#showHobby').innerHTML = hobbyInput;
}

function confirm(input, arr) {
    var result = /^[A-Za-z|\d|\u4E00-\u9FA5]*[A-Za-z|\d|\u4E00-\u9FA5]*$/.test(input);
    console.log(result);
    if (input == '') {
        alert('请输入标签！');
        return false;
    } else {
        if (result == false) {
            alert('不合法输入！')
            return false;
        } else {
            for (var i = 0; i < arr.length; i++) {
                if (input == arr[i].value) {
                    alert('存在相同标签！');
                    input = '';
                    return false;
                }
            }
        }
        return true;
    }
};

function hobbyConfirm() {
    if (document.querySelector('#hobby').value.trim() == '') {
        alert('请输入兴趣爱好！')
        return false;
    } else {
        var hobbyInput = document.querySelector('#hobby').value.trim();
        var result = hobbyInput.match(/^[A-Za-z|\d|\u4E00-\u9FA5]*[,，、\n\s]*[A-Za-z|\d|\u4E00-\u9FA5]*$/g);
        if (result == false) {
            alert('不合法输入！')
            return false;
        } else {
            var hobbyValue = hobbyInput.split(/[,，、\n\s]/);
            console.log(hobbyArr.length);
            if (hobbyArr.length > 10) {
                hobbyArr.shift();
            } else {
                for (var i = 0; i < hobbyArr.length; i++) {
                    for (var j = 0; j < hobbyArr.length; j++) {
                        if (hobbyValue[i] == hobbyArr[j].value) {
                            hobbyArr.splice(j, 1);
                        }
                    }
                };
                console.log(hobbyArr.length);

                for (var i = 0; i < hobbyValue.length; i++) {
                    hobbyArr.push({
                        className: "normal",
                        value: hobbyValue[i]
                    })
                }
            }
        }
        return true;
    }
};

var tagItem = document.querySelector('#showTag');
tagItem.addEventListener("mouseover", enterT, false);
tagItem.addEventListener("mouseleave", leaveT, false);

var hobbyItem = document.querySelector('#showHobby');
hobbyItem.addEventListener("mouseover", enterH, false);
hobbyItem.addEventListener("mouseleave", leaveH, false);

function enterT(event) {
    var list = document.querySelectorAll(".items");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseenter", function(ee) {
            enterRenderT(ee.target.dataset.index);
        });
        list[i].addEventListener("click", function(event) {
            tagArr.splice(event.target.dataset.index, 1);
            tagRender();
            return;
        });
        leaveT();
    }
};

function leaveT() {
    var list = document.querySelectorAll(".items");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseout", function(ee) {
            leaveRenderT(ee.target.dataset.index);
        })
    }
};

function enterRenderT(i) {
    if (tagArr[i].flag) {
        return;
    }
    tagArr[i].className = `${tagArr[i].className} delete`;
    tagArr[i].value = `删除 ${tagArr[i].value}`;
    tagArr[i].flag = true;
    console.log(tagArr[i].value);
    tagRender();
};

function leaveRenderT(i) {
    if (tagArr[i]) {
        if (!tagArr[i].flag) {
            return;
        }
        tagArr[i].className = 'normal';
        tagArr[i].value = `${tagArr[i].value}`.substring(3);
        tagArr[i].flag = false;
        tagRender();
    }
};

function enterH(event) {
    var list = document.querySelectorAll(".items");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseenter", function(ee) {
            enterRenderH(ee.target.dataset.index);
        });
        list[i].addEventListener("click", function(event) {
            hobbyArr.splice(event.target.dataset.index, 1);
            console.log(event.target.dataset.index);
            hobbyRender();
            return;
        });
        leaveH();
    }
};

function leaveH() {
    var list = document.querySelectorAll(".items");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseout", function(ee) {
            leaveRenderH(ee.target.dataset.index);
        })
    }
};

function enterRenderH(i) {
    if (hobbyArr[i].flag) {
        return;
    }
    hobbyArr[i].className = `${hobbyArr[i].className} delete`;
    hobbyArr[i].value = `删除 ${hobbyArr[i].value}`;
    hobbyArr[i].flag = true;
    hobbyRender();
};

function leaveRenderH(i) {
    if (hobbyArr[i]) {
        if (!hobbyArr[i].flag) {
            return;
        }
        hobbyArr[i].className = 'normal';
        hobbyArr[i].value = `${hobbyArr[i].value}`.substring(2);
        hobbyArr[i].flag = false;
        hobbyRender();
    }
};

function init() {
    hobbyListener();
    tagListener();
};
init();
