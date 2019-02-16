var dot = document.getElementsByClassName('dot');
// var a = dot[0];
// a.classList.add('aaaa');
// console.log(a);

function addClass() {
    for (var i = 0; i < 5; i++) {
        dot[i].classList.add('animation2');
    }
}

function remove() {
    for (var i = 0; i < 5; i++) {
        dot[i].classList.remove('animation2');
    }
}

setInterval(
    function () {
        remove();
        setTimeout(
            function () {
                addClass();

            }, 200
        );
    }, 5000
);