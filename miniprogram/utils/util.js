/**
 * 格式化时间
 * @param   {Datatime}  source  时间对象
 * el:xx.formatTime(new Date())
 */
// 年月日
function YMD(date){
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(formatNumber).join('-')
}
// 时分秒
function HMS(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n){
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 正则类型检测
 * @param   {String}    str     字符串
 * @param   {String}    type    类型('phone','pwd','plateNumber')
 */
function checkType(str, type) {
    switch (type) {
        case 'phone':
            return /^1[3|4|5|7|8]\d{9}$/.test(str);
        case 'pwd':
            return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(str);
        case 'plateNumber':
            // return /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[ADF])|([ADF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/.test(str);
            return true;
        default:
            return true;
    }
}

/**
 * 去除空格
 * @param   {String}    str     字符串
 * @param   {Number}    type    类型(1-所有空格  2-前后空格  3-前空格 4-后空格)
 */
function trim(str, type) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

//字符串循环复制
function repeatStr(str, count) {
    return str.repeat(count);
}

/**
 * 字符串替换*
 * @param   {String}    str     字符串
 * @param   {Number}    regArr  替换位置
 * '18819322663', [3, 5, 3], 0
 */
function encryptStr(str, regArr, type = 0, ARepText = '*') {
    let regtext = '',
        Reg = null,
        replaceText = ARepText;
    //replaceStr('18819322663',[3,5,3],0)
    //result：188*****663
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
        regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
        Reg = new RegExp(regtext);
        let replaceCount = repeatStr(replaceText, regArr[1]);
        return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    //replaceStr('1asd88465asdwqe3',[5],0)
    //result：*****8465asdwqe3
    else if (regArr.length === 1 && type === 0) {
        regtext = '(^\\w{' + regArr[0] + '})'
        Reg = new RegExp(regtext);
        let replaceCount = repeatStr(replaceText, regArr[0]);
        return str.replace(Reg, replaceCount)
    }
}

/**
 * 获取对象数组里面的某些项
 * @param   {arr}       arr     对象数组
 * @param   {string}    keys    获取规则
 * el:let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
 * el:getOptionArray(arr,'a,c')
 * el:result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
 * el:getOptionArray(arr,'b',1)
 * el:result：[2, 3, 9, 2, 5]
 */
function getOptionArray(arr, keys) {
    let newArr = [];
    if (!keys) {
        return arr;
    }
    let _keys = keys.split(','),
        newArrOne = {};
    //是否只是需要获取某一项的值
    if (_keys.length === 1) {
        for (let i = 0, len = arr.length; i < len; i++) {
            newArr.push(arr[i][keys])
        }
        return newArr;
    }
    for (let i = 0, len = arr.length; i < len; i++) {
        newArrOne = {};
        for (let j = 0, len1 = _keys.length; j < len1; j++) {
            newArrOne[_keys[j]] = arr[i][_keys[j]]
        }
        newArr.push(newArrOne);
    }
    return newArr;
};
// 省级数据
function provinceJson(json,p){
    for (var i in json) {
        if (json[i].provinceName == p) {
            return json[i];
        }
    }
};
// json
function searchInit(json) {
    var newJson = [];
    for (var i in json) {
        json[i].cityList.forEach(function (a) {
            for (var j in a) {
                if (Array.isArray(a[j])){
                    var item = a[j];
                    for (var h in item){
                        newJson.push(item[h]);
                    };
                }
            }
        });
    };
    return newJson;
};
/**
 * 数组去重
 */
function removeRepeatArray(arr){

    // es5
    // return arr.filter(function (item, index, self) {
    //     return self.indexOf(item) === index;
    // });

    //es6
    return [...new Set(arr)];
};
// 城市列表对象数组去重
function removeObjArr(arr){
    let obj = {};
    return arr = arr.reduce((cur, next) => {
        var item = next.cityName;
        obj[item] ? "" : obj[item] = true && cur.push(next);
        return cur;
    }, [])
}

// 保存n个缓存 （str - 字符串，key - 键名，n - 个数）
function nCache(str, key,n,that){
    // 读取缓存
    var keyValue = wx.getStorageSync(key);
    // 如果没有就创建
    if (!keyValue) {
        keyValue = [];
    }
    // 添加arr
    keyValue.push(str);
    // 去除重复的
    var arrList = removeRepeatArray(keyValue);
    // 保存n个
    if (arrList.length > n) {
        arrList.splice(0, 1);
    }
    // 添加缓存
    wx.setStorageSync(key, arrList);
    // 获取新缓存，渲染页面
    var params = {};
    params["keyboardValue"] = wx.getStorageSync(key);
    that.setData(params);
};

// 验证码倒计时
var interval
function getCode(that, phone, currentTime) {
    let params = {};
    if (!checkType(phone, 'phone')) {
        wx.showToast({
            title: "请输入正确的手机号码",
            icon: "none",
            duration: 2000,
            mask: true,
        })
        return;
    }
    var currentTime = currentTime;
    params["time"] = currentTime + '秒';
    that.setData(params);

    interval = setInterval(function () {
        params["time"] = (currentTime - 1) + '秒';
        that.setData(params);
        currentTime--;
        if (currentTime <= 0) {
            clearInterval(interval)
            params["correct"] = true;
            params["time"] = '重新获取';
            params["currentTime"] = currentTime;
            params["disabled"] = false;
            that.setData(params);
        }
    }, 1000)
}
// "2019-03-27 08:57"
function timeDifference(time) {
  if (time === null) {
    return "08:57"
  }
  let [,rentHour,rentMin] = time.split(/[\s,\:]/g);
  let nowHour = new Date().getHours();
  let nowMin = new Date().getMinutes();
  let [hour,min] = [];
  if (rentMin > nowMin) {
    nowHour--;
    min = nowMin + 60 - rentMin;
  }else {
    min = nowMin - rentMin;
  }
  hour = nowHour - rentHour;
  return fixTwo(hour) + ':' + fixTwo(min);
}

function fixTwo(num) {
  if (num < 10) {
    return '0' + num
  }
  return num.toString()
}

module.exports = {
    // 格式化时间
    YMD,HMS,
    // 正则类型检测
    checkType,
    // 字符串替换
    encryptStr,
    // 选择对象数组某些项
    getOptionArray,
    // 县区json
    searchInit,
    // 数组去重
    removeRepeatArray,
    // 对象数组去重
    removeObjArr,
    // 保存n个缓存
    nCache,
    // 验证码倒计时
    getCode,
    // 数字计算补零
    fixTwo,
    // 计算停车时间
    timeDifference
}
