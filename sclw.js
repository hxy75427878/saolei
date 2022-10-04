const random01 = function() {

    let n = Math.random()
    n = n * 10
    n = Math.floor(n)
    return n % 2
}

const shuffle = (array) => {
    let rowLen = array.length
    let colLen = array[0].length
    let len = rowLen * colLen
    for (let i = len ; i > 0; i--) {
        let x = Math.floor((i - 1) / colLen)
        let y = (i - 1) % colLen
        let randLen = Math.floor(Math.random() * i)
        let randX = Math.floor(randLen / colLen)
        let randY = randLen % colLen
        let temp = array[x][y]
        array[x][y] = array[randX][randY]
        array[randX][randY] = temp
    }
    return array
}

const randomLine01 = function(x, y, n) {
    let id_sclw = e('#sclw')
    let array = []
    let count = Number(id_sclw.dataset.count)
    let max = Number(id_sclw.dataset.max)
    let line = Number(id_sclw.dataset.y)
    line = line + 1
    id_sclw.dataset.y = String(line)
    for (let i = 0; i < x; i++) {
        let num = random01()
        // log('num', num)
        if (count >= max) {
            num = 0
        }
        if (num === 1) {
            count += 1
            id_sclw.dataset.count = String(count)
        }
        let gap = max - count
        if (line === y && gap > 0) {
            num = 1
            count += 1
            id_sclw.dataset.count = String(count)
        }
        array.push(num)

    }
    return array
}

const randomLine09 = function(x, y) {
    let line = randomLine01(x, y)
    // let num = 0
    for (let i = 0; i < line.length; i++) {
        if (line[i] === 1) {
            line[i] = 9
        } else {
            line[i] = 0
        }
        // log('num1', num)
    }
    return line
}

const randomSquare09 = function(x, y) {
    let array = []
    for (let i = 0; i < y; i++) {
        array.push(randomLine09(x, y))
    }
    // log(array)
    return array
}

const clonedArray = function(array) {
    return array.slice(0)
}

const clonedSquare = function(array) {
    let square = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i]
        let e = clonedArray(line)
        square.push(e)
    }
    return square
}

const plus1 = function(array, x, y) {
    let n = array.length
    let s = array[0].length
    if (x >= 0 && x < n && y >= 0 && y < s) {
        if (array[x][y] !== 9) {
            array[x][y] += 1
        }
    }

}

const markAround = function(array, x, y) {
    if (array[x][y] === 9) {
        // 标记周围 8 个

        // 标记上边 3 个
        plus1(array, x - 1, y - 1)
        plus1(array, x - 1, y)
        plus1(array, x - 1, y + 1)

        // 标记中间 2 个
        plus1(array, x, y - 1)
        plus1(array, x, y + 1)

        // 标记下边三个
        plus1(array, x + 1, y - 1)
        plus1(array, x + 1, y)
        plus1(array, x + 1, y + 1)
    }
}

const markedSquare = function(array) {
    let square = clonedSquare(array)
    for (let i = 0; i < square.length; i++) {
        let line = square[i]
        for (let j = 0; j < line.length; j++) {
            markAround(square, i, j)
        }
    }
    return square
}

const templateCell3 = function(line, x) {
    let div = ''
    for (let i = 0; i < line.length; i++) {
        let num = line[i]
        div += `<div class="cell" data-number="${num}" data-x="${x}" data-y="${i}" data-imgs="0">${num}</div>`
    }
    // log('div', div)
    return div

}

const templateRow = function(square) {
    let div = ''
    for (let i = 0; i < square.length; i++) {
        let n = square[i]
        let count = templateCell3(n, i)
        div += `<div class="row clearfix">${count}</div>`
    }
    return div
}
// 移入移出样式
const bindEvents = function(select, responseClass) {
    let d = es(select)
    for (let i = 0; i < d.length; i++) {
        d[i].addEventListener('mousedown', function () {
            d[i].classList.add(responseClass)
        })
        d[i].addEventListener('mouseup', function () {
            d[i].classList.remove(responseClass)
        })
        d[i].addEventListener('mouseout', function () {
            d[i].classList.remove(responseClass)
        })
    }

}


const insertAlert = () => {
    let t = `
       <div class="modal-container">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="gua-box">
                    <div id="title"></div>
                    <div id="main">
                    </div>
                    <button id="id-button-cancel">再来一局</button> 
                    <button id="id-button-ok">返回菜单</button> 
                </div>
            </div>
       </div>
    `
    let element = e('body')
    appendHtml(element, t)
}

