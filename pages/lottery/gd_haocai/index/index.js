
var util = require('../../../../utils/util.js');
var tostCont = '';
var ca = true;

var pageData = {

  /**
   * 页面的初始数据
   */
  data: {
    jizhu: 0,
    canAdd: true,
    canFinish:false,
    tagHidden: true,
    isShowPoint: false,
    isShowMsg: false,
    animationData: {},
    pointLeft: 0,
    pointTop: 0,
    userInfo: {},
    options: null,
    isShowTost: false,
    tostCont: tostCont,
    showData: { id: 'num', count: 1, name: '数字', hint: '至少选择1个数字', isShow: true, fsBalls: [{ 'idx': 0, 'isActive': false, 'ball': '1' }, { 'idx': 1, 'isActive': false, 'ball': '2' }, { 'idx': 2, 'isActive': false, 'ball': '3' }, { 'idx': 3, 'isActive': false, 'ball': '4' }, { 'idx': 4, 'isActive': false, 'ball': '5' }, { 'idx': 5, 'isActive': false, 'ball': '6' }, { 'idx': 6, 'isActive': false, 'ball': '7' }, { 'idx': 7, 'isActive': false, 'ball': '8' }, { 'idx': 8, 'isActive': false, 'ball': '9' }, { 'idx': 9, 'isActive': false, 'ball': '10' }, { 'idx': 10, 'isActive': false, 'ball': '11' }, { 'idx': 11, 'isActive': false, 'ball': '12' }, { 'idx': 12, 'isActive': false, 'ball': '13' }, { 'idx': 13, 'isActive': false, 'ball': '14' }, { 'idx': 14, 'isActive': false, 'ball': '15' }, { 'idx': 15, 'isActive': false, 'ball': '16' }, { 'idx': 16, 'isActive': false, 'ball': '17' }, { 'idx': 17, 'isActive': false, 'ball': '18' }, { 'idx': 18, 'isActive': false, 'ball': '19' }, { 'idx': 19, 'isActive': false, 'ball': '20' }, { 'idx': 20, 'isActive': false, 'ball': '21' }, { 'idx': 21, 'isActive': false, 'ball': '22' }, { 'idx': 22, 'isActive': false, 'ball': '23' }, { 'idx': 23, 'isActive': false, 'ball': '24' }, { 'idx': 24, 'isActive': false, 'ball': '25' }, { 'idx': 25, 'isActive': false, 'ball': '26' }, { 'idx': 26, 'isActive': false, 'ball': '27' }, { 'idx': 27, 'isActive': false, 'ball': '28' }, { 'idx': 28, 'isActive': false, 'ball': '29' }, { 'idx': 29, 'isActive': false, 'ball': '30' }, { 'idx': 30, 'isActive': false, 'ball': '31' }, { 'idx': 31, 'isActive': false, 'ball': '32' }, { 'idx': 32, 'isActive': false, 'ball': '33' }, { 'idx': 33, 'isActive': false, 'ball': '34' }, { 'idx': 34, 'isActive': false, 'ball': '35' }, { 'idx': 35, 'isActive': false, 'ball': '36' }] },
    listData: {
      num: { id: 'num', count: 1, name: '数字', hint: '至少选择1个数字', isShow: true, fsBalls: [{ 'idx': 0, 'isActive': false, 'ball': '1' }, { 'idx': 1, 'isActive': false, 'ball': '2' }, { 'idx': 2, 'isActive': false, 'ball': '3' }, { 'idx': 3, 'isActive': false, 'ball': '4' }, { 'idx': 4, 'isActive': false, 'ball': '5' }, { 'idx': 5, 'isActive': false, 'ball': '6' }, { 'idx': 6, 'isActive': false, 'ball': '7' }, { 'idx': 7, 'isActive': false, 'ball': '8' }, { 'idx': 8, 'isActive': false, 'ball': '9' }, { 'idx': 9, 'isActive': false, 'ball': '10' }, { 'idx': 10, 'isActive': false, 'ball': '11' }, { 'idx': 11, 'isActive': false, 'ball': '12' }, { 'idx': 12, 'isActive': false, 'ball': '13' }, { 'idx': 13, 'isActive': false, 'ball': '14' }, { 'idx': 14, 'isActive': false, 'ball': '15' }, { 'idx': 15, 'isActive': false, 'ball': '16' }, { 'idx': 16, 'isActive': false, 'ball': '17' }, { 'idx': 17, 'isActive': false, 'ball': '18' }, { 'idx': 18, 'isActive': false, 'ball': '19' }, { 'idx': 19, 'isActive': false, 'ball': '20' }, { 'idx': 20, 'isActive': false, 'ball': '21' }, { 'idx': 21, 'isActive': false, 'ball': '22' }, { 'idx': 22, 'isActive': false, 'ball': '23' }, { 'idx': 23, 'isActive': false, 'ball': '24' }, { 'idx': 24, 'isActive': false, 'ball': '25' }, { 'idx': 25, 'isActive': false, 'ball': '26' }, { 'idx': 26, 'isActive': false, 'ball': '27' }, { 'idx': 27, 'isActive': false, 'ball': '28' }, { 'idx': 28, 'isActive': false, 'ball': '29' }, { 'idx': 29, 'isActive': false, 'ball': '30' }, { 'idx': 30, 'isActive': false, 'ball': '31' }, { 'idx': 31, 'isActive': false, 'ball': '32' }, { 'idx': 32, 'isActive': false, 'ball': '33' }, { 'idx': 33, 'isActive': false, 'ball': '34' }, { 'idx': 34, 'isActive': false, 'ball': '35' }, { 'idx': 35, 'isActive': false, 'ball': '36' }] },
      sx: { id: 'sx', count: 1, name: '生肖', hint: '至少选择1个生肖', isShow: false, fsBalls: [{ 'idx': 0, 'isActive': false, 'ball': '鼠', 'mz': '01,13,25' }, { 'idx': 1, 'isActive': false, 'ball': '牛', 'mz': '02,14,26' }, { 'idx': 2, 'isActive': false, 'ball': '虎', 'mz': '03,15,27' }, { 'idx': 3, 'isActive': false, 'ball': '兔', 'mz': '04,16,28' }, { 'idx': 4, 'isActive': false, 'ball': '龙', 'mz': '05,17,29' }, { 'idx': 5, 'isActive': false, 'ball': '蛇', 'mz': '06,18,30' }, { 'idx': 6, 'isActive': false, 'ball': '马', 'mz': '07,19,31' }, { 'idx': 7, 'isActive': false, 'ball': '羊', 'mz': '08,20,32' }, { 'idx': 8, 'isActive': false, 'ball': '猴', 'mz': '09,21,33' }, { 'idx': 9, 'isActive': false, 'ball': '鸡', 'mz': '10,22,34' }, { 'idx': 10, 'isActive': false, 'ball': '狗', 'mz': '11,23,35' }, { 'idx': 11, 'isActive': false, 'ball': '猪', 'mz': '12,24,36' }] },
      sj: { id: 'sj', count: 1, name: '四季', hint: '至少选择1个季节', isShow: false, fsBalls: [{ 'idx': 0, 'isActive': false, 'ball': '春', 'mz': '01 -- 09' }, { 'idx': 1, 'isActive': false, 'ball': '夏', 'mz': '10 -- 18' }, { 'idx': 2, 'isActive': false, 'ball': '秋', 'mz': '19 -- 27' }, { 'idx': 3, 'isActive': false, 'ball': '冬', 'mz': '28 -- 36' }] },
      fw: { id: 'fw', count: 1, name: '方位', hint: '至少选择1个方位', isShow: false, fsBalls: [{ 'idx': 0, 'isActive': false, 'ball': '东', 'mz': '01,03,05\n07,09,11\n13,15,17' }, { 'idx': 1, 'isActive': false, 'ball': '南', 'mz': '02,04,06\n08,10,12\n14,16,18' }, { 'idx': 2, 'isActive': false, 'ball': '西', 'mz': '19,21,23\n25,27,29\n31,33,35' }, { 'idx': 3, 'isActive': false, 'ball': '北', 'mz': '20,22,24\n26,28,30\n32,34,36' }] }
    }
  },
  checkWay: function (tp) {
    var tt = Number(tp);
    if (!isNaN(tt)) {
      tp = parseInt(tp);
      switch (tp) {
        case 1:
          return 'num';
        case 2:
          return 'sx';
        case 3:
          return 'sj';
        case 4:
          return 'fw';
      }
    } else {
      switch (tp) {
        case 'num':
          return 1;
        case 'sx':
          return 2;
        case 'sj':
          return 3;
        case 'fw':
          return 4;
      }
    }
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
    wx.setStorage({
      key: 'nowSelData',
      data: this.data.showData,
    });
    return url;
  },
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
    var st = that.data.showData, dt;
    var balls = [], str = '';
    var dt = st.fsBalls;
    for (let i = 0, l = dt.length; i < l; i++) {
      if (dt[i].isActive) balls.push(dt[i].ball);
    }
    str = balls.join(',');
    var jizhu = that.data.jizhu;
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
    var oneData = {
      red: str,
      type: st.id,
      name: st.name,
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
  // 计算注数
  countBetNum: function () {
    var that = this;
    var st = that.data.showData;
    var result = 0;
    st.fsBalls.forEach(function (t) {
      if (t.isActive) result++;
    });
    return result;
  },
  // 点击选择球
  clickRedBall: function (e) {
    var that = this;
    var i = e.currentTarget.dataset.index;
    var st = that.data.showData;
    var bb = st.fsBalls;
    bb[i].isActive = !bb[i].isActive;
    that.setData({
      showData: st
    });
    var jz = that.countBetNum();
    if (jz > 10000) {
      bb[i].isActive = false;
      tostCont = '所选注数不能超过10000注';
      that.setData({
        showData: st,
        tostCont: tostCont,
        isShowTost: true
      });
      setTimeout(function () {
        that.setData({
          isShowTost: false,
        });
      }, 1200)
    } else {
      that.setData({
        jizhu: jz,
        canAdd: jz > 0 && ca ? false : true
      })
    }
  },
  // 选号页机选
  jiXuan: function () {
    var that = this;
    var st = that.data.showData;
    var fb = st.fsBalls;
    fb.forEach(function (t) {
      t.isActive = false;
    });
    var arr = util.random_numbers(fb, st.count, false, true);
    arr.forEach(function (t1) {
      var j = parseInt(t1.idx);
      fb[j].isActive = true;
    })
    that.setData({
      showData: st
    });
    var jz = that.countBetNum();
    that.setData({
      jizhu: jz,
      canAdd: jz > 0 && ca ? false : true
    })
  },
  //清空选号页面
  clearSel: function () {
    var that = this;
    var st = that.data.showData;
    var fb = st.fsBalls;
    fb.forEach(function (t) {
      t.isActive = false;
    });
    that.setData({
      jizhu: 0,
      showData: st,
      canAdd: true
    })
  },
  // 下拉选择框显示切换
  toggleTag: function (e) {
    this.setData({
      tagHidden: !this.data.tagHidden
    })
  },
  // 顶部投注方式切换
  selType: function (e) {
    var that = this;
    var dt = that.data.listData;
    var tp = e.currentTarget.dataset.type;
    for (let i in dt) {
      i === tp ? dt[i].isShow = true : dt[i].isShow = false;
    }
    that.setData({
      showData: dt[tp],
      listData: dt,
      jizhu: 0,
      canAdd: true
    })
    that.toggleTag();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ca = true;
    var that = this;
    var lt = that.data.listData;
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

      }
    }
    // wx.setStorage({
    //   key: 'initialData',
    //   data: JSON.stringify(that.data.balls),
    // })
    wx.getStorage({
      key: 'editBalls',
      success: function (res) {
        var balls = JSON.parse(res.data);
        var st = lt[balls.type];
        var arr = balls.red.split(',');
        var fb = st.fsBalls;
        for (let i in lt) {
          i === balls.type ? lt[i].isShow = true : lt[i].isShow = false;
        }
        for (let i = 0, l = arr.length; i < l; i++) {
          for (let j = 0, l1 = fb.length; j < l1; j++) {
            if (fb[j].ball == arr[i]) {
              fb[j].isActive = true;
              break;
            }
          }
        }
        ca = false;
        that.setData({
          showData: st,
          listData: lt,
          jizhu: balls.bet,
          canAdd: true
        })
      },
    })
  }
}

Page(pageData);

module.exports = {
  listData: pageData.data.listData,
  checkWay: pageData.checkWay
}