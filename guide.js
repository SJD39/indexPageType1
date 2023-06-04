var loading = document.getElementsByClassName('loading')[0];
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByClassName('body')[0];
var topImg = document.getElementsByClassName('topImg')[0];
var topContent = document.getElementsByClassName('topContent')[0];
var topContentLis = topContent.getElementsByTagName('li');

var page = 1;
var pageMax = 4;
var wheelLock = false;

window.onload = function () {
    // 加载页面消失
    loading.style.display = 'none';

    // 背景出现动画
    html.style.animation = 'appear .8s';
    html.style.animationFillMode = 'forwards';

    setTimeout(function () {
        // 背景亮度变暗动画
        topImg.style.animation = 'darken .8s';
        topImg.style.animationFillMode = 'forwards';

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
        if (page == pageMax) {
            return;
        }
        // 向下翻页
        wheelLock = true;
        var pageDownKeyframes = new KeyframeEffect(
            body,
            [
                { top: - (page - 2) * 100 + '%' },
                { top: - (page - 1) * 100 + '%' }
            ],
            { duration: speed, fill: 'forwards', easing: 'ease' }
        );

        var pageDownAnimation = new Animation(pageDownKeyframes, document.timeline);
        pageDownAnimation.play();
        page++;
    } else if (event.deltaY < 0) {
        if (page == 1) {
            return;
        }
        // 向上翻页
        wheelLock = true;
        var pageUpKeyframes = new KeyframeEffect(
            body,
            [
                { top: - (page - 2) * 100 + '%' },
                { top: - (page - 3) * 100 + '%' }
            ],
            { duration: speed, fill: 'forwards', easing: 'ease' }
        );

        var pageUpAnimation = new Animation(pageUpKeyframes, document.timeline);
        pageUpAnimation.play();
        page--;
    }
    setTimeout(() => {
        wheelLock = false;
    }, speed);
});

window.onclick = function(e){
    if(e.target.dataset.href == undefined){
        return;
    }
    window.open(e.target.dataset.href)
}