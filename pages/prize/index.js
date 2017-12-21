// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    djResult:{}
  },
  onLoad: function(options){
    var code = options.code;
    var prize = options.prize;
    var state = options.state;
    var info = options.info;
    var djResult = null;
    switch(code){
      case 'pay_success':
      case 'pay_fail':
      case 'pay_owner':
      case 1304:
        djResult = { 'id': 'djcg', 'img': 'djcg.png', 'money': prize, 'ts': state, 'ts_t': info }
        break;
      case 1305:
        djResult = { 'id': 'wzj', 'img': 'wzj.png', 'money': prize, 'ts': state, 'ts_t': info }
        break;
      default:
        djResult = { 'id': 'djsb', 'img': 'djsb.png', 'money': prize, 'ts': state, 'ts_t': info }
        break;
    }
    this.setData({
      djResult: djResult
    })
  },
  btnBack: function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})