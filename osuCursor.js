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
window.onmousedown = function () {
    CursorRound.style.animation = 'CursorEnlarge .2s forwards, CursorRotate 3s linear infinite';
}

window.onmouseup = function () {
    CursorRound.style.animation = 'CursorNarrow .2s forwards, CursorRotate 3s linear infinite';
}