const insertCss = () => {
    let t = `
    <style>
        .modal-container {
            color: #DDDDDD;
            display: none;
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            font-size: 30px;
        }

        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            /*background: black;*/
            /*opacity: 0.5;*/
        }

        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }

        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }

        .gua-box {
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 500px;
            background: rgba(0, 0, 0, 0.7);
        }
        
        .show {
            display: block;
        }
        
        #title {
            text-align: center;
        }
        
        .modal-container #main {
            margin-top: 30px;
        }
        
        #id-button-ok {
            display: inline-block;
            position: absolute;
            background-color: #73A700;
            box-shadow: 0px 5px 0px #4B6D00;
            border: 0px;
            border-radius: 5px;
            width: 30%;
            height: 15%;
            right: 18%;
            bottom: 30px;
            font-size: 25px;
            color: white;
            text-align: right;
            cursor: pointer;
            opacity: 1;
            padding-right: 10px;
        }
        #id-button-ok:active {
            color: rgba(0, 0, 0, 0.5);
            background-color: #73A700;
            box-shadow: 0px 2px 0px #4B6D00;
            transform: translateY(5px);
        }
        
        #id-button-cancel {
            display: inline-block;
            position: absolute;
            background-color: #0F91C0;
            box-shadow: 0px 5px 0px #0A607F;
            border: 0px;
            border-radius: 5px;
            width: 30%;
            height: 15%;
            bottom: 30px;
            left: 18%;
            font-size: 25px;
            color: white;
            text-align: right;
            cursor: pointer;
            opacity: 1;
            padding-right: 10px;
        }
        #id-button-cancel:active {
            color: rgba(0, 0, 0, 0.5);
            background-color: #0E89B6;
            box-shadow: 0px 2px 0px #0A607F;
            transform: translateY(5px);
        }
        
        #close {
            position: absolute;
            right: 0px;
            cursor: pointer;
        }
    </style>
    `
    let element = e('head')
    appendHtml(element, t)
}

const insertHtml = () => {
    insertAlert()
    insertCss()
}


const bindEventAdd = (title, message) => {
    let container = e('.modal-container')
    let titleName = e('#title')
    let messagesName = container.querySelector('#main')
    titleName.innerHTML = title
    // log('messagesName', messagesName)
    messagesName.innerHTML = message
    container.classList.add('show')
}

const bindEventDefine = () => {
    let define = e('#id-button-ok')
    bindEvent(define, 'click', () => {
        let container = e('.modal-container')
        container.classList.remove('show')
        back()
    })
}

const bindEventCancel = () => {
    let cancel = e('#id-button-cancel')
    let idSclw = e('#sclw')
    let x = Number(idSclw.dataset.lenX)
    let y = Number(idSclw.dataset.lenY)
    bindEvent(cancel, 'click', () => {
        let container = e('.modal-container')
        container.classList.remove('show')
        rankSclw(x, y)
    })
}

const bindEventRemove = () => {
    bindEventDefine()
    bindEventCancel()
}

const bindEventClose = () => {
    let close = e('#close')
    let container = e('.modal-container')
    bindEvent(close, 'click', () => {
        container.classList.remove('show')
    })
}


const GuaAlert2 = (title, message) => {
    bindEventAdd(title, message)
    bindEventRemove()
    bindEventClose()
}

// 判断周围八个是否为 0, 不是 0 停止翻雷
const plus2 = function(x, y) {
    let id_sclw = e('#sclw')
    let len = id_sclw.dataset.lenX
    let len2 = id_sclw.dataset.lenY
    if (x < 0 || y < 0 || x >= len2 || y >= len) {
        return
    }
    let cell = e(`[data-x='${x}'][data-y='${y}']`)
    if (cell.classList.contains('flag') || cell.classList.contains('wenhao') ) {
        return
    }
    if (cell.classList.contains('fjkk')) {
        return
    }

    cell.classList.remove('cell2')
    let content = Number(cell.dataset.number)
    let array = ['red', 'blue', 'green', 'orange', 'purple', 'darkslateblue', 'tan', 'teal']
    if (content === 0) {
        cell.classList.add('fjkk')
        markAround_zero(x, y)
        over()
    } else if (content <= 8 && content >= 1){
        cell.classList.add('fjkk')
        cell.classList.add('font')
        over()
        for (let i = 1; i < 9; i++) {
            if (content === i) {
                cell.style.color = array[i - 1]
            }
        }
        return
    } else if (content === 9) {
        clickMine(cell)
    }


}

