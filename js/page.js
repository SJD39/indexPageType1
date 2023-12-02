var pageTop = 1;
var page = 0;
var pageMax = 3;
var wheelLock = false;

function pageUp(speed) {
    if (wheelLock == true) {
        return;
    }
    if (page == 0) {
        return;
    }
    // 向上翻页
    wheelLock = true;
    var pageUpKeyframes = new KeyframeEffect(
        body,
        [
            { top: ((-page) + pageTop) * 100 + '%' },
            { top: (((-page) + pageTop) + 1) * 100 + '%' }
        ],
        { duration: speed, fill: 'forwards', easing: 'ease' }
    );

    var pageUpAnimation = new Animation(pageUpKeyframes, document.timeline);
    pageUpAnimation.play();
    page--;
    setTimeout(() => {
        wheelLock = false;
    }, speed);
}

function pageDown(speed) {
    if (wheelLock == true) {
        return;
    }
    if (page == pageMax) {
        return;
    }
    // 向下翻页
    wheelLock = true;
    var pageDownKeyframes = new KeyframeEffect(
        body,
        [
            { top: ((-page) + pageTop) * 100 + '%' },
            { top: (((-page) + pageTop) - 1) * 100 + '%' }
        ],
        { duration: speed, fill: 'forwards', easing: 'ease' }
    );

    var pageDownAnimation = new Animation(pageDownKeyframes, document.timeline);
    pageDownAnimation.play();
    page++;
    setTimeout(() => {
        wheelLock = false;
    }, speed);
}