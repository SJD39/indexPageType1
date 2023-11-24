function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createBgSquare(x, y, angle) {
    let ctx = bgCanvas.getContext("2d");

    // 定义线段样式
    ctx.strokeStyle = "#faafbe";
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // 绘制线段
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));

    ctx.moveTo(-62, -62);
    ctx.lineTo(62, -62);
    ctx.stroke();
    ctx.moveTo(62, -62);
    ctx.lineTo(62, 62);
    ctx.stroke();
    ctx.moveTo(62, 62);
    ctx.lineTo(-62, 62);
    ctx.stroke();
    ctx.moveTo(-62, 62);
    ctx.lineTo(-62, -62);
    ctx.stroke();

    ctx.rotate(-(angle * (Math.PI / 180)));
    ctx.translate(-x, -y);
    ctx.closePath();
}

function createBgTriangle(x, y, angle) {
    let ctx = bgCanvas.getContext("2d");

    // 定义线段样式
    ctx.strokeStyle = "#66ccff";
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // 绘制线段
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));

    ctx.moveTo(-63, -63);
    ctx.lineTo(63, -63);
    ctx.stroke();
    ctx.moveTo(63, -63);
    ctx.lineTo(0, 47);
    ctx.stroke();
    ctx.moveTo(0, 47);
    ctx.lineTo(-63, -63);
    ctx.stroke();

    ctx.rotate(-(angle * (Math.PI / 180)));
    ctx.translate(-x, -y);
    ctx.closePath();
}

function createBgX(x, y, angle) {
    let ctx = bgCanvas.getContext("2d");

    // 定义线段样式
    ctx.strokeStyle = "#5C88DA";
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // 绘制线段
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.rotate(angle * (Math.PI / 180));

    ctx.moveTo(-55, -55);
    ctx.lineTo(55, 55);
    ctx.stroke();

    ctx.moveTo(55, -55);
    ctx.lineTo(-55, 55);
    ctx.stroke();

    ctx.rotate(-(angle * (Math.PI / 180)));
    ctx.translate(-x, -y);
    ctx.closePath();
}

function createBgRound(x, y) {
    let ctx = bgCanvas.getContext("2d");

    // 定义线段样式
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // 绘制线段
    ctx.beginPath();

    ctx.arc(x, y, 65, 0, 360, false);

    ctx.stroke();
    ctx.closePath();
}

// 初始屏幕大小
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

// 数量
var screenArea = window.innerWidth * window.innerHeight;
var num = screenArea / 60000;
var squareNum = num / 4;
var triangleNum = num / 4;
var xNum = num / 4;
var roundNum = num / 4;
var num = squareNum + triangleNum + xNum + roundNum;

// 随机位置、角度
var positionX = [];
var positionY = [];
var angle = [];

for (let i = 0; i < num; i++) {
    positionX[i] = getRandomIntInclusive(0, bgCanvas.width);
    positionY[i] = getRandomIntInclusive(0, bgCanvas.height);
    angle[i] = getRandomIntInclusive(0, 360);
}

while (true) {
    let error = false;
    for (let i = 0; i < num; i++) {
        for (let ii = 0; ii < num; ii++) {
            if (i == ii) {
                continue;
            }
            if (Math.abs(positionX[i] - positionX[ii]) < 180 &&
                Math.abs(positionY[i] - positionY[ii]) < 180) {
                positionX[ii] = getRandomIntInclusive(0, bgCanvas.width);
                positionY[ii] = getRandomIntInclusive(0, bgCanvas.height);
                error = true;
            }
        }
    }
    if (error == false) {
        break;
    }
}

// 绘制图形
for (let i = 0; i < num; i = i + 4) {
    createBgSquare(positionX[i], positionY[i], angle[i]);
    createBgRound(positionX[i + 1], positionY[i + 1]);
    createBgTriangle(positionX[i + 2], positionY[i + 2], angle[i + 2]);
    createBgX(positionX[i + 3], positionY[i + 3], angle[i + 3]);
}