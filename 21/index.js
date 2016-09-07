var tagArr = [];

function tagListener() {
    document.querySelector('#button').onclick = tagConfirm;
}

function render() {
    if (tagConfirm == false) {
        return;
    } else {
        tagArr.push(document.querySelector('#tag').value.trim());
        var tagInput = '';
        for (var i = 0; i < tagArr.length; i++) {
            tagInput += `<li>${tagArr[i]} </li>`;
            document.querySelector('#showTag').innerHTML = tagInput;
        }
    }
};


function tagConfirm() {
  var tagValue = document.querySelector('#tag').value.trim();
    if (tagValue == '') {
        alert('请输入标签！');
        return;
    } else {
        for (var i = 0; i < tagArr.length; i++) {
            var result = tagValue.match(tagArr[i]);
            console.log(result);
            if (result == null) {
                return true;
            } else {
                alert('已存在相同标签！');
                return false;
            }
        }
    }
};

function init() {
    tagListener();
};
init();
