
var util = require('../../../../utils/util.js');
var tostCont = '';
var ca = true;
var bd = [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 63, 69, 73, 75, 75, 73, 69, 63, 55, 45, 36, 28, 21, 15, 10, 6, 3];

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
    // 单选包段默认数据
    duanData: {
      start: '',
      end: ''
    },
    betName: {
      "dx": { "isActive": true, "name": "单选", "enName": "danXuan", "id": "dx" },
      "zs": { "isActive": false, "name": "组三", "enName": "zuSan", "id": "zs" },
      "zl": { "isActive": false, "name": "组六", "enName": "zuLiu", "id": "zl" }
    },
    showWay: '',
    betWay: {
      dx: { 'id': 'dx', 'list': [{ 'isActive': true, 'id': 'danshi', 'name': '单选单式' }, { 'isActive': false, 'id': 'baoxin', 'name': '单选包*' }, { 'isActive': false, 'id': 'baodian', 'name': '单选包点' }, { 'isActive': false, 'id': 'baodan', 'name': '单选包胆' }, { 'isActive': false, 'id': 'baowei', 'name': '单选包位' }, { 'isActive': false, 'id': 'baodui', 'name': '单选包对' }, { 'isActive': false, 'id': 'baoduan', 'name': '单选包段' }, { 'isActive': false, 'id': 'baochuan', 'name': '单选包串' }, { 'isActive': false, 'id': 'jiou', 'name': '奇偶' }] },
      zs: { 'id': 'zs', 'list': [{ 'isActive': true, 'id': 'danshi', 'name': '组三单式' }, { 'isActive': false, 'id': 'baochuan', 'name': '组三包串' }] },
      zl: { 'id': 'zl', 'list': [{ 'isActive': true, 'id': 'danshi', 'name': '组六单式' }, { 'isActive': false, 'id': 'baochuan', 'name': '组六包串' }] }
    },
    showData: { 'id': 'danshi', 'pid': 'dx', 'name': '单选单式', 'rule': '每一位选择1个号码', 'count': 1, '_min': 0, '_max': 9, 'hint': ['百位', '十位', '个位'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
    listData: {
      dx: {
        danshi: { 'id': 'danshi', 'pid': 'dx', 'name': '单选单式', 'rule': '每一位选择1个号码', 'count': 1, '_min': 0, '_max': 9, 'hint': ['百位', '十位', '个位'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        baoxin: { 'id': 'baoxin', 'pid': 'dx', 'name': '单选包*', 'rule': '每一位选择1个号码,且有一位为*', 'count': 1, '_min': 0, '_max': 10, 'hint': ['百位', '十位', '个位'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }, { 'isActive': false, 'ball': '*' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }, { 'isActive': false, 'ball': '*' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }, { 'isActive': false, 'ball': '*' }]] },
        baodian: { 'id': 'baodian', 'pid': 'dx', 'name': '单选包点', 'rule': '选择1个号码', 'count': 1, '_min': 1, '_max': 26, 'hint': null, 'balls': [[{ 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }, { 'isActive': false, 'ball': '10' }, { 'isActive': false, 'ball': '11' }, { 'isActive': false, 'ball': '12' }, { 'isActive': false, 'ball': '13' }, { 'isActive': false, 'ball': '14' }, { 'isActive': false, 'ball': '15' }, { 'isActive': false, 'ball': '16' }, { 'isActive': false, 'ball': '17' }, { 'isActive': false, 'ball': '18' }, { 'isActive': false, 'ball': '19' }, { 'isActive': false, 'ball': '20' }, { 'isActive': false, 'ball': '21' }, { 'isActive': false, 'ball': '22' }, { 'isActive': false, 'ball': '23' }, { 'isActive': false, 'ball': '24' }, { 'isActive': false, 'ball': '25' }, { 'isActive': false, 'ball': '26' }]] },
        baodan: { 'id': 'baodan', 'pid': 'dx', 'name': '单选包胆', 'rule': '请选择1个号码', 'count': 1, '_min': 0, '_max': 9, 'hint': ['胆码'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        baowei: { 'id': 'baowei', 'pid': 'dx', 'name': '单选包位', 'rule': '有一位至少选择2个号码', 'count': 1, '_min': 0, '_max': 9, 'hint': ['百位', '十位', '个位'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        baodui: { 'id': 'baodui', 'pid': 'dx', 'name': '单选包对', 'rule': '', 'count': 1, '_min': 1, '_max': 1, 'hint': ['选号'], 'balls': [[{ 'isActive': false, 'ball': '包对' }]] },
        baoduan: { 'id': 'baoduan', 'pid': 'dx', 'name': '单选包段', 'rule': '每一段填写3位数号码', '_min': 0, '_max': 9, 'hint': null, 'count': 3, 'balls': [] },
        baochuan: { 'id': 'baochuan', 'pid': 'dx', 'name': '单选包串', 'rule': '至少选择3个号码', 'count': 3, '_min': 0, '_max': 9, 'hint': ['选号'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        jiou: { 'id': 'jiou', 'pid': 'dx', 'name': '单选奇偶', 'rule': '每1位选择1个', 'count': 1, '_min': 0, '_max': 1, 'hint': ['百位', '十位', '个位'], 'balls': [[{ 'isActive': false, 'ball': '奇' }, { 'isActive': false, 'ball': '偶' }], [{ 'isActive': false, 'ball': '奇' }, { 'isActive': false, 'ball': '偶' }], [{ 'isActive': false, 'ball': '奇' }, { 'isActive': false, 'ball': '偶' }]] }
      },
      zs: {
        danshi: { 'id': 'danshi', 'pid': 'zs', 'name': '组三单式', 'rule': '请选择1个对子和1个单数', 'count': 1, '_min': 0, '_max': 9, 'hint': ['对子', '对子', '单数'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }], [{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        baochuan: { 'id': 'baochuan', 'pid': 'zs', 'name': '组三包串', 'rule': '至少选择3个号码', 'count': 3, '_min': 0, '_max': 9, 'hint': ['选号'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] }
      },
      zl: {
        danshi: { 'id': 'danshi', 'pid': 'zl', 'name': '组六单式', 'rule': '请选择3个号码', 'count': 3, '_min': 0, '_max': 9, 'hint': ['选号'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] },
        baochuan: { 'id': 'baochuan', 'pid': 'zl', 'name': '组六包串', 'rule': '至少选择4个号码', 'count': 4, '_min': 0, '_max': 9, 'hint': ['选号'], 'balls': [[{ 'isActive': false, 'ball': '0' }, { 'isActive': false, 'ball': '1' }, { 'isActive': false, 'ball': '2' }, { 'isActive': false, 'ball': '3' }, { 'isActive': false, 'ball': '4' }, { 'isActive': false, 'ball': '5' }, { 'isActive': false, 'ball': '6' }, { 'isActive': false, 'ball': '7' }, { 'isActive': false, 'ball': '8' }, { 'isActive': false, 'ball': '9' }]] }
      }
    }
  },
  checkBetType:function(pid){
    var tt = Number(pid);
    if (!isNaN(tt)) {
      pid = parseInt(pid);
      switch (pid) {
        case 1:
          return 'dx';
        case 2:
          return 'zs';
        case 3:
          return 'zl';
      }
    } else {
      switch (pid) {
        case 'dx':
          return 1;
        case 'zs':
          return 2;
        case 'zl':
          return 3;
      }
    }
  },
  checkPickWay:function(cid){
    var tt = Number(cid);
    if (!isNaN(tt)) {
      cid = parseInt(cid);
      switch (cid) {
        case 1:
          return 'danshi';
        case 2:
          return 'fushi';
        case 3:
          return 'dantuo';
        case 4:
          return 'baodian';
        case 5:
          return 'baowei';
        case 6:
          return 'baodui';
        case 7:
          return 'baoduan';
        case 8:
          return 'baochuan';
        case 9:
          return 'jiou';
        case 12:
          return 'baoxin';
        case 14:
          return 'baodan';
      }
    } else {
      switch (cid) {
        case 'danshi':
          return 1;
        case 'fushi':
          return 2;
        case 'dantuo':
          return 3;
        case 'baodian':
          return 4;
        case 'baowei':
          return 5;
        case 'baodui':
          return 6;
        case 'baoduan':
          return 7;
        case 'baochuan':
          return 8;
        case 'jiou':
          return 9;
        case 'baoxin':
          return 12;
        case 'baodan':
          return 14;
      }
    }
  },
  // 单选，组三，组六切换
  cutBetName: function (e) {
    var that = this;
    var bn = that.data.betName;
    var sw = that.data.showWay;
    var bw = that.data.betWay;
    var st = that.data.showData;
    var lt = that.data.listData;
    var go = e.currentTarget.dataset.go;
    if (bn[go].isActive) {
      !sw ? sw = bw[go] : sw = "";
    } else {
      for (let i in bn) {
        i === go ? bn[i].isActive = true : bn[i].isActive = false;
      }
      sw = "";
      for (let i = 0, bwg = bw[go].list; i < bwg.length; i++) {
        if (bwg[i].isActive) {
          var gt = bwg[i].id;
          st = lt[go][gt];
          break;
        }
      }
    }
    that.setData({
      betName: bn,
      showWay: sw,
      showData: st,
      jizhu: 0,
      canAdd: true
    })
  },
  // 下拉框投注方式切换
  cutBetWay: function (e) {
    var that = this;
    // var bn = that.data.betName;
    var sw = that.data.showWay;
    var bw = that.data.betWay;
    var st = that.data.showData;
    var lt = that.data.listData;
    var pid = e.currentTarget.dataset.pid;
    var cid = e.currentTarget.dataset.cid;
    st = lt[pid][cid];
    sw.list.forEach(function (t) {
      t.id === cid ? t.isActive = true : t.isActive = false;
    });
    bw[pid] = sw;
    that.setData({
      showWay: '',
      showData: st,
      betWay: bw,
      jizhu: 0,
      canAdd: true
    })
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
    var dd = that.data.duanData;
    var balls = [], str = '';
    var dt = st.balls;
    if (st.id == 'baoduan') {
      str = dd.start + ' | ' + dd.end;
    } else {
      for (let i = 0; i < dt.length; i++) {
        var bb = [];
        dt[i].forEach(function (t) {
          t.isActive ? bb.push(t.ball) : '';
        })
        balls.push(bb.join(','));
      }
      str = balls.join(' | ');
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
      cid: isNaN(st.id) ? that.checkPickWay(st.id) : st.id,
      pid: isNaN(st.pid) ? that.checkBetType(st.pid) : st.pid,
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
  countBetNum: function (duanData, showData) {
    var that = this;
    var dd = duanData || that.data.duanData;
    var st = showData || that.data.showData;
    var stb = st.balls;
    var n = 0;
    var tp1 = st.pid, tp2 = st.id;
    var rbs = [];
    for (let i = 0; i < stb.length; i++) {
      var aa = 0;
      for (let j = 0, l = stb[i].length; j < l; j++) {
        if (stb[i][j].isActive) aa++;
      }
      rbs.push(aa);
    }
    if (tp1 == 'dx') {
      switch (tp2) {
        case 'danshi':
          n = rbs[0] * rbs[1] * rbs[2];
          break;
        case 'baoxin':
          var bj = 0;
          if (rbs[0] == 1 && rbs[1] == 1 && rbs[2] == 1) {
            for (let i = 0; i < stb.length; i++) {
              let j = stb[i].length - 1;
              if (stb[i][j].isActive) bj++;
            }
            if (bj > 0) {
              n = 1;
              for (let j = 0; j < bj; j++) {
                n *= util.P(10, 1);
              }
            }
          }
          break;
        case 'baodian':
          for (let i = 0, l = stb[0].length; i < l; i++) {
            if (stb[0][i].isActive) {
              var a = parseInt(stb[0][i].ball);
              n += bd[a];
            }
          }
          break;
        case 'baodan':
          var a = rbs[0];
          if (a > 0) {
            n = 3 * util.P(10, 2) + 1;
          } else {
            n = 0;
          }
          break;
        case 'baowei':
          var bj = 0;
          for (var i = 0; i < rbs.length; i++) {
            if (rbs[i] > 1) {
              bj++;
            }
          }
          if (bj > 0) {
            var a = rbs[0];
            var b = rbs[1];
            var c = rbs[2];
            n = util.comb(a, 1) * util.comb(b, 1) * util.comb(c, 1);
          } else {
            n = 0;
          }
          break;
        case 'baodui':
          var a = rbs[0];
          if (a > 0) {
            n = util.comb(3, 1) * util.comb(10, 1) * util.comb(9, 1);
          } else {
            n = 0;
          }
          break;
        case 'baoduan':
          var start = parseInt(dd.start);
          var end = parseInt(dd.end);
          if (isNaN(start) || isNaN(end)) return false;
          if (end > start) {
            n = end - start + 1;
          } else {
            n = 0;
          }
          break;
        case 'baochuan':
          var a = rbs[0];
          if (a > 2) {
            n = util.P(a, 3);
          } else {
            n = 0;
          }
          break;
        case 'jiou':
          var a = rbs[0];
          var b = rbs[1];
          var c = rbs[2];
          if (a == 1 && b == 1 && c == 1) {
            n = util.comb(5, 1) * util.comb(5, 1) * util.comb(5, 1);
          } else {
            n = 0;
          }
          break;
      }
      return n;
    }
    if (tp1 == 'zs') {
      switch (tp2) {
        case 'danshi':
          var a = rbs[0];
          var b = rbs[1];
          var c = rbs[2];
          if (a == 1 && b == 1 && c == 1) {
            n = 1;
          }
          break;
        case 'baochuan':
          var a = rbs[0];
          if (a > 2) {
            n = util.comb(a, 1) * util.comb(a - 1, 1);
          }
          break;
      }
      return n;
    }
    if (tp1 == 'zl') {
      switch (tp2) {
        case 'danshi':
          var a = rbs[0];
          if (a == 3) {
            n = 1;
          }
          break;
        case 'baochuan':
          var a = rbs[0];
          if (a > 3) {
            n = util.P(a, 3) / 6;
          }
          break;
      }
      return n;
    }
  },
  // 自定义提示
  toggleTost: function (tc) {
    var that = this;
    if (tc) {
      that.setData({
        tostCont: tc,
        isShowTost: true
      });
      setTimeout(function () {
        that.setData({
          isShowTost: false,
        });
      }, 1200);
      tostCont = '';
    }
  },
  // 单选包段数据
  getInput: function (e) {
    var that = this;
    var dd = that.data.duanData;
    var tp = e.currentTarget.dataset.tp;
    var val = e.detail.value;
    dd[tp] = val;
    if (isNaN(val) || val.length != 3) {
      tostCont = "请填写三位有效数字哦";
    } else {
      if (parseInt(dd.end) - parseInt(dd.start) < 0) tostCont = "结束号码不能小于开始号码";
      if (parseInt(dd.end) - parseInt(dd.start) == 0) tostCont = "结束号码不能等于开始号码";
    }
    if (tostCont) {
      that.toggleTost(tostCont);
      return;
    }
    that.setData({
      duanData: dd
    });
    var jz = that.countBetNum();
    if (!jz) return;
    if (jz > 10000) {
      tostCont = '所选注数不能超过10000注';
      that.toggleTost(tostCont);
    } else {
      that.setData({
        jizhu: jz,
        canAdd: true
      })
    }
  },
  // 点击选择球
  clickRedBall: function (e) {
    var that = this;
    var pi = e.currentTarget.dataset.pi;
    var ci = e.currentTarget.dataset.ci;
    var st = that.data.showData;
    var bb = st.balls;
    if (st.pid == 'dx') {
      switch (st.id) {
        case 'danshi':
        case 'baodian':
        case 'baodan':
        case 'baodui':
        case 'jiou':
          bb[pi].forEach(function (t, i) {
            i == ci ? bb[pi][i].isActive = !bb[pi][i].isActive : bb[pi][i].isActive = false;
          })
          break;
        case 'baoxin':
          if (ci === bb[pi].length - 1) {
            var bj = 0;
            for (let i = 0; i < bb.length; i++) {
              let j = bb[i].length - 1;
              if (bb[i][j].isActive) bj++;
            }
            if (bj >= 2) {
              tostCont = '最多只能选择两个*号哦~';
            } else {
              bb[pi].forEach(function (t, i) {
                i == ci ? bb[pi][i].isActive = !bb[pi][i].isActive : bb[pi][i].isActive = false;
              })
            }
            if (tostCont) {
              that.toggleTost(tostCont);
              return;
            }
          } else {
            bb[pi].forEach(function (t, i) {
              i == ci ? bb[pi][i].isActive = !bb[pi][i].isActive : bb[pi][i].isActive = false;
            })
          }
          break;
        case 'baochuan':
        case 'baowei':
          bb[pi][ci].isActive = !bb[pi][ci].isActive;
          break;
        default:
          break;

      }
    }
    if (st.pid == 'zs') {
      switch (st.id) {
        case 'danshi':
          if (pi == 0 || pi == 1) {
            if (bb[2][ci].isActive) {
              tostCont = '单数和对子不能相同哦~';
            } else {
              tostCont = '';
              bb[0].forEach(function (t, i) {
                i == ci ? bb[0][i].isActive = !bb[0][i].isActive : bb[0][i].isActive = false;
              });
              bb[1].forEach(function (t, i) {
                i == ci ? bb[1][i].isActive = !bb[1][i].isActive : bb[1][i].isActive = false;
              })
            }
          } else {
            if (bb[0][ci].isActive) {
              tostCont = '单数和对子不能相同哦~';
            } else {
              tostCont = '';
              bb[pi].forEach(function (t, i) {
                i == ci ? bb[pi][i].isActive = !bb[pi][i].isActive : bb[pi][i].isActive = false;
              })
            }
          }
          break;
        case 'baochuan':
          tostCont = '';
          bb[pi][ci].isActive = !bb[pi][ci].isActive;
          break;
        default:
          break;

      }
      if (tostCont) {
        that.toggleTost(tostCont);
        return;
      }
    }
    if (st.pid == 'zl') {
      bb[pi][ci].isActive = !bb[pi][ci].isActive;
    }
    that.setData({
      showData: st
    });
    if (st.pid == 'zl' && st.id == 'danshi') {
      var j = 0;
      for (let i = 0, l = bb[pi].length; i < l; i++) {
        if (bb[pi][i].isActive) j++;
      }
      if (j > 3) {
        tostCont = '最多只能选择3位号码！';
        bb[pi][ci].isActive = false;
        that.toggleTost(tostCont);
        that.setData({
          showData: st
        });
        return;
      }
    }
    var jz = that.countBetNum();
    if (jz > 10000) {
      bb[pi][ci].isActive = false;
      tostCont = '所选注数不能超过10000注';
      that.toggleTost(tostCont);
    } else {
      that.setData({
        jizhu: jz,
        canAdd: jz > 0 && ca ? false : true
      })
    }
  },
  randData: function (showData) {
    var that = this;
    var st = showData || that.data.showData;
    var db = st.balls;
    var tp1 = st.pid;
    var tp2 = st.id;
    var fb = [], rb = [];
    for (let i = st._min; i <= st._max; i++) {
      fb.push(i);
    }
    switch (tp1) {
      case 'dx':
        if (tp2 == 'baowei') {
          for (let j = 0; j < db.length; j++) {
            let arr = j == 0 ? util.random_numbers(fb, 2, false, true) : util.random_numbers(fb, 1);
            rb.push(arr);
          }
          var brr = [];
          util.randomSort(rb, brr);
          rb = brr;
        } else if (tp2 == 'baoduan') {
          for (let k = 0; k < 2; k++) {
            rb.push(util.random_numbers(fb, st.count, true, false));
          }
        } else {
          for (let k = 0; k < db.length; k++) {
            rb.push(util.random_numbers(fb, st.count, false, false));
          }
        }
        break;
      case 'zs':
      case 'zl':
        for (let k = 0; k < db.length; k++) {
          rb.push(util.random_numbers(fb, st.count, false, false));
        }
        break;
    }
    if (tp2 == 'baodui') {
      rb = [[0]];
    }
    if (tp2 == 'baoxin') {
      var tt = 0;
      for (let i = 0; i < rb.length; i++) {
        if (rb[i] == 10) tt++;
      }
      if (tt == 0) {
        rb[Math.floor(Math.random() * 3)] = [10];
      } else if (tt == 3) {
        rb[Math.floor(Math.random() * 3)] = [Math.floor(Math.random() * 9)];
      }
    }
    if (tp1 == 'zs' && tp2 == 'danshi') {
      rb[1] = rb[0];
      while (rb[2][0] == rb[0][0]) {
        rb[2] = util.random_numbers(fb, 1);
      }
    }
    return rb;
  },
  // 选号页机选
  jiXuan: function () {
    var that = this;
    var st = that.data.showData;
    var dd = that.data.duanData;
    var db = st.balls;
    for (let i = 0; i < db.length; i++) {
      db[i].forEach(function (t) {
        t.isActive = false;
      });
    }
    var rb = that.randData(st);
    if (st.id == 'baoduan') {
      var start = rb[0].join('');
      var end = rb[1].join('');
      parseInt(end) < parseInt(start) ? (dd.start = end, dd.end = start) : (dd.start = start, dd.end = end);
    } else {
      for (var i = 0; i < rb.length; i++) {
        for (var j = 0; j < rb[i].length; j++) {
          var val = '';
          st.id == 'baodian' ? val = parseInt(rb[i][j]) - 1 : val = parseInt(rb[i][j]);
          db[i][val].isActive = true;
        }
      }
    }
    that.setData({
      duanData: dd,
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
    var fb = st.balls;
    for (let i = 0; i < fb.length; i++) {
      fb[i].forEach(function (t) {
        t.isActive = false;
      });
    }
    that.setData({
      jizhu: 0,
      showData: st,
      canAdd: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ca = true;
    var that = this;
    var lt = that.data.listData;
    var bn = that.data.betName;
    var bw = that.data.betWay;
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
        var pid,cid;
        isNaN(balls.pid) ? pid = balls.pid : pid = that.checkBetType(balls.pid);
        isNaN(balls.cid) ? cid = balls.cid : cid = that.checkPickWay(balls.cid);
        var st = lt[pid][cid];
        var dd = {};
        var arr = balls.red.split(' | ');
        for(let i = 0;i < arr.length;i++){
          arr[i] = arr[i].split(',');
        }        
        if (cid == 'baoduan'){
          dd.start = arr[0];
          dd.end = arr[1];
        }else{
          var fb = st.balls;
          for(let i = 0;i < arr.length;i++){
            for(let j = 0,l = arr[i].length;j < l;j++){
              for(let k = 0,l1 = fb[i].length;k < l1;k++){
                if (fb[i][k].ball == arr[i][j]) {
                  fb[i][k].isActive = true;
                  break;
                }
              }
            }
          }
        }
        for (let i in bn) {
          i === pid ? bn[i].isActive = true : bn[i].isActive = false;
        }
        bw[pid].list.forEach(function (t) {
          t.id == cid ? t.isActive = true : t.isActive = false;
        });
        
        ca = false;
        that.setData({
          showData: st,
          duanData:dd,
          betName:bn,
          betWay:bw,
          listData: lt,
          jizhu: balls.bet,
          canAdd: true
        })
      },
    })
  }
};

Page(pageData);

module.exports = {
  randData: pageData.randData,
  countBetNum: pageData.countBetNum,
  checkBetType: pageData.checkBetType,
  checkPickWay: pageData.checkPickWay,
  listData:pageData.data.listData
}