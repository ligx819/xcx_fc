//index.js
var util = require('../../../../utils/util.js');
//获取应用实例
var app = getApp();
var initText = '至少选择7个号码';
var tostCont = '';
Page({
  data: {
    // isAction: false,
    animationData: {},
    pointLeft: 0,
    pointTop: 0,
    clickAction: false,
    canAdd: true,
    canFinish:false,
    isShowSel: true,
    isShowBasket: false,
    isShowPoint: false,
    isShowMsg: false,
    activeItemIndex: -1,
    isShowTost: false,
    tostCont: tostCont,
    text: initText,
    jizhu: 0,
    balls: {
      redBalls: [
        { 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }, { 'isActive': false, 'ball': '21' }, { 'isActive': false, 'ball': '22' }, { 'isActive': false, 'ball': '23' }, { 'isActive': false, 'ball': '24' }, { 'isActive': false, 'ball': '25' }, { 'isActive': false, 'ball': '26' }, { 'isActive': false, 'ball': '27' }, { 'isActive': false, 'ball': '28' }, { 'isActive': false, 'ball': '29' }, { 'isActive': false, 'ball': '30' }
      ]
    },
    userInfo: {},
    options: null
  },
  getUrl: function(){
    //号码篮URL
    var options = this.data.options;
    var action = options.action ? options.action : '';
    var id = options.id ? options.id : 0;
    var url = '../basket/basket';
    if (action != '') {
      url += '?action=' + action + '&id=' + id;
    }
    return url;
  },
  //事件处理函数
  //点击号码篮
  goBasket: function (e) {
    var that = this;
    wx.removeStorage({
      key: 'editBalls',
      success: function (res) { },
    })
    wx.redirectTo({
        url: that.getUrl()
    })
  },

  //加入号码篮
  addBasket: function (e) {
    // app.log(e);
    var that = this;
    var activeType = e.currentTarget.dataset.type;
    var dt = that.data.balls;
    var jizhu = that.data.jizhu;
    var rb = dt.redBalls;
    var l1 = rb.length;
    var startLeft = e.detail.x;
    var startTop = e.detail.y;
    var redBalls = [];
    if (activeType === 'addBasket') {
      that.setData({
        isShowPoint: true,
        canFinish:true,
        pointLeft: startLeft + 'px',
        pointTop: startTop + 'px',
      })
    }
    for (let i = 0; i < l1; i++) {
      if (rb[i].isActive) redBalls.push(rb[i].ball);
    }
    var oneData = {
      red: redBalls,
      bet: jizhu
    };
    wx.createSelectorQuery().select('.basket').boundingClientRect(function (rect) {
      var endLeft = rect.left - startLeft;
      var endTop = rect.top - startTop;
      wx.getStorage({
        key: 'allBasketBalls',
        success: function (res) {
          var basketBalls = JSON.parse(res.data);
          wx.getStorage({
            key: 'editBalls',
            success: function (res) {
              let data = JSON.parse(res.data);
              let index = data.index;
              if (oneData.bet > 0) {
                basketBalls[index] = oneData;
                wx.setStorage({
                  key: 'allBasketBalls',
                  data: JSON.stringify(basketBalls),
                })
              }
              wx.removeStorage({
                key: 'editBalls',
                success: function (res) {
                  wx.redirectTo({
                	  url: that.getUrl()
                  })
                },
              })
            },
            fail: function (e) {
              var content = '';
              if (basketBalls.length != 0) {
                if (basketBalls.length >= 20) {
                  activeType === 'addBasket' ? content = '号码篮最多保存20条选号' : content = 'end';
                }
                if (content != '') {
                  if (activeType === 'addBasket') {
                    wx.showModal({
                      title: '提示',
                      confirmText: '确认',
                      confirmColor: '#f24242',
                      showCancel: false,
                      content: content,
                    });
                    that.setData({
                      isShowPoint: false
                    })
                  } else {
                    wx.redirectTo({
                    	url: that.getUrl()
                    })
                  }
                  return false;
                }
              }
              basketBalls.splice(0, 0, oneData);
              if (jizhu != 0) {
                wx.setStorage({
                  key: 'allBasketBalls',
                  data: JSON.stringify(basketBalls)
                })
                wx.setStorage({
                  key: 'oneData',
                  data: JSON.stringify(oneData),
                })
              }
              if (activeType === 'addBasket') {
                util.inAction(endLeft, endTop,that);
              } else {
                wx.redirectTo({
                	url: that.getUrl()
                })
              }
            }
          })
        },
        fail: function (e) {
          var data = [oneData];
          if (jizhu != 0) {
            wx.setStorage({
              key: 'allBasketBalls',
              data: JSON.stringify(data)
            })
          }
          if (activeType === 'addBasket') {
            util.inAction(endLeft, endTop,that);
          } else {
            wx.redirectTo({
            	url: that.getUrl()
            })
          }
        }
      });
    }).exec()
    // app.log(redBalls);
    // app.log(blueBalls);
  },
  selDraw: function (arr, bet, canAdd) {
    var that = this;
    var dt = that.data.balls;
    var rb = dt.redBalls;
    for (let i = 0; i < arr.length; i++) {
      let n = parseInt(arr[i]) - 1;
      rb[n].isActive = true;
    }
    that.setData({
      jizhu: bet,
      balls: dt,
      canAdd: canAdd
    })
  },
  //选号页面机选
  jiXuan: function () {
    var that = this;
    that.clearSel();
    var dt = that.data.balls;
    var rb = dt.redBalls;
    var jx_red = util.random_numbers(util.sbs, 7, false, true);
    wx.getStorage({
      key: 'editBalls',
      success: function (res) {
        that.selDraw(jx_red, 1, true);
      },
      fail: function (e) {
        that.selDraw(jx_red, 1, false);
      }
    })

  },
  //清空选号页面
  clearSel: function () {
    var that = this;
    var dt = that.data.balls;
    var rb = dt.redBalls;
    var l1 = rb.length;
    for (let i = 0; i < l1; i++) {
      rb[i].isActive = false;
    }
    that.setData({
      jizhu: 0,
      balls: dt,
      canAdd: true
    })
  },
  //计算注数
  getResult: function (index, ball) {
    var that = this;
    var dt = that.data.balls;
    var rb = dt.redBalls;
    var l1 = rb.length;
    var cr = 0, bet = 0;
    for (let i = 0; i < l1; i++) {
      if (rb[i].isActive) cr++;
    }
    if (cr >= 7) {
      bet = util.J(cr, 7);
      if (bet >= 10000) {
        tostCont = '所选注数不能超过10000注';
        ball === 'red' ? rb[index].isActive = false : '';
        that.setData({
          balls: dt,
          isShowTost: true,
          tostCont: tostCont
        })
        setTimeout(function(){
          that.setData({
            isShowTost: false,
            tostCont: ''
          })
        },1500)
        return false;
      }
      wx.getStorage({
        key: 'editBalls',
        success: function (res) {
          that.setData({
            jizhu: bet,
            canAdd: true
          })
        },
        fail: function (e) {
          that.setData({
            jizhu: bet,
            canAdd: false
          })
        }
      })
    } else {
      that.setData({
        jizhu: 0,
        canAdd: true
      })
    }
    return true;
  },
  //选择红球
  clickRedBall: function (e) {
    var that = this;
    that.data.balls.redBalls[e.currentTarget.dataset.index].isActive = !that.data.balls.redBalls[e.currentTarget.dataset.index].isActive;
    that.setData({
      balls: that.data.balls
    });
    // app.log(that.data.balls);
    that.getResult(e.currentTarget.dataset.index, 'red');
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
        options: options
      })
    var val = wx.getStorageSync('isClear');
    if (val === 'no') {
      wx.removeStorageSync('isClear');
    } else {
      try {
        wx.clearStorageSync();
      } catch (e) {
        // Do something when catch error
      }
    }
    wx.getStorage({
      key: 'editBalls',
      success: function (res) {
        var balls = JSON.parse(res.data);
        that.selDraw(balls.red, balls.bet, true);
        // app.log(balls);
      },
    })
    wx.setEnableDebug({
      enableDebug: true
    });
  }
})
