var loading = document.getElementsByClassName('loading')[0];
var html = document.getElementsByTagName('html')[0];
var body = document.getElementsByClassName('body')[0];
var topContent = document.getElementsByClassName('topContent')[0];
var topContentLis = topContent.getElementsByTagName('li');

window.onload = function () {
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

// 光标
// 初始化canvas大小
CursorCanvas.width = window.innerWidth;
CursorCanvas.height = window.innerHeight;

window.onresize = function () {
    CursorCanvas.width = window.innerWidth;
    CursorCanvas.height = window.innerHeight;
}


// 鼠标移出浏览器隐藏
window.onmouseout = function(){
    CursorBox.style.display = 'none';
}

// 记录鼠标位置
var trace = [];

window.onmousemove = function (event) {
    CursorBox.style.display = 'flex';

    trace.unshift([event.clientX, event.clientY, new Date().getTime()]);
    if (trace.length > 20) {
        trace.length = 20;
    }

    CursorBox.style.top = (event.clientY - 45) + 'px';
    CursorBox.style.left = (event.clientX -45) + 'px';
}

// 绘制线段
function drawTrace() {
    let time = new Date().getTime();
    let ctx = CursorCanvas.getContext("2d");

    ctx.clearRect(0, 0, CursorCanvas.width, CursorCanvas.height);

    // 定义线段样式
    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#0000FF";

    ctx.beginPath();
    for (let i = 0; i < trace.length - 1; i++) {
        ctx.moveTo(trace[i][0], trace[i][1]);
        ctx.lineTo(trace[i + 1][0], trace[i + 1][1]);
        ctx.globalAlpha = (2.6 / (time - trace[i][2])) * 0.8;
        ctx.stroke();
    }
    ctx.closePath();
    window.requestAnimationFrame(drawTrace);
}
window.requestAnimationFrame(drawTrace);

// 光标动画
window.onmousedown = function(){
    CursorRound.style.animation = 'CursorEnlarge .2s forwards';
}

window.onmouseup = function(){
    CursorRound.style.animation = 'CursorNarrow .2s forwards';
}