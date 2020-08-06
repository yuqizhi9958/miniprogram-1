// miniprogram/pages/owner.js
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    idCard: '',
    telPhone: '',
    code: '',
    start: '上车地点',
    end: '目的地',
    plate: '',
    plateOne: '',
    plateTwo: '',
    plateThere: '',
    plateFour: '',
    plateFive: '',
    plateSix: '',
    plateSeven: '',
    plateEight: '',
    keyboard: {
      province: [
          ["京", "津", "沪", "渝", "冀", "豫", "云", "辽", "黑"],
          ["湘", "甘", "皖", "鲁", "新", "苏", "浙", "赣"],
          ["鄂", "桂", "晋", "蒙", "陕", "吉", "闽", "贵"],
          ["粤", "青", "藏", "川", "宁", "琼"],
      ],
      numLetter: [
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
          ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"],
          ["L", "M", "N", "P", "Q", "R", "S", "T", "U", "V"],
          ["W", "X", "Y", "Z", "学", "港", "澳"]
      ]
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.keyboardInit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goPage(e) {
    console.log(e, 'e');
    let id = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/map/map?id=' + id,
    })
  },
  submit() {
    console.log(this.data);
    let str = ''
    for (let i = 0; i < this.data.inputValue.length; i++) {
      str +=  this.data.inputValue[i].a
    }
    console.log(str);
    
  },
  nameInput(e) {
    var value = e.detail.value;
    let target = e.target.dataset.id
    this.setData({
      [target]: value
    })
  },
  bindText(e) {
    var value = e.detail.value;
    let target = e.target.dataset.id
    if (value.length > 1) {
      value = value[value.length-1]
    }
    this.setData({
      [target]: value
    })
  },
  keyboardInit() {
    var params = {};
    params["keyboard"] = this.keyboard; // 键盘内容
    params["province"] = true; // 初始显示省
    params["numericAlphabet"] = false; // 初始不显示数字字母
    // params["inputValue"] = [{a:"京"},{a:"A"},{a:"F"},{a:"0"},{a:"2"},{a:"3"},{a:"6"},{a:""}]; // 车牌号
    params["inputValue"] = [{a:""},{a:""},{a:""},{a:""},{a:""},{a:""},{a:""},{a:""}]; // 车牌号
    params["keyboardStatus"] = false; // 键盘显示状态
    params["numb"] = 0; // 输入位置
    params["checked"] = false; // 是否新能源

    this.setData(params);

    // this.okKeyboard = (e) => {
    //     // if (!app.appData.userInfo) {
    //     //     that.setData({
    //     //         hasUserInfo: true
    //     //     });
    //     //     return;
    //     // };
    //     // if (app.islogin()) return;
    //     this.okKeyboard(this, e);
    // };
    // this.numberPlate = (e) => {
    //   // 防抖
    //   if(app.flutter())return;
    //     this.numberPlate(this, e);
    // };
    // this.getFocus = (e)=> {
    //     console.log(e,'ee');
        
    //     // if (!app.appData.userInfo){
    //     //     that.setData({
    //     //         hasUserInfo:true
    //     //     });
    //     //     return;
    //     // };
    //     // if (app.islogin()) return;
    //     this.getFocus(this, e);
    // };
    // this.province = (e)=> {
    //     this.province(this, e);
    // };
    // this.numberLetter = (e) => {
    //     this.numberLetter(this, e);
    // };
    // this.delKeyboard = (e) => {
    //     this.delKeyboard(this, e);
    // };
    // this.checkboxChange = (e) => {
    //     this.checkboxChange(this, e);
    // };
},
// 确认输入
 okKeyboard(that, e) {
    // 防抖
    if(app.flutter())return;
    // 显示底部
    wx.showTabBar();
    // 提取键值
    var str = util.getOptionArray(that.data.inputValue, "a", 1).join("");
    // 全局保存当前所查询的车牌
    app.appData.carNo = str;
    // 前7位不能为空
    var nonull = true;
    for (var i = 0; i < 7 ; i++) {
      if (that.data.inputValue[i].a === "") {
        nonull = false;
      }
    }
    // 判断输入是否正确
    var flag = util.checkType(str, "plateNumber");
    if (str.length < 7 || !flag || !nonull) {
        app.showToast("请输入正确的车牌号");
        return;
    };

    // 隐藏键盘光标
    let params = {};
    params["keyboardStatus"] = false;
    params["province"] = true;
    params["numericAlphabet"] = false;
    params["activeIndex"] = null;
    that.setData(params);

    // 查询改车牌是否正在停车
    // 查询该车牌是否有历史欠费
    Promise.all([that.searchParkingStatus(), that.searchHistory()]).then(res => {
      console.log(res, '<<<<<<<车牌查询信息');

      // 暂未被登记且有历史欠费
      if (res[0] === null && res[1].counts > 0 ) {
      // if (app.appData.carNo === '京A88888' ) {
        // 跳转到代缴账单
        app.navTo("/pages/bill/arrearsList/arrearsList");
        return;
      }
      // 否则跳转到租用情况
      let data = JSON.stringify(res[0]);
      app.navTo("/pages/rentalDetails/rentalDetails?data=" + data);

    })
    //
    // that.platessuccess(str)
},

