var loading = document.getElementsByClassName('loading')[0];
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByClassName('body')[0];
var topContentLis = firstContent.getElementsByTagName('li');

window.onload = function () {
    // 标题出现动画
    firstContent.style.animation = 'appearTitle .8s';
    firstContent.style.animationFillMode = 'forwards';

    setTimeout(function () {
        // 标题出现属性（避免最后一帧属性被后续动画重置）
        firstContent.style.opacity = "1";
        firstContent.style.top = "0px";

        // 首页内容展开动画
        firstContent.style.animation = 'topContentOpen 1s';
        firstContent.style.animationFillMode = 'forwards';

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
    switch (e.target.dataset.type) {
        case 'external':
            if(e.target.dataset.href == undefined){
                return;
            }
            window.open(e.target.dataset.href)
            break;
        case 'this':
            let dom = eval(e.target.dataset.id);
            if(dom == undefined){
                return;
            }
            dom.style.top = '100%';
            break;
    }    
}