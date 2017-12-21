//获取应用实例
var app = getApp();
Page({
  data: {
    id: null,
    result:'',
    url: null,
    plan_name: null,
  },
  onLoad: function (options) {
    var that = this;
    var url = '/pages/lottery/plan/index/index?page=';
    var plan_name = '';
    var result = options.result;
    var id = options.id;
    var change = options.change != undefined ? options.change : null;
    if (change === '1') {
    //获取页面栈
      var pages = getCurrentPages();
      if (pages.length > 1) {
        //上一个页面实例对象
        var prePage = pages[pages.length - 2];
        typeof (prePage.changeData) == "function" && prePage.changeData(options.id);
      }
    }
    if (options.type == undefined || options.type === '0'){
      url = url + 'ls';
      plan_name = '临时投注单';
    }else{
      url =  url + 'cy';
      plan_name = '常用投注单';
    }
    this.setData({
      id: options.id != undefined ? options.id:null,
      result: options.result,
      url: url,
      plan_name: plan_name
    })
  },
  btnBack:function(){
    wx.navigateBack()
  },
  btnGo:function(e){
    app.btnGo(e);
  },

})