// miniprogram/pages/owner.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userName:'',
      idCard:'',
      telPhone:'',
      code:'',
      start:'始发地',
      end:'目的地',
      plate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  goPage(e){
    console.log(e,'e');
    let id = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/map/map?id='+id,
    })
  },
  submit(){
    console.log(this.data);
    
  },
  nameInput(e){
    var value = e.detail.value;
    let target = e.target.dataset.id
    this.setData({
      [target]: value
    })
  }
})