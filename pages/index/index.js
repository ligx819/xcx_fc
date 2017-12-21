//获取应用实例
var app = getApp();
var app_data = app.globalData;

Page({
  data: {
    userInfo: null,
    indexShow:'index',
    isShowTost: false,
    // 首页开奖信息
    open_lists: null,
    // 我的部分登记信息
    myCont:[
      { 'title': '身份认证', 'img': 'man.png', 'state': '未认证', 'url': '../my/status/index' }, 
      { 'title': '绑定手机', 'img': 'phone.png', 'state': '未填写', 'url': '../my/phone/index' }, 
      { 'title': '联系地址', 'img': 'home.png', 'state': '未填写', 'url': '../my/address/index' }, 
      { 'title': '我的投注单', 'img': 'packet.png', 'state': '', 'url': '../lottery/plan/index/index' }
    ]
  },
  onLoad: function (options) {
    var that = this;
    var indexShow = options.indexShow;
    if (indexShow) {
      that.setData({
        indexShow: indexShow
      })
    }
    app.init(function (open_lists) {
      that.setData({
        open_lists: open_lists
      })
      if (indexShow) {
        that.my();
      }
    });
  },
  indexGo:function(e){
    var that = this;
    let go = e.currentTarget.dataset.go;
    switch(go){
      case 'sys':
        wx.scanCode({
          success: (res) => {
            app.log(res, that.route);
          }
        });
        break;
      case 'tzd':
        app.goto('../lottery/index')
        break;
      case 'jkp':
        wx.scanCode({
          success: (res) => {
            wx.showLoading({
              title: '登录中...',
              //mask: true
            })
            app.checkLogin(function (userInfo) {
              var msg = [];
              msg['byname'] = app_data.byname;
              msg['act_byname'] = 'JKP';
              msg['service_type'] = 'award';

              msg['client_type'] = 'applet';// 客户端类型
              msg['unionid'] = userInfo.unionid;//彩民身份标识
              msg['code'] = res.scanType + ',' + res.result;
              msg['ip'] = '127.0.0.1';//用户IP
              msg['type'] = 1701;//兑奖类型 站点兑奖

              app.socket_sendMsg(msg, function (data) {
                var url = '';
                if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
                  var result = data.return;
                  try{
                    if(result.indexOf('{') > -1){
                      result = JSON.parse(result);
                    }
                  }catch(e){
                    result = data.return;
                  }
                  if(typeof(result) == 'object'){
                    if (result.Err_code) {
                      url = 'code=Err_code' + '&state=系统错误&info=' + result.info
                    } else {
                      url = 'code=' + result.code + '&state=' + result.state + '&info=' + result.info
                    }
                  }else{
                    //wx.hideLoading();
                    that.setData({
                      isShowTost: true,
                      tostCont: result
                    })
                    setTimeout(function () {
                      that.setData({
                        isShowTost: false,
                        tostCont: ''
                      })
                    }, 1500)
                    return;
                  }
                } else {
                  url = 'code=fail'
                }
                app.goto('../prize/index?' + url)
              })
            });
          }
        });
        break;
    }
  },
  selIndex:function(e){
    var that = this;
    var tt = '';
    let go = e.currentTarget.dataset.go;
    go === 'index' ? tt = app_data.config.app_title:tt = '我的';
    wx.setNavigationBarTitle({
      title: tt,
    })
    that.setData({
      indexShow: go
    })
    if(go === 'my'){
      this.my()
    }
  },
  my: function(){
    var that = this;
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'user_info';
      msg['act_byname'] = 'user';
      msg['unionid'] = userInfo.unionid;
      app.socket_sendMsg(msg, function (data) {
        var userInfo = null;
        var idcard = '未认证';
        var phone = '未填写';
        var address = '未填写';
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          
          if (data.return) {
            userInfo = data.return;
            wx.setStorageSync('userInfo', userInfo);
          } else {
            //读取本地数据
            userInfo = wx.getStorageSync('userInfo');
          }
          if (userInfo) {
            if (userInfo.idcard != undefined) {
              idcard = '***' + userInfo.idcard.substring(12) + (userInfo.truename ? userInfo.truename : '');
            }
            if (userInfo.phone != undefined) {
              phone = userInfo.phone.substring(0, 3) + '*****' + userInfo.phone.substring(8);
            }
            if (userInfo.address != undefined) {
              address = userInfo.address.substring(0, 10);
            }
          }
          that.setData({
            userInfo: userInfo,
            myCont: [
              { 'title': '身份认证', 'img': 'man.png', 'state': idcard, 'url': '../my/status/index' },
              { 'title': '绑定手机', 'img': 'phone.png', 'state': phone, 'url': '../my/phone/index' },
              { 'title': '联系地址', 'img': 'home.png', 'state': address, 'url': '../my/address/index' },
              { 'title': '我的投注单', 'img': 'packet.png', 'state': '', 'url': '../lottery/plan/index/index' }
            ]
          })
        } else {
          app.showToast('出错了~~');
        }
      })
    });
  },
  goHall:function(e){
    var id = e.currentTarget.dataset.id;
    app.goto('../hall/index?id='+id)
  },
  
})
