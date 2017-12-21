//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    submit:false,
    userInfo: null,
  },
  onLoad:function(){
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo: userInfo,
      })

    }
  },
  checkInput:function(e){
    var that = this;
    var val = e.detail.value;
    var id = e.currentTarget.id;
    var userInfo = that.data.userInfo;
    if (userInfo && val != userInfo[id]){
      that.setData({
        submit: true
      })
    }
  },
  //表单提交
  formSubmit:function(e){
    var that = this;
    var userInfo = that.data.userInfo;
    var val = e.detail.value;
    var p = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var ma = that.data.multiArray;
    var toast = '';
    if (!val.truename) {
      toast = '姓名不能为空！';
    } else if (!p.test(val.idcard)) {
      toast = '请输入正确的身份证号！';
    }
    if (toast) {
      wx.showToast({
        title: toast,
        duration: 2000
      })
      return false;
    }
    
    if (userInfo && ((val.truename && val.truename != userInfo.truename) || (val.idcard && val.idcard != userInfo.idcard))) {
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'idcard';
        msg['act_byname'] = 'user';
        msg['unionid'] = userInfo.unionid;
        msg['truename'] = encodeURI(val.truename);
        msg['idcard'] = val.idcard;
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.return === 'SUCCESS' || data.return === 'NULL'){
              wx.removeStorageSync('userInfo');
              if (data.return === 'NULL') 
                wx.setStorageSync('userInfo', userInfo);
              app.showToast("修改成功", function () {
                wx.redirectTo({
                  url: '/pages/index/index?indexShow=my',
                })
              });
            }else{
              app.showToast("修改失败");
            }
          }else{
            app.showToast(data.return_msg);
          }
        })
      })
    }else{
      app.showToast("没有内容被修改");
    }
  }
})