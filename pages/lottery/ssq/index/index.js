//index.js
var util = require('../../../../utils/util.js');
//获取应用实例
var app = getApp();
var initText = '至少选择6个红球，1个蓝球';
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
    text: initText,
    isShowTost: false,
    tostCont: tostCont,
    jizhu: 0,
    balls: {
      redBalls: [
        { 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }, { 'isActive': false, 'ball': '21' }, { 'isActive': false, 'ball': '22' }, { 'isActive': false, 'ball': '23' }, { 'isActive': false, 'ball': '24' }, { 'isActive': false, 'ball': '25' }, { 'isActive': false, 'ball': '26' }, { 'isActive': false, 'ball': '27' }, { 'isActive': false, 'ball': '28' }, { 'isActive': false, 'ball': '29' }, { 'isActive': false, 'ball': '30' }, { 'isActive': false, 'ball': '31' }, { 'isActive': false, 'ball': '32' }, { 'isActive': false, 'ball': '33' }
      ],
      blueBalls: [
        { 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }
      ]
    },
    userInfo: {},
    options: null
  },
  getUrl: function () {
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
    var bb = dt.blueBalls;
    var l1 = rb.length;
    var l2 = bb.length;
    var startLeft = e.detail.x;
    var startTop = e.detail.y;
    var redBalls = [], blueBalls = [];
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
    for (let j = 0; j < l2; j++) {
      if (bb[j].isActive) blueBalls.push(bb[j].ball);
    }
    var oneData = {
      red: redBalls,
      blue: blueBalls,
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
  selDraw: function (arr, brr, bet, canAdd) {
    var that = this;
    var dt = that.data.balls;
    var rb = dt.redBalls;
    var bb = dt.blueBalls;
    for (let i = 0; i < arr.length; i++) {
      let n = parseInt(arr[i]) - 1;
      rb[n].isActive = true;
    }
    for (let j = 0; j < brr.length; j++) {
      let n = parseInt(brr[j]) - 1;
      bb[n].isActive = true;
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
    var bb = dt.blueBalls;
    var jx_red = util.random_numbers(util.rbs, 6, false, true);
    var jx_blue = util.random_numbers(util.bbs, 1, false, true);
    wx.getStorage({
      key: 'editBalls',
      success: function (res) {
        that.selDraw(jx_red, jx_blue, 1, true);
      },
      fail: function (e) {
        that.selDraw(jx_red, jx_blue, 1, false);
      }
    })

  },
  //清空选号页面
  clearSel: function () {
    var that = this;
    var dt = that.data.balls;
    var rb = dt.redBalls;
    var bb = dt.blueBalls;
    var l1 = rb.length;
    var l2 = bb.length;
    for (let i = 0; i < l1; i++) {
      rb[i].isActive = false;
    }
    for (let j = 0; j < l2; j++) {
      bb[j].isActive = false;
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
    var bb = dt.blueBalls;
    var l1 = rb.length;
    var l2 = bb.length;
    var cr = 0, cb = 0, bet = 0;
    for (let i = 0; i < l1; i++) {
      if (rb[i].isActive) cr++;
    }
    for (let j = 0; j < l2; j++) {
      if (bb[j].isActive) cb++;
    }
    if (cr >= 6 && cb >= 1) {
      var num = 1;
      for (let i = cr; i > cr - 6; i--) {
        num = num * i;
      }
      bet = num / (6 * 5 * 4 * 3 * 2 * 1) * cb;
      if (bet >= 10000) {
        tostCont = '所选注数不能超过10000注';
        ball === 'red' ? rb[index].isActive = false : bb[index].isActive = false;
        that.setData({
          balls: dt,
          isShowTost: true,
          tostCont: tostCont
        })
        setTimeout(function () {
          that.setData({
            isShowTost: false,
            tostCont: ''
          })
        }, 1500)
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
  //选择蓝球
  clickBlueBall: function (e) {
    var that = this;
    that.data.balls.blueBalls[e.currentTarget.dataset.index].isActive = !that.data.balls.blueBalls[e.currentTarget.dataset.index].isActive;
    that.setData({
      balls: that.data.balls
    });
    that.getResult(e.currentTarget.dataset.index, 'blue');
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
        that.selDraw(balls.red, balls.blue, balls.bet, true);
      },
    })
  }
})
