var QR = require('../../../../common/qrcode.js');
var home = require('../index/index.js');
//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({

  data: {
    imgPath: '../../../../images/',
    detail: null,
    position: 0,
    focus: false,
    editShow:true,
    showCont: 'normal',
    isShowTost: false,
    tostCont: '',
  },
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    app.log(options);
    
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'plan_detail';
      msg['act_byname'] = 'lottery_plan';
      msg['unionid'] = userInfo.unionid;
      msg['id'] = id;
      app.socket_sendMsg(msg, function (data) {
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          if (data.lists) {
            wx.setStorageSync('planDetail', data.lists);
            var dl = [data.lists];
            var dd = home.addPlanName(dl);
            that.setData({
              detail: dd[0]
            })
            QR.qrApi.draw(data.lists.rand_no, 'mycanvas', 300, 300)
          } else {
            app.showToast('出错了~~',function(){
              wx.navigateBack()
            });
          }
        } else {
          app.showToast('出错了~~', function () {
            wx.navigateBack()
          });
        }
      })
    });
  },
  //编辑常用投注单名称
  btnEditName: function (e) {
    var that = this;
    that.setData({
      focus: true,
      editShow: false
    })
  },
  //保存编辑后的方案名称
  btnSaveName: function (e) {
    var that = this;
    var dataset = e.currentTarget.dataset;
    //方案名称
    var title = e.detail.value;
    var detail = that.data.detail;
    if (title != undefined && title != '' && title != dataset.title) {
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'change_title';
        msg['act_byname'] = 'lottery_plan';
        msg['unionid'] = userInfo.unionid;
        msg['title'] = encodeURI(title);
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.return) {
              detail.title = title;
              app.showToast('修改成功');
              //获取页面栈
              var pages = getCurrentPages();
              if (pages.length > 1) {
                //上一个页面实例对象
                var prePage = pages[pages.length - 2];
                prePage.changeData(detail.id, detail);
              }
            } else {
              detail.title = dataset.title;
              app.showToast('修改失败');
            }
          } else {
            detail.title = dataset.title;
            app.showToast('出错了~~');
          }
          that.setData({
            detail: detail,
            focus: false,
            editShow: true
          })
        })
      });
    } else {
      detail.title = dataset.title;
      that.setData({
        detail: detail,
        focus: false,
        editShow: true
      })
    }
  },
  //扫码支付
  scanCode: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        app.log(res)
      }
    })
  },
  //点击二维码放大
  changZoom: function () {
    var that = this;
    that.setData({
      showCont: 'zoom'
    })
    QR.qrApi.draw(that.data.detail.rand_no, 'mycanvas1', 300, 300)
  },
  //点击正常
  changNormal: function () {
    var that = this;
    that.setData({
      showCont: 'normal'
    })
    QR.qrApi.draw(that.data.detail.rand_no, 'mycanvas', 300, 300)
  },
  // 保存为常用投注单
  btnSaveCy: function () {
    var that = this;
    var detail = this.data.detail;
    if (!that.data.isShowTost){
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'save_common_plan';
        msg['act_byname'] = 'lottery_plan';
        msg['unionid'] = userInfo.unionid;
        msg['id'] = detail.id;
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.return) {
              if (data.return >= 20) {
                that.setData({
                  isShowTost: true,
                  tostCont: '常用投注单最多保存20条，请先删除多余投注单'
                })
                setTimeout(function () {
                  that.setData({
                    isShowTost: false,
                    tostCont: ''
                  })
                }, 1500)
              } else {
                wx.redirectTo({
                  url: '/pages/lottery/plan/result/result?result=save_success&id=' + detail.id + '&change=1&type=1',
                })
              }
            } else {
              app.goto('/pages/lottery/plan/result/result?result=save_failed')
            }
          } else {
            app.showToast('出错了~~');
          }
        })
      });
      
    }
  },
  btnModify: function(){
    var detail = this.data.detail;
    wx.clearStorageSync()
    wx.setStorageSync('planDetail', detail);
    wx.redirectTo({
      url: '/pages/lottery/' + detail.game + '/basket/basket?action=modify&id=' + detail.id,
    })
  },
  btnCopy: function () {
    var detail = this.data.detail;
    wx.clearStorageSync()
    wx.setStorageSync('planDetail', detail);
    wx.redirectTo({
      url: '/pages/lottery/' + detail.game + '/basket/basket?action=copy&id=' + detail.id,
    })
  },
  btnDel: function () {
    var detail = this.data.detail;
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'del_plan';
      msg['act_byname'] = 'lottery_plan';
      msg['unionid'] = userInfo.unionid;
      msg['game'] = detail.game;
      msg['id'] = detail.id;
      app.socket_sendMsg(msg, function (data) {
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          if (data.return) {
            wx.getStorage({
              key: 'appData',
              success: function (res) {
                res.data.refresh = true;
                wx.setStorage({
                  key: 'appData',
                  data: res.data,
                })
              },
            })
            wx.redirectTo({
              url: '/pages/lottery/plan/result/result?result=del_success',
            })
          } else {
            wx.redirectTo({
              url: '/pages/lottery/plan/result/result?result=del_failed&id=' + detail.id,
            })
          }
        } else {
          app.showToast('出错了~~');
        }
      })
    });
  },
  btnGo: function (e) {
    app.btnGo(e);
  },
})