// 翻开周围八个
const markAround_zero = function(x, y) {
    // 标记周围 8 个
    // 标记上边 3 个
    plus2(x - 1, y - 1)
    plus2(x - 1, y)
    plus2(x - 1, y + 1)
    // 标记中间 2 个
    plus2(x, y + 1)
    plus2(x, y - 1)
    // 标记下边三个
    plus2(x + 1, y - 1)
    plus2(x + 1, y)
    plus2(x + 1, y + 1)
}
// 给 雷 插入类, 以此来判断是否是雷
const nine_class = function(len) {
    let cell = es('.cell')
    // log('cell', cell)
    for (let i = 0; i < len; i++) {
        let values = Number(cell[i].dataset.number)
        cell[i].classList.add('cell2')
        if (values === 9) {
            cell[i].classList.add('class-lw')
        }
    }
}
// 点击到 雷 时,翻开所有雷
const nine_add = function() {
    timeStop()
    let title = `<img src="image/cry.png" width="140px"><img src="image/close.png" id="close"></img>`
    let time = e('#time')
    let gameTime = time.innerHTML
    let maxtime = time.dataset.maxtime
    let text = `<div>游戏用时:${gameTime}</div><div>最佳记录:${maxtime}</div>`
    let class_dilw = es('.class-lw')
    for (let i = 0; i < class_dilw.length; i++) {
        class_dilw[i].classList.add('dilw')
        class_dilw[i].classList.add('font')
        // class_dilw[i].innerHTML = '<img src=\'doge.gif\' width="30" height="30"/>'
    }
    removeCell2()
    GuaAlert2(title, text)
    // log('class_dilw.length', class_dilw.length)
}

const flagAdd = () => {
    let classFlag = es('.class-lw')
    for (let i = 0; i < classFlag.length; i++) {
        // classFlag[i].classList.add('flag')
        if (classFlag[i].classList.contains('flag')) {
            classFlag[i].classList.remove('flag')
            classFlag[i].classList.add('fjkk')
        }
        classFlag[i].classList.add('white')
    }
}
// 翻开除雷外所有放开时, 游戏结束
const over = function() {
    let class_cell = es('.cell')
    let class_fjkk = es('.fjkk')
    let idSclw = e('#sclw')
    let count = 0
    for (let i = 0; i < class_cell.length; i++) {
        let zhengchang = class_cell[i].classList.contains('class-lw')
        if (!zhengchang) {
            count += 1
        }
    }
    if (count === class_fjkk.length) {
        flagAdd()
        idSclw.dataset.over = 'true'
        timeStop()
        let title = `<img src="image/smile.png" width="140px"><img src="image/close.png" id="close"></img>`
        let time = e('#time')
        best()
        let gameTime = time.innerHTML
        let maxtime = time.dataset.maxtime
        let text = `<div>游戏用时:${gameTime}</div><div>最佳记录:${maxtime}</div>`
        GuaAlert2(title, text)
        removeCell2()
    }
}

const removeCell2 = () => {
    let cell = es('.cell')
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].classList.contains('cell2')){
            cell[i].classList.remove('cell2')
        }
    }
}

