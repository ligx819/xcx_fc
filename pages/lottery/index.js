//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    lottery_list: null,
    text: '此功能试运行阶段，仅限广州、惠州、佛山、中山四个地市部分站点可用。',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueecopy_status: false,//是否显示复制数据
    marquee_margin: 60,//两条数据之间的间距
    size: 14,//字体大小
    interval: 20, // 时间间隔
  },
  clearData: function () {
    wx.removeStorageSync('isClear');
  },
  onLoad: function (options) {
    this.setData({
      lottery_list: app_data.config.bet.lists
    })
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    that.setData({
      length: length,
      windowWidth: windowWidth,
      marquee_margin: length < windowWidth ? windowWidth - length : that.data.marquee_margin
    });
    setTimeout(function(){
      that.run();
    },1000)
  },
  run: function () {
    var that = this;
    var interval = setInterval(function () {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
          marqueecopy_status: that.data.length + that.data.marqueeDistance <= that.data.windowWidth + that.data.marquee_margin
        });
      } else {
        if (-that.data.marqueeDistance >= that.data.marquee_margin) {
          that.setData({
            marqueeDistance: that.data.marquee_margin
          });
          clearInterval(interval);
          that.run();
        } else {
          clearInterval(interval);
          that.setData({
            marqueeDistance: -that.data.windowWidth
          });
          that.run();
        }
      }
    }, that.data.interval);
  }
})