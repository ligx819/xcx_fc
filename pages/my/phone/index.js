//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    submit: false,
    userInfo: null,
    phone: null,
    authCode: '发送验证码',
    isSend: false,
    disable: true
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      })
    }
  },
  checkInput: function (e) {
    var that = this;
    var val = e.detail.value;
    var id = e.currentTarget.id;
    var userInfo = that.data.userInfo;
    if (userInfo && id=="phone" && val != '' && val != userInfo[id]) {
      that.setData({
        phone: val,
        disable: false
      })
    }
  },
  // 发送验证码
  sendCode: function (e) {
    var that = this;
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'sms';
      msg['act_byname'] = 'user';
      msg['unionid'] = userInfo.unionid;
      msg['signname'] = app_data.sms_signname;
      msg['phone'] = that.data.phone;
      app.socket_sendMsg(msg, function (data) {
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          var t = data.second;
          var time = setInterval(function () {
            if (t < 1) {
              clearInterval(time);
              that.setData({
                authCode: '发送验证码',
                isSend: false,
                disable: false
              })
            } else {
              that.setData({
                authCode: t + 's 已发送',
                isSend: true,
                submit: true,
                disable: true,
              })
              t--;
            }
          }, 1000)
          app.showToast("发送成功");
        } else {
          app.showToast('发送失败');
        }
      })
    })
  },
  //表单提交
  formSubmit: function (e) {
    var that = this;
    var userInfo = that.data.userInfo;
    var p = /^1[0-9]{10}$/;
    var val = e.detail.value;
    var ma = that.data.multiArray;
    var toast = '';
    if (!p.test(val.phone)) {
      toast = '请输入正确的手机号码！';
    }else if (!val.code) {
      toast = '请输入正确的验证码！';
    }
    if (toast) {
      wx.showToast({
        title: toast,
        duration: 2000
      })
      return false;
    }
    if (userInfo && val.phone != userInfo.phone) {
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'sms';
        msg['act_byname'] = 'user';
        msg['signname'] = app_data.sms_signname;
        msg['unionid'] = userInfo.unionid;
        msg['phone'] = val.phone;
        msg['code'] = val.code;
        app.socket_sendMsg(msg, function (data) {
          app.log(data);
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.state === 'pass') {
              app.showToast("修改成功", function () {
                wx.redirectTo({
                  url: '/pages/index/index?indexShow=my',
                })
              });
            } else if (data.state === 'nopass') {
              app.showToast("验证码错误");
            } else {
              app.showToast("修改失败");
            }
          } else {
            app.showToast(data.return_msg);
          }
        })
      })
    } 
  }
})