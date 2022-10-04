const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到, 选择器 ${selector} 错误`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到, 选择器 ${selector} 错误`
        alert(s)
        //
        return []
    } else {
        return elements
    }
}



const ensure = function(condition, message) {
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('测试成功')
    }
}

const ensureEqual = function(conditionA, conditionB, message) {
    if (conditionA !== conditionB) {
        log('*** 测试失败:', message)
    } else {
        log('测试成功')
    }
}


const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}



// const bindAll = function(elements, eventName, callback) {
//     for (let i = 0; i < elements.length; i++) {
//         let tag = elements[i]
//         tag.addEventListener(eventName, callback)
//     }
// }

const bindAll = function(selector, eventName, callback, responseClass) {
    let element = document.querySelectorAll(selector)
    for (let i = 0; i < element.length; i++) {
        if (responseClass !== undefined) {
            element[i].addEventListener(eventName, function(event) {
                let self = event.target
                if (self.classList.contains(responseClass)) {
                    callback()
                }
            })
        }
        if (responseClass === undefined) {
            element[i].addEventListener(eventName, callback)
        }
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}


const append = function(selector, html) {
    let element = document.querySelectorAll(selector)
    for (let i = 0; i < element.length; i++) {
        let n = element[i]
        appendHtml(n, html)
    }
}




// find 函数可以查找 element 的所有子元素
const find = function(element, selector) {
    let e = element.querySelector(selector)
    if (e === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return e
    }
}

const isArray = function(o) {
    return Array.isArray(o)
}

const isObject = function(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
}

const equals = function(a, b) {
    // 1. 如果 a 和 b 都是数组, 就参考 arrayDeepEquals 的方式来判断
    // 2. 如果 a 和 b 都是对象, 就参考 objectDeepEquals 的方式来判断
    // 3. 否则, 直接判断 a 与 b 是否相等
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) {
            return false
        }
        for (let i = 0; i < a.length; i++) {
            if ((isObject(a[i]) && isObject(b[i])) || isArray(a[i]) && isArray(b[i])) {
                // log('a,b if', a[i], '====' , b[i])
                if (!equals(a[i], b[i])) {
                    return false
                }
            } else {
                // log('a len', a.length)
                // log('a,b else', a[i], '====' , b[i])
                if (a[i] !== b[i]) {
                    return false
                }
            }
        }
        return true
    } else if (isObject(a) && isObject(b)){
        if (!isObject(a) && !isObject(b)) {
            return false
        }
        let keya = Object.keys(a)
        let keyb = Object.keys(b)
        let lenA = keya.length
        let lenB = keyb.length
        if (lenA !== lenB) {
            return false
        }
        for (let i = 0; i < lenA; i++) {
            let key1 = keya[i]
            let key2 = keyb[i]
            if ((isObject(a[key1]) && isObject(b[key2])) || isArray(a[key1]) && isArray(b[key2])) {
                if (!equals(a[key1], b[key2])) {
                    return false
                }
            } else if (a[key1] !== b[key2]) {
                return a[key1] === b[key2]
            }


        }

        return true
    } else {
        return a === b
    }
}
