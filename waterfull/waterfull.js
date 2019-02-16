let oUl = document.getElementsByClassName('wr_ul')[0],
    oLi = oUl.children,
    minH = null,
    len = oLi.length,
    minMun = null,
    numberpage = null,
    flag = true

function compareMinLiH() {
    minH = oLi[0].clientHeight
    minMun = 0
    for (let i = 1; i < len; i++) {
        if (oLi[i].clientHeight < minH) {
            minH = oLi[i].clientHeight
            minMun = i
        }
    }
    return minMun
}

function getAllPic(pagenum) {
    let getPic = new Promise(     
        function (resolve, reject) {
            let ajax = new XMLHttpRequest()
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    let xhrStatue = ajax.status
                    if ((xhrStatue >= 200 && xhrStatue <= 300) || xhrStatue === 304) {
                        resolve(ajax.responseText)
                    } else {
                        reject(xhrStatue)
                    }
                }
            }
            ajax.open('GET', `http://localhost:5500/waterfull/src/getPics.php?cpage=${pagenum}`, true)
            ajax.send(null)
        }
    )
    // 这个ajax 请求一次会返回[{},{}包含50个{}里面是对象包含的属性,包含src什么的] 
    getPic.then(function (data) {
        let datas = JSON.parse(data)
        // 然后应该是调用函数。将五十个图片渲染进页面。
        datas.forEach(function (vle, idx) {
            let src = vle.preview,
                text = vle.title
            ronderAll(src)
            flag = true
        })

    }).catch(function (data) {
        console.log(`出现错误,信息${data}
        请刷新。`)

    })
    // 获取最短的li 然后生成 图片
    function ronderAll(imgadr) {
        // let wrapper = document.getElementsByClassName('wrapper')[0],
        runderDom(imgadr)

        function runderDom() {
            let oDiv = document.createElement('div'),
                oImg = new Image(),
                oP = document.createElement('p')
            oDiv.className = 'item'
            oImg.onload = function () {
                oP.innerHTML = '我是一行描述'
                oDiv.appendChild(oImg)
                oDiv.appendChild(oP)
                let numIndex = compareMinLiH()
                // console.log(numIndex)
                oLi[numIndex].appendChild(oDiv)
            }
            oImg.src = imgadr

        }
    }
}
numberpage = 1
getAllPic(numberpage)

window.onscroll = function () {
    if (flag) {
        // let winUlH = oUl.clientHeight,
        let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop,
            clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
            minHNow = compareMinLiH()
        minHNow = oLi[minHNow].clientHeight
        if (scrollHeight + (clientHeight) > minHNow) {
            flag = false
            numberpage++
            getAllPic(numberpage)
            console.log(numberpage)
        }
    }
}



// window.onscroll = function () {
//     var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
//     var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     var pageHeigh = oLi[getMinList(oLi)].offsetHeight;

//     if(scrollHeight + clientHeight > pageHeigh) {
//         getData();
//     }
// }