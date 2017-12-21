var rg = require('../../../utils/regiondb.js');
var bj = 0;

//获取应用实例
var app = getApp();
var app_data = app.globalData;
Page({
  data: {
    submit: false,
    userInfo: null,
    multiArray: [['请选择'], []],
    multiIndex: [0, 0],
    // 所在地区省市区id
    multiId:[],
    district: false//是否有区县
  },
  onLoad: function () {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      var pid = userInfo.province_id, cid = userInfo.city_id, did = userInfo.district_id;
      var idx = [rg.getIndex(1, 1, pid), rg.getIndex(2, pid, cid), rg.getIndex(3, cid, did)];
      var address = userInfo.address.replace(rg.getProvince(pid),'');
      userInfo.address = address.replace(rg.getCity(pid,cid), '');
      that.setData({
        multiIndex: idx,
        multiId: [pid,cid,did],
        userInfo: userInfo
      });
    }
    bj = 0;
    that.addData();
  },
  addData: function () {
    var that = this;
    var idx = that.data.multiIndex;
    if (!bj) {
      var ma = that.data.multiArray;
      ma[0] = rg.getProvinceList();
      var fn = rg.getProvinceCode(ma[0][idx[0]]);
      ma[1] = rg.getCityList(fn);
      var cn = rg.getCityCode(ma[1][idx[1]]);
      if (that.data.district)
        ma[2] = rg.getDistrictList(cn);
      that.setData({
        multiArray: ma
      })
      bj = 1;
    }
  },
  bindMultiPickerChange: function (e) {
    var that = this;
    var ma = this.data.multiArray;
    var vl = e.detail.value;
    var p = rg.getProvinceCode(ma[0][vl[0]]);
    var c = rg.getCityCode(ma[1][vl[1]]);
    var iid = [p, c];
    if (that.data.district){
      var d = rg.getDistrictCode(c,ma[2][vl[2]]);
      iid = [p, c,d];
    }

    if (iid[0] != that.data.multiId[0] || iid[1] != that.data.multiId[1] || iid[2] != that.data.multiId[2]){
      this.setData({
        submit: true,
        multiIndex: e.detail.value,
        multiId:iid
      })
    }
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this;
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var fn = rg.getProvinceCode(data.multiArray[0][e.detail.value]);
        data.multiArray[1] = rg.getCityList(fn);
        var cn = rg.getCityCode(data.multiArray[1][0]);
        data.multiIndex[1] = 0;
        if (that.data.district){
          data.multiArray[2] = rg.getDistrictList(cn);
          data.multiIndex[2] = 0;
        }
        break;
      case 1:
        if (that.data.district) {
          var cn = rg.getCityCode(data.multiArray[1][e.detail.value]);
          data.multiArray[2] = rg.getDistrictList(cn);
          data.multiIndex[2] = 0;
        }
        break;
    }
    this.setData(data);
  },
  checkInput: function (e) {
    var that = this;
    var val = e.detail.value;
    var id = e.currentTarget.id;
    var userInfo = that.data.userInfo;
    if (userInfo && val != userInfo[id]) {
      that.setData({
        submit: true
      })
    }
  },
  //表单提交
  formSubmit: function (e) {
    if(this.data.submit){
      var that = this;
      var val = e.detail.value;
      var ma = that.data.multiArray;
      var mi = that.data.multiIndex;
      var toast = '';
      if (ma[0].length == 0 || ma[1].length == 0) {
        toast = '请选择所在地区！';
      } else if (!val.address) {
        toast = '详细地址不能为空！';
      }
      if (toast) {
        app.showToast(toast)
        return false;
      }
      var userInfo = that.data.userInfo;
      var province = ma[0][mi[0]]; 
      var city = ma[1][mi[1]];
      var district = mi[2] ? ma[2][mi[2]] : '';
      var address = province + city + val.address;
      if (userInfo && (province != userInfo.province || city != userInfo.city || address != userInfo.address)) {
        app.checkLogin(function (userInfo) {
          var msg = [];
          msg['byname'] = app_data.byname;
          msg['service_type'] = 'address';
          msg['act_byname'] = 'user';
          msg['unionid'] = userInfo.unionid;
          msg['address'] = {
            province: encodeURI(province),
            city: encodeURI(city),
            address:encodeURI(address)
          }
          msg['code'] = that.data.multiId;
          
          app.socket_sendMsg(msg, function (data) {
            if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
              if (data.return === 'SUCCESS' || data.return === 'NULL') {
                wx.removeStorageSync('userInfo');
                if(data.return === 'NULL')
                  wx.setStorageSync('userInfo', userInfo);
                app.showToast("修改成功", function () {
                  wx.redirectTo({
                    url: '/pages/index/index?indexShow=my',
                  })
                });
              } else {
                app.showToast("修改失败");
              }
            } else {
              app.showToast(data.return_msg);
            }
          })
        })
      } else {
        app.showToast("没有内容被修改");
      }
    }
  }
})