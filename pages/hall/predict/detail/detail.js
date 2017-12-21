//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({

  data: {
    detail: null,
  },
  onLoad: function (options) {
    var that = this;
    var msg = [];
    msg['byname'] = app_data.byname;
    msg['service_type'] = 'predict';
    msg['act_byname'] = 'lottery';
    msg['id'] = options.id
    app.socket_sendMsg(msg, function (data) {
      if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
        if (data.return) {
          wx.setNavigationBarTitle({
            title: data.return.title,
          })
          var WxParse = require('../../../wxParse/wxParse.js');
          data.return.newstext = WxParse.wxParse('newstext', 'html', data.return.newstext, that, 5)
          that.setData({
            detail: data.return,
          })
        }
      }
    })
  }
})