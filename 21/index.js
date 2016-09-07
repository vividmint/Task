var tagArr = [];
var hobbyArr = [];

function buttonListener() {

    document.querySelector('#submit').addEventListener("click", function(event) {
        hobbyRender();
        document.querySelector('#hobby').value = '';
    });
}

function tagListener() {
    document.querySelector('#tag').addEventListener('keypress', function(e) {
        if (e.keyCode == 13) {
            tagRender();
            document.querySelector('#tag').value = '';
        }
    });

};

function tagRender() {
    if (tagConfirm() == false) {
        return;
    } else {
        var tagInput = '';
        if (tagArr.length < 10) {
            tagArr.push(document.querySelector('#tag').value.trim());
            for (var i = 0; i < tagArr.length; i++) {
                tagInput += `<li>${tagArr[i]} </li>`;
                document.querySelector('#showTag').innerHTML = tagInput;
            }
        } else {
            tagArr.shift();
            tagInput += `<li>${tagArr[i-1]} </li>`;
            document.querySelector('#showTag').innerHTML = tagInput;
            tagRender();
            console.log(tagArr);

        }
    }
};

function hobbyRender() {
    hobbyArr.push(document.querySelector('#hobby').value.trim());
    var hobbyInput = '';
    for (var i = 0; i < hobbyArr.length; i++) {
        hobbyInput += `<li>${hobbyArr[i]} </li>`;
        document.querySelector('#showHobby').innerHTML = hobbyInput;
    }
}


function tagConfirm() {
    var tagValue = document.querySelector('#tag').value.trim();
    if (tagValue == '') {
        alert('请输入标签！');
        return false;
    } else {
        for (var i = 0; i < tagArr.length; i++) {
            if (tagValue == tagArr[i]) {
              return false;
            }
        }
        return true;
    }
};

function deleteStr() {
    document.querySelector('#submit').addEventListener("mouseenter", function() {
        textContent = "删除 ";
    });

    document.querySelector('#tag').addEventListener("mouseleave", function() {

    });

    span.addEventListener("click", function(event) {
        event.target.classList.add("removing");

    });
};

function init() {
    buttonListener();
    tagListener();
};
init();
