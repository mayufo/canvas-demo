var canvas = document.getElementById('canvas')
var penSelect = document.getElementsByClassName('pen-select')[0]
// var pen = document.getElementById('pen')
var context = canvas.getContext('2d')



var defaultWidth = 5
var isUserEraser = false // 是否使用橡皮

function initSize (ele) {
    ele.width = document.documentElement.clientWidth
    ele.height = document.documentElement.clientHeight
}
// 初始化
initSize(canvas)

window.onresize = function () {
    initSize(canvas)
}
// 判断设备 增加事件
toUser(canvas)

pen.onclick = function () {
    penSelect.style.display = 'block'
    isUserEraser = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

eraser.onclick = function () {
    penSelect.style.display = 'none'
    isUserEraser = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}

red.onclick = function () {
    context.fillStyle = '#FF1800'
    context.strokeStyle = '#FF1800'
    red.classList.add('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}

yellow.onclick = function () {
    context.fillStyle = '#FFB000'
    context.strokeStyle = '#FFB000'
    yellow.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}

blue.onclick = function () {
    context.fillStyle = '#04859D'
    context.strokeStyle = '#04859D'
    blue.classList.add('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    red.classList.remove('active')
}

thin.onclick = function () {

    defaultWidth = 5
    thin.classList.add('active')
    thick.classList.remove('active')
}

thick.onclick = function () {
    defaultWidth = 10
    thick.classList.add('active')
    thin.classList.remove('active')
}
clear.onclick = function (){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

save.onclick = function () {
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'my picture'
    a.click()
}
// 划线
function drawLine (x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = defaultWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}


function toUser(canvas) {
    var isUser = false
    var lastPoint = {}
    var newPoint = {}
    if(document.body.ontouchstart !== undefined ) {
        canvas.ontouchstart = function (event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            isUser = true
            if (isUserEraser) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x: x, y: y}
            }
        }
        canvas.ontouchmove = function (event) {
            var x = event.touches[0].clientX
            var y = event.touches[0].clientY
            if (!isUser) return
            if (isUserEraser) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {x: x, y: y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function () {
            isUser = false
        }

    } else {
        canvas.onmousedown = function (event) {
            var x = event.clientX
            var y = event.clientY
            isUser = true
            console.log(x, y, 44)
            if (isUserEraser) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x: x, y: y}
            }
        }

        canvas.onmousemove = function (event) {
            var x = event.clientX
            var y = event.clientY
            console.log(x, y)
            if (!isUser) return
            if (isUserEraser) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {x: x, y: y}
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function () {
            isUser = false
        }
    }
}