// 键盘显示隐藏
getFocus(e) {
    let that = this
    // 键盘动画
    var animationData = {}
    animationData["duration"] = 100;
    animationData["timingFunction"] = "linear";
    animationData["delay"] = 0;
    var animation = wx.createAnimation(animationData);

    that.animation = animation;

    animation.translateY(300).step();

    // 隐藏底部
    wx.hideTabBar();

    var animationDataActive = {};
    animationDataActive["animationData"] = animation.export();
    that.setData(animationDataActive)

    var params = {};
    params["keyboardStatus"] = true;
    // params["showTabBar"] = false;

    // 触发点击时，输入框的位置
    var str = util.getOptionArray(that.data.inputValue, "a", 1).join("");
    var inputIndex = e.target.dataset.index;
    
    if (e.currentTarget.dataset.status == 1 && str.length < 1) {
        // 为空显示
        params["province"] = true;
        params["numericAlphabet"] = false;
        params["activeIndex"] = 0; // 光标位置
    } else if (e.currentTarget.dataset.status == 1 && str.length > 0 && inputIndex > 0) {
        // 不为空显示
        params["province"] = false;
        params["numericAlphabet"] = true;
        params["activeIndex"] = inputIndex; // 光标位置
    } else if (e.currentTarget.dataset.status == 1 && str.length > 0 && inputIndex == 0) {
        params["province"] = true;
        params["numericAlphabet"] = false;
        params["activeIndex"] = inputIndex; // 光标位置
    }
    that.setData(params);

    setTimeout(function() {

        animation.translateY(0).step()
        animationDataActive["animationData"] = animation;
        that.setData(animationDataActive);

        if (e.currentTarget.dataset.status == 0) {
            // 隐藏
            wx.showTabBar();
            // params["showTabBar"] = true;
            params["keyboardStatus"] = false;
            params["province"] = true;
            params["numericAlphabet"] = false;
            params["activeIndex"] = null; // 光标位置
            that.setData(params);

        }
    }.bind(that), 200)
},
// 获取车牌省份
province( e) {
    let that = this
    
    let params = {};
    params["inputValue[0].a"] = e.currentTarget.dataset.sh;

    that.setData(params);

    if (that.data.inputValue[0].a != '') {

        params["province"] = false;
        params["numericAlphabet"] = true;
        params["activeIndex"] = 1;
        that.setData(params);

    }
},
//获取车牌号码
numberLetter( e) {
    let that = this
    var params = {};
    var activeIndex = that.data.activeIndex;
    params["inputValue[" + activeIndex + "].a"] = e.currentTarget.dataset.ot
    activeIndex++;
    if (activeIndex == 8) {
        activeIndex = 7;
    }
    params["activeIndex"] = activeIndex;
    that.setData(params);
},
//回删车牌
delKeyboard() {
    let that = this
    let params = {};
    var activeIndex = that.data.activeIndex;
	// console.log(activeIndex, '<<<<<<<<<<<<<<<<<<');
	// return;
    if (activeIndex == 1 && that.data.inputValue[activeIndex].a == "") {
        params["province"] = true;
        params["numericAlphabet"] = false;
        activeIndex--;
        params["activeIndex"] = activeIndex;
    }
	if (that.data.inputValue[activeIndex].a == "") {
		activeIndex--;
		params["activeIndex"] = activeIndex;
	}
    params["inputValue[" + activeIndex + "].a"] = "";
    that.setData(params)
},
// 选择新能源
checkboxChange(that, e) {
    var data = {
        a: ""
    };
    let checked;
    var value = that.data.inputValue;
    if (that.data.checked == true) {
        value.splice(7, 1);
        checked = false;
    } else {
        value.push(data);
        checked = true;
    }
    let params = {};
    params["inputValue"] = value;
    params["checked"] = checked;
    that.setData(params);
}
})