var tagArr = [{
    className: 'normal',
    value: '标签示例',
    flag: false
}];
var hobbyArr = [{
    className: 'normal',
    value: ''
}];
var tagInput = document.querySelector('#tag').value.trim();
var hobbyInput = document.querySelector('#hobby').value.trim();


function hobbyListener() {

    document.querySelector('#submit').addEventListener("click", function(event) {
        hobbyRender();
        document.querySelector('#hobby').value = '';
    });
}

function tagListener() {
    document.querySelector('#tag').addEventListener('keypress', function(e) {
        if (e.keyCode == 13 || e.keyCode == 44 || e.keyCode == 32) {
            if (inputConfirm() == false) {
                return;
            } else {
                var tagInput = document.querySelector('#tag').value.trim();
                if (tagArr.length > 10) {
                    tagArr.shift();
                }
                tagArr.push({
                    className: "normal",
                    value: tagInput
                });
                document.querySelector('#tag').value = '';
                tagRender();
            }
        }
    });
};

function tagRender() {
    var tagInput = '';
    for (var i = 0; i < tagArr.length; i++) {
        tagInput += `<li data-index="${i}" class='tagItem ${tagArr[i].className}'>${tagArr[i].value} </li>`;
        document.querySelector('#showTag').innerHTML = tagInput;
    }
};

function hobbyRender() {
    hobbyArr.push(document.querySelector('#hobby').value.trim());
    var hobbyInput = '';
    for (var i = 0; i < hobbyArr.length; i++) {
        hobbyInput += `<li class='${hobbyArr[i].className}'>${hobbyArr[i]} </li>`;
        document.querySelector('#showHobby').innerHTML = hobbyInput;
    }
}


function inputConfirm() {
    var tagInput = document.querySelector('#tag').value.trim();
    var hobbyInput = document.querySelector('#hobby').value.trim();
    var result = /^[A-Za-z|\d|\u4E00-\u9FA5]*[A-Za-z|\d|\u4E00-\u9FA5]*$/.test(tagInput);
    console.log(result);
    if (tagInput == '') {
        alert('请输入标签！');
        return false;
    } else {
        if (result == false) {
            alert('不合法输入！')
            return false;
        } else {
            for (var i = 0; i < tagArr.length; i++) {
                if (tagInput == tagArr[i].value) {
                    return false;
                }
            }
        }
        return true;
    }
};

var item = document.querySelector('#showTag');
item.addEventListener("mouseenter", enter, false);
item.addEventListener("mouseleave", leave, false);

function enter(event) {
    var list = document.querySelectorAll(".tagItem");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseenter", function(ee) {
            enterRender(ee.target.dataset.index);
        });
        list[i].addEventListener("click", function(event) {
            showTag.removeChild(list[event.target.dataset.index]);
            return;
        });
        leave();
    }
}

// function deleteTag() {
//     var list = document.querySelectorAll(".tagItem");
//     for (var i = 0; i < list.length; i++) {
//
//         })
//     }
// };

function leave() {
    var list = document.querySelectorAll(".tagItem");
    for (var i = 0; i < list.length; i++) {
        list[i].addEventListener("mouseleave", function(ee) {
            leaveRender(ee.target.dataset.index);
        })
    }
};

function enterRender(i) {
    if (tagArr[i].flag) {
        return;
    }
    tagArr[i].className = `${tagArr[i].className} delete`;
    tagArr[i].value = `删除${tagArr[i].value}`;
    tagArr[i].flag = true;
    console.log(tagArr[i].value);
    tagRender();
};

function leaveRender(i) {
    if (!tagArr[i].flag) {
        return;
    }
    tagArr[i].className = 'normal';
    tagArr[i].value = `${tagArr[i].value}`.substring(2);
    tagArr[i].flag = false;
    tagRender();
};

function init() {
    hobbyListener();
    tagListener();
};
init();
