//获取应用实例
var app = getApp();
var app_data = app.globalData;

var util = require('../../../../utils/util.js');
var home = require('../index/index.js');
var day = new Date();
var tostCont = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planBei: 1,
    planQs:1,
    planName: '我的投注单' + day.getFullYear() + ((day.getMonth() + 1) < 10 ? "0" : "") + (day.getMonth() + 1) + (day.getDate() < 10 ? "0" : "") + day.getDate(),
    basketBalls: [],
    isShowNull: true,
    isShowTost: false,
    tostCont: tostCont,
    bjz: 0,
    actionName: '生成投注单',
    options: null
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      options: options
    })
    if (options.action == 'modify') {
      that.setData({
        actionName: '修改投注单'
      })
    }
    var bjz = parseInt(that.data.bjz);
    var planDetail = wx.getStorageSync('planDetail')
    var allBasketBalls = wx.getStorageSync('allBasketBalls');
    allBasketBalls = allBasketBalls ? JSON.parse(allBasketBalls) : [];
    if (planDetail) {
      if (planDetail.lists.length > 0) {
        if (allBasketBalls.length == 0 || (allBasketBalls.length > 0 && allBasketBalls != planDetail.lists)) {
          planDetail.lists.forEach(function (e) { 
            var tp = home.checkWay(e['play_id']);
            var lt = home.listData;
            var nm = lt[tp].name;
            var ball = {
              red: e['red_ball'],
              bet: e['bet'],
              type: tp,
              name: nm
            };
            if (tp === 'Q2' || tp === 'Q3'){
              e['bet_mode'] == 1 ? ball.typeTwo = 'ds' : ball.typeTwo = 'fs';
            }
            allBasketBalls.push(ball);
          })
          app.log(allBasketBalls);
          planDetail.lists = []
          wx.setStorageSync('planDetail', planDetail)
          wx.setStorageSync('allBasketBalls', JSON.stringify(allBasketBalls));
        }
      }
      that.setData({
        planBei: planDetail.bets_multiple,
        planQs: planDetail.bets_term,
        planName: planDetail.title
      })
    }
    if (allBasketBalls.length == 0) {
      that.setData({
        basketBalls: allBasketBalls,
        isShowNull: true
      });
    } else {
      allBasketBalls.forEach(function (ele) {
        ele.cHeight = '';
        bjz += parseInt(ele.bet);
      })
      that.setData({
        basketBalls: allBasketBalls,
        isShowNull: false,
        bjz: bjz
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var basketBalls = that.data.basketBalls;
    wx.createSelectorQuery().selectAll('.group .col_ball').boundingClientRect(function (rects) {
      for (let i = 0, l = rects.length; i < l; i++) {
        var h = rects[i].height;
        // app.log(h);
        if (h < 25) {
          basketBalls[i].cHeight = '';
        } else if (h > 30 && h < 45) {
          basketBalls[i].cHeight = 'h1';
        } else {
          basketBalls[i].cHeight = 'h2';
        }
      }
      that.setData({
        basketBalls: basketBalls
      })
    }).exec()
  },
  goSelect: function (e) {
    var options = this.data.options;
    var action = options.action ? options.action : '';
    var id = options.id ? options.id : 0;
    var url = '../index/index';
    if (action != '') {
      url += '?action=' + action + '&id=' + id;
    }
    wx.setStorageSync('isClear', 'no');
    app.log(url);
    app.goto(url)
  },
  //点击号码篮记录重新编辑
  reEdit: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var basketBalls = that.data.basketBalls;
    var balls = basketBalls[index];
    balls.index = index;
    wx.setStorageSync('isClear', 'no');
    wx.setStorage({
      key: 'editBalls',
      data: JSON.stringify(balls),
    })
    that.goSelect();
  },
  //点击删除号码篮单条记录
  removeOne: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var basketBalls = that.data.basketBalls;
    var bjz = parseInt(that.data.bjz);
    bjz = bjz - basketBalls[index].bet;
    wx.getStorage({
      key: 'allBasketBalls',
      success: function (res) {
        var allBasketBalls = JSON.parse(res.data);
        var bbs = util.arrayDel(basketBalls, index);
        var abs = util.arrayDel(allBasketBalls, index);
        if (bbs.length == 0) {
          that.setData({
            basketBalls: bbs,
            bjz: bjz,
            isShowNull: true
          });
        } else {
          that.setData({
            basketBalls: bbs,
            bjz: bjz
          });
        }
        wx.setStorage({
          key: 'allBasketBalls',
          data: JSON.stringify(abs)
        })
      },
    })
  },
  //号码蓝机选
  randomNum: function (e) {
    var that = this;
    var basketBalls = that.data.basketBalls;
    var rand = parseInt(e.currentTarget.dataset.rand);
    var bjz = parseInt(that.data.bjz);
    var st = wx.getStorageSync('nowSelData') || home.listData.Q1, fs = false;
    if (st.id == 'Q2' || st.id == 'Q3') {
      if (st.fsShow) fs = true;
    }
    var content = '';
    if (basketBalls.length + rand > 20) {
      content = '号码篮最多保存20条选号';
      wx.showModal({
        title: '提示',
        confirmText: '确认',
        confirmColor: '#f24242',
        showCancel: false,
        content: content,
      });
      rand = 20 - basketBalls.length;
    }
    for (let i = 0; i < rand; i++) {
      var jx_red = [], name = '', jizhu = 1, str = '';
      if ((st.id == 'Q2' && st.dsShow) || (st.id == 'Q3' && st.dsShow)) {
        var db = st.dsBalls;
        var arr = util.random_numbers(db[0], db.length, false, true);
        arr.forEach(function (t1) {
          jx_red.push(t1.ball);
        });
        str = jx_red.sort().join(' | ');
      } else {
        var fb = st.fsBalls;
        var arr = util.random_numbers(fb, st.count, false, true);
        arr.forEach(function (t1) {
          jx_red.push(t1.ball);
        });
        str = jx_red.join(',');
      }
      if (st.id == 'Q2' && st.fsShow) jizhu = 6;
      if (st.id == 'Q3' && st.fsShow) jizhu = 24;
      var one = {
        red: str,
        type: st.id,
        name: st.name,
        bet: jizhu
      };
      if (st.id == 'Q2' || st.id == 'Q3') {
        st.fsShow ? one.typeTwo = 'fs' : one.typeTwo = 'ds';
      }
      basketBalls.splice(0, 0, one);
      bjz += jizhu;
    }
    that.setData({
      basketBalls: basketBalls,
      isShowNull: false,
      bjz: bjz
    });
    wx.setStorage({
      key: 'allBasketBalls',
      data: JSON.stringify(basketBalls),
    })
  },
  //清空号码篮列表
  emptyList: function () {
    var that = this;
    var basketBalls = that.data.basketBalls;
    if (basketBalls.length != 0) {
      wx.showModal({
        title: '提示',
        confirmText: '确认',
        confirmColor: '#f24242',
        content: '是否确认清空号码篮？',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync('allBasketBalls');
            wx.removeStorage({
              key: 'oneData',
              success: function (res) {
                that.setData({
                  basketBalls: [],
                  isShowNull: true,
                  bjz: 0
                })
                app.log(res.data);
              },
            })
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  //获得投注单名称
  whatName: function (e) {
    this.setData({
      planName: e.detail.value
    })
  },
  //获得投注单倍数
  whatBei: function (e) {
    this.setData({
      planBei: e.detail.value
    })
  },
  // 获得投注单追加期数
  whatQs:function(e){
    this.setData({
      planQs: e.detail.value
    })
  },
  //生成投注单
  btnSavePlan: function (e) {
    var that = this;
    var options = that.data.options;
    var part = /^[0-9]*$/gi;
    var planBalls = that.data.basketBalls;
    var flag = true;
    var n = that.data.bjz;
    var planName = that.data.planName;
    var planQs = that.data.planQs;
    if (planName.length < 1 || planName.length > 20) {
      tostCont = '方案名称长度为1-20位哦';
      that.setData({
        isShowTost: true,
        tostCont: tostCont
      })
      flag = false;
    } else {
      var planBei = that.data.planBei;
      if (planBei > 99 || planBei < 1 || !part.test(planBei)) {
        tostCont = '倍数范围为1-99倍哦';
        that.setData({
          isShowTost: true,
          tostCont: tostCont
        })
        flag = false;
      } else {
        if (n > 10000) {
          tostCont = '投注注数不能超过10000注哦';
          that.setData({
            isShowTost: true,
            tostCont: tostCont
          })
          flag = false;
        } else {
          if (planBei * n * 2 > 20000) {
            tostCont = '投注金额不能超过20000元哦';
            planBei = Math.floor(10000 / n);
            that.setData({
              isShowTost: true,
              tostCont: tostCont,
              planBei: planBei
            })
            flag = false;
          }
        }
      }
    }
    if (flag) {
      var dataset = e.currentTarget.dataset;
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'save_plan';
        msg['act_byname'] = 'lottery_plan';
        msg['game'] = 'gd_klsf';
        msg['unionid'] = userInfo.unionid;
        msg['openid'] = userInfo.openid;
        msg['id'] = options.action == 'modify' ? options.id : null;
        msg['title'] = encodeURI(that.data.planName);
        msg['bets_multiple'] = that.data.planBei;
        msg['bets_term'] = that.data.planQs;
        msg['lists'] = that.data.basketBalls;
        // var bb = that.data.basketBalls;
        // for(let i = 0;i < bb.length;i++){
        //   bb[i].type = home.checkWay(bb[i].type);
        // }
        // msg['lists'] = bb;
        app.log(msg);
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.return) {
              if (data.return.code == 'error') {
                that.setData({
                  isShowTost: true,
                  tostCont: data.return.info
                })
              } else {
                app.log(data.return);
                var url = '';
                if (dataset.id != undefined) {
                  url = '/pages/lottery/plan/result/result?result=save_success&id=' + data.return.id + '&type=' + data.return.type;
                } else {
                  url = '/pages/lottery/plan/detail/detail?id=' + data.return.id;
                }
                wx.redirectTo({
                  url: url
                })
              }
            } else {
              app.showToast('出错了~~');
            }
          } else {
            app.showToast('出错了~~');
          }
        })
      });
    }
    setTimeout(function () {
      that.setData({
        isShowTost: false,
        tostCont: ''
      })
    }, 1500)
  },
})