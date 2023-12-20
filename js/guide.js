var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByTagName('body')[0];
var topContentLis = topContent.getElementsByTagName('li');

window.onload = function () {
    loading.style.display = 'none';
    // 标题出现动画
    topContent.style.animation = 'appearTitle .8s';
    topContent.style.animationFillMode = 'forwards';

    setTimeout(function () {
        // 标题出现属性（避免最后一帧属性被后续动画重置）
        topContent.style.opacity = "1";
        topContent.style.top = "0px";

        // 首页内容展开动画
        topContent.style.animation = 'topContentOpen 1s';
        topContent.style.animationFillMode = 'forwards';

        // 首页内容li滑入动画
        for (let i = 0; i < topContentLis.length; i = i + 2) {
            topContentLis[i].style.animation = 'topContentLi 1s';
            topContentLis[i].style.animationFillMode = 'forwards';
            topContentLis[i].style.animationDelay = i * 0.1 + 's';

            topContentLis[i + 1].style.animation = 'topContentLi 1s';
            topContentLis[i + 1].style.animationFillMode = 'forwards';
            topContentLis[i + 1].style.animationDelay = i * 0.1 + 's';
        }
    }, 800);
}

// 页面滚动
// addEventListener('wheel', (event) => {
//     let speed = 800;

//     if (wheelLock == true) {
//         return;
//     }
//     if (event.deltaY > 0) {
//         pageDown(speed);
//     } else if (event.deltaY < 0) {
//         pageUp(speed)
//     }
// });

window.onclick = function (e) {
    if (e.target.dataset.Type == 'external') {
        if (e.target.dataset.url == undefined) {
            return;
        }
        window.open(e.target.dataset.url)
    } else if (e.target.dataset.Type == 'here') {

    }
}

fetch('http://127.0.0.1:3900/guide')
    .then(response => response.json())
    .then(json => createPage(json))
    .catch(err => console.log('Request Failed', err)); 

function createPage(json){
    let li = [];
    for (let i = 0; i < json.length; i++) {
        // 生成首页元素
        li[i] = document.createElement('li');
        li[i].dataset.type = json[i].Type;
        li[i].dataset.url = json[i].Url;
        li[i].innerHTML = '<span>' + (json[i].Name ? json[i].Name : '无') + '</span>';
        guideUl.append(li[i]);

        // 生成内容页面
        if (li[i].dataset.type == 'here') {
            let iframe = document.createElement('iframe');
            iframe.src = json[i].Url;

            let contentPage = document.createElement('div');
            contentPage.className = 'contentPage';
            contentPage.append(iframe);

            body.append(contentPage);
        }
    }
}