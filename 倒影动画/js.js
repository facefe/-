// function init() {
//     var bg = $('.bgimg');
//     var len = bg.length;
//     var deg = 360 / len;
//     for (var i = 0; i < len; i++) {
//         $(bg[i]).css({
//             transform: 'rotateY(' + i * deg + 'deg) translateZ(300px)',
//             transition: 'transform 1s ' + (len - 1 - i) * 0.1 + 's'
//         })
//     }
// }
// init();

// 原生js的写法, 好像也没有什么不一样。
function init() {
    let bg = document.getElementsByClassName('bgimg');
    let len = bg.length;
    const deg = 360 / len;
    for (let i = 0; i < len; i++) {
        bg[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(300px)';
        bg[i].style.transition = 'transform 1s ' + (len - 1 - i) * 0.1 + 's'

    }
}
init();