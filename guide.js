var loading = document.getElementsByClassName('loading')[0];
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByClassName('body')[0];
var topContent = document.getElementsByClassName('topContent')[0];
var topContentLis = topContent.getElementsByTagName('li');

window.onload = function () {
    // 加载页面消失
    loading.style.display = 'none';

    // 背景出现动画
    html.style.animation = 'appear .8s';
    html.style.animationFillMode = 'forwards';

    setTimeout(function () {
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
    }, 1000);
}

// 页面滚动
addEventListener('wheel', (event) => {
    let speed = 800;

    if (wheelLock == true) {
        return;
    }
    if (event.deltaY > 0) {
        pageDown(speed);
    } else if (event.deltaY < 0) {
        pageUp(speed)
    }
});

window.onclick = function(e){
    if(e.target.dataset.href == undefined){
        return;
    }
    window.open(e.target.dataset.href)
}