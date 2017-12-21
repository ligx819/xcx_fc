//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    // 标记，防止重复触发 bindscrolltolower
    bj:1,
    wHeight: '',
    thisIssue: true,
    cName:'双色球',
    currentType: 'ssq',
    // 某一期的详细数据
    listData: null,
    // 更多期数模拟数据
    moreData: [],
    start: 0,
    limit: 20
  },
  onLoad: function (option) {
    var that = this;
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      if (prePage.data.open_lists != null) {
        var lists = prePage.data.open_lists;
        if (lists[option.id]) {
          var data = lists[option.id]
          app.log(data, that.route);
          data.sales = that.format(data.sales_amount)
          data.lucky = that.format(data.lucky_pool)
          if(data.df)
          data.df.sales = that.format(data.df.sales_amount)
          if(data.type == 'fc3d'){
            data.info = that.fc3d(data.red_ball)
          }
          
          wx.setNavigationBarTitle({
            title: data.name + '-第' + data.term + '期数据'
          });
          that.setData({
            listData: data,
            cName: data.name,
            currentType: data.type
          })
        }
      }
    }
  },
  selIndex:function(e){
    var that = this;
    var tp = e.currentTarget.dataset.go;
    app.goto('./' + tp + '/index?lottery=' + that.data.currentType)
  },
  format:function(money){
    var result = '';
    var l = Math.floor(money.length / 3)
    if(money.length % 3 == 0) l--;
    if (money.length < 3) return money
    for(var i=0;i<l;i++){
      var mod = parseInt(money) % 1000
      
      while (mod.toString().length < 3) {
        mod = "0" + mod;
      }  
      result = ',' + mod + result
      money = (money - parseInt(mod)) / 1000
    }
    return money + result
  },
  fc3d:function(num){
    var result = {}
    var sum = 0
    var span = 0
    var max = 0,min = 0
    var odd_even = ''
    var big_small = ''
    var mod_3 = ''
    var prime_he = ''
    var prime = [1, 2, 3, 5, 7]
    for (var n = 0; n < num.length; n++) {
      sum += parseInt(num[n])

      if (n == 0) {
        max = num[n]
        min = num[n]
      }
      if (max < num[n]) max = num[n]
      if (min > num[n]) min = num[n]

      mod_3 += num[n] % 3

      if (num[n] >= 5) {
        big_small += '大'
      } else {
        big_small += '小'
      }
      if (num[n] % 2 == 0) {
        odd_even += '偶'
      } else {
        odd_even += '奇'
      }

      var str = '合'
      for (var i = 0; i < prime.length; i++) {
        if (num[n] == prime[i]) {
          str = '质';
          break;
        }
      }
      prime_he += str
    }
    result.sum = sum
    result.span = max - min
    result.big_small = big_small
    result.mod_3 = mod_3
    result.odd_even = odd_even
    result.prime_he = prime_he

    return result;
  },
  // 更多期数
  goMore: function (e) {
    var that = this;
    var md = that.data.moreData;
    var t = that.data.cName;
    wx.setNavigationBarTitle({
      title: t
    });
    wx.getSystemInfo({
      success: function (res) {
        var h = res.windowHeight - 76;
        that.setData({
          thisIssue: false,
          wHeight: h
        })
      }
    })
    this.getData();
  },
  goIssue: function (e) {
    var that = this;
    // 获取用户点击的是哪一期
    var term = e.currentTarget.dataset.term;
    var t = that.data.cName + '-第' + term + '期数据';
    wx.setNavigationBarTitle({
      title: t
    });
    that.setData({
      thisIssue: true,
      listData: null
    })
    that.getData(term)
  },
  // 滚动到底部时加载更多数据
  loadMore: function (e) {
    var that = this;
    if(that.data.bj){
      that.setData({
        bj:0
      })
      that.getData()
    }
  },
  getData: function(term = 0){
    var that = this;
    var msg = [];
    msg['byname'] = app_data.byname;
    msg['service_type'] = 'open_lists';
    msg['act_byname'] = 'lottery';
    msg['type'] = that.data.currentType;
    msg['term'] = term;
    msg['start'] = that.data.start;
    msg['limit'] = that.data.limit;
    app.socket_sendMsg(msg, function (data) {
      if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
        var term = data.term
        data = data.return;
        if(!term){
          var moreData = [];
          for(var i in data){
            if (data[i].red_ball)
            data[i].red_ball = data[i].red_ball.split(',')
            if (data[i].blue_ball)
            data[i].blue_ball = data[i].blue_ball.split(',')
            moreData.push(data[i])
          }
          if(moreData.length > 0){
            moreData = that.data.moreData.length > 0 ?that.data.moreData.concat(moreData) : moreData
            that.setData({
              moreData: moreData,
              start: that.data.start + that.data.limit,
              bj: 1,
            })
          }
        }else{
          data.sales = that.format(data.sales_amount)
          data.lucky = that.format(data.lucky_pool)
          if (data.df)
            data.df.sales = that.format(data.df.sales_amount)
          if (data.red_ball)
          data.red_ball = data.red_ball.split(',')
          if (data.blue_ball)
          data.blue_ball = data.blue_ball.split(',')
          if (data.type == 'fc3d') {
            data.info = that.fc3d(data.red_ball)
          }
          that.setData({
            listData:data
          })
        }

      } else {
        app.showToast('获取开奖数据失败');
      }
    })
  }

})