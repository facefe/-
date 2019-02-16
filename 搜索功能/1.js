var person = [{
        name: '刘小华',
        src: './img/d.jpg',
        sex: 'male',
        des: '漂亮的女孩子'
    },
    {
        name: '王花',
        src: './img/de.jpg',
        sex: 'male',
        des: '漂亮的程序猿'
    },
    {
        name: '陈军',
        src: './img/e.jpg',
        sex: 'female',
        des: '我是一个学霸'
    },
    {
        name: '王华',
        src: './img/f.jpg',
        sex: 'female',
        des: '我喜欢游泳'
    },
    {
        name: '陈思思',
        src: './img/liu.jpg',
        sex: 'male',
        des: '我喜欢看电影'
    },
    {
        name: '陈学习',
        src: './img/q.jpg',
        sex: 'female',
        des: '我爸我妈爱学习'
    },
    {
        name: '王美丽',
        src: './img/d.jpg',
        sex: 'male',
        des: '我妈是美丽的妈妈'
    }

];


var listUl = document.getElementsByClassName('list-ul')[0]

function inputLi(arr) {
    var str = ''
    arr.forEach(function (ele, index) {
        str += '<li class = "list-li" >\
            <div class = "img" >\
             <img src = ' + ele.src + '\
        alt = "" >\
            </div> <div class = "name" >' + ele.name + ' </div> \
            <div class = "des" > ' + ele.des + ' </div>\
             </li>'

    })
    return str
}
// var str = inputLi(person)

// var listUl = document.getElementsByClassName('list-ul')[0]
// listUl.innerHTML = str

// 下面写筛选功能

function filterName(arr, nam) {
    // 这个只要把符合条件的数组筛选出来就可以了。   
    //然后把数组参入上一个inputUl函数就可以了
    var newArr = new Array();
    newArr = arr.filter(function (ele, index) {
            if (ele.name.indexOf(nam) !== -1) {
                return true

            }
        }

    )
    return newArr
}

function filterSex(arr, se) {
    // 这个只要把符合条件的数组筛选出来就可以了。
    //然后把数组参入上一个inputUl函数就可以了
    if (se === 'all') {
        return arr
    } else {
        var newArr = new Array();
        newArr = arr.filter(function (ele, index) {
                if (ele.sex == se) {
                    return true
                }
            }

        )
        return newArr
    }

}


var objDes = {
    name: '',
    sex: 'all'
}
var objFunc = {
    name: filterName,
    sex: filterSex
}



function objFun(arr) {
    var lastarr = arr
    for (var prop in objFunc) {
        lastarr = objFunc[prop](lastarr, objDes[prop])
    }
    return lastarr

}
// 把 生成的 str 插入页面中封装为一个方法。
function showLi(str) {
    var listUl = document.getElementsByClassName('list-ul')[0]
    listUl.innerHTML = str
}

var input = document.getElementsByClassName('search')[0]
input.oninput = function () {
    objDes.name = this.value
    var newArr = objFun(person)
    var str = inputLi(newArr)
    showLi(str)
}

var search = document.getElementsByClassName('search-ul')[0]
search.addEventListener('click', function (e) {
    objDes.sex = e.target.className;
    var newArr = objFun(person)
    var str = inputLi(newArr)
    showLi(str)

})
/**
 * 初始化 让页面刷新时候展现条目。
 */
let strLi = inputLi(person)
showLi(strLi)