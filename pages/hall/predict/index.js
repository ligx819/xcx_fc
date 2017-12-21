//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({

  data: {
    // 标记，防止重复触发 bindscrolltolower
    bj: 1,
    wHeight: '',
    bullet:[true,false,false],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    start: 0,
    limit: 50,
    ads: [],
    listData:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var h = res.windowHeight;
        that.setData({
          wHeight: h
        })
      }
    });
    wx.showModal({
      title: '温馨提示！',
      content: '为更好的服务彩民朋友，本中心特邀第三方机构为用户提供荐号分析。推荐仅供参考，不代表中心立场，请理性对待！彩市有风险，购彩需谨慎！',
      showCancel: false,
      confirmText: '继续查看'
    })
    that.getData()
  },
  getData: function(){
    var that = this
    var msg = [];
    msg['byname'] = app_data.byname;
    msg['service_type'] = 'predict';
    msg['act_byname'] = 'lottery';
    msg['start'] = that.data.start;
    msg['limit'] = that.data.limit;
    app.socket_sendMsg(msg, function (data) {
      if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
        if(data.return){
          data = data.return
          if (data.ads){
            that.setData({
              ads: data.ads
            })
          }
          var listData = data.lists
          if (listData.length > 0) {
            listData = that.data.listData.length > 0 ? that.data.listData.concat(listData) : listData
            that.setData({
              listData: listData,
              start: that.data.start + that.data.limit,
               bj: 1
            })
          }
        }
      }
    })
  },
  // 轮播图
  roast:function(e){
    var that = this;
    var bullet = that.data.bullet;
    var c = e.detail.current;
    bullet.forEach(function(e,i){
      i === c ? bullet[i] = true : bullet[i] = false;
    });
    that.setData({
      bullet: bullet
    })
  },
  loadMore:function(e){
    var that = this;
    if (that.data.bj) {
      that.setData({
        bj: 0,
      })
      that.getData()
    }
  },
  // 查看详情
  goDetail:function(e){
    app.goto('./detail/detail?id=' + e.currentTarget.dataset.id)
  },
  
})