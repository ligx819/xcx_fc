Page({
  data: {
    url: null
  },
  onLoad: function (options) {
    this.setData({
      url: 'https://lottery.lott6.com/zst/' + options.lottery
    })
  }
})