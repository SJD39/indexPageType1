class osuCursor {
    constructor() {
        // 初始化变量
        this.tracePoint = [];
        this.traceNum = 200;

        // 生成HTML元素
        this.osuCursorRound = document.createElement('img');
        this.osuCursorRound.id = "osuCursorRound";
        this.osuCursorRound.src = "./osuCursor/img/cursor@2x.png";

        this.osuCursorCenter = document.createElement('img');
        this.osuCursorCenter.id = "osuCursorCenter";
        this.osuCursorCenter.src = "./osuCursor/img/cursormiddle@2x.png";

        this.osuCursorBox = document.createElement('div');
        this.osuCursorBox.id = "osuCursorBox";
        this.osuCursorBox.append(this.osuCursorRound, this.osuCursorCenter);

        this.osuCursorCanvas = document.createElement('canvas');
        this.osuCursorCanvas.id = "osuCursorCanvas";
        // 初始化canvas大小
        this.osuCursorCanvas.width = window.innerWidth;
        this.osuCursorCanvas.height = window.innerHeight;

        this.body = document.getElementsByTagName('body')[0];
        this.body.append(this.osuCursorBox, this.osuCursorCanvas);
    }

    // 重设Canvas大小
    resetCanvasSize() {
        this.osuCursorCanvas.width = window.innerWidth;
        this.osuCursorCanvas.height = window.innerHeight;
    }

    // 使指针不可见
    invisibleCursor() {
        this.osuCursorBox.style.display = "none";
    }

    // 使指针可见
    visibleCursor() {
        this.osuCursorBox.style.display = "flex";
    }

    // 指针变大
    cursorToBig() {
        this.osuCursorRound.style.animation = 'cursorToBig .2s forwards, CursorRotate 3s linear infinite';
    }

    // 指针缩小
    cursorToSmall() {
        this.osuCursorRound.style.animation = 'cursorToSmall .2s forwards, CursorRotate 3s linear infinite';
    }

    // 设置指针位置
    setCursorPoint(x, y) {
        this.osuCursorBox.style.top = (y - 45) + 'px';
        this.osuCursorBox.style.left = (x - 45) + 'px';
    }

    // 设置绘制点位
    setPoint(x, y, t) {
        this.tracePoint.unshift([x, y, t]);
        if (this.tracePoint.length > this.traceNum) {
            this.tracePoint.length = this.traceNum;
        }
    }

    // 绘制轨迹
    drawTrace() {
        // 刷新光标位置
        if (this.tracePoint.length != 0) {
            this.setCursorPoint(this.tracePoint[0][0], this.tracePoint[0][1]);

            let time = new Date().getTime();
            let ctx = this.osuCursorCanvas.getContext("2d");

            ctx.clearRect(0, 0, osuCursorCanvas.width, osuCursorCanvas.height);

            // 定义线段样式
            ctx.strokeStyle = "#0000FF";
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 12;
            ctx.shadowColor = "#0000FF";

            ctx.beginPath();
            ctx.moveTo(this.tracePoint[0][0], this.tracePoint[0][1]);
            for (let i = 0; i < this.tracePoint.length - 1; i++) {
                ctx.lineTo(this.tracePoint[i + 1][0], this.tracePoint[i + 1][1]);
                ctx.globalAlpha = (2.6 / (time - this.tracePoint[i][2])) * 0.8;
                ctx.stroke();
            }
            ctx.closePath();
        }
        window.requestAnimationFrame(this.drawTrace.bind(this));
    }
}