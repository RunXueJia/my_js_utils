//一维数组转树形
export function toTree(
  arr,
  pid = "#",
  idKey = "id",
  pidKey = "pid",
  childKey = "children"
) {
  let root = arr.find(item => item[idKey] == pid);
  let newArr = [];
  arr.forEach(item => {
    let parent = arr.find(i => i[idKey] == item[pidKey]);
    if (parent) {
      parent[childKey]
        ? parent[childKey].push(item)
        : (parent[childKey] = [item]);
    } else {
      root
        ? root[childKey]
          ? root[childKey].push(item)
          : (root[childKey] = [item])
        : newArr.push(item);
    }
  });
  return root ? root : newArr;
}
//树形数组转一维
export const toOne = (
  val,
  childrenKey = "children",
  idKey = "id",
  saveChild = false
) => {
  const arr2 = [];
  let arr = null;
  val instanceof Array ? (arr = val) : (arr = [val]);
  arr.forEach(item => {
    if (item[childrenKey]) {
      arr2.push(...toOne(item[childrenKey], childrenKey, idKey, saveChild));
    }
    const newItem = { ...item };
    saveChild
      ? arr2.push(newItem)
      : delete newItem[childrenKey] && arr2.push(newItem);
  });
  return arr2.sort((a, b) => {
    return a[idKey] - b[idKey];
  });
};
//用于数组去重 (若为元素为对象需要传入唯一值的key)
export function noRepeat(arr, key = false) {
  let obj = {};
  let newarr = arr.reduce(function(sum, current) {
    if (!key) {
      obj[current] ? "" : (obj[current] = true && sum.push(current));
    } else {
      obj[current[key]] ? "" : (obj[current[key]] = true && sum.push(current));
    }
    return sum;
  }, []);
  return newarr;
}
//防抖
export const debounce = (fn, delay = 500) => {
  let timer = null;
  return function() {
    let _this = this;
    let _arguments = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      // console.log('执行器触发')
      fn.apply(_this, _arguments);
    }, delay);
  };
};
//节流
export const throttle = (fn, delay = 500, tipsText = "") => {
  let flag = false;
  return function() {
    if (!flag) {
      let _this = this;
      let _arguments = arguments;
      flag = true;
      fn.apply(_this, _arguments);
      setTimeout(() => {
        flag = false;
      }, delay);
    } else {
      if (tipsText.trim()) {
        alertText(tipsText, delay);
      }
    }
  };
};
//指定元素全屏 //参数为标签
export const fullScreen = {
  full: el => {
    let fullFn =
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;
    if (fullFn) return fullFn.call(el);
    if (window.ActiveXObject) {
      let ws = new ActiveXObject("WScript.Shell");
      ws && ws.SendKeys("{F11}");
    }
  },
  exit: () => {
    let efs =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;
    if (efs && document.fullscreenElement) {
      efs.call(document);
    } else if (window.ActiveXObject) {
      let ws = new ActiveXObject("WScript.Shell");
      ws && ws.SendKeys("{F11}");
    }
  }
};
//替换字符串
export function replace(text, oldVal, newWord, isAll = true) {
  return text.replace(new RegExp(oldVal, isAll ? "g" : ""), newWord);
}
//下载方法
export function toUrl(url) {
  const eleLink = document.createElement("a"); // 新建A标签
  eleLink.href = url; // 下载的路径
  eleLink.target = "_blank";
  eleLink.style.display = "none";
  document.body.appendChild(eleLink);
  eleLink.click(); // 触发点击事件
  document.body.removeChild(eleLink);
}
export async function download(url, name) {
  const response = await fetch(url);
  const blob = await response.blob();
  downloadFile(blob, name || url);
}
// import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// // 方法3
// export function isDingTalk() {
//   const ua = window.navigator.userAgent;
//   return ua.includes("DingTalk"); // true or false
// }
export function downloadFile(content, filename) {
  const a = document.createElement("a");
  const url = URL.createObjectURL(content);
  // if (isDingTalk()) {
  //   dd.biz.util.downloadFile({
  //     url: url, //要下载的文件的url
  //     name: filename, //定义下载文件名字
  //     onProgress: function(msg) {
  //       // 文件下载进度回调
  //     },
  //     onSuccess: function(result) {
  //       URL.revokeObjectURL(url);
  //     },
  //     onFail: function() {}
  //   });
  // } else {
    a.href = url;
    a.download = filename;
    a.click();
  // }
  URL.revokeObjectURL(url);
}
//一键复制到粘贴板
export function copyInto(val) {
  const input = document.createElement("textarea");
  input.style.opacity = "0";
  input.style.position = "fixed";
  input.style.top = "0";
  input.style.left = "0";
  input.style["z-index"] = "-999";
  document.body.appendChild(input);
  input.value = val;
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
}
//时间
export function getTime(val) {
  function bu0(val) {
    return val * 1 < 10 ? `0${val}` : val.toString();
  }
  function getWeekDay(val) {
    week = [
      { label: 1, value: "一" },
      { label: 2, value: "二" },
      { label: 3, value: "三" },
      { label: 4, value: "四" },
      { label: 5, value: "五" },
      { label: 6, value: "六" },
      { label: 0, value: "日" }
    ];
    return week.find(item => item.label == val).value;
  }
  let now = val ? new Date(val) : new Date();
  let year = now.getFullYear().toString(); //得到年份
  let month = bu0(now.getMonth() + 1); //得到月份
  let day = bu0(now.getDate()); //得到日期
  let week = bu0(now.getDay()); //得到周几
  let hour = bu0(now.getHours()); //得到小时数
  let minute = bu0(now.getMinutes()); //得到分钟数
  let second = bu0(now.getSeconds()); //得到秒数
  return {
    year,
    month,
    day,
    week,
    // weekCn: getWeekDay(week),
    hour,
    hour12: hour > 12 ? bu0(hour - 12) : hour,
    AP: hour >= 12 ? "PM" : "AM",
    APCN: hour >= 12 ? "下午" : "上午",
    minute,
    second
  };
}
//毫秒数转换成 时分秒
export function formatTime(milliseconds, floor = true, key) {
  function bu0(n) {
    return n < 10 ? "0" + n : n;
  }
  let seconds = floor ? Math.floor(milliseconds / 1000) : milliseconds / 1000;
  let minutes = Math.floor(seconds / 60);
  if (key == "minutes") {
    minutes = (seconds / 60).toFixed(2);
  }
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let time = {
    days: bu0(days),
    hours: bu0(hours % 24),
    minutes: bu0(minutes % 60),
    allminutes: minutes,
    seconds: bu0(seconds % 60),
    allseconds: seconds,
    formatTime: `${days ? days + "天 " : ""}${bu0(hours % 24)}:${bu0(
      minutes % 60
    )}:${bu0((seconds % 60).toFixed(2))}`
  };
  return time;
}
//深度克隆
export function clone(val) {
  function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }
  function cloneUtil(target) {
    let result;
    let type = getType(target);
    if (type === "Object") {
      result = {};
    } else if (type === "Array") {
      result = [];
    } else if (type === "Date") {
      result = new Date(target.getTime());
    } else if (type === "RegExp") {
      result = new RegExp(target);
    } else if (type === "String") {
      result = target.slice();
    } else {
      result = target;
    }
    if (type === "Object" || type === "Array") {
      for (let i in target) {
        let item = target[i];
        if (getType(item) === "Object" || getType(item) === "Array") {
          result[i] = cloneUtil(item);
        } else {
          result[i] = item;
        }
      }
    }
    return result;
  }
  return cloneUtil(val);
}
//将一个Sender对象中的所有属性 更新到receiver中
export function deepMerge(receiver, Sender) {
  function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }
  function merge(receiver, Sender) {
    let output = Object.assign({}, receiver);
    if (isObject(receiver) && isObject(Sender)) {
      Object.keys(Sender).forEach(key => {
        if (isObject(Sender[key])) {
          if (!(key in receiver) || receiver[key] === null) {
            output[key] = deepMerge({}, Sender[key]);
          } else {
            output[key] = merge(receiver[key], Sender[key]);
          }
        } else {
          Object.assign(output, { [key]: Sender[key] });
        }
      });
    }
    return output;
  }
  return merge(receiver, Sender);
}
//黑色弱弹窗提醒
export function alertText(text, delay = 1500) {
  const alertText = document.getElementsByClassName("alertText");
  if (alertText.length)
    [...alertText].forEach(i => document.body.removeChild(i));
  let html = `
        <span>${text}</span>
        `;
  const div = document.createElement("div");
  div.className = "alertText";
  div.innerHTML = html;
  div.style = `
      width: auto !important;
      padding: 5px 10px !important;
      position:fixed;
      top:50%;
      left:50%;
      line-height:32px;
      transform:translate(-50%,-51%);
      z-index:999;
      text-align:center !important;
      background:rgba(0,0,0,0.8);
      border-radius: 0.5em;
      color: #ffff;
      pointer-events: none;
  `;
  div.animate(
    [
      {
        transform: "translate(-50%,-70%)",
        opacity: 1
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.9
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.9
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.8
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.7
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.6
      },
      {
        transform: "translate(-50%,-50%)",
        opacity: 0.5
      }
    ],
    {
      duration: 1500,
      easing: "linear",
      delay: 0,
      iterations: "1",
      direction: "alternate",
      fill: "forwards"
    }
  );
  document.body.appendChild(div);
  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (error) {}
  }, delay);
}
//生成随机码 //chars为字符库
export function randomCode(len, chars) {
  len = len || 32;
  let $chars =
    chars ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
export let randomString = randomCode;
//检测一段字符串中指定字符出现次数
export function countOccurrences(str, subStr) {
  const regex = new RegExp(subStr, "g");
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}
//数组中随机取一个元素
export function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
let my_utils = {
  toTree,
  toOne,
  noRepeat,
  debounce,
  throttle,
  fullScreen,
  replace,
  toUrl,
  copyInto,
  getTime,
  formatTime,
  clone,
  deepMerge,
  alertText,
  randomCode,
  randomString,
  countOccurrences,
  randomElement,
  download,
  downloadFile
};
export default my_utils;
