export function debounce(func, delay) {
    // 记录一下有没有定时器
    let timer = null
        // arguments  args
    return function(...args) {
        // 判断timer售后为空 如果不为空就清除定时器
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


// 格式化时间的函数
// 1.传进去一个data  fmt为格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }

    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}