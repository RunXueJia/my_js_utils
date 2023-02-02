export function toTree( //一维数组转树形
  arr,
  pid = 0,
  idKey = 'id',
  pidKey = 'pid',
  childKey = 'children'
) {
  const root = arr.find((i) => i[idKey] == pid)
  const arr2 = []
  arr
    .filter((i) => i[idKey] !== pid)
    .forEach((item) => {
      if (item[pidKey] == pid) {
        const arr3 = toTree(arr, item[idKey], idKey, pidKey)
        if (arr3.length) item[childKey] = arr3
        root
          ? root[childKey]
            ? root[childKey].push(item)
            : (root[childKey] = [item])
          : arr2.push(item)
      }
    })
  return root ? root : arr2
}
export const toOne = (
  //树形数组转一维
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
export function noRepeat(arr, key = false) {
  //用于数组去重 (若为元素为对象需要传入唯一值的key)
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
export const debounce = (fn, delay = 500) => {
  //防抖
  let timer = null
  return function () {
    let _this = this
    let _arguments = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      console.log('执行器触发')
      fn.apply(_this, _arguments)
    }, delay)
  }
}
export const throttle = (fn, delay = 500) => {
  //节流
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
export function replace(text, oldVal, newWord, isAll = true) {
  //替换字符串
  return text.replace(new RegExp(oldVal, isAll ? 'g' : ''), newWord)
}
export function download(fliePath, fileName) {
  const eleLink = document.createElement('a') // 新建A标签
  eleLink.href = fliePath // 下载的路径
  eleLink.target = '_blank'
  eleLink.download = `${fileName}` // 设置下载的属性，可以为空
  eleLink.style.display = 'none'
  document.body.appendChild(eleLink)
  eleLink.click() // 触发点击事件
  document.body.removeChild(eleLink)
}
let my_utils = {
  toTree,
  toOne,
  noRepeat,
  debounce,
  throttle,
  replace,
  download,
}
export default my_utils
