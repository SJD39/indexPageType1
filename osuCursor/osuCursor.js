class osuCursor {
    constructor() {
        // 初始化变量
        this.closeTrace = false;
        this.tracePoint = [];
        this.traceNum = 20;
        this.lineColor = '#0000FF';
        this.lineWidth = 6;
        this.shadowBlur = 12;
        this.shadowColor = '#0000FF';

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

        // 获取Canvas上下文
        this.ctx = this.osuCursorCanvas.getContext("2d");
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    }

    setLineStyle() {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.shadowBlur = this.shadowBlur;
        this.ctx.shadowColor = this.shadowColor;
    }

    // 重设Canvas大小
    resetCanvasSize() {
        this.osuCursorCanvas.width = window.innerWidth;
        this.osuCursorCanvas.height = window.innerHeight;
    }

    // 使指针不可见
    invisibleCursor() {
        this.ctx.clearRect(0, 0, osuCursorCanvas.width, osuCursorCanvas.height);

        this.tracePoint = [];
        this.closeTrace = true;
        this.osuCursorBox.style.display = "none";
    }

    // 使指针可见
    visibleCursor() {
        this.closeTrace = false;
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
        if (this.closeTrace) {
            return;
        }

        this.tracePoint.unshift([x, y, t]);
        if (this.tracePoint.length > this.traceNum) {
            this.tracePoint.length = this.traceNum;
        }
    }

    // 绘制轨迹
    drawTrace() {
        if (this.tracePoint.length == 0) {
            window.requestAnimationFrame(this.drawTrace.bind(this));
            return
        }
        // 刷新光标位置
        this.setCursorPoint(this.tracePoint[0][0], this.tracePoint[0][1]);

        // 绘制轨迹
        if (this.closeTrace == true) {
            window.requestAnimationFrame(this.drawTrace.bind(this));
            return
        }

        let time = new Date().getTime();

        this.ctx.clearRect(0, 0, osuCursorCanvas.width, osuCursorCanvas.height);

        this.ctx.beginPath();
        this.ctx.moveTo(this.tracePoint[0][0], this.tracePoint[0][1]);
        for (let i = 0; i < this.tracePoint.length - 1; i++) {
            this.ctx.lineTo(this.tracePoint[i + 1][0], this.tracePoint[i + 1][1]);
            this.ctx.globalAlpha = (2.6 / (time - this.tracePoint[i][2])) * 0.8;
            this.ctx.stroke();
        }
        this.ctx.closePath();
        window.requestAnimationFrame(this.drawTrace.bind(this));
    }

    // 开启节能模式
    saveModeOpen() {
        this.tracePoint = [];
        this.closeTrace = true;
    }

    // 关闭节能模式
    saveModeClose() {
        this.closeTrace = false;
    }
}

// osu光标
var cursor = new osuCursor();

window.addEventListener("resize", function () {
    cursor.resetCanvasSize();
    cursor.setLineStyle();
});

topPage.addEventListener("mousedown", function () {
    cursor.cursorToBig();
});

topPage.addEventListener("mouseup", function () {
    cursor.cursorToSmall();
});

topPage.addEventListener("mousemove", function (event) {
    cursor.setPoint(event.clientX, event.clientY, new Date().getTime());
});

topPage.addEventListener("mouseover", function (event) {
    if (event.fromElement != null && event.fromElement.localName != 'iframe') {
        return;
    }
    
    cursor.visibleCursor();
});

topPage.addEventListener("mouseout", function (event) {
    if (event.toElement != null && event.toElement.localName != 'iframe') {
        return;
    }

    cursor.invisibleCursor();
});

cursor.setLineStyle();
cursor.drawTrace();