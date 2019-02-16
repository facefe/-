        function getStyle(obj, attr) {
            //用于取到函数的属性，像opacity属性，就没有办法直接取到，需要兼容写法。
            if (obj.currnetStyle) {
                return obj.currnetStyle[attr];
            } else {
                return window.getComputedStyle(obj, false)[attr];
            }
        }

        function move(obj, json, callback) {
            // 就把情况分为opacity 和其他属性。
            // 在这里json传入的参数，需要扩大100倍数，比如需要变到0.7,需要传入的参数为0.7*100 = 70;
            clearInterval(obj.timer);
            var oSpeed, oCur;
            obj.timer = setInterval(
                function () {
                    var flag = true;
                    for (var attr in json) {
                        if (attr == 'opacity') {
                            //我竟然在一个等号上，找了那么长时间，真的没办法。
                            oCur = parseFloat(getStyle(obj, 'opacity')) * 100;
                        } else {
                            oCur = parseInt(getStyle(obj, attr));
                        }
                        oSpeed = (json[attr] - oCur) / 7;
                        //就连一个正负号都需要注意呀。
                        oSpeed = oSpeed > 0 ? Math.ceil(oSpeed) : Math.floor(oSpeed);
                        if (attr == 'opacity') {
                            obj.style.opacity = oCur + oSpeed / 100;
                        } else {
                            obj.style[attr] = oCur + oSpeed + 'px';

                        }
                        if (oCur !== json[attr]) {
                            flag = false;
                        }

                    }
                    if (flag) {
                        clearInterval(obj.timer);
                        if (typeof (callback) == 'function') {
                            callback();
                        }
                        // console.log('no错误');
                    }
                }, 30
            );

        }