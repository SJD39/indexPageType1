class sonyBtnBg {
    constructor() {
        // 缩放系数
        this.size = window.innerWidth / 1501;

        // 最小间距
        this.spacing = 180 * this.size;

        // 随机位置、角度
        this.position = [];
        this.angle = [];

        // 数量
        this.squareNum = 5;
        this.triangleNum = 5;
        this.xNum = 5;
        this.roundNum = 5;
        this.total = this.squareNum + this.triangleNum + this.xNum + this.roundNum;

        // 生成html元素
        this.sonyBtnBg = document.createElement('canvas');
        this.sonyBtnBg.id = 'bgCanvas';

        this.body = document.getElementsByTagName('body')[0];
        this.body.append(this.sonyBtnBg);

        // 初始屏幕大小
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }

    createBgSquare(x, y, angle) {
        let ctx = bgCanvas.getContext("2d");
    
        // 定义线段样式
        ctx.strokeStyle = "#faafbe";
        ctx.lineWidth = 8 * this.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    
        // 绘制线段
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(angle * (Math.PI / 180));
    
        ctx.moveTo(-62 * this.size, -62 * this.size);
        ctx.lineTo(62 * this.size, -62 * this.size);
        ctx.lineTo(62 * this.size, 62 * this.size);
        ctx.lineTo(-62 * this.size, 62 * this.size);
        ctx.lineTo(-62 * this.size, -62 * this.size);
        ctx.stroke();
    
        ctx.rotate(-(angle * (Math.PI / 180)));
        ctx.translate(-x, -y);
        ctx.closePath();
    }

    createBgTriangle(x, y, angle) {
        let ctx = bgCanvas.getContext("2d");
    
        // 定义线段样式
        ctx.strokeStyle = "#66ccff";
        ctx.lineWidth = 8 * this.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    
        // 绘制线段
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(angle * (Math.PI / 180));
    
        ctx.moveTo(-63 * this.size, -63 * this.size);
        ctx.lineTo(63 * this.size, -63 * this.size);
        ctx.lineTo(0, 47 * this.size);
        ctx.lineTo(-63 * this.size, -63 * this.size);
        ctx.stroke();
    
        ctx.rotate(-(angle * (Math.PI / 180)));
        ctx.translate(-x, -y);
        ctx.closePath();
    }

    createBgX(x, y, angle) {
        let ctx = bgCanvas.getContext("2d");
    
        // 定义线段样式
        ctx.strokeStyle = "#5C88DA";
        ctx.lineWidth = 8 * this.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    
        // 绘制线段
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.rotate(angle * (Math.PI / 180));
    
        ctx.moveTo(-55 * this.size, -55 * this.size);
        ctx.lineTo(55 * this.size, 55 * this.size);
        ctx.moveTo(55 * this.size, -55 * this.size);
        ctx.lineTo(-55 * this.size, 55 * this.size);
        ctx.stroke();
    
        ctx.rotate(-(angle * (Math.PI / 180)));
        ctx.translate(-x, -y);
        ctx.closePath();
    }

    createBgRound(x, y) {
        let ctx = bgCanvas.getContext("2d");
    
        // 定义线段样式
        ctx.strokeStyle = "#00ffcc";
        ctx.lineWidth = 8 * this.size;
        ctx.lineCap = 'round';
    
        // 绘制线段
        ctx.beginPath();
    
        ctx.arc(x, y, 65 * this.size, 0, 360, false);
    
        ctx.stroke();
        ctx.closePath();
    }

    setRandomPA(){
        // 随机位置、角度
        for (let i = 0; i < this.total; i++) {
            this.position[i] = [getRandomIntInclusive(0, bgCanvas.width),
            getRandomIntInclusive(0, bgCanvas.height)];
            this.angle[i] = getRandomIntInclusive(0, 359);
        }
    }

    resetRandomPA(){
        while (true) {
            let error = false;
            for (let i = 0; i < this.total; i++) {
                for (let ii = 0; ii < this.total; ii++) {
                    if (i == ii) {
                        continue;
                    }
                    if (Math.abs(this.position[i][0] - this.position[ii][0]) < this.spacing &&
                        Math.abs(this.position[i][1] - this.position[ii][1]) < this.spacing) {
                        this.position[ii][0] = getRandomIntInclusive(0, bgCanvas.width);
                        this.position[ii][1] = getRandomIntInclusive(0, bgCanvas.height);
                        error = true;
                    }
                }
            }
            if (error == false) {
                break;
            }
        }
    }

    drawGraphics(){
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