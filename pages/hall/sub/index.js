//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    isIos: false,
    iosThumb: '',
    lottery: null,
    detail: null
  },
  onLoad: function (options) {
    var that = this;
    var lottery = options.lottery
    if(!lottery){
      app.showToast('参数错误',function(){
        wx.navigateBack()
      })
      return false
    }

    var res = wx.getSystemInfoSync();
    var sys = res.system;
    var isIos = sys.indexOf('iOS') >= 0 ? true : false;
    if(isIos){
    that.setData({
      isIos: isIos,
      iosThumb: 'http://' + app_data.byname + '.lott6.com/assets/images/public/'+lottery+'_ios.jpg'
      })
    }else{
      app.checkLogin(function(userInfo){
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'subscribe';
        msg['act_byname'] = 'lottery';
        msg['unionid'] = userInfo.unionid;
        msg['lottery'] = lottery;
        msg['action'] = 'detail';
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            var data = data.return
            if(typeof(data) == 'object'){
              wx.setNavigationBarTitle({
                title: '开奖订阅-' + data.name,
              })
              data.thumb = 'http://'+app_data.byname+'.lott6.com/assets/upload/images/' + data.thumb
              that.setData({
                userInfo: userInfo,
                lottery: lottery,
                detail: data
              })
            }else{
              var modal = {
                content: data,
                showCancel: false
              }
              app.showModal(modal, function(){
                wx.navigateBack()
              })
            }
          }
        })
      })
    }
  },
  btnSubscribe: function(){
    var that = this
    var msg = [];
    msg['byname'] = app_data.byname;
    msg['service_type'] = 'subscribe';
    msg['act_byname'] = 'lottery';
    msg['unionid'] = that.data.userInfo.unionid;
    msg['lottery'] = that.data.lottery;
    msg['action'] = 'buy';
    app.socket_sendMsg(msg, function (data) {
      if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
        var modal = {
          content: data.return,
          showCancel: false
        }
        app.showModal(modal)
      }
    })
  }
})