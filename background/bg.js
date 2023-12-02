class sonyBtnBg {
    constructor() {
        // 缩放系数
        if (window.innerWidth > window.innerHeight) {
            this.size = window.innerWidth / 1501;
        } else {
            this.size = window.innerHeight / 1501;
        }

        // 最小间距
        this.spacing = 180 * this.size;

        // 随机位置、角度
        this.position = [];
        this.angle = [];

        // 数量
        this.sglQty = 5;
        this.total = this.sglQty * 4;

        // 生成html元素
        this.sonyBtnBg = document.createElement('canvas');
        this.sonyBtnBg.id = 'sonyBtnBg';

        this.body = document.getElementsByTagName('body')[0];
        this.body.append(this.sonyBtnBg);

        // 初始屏幕大小
        this.sonyBtnBg.width = window.innerWidth;
        this.sonyBtnBg.height = window.innerHeight;

        this.ctx = this.sonyBtnBg.getContext("2d");
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    createBgSquare(x, y, angle) {
        // 定义线段样式
        this.ctx.strokeStyle = "#faafbe";
        this.ctx.lineWidth = 8 * this.size;

        // 绘制线段
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle * (Math.PI / 180));

        this.ctx.moveTo(-62 * this.size, -62 * this.size);
        this.ctx.lineTo(62 * this.size, -62 * this.size);
        this.ctx.lineTo(62 * this.size, 62 * this.size);
        this.ctx.lineTo(-62 * this.size, 62 * this.size);
        this.ctx.lineTo(-62 * this.size, -62 * this.size);
        this.ctx.stroke();

        this.ctx.rotate(-(angle * (Math.PI / 180)));
        this.ctx.translate(-x, -y);
        this.ctx.closePath();
    }

    createBgTriangle(x, y, angle) {
        // 定义线段样式
        this.ctx.strokeStyle = "#66ccff";
        this.ctx.lineWidth = 8 * this.size;

        // 绘制线段
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle * (Math.PI / 180));

        this.ctx.moveTo(-63 * this.size, -63 * this.size);
        this.ctx.lineTo(63 * this.size, -63 * this.size);
        this.ctx.lineTo(0, 47 * this.size);
        this.ctx.lineTo(-63 * this.size, -63 * this.size);
        this.ctx.stroke();

        this.ctx.rotate(-(angle * (Math.PI / 180)));
        this.ctx.translate(-x, -y);
        this.ctx.closePath();
    }

    createBgX(x, y, angle) {
        // 定义线段样式
        this.ctx.strokeStyle = "#5C88DA";
        this.ctx.lineWidth = 8 * this.size;

        // 绘制线段
        this.ctx.beginPath();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle * (Math.PI / 180));

        this.ctx.moveTo(-55 * this.size, -55 * this.size);
        this.ctx.lineTo(55 * this.size, 55 * this.size);
        this.ctx.moveTo(55 * this.size, -55 * this.size);
        this.ctx.lineTo(-55 * this.size, 55 * this.size);
        this.ctx.stroke();

        this.ctx.rotate(-(angle * (Math.PI / 180)));
        this.ctx.translate(-x, -y);
        this.ctx.closePath();
    }

    createBgRound(x, y) {
        // 定义线段样式
        this.ctx.strokeStyle = "#00ffcc";
        this.ctx.lineWidth = 8 * this.size;

        // 绘制线段
        this.ctx.beginPath();

        this.ctx.arc(x, y, 65 * this.size, 0, 360, false);

        this.ctx.stroke();
        this.ctx.closePath();
    }

    setRandomPA() {
        // 随机位置、角度
        for (let i = 0; i < this.total; i++) {
            this.position[i] = [getRandomIntInclusive(0, this.sonyBtnBg.width),
            getRandomIntInclusive(0, this.sonyBtnBg.height)];
            this.angle[i] = getRandomIntInclusive(0, 359);
        }
    }

    resetRandomPA() {
        while (true) {
            let error = false;
            for (let i = 0; i < this.total; i++) {
                for (let ii = 0; ii < this.total; ii++) {
                    if (i == ii) {
                        continue;
                    }
                    if (Math.abs(this.position[i][0] - this.position[ii][0]) < this.spacing &&
                        Math.abs(this.position[i][1] - this.position[ii][1]) < this.spacing) {
                        this.position[ii][0] = getRandomIntInclusive(0, this.sonyBtnBg.width);
                        this.position[ii][1] = getRandomIntInclusive(0, this.sonyBtnBg.height);
                        error = true;
                    }
                }
            }
            if (error == false) {
                break;
            }
        }
    }

    drawGraphics() {
        // 绘制图形
        for (let i = 0; i < this.total; i = i + 4) {
            this.createBgSquare(this.position[i][0], this.position[i][1], this.angle[i]);
            this.createBgRound(this.position[i + 1][0], this.position[i + 1][1]);
            this.createBgTriangle(this.position[i + 2][0], this.position[i + 2][1], this.angle[i + 2]);
            this.createBgX(this.position[i + 3][0], this.position[i + 3][1], this.angle[i + 3]);
        }
    }
}

var bg = new sonyBtnBg();

bg.setRandomPA();
bg.resetRandomPA();
bg.drawGraphics();