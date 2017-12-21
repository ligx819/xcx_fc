//获取应用实例
var app = getApp();
var app_data = app.globalData;

var pageData = {
  data: {
    flag: false,
    lsFlag: true,
    cyFlag: true,
    isShowTost: false,
    tostCont: '',
    lottery_list: null,
    gameFlag: null,
    allBalls: {
      lsBalls: null,
      cyBalls: null
    }
  },
  changeData: function (id, detail) {
    var ls = this.data.allBalls['lsBalls'];
    var cy = this.data.allBalls['cyBalls'];
    if (detail == undefined) {
      for (var i in ls) {
        if (ls[i].id == id) {
          ls[i].edit = true;
          ls[i].focus = false;
          cy.unshift(ls[i]);
          ls.splice(i, 1);
          break;
        }
      }
    } else {
      if (detail.type == 0) {
        for (var i in ls) {
          if (ls[i].id == id) {
            ls[i].title = detail.title;
          }
        }
      } else {
        for (var i in cy) {
          if (cy[i].id == id) {
            cy[i].title = detail.title;
          }
        }
      }
    }
    this.setData({
      allBalls: {
        lsBalls: ls,
        cyBalls: cy
      }
    })
  },
  addPlanName: function (lsBalls) {
    for (let i = 0, l1 = lsBalls.length; i < l1; i++) {
      if (lsBalls[i].game == 'ssq' || lsBalls[i].game == 'gd_367') continue;
      var home = require('../../' + lsBalls[i].game + '/index/index.js');
      var lt = home.listData;
      var balls = lsBalls[i].lists;
      for (let j = 0, l2 = balls.length; j < l2; j++) {
        var pid = balls[j].play_id;
        var cid = balls[j].bet_mode;
        if (lsBalls[i].game == 'fc3d') {
          pid = home.checkBetType(pid);
          cid = home.checkPickWay(cid);
          balls[j].play_name = lt[pid][cid].name;
        } else {
          pid = home.checkWay(pid);
          balls[j].play_name = lt[pid].name;
        }
      }
    }
    return lsBalls;
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'appData',
      success: function (res) {
        if (res.data.refresh) {
          wx.getStorage({
            key: 'appData',
            success: function (res) {
              res.data.refresh = false;
              wx.setStorage({
                key: 'appData',
                data: res.data,
              })
              wx.redirectTo({
                url: '/pages/lottery/plan/index/index',
              })
            },
          })
        }
      },
    })

    if (options.page != undefined) {
      this.setData({
        flag: options.page == 'cy' ? true : false
      })
    }
    var lists = app_data.config.bet.lists
    var gameFlag = {};
    for (var i in lists) {
      gameFlag[lists[i].game] = true;
    }
    this.setData({
      lottery_list: lists,
      gameFlag: gameFlag
    })
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'get_plan';
      msg['act_byname'] = 'lottery_plan';
      msg['unionid'] = userInfo.unionid;
      app.socket_sendMsg(msg, function (data) {
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          if (data.lists) {
            var lsBalls = data.lists.temp;
            var cyBalls = data.lists.common;

            if (cyBalls.length != 0) {
              for (let i = 0, l = cyBalls.length; i < l; i++) {
                cyBalls[i].edit = true;
                cyBalls[i].focus = false;
              }
            }
            lsBalls = that.addPlanName(lsBalls);
            cyBalls = that.addPlanName(cyBalls);
            that.setData({
              allBalls: {
                lsBalls: lsBalls,
                cyBalls: cyBalls
              }
            })
          }
        } else {
          app.showToast('出错了~~');
        }
      })
    });
  },
  changeType: function (e) {
    var gameFlag = this.data.gameFlag;
    for (var i in gameFlag) {
      gameFlag[i] = true;
    }
    this.setData({
      lsFlag: true,
      cyFlag: true,
      flag: parseInt(e.target.dataset.flag),
      gameFlag: gameFlag
    })
  },
  chooseType: function (e) {
    var type = e.target.dataset.type
    var gameFlag = this.data.gameFlag;
    for (var i in gameFlag) {
      gameFlag[i] = true;
    }
    if (type == 'ls') {
      if (this.data.flag == true) {
        this.setData({
          gameFlag: gameFlag
        })
      }
      this.setData({
        flag: false,
        cyFlag: true,
        lsFlag: this.data.lsFlag ? false : true,
        gameFlag: gameFlag
      })
    }
    if (type == 'cy') {
      if (this.data.flag == false) {
        this.setData({
          gameFlag: gameFlag
        })
      }
      this.setData({
        flag: true,
        lsFlag: true,
        cyFlag: this.data.cyFlag ? false : true,
      })
    }
  },
  bindDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    app.goto('/pages/lottery/plan/detail/detail?id=' + id)
  },
  selType: function (e) {
    var type = e.currentTarget.dataset.type;
    var gameFlag = this.data.gameFlag;
    if (type == 'all') {
      for (var i in gameFlag) {
        gameFlag[i] = true;
      }
    } else {
      for (var i in gameFlag) {
        gameFlag[i] = false;
      }
      gameFlag[type] = true;
    }
    this.setData({
      lsFlag: true,
      cyFlag: true,
      gameFlag: gameFlag
    })
  },
  // 保存为常用投注单
  btnSaveCy: function (e) {
    var that = this;
    var dataset = e.currentTarget.dataset;
    app.checkLogin(function (userInfo) {
      var msg = [];
      msg['byname'] = app_data.byname;
      msg['service_type'] = 'save_common_plan';
      msg['act_byname'] = 'lottery_plan';
      msg['unionid'] = userInfo.unionid;
      msg['openid'] = userInfo.openid;
      msg['id'] = dataset.id;
      app.socket_sendMsg(msg, function (data) {
        if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
          if (data.return) {
            var max = app_data.config.bet.common_max;
            if (data.return >= max) {
              that.setData({
                isShowTost: true,
                tostCont: '常用投注单最多保存' + max + '条，请先删除多余投注单'
              })
              setTimeout(function () {
                that.setData({
                  isShowTost: false,
                  tostCont: ''
                })
              }, 1500)
            } else {
              app.goto('/pages/lottery/plan/result/result?result=save_success&id=' + dataset.id + '&change=1&type=1')
            }
          } else {
            app.goto('/pages/lottery/plan/result/result?result=save_failed')
          }
        } else {
          app.showToast('出错了~~');
        }
      })
    });
  },
  //编辑常用投注单名称
  btnEditName: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var balls = that.data.allBalls;
    balls.cyBalls[index].focus = true;
    balls.cyBalls[index].edit = false;
    that.setData({
      allBalls: balls
    })
  },
  //保存编辑后的方案名称
  btnSaveName: function (e) {
    var that = this;
    var dataset = e.currentTarget.dataset;
    //方案名称
    var title = e.detail.value;
    var index = e.currentTarget.dataset.index;
    var balls = that.data.allBalls;
    if (title != undefined && title != '' && title != dataset.title) {
      app.checkLogin(function (userInfo) {
        var msg = [];
        msg['byname'] = app_data.byname;
        msg['service_type'] = 'change_title';
        msg['act_byname'] = 'lottery_plan';
        msg['unionid'] = userInfo.unionid;
        msg['id'] = dataset.id;
        msg['title'] = encodeURI(title);
        app.socket_sendMsg(msg, function (data) {
          if (data.return_code == 'SUCCESS' && data.return_msg == 'SUCCESS') {
            if (data.return) {
              balls.cyBalls[index].title = title;
              app.showToast('修改成功');
            } else {
              balls.cyBalls[index].title = dataset.title;
              app.showToast('修改失败');
            }
          } else {
            balls.cyBalls[index].title = dataset.title;
            app.showToast('出错了~~');
          }
          balls.cyBalls[index].focus = false;
          balls.cyBalls[index].edit = true;
          that.setData({
            allBalls: balls
          })
        })
      });
    } else {
      balls.cyBalls[index].title = dataset.title;
      balls.cyBalls[index].focus = false;
      balls.cyBalls[index].edit = true;
      that.setData({
        allBalls: balls
      })
    }
  },
};

Page(pageData);

module.exports = {
  addPlanName:pageData.addPlanName
}