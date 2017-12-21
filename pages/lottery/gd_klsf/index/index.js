
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
    showData: { id: 'Q1', count: 1, name: '选一数投', hint: '任选1个号码', isShow: true, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }] },
    listData: {
      Q1: { id: 'Q1', count: 1, name: '选一数投', hint: '任选1个号码', isShow: true, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }] },
      R1: { id: 'R1', count: 2, name: '选一红投', hint: '任选1个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      R2: { id: 'R2', count: 2, name: '选二任选', hint: '任选2个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      Z2: { id: 'Z2', count: 2, name: '选二连组', hint: '任选2个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      Q2: { id: 'Q2', count: 3, name: '选二连直', hint: '每位选择1个号码', fsHint: '至少选择3个号码', isShow: false, dsShow: true, fsShow: false, dsBalls: [[{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }], [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }]], fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      R3: { id: 'R3', count: 3, name: '选三任选', hint: '任选3个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      Z3: { id: 'Z3', count: 3, name: '选三前组', hint: '任选3个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      Q3: { id: 'Q3', count: 4, name: '选三前直', hint: '每位选择1个号码', fsHint: '至少选择4个号码', isShow: false, dsShow: true, fsShow: false, dsBalls: [[{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }], [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }], [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }]], fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      R4: { id: 'R4', count: 4, name: '选四任选', hint: '任选4个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
      R5: { id: 'R5', count: 5, name: '选五任选', hint: '任选5个号码', isShow: false, fsBalls: [{ 'isActive': false, 'ball': '01' }, { 'isActive': false, 'ball': '02' }, { 'isActive': false, 'ball': '03' }, { 'isActive': false, 'ball': '04' }, { 'isActive': false, 'ball': '05' }, { 'isActive': false, 'ball': '06' }, { 'isActive': false, 'ball': '07' }, { 'isActive': false, 'ball': '08' }, { 'isActive': false, 'ball': '09' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }] },
    }
  },
  checkWay: function (tp) {
    var tt = Number(tp);
    if (!isNaN(tt)) {
      tp = parseInt(tp);
      switch (tp) {
        case 1:
          return 'Q1';
        case 2:
          return 'R1';
        case 3:
          return 'R2';
        case 4:
          return 'Q2';
        case 5:
          return 'Z2';
        case 6:
          return 'R3';
        case 7:
          return 'Q3';
        case 8:
          return 'Z3';
        case 9:
          return 'R4';
        case 10:
          return 'R5';
      }
    } else {
      switch (tp) {
        case 'Q1':
          return 1;
        case 'R1':
          return 2;
        case 'R2':
          return 3;
        case 'Q2':
          return 4;
        case 'Z2':
          return 5;
        case 'R3':
          return 6;
        case 'Q3':
          return 7;
        case 'Z3':
          return 8;
        case 'R4':
          return 9;
        case 'R5':
          return 10;
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
    if ((st.id == 'Q2' && st.dsShow) || (st.id == 'Q3' && st.dsShow)) {
      var dt = st.dsBalls;
      for (let i = 0; i < dt.length; i++) {
        var tt = dt[i], rbs = [];
        for (let j = 0, l = tt.length; j < l; j++) {
          if (tt[j].isActive) rbs.push(tt[j].ball);
        }
        balls.push(rbs.join(','));
      }
      str = balls.join(' | ');
    } else {
      var dt = st.fsBalls;
      for (let i = 0, l = dt.length; i < l; i++) {
        if (dt[i].isActive) balls.push(dt[i].ball);
      }
      str = balls.join(',');
    }
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
    if (st.id == 'Q2' || st.id == 'Q3') {
      st.fsShow ? oneData.typeTwo = 'fs' : oneData.typeTwo = 'ds';
    }
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
  // 获取用户选择的数据
  getSelData: function () {
    var that = this;
    var st = that.data.showData;
    var arr = [];
    switch (st.id) {
      case 'Q2':
      case 'Q3':
        if (st.dsShow) {
          var db = st.dsBalls;
          for (let i = 0; i < db.length; i++) {
            var brr = [];
            for (let j = 0, l = db[i].length; j < l; j++) {
              if (db[i][j].isActive) brr.push(db[i][j].ball);
            }
            arr.push(brr);
          }
        } else {
          var fb = st.fsBalls;
          fb.forEach(function (t) {
            if (t.isActive) arr.push(t.ball);
          })
        }
        break;
      default:
        var fb = st.fsBalls;
        fb.forEach(function (t) {
          if (t.isActive) arr.push(t.ball);
        })
        break;
    }
    return arr;
  },
  // 计算注数
  countBetNum: function (arr) {
    arr ? arr = arr : arr = [];
    var result = 0;
    var that = this;
    var st = that.data.showData;
    switch (st.id) {
      case 'Q1':
        result = arr.length;
        break;
      case 'R1':
        arr.length > 0 ? result = 1 : result = 0;
        break;
      case 'R2':
        result = util.comb(arr.length, 2);
        break;
      case 'Z2':
        result = util.comb(arr.length, 2);
        break;
      case 'Q2':
        var tp;
        st.dsShow ? tp = 'd' : tp = 'f';
        if (tp === 'd') {
          result = arr[0].length * arr[1].length;
          for (var i = 0; i < arr[0].length; i++) {
            for (var j = 0; j < arr[1].length; j++) {
              var a = arr[0][i];
              var b = arr[1][j];
              if (a == b) {
                result--;
              }
            }
          }
        } else {
          arr.length < 3 ? result = 0 : result = util.P(arr.length, 2);
        }
        break;
      case 'R3':
        result = util.comb(arr.length, 3);
        break;
      case 'Z3':
        result = util.comb(arr.length, 3);
        break;
      case 'Q3':
        var tp;
        st.dsShow ? tp = 'd' : tp = 'f';
        if (tp === 'd') {
          result = arr[0].length * arr[1].length * arr[2].length;
          for (var i = 0; i < arr[0].length; i++) {
            for (var j = 0; j < arr[1].length; j++) {
              for (var k = 0; k < arr[2].length; k++) {
                var a = arr[0][i];
                var b = arr[1][j];
                var c = arr[2][k];
                if (a == b || a == c || b == c) {
                  result--;
                }
              }
            }
          }
        } else {
          arr.length < 4 ? result = 0 : result = util.P(arr.length, 3);
        }
        break;
      case 'R4':
        result = util.comb(arr.length, 4);
        break;
      case 'R5':
        result = util.comb(arr.length, 5);
        break;
      default:
        break;
    }
    return result;
  },
  // 点击选择球
  clickRedBall: function (e) {
    var that = this;
    var i = e.currentTarget.dataset.index;
    var st = that.data.showData;
    var bb = st.fsBalls;
    switch (st.id) {
      case 'Q2':
      case 'Q3':
        if (st.dsShow) {
          var db = st.dsBalls;
          var pi = e.currentTarget.dataset.pindex;
          db[pi].forEach(function (t, s) {
            s == i ? db[pi][s].isActive = !db[pi][i].isActive : db[pi][s].isActive = false;
          })
        } else {
          bb[i].isActive = !bb[i].isActive;
        }
        break;
      case 'R1':
        bb.forEach(function (t) {
          t.isActive = !t.isActive;
        });
        break;
      default:
        bb[i].isActive = !bb[i].isActive;
        break;
    }
    that.setData({
      showData: st
    });
    var jz = that.countBetNum(that.getSelData());
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
    switch (st.id) {
      case 'Q2':
      case 'Q3':
        if (st.dsShow) {
          var db = st.dsBalls;
          for (let i = 0; i < db.length; i++) {
            db[i].forEach(function (t) {
              t.isActive = false;
            });
            var arr = util.random_numbers(db[i], 1, false, true);
            arr.forEach(function (t1) {
              var j = parseInt(t1.ball) - 1;
              db[i][j].isActive = true;
            })
          }
        } else {
          var fb = st.fsBalls;
          fb.forEach(function (t) {
            t.isActive = false;
          });
          var arr = util.random_numbers(fb, st.count, false, true);
          arr.forEach(function (t1) {
            var j = parseInt(t1.ball) - 1;
            fb[j].isActive = true;
          })
        }
        break;
      default:
        var fb = st.fsBalls;
        fb.forEach(function (t) {
          t.isActive = false;
        });
        var arr = util.random_numbers(fb, st.count, false, true);
        if (st.id == 'R1') {
          arr = [{ isActive: false, ball: "01" }, { isActive: false, ball: "02" }];
        }
        arr.forEach(function (t1) {
          var j = parseInt(t1.ball) - 1;
          fb[j].isActive = true;
        })
        break;
    }
    that.setData({
      showData: st
    });
    var jz = that.countBetNum(that.getSelData());
    that.setData({
      jizhu: jz,
      canAdd: jz > 0 && ca ? false : true
    })
  },
  //清空选号页面
  clearSel: function () {
    var that = this;
    var st = that.data.showData;
    switch (st.id) {
      case 'Q2':
      case 'Q3':
        if (st.dsShow) {
          var db = st.dsBalls;
          for (let i = 0; i < db.length; i++) {
            db[i].forEach(function (t) {
              t.isActive = false;
            });
          }
        } else {
          var fb = st.fsBalls;
          fb.forEach(function (t) {
            t.isActive = false;
          });
        }
        break;
      default:
        var fb = st.fsBalls;
        fb.forEach(function (t) {
          t.isActive = false;
        });
        break;
    }
    that.setData({
      jizhu: 0,
      showData: st,
      canAdd: true
    })
  },
  // 选二连直、选三前直单复式切换
  selSingle: function (e) {
    var that = this;
    var dt = that.data.listData;
    var st = that.data.showData;
    var pt = e.currentTarget.dataset.parent;
    var tp = e.currentTarget.dataset.tp;
    switch (tp) {
      case 'd':
        dt[pt].dsShow = true;
        dt[pt].fsShow = false;
        break;
      case 'f':
        dt[pt].dsShow = false;
        dt[pt].fsShow = true;
        break;
    }
    st = dt[pt];
    that.setData({
      showData: st,
      listData: dt
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
        for (let i in lt) {
          i === balls.type ? lt[i].isShow = true : lt[i].isShow = false;
        }
        if (balls.type == 'Q2' || balls.type == 'Q3') {
          if (balls.typeTwo == 'ds') {
            var arr = balls.red.split(' | ');
            st.dsShow = true;
            st.fsShow = false;
            var db = st.dsBalls;
            for (let i = 0; i < db.length; i++) {
              let j = parseInt(arr[i]) - 1;
              db[i][j].isActive = true;
            }
          } else {
            var arr = balls.red.split(',');
            st.dsShow = false;
            st.fsShow = true;
            var fb = st.fsBalls;
            for (let i = 0, l = arr.length; i < l; i++) {
              let j = parseInt(arr[i]) - 1;
              fb[j].isActive = true;
            }
          }
        } else {
          var arr = balls.red.split(',');
          var fb = st.fsBalls;
          for (let i = 0, l = arr.length; i < l; i++) {
            let j = parseInt(arr[i]) - 1;
            fb[j].isActive = true;
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
    wx.setEnableDebug({
      enableDebug: true
    });
  },
};

Page(pageData);

module.exports = {
  listData: pageData.data.listData,
  checkWay: pageData.checkWay
}