// 点击 雷 时
const clickMine = function(self, x, y) {
    let idSclw = e('#sclw')
    idSclw.dataset.over = 'true'
    self.classList.add('dilw')
    self.classList.add('font')
    self.classList.remove('cell2')
    nine_add(self)
}
// 点击到 0 时
const clickZero = function(self, x, y) {
    self.classList.add('fjkk')
    self.classList.remove('cell2')
    markAround_zero(x, y)
    over()
}
// 点击到 1 - 8时
const clickNumber = function(self, x, y) {
    self.classList.add('fjkk')
    self.classList.add('font')
    self.classList.remove('cell2')
    over()
}
// 第一次点击
const firstClick = function() {
    let idSclw = e('#sclw')
    bindAll('#sclw', 'click', function (event) {
        let self = event.target
        let active = Number(idSclw.dataset.active)
        let x1 = Number(self.dataset.x)
        let y1 = Number(self.dataset.y)
        let x2 = Number(idSclw.dataset.lenX)
        let y2 = Number(idSclw.dataset.lenY)
        if (self.classList.contains('cell')) {
            let cell = e(`[data-x="${x1}"][data-y="${y1}"]`)
            let value = Number(cell.dataset.number)
            // log('active', active)
            // log('value', value)
            if (active === 0) {
                if (value !== 0) {
                    while (value !== 0) {
                        rankSclw(x2, y2)
                        cell = e(`[data-x="${x1}"][data-y="${y1}"]`)
                        value = Number(cell.dataset.number)
                        // log('value while', value)
                    }
                    playTime()
                    clickZero(cell, x1, y1)
                    idSclw.dataset.active = String(active + 1)
                } else {
                    playTime()
                    clickZero(cell, x1, y1)
                    idSclw.dataset.active = String(active + 1)
                }
            }
        }
    })
}
// 判断点击时的 方块 是什么, 并执行对应函数
const judgeBlock = function(self) {
    let idSclw = e('#sclw')
    // let name = e('#remark')
    let x = Number(self.dataset.x)
    let y = Number(self.dataset.y)
    let active = Number(idSclw.dataset.active)
    // log('active judgeBlock', active)
    if (self.classList.contains('cell') && active >= 1) {
        let value = Number(self.dataset.number)
        self.classList.remove('cell2')
        if (!self.classList.contains('flag')) {
            if (!self.classList.contains('wenhao')){
                if (value === 9) {
                    idSclw.dataset.active = String(active + 1)
                    clickMine(self, x, y)
                } else if (value === 0) {
                    idSclw.dataset.active = String(active + 1)
                    clickZero(self, x, y)
                } else {
                    idSclw.dataset.active = String(active + 1)
                    let array = ['red', 'blue', 'green', 'orange', 'purple', 'darkslateblue', 'tan', 'teal']
                    for (let i = 1; i < 9; i++) {
                        if (value === i) {
                            self.style.color = array[i - 1]
                        }
                    }
                    clickNumber(self, x, y)
                }
            }
        }
    }
}
// 点击方块
const clickBlock = function() {
    bindAll('#sclw', 'click', function (event) {
        let idSclw = e('#sclw')
        let over = idSclw.dataset.over
        if (over === 'false'){
            let self = event.target
            // log('over', over, typeof over)
            judgeBlock(self)
        }
    })
}

const mimeNumber = (n) => {
    let mime = e('#mime')
    mime.dataset.index = n
    mime.innerHTML = String(n)
}

const vjkl1 = function(x, y, index) {
    let id_sclw = e('#sclw')
    let x1 = Number(id_sclw.dataset.lenY)
    let y1 = Number(id_sclw.dataset.lenX)
    if (x < 0 || y < 0 || x >= x1 || y >= y1) {
        return
    }
    let cell = e(`[data-x="${x}"][data-y="${y}"]`)
    let flagNum = Number(cell.dataset.flag)
    cell.dataset.flag = String(flagNum + Number(index))
}

const flag_mime = (x, y, index) => {
    vjkl1(x - 1, y - 1, index)
    vjkl1(x - 1, y, index)
    vjkl1(x - 1, y + 1, index)

    vjkl1(x, y + 1, index)
    vjkl1(x, y - 1, index)

    vjkl1(x + 1, y - 1, index)
    vjkl1(x + 1, y, index)
    vjkl1(x + 1, y + 1, index)
}

const addFlag = () => {
    let cell = es('.cell')
    for (let i = 0; i < cell.length; i++) {
        cell[i].dataset.flag = '0'
    }
}

const flagzj = (index) => {
    let mime = e('#mime')
    let n = Number(mime.dataset.index) - index
    // log('n', n)
    mimeNumber(n)
}

// 右键插旗
const flag = function() {
    bindAll('.cell', 'contextmenu', function (event) {
        event.preventDefault()
        let self = event.target
        let idSclw = e('#sclw')
        let x = Number(self.dataset.x)
        let y = Number(self.dataset.y)
        let over = idSclw.dataset.over
        let count = Number(self.dataset.imgs) % 3
        // log('over', over)
        if (!self.classList.contains('fjkk') && over === 'false') {
            if (count === 0) {
                self.classList.add('flag')
                self.dataset.imgs = String(count + 1)
                flag_mime(x, y, 1)
                flagzj(1)
            } else if (count === 1){
                self.classList.remove('flag')
                self.classList.add('wenhao')
                self.dataset.imgs = String(count + 1)
                flag_mime(x, y, -1)
                flagzj(-1)
            } else {
                self.dataset.imgs = String(count + 1)
                self.classList.remove('wenhao')
            }
        }
    })
}


