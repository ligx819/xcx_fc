//app.js
var sign = require('common/sign.js');
App({
  globalData: {
    byname: 'test',
    socketUrl: 'wss://你的socket请求地址',
    socketOpen: false,
    socketMsgQueue: [],
    socketCallback: null,
    userInfo: null,
    refresh: false,//是否需要刷新页面
    sms_signname: encodeURI('test'),
    config: null,
    log: false
  },
  onLaunch: function () {
    this.getAuth()
    
    wx.setStorage({
      key: 'appData',
      data: this.globalData,
    })
  },
  getAuth: function (auth = 'scope.userInfo'){
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting[auth]) {
          wx.authorize({
            scope: auth,
            fail() {
              var modal = {
                content: '请允许访问您的用户信息，否则将不能正常使用'
              }
              that.showModal(modal,function(){
                wx.openSetting({
                  success: (res) => {
                    if (!res.authSetting["scope.userInfo"]) {
                      that.getAuth()
                    }
                  }
                })
              })
            }
          })
        }
      }
    })
  },
  init:function(cb){
    var that = this;
    var msg = [];
    msg['byname'] = that.globalData.byname;
    msg['service_type'] = 'init';
    msg['act_byname'] = 'applet';
    that.socket_sendMsg(msg, function (data){
      if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
        if(data.return){
          that.log(data.return);
          that.globalData.config = data.return.config
          wx.setNavigationBarTitle({
            title: that.globalData.config.app_title,
          })
          typeof cb == "function" && cb(data.return.open_lists);
        }
      } else {
        that.showToast('获取参数失败');
      }
    })
  },
  login: function (cb) {
    var that = this;
    var url = that.globalData.loginUrl;
    wx.showLoading({
      title: '登录中...',
      mask: true
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          that.log(res);
          var msg = [];
          msg['byname'] = that.globalData.byname;
          msg['service_type'] = 'login';
          msg['act_byname'] = 'lottery_plan';
          msg['code'] = res.code;
          that.socket_sendMsg(msg,function (data) {
            wx.getSetting({
              success(res) {
                if (!res.authSetting["scope.userInfo"]) {
                  that.getAuth()
                }
              }
            })
            if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
              data = JSON.parse(data.return);
              that.getUserInfo(function (userInfo) {
                  userInfo.unionid = data.unionid;
                  userInfo.openid = data.openid;
                  typeof cb == "function" && cb(userInfo);
                });
            } else {
              that.showToast('登录失败');
            }
          })
          
        } else {
          that.showToast('登录失败');
        }
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  checkLogin: function (cb) {
    var that = this;
    that.showLoading();
    if (that.globalData.userInfo) {
      //console.log(that.globalData.userInfo);
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      // wx.removeStorage({
      //   key: 'user',
      //   success: function(res) {},
      // })
      wx.checkSession({
        success: function (res) {
          //session 未过期，并且在本生命周期一直有效
          that.log('session 未过期');
          wx.getStorage({
            key: 'user',
            success: function (res) {
              typeof cb == "function" && cb(res.data)
            },
            fail: function (res) {
              if (res.errMsg != 'getStorage:ok') {
                that.login(function (res) {
                  that.log(res);
                  wx.setStorage({
                    key: "user",
                    data: res
                  })
                  typeof cb == "function" && cb(res)
                });
              }
            }
          })
        },
        fail: function (res) {
          //登录态过期
          that.log('登录态过期,重新登录');
          that.login(cb) //重新登录
          
        }
      })
    }
  },
  scanCode: function(){
    var that = this;
    // 扫码
    wx.scanCode({
      //onlyFromCamera: true,
      success: (res) => {
        that.log(res.result);
        if(res.errMsg == 'scanCode:ok'){
          if (res.result.indexOf('http://') > -1 || res.result.indexOf('https://') > -1){
            that.goto(res.result);
          }
        }
      }
    })
  },
  showToast: function(content, cb){
    wx.showToast({
      title: content,
      icon: 'loading'
    })
    if(typeof cb == "function"){
      setTimeout(cb, '1500')
    }
  },
  showLoading: function(title = '加载中...', mask = true, cb){
    wx.showLoading({
      title: title,
      mask: mask,
      complete: function(){
        typeof cb == "function" && cb()
      }
    })
  },
  showModal: function(modal, cb){
    wx.showModal({
      title: modal.title ? modal.title:'温馨提示',
      content: modal.content,
      showCancel: modal.showCancel ? modal.showCancel:false,
      success: function(res){
        typeof cb == "function" && cb(res)
      }
    })
  },
  lottery: function(gameId){
    return this.globalData.config.open[gameId];
  },
  bet: function (gameId) {
    return this.globalData.config.bet.lists[gameId];
  },
  btnGo:function(e,url = null){
    this.log(e);
    if(!url){
      url = e.currentTarget.dataset.url;
    }
    if(url){
      wx.redirectTo({
        url: url,
      })
    }
  },
  log: function(msg, route){
    if(this.globalData.log){
      console.log(msg);
      if(route != undefined)
        console.log(route);
    }
  },
  goto:function(url){
    wx.navigateTo({
      url: url,
      fail: function (e) {
        wx.redirectTo({
          url: url,
        })
      }
    })
  },
  socket_init: function () {
    var that = this;
    var webSocketUrl = that.globalData.socketUrl;
    
    wx.connectSocket({
      url: webSocketUrl,
    });
    wx.onSocketOpen(function (res) {
      that.log('connect');
      that.globalData.socketOpen = true
      for (var i = 0; i < that.globalData.socketMsgQueue.length; i++) {
        that.socket_sendMsg(that.globalData.socketMsgQueue[i], that.globalData.socketCallback)
      }
      that.globalData.socketMsgQueue = []
    })
    wx.onSocketClose(function (res) {
      that.globalData.socketOpen = false;
      that.log('WebSocket 已关闭！')
    })
    wx.onSocketError(function(res){
      console.log(res);
    })
  },
  socket_sendMsg: function (msg, cb) {
    var that = this;
    wx.showLoading({
      mask: true,
      title: '加载中...',
    })
    //console.log(that.globalData.socketOpen);
    if (that.globalData.socketOpen) {
      console.log(msg);
      var signStr = sign.init(msg);
      console.log(signStr);
      that.log(signStr);
      wx.sendSocketMessage({
        data: signStr,
        success: function (res) {
          that.log('send success: ' + JSON.stringify(res));
        },
        fail: function (res) {
          wx.hideLoading();
          that.log('send fail: ' + JSON.stringify(res));
          that.socket_sendMsg(msg, cb)
        }
      })
    } else {
      that.globalData.socketCallback = cb
      that.globalData.socketMsgQueue.push(msg)
      wx.closeSocket();
      that.socket_init()
    }
    wx.onSocketMessage(function (res) {
      wx.hideLoading();
      that.log('recive msg: ' + JSON.stringify(JSON.parse(res.data)))
      var data = JSON.parse(res.data);
      if (data.return_code == 'FAIL' && data.err_code == 'SYSTEMEFAIL')
      {
        that.showToast(data.return_msg, function(){
          wx.navigateBack()
        })
      }else{
        typeof cb == "function" && cb(data)
      }
    })
  }

})
