
// function draw(arr) {
//   console.log(arr);
//   var ctx = wx.createCanvasContext('firstCanvas');
//   ctx.setStrokeStyle("rgba(0,0,255,0.3)");
//   ctx.setLineWidth(1);
//   // ctx.setFont("14px arial");
//   arr.forEach(function (e, i) {
//     ctx.setFillStyle("#FF6600");
//     ctx.beginPath();
//     ctx.arc(e.x, e.y, 5, 0, Math.PI * 2, true);
//     ctx.closePath();
//     ctx.fill();

//     // var tx = (x + 14) > w ? (x - 6) : (x + 6);
//     // var ty = (y + 14) > h ? (y - 6) : (y + 6);
//     ctx.setFillStyle("#FF0707");
//     ctx.fillText(5, e.x, e.y);
//   })
//   ctx.setStrokeStyle("rgba(0,0,255,0.3)");
//   arr.forEach(function (e, i) {
//     i == 0 ? ctx.moveTo(e.x, e.y) : ctx.lineTo(e.x, e.y);
//   })
//   ctx.stroke();
//   ctx.draw();
// }

//动画
function inAction(l, r, that) {
  // var that = this;
  var animation = wx.createAnimation({
    duration: 800,
    timingFunction: "ease",
  });
  animation.translate(l, r).step({ duration: 800 });
  that.setData({
    animationData: animation.export()
  })
  setTimeout(function () {
    that.clearSel();
    that.setData({
      isShowPoint: false,
      isShowMsg: true,
      canFinish: false,
      pointLeft: 0,
      pointTop: 0,
      animationData: {}
    });
    setTimeout(function () {
      that.setData({
        isShowMsg: false,
      });
    }, 1200)
  }, 800);
}

function J(a, b) {
  if (a < b || a < 1 || b < 0) {
    return 0;
  } else {
    if (b == 0) {
      return 1;
    } else {
      var c = 1, d = 1;
      for (var i = (a - b + 1); i <= a; i++) {
        c = c * i;
      }
      for (var j = 1; j <= b; j++) {
        d = d * j;
      }
      return c / d;
    }
  }
}

function P(m, n) {
  if (m < 0 || n < 0 || m < n) {
    return 0;
  }
  var r = m;
  for (var i = 1; i < n; i++) {
    r = r * (m - 1);
    m--;
  }
  return r;
}

function comb(m, n) {
  if (m < 0 || n < 0 || m < n) {
    return 0;
  }
  n = n < (m - n) ? n : m - n;
  if (n == 0) {
    return 1;
  }
  var result = m;
  for (var i = 2, j = result - 1; i <= n; i++ , j--) {
    result = result * j / i;
  }
  return result;
}

// 数组随机排序
function randomSort(arr, newArr) {
  if (arr.length == 1) {
    newArr.push(arr[0]);
    return newArr;
  }
  var random = Math.ceil(Math.random() * arr.length) - 1;
  newArr.push(arr[random]);
  arr.splice(random, 1);
  return randomSort(arr, newArr);
}

// 数组删除指定下标元素
function arrayDel(arr, index) {
  if (isNaN(index) || index >= arr.length) {
    return false;
  }
  for (var i = 0, n = 0; i < arr.length; i++) {
    if (arr[i] != arr[index]) {
      arr[n++] = arr[i];
    }
  }
  arr.length -= 1;
  return arr;
};
function isRepeat(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      return false;
    }
  }
  return true;
}
function random_numbers(arr, num, repeat, s) {
  var length = arr.length;
  if (num > length) {
    return false;
  }
  var hash = [];
  //号码可以重复？
  repeat = (repeat) ? true : false;
  //是否要排序
  var issort = s ? true : false;
  do {
    var key = Math.floor(Math.random() * (length));
    var number = arr[key];
    var rp = true;
    // 如果可以重复
    if (repeat) {
      hash.push(number);
    } else {
      if (isRepeat(hash, number)) {
        hash.push(number);
      }

    }
  } while (hash.length < num);
  if (issort) hash.sort();
  return hash;
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 走势图公用函数部分
function hideMenu(that){
  var h = that.data.tHeight;
  var l = that.data.menuLeft;
  var t1 = setInterval(function () {
    if (h <= 0) {
      clearInterval(t1);
    } else {
      h = h - 10;
    }
    that.setData({
      tHeight: h
    })
  }, 10);
  var t2 = setInterval(function () {
    if (l <= -190) {
      clearInterval(t2);
    } else {
      l = l - 10;
    }
    that.setData({
      menuLeft: l
    })
  }, 10)
}

function searchData(that){
  var h = that.data.tHeight;
  if (h <= 0) {
    var t1 = setInterval(function () {
      if (h >= 120) {
        clearInterval(t1);
      } else {
        h = h + 10;
      }
      that.setData({
        tHeight: h
      })
    }, 10)
  } else {
    var t2 = setInterval(function () {
      if (h <= 0) {
        clearInterval(t2);
      } else {
        h = h - 10;
      }
      that.setData({
        tHeight: h
      })
    }, 10)
  }
}

function menuData(that){
  var h = that.data.menuLeft;
  if (h <= -190) {
    var t1 = setInterval(function () {
      if (h >= 0) {
        clearInterval(t1);
      } else {
        h = h + 10;
      }
      that.setData({
        menuLeft: h
      })
    }, 10)
  } else {
    var t2 = setInterval(function () {
      if (h <= -190) {
        clearInterval(t2);
      } else {
        h = h - 10;
      }
      that.setData({
        menuLeft: h
      })
    }, 10)
  }
}
var rbs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'];
var bbs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'];
var fc3d_ball = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var sbs = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
module.exports = {
  formatTime: formatTime,
  isRepeat: isRepeat,
  random_numbers: random_numbers,
  rbs: rbs,
  bbs: bbs,
  sbs: sbs,
  fc3d_ball: fc3d_ball,
  arrayDel: arrayDel,
  // draw: draw,
  J: J,
  comb: comb,
  P: P,
  randomSort: randomSort,
  inAction: inAction,
  hideMenu: hideMenu,
  searchData: searchData,
  menuData: menuData
}
