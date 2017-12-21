var md5 = require('md5.js');
module.exports = (function () {
  var app = getApp();
  function init(arr){
    var signStr = '';
    var urlStr = '';
    var key = 'hew&^dsDS67*DSFEIDSKLfeisdfdkj';
    var rand = random_string();
    arr['nonce_str'] = rand;
    arr = sortBy(arr);
    
    for(var i in arr){
      if(arr[i] == null || arr[i] == '' || typeof(arr[i]) == 'object')
      continue;
      urlStr += i + '=' + arr[i] + '&';
    }
    signStr = urlStr + "key=" + key;
    signStr = md5.hexMD5(signStr);
    arr['sign'] = signStr.toUpperCase();
    signStr = arrayToJson(arr);
    signStr = JSON.stringify(signStr) + "\n";
    return signStr;
  }
  /**
	 * 
	 * 产生随机字符串，不长于32位
	 * @param int $length
	 * @return 产生的随机字符串
	 */
  function random_string(len = 32) {
      var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var str = "";
      for (var i = 0; i < len; i++) {
        str += chars.substr(Math.round(Math.random() * chars.length), 1);
      }
      return str;
  }

  function sortBy(arr){
    var newArr = [];
    var key = [];
    for(var i in arr){
      key.push(i);
    }
    key = mp(key);
    for(var i in key){
      newArr[key[i]] = arr[key[i]];
    }
    return newArr;

    function mp(key){
      for(var i=0;i<key.length;i++){
        for(var j=0;j<i;j++){
          var tmp = '';
          if(key[i] < key[j]){
            tmp = key[i];
            key[i] = key[j];
            key[j] = tmp;
          }
        }
      }
      return key;
    }
  }

  function arrayToJson(arr) {
    var jsonStr = {};
    for(var i in arr){
      jsonStr[i] = arr[i];
    }
    return jsonStr;
  }

  return {
    init: init
  }
})();