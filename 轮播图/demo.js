//先完成一个自动轮播的函数。
//一个很混乱的轮播图。
var picWidth = 440,
    flag = true,
    timer = null,
    index = 0;
var slider = document.getElementsByClassName('slider')[0];
var orderlist = document.getElementsByClassName('orderlist')[0];
var orderlist = orderlist.children;
console.log(orderlist);

function moveAuto(obj, dir) {
    clearInterval(timer);
    if (flag) {
        flag = false;
        if (dir == 'right' || dir == 'normal') {
            index++;
            if (index == 3) {
                index = 0;
            }
            //这里还有一个函数执行顺序的关系。添加在这里会在move函数之前执行，会自然。
            changeStyle(orderlist, index);
            move(obj, {
                left: obj.offsetLeft - picWidth
            }, function () {
                //定时器是一个异步加载的过程，所以要特别注意回调函数，如果在前面的异步的函数
                //执行完之前进行其他函数的调用，可能会出现bug.
                if (obj.offsetLeft == -picWidth * 3) {
                    obj.style.left = '0px';
                    // console.log(obj.style.left);
                }
                flag = true;
                setTimeout(slider, 'normal');
            });
        } else if (dir = 'left') {
            if (obj.offsetLeft == 0) {
                obj.style.left = -picWidth * 3 + 'px';
            }
            index--;
            if (index == -1) {
                index = 2;
            }
            changeStyle(orderlist, index);
            move(obj, {
                left: obj.offsetLeft + picWidth
            }, function () {
                flag = true;
                setTimeout(slider, 'normal');
            });
        }
    }
}

function setTimeout(obj, dir) {
    clearInterval(timer);

    timer = setInterval(function () {
        moveAuto(obj, dir)
    }, 3000);
}

// }

// var index = 1;
// changeStyle(orderlist, index);

function changeStyle(obj, index) {
    for (var i = 0; i < obj.length; i++) {
        // Array.prototype.slice.call(obj);
        obj[i].className = '';
    }
    obj[index].className = 'yellow';
    console.log(obj[index]);
}

setTimeout(slider, 'normal');
var rightBtn = document.getElementsByClassName('rightBtn')[0];
rightBtn.onclick = function () {
    moveAuto(slider, 'right');
}
var leftBtn = document.getElementsByClassName('leftBtn')[0];
leftBtn.onclick = function () {
    moveAuto(slider, 'left');
}

//点击小圆点移动的写法。
for (var i = 0; i < 3; i++) {
    (function (myIndex) {
        orderlist[i].onclick = function () {
            flag = false;
            clearTimeout(timer);
            index = myIndex;
            changeStyle(orderlist, index);
            move(slider, {
                left: -index * picWidth
            }, function () {
                flag = true;
                setTimeout(slider, 'normal');
            })
        }
    })(i)
    //立即执行函数/ */
}