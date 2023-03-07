//一维数组转树形
export function toTree(
  arr,
  pid = '#',
  idKey = 'id',
  pidKey = 'pid',
  childKey = 'children'
) {
  let root = arr.find((item) => item[idKey] == pid)
  let newArr = []
  arr.forEach((item) => {
    let parent = arr.find((i) => i[idKey] == item[pidKey])
    if (parent) {
      parent[childKey]
        ? parent[childKey].push(item)
        : (parent[childKey] = [item])
    } else {
      root
        ? root[childKey]
          ? root[childKey].push(item)
          : (root[childKey] = [item])
        : newArr.push(item)
    }
  })
  return root ? root : newArr
}
//树形数组转一维
export const toOne = (
  val,
  childrenKey = 'children',
  idKey = 'id',
  saveChild = false
) => {
  const arr2 = []
  let arr = null
  val instanceof Array ? (arr = val) : (arr = [val])
  arr.forEach((item) => {
    if (item[childrenKey]) {
      arr2.push(...toOne(item[childrenKey], childrenKey, idKey, saveChild))
    }
    const newItem = { ...item }
    saveChild
      ? arr2.push(newItem)
      : delete newItem[childrenKey] && arr2.push(newItem)
  })
  return arr2.sort((a, b) => {
    return a[idKey] - b[idKey]
  })
}
//用于数组去重 (若为元素为对象需要传入唯一值的key)
export function noRepeat(arr, key = false) {
  let obj = {}
  let newarr = arr.reduce(function (sum, current) {
    if (!key) {
      obj[current] ? '' : (obj[current] = true && sum.push(current))
    } else {
      obj[current[key]] ? '' : (obj[current[key]] = true && sum.push(current))
    }
    return sum
  }, [])
  return newarr
}
//防抖
export const debounce = (fn, delay = 500) => {
  let timer = null
  return function () {
    let _this = this
    let _arguments = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      // console.log('执行器触发')
      fn.apply(_this, _arguments)
    }, delay)
  }
}
//节流
export const throttle = (fn, delay = 500) => {
  let flag = false
  return function () {
    if (!flag) {
      let _this = this
      let _arguments = arguments
      flag = true
      fn.apply(_this, _arguments)
      setTimeout(() => {
        flag = false
      }, delay)
    }
  }
}
//指定元素全屏 //参数为标签
export const fullScreen = {
  full: (el) => {
    let fullFn =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen
    if (fullFn) return fullFn.call(el)
    if (window.ActiveXObject) {
      var ws = new ActiveXObject('WScript.Shell')
      ws && ws.SendKeys('{F11}')
    }
  },
  exit: () => {
    var efs =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen
    if (efs && document.fullscreenElement) {
      efs.call(document)
    } else if (window.ActiveXObject) {
      var ws = new ActiveXObject('WScript.Shell')
      ws && ws.SendKeys('{F11}')
    }
  },
}
//替换字符串
export function replace(text, oldVal, newWord, isAll = true) {
  return text.replace(new RegExp(oldVal, isAll ? 'g' : ''), newWord)
}
//下载方法
export function download(fliePath, fileName, isImg = false) {
  if (isImg) {
    let image = new Image()
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = fliePath
    image.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      // let jpeg = /(.+(?=[.jpeg]$))/
      // let png = /(.+(?=[.png]$))/
      // let gif = /(.+(?=[.gif]$))/
      // let raw = /(.+(?=[.raw]$))/
      // let jpg = /(.+(?=[.jpg]$))/
      // let webp = /(.+(?=[.webp]$))/
      // let bmp = /(.+(?=[.bmp]$))/
      // let apng  = /(.+(?=[.apng ]$))/

      canvas.toBlob((blob) => {
        let href = URL.createObjectURL(blob)
        let Link = document.createElement('a')
        Link.download = fileName + '.png'
        Link.href = href
        Link.click()
        Link.remove()
        // 用完释放URL对象
        URL.revokeObjectURL(url)
      })
    }
  } else {
    const eleLink = document.createElement('a') // 新建A标签
    eleLink.href = fliePath // 下载的路径
    eleLink.target = '_blank'
    eleLink.download = `${fileName}` // 设置下载的属性，可以为空
    eleLink.style.display = 'none'
    document.body.appendChild(eleLink)
    eleLink.click() // 触发点击事件
    document.body.removeChild(eleLink)
  }
}
//一键复制到粘贴板
export function copyInto(val) {
  const input = document.createElement('textarea')
  input.style.opacity = '0'
  input.style.position = 'fixed'
  input.style.top = '0'
  input.style.left = '0'
  input.style['z-index'] = '-999'
  document.body.appendChild(input)
  input.value = val
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}
//时间
export function getTime(val) {
  function bu0(val){
     return val*1 <10 ? '0'+val :val.toString()
  }
  function getWeekDay(val) {
    week = [
      { label: 1, value: '一' },
      { label: 2, value: '二' },
      { label: 3, value: '三' },
      { label: 4, value: '四' },
      { label: 5, value: '五' },
      { label: 6, value: '六' },
      { label: 0, value: '日' },
    ]
    return week.find((item) => item.label == val).value
  }
  let now = val ? new Date(val) : new Date()
  let year = now.getFullYear().toString() //得到年份
  let month = bu0(now.getMonth()+1) //得到月份
  let day =bu0(now.getDate())   //得到日期
  let week =bu0(now.getDay())  //得到周几
  let hour =bu0(now.getHours())  //得到小时数
  let minute =bu0(now.getMinutes())  //得到分钟数
  let second =bu0(now.getSeconds())  //得到秒数
  return {
    year,
    month,
    day,
    week,
    weekCn: getWeekDay(week),
    hour,
    hour12 : hour>12?bu0(hour -12) :hour,
    AP:hour>12? 'PM':'AM',
    APCN:hour>12? '下午':'上午',
    minute,
    second,
  }
}
//深度克隆
export function clone(val) {
  function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
  }
  function cloneUtil(target) {
    let result
    if (getType(target) === 'Object') {
      result = {}
    } else if (getType(target) === 'Array') {
      result = []
    } else result = target
    for (let i in target) {
      let item = target[i]
      if (getType(item) === 'Object' || getType(item) === 'Array') {
        result[i] = cloneUtil(item)
      } else {
        result[i] = item
      }
    }
    return result
  }
  return cloneUtil(val)
}
let my_utils = {
  toTree,
  toOne,
  noRepeat,
  debounce,
  throttle,
  fullScreen,
  replace,
  download,
  copyInto,
  getTime,
  clone,
}
export default my_utils