const rightClick = () => {
    let mime = e('#sclw')
    mime.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        let self = event.target
        let x = Number(self.dataset.x)
        let y = Number(self.dataset.y)
        let flagNum = Number(self.dataset.flag)
        let num = Number(self.dataset.number)
        // log('flagNum', flagNum)
        // log('num', num)
        if (self.classList.contains('fjkk')) {
            if (flagNum === num) {
                markAround_zero(x, y)
            }
        }
    })
}
// 刷新雷区
const rankSclw = (x, y) => {
    let idSclw = e('#sclw')
    // let id2 = e('#sclw2')
    idSclw.dataset.count = '0'
    idSclw.dataset.active = '0'
    idSclw.dataset.over = 'false'
    idSclw.innerHTML = ''
    // id2.innerHTML = ''
    idSclw.dataset.y = '0'
    let array_Square = randomSquare09(x, y)
    // log('array_Square 1', array_Square)
    let arrayCopy = clonedArray(array_Square)
    // log('arrayCopy', arrayCopy)
    let arrayRandom = shuffle(arrayCopy)
    let array_done = markedSquare(arrayRandom)
    // log('array_done', array_done)
    let array_insert = templateRow(array_done)
    // log('array_insert', array_insert)
    // 将数组插入html标签中
    append('#sclw', array_insert)
    // 给 地雷 插入类
    let len = x * y
    nine_class(len)
    // 数组的总长度
    idSclw.dataset.lenX = x
    idSclw.dataset.lenY = y
    // log('len', len)
    let n = e('#time')
    n.innerHTML = `00:00`
    n.dataset.s = '0'
    n.dataset.ss = '0'
    n.dataset.m = '0'
    n.dataset.mm = '0'
    addFlag()
    // 右键插旗子
    flag()
    idSclw.dataset.line = x
    idSclw.dataset.column = y
    let max = Number(idSclw.dataset.max)
    mimeNumber(max)
}

const sclw = (x, y) => {
    rankSclw(x, y)
    firstClick()
    rightClick()
}

const timing = () => {
    let n = e('#time')
    let s = Number(n.dataset.s)
    let ss = Number(n.dataset. ss)
    let m = Number(n.dataset.m)
    let mm = Number(n.dataset.mm)
    s = s + 1
    n.dataset.s = String(s)
    if (s >= 10) {
        n.dataset.s = '0'
        ss += 1
        n.dataset.ss = String(ss)
    }
    if (s === 10) {
        s = 0
        n.dataset.s = String(s)
    }
    if (ss >= 6) {
        n.dataset.ss = '0'
        m += 1
        n.dataset.m = String(m)
    }
    if (m >= 10) {
        n.dataset.m = '0'
        mm += 1
        n.dataset.mm = String(mm)
    }
    n.innerHTML = `${mm}${m}:${ss}${s}`

}

const best = () => {
    let time = e('#time')
    let gameTime = time.innerHTML
    let maxTime = time.dataset.gametime
    let fen = Number(gameTime.slice(0,2))
    let miao = Number(gameTime.slice(-2))
    let maxfen = Number(maxTime.slice(0,2))
    let maxmiao = Number(maxTime.slice(-2))
    if (maxfen > fen) {
        time.dataset.gametime = gameTime
        time.dataset.maxtime = gameTime
    } else if (maxfen === fen) {
        if (maxmiao > miao) {
            time.dataset.gametime = gameTime
            time.dataset.maxtime = gameTime
        }
    }
}

const playTime = function() {
    let n = e('#time')
    let s = setInterval(() => {
        timing()
    }, 1000)
    n.dataset.interval = String(s)
}

const timeStop = () => {
    let span = e('#time')
    let n = span.dataset.interval
    clearInterval(Number(n))
}

// 设置雷行列的参数,
const setupCell = function(max, count, x, y) {
    let s = e('#sclw')
    s.dataset.active = '0'
    s.dataset.max = String(max)
    s.dataset.count = String(count)
    s.dataset.line = x
    s.dataset.column = y
    sclw(x, y)
}

// 点击时 设置对应行列的雷
const clickSetup = function() {
    bindAll('.gua-item', 'click', function (event) {
        let self = event.target
        let index = Number(self.dataset.index)
        let button = e('.gua-content')
        let banner = e('#banner')
        button.classList.add('none')
        banner.classList.add('show')
        timeStop()
        if (index === 0) {
            setupCell(10, 0, 9, 9)
        } else if (index === 1) {
            setupCell(40, 0, 16, 16)
        } else if (index === 2) {
            setupCell(99, 0, 30, 16)
        }
    })
}

const back = () => {
    let mime = e('#sclw')
    let mime2 = e('#sclw2')
    let button = e('.gua-content')
    let banner = e('#banner')
    // log('button', button)
    mime.innerHTML = ''
    mime2.innerHTML = ''
    banner.classList.remove('show')
    button.classList.remove('none')
    timeStop()
}

const remark = () => {
    bindAll('#remark', 'click', () => {
        back()
    })
}

// 统合设置函数
const setup = function() {
    clickSetup()
}



const __mian = function() {
    setup()
    insertHtml()
    clickBlock()
    remark()
}

__mian()