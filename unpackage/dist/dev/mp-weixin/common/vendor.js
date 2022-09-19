(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"魔域","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 117:
/*!**************************************************!*\
  !*** D:/uniapp/魔域/components/chb-share/param.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.zmParam = exports.posParam = void 0;var posParam = {
  width: 750,
  height: 750,
  paths: {
    rect: [
    {
      x: 680,
      y: 1354,
      w: 176,
      h: 196,
      r: 12,
      type: "fill",
      color: "#ffffff" }] },



  pics: [
  {
    x: 0,
    y: 0,
    w: 900,
    h: 1600,
    preload: true,
    src: "https://chblive.com/66887301293859.jpg"
    // src:"https://img.xialv.com/uploads/2021/01/26/poster_img1611633604569612.jpg?imageView2/q/60"
  },
  {
    x: 26,
    y: 0,
    src: "https://chblive.com/66887301293859.jpg" },

  {
    x: 688,
    y: 1362,
    w: 160,
    h: 160,
    src: "https://chblive.com/66887301293859.jpg" },

  {
    x: 686,
    y: 1560,
    w: 164,
    h: 22,
    src: "https://chblive.com/66887301293859.jpg" }],


  texts: [
  {
    x: 688,
    y: 1340,
    w: 160,
    font: 16,
    align: "center",
    color: "black",
    text: "小小咖侠侣店"

    // y:1220,
    //    text: "小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店小小咖侠侣店",
    //    multiple : true,
    //    clamp : 2,
  },
  {
    x: 688,
    y: 1534,
    font: 18,
    align: "center",
    color: "#333333",
    text: "长按扫码购买>>" }] };exports.posParam = posParam;




var zmParam = {
  width: 900,
  height: 1600,
  bgColor: "#dddddd",
  paths: {
    circle: [
    {
      x: 214,
      y: 1123,
      w: 56,
      h: 56,
      r: 28,
      type: "fill",
      color: "#ffffff" }],


    rect: [
    {
      x: 324,
      y: 1209,
      w: 252,
      h: 252,
      type: "fill",
      color: "#e6e6e6" },

    {
      x: 325,
      y: 1210,
      w: 250,
      h: 250,
      type: "fill",
      color: "#ffffff" },

    {
      x: 206,
      y: 1117,
      w: 488,
      h: 68,
      r: 34,
      type: "fill",
      color: "rgba(0, 0, 0, .15)" },

    {
      x: 376.5,
      y: 1520.5,
      w: 152,
      h: 44,
      r: 22,
      lineWidth: 4,
      color: "#000000" }],


    triangle: [
    {
      points: [
      { x: 450, y: 1198 },
      { x: 462, y: 1185 },
      { x: 439, y: 1185 }],

      type: "fill",
      color: "rgba(0, 0, 0, .15)" }],


    line: [
    {
      x1: 360,
      y1: 1490.5,
      x2: 400,
      y2: 1490.5,
      lineWidth: 2,
      color: "#000000" },

    {
      x1: 505,
      y1: 1490.5,
      x2: 545,
      y2: 1490.5,
      lineWidth: 2,
      color: "#000000" }] },



  pics: [
  {
    x: 0,
    y: 0,
    w: 900,
    h: 1600,
    preload: true,
    src: "https://img.xialv.com/uploads/2021/04/07/ticket_poster16177886029234776.jpg" },

  {
    x: 328,
    y: 1213,
    w: 244,
    h: 244,
    src: "https://m.xialv.com/weixin/qrcode?url=https%3A%2F%2Fticket.xialv.com%2F%3Fc%3Dteam%26a%3Drecruit%26pid%3D244331" },

  {
    x: 215,
    y: 1124,
    w: 54,
    h: 54,
    r: 27,
    src: "https://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM4XVPSNpKSFVTnIwcUDDwKCOuGzJYAkpmAE59mAzGhujagfgQYWRwic2DeePDyM5dzXBEhDnZ2tFLLjMvLS904uzrWff6omyYUA/132" }],


  texts: [
  {
    x: 280,
    y: 1152,
    font: 26,
    color: "#FFE506",
    text: "小小咖侠侣店" },

  {
    x: 436,
    y: 1152,
    font: 26,
    color: "#ffffff",
    text: "邀请你注册侠侣联盟" },

  {
    x: 328,
    y: 1493,
    w: 250,
    font: 24,
    align: "center",
    color: "#000000",
    text: "邀 请 码" },

  {
    x: 328,
    y: 1543,
    w: 250,
    font: 28,
    align: "center",
    color: "#000000",
    text: "3ZGVTV" }] };exports.zmParam = zmParam;

/***/ }),

/***/ 12:
/*!***********************************!*\
  !*** D:/uniapp/魔域/store/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 13));

var _state = _interopRequireDefault(__webpack_require__(/*! ./state.js */ 14));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations.js */ 15));
var actions = _interopRequireWildcard(__webpack_require__(/*! ./actions.js */ 18));
var getters = _interopRequireWildcard(__webpack_require__(/*! ./getters.js */ 19));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);
//实例store对象
var store = new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  actions: actions,
  getters: getters });


//导出store对象
var _default = store;exports.default = _default;

/***/ }),

/***/ 13:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 14:
/*!***********************************!*\
  !*** D:/uniapp/魔域/store/state.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 单一状态树
                                                                                                      * vuex 操作顺序：state.js -> mutations-type.js -> mutations.js -> getters.js
                                                                                                      */
var state = {
  // 用户信息，是否登录等 theme
  sessionId: '' };var _default =


state;exports.default = _default;

/***/ }),

/***/ 15:
/*!***************************************!*\
  !*** D:/uniapp/魔域/store/mutations.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var types = _interopRequireWildcard(__webpack_require__(/*! ./mutations-type.js */ 16));
var _auth = __webpack_require__(/*! @/utils/auth */ 17);function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var mutations = _defineProperty({},
types.SET_SESSIONID, function (state, sessionId) {
  (0, _auth.setToken)(sessionId);
  state.sessionId = sessionId;
});var _default =


mutations;exports.default = _default;

/***/ }),

/***/ 153:
/*!****************************************************************!*\
  !*** D:/uniapp/魔域/components/dist/uni-canvas-poster-sprite.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {/*! For license information please see uni-canvas-poster-sprite.js.LICENSE.txt */
!function (e, t) { true ? module.exports = t() : undefined;}(self, function () {return function () {"use strict";var e = { 691: function _(e, t, n) {n.r(t), n.d(t, { default: function _default() {return G;} });var r,i = { TASK: { CODE: 1001, MSG: "异步并行任务失败，获取图片资源失败！" }, DRAW: { CODE: 1002, MSG: "canvas海报绘制失败!" }, SAVE: { CODE: 1003, MSG: "海报保存为临时文件失败!" }, GETIMG: { CODE: 1004, MSG: "图片资源下载到本地失败!" }, TOBASE64: { CODE: 1005, MSG: "本地图片转换base64失败!" } },o = { line: "line", rect: "rect", circle: "circle", triangle: "triangle", polygon: "polygon" },a = { width: 640, height: 640, bgColor: "white", fileType: "jpeg", quality: 1, version: n(306).version, pics: [], texts: [], paths: {}, callback: function callback(e, t) {} },s = { self: "", canvasId: "" },l = { appPlus: !1, pixelRatio: 2 },c = (r = {}, ["String", "Object", "Number", "Array", "Undefined", "Function", "Null"].forEach(function (e) {r["is" + e] = function (t) {return Object.prototype.toString.call(t) == "[object " + e + "]";};}), r);function u(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}var f = function () {function e(t) {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.canvasApi = t || {}, this;}var t, n;return t = e, (n = [{ key: "triangle", value: function value(e, t) {t.points && 0 != t.points.length ? t.points.length = 3 : t.points = [{ x: 0, y: 0 }, { x: 8, y: 8 }, { x: 16, y: 0 }], this.polygon(e, t);} }, { key: "circle", value: function value(e, t) {this.rect(e, { x: t.x, y: t.y, r: t.r, w: 2 * t.r, h: 2 * t.r, type: t.type, color: t.color, angle: t.angle, callback: t.callback });} }, { key: "rect", value: function value(e, t) {var n = this.canvasApi || {};e.save();var r = t.x || 0,i = t.y || 0,o = t.w || 0,a = t.h || 0,s = t.r || 0,l = t.callback || function (e) {},c = t.type || "stroke",u = t.angle || null;n.setFillStyle && n.setFillStyle(e, t.color || "white"), n.setStrokeStyle && n.setStrokeStyle(e, t.color || "white");var f = /^\d+\.\d+$/;f.test(r) || (r += .5), f.test(i) || (i += .5), n.setLineWidth && n.setLineWidth(e, t.lineWidth || 1), u && (e.translate(r + .5 * o, i + .5 * a), e.rotate(u * Math.PI / 180), r = -.5 * o, i = -.5 * a), e.beginPath(), s > 0 ? (e.moveTo(r + s, i), e.lineTo(r + o - s, i), e.arc(r + o - s, i + s, s, -.5 * Math.PI, 0, !1), e.lineTo(r + o, i + a - s), e.arc(r + o - s, i + a - s, s, 0, .5 * Math.PI, !1), e.lineTo(r + s, i + a), e.arc(r + s, i + a - s, s, .5 * Math.PI, Math.PI, !1), e.lineTo(r, i + s), e.arc(r + s, i + s, s, Math.PI, 1.5 * Math.PI, !1)) : (e.moveTo(r, i), e.lineTo(r + o, i), e.lineTo(r + o, i + a), e.lineTo(r, i + a), e.lineTo(r, i)), e.clip(), e.closePath(), "stroke" == c ? e.stroke() : e.fill(), e.save(), l({ x: r, y: i, w: o, h: a }), e.restore(), e.restore();} }, { key: "line", value: function value(e, t) {var n = this.canvasApi || {};e.save();var r = t.x1 || 0,i = t.y1 || 0,o = t.x2 || 0,a = t.y2 || 0,s = /^\d+\.\d+$/;s.test(r) || (r += .5), s.test(i) || (i += .5), n.setLineWidth && n.setLineWidth(e, t.lineWidth || 1), n.setStrokeStyle && n.setStrokeStyle(e, t.color || "white"), n.setLineJoin && n.setLineJoin(e, t.lineJoin || "miter"), n.setLineCap && n.setLineCap(e, t.lineCap || "butt"), t.dash && n.setLineDash && n.setLineDash(e, t.dash, t.offset || 5), e.beginPath(), e.moveTo(r, i), e.lineTo(o, a), e.closePath(), e.stroke(), e.restore();} }, { key: "polygon", value: function value(e, t) {var n = this.canvasApi || {};e.save();var r = t.type || "stroke",i = t.points || [];0 != i.length && (e.beginPath(), i.forEach(function (t, n) {0 == n && e.moveTo(t.x, t.y), e.lineTo(t.x, t.y);}), e.closePath(), n.setLineWidth && n.setLineWidth(e, t.lineWidth || 1), n.setFillStyle && n.setFillStyle(e, t.color || "white"), n.setStrokeStyle && n.setStrokeStyle(e, t.color || "white"), "stroke" == r ? e.stroke() : e.fill(), e.restore());} }]) && u(t.prototype, n), e;}();function p(e) {return "web" === e;}function d(e, t) {var n = "14px Arial",r = /(\d+\.?\d*)/g,i = new RegExp("".concat(r.source, "px"), "g"),o = !p(e.__platform__),a = c.isNumber(t),s = c.isString(t);if (!t || !a && !s) return o ? 14 : n;if (o && a) return t;if (o && s) {var l = t.match(r);return l && l[0] ? Number(l[0]) : 14;}if (!o && a) return "".concat(t, "px Arial");if (!o && s) {if (t.match(i)) return t;var u = t.match(r);return u && u[0] ? "".concat(u[0], "px Arial") : n;}}function h(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}var y = function () {function e(t) {return function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), this.canvasApi = t || {}, this;}var t, n;return t = e, (n = [{ key: "textAlign", value: function value(e, t) {var n = d(e, t.font),r = this.canvasApi || {};e.save(), r.setFontSize && r.setFontSize(e, n), r.setFillStyle && r.setFillStyle(e, t.color || "black"), r.setTextBaseline && r.setTextBaseline(e, t.baseline || "middle");var i = t.x || 0,o = t.y || 0,a = t.w || 0,s = i,l = t.lineHeight || 20,c = t.angle || null,u = t.align || "left",f = t.text ? t.text.toString() : "",p = this.measureText(e, f, n);a > 0 && "center" == u ? s = i + .5 * (a - p) : a > 0 && "right" == u && (s = i + (a - p)), c ? (e.translate(s + .5 * p, o + .5 * l), e.rotate(c * Math.PI / 180), e.fillText(f, -.5 * p, -.5 * l)) : e.fillText(f, s, o), e.restore();} }, { key: "wordwrap", value: function value(e, t) {var n = d(e, t.font),r = this.canvasApi || {};e.save(), r.setFontSize && r.setFontSize(e, n), r.setFillStyle && r.setFillStyle(e, t.color || "black"), r.setTextBaseline && r.setTextBaseline(e, t.baseline || "middle");var i = t.x || 0,o = t.y || 0,a = t.w || 0,s = t.lineHeight || 24,l = t.clamp || -1,c = "",u = [],f = t.text || "";f = f.toString().split("");for (var p = 0; p < f.length; p++) {this.measureText(e, c, n) < a && this.measureText(e, c + f[p], n) <= a ? c += f[p] : (u.push(c), c = f[p]);}u.push(c);var h = u.length;if (l > 0 && l < h) for (var y = 0; y < l; y++) {var v = u[y];y == l - 1 && (v = v.substring(0, v.length - 1) + "..."), e.fillText(v, i, o + (y + 1) * s);} else for (var b = 0; b < h; b++) {e.fillText(u[b], i, o + (b + 1) * s);}e.restore();} }, { key: "measureText", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 14;if (!t) return 0;if (e.measureText) {var r = e.measureText(t).width;if (r > 0) return r;}var i = /(\d+\.?\d*)/g,o = n.toString().match(i),a = o && o[0] ? Number(o[0]) : 14;return width = t.toString().length * a, width;} }]) && h(t.prototype, n), e;}();function v(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var r = Object.getOwnPropertySymbols(e);t && (r = r.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, r);}return n;}function b(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? v(Object(n), !0).forEach(function (t) {g(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : v(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function g(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function m(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}var w = function () {function e(t, n) {var r = n.platform,i = n.canvasApi,o = n.canvasCtxApi;if (function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, e), c.isObject(t)) return this.options = t || {}, this.__platform__ = r, this.drawPath = new f(o), this.drawText = new y(o), this.canvasApi = b(b({}, i), o), this.canvasResult = { hasEmit: !1, err: null, res: null }, this.context = { ctx: null, canvas: null }, this.resCallbacks = [], c.isFunction(this.options.callback) && this.resCallbacks.push(this.options.callback), this;console.error("参数错误，参数必须是对象！");}var t, n;return t = e, (n = [{ key: "then", value: function value(e) {return c.isFunction(e) && (this.resCallbacks.push(e), this.canvasResult.hasEmit && e(this.canvasResult.err, this.canvasResult.res)), this;} }, { key: "drawImg", value: function value(e, t) {var n = this.drawPath || {},r = t.w || t.img.width,i = t.h || t.img.height;t.r || t.angle ? n.rect && n.rect(e, { x: t.x, y: t.y, w: r, h: i, r: t.r, angle: t.angle, callback: function callback(n) {e.drawImage(t.img, n.x, n.y, n.w, n.h);} }) : e.drawImage(t.img, t.x, t.y, r, i);} }, { key: "canvas", value: function value() {var e,t = this,n = this.options,r = this.drawImg.bind(this),a = this.drawPath || {},s = this.drawText || {},l = this.canvasApi || {},u = this.__platform__,f = this.resCallbacks || [];function p(e, n) {f.forEach(function (t) {c.isFunction(t) && t(e, n);}), t.canvasResult = { err: e, res: n, hasEmit: !0 };}function d(e) {var f = e.paths,d = void 0 === f ? {} : f,h = e.texts,y = void 0 === h ? [] : h,v = e.pics,g = void 0 === v ? [] : v,m = e.preloadPics,w = void 0 === m ? [] : m;if (l.createCanvasContext) {var x = l.createCanvasContext(n),S = x.ctx,_ = x.canvas;if (S.__platform__ = u, _.__platform__ = u, t.context.ctx = S, t.context.canvas = _, S.rect(0, 0, n.width, n.height), l.setFillStyle && l.setFillStyle(S, n.bgColor || "white"), S.fill(), c.isArray(w) && w.length > 0) for (var T in w) {r && r(S, w[T]);}if ((c.isObject(d) ? Object.getOwnPropertyNames(d) : []).length > 0) for (var O in d) {var P = d[O];for (var E in P) {var k = P[E],j = o[O];a[j] && a[j](S, k);}}if (c.isArray(g) && g.length > 0) for (var I in g) {r && r(S, g[I]);}if (c.isArray(y) && y.length > 0) for (var C in y) {var A = y[C];A.multiple && A.w ? s.wordwrap && s.wordwrap(S, A) : s.textAlign && s.textAlign(S, A);}l.canvasToTempFilePath && l.canvasToTempFilePath({ ctx: S, opts: n, canvas: _, ERROR_TYPE: i, callback: function callback(e, t) {p(e, b(b({}, t), {}, { canvas: _ }));} });}}c.isArray(n.pics) && n.pics.length > 0 ? function (e, t) {var n = {},r = {};if (0 != Object.getOwnPropertyNames(e).length) {for (var i in e) {n[i] = null, r[i] = { complate: !1 };}var o = function o(e, i, _o) {i ? t(i, null) : (r[e].complate = !0, n[e] = _o, function () {var e = !0;for (var t in r) {if (!r[t].complate) {e = !1;break;}}return e;}() && t(null, n));};for (var i in e) {(0, e[i])(o.bind(null, i));}} else t(null, null);}((e = {}, n.pics.forEach(function (t, r) {var o = Math.random().toString(16).substr(2);e[o] = function (e) {l.getImageInfos && l.getImageInfos({ opts: n, ERROR_TYPE: i, src: t.src, callback: function callback(n, i) {n ? p(n, null) : e(null, { img: i.path, x: t.x, y: t.y, w: t.w, h: t.h, r: t.r, zIndex: r, preload: t.preload || !1, angle: t.angle });} });};}), e), function (e, t) {if (e) p({ code: i.TASK.CODE, msg: i.TASK.MSG, err: JSON.stringify(e), src: "" }, null);else {var r = [],o = [];for (var a in t) {t[a].preload ? o.push(t[a]) : r.push(t[a]);}r.length > 0 && r.sort(function (e, t) {return e.zIndex - t.zIndex;}), o.length > 0 && o.sort(function (e, t) {return e.zIndex - t.zIndex;}), d({ pics: r, preloadPics: o, paths: n.paths, texts: n.texts });}}) : d({ paths: n.paths, texts: n.texts });} }]) && m(t.prototype, n), e;}();function x(e) {return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function S(e) {return (S = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}var _ = { __getImageInfo__: function __getImageInfo__() {}, __createCanvasContext__: function __createCanvasContext__() {}, __canvasToTempFilePath__: function __canvasToTempFilePath__() {} },T = _,O = !1,P = { createCanvasContext: function createCanvasContext(e) {if (T.__createCanvasContext__) {var t = T.__createCanvasContext__(e.canvasId, e.self);return { ctx: t, canvas: t };}}, canvasToTempFilePath: function canvasToTempFilePath(e) {var t = e.ctx,n = e.opts,r = e.ERROR_TYPE,i = e.callback;if (T.__canvasToTempFilePath__) try {setTimeout(function () {t.draw(!0, function () {T.__canvasToTempFilePath__({ fileType: n.fileType || "jpg", quality: n.quality || 1, canvasId: n.canvasId, success: function success(e) {i(null, e);}, fail: function fail(e) {i({ desc: "海报保存失败.", err: JSON.stringify(e), code: r.SAVE.CODE, msg: r.SAVE.MSG, src: "" }, null);} }, n.self);});}, 250);} catch (e) {i({ desc: "canva海报绘制失败.", err: JSON.stringify(e), code: r.DRAW.CODE, msg: r.DRAW.MSG, src: "" }, null);}}, getImageInfos: function getImageInfos(e) {var t = e.src,n = e.ERROR_TYPE,r = e.callback;T.__getImageInfo__ && T.__getImageInfo__({ src: t, fail: function fail(e) {r({ desc: "图片下载失败.", err: JSON.stringify(e), code: n.GETIMG.CODE, msg: n.GETIMG.MSG, src: t }, null);}, success: function success(e) {r(null, e);} });} },E = {},k = !1,j = !0;function I(e) {return (I = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function C(e, t) {return (C = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function A(e, t) {return !t || "object" !== I(t) && "function" != typeof t ? R(e) : t;}function R(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function F(e) {return (F = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}E.setLineWidth = function (e, t) {j ? e.setLineWidth(t) : e.lineWidth = t;}, E.setLineCap = function (e, t) {j ? e.setLineCap(t) : e.lineCap = t;}, E.setLineJoin = function (e, t) {j ? e.setLineJoin(t) : e.lineJoin = t;}, E.setLineDash = function (e, t, n) {j ? e.setLineDash(t, n) : e.setLineDash(t);}, E.setFillStyle = function (e, t) {j ? e.setFillStyle(t) : e.fillStyle = t;}, E.setStrokeStyle = function (e, t) {j ? e.setStrokeStyle(t) : e.strokeStyle = t;}, E.setFontSize = function (e, t) {var n = d(e, t);j ? e.setFontSize(n) : e.font = n;}, E.setTextBaseline = function (e, t) {j ? e.setTextBaseline(t) : e.textBaseline = t;};var M,D = "uni-app";k ? console.error("You have already set canvasCtxApiEnv and cannot change it.") : (j = !p("uni-app"), k = !0), M = { __getImageInfo__: uni.getImageInfo, __createCanvasContext__: uni.createCanvasContext, __canvasToTempFilePath__: uni.canvasToTempFilePath }, O ? console.error("You have already set canvasEnvApi and cannot change it.") : (T = M || _, O = !0), P.getImageInfos = function (e) {var t = e.src,n = e.opts,r = e.ERROR_TYPE,i = e.callback;n && n.appPlus ? function (e, t, n) {if ("object" == ("undefined" == typeof plus ? "undefined" : S(plus))) {var r = "_downloads/image/pic_" + Math.random().toString(16).substr(2) + "_.png";plus.downloader.createDownload(e, { method: "GET", filename: r }, function (r, i) {var o;200 == i ? (o = r.filename, new Promise(function (e, t) {if ("object" === ("undefined" == typeof window ? "undefined" : x(window)) && "document" in window) {if ("function" == typeof FileReader) {var n = new XMLHttpRequest();return n.open("GET", o, !0), n.responseType = "blob", n.onload = function () {if (200 === this.status) {var n = new FileReader();n.onload = function (t) {e(t.target.result);}, n.onerror = t, n.readAsDataURL(this.response);}}, n.onerror = t, void n.send();}var r = document.createElement("canvas"),i = r.getContext("2d"),a = new Image();return a.onload = function () {r.width = a.width, r.height = a.height, i.drawImage(a, 0, 0), e(r.toDataURL()), r.height = r.width = 0;}, a.onerror = t, void (a.src = o);}"object" !== ("undefined" == typeof plus ? "undefined" : x(plus)) ? "object" === ("undefined" == typeof wx ? "undefined" : x(wx)) && wx.canIUse("getFileSystemManager") ? wx.getFileSystemManager().readFile({ filePath: o, encoding: "base64", success: function success(t) {e("data:image/png;base64," + t.data);}, fail: function fail(e) {t(e);} }) : t(new Error("not support")) : plus.io.resolveLocalFileSystemURL(function (e) {if (0 === e.indexOf("_www") || 0 === e.indexOf("_doc") || 0 === e.indexOf("_documents") || 0 === e.indexOf("_downloads")) return e;if (0 === e.indexOf("file://")) return e;if (0 === e.indexOf("/storage/emulated/0/")) return e;if (0 === e.indexOf("/")) {var t = plus.io.convertAbsoluteFileSystem(e);if (t !== e) return t;e = e.substr(1);}return "_www/" + e;}(o), function (n) {n.file(function (n) {var r = new plus.io.FileReader();r.onload = function (t) {e(t.target.result);}, r.onerror = function (e) {t(e);}, r.readAsDataURL(n);}, function (e) {t(e);});}, function (e) {t(e);});})).then(function (e) {n(null, { path: e });}).catch(function (r) {n({ desc: "转base64图片出错.", err: JSON.stringify(r), code: t.TOBASE64.CODE, msg: t.TOBASE64.MSG, src: e }, null);}) : n({ desc: "下载失败.", err: JSON.stringify(r), code: t.GETIMG.CODE, msg: t.GETIMG.MSG, src: e }, null);}).start();}}(t, r, i) : function (e, t, n) {uni.getImageInfo({ src: e, fail: function fail(r) {n({ desc: "图片下载失败.", err: JSON.stringify(r), code: t.GETIMG.CODE, msg: t.GETIMG.MSG, src: e }, null);}, success: function success(e) {n(null, e);} });}(t, r, i);};var G = function (e) {!function (e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && C(e, t);}(i, e);var t,n,r = (t = i, n = function () {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}(), function () {var e,r = F(t);if (n) {var i = F(this).constructor;e = Reflect.construct(r, arguments, i);} else e = r.apply(this, arguments);return A(this, e);});function i(e) {var t;if (function (e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}(this, i), !c.isObject(e)) return console.error("参数错误，参数必须是对象！"), A(t);var n = function (e) {for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {n[r - 1] = arguments[r];}var i = [].concat(n);return 0 == i.length || i.forEach(function (t, n) {for (var r in t) {e[r] = t[r];}}), e;}({}, a, s, l, e);return (t = r.call(this, n, { platform: D, canvasApi: P, canvasCtxApi: E })).options = n, t.canvas(), A(t, R(t));}return i;}(w);}, 306: function _(e) {e.exports = JSON.parse('{"name":"canvas-poster-sprite","version":"1.0.5","description":"A poster plugin that can draw texts, paths and pictures to canvas, and export picture data.","main":"dis/web-canvas-poster-sprite.js","directories":{"example":"examples"},"scripts":{"my-build":"node build/my-build.js","qq-build":"node build/qq-build.js","swan-build":"node build/swan-build.js","tt-build":"node build/tt-build.js","uni-build":"node build/uni-build.js","web-build":"node build/web-build.js","wx-build":"node build/wx-build.js","pack":"webpack --config webpack.config.js","build":"node --max_semi_space_size=64 build/build.js","test":"echo \\"Error: no test specified\\" && exit 1"},"keywords":["canvas","poster","sprite"],"author":"小小咖","email":"466102061@qq.com","license":"MIT","devDependencies":{"@babel/core":"^7.12.10","@babel/preset-env":"^7.12.11","babel-loader":"^8.2.2","chalk":"^4.1.0","ora":"^5.3.0","rimraf":"^3.0.2","webpack":"^5.17.0","webpack-cli":"^4.4.0"}}');} },t = {};function n(r) {if (t[r]) return t[r].exports;var i = t[r] = { exports: {} };return e[r](i, i.exports, n), i.exports;}return n.d = function (e, t) {for (var r in t) {n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });}}, n.o = function (e, t) {return Object.prototype.hasOwnProperty.call(e, t);}, n.r = function (e) {"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });}, n(691);}();});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** D:/uniapp/魔域/store/mutations-type.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SET_SESSIONID = void 0; // mutation 常量

var SET_SESSIONID = 'SET_SESSIONID';exports.SET_SESSIONID = SET_SESSIONID;

/***/ }),

/***/ 161:
/*!**************************************************!*\
  !*** D:/uniapp/魔域/components/lw-notice/icons.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'aixin': "\uE8AB",
  'rules': "\uE909",
  'sound': "\uE8EA",
  'arrowright': "\uEE02" };exports.default = _default;

/***/ }),

/***/ 17:
/*!**********************************!*\
  !*** D:/uniapp/魔域/utils/auth.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getToken = getToken;exports.setToken = setToken;exports.removeToken = removeToken;exports.getUserInfo = getUserInfo;exports.setUserInfo = setUserInfo;exports.removeUserInfo = removeUserInfo;var TokenKey = 'session_id';
var UserIdKey = 'moyu_userInfo';

// 认证令牌
function getToken() {
  return uni.getStorageSync(TokenKey);
}

function setToken(token) {
  console.log(token, 'token');
  return uni.setStorageSync(TokenKey, token);
}

function removeToken() {
  return uni.removeStorageSync(TokenKey);
}

// 认证令牌
function getUserInfo() {
  return uni.getStorageSync(UserIdKey);
}

function setUserInfo(userInfo) {
  return uni.setStorageSync(UserIdKey, userInfo);
}

function removeUserInfo() {
  return uni.removeStorageSync(UserIdKey);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 18:
/*!*************************************!*\
  !*** D:/uniapp/魔域/store/actions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.setSessionId = void 0;


var types = _interopRequireWildcard(__webpack_require__(/*! ./mutations-type.js */ 16));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} // 根级别的 action
// 封装复杂的 mutations
// 更新SessionId
var setSessionId = function setSessionId(_ref, SessionId) {var commit = _ref.commit;
  commit(types.SET_SESSIONID, SessionId);
};exports.setSessionId = setSessionId;

/***/ }),

/***/ 19:
/*!*************************************!*\
  !*** D:/uniapp/魔域/store/getters.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.sessionId = void 0;var _auth = __webpack_require__(/*! @/utils/auth */ 17);


var sessionId = function sessionId(state) {return (0, _auth.getToken)();};exports.sessionId = sessionId;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"魔域","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"魔域","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"魔域","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"魔域","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 34:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 35);

/***/ }),

/***/ 35:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 36);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 36:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 37:
/*!********************************!*\
  !*** D:/uniapp/魔域/api/user.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;exports.getBanner = getBanner;exports.GetList = GetList;exports.updateList = updateList;exports.addList = addList;exports.listMessF = listMessF;exports.getOpenid = getOpenid;exports.collAdd = collAdd;exports.collDelete = collDelete;exports.public_update = public_update;exports.collQuery = collQuery;exports.getBarCode = getBarCode;exports.UpdateObj = UpdateObj;exports.qiniuyun = qiniuyun;
var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request */ 38));
var _utils = __webpack_require__(/*! @/utils */ 39);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引用网络请求中间件
/**
 *   登录
 */
function login(params) {
  return (0, _request.default)({
    url: '/login' + (0, _utils.formatParams)(params),
    method: 'GET' });

}

/**
   *   轮播图查询
   */
function getBanner(params) {
  return (0, _request.default)({
    url: '/pics/query' + (0, _utils.formatParams)(params),
    method: 'GET' });

}

/**
   * 商品查询
   * @param {} loginData 
   */
function GetList(params) {
  return (0, _request.default)({
    url: '/goods/query' + (0, _utils.formatParams)(params),
    method: 'GET' });

}
/**
   * 商品新增
   * @param {} loginData 
   */
function updateList(js_code) {
  return (0, _request.default)({
    url: '/goods/update',
    method: 'post',
    data: js_code });

}
function addList(js_code) {
  return (0, _request.default)({
    url: '/goods/add',
    method: 'post',
    data: js_code });

}
function listMessF(loginData) {
  return (0, _request.default)({
    url: '/open/listMessF' + (0, _utils.formatParams)(loginData),
    method: 'GET' });

}

function getOpenid(js_code) {
  return (0, _request.default)({
    url: '/coll/openid' + (0, _utils.formatParams)(js_code),
    method: 'GET' });

}
function collAdd(js_code) {
  return (0, _request.default)({
    url: '/coll/add',
    method: 'POST',
    data: js_code });

}
function collDelete(js_code) {
  return (0, _request.default)({
    url: '/coll/del',
    method: 'POST',
    data: js_code });

}
function public_update(js_code) {
  return (0, _request.default)({
    url: '/goods/public_update' + (0, _utils.formatParams)(js_code),
    method: 'GET' });

}
function collQuery(js_code) {
  return (0, _request.default)({
    url: '/coll/query' + (0, _utils.formatParams)(js_code),
    method: 'GET' });

}

//获取二维码参数
function getBarCode(js_code) {
  return (0, _request.default)({
    url: '/token/getBarCode' + (0, _utils.formatParams)(js_code),
    method: 'get' });

}
function UpdateObj(js_code) {
  return (0, _request.default)({
    url: '/goods/update',
    method: 'POST',
    data: js_code });

}
function qiniuyun() {
  return (0, _request.default)({
    url: '/token/get',
    method: 'get' });

}

/***/ }),

/***/ 38:
/*!*************************************!*\
  !*** D:/uniapp/魔域/utils/request.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _auth = __webpack_require__(/*! @/utils/auth */ 17);





var _index = __webpack_require__(/*! @/utils/index.js */ 39);


var _config = _interopRequireDefault(__webpack_require__(/*! @/utils/config */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function service() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options.url = "".concat(_config.default.baseUrl).concat(options.url);
  // 判断本地是否存在token，如果存在则带上请求头
  var params = {
    'content-type': 'application/json' };

  if ((0, _auth.getToken)()) {

    Object.assign(params, {
      'session_id': "".concat((0, _auth.getToken)()) // 这里是token(可自行修改)
      ,
      'Authorization': "".concat((0, _auth.getToken)()) });


  }
  options.header = params;
  return new Promise(function (resolved, rejected) {
    options.success = function (res) {
      // 如果请求回来的状态码不是200则执行以下操作
      console.log('如果请求回来的状态码不是', res, res.data.res);
      resolved(res.data);
    };
    options.fail = function (err) {
      // 请求失败弹窗
      uni.showToast({
        icon: 'none',
        duration: 3000,
        title: '服务器错误,请稍后再试' });

      rejected(err);
    };
    uni.request(options);
  });
}var _default =

service;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 39:
/*!***********************************!*\
  !*** D:/uniapp/魔域/utils/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.formatParams = exports.deepClone = exports.isLogin = exports.msg = exports.throttle = exports.debounce = void 0;var _debounceTimeout = null,
_throttleRunning = false;

/**
                           * 防抖
                           * @param {Function} 执行函数
                           * @param {Number} delay 延时ms
                           */
var debounce = function debounce(fn) {var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  clearTimeout(_debounceTimeout);
  _debounceTimeout = setTimeout(function () {
    fn();
  }, delay);
};
/**
    * 节流
    * @param {Function} 执行函数
    * @param {Number} delay 延时ms
    */exports.debounce = debounce;
var throttle = function throttle(fn) {var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  console.log(fn);
  if (_throttleRunning) {
    return;
  }
  _throttleRunning = true;
  fn();
  setTimeout(function () {
    _throttleRunning = false;
  }, delay);
};
/**
    * toast
    */exports.throttle = throttle;
var msg = function msg() {var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!title) return;
  uni.showToast({
    title: title,
    duration: param.duration || 1500,
    mask: param.mask || false,
    icon: param.icon || 'none' });

};
/**
    * 检查登录
    * @return {Boolean}
    */exports.msg = msg;
var isLogin = function isLogin() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var userInfo = uni.getStorageSync('userInfo');
  if (userInfo) {
    return true;
  }
  if (options.nav !== false) {
    uni.navigateTo({
      url: '/pages/oyyl-index/login' });

  }
  return false;
};
/**
    * 深克隆
    */exports.isLogin = isLogin;
var deepClone = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};exports.deepClone = deepClone;


var formatParams = function formatParams(params) {
  var encodeURIComponentKey = ['carNumber1'];
  var str = '';
  var arr = [];
  console.log('params', params);
  for (var key in params) {
    if (encodeURIComponentKey.includes(key)) {
      arr.push("".concat(key, "=").concat(encodeURIComponent(params[key])));
    } else {
      arr.push("".concat(key, "=").concat(params[key]));
    }
  }
  console.log(arr);
  str = arr.join('&');
  if (arr.length) {
    return '?' + str;
  } else {
    return '';
  }
};exports.formatParams = formatParams;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 40:
/*!************************************!*\
  !*** D:/uniapp/魔域/utils/config.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 变量可自行添加修改
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { //存放变量的容器
  appid: '****',
  // baseUrl: 'http://www.e-dog.com.cn/ev_power_exchange_robot',
  baseUrl: 'https://guoxyu.top/wxmoyu'
  // baseUrl:'http://gbt.free.idcfengye.com/wxmoyu'
};
/**
    * 	appid : 		小程序appid
    *  baseUrl : 		服务端域名
    */exports.default = _default;

/***/ }),

/***/ 5:
/*!*******************************!*\
  !*** D:/uniapp/魔域/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 57:
/*!*****************************************!*\
  !*** D:/uniapp/魔域/utils/image-tools.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function dataUrlToBase64(str) {
  var array = str.split(',');
  return array[array.length - 1];
}

var index = 0;
function getNewFileId() {
  return Date.now() + String(index++);
}

function biggerThan(v1, v2) {
  var v1Array = v1.split('.');
  var v2Array = v2.split('.');
  var update = false;
  for (var index = 0; index < v2Array.length; index++) {
    var diff = v1Array[index] - v2Array[index];
    if (diff !== 0) {
      update = diff > 0;
      break;
    }
  }
  return update;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = getNewFileId() + '.' + extName;
    if (typeof plus === 'object') {
      var basePath = '_doc';
      var dirPath = 'uniapp_temp';
      var filePath = basePath + '/' + dirPath + '/' + fileName;
      if (!biggerThan(plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472', plus.runtime.innerVersion)) {
        plus.io.resolveLocalFileSystemURL(basePath, function (entry) {
          entry.getDirectory(dirPath, {
            create: true,
            exclusive: false },
          function (entry) {
            entry.getFile(fileName, {
              create: true,
              exclusive: false },
            function (entry) {
              entry.createWriter(function (writer) {
                writer.onwrite = function () {
                  resolve(filePath);
                };
                writer.onerror = reject;
                writer.seek(0);
                writer.writeAsBinary(dataUrlToBase64(base64));
              }, reject);
            }, reject);
          }, reject);
        }, reject);
        return;
      }
      var bitmap = new plus.nativeObj.Bitmap(fileName);
      bitmap.loadBase64Data(base64, function () {
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: dataUrlToBase64(base64),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ }),

/***/ 58:
/*!**********************************!*\
  !*** D:/uniapp/魔域/utils/upng.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.upng = void 0;var UPNG = {};


var pako = __webpack_require__(/*! ./pako.min.js */ 59);
console.log(pako);
UPNG.toRGBA8 = function (out) {
  var w = out.width,
  h = out.height;
  if (out.tabs.acTL == null) return [UPNG.toRGBA8.decodeImage(out.data, w, h, out).buffer];

  var frms = [];
  if (out.frames[0].data == null) out.frames[0].data = out.data;

  var len = w * h * 4,
  img = new Uint8Array(len),
  empty = new Uint8Array(len),
  prev = new Uint8Array(len);
  for (var i = 0; i < out.frames.length; i++) {
    var frm = out.frames[i];
    var fx = frm.rect.x,
    fy = frm.rect.y,
    fw = frm.rect.width,
    fh = frm.rect.height;
    var fdata = UPNG.toRGBA8.decodeImage(frm.data, fw, fh, out);

    if (i != 0)
    for (var j = 0; j < len; j++) {prev[j] = img[j];}

    if (frm.blend == 0) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);else
    if (frm.blend == 1) UPNG._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);

    frms.push(img.buffer.slice(0));

    if (frm.dispose == 0) {} else if (frm.dispose == 1) UPNG._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);else
    if (frm.dispose == 2)
    for (var j = 0; j < len; j++) {img[j] = prev[j];}
  }
  return frms;
};
UPNG.toRGBA8.decodeImage = function (data, w, h, out) {
  var area = w * h,
  bpp = UPNG.decode._getBPP(out);
  var bpl = Math.ceil(w * bpp / 8); // bytes per line

  var bf = new Uint8Array(area * 4),
  bf32 = new Uint32Array(bf.buffer);
  var ctype = out.ctype,
  depth = out.depth;
  var rs = UPNG._bin.readUshort;

  //console.log(ctype, depth);
  var time = Date.now();

  if (ctype == 6) {// RGB + alpha
    var qarea = area << 2;
    if (depth == 8)
    for (var i = 0; i < qarea; i += 4) {
      bf[i] = data[i];
      bf[i + 1] = data[i + 1];
      bf[i + 2] = data[i + 2];
      bf[i + 3] = data[i + 3];
    }
    if (depth == 16)
    for (var i = 0; i < qarea; i++) {
      bf[i] = data[i << 1];
    }
  } else if (ctype == 2) {// RGB
    var ts = out.tabs["tRNS"];
    if (ts == null) {
      if (depth == 8)
      for (var i = 0; i < area; i++) {
        var ti = i * 3;
        bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
      }
      if (depth == 16)
      for (var i = 0; i < area; i++) {
        var ti = i * 6;
        bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
      }
    } else {
      var tr = ts[0],
      tg = ts[1],
      tb = ts[2];
      if (depth == 8)
      for (var i = 0; i < area; i++) {
        var qi = i << 2,
        ti = i * 3;
        bf32[i] = 255 << 24 | data[ti + 2] << 16 | data[ti + 1] << 8 | data[ti];
        if (data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb) bf[qi + 3] = 0;
      }
      if (depth == 16)
      for (var i = 0; i < area; i++) {
        var qi = i << 2,
        ti = i * 6;
        bf32[i] = 255 << 24 | data[ti + 4] << 16 | data[ti + 2] << 8 | data[ti];
        if (rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb) bf[qi + 3] = 0;
      }
    }
  } else if (ctype == 3) {// palette
    var p = out.tabs["PLTE"],
    ap = out.tabs["tRNS"],
    tl = ap ? ap.length : 0;
    //console.log(p, ap);
    if (depth == 1)
    for (var y = 0; y < h; y++) {
      var s0 = y * bpl,
      t0 = y * w;
      for (var i = 0; i < w; i++) {
        var qi = t0 + i << 2,
        j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1,
        cj = 3 * j;
        bf[qi] = p[cj];
        bf[qi + 1] = p[cj + 1];
        bf[qi + 2] = p[cj + 2];
        bf[qi + 3] = j < tl ? ap[j] : 255;
      }
    }
    if (depth == 2)
    for (var y = 0; y < h; y++) {
      var s0 = y * bpl,
      t0 = y * w;
      for (var i = 0; i < w; i++) {
        var qi = t0 + i << 2,
        j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3,
        cj = 3 * j;
        bf[qi] = p[cj];
        bf[qi + 1] = p[cj + 1];
        bf[qi + 2] = p[cj + 2];
        bf[qi + 3] = j < tl ? ap[j] : 255;
      }
    }
    if (depth == 4)
    for (var y = 0; y < h; y++) {
      var s0 = y * bpl,
      t0 = y * w;
      for (var i = 0; i < w; i++) {
        var qi = t0 + i << 2,
        j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15,
        cj = 3 * j;
        bf[qi] = p[cj];
        bf[qi + 1] = p[cj + 1];
        bf[qi + 2] = p[cj + 2];
        bf[qi + 3] = j < tl ? ap[j] : 255;
      }
    }
    if (depth == 8)
    for (var i = 0; i < area; i++) {
      var qi = i << 2,
      j = data[i],
      cj = 3 * j;
      bf[qi] = p[cj];
      bf[qi + 1] = p[cj + 1];
      bf[qi + 2] = p[cj + 2];
      bf[qi + 3] = j < tl ? ap[j] : 255;
    }
  } else if (ctype == 4) {// gray + alpha
    if (depth == 8)
    for (var i = 0; i < area; i++) {
      var qi = i << 2,
      di = i << 1,
      gr = data[di];
      bf[qi] = gr;
      bf[qi + 1] = gr;
      bf[qi + 2] = gr;
      bf[qi + 3] = data[di + 1];
    }
    if (depth == 16)
    for (var i = 0; i < area; i++) {
      var qi = i << 2,
      di = i << 2,
      gr = data[di];
      bf[qi] = gr;
      bf[qi + 1] = gr;
      bf[qi + 2] = gr;
      bf[qi + 3] = data[di + 2];
    }
  } else if (ctype == 0) {// gray
    var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
    for (var y = 0; y < h; y++) {
      var off = y * bpl,
      to = y * w;
      if (depth == 1)
      for (var x = 0; x < w; x++) {
        var gr = 255 * (data[off + (x >>> 3)] >>> 7 - (x & 7) & 1),
        al = gr == tr * 255 ? 0 : 255;
        bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
      } else
      if (depth == 2)
      for (var x = 0; x < w; x++) {
        var gr = 85 * (data[off + (x >>> 2)] >>> 6 - ((x & 3) << 1) & 3),
        al = gr == tr * 85 ? 0 : 255;
        bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
      } else
      if (depth == 4)
      for (var x = 0; x < w; x++) {
        var gr = 17 * (data[off + (x >>> 1)] >>> 4 - ((x & 1) << 2) & 15),
        al = gr == tr * 17 ? 0 : 255;
        bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
      } else
      if (depth == 8)
      for (var x = 0; x < w; x++) {
        var gr = data[off + x],
        al = gr == tr ? 0 : 255;
        bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
      } else
      if (depth == 16)
      for (var x = 0; x < w; x++) {
        var gr = data[off + (x << 1)],
        al = rs(data, off + (x << 1)) == tr ? 0 : 255;
        bf32[to + x] = al << 24 | gr << 16 | gr << 8 | gr;
      }
    }
  }
  //console.log(Date.now()-time);
  return bf;
};



UPNG.decode = function (buff) {
  var data = new Uint8Array(buff),
  offset = 8,
  bin = UPNG._bin,
  rUs = bin.readUshort,
  rUi = bin.readUint;
  var out = {
    tabs: {},
    frames: [] };

  var dd = new Uint8Array(data.length),
  doff = 0; // put all IDAT data into it
  var fd,foff = 0; // frames

  var mgck = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (var i = 0; i < 8; i++) {
    if (data[i] != mgck[i]) throw "The input is not a PNG file!";}

  while (offset < data.length) {
    var len = bin.readUint(data, offset);
    offset += 4;
    var type = bin.readASCII(data, offset, 4);
    offset += 4;
    //console.log(type,len);

    if (type == "IHDR") {
      UPNG.decode._IHDR(data, offset, out);
    } else if (type == "CgBI") {
      out.tabs[type] = data.slice(offset, offset + 4);
    } else if (type == "IDAT") {
      for (var i = 0; i < len; i++) {dd[doff + i] = data[offset + i];}
      doff += len;
    } else if (type == "acTL") {
      out.tabs[type] = {
        num_frames: rUi(data, offset),
        num_plays: rUi(data, offset + 4) };

      fd = new Uint8Array(data.length);
    } else if (type == "fcTL") {
      if (foff != 0) {
        var fr = out.frames[out.frames.length - 1];
        fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
        foff = 0;
      }
      var rct = {
        x: rUi(data, offset + 12),
        y: rUi(data, offset + 16),
        width: rUi(data, offset + 4),
        height: rUi(data, offset + 8) };

      var del = rUs(data, offset + 22);
      del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
      var frm = {
        rect: rct,
        delay: Math.round(del * 1000),
        dispose: data[offset + 24],
        blend: data[offset + 25] };

      //console.log(frm);
      out.frames.push(frm);
    } else if (type == "fdAT") {
      for (var i = 0; i < len - 4; i++) {fd[foff + i] = data[offset + i + 4];}
      foff += len - 4;
    } else if (type == "pHYs") {
      out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
    } else if (type == "cHRM") {
      out.tabs[type] = [];
      for (var i = 0; i < 8; i++) {out.tabs[type].push(bin.readUint(data, offset + i * 4));}
    } else if (type == "tEXt" || type == "zTXt") {
      if (out.tabs[type] == null) out.tabs[type] = {};
      var nz = bin.nextZero(data, offset);
      var keyw = bin.readASCII(data, offset, nz - offset);
      var text,tl = offset + len - nz - 1;
      if (type == "tEXt") text = bin.readASCII(data, nz + 1, tl);else
      {
        var bfr = UPNG.decode._inflate(data.slice(nz + 2, nz + 2 + tl));
        text = bin.readUTF8(bfr, 0, bfr.length);
      }
      out.tabs[type][keyw] = text;
    } else if (type == "iTXt") {
      if (out.tabs[type] == null) out.tabs[type] = {};
      var nz = 0,
      off = offset;
      nz = bin.nextZero(data, off);
      var keyw = bin.readASCII(data, off, nz - off);
      off = nz + 1;
      var cflag = data[off],
      cmeth = data[off + 1];
      off += 2;
      nz = bin.nextZero(data, off);
      var ltag = bin.readASCII(data, off, nz - off);
      off = nz + 1;
      nz = bin.nextZero(data, off);
      var tkeyw = bin.readUTF8(data, off, nz - off);
      off = nz + 1;
      var text,tl = len - (off - offset);
      if (cflag == 0) text = bin.readUTF8(data, off, tl);else
      {
        var bfr = UPNG.decode._inflate(data.slice(off, off + tl));
        text = bin.readUTF8(bfr, 0, bfr.length);
      }
      out.tabs[type][keyw] = text;
    } else if (type == "PLTE") {
      out.tabs[type] = bin.readBytes(data, offset, len);
    } else if (type == "hIST") {
      var pl = out.tabs["PLTE"].length / 3;
      out.tabs[type] = [];
      for (var i = 0; i < pl; i++) {out.tabs[type].push(rUs(data, offset + i * 2));}
    } else if (type == "tRNS") {
      if (out.ctype == 3) out.tabs[type] = bin.readBytes(data, offset, len);else
      if (out.ctype == 0) out.tabs[type] = rUs(data, offset);else
      if (out.ctype == 2) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset +
      4)];
      //else console.log("tRNS for unsupported color type",out.ctype, len);
    } else if (type == "gAMA") out.tabs[type] = bin.readUint(data, offset) / 100000;else
    if (type == "sRGB") out.tabs[type] = data[offset];else
    if (type == "bKGD") {
      if (out.ctype == 0 || out.ctype == 4) out.tabs[type] = [rUs(data, offset)];else
      if (out.ctype == 2 || out.ctype == 6) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2),
      rUs(data, offset + 4)];else

      if (out.ctype == 3) out.tabs[type] = data[offset];
    } else if (type == "IEND") {
      break;
    }
    //else {  console.log("unknown chunk type", type, len);  out.tabs[type]=data.slice(offset,offset+len);  }
    offset += len;
    var crc = bin.readUint(data, offset);
    offset += 4;
  }
  if (foff != 0) {
    var fr = out.frames[out.frames.length - 1];
    fr.data = UPNG.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
  }
  out.data = UPNG.decode._decompress(out, dd, out.width, out.height);

  delete out.compress;
  delete out.interlace;
  delete out.filter;
  return out;
};

UPNG.decode._decompress = function (out, dd, w, h) {
  var time = Date.now();
  var bpp = UPNG.decode._getBPP(out),
  bpl = Math.ceil(w * bpp / 8),
  buff = new Uint8Array((bpl + 1 + out.interlace) * h);
  if (out.tabs["CgBI"]) dd = UPNG.inflateRaw(dd, buff);else
  dd = UPNG.decode._inflate(dd, buff);
  //console.log(dd.length, buff.length);
  //console.log(Date.now()-time);

  var time = Date.now();
  if (out.interlace == 0) dd = UPNG.decode._filterZero(dd, out, 0, w, h);else
  if (out.interlace == 1) dd = UPNG.decode._readInterlace(dd, out);
  //console.log(Date.now()-time);
  return dd;
};

UPNG.decode._inflate = function (data, buff) {
  var out = UPNG["inflateRaw"](new Uint8Array(data.buffer, 2, data.length - 6), buff);
  return out;
};
UPNG.inflateRaw = function () {
  var H = {};
  H.H = {};
  H.H.N = function (N, W) {
    var R = Uint8Array,
    i = 0,
    m = 0,
    J = 0,
    h = 0,
    Q = 0,
    X = 0,
    u = 0,
    w = 0,
    d = 0,
    v,C;
    if (N[0] == 3 && N[1] == 0) return W ? W : new R(0);
    var V = H.H,
    n = V.b,
    A = V.e,
    l = V.R,
    M = V.n,
    I = V.A,
    e = V.Z,
    b = V.m,
    Z = W == null;
    if (Z) W = new R(N.length >>> 2 << 5);
    while (i == 0) {
      i = n(N, d, 1);
      m = n(N, d + 1, 2);
      d += 3;
      if (m == 0) {
        if ((d & 7) != 0) d += 8 - (d & 7);
        var D = (d >>> 3) + 4,
        q = N[D - 4] | N[D - 3] << 8;
        if (Z) W = H.H.W(W, w + q);
        W.set(new R(N.buffer, N.byteOffset + D, q), w);
        d = D + q << 3;
        w += q;
        continue;
      }
      if (Z) W = H.H.W(W, w + (1 << 17));
      if (m == 1) {
        v = b.J;
        C = b.h;
        X = (1 << 9) - 1;
        u = (1 << 5) - 1;
      }
      if (m == 2) {
        J = A(N, d, 5) + 257;
        h = A(N, d + 5, 5) + 1;
        Q = A(N, d + 10, 4) + 4;
        d += 14;
        var E = d,
        j = 1;
        for (var c = 0; c < 38; c += 2) {
          b.Q[c] = 0;
          b.Q[c + 1] = 0;
        }
        for (var c = 0; c < Q; c++) {
          var K = A(N, d + c * 3, 3);
          b.Q[(b.X[c] << 1) + 1] = K;
          if (K > j) j = K;
        }
        d += 3 * Q;
        M(b.Q, j);
        I(b.Q, j, b.u);
        v = b.w;
        C = b.d;
        d = l(b.u, (1 << j) - 1, J + h, N, d, b.v);
        var r = V.V(b.v, 0, J, b.C);
        X = (1 << r) - 1;
        var S = V.V(b.v, J, h, b.D);
        u = (1 << S) - 1;
        M(b.C, r);
        I(b.C, r, v);
        M(b.D, S);
        I(b.D, S, C);
      }
      while (!0) {
        var T = v[e(N, d) & X];
        d += T & 15;
        var p = T >>> 4;
        if (p >>> 8 == 0) {
          W[w++] = p;
        } else if (p == 256) {
          break;
        } else {
          var z = w + p - 254;
          if (p > 264) {
            var _ = b.q[p - 257];
            z = w + (_ >>> 3) + A(N, d, _ & 7);
            d += _ & 7;
          }
          var $ = C[e(N, d) & u];
          d += $ & 15;
          var s = $ >>> 4,
          Y = b.c[s],
          a = (Y >>> 4) + n(N, d, Y & 15);
          d += Y & 15;
          while (w < z) {
            W[w] = W[w++ - a];
            W[w] = W[w++ - a];
            W[w] = W[w++ - a];
            W[w] = W[w++ - a];
          }
          w = z;
        }
      }
    }
    return W.length == w ? W : W.slice(0, w);
  };
  H.H.W = function (N, W) {
    var R = N.length;
    if (W <= R) return N;
    var V = new Uint8Array(R << 1);
    V.set(N, 0);
    return V;
  };
  H.H.R = function (N, W, R, V, n, A) {
    var l = H.H.e,
    M = H.H.Z,
    I = 0;
    while (I < R) {
      var e = N[M(V, n) & W];
      n += e & 15;
      var b = e >>> 4;
      if (b <= 15) {
        A[I] = b;
        I++;
      } else {
        var Z = 0,
        m = 0;
        if (b == 16) {
          m = 3 + l(V, n, 2);
          n += 2;
          Z = A[I - 1];
        } else if (b == 17) {
          m = 3 + l(V, n, 3);
          n += 3;
        } else if (b == 18) {
          m = 11 + l(V, n, 7);
          n += 7;
        }
        var J = I + m;
        while (I < J) {
          A[I] = Z;
          I++;
        }
      }
    }
    return n;
  };
  H.H.V = function (N, W, R, V) {
    var n = 0,
    A = 0,
    l = V.length >>> 1;
    while (A < R) {
      var M = N[A + W];
      V[A << 1] = 0;
      V[(A << 1) + 1] = M;
      if (M > n) n = M;
      A++;
    }
    while (A < l) {
      V[A << 1] = 0;
      V[(A << 1) + 1] = 0;
      A++;
    }
    return n;
  };
  H.H.n = function (N, W) {
    var R = H.H.m,
    V = N.length,
    n,A,l,M,I,e = R.j;
    for (var M = 0; M <= W; M++) {e[M] = 0;}
    for (M = 1; M < V; M += 2) {e[N[M]]++;}
    var b = R.K;
    n = 0;
    e[0] = 0;
    for (A = 1; A <= W; A++) {
      n = n + e[A - 1] << 1;
      b[A] = n;
    }
    for (l = 0; l < V; l += 2) {
      I = N[l + 1];
      if (I != 0) {
        N[l] = b[I];
        b[I]++;
      }
    }
  };
  H.H.A = function (N, W, R) {
    var V = N.length,
    n = H.H.m,
    A = n.r;
    for (var l = 0; l < V; l += 2) {
      if (N[l + 1] != 0) {
        var M = l >> 1,
        I = N[l + 1],
        e = M << 4 | I,
        b = W - I,
        Z = N[l] << b,
        m = Z + (1 << b);
        while (Z != m) {
          var J = A[Z] >>> 15 - W;
          R[J] = e;
          Z++;
        }
      }}
  };
  H.H.l = function (N, W) {
    var R = H.H.m.r,
    V = 15 - W;
    for (var n = 0; n < N.length; n += 2) {
      var A = N[n] << W - N[n + 1];
      N[n] = R[A] >>> V;
    }
  };
  H.H.M = function (N, W, R) {
    R = R << (W & 7);
    var V = W >>> 3;
    N[V] |= R;
    N[V + 1] |= R >>> 8;
  };
  H.H.I = function (N, W, R) {
    R = R << (W & 7);
    var V = W >>> 3;
    N[V] |= R;
    N[V + 1] |= R >>> 8;
    N[V + 2] |= R >>> 16;
  };
  H.H.e = function (N, W, R) {
    return (N[W >>> 3] | N[(W >>> 3) + 1] << 8) >>> (W & 7) & (1 << R) - 1;
  };
  H.H.b = function (N, W, R) {
    return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7) & (1 << R) - 1;
  };
  H.H.Z = function (N, W) {
    return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16) >>> (W & 7);
  };
  H.H.i = function (N, W) {
    return (N[W >>> 3] | N[(W >>> 3) + 1] << 8 | N[(W >>> 3) + 2] << 16 | N[(W >>> 3) + 3] << 24) >>> (W &
    7);
  };
  H.H.m = function () {
    var N = Uint16Array,
    W = Uint32Array;
    return {
      K: new N(16),
      j: new N(16),
      X: [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      S: [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131,
      163, 195, 227, 258, 999, 999, 999],

      T: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0],
      q: new N(32),
      p: [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049,
      3073, 4097, 6145, 8193, 12289, 16385, 24577, 65535, 65535],

      z: [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13,
      13, 0, 0],

      c: new W(32),
      J: new N(512),
      _: [],
      h: new N(32),
      $: [],
      w: new N(32768),
      C: [],
      v: [],
      d: new N(32768),
      D: [],
      u: new N(512),
      Q: [],
      r: new N(1 << 15),
      s: new W(286),
      Y: new W(30),
      a: new W(19),
      t: new W(15e3),
      k: new N(1 << 16),
      g: new N(1 << 15) };

  }();
  (function () {
    var N = H.H.m,
    W = 1 << 15;
    for (var R = 0; R < W; R++) {
      var V = R;
      V = (V & 2863311530) >>> 1 | (V & 1431655765) << 1;
      V = (V & 3435973836) >>> 2 | (V & 858993459) << 2;
      V = (V & 4042322160) >>> 4 | (V & 252645135) << 4;
      V = (V & 4278255360) >>> 8 | (V & 16711935) << 8;
      N.r[R] = (V >>> 16 | V << 16) >>> 17;
    }

    function n(A, l, M) {
      while (l-- != 0) {A.push(0, M);}
    }
    for (var R = 0; R < 32; R++) {
      N.q[R] = N.S[R] << 3 | N.T[R];
      N.c[R] = N.p[R] << 4 | N.z[R];
    }
    n(N._, 144, 8);
    n(N._, 255 - 143, 9);
    n(N._, 279 - 255, 7);
    n(N._, 287 - 279, 8);
    H.H.n(N._, 9);
    H.H.A(N._, 9, N.J);
    H.H.l(N._, 9);
    n(N.$, 32, 5);
    H.H.n(N.$, 5);
    H.H.A(N.$, 5, N.h);
    H.H.l(N.$, 5);
    n(N.Q, 19, 0);
    n(N.C, 286, 0);
    n(N.D, 30, 0);
    n(N.v, 320, 0);
  })();
  return H.H.N;
}();


UPNG.decode._readInterlace = function (data, out) {
  var w = out.width,
  h = out.height;
  var bpp = UPNG.decode._getBPP(out),
  cbpp = bpp >> 3,
  bpl = Math.ceil(w * bpp / 8);
  var img = new Uint8Array(h * bpl);
  var di = 0;

  var starting_row = [0, 0, 4, 0, 2, 0, 1];
  var starting_col = [0, 4, 0, 2, 0, 1, 0];
  var row_increment = [8, 8, 8, 4, 4, 2, 2];
  var col_increment = [8, 8, 4, 4, 2, 2, 1];

  var pass = 0;
  while (pass < 7) {
    var ri = row_increment[pass],
    ci = col_increment[pass];
    var sw = 0,
    sh = 0;
    var cr = starting_row[pass];
    while (cr < h) {
      cr += ri;
      sh++;
    }
    var cc = starting_col[pass];
    while (cc < w) {
      cc += ci;
      sw++;
    }
    var bpll = Math.ceil(sw * bpp / 8);
    UPNG.decode._filterZero(data, out, di, sw, sh);

    var y = 0,
    row = starting_row[pass];
    while (row < h) {
      var col = starting_col[pass];
      var cdi = di + y * bpll << 3;

      while (col < w) {
        if (bpp == 1) {
          var val = data[cdi >> 3];
          val = val >> 7 - (cdi & 7) & 1;
          img[row * bpl + (col >> 3)] |= val << 7 - ((col & 7) << 0);
        }
        if (bpp == 2) {
          var val = data[cdi >> 3];
          val = val >> 6 - (cdi & 7) & 3;
          img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
        }
        if (bpp == 4) {
          var val = data[cdi >> 3];
          val = val >> 4 - (cdi & 7) & 15;
          img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
        }
        if (bpp >= 8) {
          var ii = row * bpl + col * cbpp;
          for (var j = 0; j < cbpp; j++) {img[ii + j] = data[(cdi >> 3) + j];}
        }
        cdi += bpp;
        col += ci;
      }
      y++;
      row += ri;
    }
    if (sw * sh != 0) di += sh * (1 + bpll);
    pass = pass + 1;
  }
  return img;
};

UPNG.decode._getBPP = function (out) {
  var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
  return noc * out.depth;
};

UPNG.decode._filterZero = function (data, out, off, w, h) {
  var bpp = UPNG.decode._getBPP(out),
  bpl = Math.ceil(w * bpp / 8),
  paeth = UPNG.decode._paeth;
  bpp = Math.ceil(bpp / 8);

  var i,di,type = data[off],
  x = 0;

  if (type > 1) data[off] = [0, 0, 1][type - 2];
  if (type == 3)
  for (x = bpp; x < bpl; x++) {data[x + 1] = data[x + 1] + (data[x + 1 - bpp] >>> 1) & 255;}

  for (var y = 0; y < h; y++) {
    i = off + y * bpl;
    di = i + y + 1;
    type = data[di - 1];
    x = 0;

    if (type == 0)
    for (; x < bpl; x++) {data[i + x] = data[di + x];} else
    if (type == 1) {
      for (; x < bpp; x++) {data[i + x] = data[di + x];}
      for (; x < bpl; x++) {data[i + x] = data[di + x] + data[i + x - bpp];}
    } else if (type == 2) {
      for (; x < bpl; x++) {data[i + x] = data[di + x] + data[i + x - bpl];}
    } else if (type == 3) {
      for (; x < bpp; x++) {data[i + x] = data[di + x] + (data[i + x - bpl] >>> 1);}
      for (; x < bpl; x++) {data[i + x] = data[di + x] + (data[i + x - bpl] + data[i + x - bpp] >>> 1);}
    } else {
      for (; x < bpp; x++) {data[i + x] = data[di + x] + paeth(0, data[i + x - bpl], 0);}
      for (; x < bpl; x++) {data[i + x] = data[di + x] + paeth(data[i + x - bpp], data[i + x - bpl], data[i +
        x - bpp - bpl]);}
    }
  }
  return data;
};

UPNG.decode._paeth = function (a, b, c) {
  var p = a + b - c,
  pa = p - a,
  pb = p - b,
  pc = p - c;
  if (pa * pa <= pb * pb && pa * pa <= pc * pc) return a;else
  if (pb * pb <= pc * pc) return b;
  return c;
};

UPNG.decode._IHDR = function (data, offset, out) {
  var bin = UPNG._bin;
  out.width = bin.readUint(data, offset);
  offset += 4;
  out.height = bin.readUint(data, offset);
  offset += 4;
  out.depth = data[offset];
  offset++;
  out.ctype = data[offset];
  offset++;
  out.compress = data[offset];
  offset++;
  out.filter = data[offset];
  offset++;
  out.interlace = data[offset];
  offset++;
};

UPNG._bin = {
  nextZero: function nextZero(data, p) {
    while (data[p] != 0) {p++;}
    return p;
  },
  readUshort: function readUshort(buff, p) {
    return buff[p] << 8 | buff[p + 1];
  },
  writeUshort: function writeUshort(buff, p, n) {
    buff[p] = n >> 8 & 255;
    buff[p + 1] = n & 255;
  },
  readUint: function readUint(buff, p) {
    return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
  },
  writeUint: function writeUint(buff, p, n) {
    buff[p] = n >> 24 & 255;
    buff[p + 1] = n >> 16 & 255;
    buff[p + 2] = n >> 8 & 255;
    buff[p + 3] = n & 255;
  },
  readASCII: function readASCII(buff, p, l) {
    var s = "";
    for (var i = 0; i < l; i++) {s += String.fromCharCode(buff[p + i]);}
    return s;
  },
  writeASCII: function writeASCII(data, p, s) {
    for (var i = 0; i < s.length; i++) {data[p + i] = s.charCodeAt(i);}
  },
  readBytes: function readBytes(buff, p, l) {
    var arr = [];
    for (var i = 0; i < l; i++) {arr.push(buff[p + i]);}
    return arr;
  },
  pad: function pad(n) {
    return n.length < 2 ? "0" + n : n;
  },
  readUTF8: function readUTF8(buff, p, l) {
    var s = "",
    ns;
    for (var i = 0; i < l; i++) {s += "%" + UPNG._bin.pad(buff[p + i].toString(16));}
    try {
      ns = decodeURIComponent(s);
    } catch (e) {
      return UPNG._bin.readASCII(buff, p, l);
    }
    return ns;
  } };

UPNG._copyTile = function (sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
  var w = Math.min(sw, tw),
  h = Math.min(sh, th);
  var si = 0,
  ti = 0;
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      if (xoff >= 0 && yoff >= 0) {
        si = y * sw + x << 2;
        ti = (yoff + y) * tw + xoff + x << 2;
      } else {
        si = (-yoff + y) * sw - xoff + x << 2;
        ti = y * tw + x << 2;
      }

      if (mode == 0) {
        tb[ti] = sb[si];
        tb[ti + 1] = sb[si + 1];
        tb[ti + 2] = sb[si + 2];
        tb[ti + 3] = sb[si + 3];
      } else if (mode == 1) {
        var fa = sb[si + 3] * (1 / 255),
        fr = sb[si] * fa,
        fg = sb[si + 1] * fa,
        fb = sb[si + 2] * fa;
        var ba = tb[ti + 3] * (1 / 255),
        br = tb[ti] * ba,
        bg = tb[ti + 1] * ba,
        bb = tb[ti + 2] * ba;

        var ifa = 1 - fa,
        oa = fa + ba * ifa,
        ioa = oa == 0 ? 0 : 1 / oa;
        tb[ti + 3] = 255 * oa;
        tb[ti + 0] = (fr + br * ifa) * ioa;
        tb[ti + 1] = (fg + bg * ifa) * ioa;
        tb[ti + 2] = (fb + bb * ifa) * ioa;
      } else if (mode == 2) {// copy only differences, otherwise zero
        var fa = sb[si + 3],
        fr = sb[si],
        fg = sb[si + 1],
        fb = sb[si + 2];
        var ba = tb[ti + 3],
        br = tb[ti],
        bg = tb[ti + 1],
        bb = tb[ti + 2];
        if (fa == ba && fr == br && fg == bg && fb == bb) {
          tb[ti] = 0;
          tb[ti + 1] = 0;
          tb[ti + 2] = 0;
          tb[ti + 3] = 0;
        } else {
          tb[ti] = fr;
          tb[ti + 1] = fg;
          tb[ti + 2] = fb;
          tb[ti + 3] = fa;
        }
      } else if (mode == 3) {// check if can be blended
        var fa = sb[si + 3],
        fr = sb[si],
        fg = sb[si + 1],
        fb = sb[si + 2];
        var ba = tb[ti + 3],
        br = tb[ti],
        bg = tb[ti + 1],
        bb = tb[ti + 2];
        if (fa == ba && fr == br && fg == bg && fb == bb) continue;
        //if(fa!=255 && ba!=0) return false;
        if (fa < 220 && ba > 20) return false;
      }
    }}
  return true;
};





UPNG.encode = function (bufs, w, h, ps, dels, tabs, forbidPlte) {
  if (ps == null) ps = 0;
  if (forbidPlte == null) forbidPlte = false;

  var nimg = UPNG.encode.compress(bufs, w, h, ps, [false, false, false, 0, forbidPlte, false]);
  UPNG.encode.compressPNG(nimg, -1);

  return UPNG.encode._main(nimg, w, h, dels, tabs);
};

UPNG.encodeLL = function (bufs, w, h, cc, ac, depth, dels, tabs) {
  var nimg = {
    ctype: 0 + (cc == 1 ? 0 : 2) + (ac == 0 ? 0 : 4),
    depth: depth,
    frames: [] };


  var time = Date.now();
  var bipp = (cc + ac) * depth,
  bipl = bipp * w;
  for (var i = 0; i < bufs.length; i++) {
    nimg.frames.push({
      rect: {
        x: 0,
        y: 0,
        width: w,
        height: h },

      img: new Uint8Array(bufs[i]),
      blend: 0,
      dispose: 1,
      bpp: Math.ceil(bipp / 8),
      bpl: Math.ceil(bipl / 8) });}


  UPNG.encode.compressPNG(nimg, 0, true);

  var out = UPNG.encode._main(nimg, w, h, dels, tabs);
  return out;
};

UPNG.encode._main = function (nimg, w, h, dels, tabs) {
  if (tabs == null) tabs = {};
  var crc = UPNG.crc.crc,
  wUi = UPNG._bin.writeUint,
  wUs = UPNG._bin.writeUshort,
  wAs = UPNG._bin.writeASCII;
  var offset = 8,
  anim = nimg.frames.length > 1,
  pltAlpha = false;

  var leng = 8 + (16 + 5 + 4) /*+ (9+4)*/ + (anim ? 20 : 0);
  if (tabs["sRGB"] != null) leng += 8 + 1 + 4;
  if (tabs["pHYs"] != null) leng += 8 + 9 + 4;
  if (nimg.ctype == 3) {
    var dl = nimg.plte.length;
    for (var i = 0; i < dl; i++) {
      if (nimg.plte[i] >>> 24 != 255) pltAlpha = true;}
    leng += 8 + dl * 3 + 4 + (pltAlpha ? 8 + dl * 1 + 4 : 0);
  }
  for (var j = 0; j < nimg.frames.length; j++) {
    var fr = nimg.frames[j];
    if (anim) leng += 38;
    leng += fr.cimg.length + 12;
    if (j != 0) leng += 4;
  }
  leng += 12;

  var data = new Uint8Array(leng);
  var wr = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (var i = 0; i < 8; i++) {data[i] = wr[i];}

  wUi(data, offset, 13);
  offset += 4;
  wAs(data, offset, "IHDR");
  offset += 4;
  wUi(data, offset, w);
  offset += 4;
  wUi(data, offset, h);
  offset += 4;
  data[offset] = nimg.depth;
  offset++; // depth
  data[offset] = nimg.ctype;
  offset++; // ctype
  data[offset] = 0;
  offset++; // compress
  data[offset] = 0;
  offset++; // filter
  data[offset] = 0;
  offset++; // interlace
  wUi(data, offset, crc(data, offset - 17, 17));
  offset += 4; // crc

  // 13 bytes to say, that it is sRGB
  if (tabs["sRGB"] != null) {
    wUi(data, offset, 1);
    offset += 4;
    wAs(data, offset, "sRGB");
    offset += 4;
    data[offset] = tabs["sRGB"];
    offset++;
    wUi(data, offset, crc(data, offset - 5, 5));
    offset += 4; // crc
  }
  if (tabs["pHYs"] != null) {
    wUi(data, offset, 9);
    offset += 4;
    wAs(data, offset, "pHYs");
    offset += 4;
    wUi(data, offset, tabs["pHYs"][0]);
    offset += 4;
    wUi(data, offset, tabs["pHYs"][1]);
    offset += 4;
    data[offset] = tabs["pHYs"][2];
    offset++;
    wUi(data, offset, crc(data, offset - 13, 13));
    offset += 4; // crc
  }

  if (anim) {
    wUi(data, offset, 8);
    offset += 4;
    wAs(data, offset, "acTL");
    offset += 4;
    wUi(data, offset, nimg.frames.length);
    offset += 4;
    wUi(data, offset, tabs["loop"] != null ? tabs["loop"] : 0);
    offset += 4;
    wUi(data, offset, crc(data, offset - 12, 12));
    offset += 4; // crc
  }

  if (nimg.ctype == 3) {
    var dl = nimg.plte.length;
    wUi(data, offset, dl * 3);
    offset += 4;
    wAs(data, offset, "PLTE");
    offset += 4;
    for (var i = 0; i < dl; i++) {
      var ti = i * 3,
      c = nimg.plte[i],
      r = c & 255,
      g = c >>> 8 & 255,
      b = c >>> 16 & 255;
      data[offset + ti + 0] = r;
      data[offset + ti + 1] = g;
      data[offset + ti + 2] = b;
    }
    offset += dl * 3;
    wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4));
    offset += 4; // crc

    if (pltAlpha) {
      wUi(data, offset, dl);
      offset += 4;
      wAs(data, offset, "tRNS");
      offset += 4;
      for (var i = 0; i < dl; i++) {data[offset + i] = nimg.plte[i] >>> 24 & 255;}
      offset += dl;
      wUi(data, offset, crc(data, offset - dl - 4, dl + 4));
      offset += 4; // crc
    }
  }

  var fi = 0;
  for (var j = 0; j < nimg.frames.length; j++) {
    var fr = nimg.frames[j];
    if (anim) {
      wUi(data, offset, 26);
      offset += 4;
      wAs(data, offset, "fcTL");
      offset += 4;
      wUi(data, offset, fi++);
      offset += 4;
      wUi(data, offset, fr.rect.width);
      offset += 4;
      wUi(data, offset, fr.rect.height);
      offset += 4;
      wUi(data, offset, fr.rect.x);
      offset += 4;
      wUi(data, offset, fr.rect.y);
      offset += 4;
      wUs(data, offset, dels[j]);
      offset += 2;
      wUs(data, offset, 1000);
      offset += 2;
      data[offset] = fr.dispose;
      offset++; // dispose
      data[offset] = fr.blend;
      offset++; // blend
      wUi(data, offset, crc(data, offset - 30, 30));
      offset += 4; // crc
    }

    var imgd = fr.cimg,
    dl = imgd.length;
    wUi(data, offset, dl + (j == 0 ? 0 : 4));
    offset += 4;
    var ioff = offset;
    wAs(data, offset, j == 0 ? "IDAT" : "fdAT");
    offset += 4;
    if (j != 0) {
      wUi(data, offset, fi++);
      offset += 4;
    }
    data.set(imgd, offset);
    offset += dl;
    wUi(data, offset, crc(data, ioff, offset - ioff));
    offset += 4; // crc
  }

  wUi(data, offset, 0);
  offset += 4;
  wAs(data, offset, "IEND");
  offset += 4;
  wUi(data, offset, crc(data, offset - 4, 4));
  offset += 4; // crc

  return data.buffer;
};

UPNG.encode.compressPNG = function (out, filter, levelZero) {
  for (var i = 0; i < out.frames.length; i++) {
    var frm = out.frames[i],
    nw = frm.rect.width,
    nh = frm.rect.height;
    var fdata = new Uint8Array(nh * frm.bpl + nh);
    frm.cimg = UPNG.encode._filterZero(frm.img, nh, frm.bpp, frm.bpl, fdata, filter, levelZero);
  }
};



UPNG.encode.compress = function (bufs, w, h, ps, prms) // prms:  onlyBlend, minBits, forbidPlte
{
  //var time = Date.now();
  var onlyBlend = prms[0],
  evenCrd = prms[1],
  forbidPrev = prms[2],
  minBits = prms[3],
  forbidPlte = prms[4],
  dither = prms[5];

  var ctype = 6,
  depth = 8,
  alphaAnd = 255;

  for (var j = 0; j < bufs.
  length; j++) {// when not quantized, other frames can contain colors, that are not in an initial frame
    var img = new Uint8Array(bufs[j]),
    ilen = img.length;
    for (var i = 0; i < ilen; i += 4) {alphaAnd &= img[i + 3];}
  }
  var gotAlpha = alphaAnd != 255;

  //console.log("alpha check", Date.now()-time);  time = Date.now();

  //var brute = gotAlpha && forGIF;		// brute : frames can only be copied, not "blended"
  var frms = UPNG.encode.framize(bufs, w, h, onlyBlend, evenCrd, forbidPrev);
  //console.log("framize", Date.now()-time);  time = Date.now();

  var cmap = {},
  plte = [],
  inds = [];

  if (ps != 0) {
    var nbufs = [];
    for (var i = 0; i < frms.length; i++) {nbufs.push(frms[i].img.buffer);}

    var abuf = UPNG.encode.concatRGBA(nbufs),
    qres = UPNG.quantize(abuf, ps);

    for (var i = 0; i < qres.plte.length; i++) {plte.push(qres.plte[i].est.rgba);}

    var cof = 0;
    for (var i = 0; i < frms.length; i++) {
      var frm = frms[i],
      bln = frm.img.length,
      ind = new Uint8Array(qres.inds.buffer, cof >> 2, bln >> 2);
      inds.push(ind);
      var bb = new Uint8Array(qres.abuf, cof, bln);

      //console.log(frm.img, frm.width, frm.height);
      //var time = Date.now();
      if (dither) UPNG.encode.dither(frm.img, frm.rect.width, frm.rect.height, plte, bb, ind);
      //console.log(Date.now()-time);
      frm.img.set(bb);
      cof += bln;
    }

    //console.log("quantize", Date.now()-time);  time = Date.now();
  } else {
    // what if ps==0, but there are <=256 colors?  we still need to detect, if the palette could be used
    for (var j = 0; j < frms.
    length; j++) {// when not quantized, other frames can contain colors, that are not in an initial frame
      var frm = frms[j],
      img32 = new Uint32Array(frm.img.buffer),
      nw = frm.rect.width,
      ilen = img32.length;
      var ind = new Uint8Array(ilen);
      inds.push(ind);
      for (var i = 0; i < ilen; i++) {
        var c = img32[i];
        if (i != 0 && c == img32[i - 1]) ind[i] = ind[i - 1];else
        if (i > nw && c == img32[i - nw]) ind[i] = ind[i - nw];else
        {
          var cmc = cmap[c];
          if (cmc == null) {
            cmap[c] = cmc = plte.length;
            plte.push(c);
            if (plte.length >= 300) break;
          }
          ind[i] = cmc;
        }
      }
    }
    //console.log("make palette", Date.now()-time);  time = Date.now();
  }

  var cc = plte.length; //console.log("colors:",cc);
  if (cc <= 256 && forbidPlte == false) {
    if (cc <= 2) depth = 1;else
    if (cc <= 4) depth = 2;else
    if (cc <= 16) depth = 4;else
    depth = 8;
    depth = Math.max(depth, minBits);
  }

  for (var j = 0; j < frms.length; j++) {
    var frm = frms[j],
    nx = frm.rect.x,
    ny = frm.rect.y,
    nw = frm.rect.width,
    nh = frm.rect.height;
    var cimg = frm.img,
    cimg32 = new Uint32Array(cimg.buffer);
    var bpl = 4 * nw,
    bpp = 4;
    if (cc <= 256 && forbidPlte == false) {
      bpl = Math.ceil(depth * nw / 8);
      var nimg = new Uint8Array(bpl * nh);
      var inj = inds[j];
      for (var y = 0; y < nh; y++) {
        var i = y * bpl,
        ii = y * nw;
        if (depth == 8)
        for (var x = 0; x < nw; x++) {nimg[i + x] = inj[ii + x];} else
        if (depth == 4)
        for (var x = 0; x < nw; x++) {nimg[i + (x >> 1)] |= inj[ii + x] << 4 - (x & 1) * 4;} else
        if (depth == 2)
        for (var x = 0; x < nw; x++) {nimg[i + (x >> 2)] |= inj[ii + x] << 6 - (x & 3) * 2;} else
        if (depth == 1)
        for (var x = 0; x < nw; x++) {nimg[i + (x >> 3)] |= inj[ii + x] << 7 - (x & 7) * 1;}
      }
      cimg = nimg;
      ctype = 3;
      bpp = 1;
    } else if (gotAlpha == false && frms.length == 1) {// some next "reduced" frames may contain alpha for blending
      var nimg = new Uint8Array(nw * nh * 3),
      area = nw * nh;
      for (var i = 0; i < area; i++) {
        var ti = i * 3,
        qi = i * 4;
        nimg[ti] = cimg[qi];
        nimg[ti + 1] = cimg[qi + 1];
        nimg[ti + 2] = cimg[qi + 2];
      }
      cimg = nimg;
      ctype = 2;
      bpp = 3;
      bpl = 3 * nw;
    }
    frm.img = cimg;
    frm.bpl = bpl;
    frm.bpp = bpp;
  }
  //console.log("colors => palette indices", Date.now()-time);  time = Date.now();

  return {
    ctype: ctype,
    depth: depth,
    plte: plte,
    frames: frms };

};
UPNG.encode.framize = function (bufs, w, h, alwaysBlend, evenCrd, forbidPrev) {
  /*  DISPOSE
                                                                                   - 0 : no change
                                                                               	- 1 : clear to transparent
                                                                               	- 2 : retstore to content before rendering (previous frame disposed)
                                                                               	BLEND
                                                                               	- 0 : replace
                                                                               	- 1 : blend
                                                                               */
  var frms = [];
  for (var j = 0; j < bufs.length; j++) {
    var cimg = new Uint8Array(bufs[j]),
    cimg32 = new Uint32Array(cimg.buffer);
    var nimg;

    var nx = 0,
    ny = 0,
    nw = w,
    nh = h,
    blend = alwaysBlend ? 1 : 0;
    if (j != 0) {
      var tlim = forbidPrev || alwaysBlend || j == 1 || frms[j - 2].dispose != 0 ? 1 : 2,
      tstp = 0,
      tarea = 1e9;
      for (var it = 0; it < tlim; it++) {
        var pimg = new Uint8Array(bufs[j - 1 - it]),
        p32 = new Uint32Array(bufs[j - 1 - it]);
        var mix = w,
        miy = h,
        max = -1,
        may = -1;
        for (var y = 0; y < h; y++) {
          for (var x = 0; x < w; x++) {
            var i = y * w + x;
            if (cimg32[i] != p32[i]) {
              if (x < mix) mix = x;
              if (x > max) max = x;
              if (y < miy) miy = y;
              if (y > may) may = y;
            }
          }}
        if (max == -1) mix = miy = max = may = 0;
        if (evenCrd) {
          if ((mix & 1) == 1) mix--;
          if ((miy & 1) == 1) miy--;
        }
        var sarea = (max - mix + 1) * (may - miy + 1);
        if (sarea < tarea) {
          tarea = sarea;
          tstp = it;
          nx = mix;
          ny = miy;
          nw = max - mix + 1;
          nh = may - miy + 1;
        }
      }

      // alwaysBlend: pokud zjistím, že blendit nelze, nastavím předchozímu snímku dispose=1. Zajistím, aby obsahoval můj obdélník.
      var pimg = new Uint8Array(bufs[j - 1 - tstp]);
      if (tstp == 1) frms[j - 1].dispose = 2;

      nimg = new Uint8Array(nw * nh * 4);
      UPNG._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0);

      blend = UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3) ? 1 : 0;
      if (blend == 1) UPNG.encode._prepareDiff(cimg, w, h, nimg, {
        x: nx,
        y: ny,
        width: nw,
        height: nh });else

      UPNG._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0);
      //UPNG._copyTile(cimg,w,h, nimg,nw,nh, -nx,-ny, blend==1?2:0);
    } else nimg = cimg.slice(0); // img may be rewritten further ... don't rewrite input

    frms.push({
      rect: {
        x: nx,
        y: ny,
        width: nw,
        height: nh },

      img: nimg,
      blend: blend,
      dispose: 0 });

  }


  if (alwaysBlend)
  for (var j = 0; j < frms.length; j++) {
    var frm = frms[j];
    if (frm.blend == 1) continue;
    var r0 = frm.rect,
    r1 = frms[j - 1].rect;
    var miX = Math.min(r0.x, r1.x),
    miY = Math.min(r0.y, r1.y);
    var maX = Math.max(r0.x + r0.width, r1.x + r1.width),
    maY = Math.max(r0.y + r0.height, r1.y + r1.height);
    var r = {
      x: miX,
      y: miY,
      width: maX - miX,
      height: maY - miY };


    frms[j - 1].dispose = 1;
    if (j - 1 != 0)
    UPNG.encode._updateFrame(bufs, w, h, frms, j - 1, r, evenCrd);
    UPNG.encode._updateFrame(bufs, w, h, frms, j, r, evenCrd);
  }
  var area = 0;
  if (bufs.length != 1)
  for (var i = 0; i < frms.length; i++) {
    var frm = frms[i];
    area += frm.rect.width * frm.rect.height;
    //if(i==0 || frm.blend!=1) continue;
    //var ob = new Uint8Array(
    //console.log(frm.blend, frm.dispose, frm.rect);
  }
  //if(area!=0) console.log(area);
  return frms;
};
UPNG.encode._updateFrame = function (bufs, w, h, frms, i, r, evenCrd) {
  var U8 = Uint8Array,
  U32 = Uint32Array;
  var pimg = new U8(bufs[i - 1]),
  pimg32 = new U32(bufs[i - 1]),
  nimg = i + 1 < bufs.length ? new U8(bufs[i + 1]) : null;
  var cimg = new U8(bufs[i]),
  cimg32 = new U32(cimg.buffer);

  var mix = w,
  miy = h,
  max = -1,
  may = -1;
  for (var y = 0; y < r.height; y++) {
    for (var x = 0; x < r.width; x++) {
      var cx = r.x + x,
      cy = r.y + y;
      var j = cy * w + cx,
      cc = cimg32[j];
      // no need to draw transparency, or to dispose it. Or, if writing the same color and the next one does not need transparency.
      if (cc == 0 || frms[i - 1].dispose == 0 && pimg32[j] == cc && (nimg == null || nimg[j * 4 + 3] !=
      0) /**/) {} else {
        if (cx < mix) mix = cx;
        if (cx > max) max = cx;
        if (cy < miy) miy = cy;
        if (cy > may) may = cy;
      }
    }}
  if (max == -1) mix = miy = max = may = 0;
  if (evenCrd) {
    if ((mix & 1) == 1) mix--;
    if ((miy & 1) == 1) miy--;
  }
  r = {
    x: mix,
    y: miy,
    width: max - mix + 1,
    height: may - miy + 1 };


  var fr = frms[i];
  fr.rect = r;
  fr.blend = 1;
  fr.img = new Uint8Array(r.width * r.height * 4);
  if (frms[i - 1].dispose == 0) {
    UPNG._copyTile(pimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
    UPNG.encode._prepareDiff(cimg, w, h, fr.img, r);
    //UPNG._copyTile(cimg,w,h, fr.img,r.width,r.height, -r.x,-r.y, 2);
  } else
  UPNG._copyTile(cimg, w, h, fr.img, r.width, r.height, -r.x, -r.y, 0);
};
UPNG.encode._prepareDiff = function (cimg, w, h, nimg, rec) {
  UPNG._copyTile(cimg, w, h, nimg, rec.width, rec.height, -rec.x, -rec.y, 2);
  /*
                                                                              var n32 = new Uint32Array(nimg.buffer);
                                                                              var og = new Uint8Array(rec.width*rec.height*4), o32 = new Uint32Array(og.buffer);
                                                                              UPNG._copyTile(cimg,w,h, og,rec.width,rec.height, -rec.x,-rec.y, 0);
                                                                              for(var i=4; i<nimg.length; i+=4) {
                                                                              	if(nimg[i-1]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)-1]) {
                                                                              		n32[i>>>2]=o32[i>>>2];
                                                                              		//var j = i, c=p32[(i>>>2)-1];
                                                                              		//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
                                                                              	}
                                                                              }
                                                                              for(var i=nimg.length-8; i>0; i-=4) {
                                                                              	if(nimg[i+7]!=0 && nimg[i+3]==0 && o32[i>>>2]==o32[(i>>>2)+1]) {
                                                                              		n32[i>>>2]=o32[i>>>2];
                                                                              		//var j = i, c=p32[(i>>>2)-1];
                                                                              		//while(p32[j>>>2]==c) {  n32[j>>>2]=c;  j+=4;  }
                                                                              	}
                                                                              }*/
};

UPNG.encode._filterZero = function (img, h, bpp, bpl, data, filter, levelZero) {
  var fls = [],
  ftry = [0, 1, 2, 3, 4];
  if (filter != -1) ftry = [filter];else
  if (h * bpl > 500000 || bpp == 1) ftry = [0];
  var opts;
  if (levelZero) opts = {
    level: 0 };



  var CMPR = data.length > 10e6 && UZIP != null ? UZIP : pako;

  var time = Date.now();
  for (var i = 0; i < ftry.length; i++) {
    for (var y = 0; y < h; y++) {UPNG.encode._filterLine(data, img, y, bpl, bpp, ftry[i]);}
    //var nimg = new Uint8Array(data.length);
    //var sz = UZIP.F.deflate(data, nimg);  fls.push(nimg.slice(0,sz));
    //var dfl = pako["deflate"](data), dl=dfl.length-4;
    //var crc = (dfl[dl+3]<<24)|(dfl[dl+2]<<16)|(dfl[dl+1]<<8)|(dfl[dl+0]<<0);
    //console.log(crc, UZIP.adler(data,2,data.length-6));
    fls.push(CMPR["deflate"](data, opts));
  }

  var ti,tsize = 1e9;
  for (var i = 0; i < fls.length; i++) {
    if (fls[i].length < tsize) {
      ti = i;
      tsize = fls[i].length;
    }}
  return fls[ti];
};
UPNG.encode._filterLine = function (data, img, y, bpl, bpp, type) {
  var i = y * bpl,
  di = i + y,
  paeth = UPNG.decode._paeth;
  data[di] = type;
  di++;

  if (type == 0) {
    if (bpl < 500)
    for (var x = 0; x < bpl; x++) {data[di + x] = img[i + x];} else
    data.set(new Uint8Array(img.buffer, i, bpl), di);
  } else if (type == 1) {
    for (var x = 0; x < bpp; x++) {data[di + x] = img[i + x];}
    for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;}
  } else if (y == 0) {
    for (var x = 0; x < bpp; x++) {data[di + x] = img[i + x];}

    if (type == 2)
    for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x];}
    if (type == 3)
    for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;}
    if (type == 4)
    for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;}
  } else {
    if (type == 2) {
      for (var x = 0; x < bpl; x++) {data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;}
    }
    if (type == 3) {
      for (var x = 0; x < bpp; x++) {data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;}
      for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x -
        bpp] >> 1) & 255;}
    }
    if (type == 4) {
      for (var x = 0; x < bpp; x++) {data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;}
      for (var x = bpp; x < bpl; x++) {data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x -
        bpl], img[i + x - bpp - bpl]) & 255;}
    }
  }
};

UPNG.crc = {
  table: function () {
    var tab = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) {
        if (c & 1) c = 0xedb88320 ^ c >>> 1;else
        c = c >>> 1;
      }
      tab[n] = c;
    }
    return tab;
  }(),
  update: function update(c, buf, off, len) {
    for (var i = 0; i < len; i++) {c = UPNG.crc.table[(c ^ buf[off + i]) & 0xff] ^ c >>> 8;}
    return c;
  },
  crc: function crc(b, o, l) {
    return UPNG.crc.update(0xffffffff, b, o, l) ^ 0xffffffff;
  } };



UPNG.quantize = function (abuf, ps) {
  var sb = new Uint8Array(abuf),
  tb = sb.slice(0),
  tb32 = new Uint32Array(tb.buffer);

  var KD = UPNG.quantize.getKDtree(tb, ps);
  var root = KD[0],
  leafs = KD[1];

  var planeDst = UPNG.quantize.planeDst;
  var len = sb.length;

  var inds = new Uint8Array(len >> 2),
  nd;
  if (sb.length < 20e6) // precise, but slow :(
    for (var i = 0; i < len; i += 4) {
      var r = sb[i] * (1 / 255),
      g = sb[i + 1] * (1 / 255),
      b = sb[i + 2] * (1 / 255),
      a = sb[i + 3] * (1 / 255);

      nd = UPNG.quantize.getNearest(root, r, g, b, a);
      inds[i >> 2] = nd.ind;
      tb32[i >> 2] = nd.est.rgba;
    } else

  for (var i = 0; i < len; i += 4) {
    var r = sb[i] * (1 / 255),
    g = sb[i + 1] * (1 / 255),
    b = sb[i + 2] * (1 / 255),
    a = sb[i + 3] * (1 / 255);

    nd = root;
    while (nd.left) {nd = planeDst(nd.est, r, g, b, a) <= 0 ? nd.left : nd.right;}
    inds[i >> 2] = nd.ind;
    tb32[i >> 2] = nd.est.rgba;
  }
  return {
    abuf: tb.buffer,
    inds: inds,
    plte: leafs };

};

UPNG.quantize.getKDtree = function (nimg, ps, err) {
  if (err == null) err = 0.0001;
  var nimg32 = new Uint32Array(nimg.buffer);

  var root = {
    i0: 0,
    i1: nimg.length,
    bst: null,
    est: null,
    tdst: 0,
    left: null,
    right: null };
  // basic statistic, extra statistic
  root.bst = UPNG.quantize.stats(nimg, root.i0, root.i1);
  root.est = UPNG.quantize.estats(root.bst);
  var leafs = [root];

  while (leafs.length < ps) {
    var maxL = 0,
    mi = 0;
    for (var i = 0; i < leafs.length; i++) {
      if (leafs[i].est.L > maxL) {
        maxL = leafs[i].est.L;
        mi = i;
      }}
    if (maxL < err) break;
    var node = leafs[mi];

    var s0 = UPNG.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
    var s0wrong = node.i0 >= s0 || node.i1 <= s0;
    //console.log(maxL, leafs.length, mi);
    if (s0wrong) {
      node.est.L = 0;
      continue;
    }


    var ln = {
      i0: node.i0,
      i1: s0,
      bst: null,
      est: null,
      tdst: 0,
      left: null,
      right: null };

    ln.bst = UPNG.quantize.stats(nimg, ln.i0, ln.i1);
    ln.est = UPNG.quantize.estats(ln.bst);
    var rn = {
      i0: s0,
      i1: node.i1,
      bst: null,
      est: null,
      tdst: 0,
      left: null,
      right: null };

    rn.bst = {
      R: [],
      m: [],
      N: node.bst.N - ln.bst.N };

    for (var i = 0; i < 16; i++) {rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];}
    for (var i = 0; i < 4; i++) {rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];}
    rn.est = UPNG.quantize.estats(rn.bst);

    node.left = ln;
    node.right = rn;
    leafs[mi] = ln;
    leafs.push(rn);
  }
  leafs.sort(function (a, b) {
    return b.bst.N - a.bst.N;
  });
  for (var i = 0; i < leafs.length; i++) {leafs[i].ind = i;}
  return [root, leafs];
};

UPNG.quantize.getNearest = function (nd, r, g, b, a) {
  if (nd.left == null) {
    nd.tdst = UPNG.quantize.dist(nd.est.q, r, g, b, a);
    return nd;
  }
  var planeDst = UPNG.quantize.planeDst(nd.est, r, g, b, a);

  var node0 = nd.left,
  node1 = nd.right;
  if (planeDst > 0) {
    node0 = nd.right;
    node1 = nd.left;
  }

  var ln = UPNG.quantize.getNearest(node0, r, g, b, a);
  if (ln.tdst <= planeDst * planeDst) return ln;
  var rn = UPNG.quantize.getNearest(node1, r, g, b, a);
  return rn.tdst < ln.tdst ? rn : ln;
};
UPNG.quantize.planeDst = function (est, r, g, b, a) {
  var e = est.e;
  return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
};
UPNG.quantize.dist = function (q, r, g, b, a) {
  var d0 = r - q[0],
  d1 = g - q[1],
  d2 = b - q[2],
  d3 = a - q[3];
  return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
};

UPNG.quantize.splitPixels = function (nimg, nimg32, i0, i1, e, eMq) {
  var vecDot = UPNG.quantize.vecDot;
  i1 -= 4;
  var shfs = 0;
  while (i0 < i1) {
    while (vecDot(nimg, i0, e) <= eMq) {i0 += 4;}
    while (vecDot(nimg, i1, e) > eMq) {i1 -= 4;}
    if (i0 >= i1) break;

    var t = nimg32[i0 >> 2];
    nimg32[i0 >> 2] = nimg32[i1 >> 2];
    nimg32[i1 >> 2] = t;

    i0 += 4;
    i1 -= 4;
  }
  while (vecDot(nimg, i0, e) > eMq) {i0 -= 4;}
  return i0 + 4;
};
UPNG.quantize.vecDot = function (nimg, i, e) {
  return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
};
UPNG.quantize.stats = function (nimg, i0, i1) {
  var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var m = [0, 0, 0, 0];
  var N = i1 - i0 >> 2;
  for (var i = i0; i < i1; i += 4) {
    var r = nimg[i] * (1 / 255),
    g = nimg[i + 1] * (1 / 255),
    b = nimg[i + 2] * (1 / 255),
    a = nimg[i + 3] * (1 / 255);
    //var r = nimg[i], g = nimg[i+1], b = nimg[i+2], a = nimg[i+3];
    m[0] += r;
    m[1] += g;
    m[2] += b;
    m[3] += a;

    R[0] += r * r;
    R[1] += r * g;
    R[2] += r * b;
    R[3] += r * a;
    R[5] += g * g;
    R[6] += g * b;
    R[7] += g * a;
    R[10] += b * b;
    R[11] += b * a;
    R[15] += a * a;
  }
  R[4] = R[1];
  R[8] = R[2];
  R[9] = R[6];
  R[12] = R[3];
  R[13] = R[7];
  R[14] = R[11];

  return {
    R: R,
    m: m,
    N: N };

};
UPNG.quantize.estats = function (stats) {
  var R = stats.R,
  m = stats.m,
  N = stats.N;

  // when all samples are equal, but N is large (millions), the Rj can be non-zero ( 0.0003.... - precission error)
  var m0 = m[0],
  m1 = m[1],
  m2 = m[2],
  m3 = m[3],
  iN = N == 0 ? 0 : 1 / N;
  var Rj = [
  R[0] - m0 * m0 * iN, R[1] - m0 * m1 * iN, R[2] - m0 * m2 * iN, R[3] - m0 * m3 * iN,
  R[4] - m1 * m0 * iN, R[5] - m1 * m1 * iN, R[6] - m1 * m2 * iN, R[7] - m1 * m3 * iN,
  R[8] - m2 * m0 * iN, R[9] - m2 * m1 * iN, R[10] - m2 * m2 * iN, R[11] - m2 * m3 * iN,
  R[12] - m3 * m0 * iN, R[13] - m3 * m1 * iN, R[14] - m3 * m2 * iN, R[15] - m3 * m3 * iN];


  var A = Rj,
  M = UPNG.M4;
  var b = [Math.random(), Math.random(), Math.random(), Math.random()],
  mi = 0,
  tmi = 0;

  if (N != 0)
  for (var i = 0; i < 16; i++) {
    b = M.multVec(A, b);
    tmi = Math.sqrt(M.dot(b, b));
    b = M.sml(1 / tmi, b);
    if (i != 0 && Math.abs(tmi - mi) < 1e-9) break;
    mi = tmi;
  }
  //b = [0,0,1,0];  mi=N;
  var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
  var eMq255 = M.dot(M.sml(255, q), b);

  return {
    Cov: Rj,
    q: q,
    e: b,
    L: mi,
    eMq255: eMq255,
    eMq: M.dot(b, q),
    rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2]) << 16 | Math.round(255 * q[1]) << 8 |
    Math.round(255 * q[0]) << 0) >>> 0 };

};
UPNG.M4 = {
  multVec: function multVec(m, v) {
    return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3],
    m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3],
    m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3],
    m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]];

  },
  dot: function dot(x, y) {
    return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
  },
  sml: function sml(a, y) {
    return [a * y[0], a * y[1], a * y[2], a * y[3]];
  } };


UPNG.encode.concatRGBA = function (bufs) {
  var tlen = 0;
  for (var i = 0; i < bufs.length; i++) {tlen += bufs[i].byteLength;}
  var nimg = new Uint8Array(tlen),
  noff = 0;
  for (var i = 0; i < bufs.length; i++) {
    var img = new Uint8Array(bufs[i]),
    il = img.length;
    for (var j = 0; j < il; j += 4) {
      var r = img[j],
      g = img[j + 1],
      b = img[j + 2],
      a = img[j + 3];
      if (a == 0) r = g = b = 0;
      nimg[noff + j] = r;
      nimg[noff + j + 1] = g;
      nimg[noff + j + 2] = b;
      nimg[noff + j + 3] = a;
    }
    noff += il;
  }
  return nimg.buffer;
};

UPNG.encode.dither = function (sb, w, h, plte, tb, oind) {

  function addErr(er, tg, ti, f) {
    tg[ti] += er[0] * f >> 4;
    tg[ti + 1] += er[1] * f >> 4;
    tg[ti + 2] += er[2] * f >> 4;
    tg[ti + 3] += er[3] * f >> 4;
  }

  function N(x) {
    return Math.max(0, Math.min(255, x));
  }

  function D(a, b) {
    var dr = a[0] - b[0],
    dg = a[1] - b[1],
    db = a[2] - b[2],
    da = a[3] - b[3];
    return dr * dr + dg * dg + db * db + da * da;
  }


  var pc = plte.length,
  nplt = [],
  rads = [];
  for (var i = 0; i < pc; i++) {
    var c = plte[i];
    nplt.push([c >>> 0 & 255, c >>> 8 & 255, c >>> 16 & 255, c >>> 24 & 255]);
  }
  for (var i = 0; i < pc; i++) {
    var ne = 0xffffffff,
    ni = 0;
    for (var j = 0; j < pc; j++) {
      var ce = D(nplt[i], nplt[j]);
      if (j != i && ce < ne) {
        ne = ce;
        ni = j;
      }
    }
    var hd = Math.sqrt(ne) / 2;
    rads[i] = ~~(hd * hd);
  }

  var tb32 = new Uint32Array(tb.buffer);
  var err = new Int16Array(w * h * 4);

  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var i = (y * w + x) * 4;

      var cc = [N(sb[i] + err[i]), N(sb[i + 1] + err[i + 1]), N(sb[i + 2] + err[i + 2]), N(sb[i + 3] + err[i +
      3])];

      var ni = 0,
      nd = 0xffffff;
      for (var j = 0; j < pc; j++) {
        var cd = D(cc, nplt[j]);
        if (cd < nd) {
          nd = cd;
          ni = j;
        }
      }

      //ni = oind[i>>2];
      var nc = nplt[ni];
      var er = [cc[0] - nc[0], cc[1] - nc[1], cc[2] - nc[2], cc[3] - nc[3]];

      //addErr(er, err, i+4, 16);

      //*
      if (x != w - 1) addErr(er, err, i + 4, 7);
      if (y != h - 1) {
        if (x != 0) addErr(er, err, i + 4 * w - 4, 3);
        addErr(er, err, i + 4 * w, 5);
        if (x != w - 1) addErr(er, err, i + 4 * w + 4, 1); //*/
      }

      oind[i >> 2] = ni;
      tb32[i >> 2] = plte[ni];
    }
  }
};

var upng = UPNG;exports.upng = upng;

/***/ }),

/***/ 59:
/*!**************************************!*\
  !*** D:/uniapp/魔域/utils/pako.min.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
!function (t, e) { true ? e(exports) : undefined;}(this, function (t) {"use strict";function e(t) {var e = t.length;for (; --e >= 0;) {t[e] = 0;}}var a = 256,i = 286,n = 30,s = 15,r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),l = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),o = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),h = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),d = new Array(576);e(d);var _ = new Array(60);e(_);var f = new Array(512);e(f);var c = new Array(256);e(c);var u = new Array(29);e(u);var w = new Array(n);function b(t, e, a, i, n) {this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = i, this.max_length = n, this.has_stree = t && t.length;}var g, p, m;function k(t, e) {this.dyn_tree = t, this.max_code = 0, this.stat_desc = e;}e(w);var v = function v(t) {return t < 256 ? f[t] : f[256 + (t >>> 7)];},y = function y(t, e) {t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255;},x = function x(t, e, a) {t.bi_valid > 16 - a ? (t.bi_buf |= e << t.bi_valid & 65535, y(t, t.bi_buf), t.bi_buf = e >> 16 - t.bi_valid, t.bi_valid += a - 16) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a);},z = function z(t, e, a) {x(t, a[2 * e], a[2 * e + 1]);},A = function A(t, e) {var a = 0;do {a |= 1 & t, t >>>= 1, a <<= 1;} while (--e > 0);return a >>> 1;},E = function E(t, e, a) {var i = new Array(16);var n,r,l = 0;for (n = 1; n <= s; n++) {i[n] = l = l + a[n - 1] << 1;}for (r = 0; r <= e; r++) {var _e2 = t[2 * r + 1];0 !== _e2 && (t[2 * r] = A(i[_e2]++, _e2));}},R = function R(t) {var e;for (e = 0; e < i; e++) {t.dyn_ltree[2 * e] = 0;}for (e = 0; e < n; e++) {t.dyn_dtree[2 * e] = 0;}for (e = 0; e < 19; e++) {t.bl_tree[2 * e] = 0;}t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0;},Z = function Z(t) {t.bi_valid > 8 ? y(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0;},U = function U(t, e, a, i) {var n = 2 * e,s = 2 * a;return t[n] < t[s] || t[n] === t[s] && i[e] <= i[a];},S = function S(t, e, a) {var i = t.heap[a];var n = a << 1;for (; n <= t.heap_len && (n < t.heap_len && U(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !U(e, i, t.heap[n], t.depth));) {t.heap[a] = t.heap[n], a = n, n <<= 1;}t.heap[a] = i;},D = function D(t, e, i) {var n,s,o,h,d = 0;if (0 !== t.last_lit) do {n = t.pending_buf[t.d_buf + 2 * d] << 8 | t.pending_buf[t.d_buf + 2 * d + 1], s = t.pending_buf[t.l_buf + d], d++, 0 === n ? z(t, s, e) : (o = c[s], z(t, o + a + 1, e), h = r[o], 0 !== h && (s -= u[o], x(t, s, h)), n--, o = v(n), z(t, o, i), h = l[o], 0 !== h && (n -= w[o], x(t, n, h)));} while (d < t.last_lit);z(t, 256, e);},T = function T(t, e) {var a = e.dyn_tree,i = e.stat_desc.static_tree,n = e.stat_desc.has_stree,r = e.stat_desc.elems;var l,o,h,d = -1;for (t.heap_len = 0, t.heap_max = 573, l = 0; l < r; l++) {0 !== a[2 * l] ? (t.heap[++t.heap_len] = d = l, t.depth[l] = 0) : a[2 * l + 1] = 0;}for (; t.heap_len < 2;) {h = t.heap[++t.heap_len] = d < 2 ? ++d : 0, a[2 * h] = 1, t.depth[h] = 0, t.opt_len--, n && (t.static_len -= i[2 * h + 1]);}for (e.max_code = d, l = t.heap_len >> 1; l >= 1; l--) {S(t, a, l);}h = r;do {l = t.heap[1], t.heap[1] = t.heap[t.heap_len--], S(t, a, 1), o = t.heap[1], t.heap[--t.heap_max] = l, t.heap[--t.heap_max] = o, a[2 * h] = a[2 * l] + a[2 * o], t.depth[h] = (t.depth[l] >= t.depth[o] ? t.depth[l] : t.depth[o]) + 1, a[2 * l + 1] = a[2 * o + 1] = h, t.heap[1] = h++, S(t, a, 1);} while (t.heap_len >= 2);t.heap[--t.heap_max] = t.heap[1], function (t, e) {var a = e.dyn_tree,i = e.max_code,n = e.stat_desc.static_tree,r = e.stat_desc.has_stree,l = e.stat_desc.extra_bits,o = e.stat_desc.extra_base,h = e.stat_desc.max_length;var d,_,f,c,u,w,b = 0;for (c = 0; c <= s; c++) {t.bl_count[c] = 0;}for (a[2 * t.heap[t.heap_max] + 1] = 0, d = t.heap_max + 1; d < 573; d++) {_ = t.heap[d], c = a[2 * a[2 * _ + 1] + 1] + 1, c > h && (c = h, b++), a[2 * _ + 1] = c, _ > i || (t.bl_count[c]++, u = 0, _ >= o && (u = l[_ - o]), w = a[2 * _], t.opt_len += w * (c + u), r && (t.static_len += w * (n[2 * _ + 1] + u)));}if (0 !== b) {do {for (c = h - 1; 0 === t.bl_count[c];) {c--;}t.bl_count[c]--, t.bl_count[c + 1] += 2, t.bl_count[h]--, b -= 2;} while (b > 0);for (c = h; 0 !== c; c--) {for (_ = t.bl_count[c]; 0 !== _;) {f = t.heap[--d], f > i || (a[2 * f + 1] !== c && (t.opt_len += (c - a[2 * f + 1]) * a[2 * f], a[2 * f + 1] = c), _--);}}}}(t, e), E(a, d, t.bl_count);},O = function O(t, e, a) {var i,n,s = -1,r = e[1],l = 0,o = 7,h = 4;for (0 === r && (o = 138, h = 3), e[2 * (a + 1) + 1] = 65535, i = 0; i <= a; i++) {n = r, r = e[2 * (i + 1) + 1], ++l < o && n === r || (l < h ? t.bl_tree[2 * n] += l : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++) : l <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, l = 0, s = n, 0 === r ? (o = 138, h = 3) : n === r ? (o = 6, h = 3) : (o = 7, h = 4));}},I = function I(t, e, a) {var i,n,s = -1,r = e[1],l = 0,o = 7,h = 4;for (0 === r && (o = 138, h = 3), i = 0; i <= a; i++) {if (n = r, r = e[2 * (i + 1) + 1], !(++l < o && n === r)) {if (l < h) do {z(t, n, t.bl_tree);} while (0 != --l);else 0 !== n ? (n !== s && (z(t, n, t.bl_tree), l--), z(t, 16, t.bl_tree), x(t, l - 3, 2)) : l <= 10 ? (z(t, 17, t.bl_tree), x(t, l - 3, 3)) : (z(t, 18, t.bl_tree), x(t, l - 11, 7));l = 0, s = n, 0 === r ? (o = 138, h = 3) : n === r ? (o = 6, h = 3) : (o = 7, h = 4);}}};var F = !1;var L = function L(t, e, a, i) {x(t, 0 + (i ? 1 : 0), 3), function (t, e, a, i) {Z(t), i && (y(t, a), y(t, ~a)), t.pending_buf.set(t.window.subarray(e, e + a), t.pending), t.pending += a;}(t, e, a, !0);};var N = { _tr_init: function _tr_init(t) {F || (function () {var t, e, a, h, k;var v = new Array(16);for (a = 0, h = 0; h < 28; h++) {for (u[h] = a, t = 0; t < 1 << r[h]; t++) {c[a++] = h;}}for (c[a - 1] = h, k = 0, h = 0; h < 16; h++) {for (w[h] = k, t = 0; t < 1 << l[h]; t++) {f[k++] = h;}}for (k >>= 7; h < n; h++) {for (w[h] = k << 7, t = 0; t < 1 << l[h] - 7; t++) {f[256 + k++] = h;}}for (e = 0; e <= s; e++) {v[e] = 0;}for (t = 0; t <= 143;) {d[2 * t + 1] = 8, t++, v[8]++;}for (; t <= 255;) {d[2 * t + 1] = 9, t++, v[9]++;}for (; t <= 279;) {d[2 * t + 1] = 7, t++, v[7]++;}for (; t <= 287;) {d[2 * t + 1] = 8, t++, v[8]++;}for (E(d, 287, v), t = 0; t < n; t++) {_[2 * t + 1] = 5, _[2 * t] = A(t, 5);}g = new b(d, r, 257, i, s), p = new b(_, l, 0, n, s), m = new b(new Array(0), o, 0, 19, 7);}(), F = !0), t.l_desc = new k(t.dyn_ltree, g), t.d_desc = new k(t.dyn_dtree, p), t.bl_desc = new k(t.bl_tree, m), t.bi_buf = 0, t.bi_valid = 0, R(t);}, _tr_stored_block: L, _tr_flush_block: function _tr_flush_block(t, e, i, n) {var s,r,l = 0;t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {var e,i = 4093624447;for (e = 0; e <= 31; e++, i >>>= 1) {if (1 & i && 0 !== t.dyn_ltree[2 * e]) return 0;}if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;for (e = 32; e < a; e++) {if (0 !== t.dyn_ltree[2 * e]) return 1;}return 0;}(t)), T(t, t.l_desc), T(t, t.d_desc), l = function (t) {var e;for (O(t, t.dyn_ltree, t.l_desc.max_code), O(t, t.dyn_dtree, t.d_desc.max_code), T(t, t.bl_desc), e = 18; e >= 3 && 0 === t.bl_tree[2 * h[e] + 1]; e--) {;}return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e;}(t), s = t.opt_len + 3 + 7 >>> 3, r = t.static_len + 3 + 7 >>> 3, r <= s && (s = r)) : s = r = i + 5, i + 4 <= s && -1 !== e ? L(t, e, i, n) : 4 === t.strategy || r === s ? (x(t, 2 + (n ? 1 : 0), 3), D(t, d, _)) : (x(t, 4 + (n ? 1 : 0), 3), function (t, e, a, i) {var n;for (x(t, e - 257, 5), x(t, a - 1, 5), x(t, i - 4, 4), n = 0; n < i; n++) {x(t, t.bl_tree[2 * h[n] + 1], 3);}I(t, t.dyn_ltree, e - 1), I(t, t.dyn_dtree, a - 1);}(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, l + 1), D(t, t.dyn_ltree, t.dyn_dtree)), R(t), n && Z(t);}, _tr_tally: function _tr_tally(t, e, i) {return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & i, t.last_lit++, 0 === e ? t.dyn_ltree[2 * i]++ : (t.matches++, e--, t.dyn_ltree[2 * (c[i] + a + 1)]++, t.dyn_dtree[2 * v(e)]++), t.last_lit === t.lit_bufsize - 1;}, _tr_align: function _tr_align(t) {x(t, 2, 3), z(t, 256, d), function (t) {16 === t.bi_valid ? (y(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8);}(t);} };var B = function B(t, e, a, i) {var n = 65535 & t | 0,s = t >>> 16 & 65535 | 0,r = 0;for (; 0 !== a;) {r = a > 2e3 ? 2e3 : a, a -= r;do {n = n + e[i++] | 0, s = s + n | 0;} while (--r);n %= 65521, s %= 65521;}return n | s << 16 | 0;};var C = new Uint32Array(function () {var t,e = [];for (var a = 0; a < 256; a++) {t = a;for (var i = 0; i < 8; i++) {t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;}e[a] = t;}return e;}());var M = function M(t, e, a, i) {var n = C,s = i + a;t ^= -1;for (var _a2 = i; _a2 < s; _a2++) {t = t >>> 8 ^ n[255 & (t ^ e[_a2])];}return -1 ^ t;},H = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" },j = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };var K = N._tr_init,P = N._tr_stored_block,Y = N._tr_flush_block,G = N._tr_tally,X = N._tr_align,W = j.Z_NO_FLUSH,q = j.Z_PARTIAL_FLUSH,J = j.Z_FULL_FLUSH,Q = j.Z_FINISH,V = j.Z_BLOCK,$ = j.Z_OK,tt = j.Z_STREAM_END,et = j.Z_STREAM_ERROR,at = j.Z_DATA_ERROR,it = j.Z_BUF_ERROR,nt = j.Z_DEFAULT_COMPRESSION,st = j.Z_FILTERED,rt = j.Z_HUFFMAN_ONLY,lt = j.Z_RLE,ot = j.Z_FIXED,ht = j.Z_DEFAULT_STRATEGY,dt = j.Z_UNKNOWN,_t = j.Z_DEFLATED,ft = 258,ct = 262,ut = 103,wt = 113,bt = 666,gt = function gt(t, e) {return t.msg = H[e], e;},pt = function pt(t) {return (t << 1) - (t > 4 ? 9 : 0);},mt = function mt(t) {var e = t.length;for (; --e >= 0;) {t[e] = 0;}};var kt = function kt(t, e, a) {return (e << t.hash_shift ^ a) & t.hash_mask;};var vt = function vt(t) {var e = t.state;var a = e.pending;a > t.avail_out && (a = t.avail_out), 0 !== a && (t.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + a), t.next_out), t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 0 === e.pending && (e.pending_out = 0));},yt = function yt(t, e) {Y(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, vt(t.strm);},xt = function xt(t, e) {t.pending_buf[t.pending++] = e;},zt = function zt(t, e) {t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e;},At = function At(t, e, a, i) {var n = t.avail_in;return n > i && (n = i), 0 === n ? 0 : (t.avail_in -= n, e.set(t.input.subarray(t.next_in, t.next_in + n), a), 1 === t.state.wrap ? t.adler = B(t.adler, e, n, a) : 2 === t.state.wrap && (t.adler = M(t.adler, e, n, a)), t.next_in += n, t.total_in += n, n);},Et = function Et(t, e) {var a,i,n = t.max_chain_length,s = t.strstart,r = t.prev_length,l = t.nice_match;var o = t.strstart > t.w_size - ct ? t.strstart - (t.w_size - ct) : 0,h = t.window,d = t.w_mask,_ = t.prev,f = t.strstart + ft;var c = h[s + r - 1],u = h[s + r];t.prev_length >= t.good_match && (n >>= 2), l > t.lookahead && (l = t.lookahead);do {if (a = e, h[a + r] === u && h[a + r - 1] === c && h[a] === h[s] && h[++a] === h[s + 1]) {s += 2, a++;do {} while (h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && h[++s] === h[++a] && s < f);if (i = ft - (f - s), s = f - ft, i > r) {if (t.match_start = e, r = i, i >= l) break;c = h[s + r - 1], u = h[s + r];}}} while ((e = _[e & d]) > o && 0 != --n);return r <= t.lookahead ? r : t.lookahead;},Rt = function Rt(t) {var e = t.w_size;var a, i, n, s, r;do {if (s = t.window_size - t.lookahead - t.strstart, t.strstart >= e + (e - ct)) {t.window.set(t.window.subarray(e, e + e), 0), t.match_start -= e, t.strstart -= e, t.block_start -= e, i = t.hash_size, a = i;do {n = t.head[--a], t.head[a] = n >= e ? n - e : 0;} while (--i);i = e, a = i;do {n = t.prev[--a], t.prev[a] = n >= e ? n - e : 0;} while (--i);s += e;}if (0 === t.strm.avail_in) break;if (i = At(t.strm, t.window, t.strstart + t.lookahead, s), t.lookahead += i, t.lookahead + t.insert >= 3) for (r = t.strstart - t.insert, t.ins_h = t.window[r], t.ins_h = kt(t, t.ins_h, t.window[r + 1]); t.insert && (t.ins_h = kt(t, t.ins_h, t.window[r + 3 - 1]), t.prev[r & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = r, r++, t.insert--, !(t.lookahead + t.insert < 3));) {;}} while (t.lookahead < ct && 0 !== t.strm.avail_in);},Zt = function Zt(t, e) {var a, i;for (;;) {if (t.lookahead < ct) {if (Rt(t), t.lookahead < ct && e === W) return 1;if (0 === t.lookahead) break;}if (a = 0, t.lookahead >= 3 && (t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== a && t.strstart - a <= t.w_size - ct && (t.match_length = Et(t, a)), t.match_length >= 3) {if (i = G(t, t.strstart - t.match_start, t.match_length - 3), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= 3) {t.match_length--;do {t.strstart++, t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;} while (0 != --t.match_length);t.strstart++;} else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 1]);} else i = G(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;if (i && (yt(t, !1), 0 === t.strm.avail_out)) return 1;}return t.insert = t.strstart < 2 ? t.strstart : 2, e === Q ? (yt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (yt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;},Ut = function Ut(t, e) {var a, i, n;for (;;) {if (t.lookahead < ct) {if (Rt(t), t.lookahead < ct && e === W) return 1;if (0 === t.lookahead) break;}if (a = 0, t.lookahead >= 3 && (t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = 2, 0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - ct && (t.match_length = Et(t, a), t.match_length <= 5 && (t.strategy === st || 3 === t.match_length && t.strstart - t.match_start > 4096) && (t.match_length = 2)), t.prev_length >= 3 && t.match_length <= t.prev_length) {n = t.strstart + t.lookahead - 3, i = G(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;do {++t.strstart <= n && (t.ins_h = kt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);} while (0 != --t.prev_length);if (t.match_available = 0, t.match_length = 2, t.strstart++, i && (yt(t, !1), 0 === t.strm.avail_out)) return 1;} else if (t.match_available) {if (i = G(t, 0, t.window[t.strstart - 1]), i && yt(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return 1;} else t.match_available = 1, t.strstart++, t.lookahead--;}return t.match_available && (i = G(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < 2 ? t.strstart : 2, e === Q ? (yt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (yt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;};function St(t, e, a, i, n) {this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = i, this.func = n;}var Dt = [new St(0, 0, 0, 0, function (t, e) {var a = 65535;for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5);;) {if (t.lookahead <= 1) {if (Rt(t), 0 === t.lookahead && e === W) return 1;if (0 === t.lookahead) break;}t.strstart += t.lookahead, t.lookahead = 0;var _i = t.block_start + a;if ((0 === t.strstart || t.strstart >= _i) && (t.lookahead = t.strstart - _i, t.strstart = _i, yt(t, !1), 0 === t.strm.avail_out)) return 1;if (t.strstart - t.block_start >= t.w_size - ct && (yt(t, !1), 0 === t.strm.avail_out)) return 1;}return t.insert = 0, e === Q ? (yt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (yt(t, !1), t.strm.avail_out), 1);}), new St(4, 4, 8, 4, Zt), new St(4, 5, 16, 8, Zt), new St(4, 6, 32, 32, Zt), new St(4, 4, 16, 16, Ut), new St(8, 16, 32, 32, Ut), new St(8, 16, 128, 128, Ut), new St(8, 32, 128, 256, Ut), new St(32, 128, 258, 1024, Ut), new St(32, 258, 258, 4096, Ut)];function Tt() {this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _t, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), mt(this.dyn_ltree), mt(this.dyn_dtree), mt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), mt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), mt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;}var Ot = function Ot(t) {if (!t || !t.state) return gt(t, et);t.total_in = t.total_out = 0, t.data_type = dt;var e = t.state;return e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? 42 : wt, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = W, K(e), $;},It = function It(t) {var e = Ot(t);var a;return e === $ && ((a = t.state).window_size = 2 * a.w_size, mt(a.head), a.max_lazy_match = Dt[a.level].max_lazy, a.good_match = Dt[a.level].good_length, a.nice_match = Dt[a.level].nice_length, a.max_chain_length = Dt[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = 2, a.match_available = 0, a.ins_h = 0), e;},Ft = function Ft(t, e, a, i, n, s) {if (!t) return et;var r = 1;if (e === nt && (e = 6), i < 0 ? (r = 0, i = -i) : i > 15 && (r = 2, i -= 16), n < 1 || n > 9 || a !== _t || i < 8 || i > 15 || e < 0 || e > 9 || s < 0 || s > ot) return gt(t, et);8 === i && (i = 9);var l = new Tt();return t.state = l, l.strm = t, l.wrap = r, l.gzhead = null, l.w_bits = i, l.w_size = 1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = n + 7, l.hash_size = 1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift = ~~((l.hash_bits + 3 - 1) / 3), l.window = new Uint8Array(2 * l.w_size), l.head = new Uint16Array(l.hash_size), l.prev = new Uint16Array(l.w_size), l.lit_bufsize = 1 << n + 6, l.pending_buf_size = 4 * l.lit_bufsize, l.pending_buf = new Uint8Array(l.pending_buf_size), l.d_buf = 1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = e, l.strategy = s, l.method = a, It(t);};var Lt = { deflateInit: function deflateInit(t, e) {return Ft(t, e, _t, 15, 8, ht);}, deflateInit2: Ft, deflateReset: It, deflateResetKeep: Ot, deflateSetHeader: function deflateSetHeader(t, e) {return t && t.state ? 2 !== t.state.wrap ? et : (t.state.gzhead = e, $) : et;}, deflate: function deflate(t, e) {var a, i;if (!t || !t.state || e > V || e < 0) return t ? gt(t, et) : et;var n = t.state;if (!t.output || !t.input && 0 !== t.avail_in || n.status === bt && e !== Q) return gt(t, 0 === t.avail_out ? it : et);n.strm = t;var s = n.last_flush;if (n.last_flush = e, 42 === n.status) if (2 === n.wrap) t.adler = 0, xt(n, 31), xt(n, 139), xt(n, 8), n.gzhead ? (xt(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), xt(n, 255 & n.gzhead.time), xt(n, n.gzhead.time >> 8 & 255), xt(n, n.gzhead.time >> 16 & 255), xt(n, n.gzhead.time >> 24 & 255), xt(n, 9 === n.level ? 2 : n.strategy >= rt || n.level < 2 ? 4 : 0), xt(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (xt(n, 255 & n.gzhead.extra.length), xt(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = M(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (xt(n, 0), xt(n, 0), xt(n, 0), xt(n, 0), xt(n, 0), xt(n, 9 === n.level ? 2 : n.strategy >= rt || n.level < 2 ? 4 : 0), xt(n, 3), n.status = wt);else {var _e3 = _t + (n.w_bits - 8 << 4) << 8,_a3 = -1;_a3 = n.strategy >= rt || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3, _e3 |= _a3 << 6, 0 !== n.strstart && (_e3 |= 32), _e3 += 31 - _e3 % 31, n.status = wt, zt(n, _e3), 0 !== n.strstart && (zt(n, t.adler >>> 16), zt(n, 65535 & t.adler)), t.adler = 1;}if (69 === n.status) if (n.gzhead.extra) {for (a = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), vt(t), a = n.pending, n.pending !== n.pending_buf_size));) {xt(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;}n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73);} else n.status = 73;if (73 === n.status) if (n.gzhead.name) {a = n.pending;do {if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), vt(t), a = n.pending, n.pending === n.pending_buf_size)) {i = 1;break;}i = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, xt(n, i);} while (0 !== i);n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), 0 === i && (n.gzindex = 0, n.status = 91);} else n.status = 91;if (91 === n.status) if (n.gzhead.comment) {a = n.pending;do {if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), vt(t), a = n.pending, n.pending === n.pending_buf_size)) {i = 1;break;}i = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, xt(n, i);} while (0 !== i);n.gzhead.hcrc && n.pending > a && (t.adler = M(t.adler, n.pending_buf, n.pending - a, a)), 0 === i && (n.status = ut);} else n.status = ut;if (n.status === ut && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && vt(t), n.pending + 2 <= n.pending_buf_size && (xt(n, 255 & t.adler), xt(n, t.adler >> 8 & 255), t.adler = 0, n.status = wt)) : n.status = wt), 0 !== n.pending) {if (vt(t), 0 === t.avail_out) return n.last_flush = -1, $;} else if (0 === t.avail_in && pt(e) <= pt(s) && e !== Q) return gt(t, it);if (n.status === bt && 0 !== t.avail_in) return gt(t, it);if (0 !== t.avail_in || 0 !== n.lookahead || e !== W && n.status !== bt) {var _a4 = n.strategy === rt ? function (t, e) {var a;for (;;) {if (0 === t.lookahead && (Rt(t), 0 === t.lookahead)) {if (e === W) return 1;break;}if (t.match_length = 0, a = G(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, a && (yt(t, !1), 0 === t.strm.avail_out)) return 1;}return t.insert = 0, e === Q ? (yt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (yt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;}(n, e) : n.strategy === lt ? function (t, e) {var a, i, n, s;var r = t.window;for (;;) {if (t.lookahead <= ft) {if (Rt(t), t.lookahead <= ft && e === W) return 1;if (0 === t.lookahead) break;}if (t.match_length = 0, t.lookahead >= 3 && t.strstart > 0 && (n = t.strstart - 1, i = r[n], i === r[++n] && i === r[++n] && i === r[++n])) {s = t.strstart + ft;do {} while (i === r[++n] && i === r[++n] && i === r[++n] && i === r[++n] && i === r[++n] && i === r[++n] && i === r[++n] && i === r[++n] && n < s);t.match_length = ft - (s - n), t.match_length > t.lookahead && (t.match_length = t.lookahead);}if (t.match_length >= 3 ? (a = G(t, 1, t.match_length - 3), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (a = G(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), a && (yt(t, !1), 0 === t.strm.avail_out)) return 1;}return t.insert = 0, e === Q ? (yt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (yt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;}(n, e) : Dt[n.level].func(n, e);if (3 !== _a4 && 4 !== _a4 || (n.status = bt), 1 === _a4 || 3 === _a4) return 0 === t.avail_out && (n.last_flush = -1), $;if (2 === _a4 && (e === q ? X(n) : e !== V && (P(n, 0, 0, !1), e === J && (mt(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), vt(t), 0 === t.avail_out)) return n.last_flush = -1, $;}return e !== Q ? $ : n.wrap <= 0 ? tt : (2 === n.wrap ? (xt(n, 255 & t.adler), xt(n, t.adler >> 8 & 255), xt(n, t.adler >> 16 & 255), xt(n, t.adler >> 24 & 255), xt(n, 255 & t.total_in), xt(n, t.total_in >> 8 & 255), xt(n, t.total_in >> 16 & 255), xt(n, t.total_in >> 24 & 255)) : (zt(n, t.adler >>> 16), zt(n, 65535 & t.adler)), vt(t), n.wrap > 0 && (n.wrap = -n.wrap), 0 !== n.pending ? $ : tt);}, deflateEnd: function deflateEnd(t) {if (!t || !t.state) return et;var e = t.state.status;return 42 !== e && 69 !== e && 73 !== e && 91 !== e && e !== ut && e !== wt && e !== bt ? gt(t, et) : (t.state = null, e === wt ? gt(t, at) : $);}, deflateSetDictionary: function deflateSetDictionary(t, e) {var a = e.length;if (!t || !t.state) return et;var i = t.state,n = i.wrap;if (2 === n || 1 === n && 42 !== i.status || i.lookahead) return et;if (1 === n && (t.adler = B(t.adler, e, a, 0)), i.wrap = 0, a >= i.w_size) {0 === n && (mt(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0);var _t2 = new Uint8Array(i.w_size);_t2.set(e.subarray(a - i.w_size, a), 0), e = _t2, a = i.w_size;}var s = t.avail_in,r = t.next_in,l = t.input;for (t.avail_in = a, t.next_in = 0, t.input = e, Rt(i); i.lookahead >= 3;) {var _t3 = i.strstart,_e4 = i.lookahead - 2;do {i.ins_h = kt(i, i.ins_h, i.window[_t3 + 3 - 1]), i.prev[_t3 & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = _t3, _t3++;} while (--_e4);i.strstart = _t3, i.lookahead = 2, Rt(i);}return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = 2, i.match_available = 0, t.next_in = r, t.input = l, t.avail_in = s, i.wrap = n, $;}, deflateInfo: "pako deflate (from Nodeca project)" };var Nt = function Nt(t, e) {return Object.prototype.hasOwnProperty.call(t, e);};var Bt = function Bt(t) {var e = Array.prototype.slice.call(arguments, 1);for (; e.length;) {var _a5 = e.shift();if (_a5) {if ("object" != typeof _a5) throw new TypeError(_a5 + "must be non-object");for (var _e5 in _a5) {Nt(_a5, _e5) && (t[_e5] = _a5[_e5]);}}}return t;},Ct = function Ct(t) {var e = 0;for (var _a6 = 0, _i2 = t.length; _a6 < _i2; _a6++) {e += t[_a6].length;}var a = new Uint8Array(e);for (var _e6 = 0, _i3 = 0, _n = t.length; _e6 < _n; _e6++) {var _n2 = t[_e6];a.set(_n2, _i3), _i3 += _n2.length;}return a;};var Mt = !0;try {String.fromCharCode.apply(null, new Uint8Array(1));} catch (t) {Mt = !1;}var Ht = new Uint8Array(256);for (var _t4 = 0; _t4 < 256; _t4++) {Ht[_t4] = _t4 >= 252 ? 6 : _t4 >= 248 ? 5 : _t4 >= 240 ? 4 : _t4 >= 224 ? 3 : _t4 >= 192 ? 2 : 1;}Ht[254] = Ht[254] = 1;var jt = function jt(t) {if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(t);var e,a,i,n,s,r = t.length,l = 0;for (n = 0; n < r; n++) {a = t.charCodeAt(n), 55296 == (64512 & a) && n + 1 < r && (i = t.charCodeAt(n + 1), 56320 == (64512 & i) && (a = 65536 + (a - 55296 << 10) + (i - 56320), n++)), l += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;}for (e = new Uint8Array(l), s = 0, n = 0; s < l; n++) {a = t.charCodeAt(n), 55296 == (64512 & a) && n + 1 < r && (i = t.charCodeAt(n + 1), 56320 == (64512 & i) && (a = 65536 + (a - 55296 << 10) + (i - 56320), n++)), a < 128 ? e[s++] = a : a < 2048 ? (e[s++] = 192 | a >>> 6, e[s++] = 128 | 63 & a) : a < 65536 ? (e[s++] = 224 | a >>> 12, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a) : (e[s++] = 240 | a >>> 18, e[s++] = 128 | a >>> 12 & 63, e[s++] = 128 | a >>> 6 & 63, e[s++] = 128 | 63 & a);}return e;},Kt = function Kt(t, e) {var a = e || t.length;if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, e));var i, n;var s = new Array(2 * a);for (n = 0, i = 0; i < a;) {var _e7 = t[i++];if (_e7 < 128) {s[n++] = _e7;continue;}var _r = Ht[_e7];if (_r > 4) s[n++] = 65533, i += _r - 1;else {for (_e7 &= 2 === _r ? 31 : 3 === _r ? 15 : 7; _r > 1 && i < a;) {_e7 = _e7 << 6 | 63 & t[i++], _r--;}_r > 1 ? s[n++] = 65533 : _e7 < 65536 ? s[n++] = _e7 : (_e7 -= 65536, s[n++] = 55296 | _e7 >> 10 & 1023, s[n++] = 56320 | 1023 & _e7);}}return function (t, e) {if (e < 65534 && t.subarray && Mt) return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));var a = "";for (var _i4 = 0; _i4 < e; _i4++) {a += String.fromCharCode(t[_i4]);}return a;}(s, n);},Pt = function Pt(t, e) {(e = e || t.length) > t.length && (e = t.length);var a = e - 1;for (; a >= 0 && 128 == (192 & t[a]);) {a--;}return a < 0 || 0 === a ? e : a + Ht[t[a]] > e ? a : e;};var Yt = function Yt() {this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;};var Gt = Object.prototype.toString,Xt = j.Z_NO_FLUSH,Wt = j.Z_SYNC_FLUSH,qt = j.Z_FULL_FLUSH,Jt = j.Z_FINISH,Qt = j.Z_OK,Vt = j.Z_STREAM_END,$t = j.Z_DEFAULT_COMPRESSION,te = j.Z_DEFAULT_STRATEGY,ee = j.Z_DEFLATED;function ae(t) {this.options = Bt({ level: $t, method: ee, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: te }, t || {});var e = this.options;e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Yt(), this.strm.avail_out = 0;var a = Lt.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);if (a !== Qt) throw new Error(H[a]);if (e.header && Lt.deflateSetHeader(this.strm, e.header), e.dictionary) {var _t5;if (_t5 = "string" == typeof e.dictionary ? jt(e.dictionary) : "[object ArrayBuffer]" === Gt.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, a = Lt.deflateSetDictionary(this.strm, _t5), a !== Qt) throw new Error(H[a]);this._dict_set = !0;}}function ie(t, e) {var a = new ae(e);if (a.push(t, !0), a.err) throw a.msg || H[a.err];return a.result;}ae.prototype.push = function (t, e) {var a = this.strm,i = this.options.chunkSize;var n, s;if (this.ended) return !1;for (s = e === ~~e ? e : !0 === e ? Jt : Xt, "string" == typeof t ? a.input = jt(t) : "[object ArrayBuffer]" === Gt.call(t) ? a.input = new Uint8Array(t) : a.input = t, a.next_in = 0, a.avail_in = a.input.length;;) {if (0 === a.avail_out && (a.output = new Uint8Array(i), a.next_out = 0, a.avail_out = i), (s === Wt || s === qt) && a.avail_out <= 6) this.onData(a.output.subarray(0, a.next_out)), a.avail_out = 0;else {if (n = Lt.deflate(a, s), n === Vt) return a.next_out > 0 && this.onData(a.output.subarray(0, a.next_out)), n = Lt.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === Qt;if (0 !== a.avail_out) {if (s > 0 && a.next_out > 0) this.onData(a.output.subarray(0, a.next_out)), a.avail_out = 0;else if (0 === a.avail_in) break;} else this.onData(a.output);}}return !0;}, ae.prototype.onData = function (t) {this.chunks.push(t);}, ae.prototype.onEnd = function (t) {t === Qt && (this.result = Ct(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;};var ne = { Deflate: ae, deflate: ie, deflateRaw: function deflateRaw(t, e) {return (e = e || {}).raw = !0, ie(t, e);}, gzip: function gzip(t, e) {return (e = e || {}).gzip = !0, ie(t, e);}, constants: j };var se = function se(t, e) {var a, i, n, s, r, l, o, h, d, _, f, c, u, w, b, g, p, m, k, v, y, x, z, A;var E = t.state;a = t.next_in, z = t.input, i = a + (t.avail_in - 5), n = t.next_out, A = t.output, s = n - (e - t.avail_out), r = n + (t.avail_out - 257), l = E.dmax, o = E.wsize, h = E.whave, d = E.wnext, _ = E.window, f = E.hold, c = E.bits, u = E.lencode, w = E.distcode, b = (1 << E.lenbits) - 1, g = (1 << E.distbits) - 1;t: do {c < 15 && (f += z[a++] << c, c += 8, f += z[a++] << c, c += 8), p = u[f & b];e: for (;;) {if (m = p >>> 24, f >>>= m, c -= m, m = p >>> 16 & 255, 0 === m) A[n++] = 65535 & p;else {if (!(16 & m)) {if (0 == (64 & m)) {p = u[(65535 & p) + (f & (1 << m) - 1)];continue e;}if (32 & m) {E.mode = 12;break t;}t.msg = "invalid literal/length code", E.mode = 30;break t;}k = 65535 & p, m &= 15, m && (c < m && (f += z[a++] << c, c += 8), k += f & (1 << m) - 1, f >>>= m, c -= m), c < 15 && (f += z[a++] << c, c += 8, f += z[a++] << c, c += 8), p = w[f & g];a: for (;;) {if (m = p >>> 24, f >>>= m, c -= m, m = p >>> 16 & 255, !(16 & m)) {if (0 == (64 & m)) {p = w[(65535 & p) + (f & (1 << m) - 1)];continue a;}t.msg = "invalid distance code", E.mode = 30;break t;}if (v = 65535 & p, m &= 15, c < m && (f += z[a++] << c, c += 8, c < m && (f += z[a++] << c, c += 8)), v += f & (1 << m) - 1, v > l) {t.msg = "invalid distance too far back", E.mode = 30;break t;}if (f >>>= m, c -= m, m = n - s, v > m) {if (m = v - m, m > h && E.sane) {t.msg = "invalid distance too far back", E.mode = 30;break t;}if (y = 0, x = _, 0 === d) {if (y += o - m, m < k) {k -= m;do {A[n++] = _[y++];} while (--m);y = n - v, x = A;}} else if (d < m) {if (y += o + d - m, m -= d, m < k) {k -= m;do {A[n++] = _[y++];} while (--m);if (y = 0, d < k) {m = d, k -= m;do {A[n++] = _[y++];} while (--m);y = n - v, x = A;}}} else if (y += d - m, m < k) {k -= m;do {A[n++] = _[y++];} while (--m);y = n - v, x = A;}for (; k > 2;) {A[n++] = x[y++], A[n++] = x[y++], A[n++] = x[y++], k -= 3;}k && (A[n++] = x[y++], k > 1 && (A[n++] = x[y++]));} else {y = n - v;do {A[n++] = A[y++], A[n++] = A[y++], A[n++] = A[y++], k -= 3;} while (k > 2);k && (A[n++] = A[y++], k > 1 && (A[n++] = A[y++]));}break;}}break;}} while (a < i && n < r);k = c >> 3, a -= k, c -= k << 3, f &= (1 << c) - 1, t.next_in = a, t.next_out = n, t.avail_in = a < i ? i - a + 5 : 5 - (a - i), t.avail_out = n < r ? r - n + 257 : 257 - (n - r), E.hold = f, E.bits = c;};var re = 15,le = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),oe = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),he = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),de = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);var _e = function _e(t, e, a, i, n, s, r, l) {var o = l.bits;var h,d,_,f,c,u,w = 0,b = 0,g = 0,p = 0,m = 0,k = 0,v = 0,y = 0,x = 0,z = 0,A = null,E = 0;var R = new Uint16Array(16),Z = new Uint16Array(16);var U,S,D,T = null,O = 0;for (w = 0; w <= re; w++) {R[w] = 0;}for (b = 0; b < i; b++) {R[e[a + b]]++;}for (m = o, p = re; p >= 1 && 0 === R[p]; p--) {;}if (m > p && (m = p), 0 === p) return n[s++] = 20971520, n[s++] = 20971520, l.bits = 1, 0;for (g = 1; g < p && 0 === R[g]; g++) {;}for (m < g && (m = g), y = 1, w = 1; w <= re; w++) {if (y <<= 1, y -= R[w], y < 0) return -1;}if (y > 0 && (0 === t || 1 !== p)) return -1;for (Z[1] = 0, w = 1; w < re; w++) {Z[w + 1] = Z[w] + R[w];}for (b = 0; b < i; b++) {0 !== e[a + b] && (r[Z[e[a + b]]++] = b);}if (0 === t ? (A = T = r, u = 19) : 1 === t ? (A = le, E -= 257, T = oe, O -= 257, u = 256) : (A = he, T = de, u = -1), z = 0, b = 0, w = g, c = s, k = m, v = 0, _ = -1, x = 1 << m, f = x - 1, 1 === t && x > 852 || 2 === t && x > 592) return 1;for (;;) {U = w - v, r[b] < u ? (S = 0, D = r[b]) : r[b] > u ? (S = T[O + r[b]], D = A[E + r[b]]) : (S = 96, D = 0), h = 1 << w - v, d = 1 << k, g = d;do {d -= h, n[c + (z >> v) + d] = U << 24 | S << 16 | D | 0;} while (0 !== d);for (h = 1 << w - 1; z & h;) {h >>= 1;}if (0 !== h ? (z &= h - 1, z += h) : z = 0, b++, 0 == --R[w]) {if (w === p) break;w = e[a + r[b]];}if (w > m && (z & f) !== _) {for (0 === v && (v = m), c += g, k = w - v, y = 1 << k; k + v < p && (y -= R[k + v], !(y <= 0));) {k++, y <<= 1;}if (x += 1 << k, 1 === t && x > 852 || 2 === t && x > 592) return 1;_ = z & f, n[_] = m << 24 | k << 16 | c - s | 0;}}return 0 !== z && (n[c + z] = w - v << 24 | 64 << 16 | 0), l.bits = m, 0;};var fe = j.Z_FINISH,ce = j.Z_BLOCK,ue = j.Z_TREES,we = j.Z_OK,be = j.Z_STREAM_END,ge = j.Z_NEED_DICT,pe = j.Z_STREAM_ERROR,me = j.Z_DATA_ERROR,ke = j.Z_MEM_ERROR,ve = j.Z_BUF_ERROR,ye = j.Z_DEFLATED,xe = 12,ze = 30,Ae = function Ae(t) {return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);};function Ee() {this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;}var Re = function Re(t) {if (!t || !t.state) return pe;var e = t.state;return t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = 1, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new Int32Array(852), e.distcode = e.distdyn = new Int32Array(592), e.sane = 1, e.back = -1, we;},Ze = function Ze(t) {if (!t || !t.state) return pe;var e = t.state;return e.wsize = 0, e.whave = 0, e.wnext = 0, Re(t);},Ue = function Ue(t, e) {var a;if (!t || !t.state) return pe;var i = t.state;return e < 0 ? (a = 0, e = -e) : (a = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? pe : (null !== i.window && i.wbits !== e && (i.window = null), i.wrap = a, i.wbits = e, Ze(t));},Se = function Se(t, e) {if (!t) return pe;var a = new Ee();t.state = a, a.window = null;var i = Ue(t, e);return i !== we && (t.state = null), i;};var De,Te,Oe = !0;var Ie = function Ie(t) {if (Oe) {De = new Int32Array(512), Te = new Int32Array(32);var _e8 = 0;for (; _e8 < 144;) {t.lens[_e8++] = 8;}for (; _e8 < 256;) {t.lens[_e8++] = 9;}for (; _e8 < 280;) {t.lens[_e8++] = 7;}for (; _e8 < 288;) {t.lens[_e8++] = 8;}for (_e(1, t.lens, 0, 288, De, 0, t.work, { bits: 9 }), _e8 = 0; _e8 < 32;) {t.lens[_e8++] = 5;}_e(2, t.lens, 0, 32, Te, 0, t.work, { bits: 5 }), Oe = !1;}t.lencode = De, t.lenbits = 9, t.distcode = Te, t.distbits = 5;},Fe = function Fe(t, e, a, i) {var n;var s = t.state;return null === s.window && (s.wsize = 1 << s.wbits, s.wnext = 0, s.whave = 0, s.window = new Uint8Array(s.wsize)), i >= s.wsize ? (s.window.set(e.subarray(a - s.wsize, a), 0), s.wnext = 0, s.whave = s.wsize) : (n = s.wsize - s.wnext, n > i && (n = i), s.window.set(e.subarray(a - i, a - i + n), s.wnext), (i -= n) ? (s.window.set(e.subarray(a - i, a), 0), s.wnext = i, s.whave = s.wsize) : (s.wnext += n, s.wnext === s.wsize && (s.wnext = 0), s.whave < s.wsize && (s.whave += n))), 0;};var Le = { inflateReset: Ze, inflateReset2: Ue, inflateResetKeep: Re, inflateInit: function inflateInit(t) {return Se(t, 15);}, inflateInit2: Se, inflate: function inflate(t, e) {var a,i,n,s,r,l,o,h,d,_,f,c,u,w,b,g,p,m,k,v,y,x,z = 0;var A = new Uint8Array(4);var E, R;var Z = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return pe;a = t.state, a.mode === xe && (a.mode = 13), r = t.next_out, n = t.output, o = t.avail_out, s = t.next_in, i = t.input, l = t.avail_in, h = a.hold, d = a.bits, _ = l, f = o, x = we;t: for (;;) {switch (a.mode) {case 1:if (0 === a.wrap) {a.mode = 13;break;}for (; d < 16;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (2 & a.wrap && 35615 === h) {a.check = 0, A[0] = 255 & h, A[1] = h >>> 8 & 255, a.check = M(a.check, A, 2, 0), h = 0, d = 0, a.mode = 2;break;}if (a.flags = 0, a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & h) << 8) + (h >> 8)) % 31) {t.msg = "incorrect header check", a.mode = ze;break;}if ((15 & h) !== ye) {t.msg = "unknown compression method", a.mode = ze;break;}if (h >>>= 4, d -= 4, y = 8 + (15 & h), 0 === a.wbits) a.wbits = y;else if (y > a.wbits) {t.msg = "invalid window size", a.mode = ze;break;}a.dmax = 1 << a.wbits, t.adler = a.check = 1, a.mode = 512 & h ? 10 : xe, h = 0, d = 0;break;case 2:for (; d < 16;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (a.flags = h, (255 & a.flags) !== ye) {t.msg = "unknown compression method", a.mode = ze;break;}if (57344 & a.flags) {t.msg = "unknown header flags set", a.mode = ze;break;}a.head && (a.head.text = h >> 8 & 1), 512 & a.flags && (A[0] = 255 & h, A[1] = h >>> 8 & 255, a.check = M(a.check, A, 2, 0)), h = 0, d = 0, a.mode = 3;case 3:for (; d < 32;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.head && (a.head.time = h), 512 & a.flags && (A[0] = 255 & h, A[1] = h >>> 8 & 255, A[2] = h >>> 16 & 255, A[3] = h >>> 24 & 255, a.check = M(a.check, A, 4, 0)), h = 0, d = 0, a.mode = 4;case 4:for (; d < 16;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.head && (a.head.xflags = 255 & h, a.head.os = h >> 8), 512 & a.flags && (A[0] = 255 & h, A[1] = h >>> 8 & 255, a.check = M(a.check, A, 2, 0)), h = 0, d = 0, a.mode = 5;case 5:if (1024 & a.flags) {for (; d < 16;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.length = h, a.head && (a.head.extra_len = h), 512 & a.flags && (A[0] = 255 & h, A[1] = h >>> 8 & 255, a.check = M(a.check, A, 2, 0)), h = 0, d = 0;} else a.head && (a.head.extra = null);a.mode = 6;case 6:if (1024 & a.flags && (c = a.length, c > l && (c = l), c && (a.head && (y = a.head.extra_len - a.length, a.head.extra || (a.head.extra = new Uint8Array(a.head.extra_len)), a.head.extra.set(i.subarray(s, s + c), y)), 512 & a.flags && (a.check = M(a.check, i, c, s)), l -= c, s += c, a.length -= c), a.length)) break t;a.length = 0, a.mode = 7;case 7:if (2048 & a.flags) {if (0 === l) break t;c = 0;do {y = i[s + c++], a.head && y && a.length < 65536 && (a.head.name += String.fromCharCode(y));} while (y && c < l);if (512 & a.flags && (a.check = M(a.check, i, c, s)), l -= c, s += c, y) break t;} else a.head && (a.head.name = null);a.length = 0, a.mode = 8;case 8:if (4096 & a.flags) {if (0 === l) break t;c = 0;do {y = i[s + c++], a.head && y && a.length < 65536 && (a.head.comment += String.fromCharCode(y));} while (y && c < l);if (512 & a.flags && (a.check = M(a.check, i, c, s)), l -= c, s += c, y) break t;} else a.head && (a.head.comment = null);a.mode = 9;case 9:if (512 & a.flags) {for (; d < 16;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (h !== (65535 & a.check)) {t.msg = "header crc mismatch", a.mode = ze;break;}h = 0, d = 0;}a.head && (a.head.hcrc = a.flags >> 9 & 1, a.head.done = !0), t.adler = a.check = 0, a.mode = xe;break;case 10:for (; d < 32;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}t.adler = a.check = Ae(h), h = 0, d = 0, a.mode = 11;case 11:if (0 === a.havedict) return t.next_out = r, t.avail_out = o, t.next_in = s, t.avail_in = l, a.hold = h, a.bits = d, ge;t.adler = a.check = 1, a.mode = xe;case xe:if (e === ce || e === ue) break t;case 13:if (a.last) {h >>>= 7 & d, d -= 7 & d, a.mode = 27;break;}for (; d < 3;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}switch (a.last = 1 & h, h >>>= 1, d -= 1, 3 & h) {case 0:a.mode = 14;break;case 1:if (Ie(a), a.mode = 20, e === ue) {h >>>= 2, d -= 2;break t;}break;case 2:a.mode = 17;break;case 3:t.msg = "invalid block type", a.mode = ze;}h >>>= 2, d -= 2;break;case 14:for (h >>>= 7 & d, d -= 7 & d; d < 32;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if ((65535 & h) != (h >>> 16 ^ 65535)) {t.msg = "invalid stored block lengths", a.mode = ze;break;}if (a.length = 65535 & h, h = 0, d = 0, a.mode = 15, e === ue) break t;case 15:a.mode = 16;case 16:if (c = a.length, c) {if (c > l && (c = l), c > o && (c = o), 0 === c) break t;n.set(i.subarray(s, s + c), r), l -= c, s += c, o -= c, r += c, a.length -= c;break;}a.mode = xe;break;case 17:for (; d < 14;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (a.nlen = 257 + (31 & h), h >>>= 5, d -= 5, a.ndist = 1 + (31 & h), h >>>= 5, d -= 5, a.ncode = 4 + (15 & h), h >>>= 4, d -= 4, a.nlen > 286 || a.ndist > 30) {t.msg = "too many length or distance symbols", a.mode = ze;break;}a.have = 0, a.mode = 18;case 18:for (; a.have < a.ncode;) {for (; d < 3;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.lens[Z[a.have++]] = 7 & h, h >>>= 3, d -= 3;}for (; a.have < 19;) {a.lens[Z[a.have++]] = 0;}if (a.lencode = a.lendyn, a.lenbits = 7, E = { bits: a.lenbits }, x = _e(0, a.lens, 0, 19, a.lencode, 0, a.work, E), a.lenbits = E.bits, x) {t.msg = "invalid code lengths set", a.mode = ze;break;}a.have = 0, a.mode = 19;case 19:for (; a.have < a.nlen + a.ndist;) {for (; z = a.lencode[h & (1 << a.lenbits) - 1], b = z >>> 24, g = z >>> 16 & 255, p = 65535 & z, !(b <= d);) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (p < 16) h >>>= b, d -= b, a.lens[a.have++] = p;else {if (16 === p) {for (R = b + 2; d < R;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (h >>>= b, d -= b, 0 === a.have) {t.msg = "invalid bit length repeat", a.mode = ze;break;}y = a.lens[a.have - 1], c = 3 + (3 & h), h >>>= 2, d -= 2;} else if (17 === p) {for (R = b + 3; d < R;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}h >>>= b, d -= b, y = 0, c = 3 + (7 & h), h >>>= 3, d -= 3;} else {for (R = b + 7; d < R;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}h >>>= b, d -= b, y = 0, c = 11 + (127 & h), h >>>= 7, d -= 7;}if (a.have + c > a.nlen + a.ndist) {t.msg = "invalid bit length repeat", a.mode = ze;break;}for (; c--;) {a.lens[a.have++] = y;}}}if (a.mode === ze) break;if (0 === a.lens[256]) {t.msg = "invalid code -- missing end-of-block", a.mode = ze;break;}if (a.lenbits = 9, E = { bits: a.lenbits }, x = _e(1, a.lens, 0, a.nlen, a.lencode, 0, a.work, E), a.lenbits = E.bits, x) {t.msg = "invalid literal/lengths set", a.mode = ze;break;}if (a.distbits = 6, a.distcode = a.distdyn, E = { bits: a.distbits }, x = _e(2, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, E), a.distbits = E.bits, x) {t.msg = "invalid distances set", a.mode = ze;break;}if (a.mode = 20, e === ue) break t;case 20:a.mode = 21;case 21:if (l >= 6 && o >= 258) {t.next_out = r, t.avail_out = o, t.next_in = s, t.avail_in = l, a.hold = h, a.bits = d, se(t, f), r = t.next_out, n = t.output, o = t.avail_out, s = t.next_in, i = t.input, l = t.avail_in, h = a.hold, d = a.bits, a.mode === xe && (a.back = -1);break;}for (a.back = 0; z = a.lencode[h & (1 << a.lenbits) - 1], b = z >>> 24, g = z >>> 16 & 255, p = 65535 & z, !(b <= d);) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (g && 0 == (240 & g)) {for (m = b, k = g, v = p; z = a.lencode[v + ((h & (1 << m + k) - 1) >> m)], b = z >>> 24, g = z >>> 16 & 255, p = 65535 & z, !(m + b <= d);) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}h >>>= m, d -= m, a.back += m;}if (h >>>= b, d -= b, a.back += b, a.length = p, 0 === g) {a.mode = 26;break;}if (32 & g) {a.back = -1, a.mode = xe;break;}if (64 & g) {t.msg = "invalid literal/length code", a.mode = ze;break;}a.extra = 15 & g, a.mode = 22;case 22:if (a.extra) {for (R = a.extra; d < R;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.length += h & (1 << a.extra) - 1, h >>>= a.extra, d -= a.extra, a.back += a.extra;}a.was = a.length, a.mode = 23;case 23:for (; z = a.distcode[h & (1 << a.distbits) - 1], b = z >>> 24, g = z >>> 16 & 255, p = 65535 & z, !(b <= d);) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (0 == (240 & g)) {for (m = b, k = g, v = p; z = a.distcode[v + ((h & (1 << m + k) - 1) >> m)], b = z >>> 24, g = z >>> 16 & 255, p = 65535 & z, !(m + b <= d);) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}h >>>= m, d -= m, a.back += m;}if (h >>>= b, d -= b, a.back += b, 64 & g) {t.msg = "invalid distance code", a.mode = ze;break;}a.offset = p, a.extra = 15 & g, a.mode = 24;case 24:if (a.extra) {for (R = a.extra; d < R;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}a.offset += h & (1 << a.extra) - 1, h >>>= a.extra, d -= a.extra, a.back += a.extra;}if (a.offset > a.dmax) {t.msg = "invalid distance too far back", a.mode = ze;break;}a.mode = 25;case 25:if (0 === o) break t;if (c = f - o, a.offset > c) {if (c = a.offset - c, c > a.whave && a.sane) {t.msg = "invalid distance too far back", a.mode = ze;break;}c > a.wnext ? (c -= a.wnext, u = a.wsize - c) : u = a.wnext - c, c > a.length && (c = a.length), w = a.window;} else w = n, u = r - a.offset, c = a.length;c > o && (c = o), o -= c, a.length -= c;do {n[r++] = w[u++];} while (--c);0 === a.length && (a.mode = 21);break;case 26:if (0 === o) break t;n[r++] = a.length, o--, a.mode = 21;break;case 27:if (a.wrap) {for (; d < 32;) {if (0 === l) break t;l--, h |= i[s++] << d, d += 8;}if (f -= o, t.total_out += f, a.total += f, f && (t.adler = a.check = a.flags ? M(a.check, n, f, r - f) : B(a.check, n, f, r - f)), f = o, (a.flags ? h : Ae(h)) !== a.check) {t.msg = "incorrect data check", a.mode = ze;break;}h = 0, d = 0;}a.mode = 28;case 28:if (a.wrap && a.flags) {for (; d < 32;) {if (0 === l) break t;l--, h += i[s++] << d, d += 8;}if (h !== (4294967295 & a.total)) {t.msg = "incorrect length check", a.mode = ze;break;}h = 0, d = 0;}a.mode = 29;case 29:x = be;break t;case ze:x = me;break t;case 31:return ke;case 32:default:return pe;}}return t.next_out = r, t.avail_out = o, t.next_in = s, t.avail_in = l, a.hold = h, a.bits = d, (a.wsize || f !== t.avail_out && a.mode < ze && (a.mode < 27 || e !== fe)) && Fe(t, t.output, t.next_out, f - t.avail_out), _ -= t.avail_in, f -= t.avail_out, t.total_in += _, t.total_out += f, a.total += f, a.wrap && f && (t.adler = a.check = a.flags ? M(a.check, n, f, t.next_out - f) : B(a.check, n, f, t.next_out - f)), t.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === xe ? 128 : 0) + (20 === a.mode || 15 === a.mode ? 256 : 0), (0 === _ && 0 === f || e === fe) && x === we && (x = ve), x;}, inflateEnd: function inflateEnd(t) {if (!t || !t.state) return pe;var e = t.state;return e.window && (e.window = null), t.state = null, we;}, inflateGetHeader: function inflateGetHeader(t, e) {if (!t || !t.state) return pe;var a = t.state;return 0 == (2 & a.wrap) ? pe : (a.head = e, e.done = !1, we);}, inflateSetDictionary: function inflateSetDictionary(t, e) {var a = e.length;var i, n, s;return t && t.state ? (i = t.state, 0 !== i.wrap && 11 !== i.mode ? pe : 11 === i.mode && (n = 1, n = B(n, e, a, 0), n !== i.check) ? me : (s = Fe(t, e, a, a), s ? (i.mode = 31, ke) : (i.havedict = 1, we))) : pe;}, inflateInfo: "pako inflate (from Nodeca project)" };var Ne = function Ne() {this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;};var Be = Object.prototype.toString,Ce = j.Z_NO_FLUSH,Me = j.Z_FINISH,He = j.Z_OK,je = j.Z_STREAM_END,Ke = j.Z_NEED_DICT,Pe = j.Z_STREAM_ERROR,Ye = j.Z_DATA_ERROR,Ge = j.Z_MEM_ERROR;function Xe(t) {this.options = Bt({ chunkSize: 65536, windowBits: 15, to: "" }, t || {});var e = this.options;e.raw && e.windowBits >= 0 && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(e.windowBits >= 0 && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Yt(), this.strm.avail_out = 0;var a = Le.inflateInit2(this.strm, e.windowBits);if (a !== He) throw new Error(H[a]);if (this.header = new Ne(), Le.inflateGetHeader(this.strm, this.header), e.dictionary && ("string" == typeof e.dictionary ? e.dictionary = jt(e.dictionary) : "[object ArrayBuffer]" === Be.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)), e.raw && (a = Le.inflateSetDictionary(this.strm, e.dictionary), a !== He))) throw new Error(H[a]);}function We(t, e) {var a = new Xe(e);if (a.push(t), a.err) throw a.msg || H[a.err];return a.result;}Xe.prototype.push = function (t, e) {var a = this.strm,i = this.options.chunkSize,n = this.options.dictionary;var s, r, l;if (this.ended) return !1;for (r = e === ~~e ? e : !0 === e ? Me : Ce, "[object ArrayBuffer]" === Be.call(t) ? a.input = new Uint8Array(t) : a.input = t, a.next_in = 0, a.avail_in = a.input.length;;) {for (0 === a.avail_out && (a.output = new Uint8Array(i), a.next_out = 0, a.avail_out = i), s = Le.inflate(a, r), s === Ke && n && (s = Le.inflateSetDictionary(a, n), s === He ? s = Le.inflate(a, r) : s === Ye && (s = Ke)); a.avail_in > 0 && s === je && a.state.wrap > 0 && 0 !== t[a.next_in];) {Le.inflateReset(a), s = Le.inflate(a, r);}switch (s) {case Pe:case Ye:case Ke:case Ge:return this.onEnd(s), this.ended = !0, !1;}if (l = a.avail_out, a.next_out && (0 === a.avail_out || s === je)) if ("string" === this.options.to) {var _t6 = Pt(a.output, a.next_out),_e9 = a.next_out - _t6,_n3 = Kt(a.output, _t6);a.next_out = _e9, a.avail_out = i - _e9, _e9 && a.output.set(a.output.subarray(_t6, _t6 + _e9), 0), this.onData(_n3);} else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out));if (s !== He || 0 !== l) {if (s === je) return s = Le.inflateEnd(this.strm), this.onEnd(s), this.ended = !0, !0;if (0 === a.avail_in) break;}}return !0;}, Xe.prototype.onData = function (t) {this.chunks.push(t);}, Xe.prototype.onEnd = function (t) {t === He && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = Ct(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg;};var qe = { Inflate: Xe, inflate: We, inflateRaw: function inflateRaw(t, e) {return (e = e || {}).raw = !0, We(t, e);}, ungzip: We, constants: j };var Je = ne.Deflate,Qe = ne.deflate,Ve = ne.deflateRaw,$e = ne.gzip,ta = qe.Inflate,ea = qe.inflate,aa = qe.inflateRaw,ia = qe.ungzip;var na = Je,sa = Qe,ra = Ve,la = $e,oa = ta,ha = ea,da = aa,_a = ia,fa = j,ca = { Deflate: na, deflate: sa, deflateRaw: ra, gzip: la, Inflate: oa, inflate: ha, inflateRaw: da, ungzip: _a, constants: fa };t.Deflate = na, t.Inflate = oa, t.constants = fa, t.default = ca, t.deflate = sa, t.deflateRaw = ra, t.gzip = la, t.inflate = ha, t.inflateRaw = da, t.ungzip = _a, Object.defineProperty(t, "__esModule", { value: !0 });});

/***/ }),

/***/ 60:
/*!**********************************!*\
  !*** D:/uniapp/魔域/utils/moyu.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.vGENDER = exports.VQUFU = exports.VZHIYE = void 0;var VZHIYE = [
{
  value: '魔法师',
  label: '魔法师',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-01.jpg' },

{
  value: '战士',
  label: '战士',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-02.jpg' },

{
  value: '亡灵巫师',
  label: '亡灵巫师',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-02.jpg' },

{
  value: '异能者',
  label: '异能者',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-04.jpg' },

{
  value: '血族',
  label: '血族',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-05.jpg' },

{
  value: '暗黑龙骑',
  label: '暗黑龙骑',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-06.jpg' },

{
  value: '精灵游侠',
  label: '精灵游侠',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-07.jpg' },

{
  value: '御剑师',
  label: '御剑师',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-08.jpg' },

{
  value: '星辰神子',
  label: '星辰神子',
  url: 'https://img7.99.com/my/index/2016/new/pop-classes-09.jpg' }];exports.VZHIYE = VZHIYE;



var VQUFU = [
{
  value: '第一大区（福建电信）',
  label: '第一大区（福建电信）',
  children: [
  {
    value: '福建一区',
    label: '福建一区' },

  {
    value: '福建二区',
    label: '福建二区' },

  {
    value: '福建三区',
    label: '福建三区' },

  {
    value: '福建五区',
    label: '福建五区' },

  {
    value: '福建九区',
    label: '福建九区' },

  {
    value: '福建三十五区',
    label: '福建三十五区' },

  {
    value: '海西三十区',
    label: '海西三十区' },

  {
    value: '闽江一区',
    label: '闽江一区' },

  {
    value: '闽江六区',
    label: '闽江六区' },

  {
    value: '闽江十二区',
    label: '闽江十二区' },

  {
    value: '闽江十三区',
    label: '闽江十三区' },

  {
    value: '闽江十六区',
    label: '闽江十六区' },

  {
    value: '闽江十七区',
    label: '闽江十七区' },

  {
    value: '闽江十八区',
    label: '闽江十八区' }] },



{
  value: '第二大区（山东网通新）',
  label: '第二大区（山东网通新）',
  children: [
  {
    value: '山东一区',
    label: '山东一区' },

  {
    value: '山东二区',
    label: '山东二区' },

  {
    value: '山东五区',
    label: '山东五区' },

  {
    value: '山东九区',
    label: '山东九区' },

  {
    value: '山东新二十九区',
    label: '山东新二十九区' },

  {
    value: '济南十区',
    label: '济南十区' },

  {
    value: '济南二十六区',
    label: '济南二十六区' },

  {
    value: '济南三十区',
    label: '济南三十区' },

  {
    value: '济南三十八区',
    label: '济南三十八区' },

  {
    value: '青岛一区',
    label: '青岛一区' },

  {
    value: '青岛三区',
    label: '青岛三区' },

  {
    value: '青岛五区',
    label: '青岛五区' },

  {
    value: '青岛六区',
    label: '青岛六区' },

  {
    value: '青岛七区',
    label: '青岛七区' }] },



{
  value: '第三大区（东北网通）',
  label: '第三大区（东北网通）',
  children: [
  {
    value: '辽宁一区',
    label: '辽宁一区' },

  {
    value: '辽宁三区',
    label: '辽宁三区' },

  {
    value: '哈尔滨二十区',
    label: '哈尔滨二十区' },

  {
    value: '哈尔滨三十三区',
    label: '哈尔滨三十三区' },

  {
    value: '关东九区',
    label: '关东九区' },

  {
    value: '关东十八区',
    label: '关东十八区' },

  {
    value: '关东三十二区',
    label: '关东三十二区' },

  {
    value: '关东三十七区',
    label: '关东三十七区' },

  {
    value: '长白山一区',
    label: '长白山一区' },

  {
    value: '长白山二区',
    label: '长白山二区' },

  {
    value: '长白山三区',
    label: '长白山三区' },

  {
    value: '长白山五区',
    label: '长白山五区' },

  {
    value: '长白山六区',
    label: '长白山六区' }] },



{
  value: '第四大区（广东电信）',
  label: '第四大区（广东电信）',
  children: [
  {
    value: '广东一区',
    label: '广东一区' },

  {
    value: '广东二区',
    label: '广东二区' },

  {
    value: '广东五区',
    label: '广东五区' },

  {
    value: '广东六区',
    label: '广东六区' },

  {
    value: '广东十一区',
    label: '广东十一区' },

  {
    value: '岭南十七区',
    label: '岭南十七区' },

  {
    value: '岭南二十六区',
    label: '岭南二十六区' },

  {
    value: '粤广十二区',
    label: '粤广十二区' },

  {
    value: '粤广二十一区',
    label: '粤广二十一区' },

  {
    value: '粤广二十五区',
    label: '粤广二十五区' },

  {
    value: '粤广二十六区',
    label: '粤广二十六区' },

  {
    value: '粤广二十七区',
    label: '粤广二十七区' },

  {
    value: '粤广二十八区',
    label: '粤广二十八区' },

  {
    value: '粤广二十九区',
    label: '粤广二十九区' }] },



{
  value: '第五大区（上海电信新）',
  label: '第五大区（上海电信新）',
  children: [
  {
    value: '上海一区',
    label: '上海一区' },

  {
    value: '上海二区',
    label: '上海二区' },

  {
    value: '上海三区',
    label: '上海三区' },

  {
    value: '淞沪五区',
    label: '淞沪五区' },

  {
    value: '魔都二十七区',
    label: '魔都二十七区' },

  {
    value: '魔都二十九区',
    label: '魔都二十九区' },

  {
    value: '浦东二区',
    label: '浦东二区' },

  {
    value: '浦东七区',
    label: '浦东七区' },

  {
    value: '浦东十一区',
    label: '浦东十一区' },

  {
    value: '浦东十三区',
    label: '浦东十三区' },

  {
    value: '浦东十五区',
    label: '浦东十五区' },

  {
    value: '浦东十六区',
    label: '浦东十六区' },

  {
    value: '浦东十七区',
    label: '浦东十七区' },

  {
    value: '浦东十八区',
    label: '浦东十八区' }] },



{
  value: '第六大区（四川电信）',
  label: '第六大区（四川电信）',
  children: [
  {
    value: '四川一区',
    label: '四川一区' },

  {
    value: '四川二区',
    label: '四川二区' },

  {
    value: '四川十二区',
    label: '四川十二区' },

  {
    value: '天府五区',
    label: '天府五区' },

  {
    value: '卧龙十一区',
    label: '卧龙十一区' },

  {
    value: '卧龙十三区',
    label: '卧龙十三区' },

  {
    value: '卧龙十九区',
    label: '卧龙十九区' },

  {
    value: '卧龙二十八区',
    label: '卧龙二十八区' },

  {
    value: '卧龙三十区',
    label: '卧龙三十区' },

  {
    value: '卧龙三十二区',
    label: '卧龙三十二区' },

  {
    value: '卧龙三十三区',
    label: '卧龙三十三区' }] },



{
  value: '第七大区（浙江电信）',
  label: '第七大区（浙江电信）',
  children: [
  {
    value: '浙江一区',
    label: '浙江一区' },

  {
    value: '浙江新一区',
    label: '浙江新一区' },

  {
    value: '浙江新二区',
    label: '浙江新二区' },

  {
    value: '江南三区',
    label: '江南三区' },

  {
    value: '江南二十五区',
    label: '江南二十五区' },

  {
    value: '浙杭十七区',
    label: '浙杭十七区' },

  {
    value: '浙杭二十九区',
    label: '浙杭二十九区' },

  {
    value: '浙杭三十一区',
    label: '浙杭三十一区' },

  {
    value: '浙杭三十五区',
    label: '浙杭三十五区' },

  {
    value: '良渚二区',
    label: '良渚二区' },

  {
    value: '良渚五区',
    label: '良渚五区' },

  {
    value: '良渚六区',
    label: '良渚六区' },

  {
    value: '良渚七区',
    label: '良渚七区' },

  {
    value: '良渚八区',
    label: '良渚八区' },

  {
    value: '良渚九区',
    label: '良渚九区' }] },



{
  value: '第八大区（江苏电信）',
  label: '第八大区（江苏电信）',
  children: [
  {
    value: '江苏一区',
    label: '江苏一区' },

  {
    value: '江苏二区',
    label: '江苏二区' },

  {
    value: '江苏七区',
    label: '江苏七区' },

  {
    value: '江苏十七区',
    label: '江苏十七区' },

  {
    value: '秦淮十八区',
    label: '秦淮十八区' },

  {
    value: '楚汉一区',
    label: '楚汉一区' },

  {
    value: '楚汉六区',
    label: '楚汉六区' },

  {
    value: '楚汉十区',
    label: '楚汉十区' },

  {
    value: '楚汉十二区',
    label: '楚汉十二区' },

  {
    value: '楚汉十五区',
    label: '楚汉十五区' },

  {
    value: '楚汉十六区',
    label: '楚汉十六区' },

  {
    value: '楚汉十七区',
    label: '楚汉十七区' }] },



{
  value: '第九大区（湖南电信新）',
  label: '第九大区（湖南电信新）',
  children: [
  {
    value: '湖南一区',
    label: '湖南一区' },

  {
    value: '湖南二区',
    label: '湖南二区' },

  {
    value: '湖南八区',
    label: '湖南八区' },

  {
    value: '湘楚三十五区',
    label: '湘楚三十五区' },

  {
    value: '三湘三十二区',
    label: '三湘三十二区' },

  {
    value: '湘江一区',
    label: '湘江一区' },

  {
    value: '湘江九区',
    label: '湘江九区' },

  {
    value: '湘江十二区',
    label: '湘江十二区' },

  {
    value: '湘江十五区',
    label: '湘江十五区' },

  {
    value: '湘江十六区',
    label: '湘江十六区' },

  {
    value: '湘江十七区',
    label: '湘江十七区' },

  {
    value: '湘江十八区',
    label: '湘江十八区' }] },



{
  value: '第十大区（湖北电信新）',
  label: '第十大区（湖北电信新）',
  children: [
  {
    value: '湖北一区',
    label: '湖北一区' },

  {
    value: '湖北二区',
    label: '湖北二区' },

  {
    value: '湖北九区',
    label: '湖北九区' },

  {
    value: '武汉十二区',
    label: '武汉十二区' },

  {
    value: '江汉二十六区',
    label: '江汉二十六区' },

  {
    value: '江汉三十三区',
    label: '江汉三十三区' },

  {
    value: '荆州六区',
    label: '荆州六区' },

  {
    value: '荆州七区',
    label: '荆州七区' },

  {
    value: '荆州十三区',
    label: '荆州十三区' },

  {
    value: '荆州十五区',
    label: '荆州十五区' },

  {
    value: '荆州十六区',
    label: '荆州十六区' },

  {
    value: '荆州十七区',
    label: '荆州十七区' },

  {
    value: '荆州十八区',
    label: '荆州十八区' }] },



{
  value: '第十一大区（江西电信新）',
  label: '第十一大区（江西电信新）',
  children: [
  {
    value: '江西一区',
    label: '江西一区' },

  {
    value: '江西三区',
    label: '江西三区' },

  {
    value: '江西七区',
    label: '江西七区' },

  {
    value: '婺源二十七区',
    label: '婺源二十七区' },

  {
    value: '婺源三十八区',
    label: '婺源三十八区' },

  {
    value: '九江八区',
    label: '九江八区' },

  {
    value: '九江二十八区',
    label: '九江二十八区' },

  {
    value: '九江三十一区',
    label: '九江三十一区' },

  {
    value: '九江三十八区',
    label: '九江三十八区' },

  {
    value: '庐山三区',
    label: '庐山三区' },

  {
    value: '庐山六区',
    label: '庐山六区' },

  {
    value: '庐山七区',
    label: '庐山七区' },

  {
    value: '庐山八区',
    label: '庐山八区' },

  {
    value: '庐山九区',
    label: '庐山九区' }] },



{
  value: '第十二大区（广西电信新）',
  label: '第十二大区（广西电信新）',
  children: [
  {
    value: '广西一区',
    label: '广西一区' },

  {
    value: '广西二区',
    label: '广西二区' },

  {
    value: '广西三区',
    label: '广西三区' },

  {
    value: '广西十一区',
    label: '广西十一区' },

  {
    value: '桂林十八区',
    label: '桂林十八区' },

  {
    value: '桂林二十二区',
    label: '桂林二十二区' },

  {
    value: '桂林三十三区',
    label: '桂林三十三区' },

  {
    value: '桂林三十六区',
    label: '桂林三十六区' },

  {
    value: '桂林三十九区',
    label: '桂林三十九区' },

  {
    value: '南越二区',
    label: '南越二区' },

  {
    value: '南越三区',
    label: '南越三区' },

  {
    value: '南越五区',
    label: '南越五区' },

  {
    value: '南越六区',
    label: '南越六区' },

  {
    value: '南越七区',
    label: '南越七区' }] },



{
  value: '第十三大区（安徽电信新）',
  label: '第十三大区（安徽电信新）',
  children: [
  {
    value: '安徽一区',
    label: '安徽一区' },

  {
    value: '安徽二区',
    label: '安徽二区' },

  {
    value: '安徽三区',
    label: '安徽三区' },

  {
    value: '安徽九区',
    label: '安徽九区' },

  {
    value: '安徽新一区',
    label: '安徽新一区' },

  {
    value: '徽州六区',
    label: '徽州六区' },

  {
    value: '徽州二十一区',
    label: '徽州二十一区' },

  {
    value: '徽州二十八区',
    label: '徽州二十八区' },

  {
    value: '徽州三十三区',
    label: '徽州三十三区' },

  {
    value: '徽州三十七区',
    label: '徽州三十七区' },

  {
    value: '徽州三十九区',
    label: '徽州三十九区' },

  {
    value: '黄山一区',
    label: '黄山一区' },

  {
    value: '黄山二区',
    label: '黄山二区' },

  {
    value: '黄山三区',
    label: '黄山三区' },

  {
    value: '黄山五区',
    label: '黄山五区' }] },



{
  value: '第十四大区（北京网通）',
  label: '第十四大区（北京网通）',
  children: [
  {
    value: '北京一区',
    label: '北京一区' },

  {
    value: '北京二区',
    label: '北京二区' },

  {
    value: '黑龙江一区',
    label: '黑龙江一区' },

  {
    value: '帝都十三区',
    label: '帝都十三区' },

  {
    value: '帝都二十二区',
    label: '帝都二十二区' },

  {
    value: '燕京一区',
    label: '燕京一区' },

  {
    value: '燕京十区',
    label: '燕京十区' },

  {
    value: '燕京十五区',
    label: '燕京十五区' },

  {
    value: '燕京十八区',
    label: '燕京十八区' },

  {
    value: '燕京十九区',
    label: '燕京十九区' },

  {
    value: '燕京二十区',
    label: '燕京二十区' },

  {
    value: '燕京二十一区',
    label: '燕京二十一区' },

  {
    value: '燕京二十二区',
    label: '燕京二十二区' }] },



{
  value: '第十五大区（云南电信新）',
  label: '第十五大区（云南电信新）',
  children: [
  {
    value: '云南一区',
    label: '云南一区' },

  {
    value: '云南二区',
    label: '云南二区' },

  {
    value: '云南三区',
    label: '云南三区' },

  {
    value: '玉龙二区',
    label: '玉龙二区' },

  {
    value: '云岭二十三区',
    label: '云岭二十三区' },

  {
    value: '大理一区',
    label: '大理一区' },

  {
    value: '大理七区',
    label: '大理七区' },

  {
    value: '大理九区',
    label: '大理九区' },

  {
    value: '大理十一区',
    label: '大理十一区' },

  {
    value: '大理十二区',
    label: '大理十二区' },

  {
    value: '大理十三区',
    label: '大理十三区' },

  {
    value: '大理十五区',
    label: '大理十五区' },

  {
    value: '大理十六区',
    label: '大理十六区' },

  {
    value: '大理十七区',
    label: '大理十七区' },

  {
    value: '大理十八区',
    label: '大理十八区' }] },



{
  value: '第十六大区（河北/河南网通新）',
  label: '第十六大区（河北/河南网通新）',
  children: [
  {
    value: '河北一区',
    label: '河北一区' },

  {
    value: '河北二区',
    label: '河北二区' },

  {
    value: '河北三区',
    label: '河北三区' },

  {
    value: '河南一区',
    label: '河南一区' },

  {
    value: '河南二区',
    label: '河南二区' },

  {
    value: '河南三区',
    label: '河南三区' },

  {
    value: '中原二十六区',
    label: '中原二十六区' },

  {
    value: '洛阳二十三区',
    label: '洛阳二十三区' }] },



{
  value: '第十七大区（福建电信新）',
  label: '第十七大区（福建电信新）',
  children: [
  {
    value: '福建新一区',
    label: '福建新一区' },

  {
    value: '福建新二区',
    label: '福建新二区' },

  {
    value: '闽越五区',
    label: '闽越五区' },

  {
    value: '闽越二十一区',
    label: '闽越二十一区' },

  {
    value: '闽越三十九区',
    label: '闽越三十九区' },

  {
    value: '闽地二区',
    label: '闽地二区' },

  {
    value: '闽地三区',
    label: '闽地三区' },

  {
    value: '闽地五区',
    label: '闽地五区' },

  {
    value: '闽地六区',
    label: '闽地六区' },

  {
    value: '闽地七区',
    label: '闽地七区' }] },



{
  value: '第二十大区（广东电信2）',
  label: '第二十大区（广东电信2）',
  children: [
  {
    value: '广东新一区',
    label: '广东新一区' },

  {
    value: '广东新二区',
    label: '广东新二区' },

  {
    value: '广东特三区',
    label: '广东特三区' },

  {
    value: '广东新十八区',
    label: '广东新十八区' },

  {
    value: '珠三角十五区',
    label: '珠三角十五区' },

  {
    value: '珠三角十九区',
    label: '珠三角十九区' },

  {
    value: '珠三角三十区',
    label: '珠三角三十区' },

  {
    value: '珠三角三十五区',
    label: '珠三角三十五区' },

  {
    value: '珠三角三十六区',
    label: '珠三角三十六区' },

  {
    value: '珠三角三十七区',
    label: '珠三角三十七区' }] },



{
  value: '第二十二大区（四川电信新）',
  label: '第二十二大区（四川电信新）',
  children: [
  {
    value: '四川新一区',
    label: '四川新一区' },

  {
    value: '四川特一区',
    label: '四川特一区' },

  {
    value: '巴蜀十区',
    label: '巴蜀十区' },

  {
    value: '巴蜀二十二区',
    label: '巴蜀二十二区' },

  {
    value: '巴蜀二十五区',
    label: '巴蜀二十五区' },

  {
    value: '巴蜀三十区',
    label: '巴蜀三十区' },

  {
    value: '巴蜀三十三区',
    label: '巴蜀三十三区' },

  {
    value: '巴蜀三十五区',
    label: '巴蜀三十五区' }] },



{
  value: '第二十四大区（江苏电信新）',
  label: '第二十四大区（江苏电信新）',
  children: [
  {
    value: '江苏新一区',
    label: '江苏新一区' },

  {
    value: '江苏新二区',
    label: '江苏新二区' },

  {
    value: '金陵无双一区',
    label: '金陵无双一区' },

  {
    value: '淮扬三区',
    label: '淮扬三区' },

  {
    value: '淮扬三十一区',
    label: '淮扬三十一区' },

  {
    value: '姑苏一区',
    label: '姑苏一区' },

  {
    value: '姑苏九区',
    label: '姑苏九区' },

  {
    value: '姑苏十三区',
    label: '姑苏十三区' },

  {
    value: '姑苏十六区',
    label: '姑苏十六区' },

  {
    value: '姑苏十八区',
    label: '姑苏十八区' },

  {
    value: '姑苏十九区',
    label: '姑苏十九区' },

  {
    value: '姑苏二十区',
    label: '姑苏二十区' }] },



{
  value: '第三十大区（新疆电信）',
  label: '第三十大区（新疆电信）',
  children: [
  {
    value: '新疆一区',
    label: '新疆一区' },

  {
    value: '新疆十区',
    label: '新疆十区' },

  {
    value: '天山十六区',
    label: '天山十六区' },

  {
    value: '天山三十九区',
    label: '天山三十九区' },

  {
    value: '楼兰十一区',
    label: '楼兰十一区' },

  {
    value: '楼兰十九区',
    label: '楼兰十九区' },

  {
    value: '楼兰二十五区',
    label: '楼兰二十五区' },

  {
    value: '楼兰二十七区',
    label: '楼兰二十七区' },

  {
    value: '楼兰二十八区',
    label: '楼兰二十八区' },

  {
    value: '楼兰二十九区',
    label: '楼兰二十九区' },

  {
    value: '楼兰三十区',
    label: '楼兰三十区' },

  {
    value: '楼兰三十一区',
    label: '楼兰三十一区' },

  {
    value: '楼兰三十二区',
    label: '楼兰三十二区' }] },



{
  value: '第四十一大区（重庆电信）',
  label: '第四十一大区（重庆电信）',
  children: [
  {
    value: '重庆一区',
    label: '重庆一区' },

  {
    value: '重庆十区',
    label: '重庆十区' },

  {
    value: '巴渝十二区',
    label: '巴渝十二区' },

  {
    value: '巴渝二十七区',
    label: '巴渝二十七区' },

  {
    value: '巴渝三十二区',
    label: '巴渝三十二区' },

  {
    value: '巴渝三十五区',
    label: '巴渝三十五区' },

  {
    value: '巴渝三十六区',
    label: '巴渝三十六区' },

  {
    value: '巴渝三十七区',
    label: '巴渝三十七区' },

  {
    value: '巴渝三十八区',
    label: '巴渝三十八区' }] },



{
  value: '第四十二大区（贵州电信新）',
  label: '第四十二大区（贵州电信新）',
  children: [
  {
    value: '贵州一区',
    label: '贵州一区' },

  {
    value: '贵州二区',
    label: '贵州二区' },

  {
    value: '贵州新一区',
    label: '贵州新一区' },

  {
    value: '黔州八区',
    label: '黔州八区' },

  {
    value: '黔州二十二区',
    label: '黔州二十二区' },

  {
    value: '黔州三十七区',
    label: '黔州三十七区' },

  {
    value: '黔地一区',
    label: '黔地一区' },

  {
    value: '黔地三区',
    label: '黔地三区' },

  {
    value: '黔地六区',
    label: '黔地六区' },

  {
    value: '黔地八区',
    label: '黔地八区' },

  {
    value: '黔地九区',
    label: '黔地九区' },

  {
    value: '黔地十区',
    label: '黔地十区' },

  {
    value: '黔地十一区',
    label: '黔地十一区' }] },



{
  value: '第四十四大区（陕西电信）',
  label: '第四十四大区（陕西电信）',
  children: [
  {
    value: '陕西一区',
    label: '陕西一区' },

  {
    value: '陕西二区',
    label: '陕西二区' },

  {
    value: '关中三十六区',
    label: '关中三十六区' },

  {
    value: '汉中十区',
    label: '汉中十区' },

  {
    value: '汉中二十一区',
    label: '汉中二十一区' },

  {
    value: '汉中三十六区',
    label: '汉中三十六区' },

  {
    value: '秦地三区',
    label: '秦地三区' },

  {
    value: '秦地五区',
    label: '秦地五区' },

  {
    value: '秦地七区',
    label: '秦地七区' },

  {
    value: '秦地八区',
    label: '秦地八区' },

  {
    value: '秦地九区',
    label: '秦地九区' },

  {
    value: '秦地十区',
    label: '秦地十区' },

  {
    value: '秦地十一区',
    label: '秦地十一区' }] },



{
  value: '第四十五大区（甘肃青海电信）',
  label: '第四十五大区（甘肃青海电信）',
  children: [
  {
    value: '青海一区',
    label: '青海一区' },

  {
    value: '甘肃一区',
    label: '甘肃一区' },

  {
    value: '敦煌六区',
    label: '敦煌六区' },

  {
    value: '敦煌二十八区',
    label: '敦煌二十八区' },

  {
    value: '昆仑二区',
    label: '昆仑二区' },

  {
    value: '昆仑十区',
    label: '昆仑十区' },

  {
    value: '昆仑十三区',
    label: '昆仑十三区' },

  {
    value: '昆仑十五区',
    label: '昆仑十五区' },

  {
    value: '昆仑十六区',
    label: '昆仑十六区' },

  {
    value: '昆仑十七区',
    label: '昆仑十七区' }] },



{
  value: '第四十六大区（海南电信）',
  label: '第四十六大区（海南电信）',
  children: [
  {
    value: '海南一区',
    label: '海南一区' },

  {
    value: '海南新十一区',
    label: '海南新十一区' },

  {
    value: '琼州一区',
    label: '琼州一区' },

  {
    value: '琼州十一区',
    label: '琼州十一区' },

  {
    value: '琼州十七区',
    label: '琼州十七区' },

  {
    value: '琼州十九区',
    label: '琼州十九区' },

  {
    value: '琼州二十二区',
    label: '琼州二十二区' },

  {
    value: '琼州二十三区',
    label: '琼州二十三区' },

  {
    value: '琼州二十五区',
    label: '琼州二十五区' },

  {
    value: '琼州二十六区',
    label: '琼州二十六区' }] },



{
  value: '原港澳台电信并入第六十大区',
  label: '原港澳台电信并入第六十大区',
  children: [] },

{
  value: '第四十九大区（王者/天使电信）',
  label: '第四十九大区（王者/天使电信）',
  children: [
  {
    value: '王者一区(电信)',
    label: '王者一区(电信)' }] },



{
  value: '第五十大区（王者/高校网通）',
  label: '第五十大区（王者/高校网通）',
  children: [
  {
    value: '王者一区(网通)',
    label: '王者一区(网通)' }] },



{
  value: '原众神归来并入第六十大区',
  label: '原众神归来并入第六十大区',
  children: [] },

{
  value: '第六十大区（亚特王朝电信）',
  label: '第六十大区（亚特王朝电信）',
  children: [
  {
    value: '香港一区',
    label: '香港一区' },

  {
    value: '众神一区电信',
    label: '众神一区电信' },

  {
    value: '魔王归来',
    label: '魔王归来' }] },



{
  value: '原吸血圣战并入第六十八大区',
  label: '原吸血圣战并入第六十八大区',
  children: [] },

{
  value: '第六十五大区（圣战/血月网通）',
  label: '第六十五大区（圣战/血月网通）',
  children: [
  {
    value: '圣战一区网通',
    label: '圣战一区网通' },

  {
    value: '末日一区网通',
    label: '末日一区网通' },

  {
    value: '末日五区网通',
    label: '末日五区网通' }] },



{
  value: '第六十八大区（百战雄狮电信）',
  label: '第六十八大区（百战雄狮电信）',
  children: [
  {
    value: '圣战一区电信',
    label: '圣战一区电信' },

  {
    value: '血月一区电信',
    label: '血月一区电信' },

  {
    value: '百战一区电信',
    label: '百战一区电信' },

  {
    value: '百战二区电信',
    label: '百战二区电信' },

  {
    value: '神域一区电信',
    label: '神域一区电信' },

  {
    value: '圣战三十六电信',
    label: '圣战三十六电信' },

  {
    value: '远征三十七电信',
    label: '远征三十七电信' }] },



{
  value: '原神域争霸并入第六十八大区',
  label: '原神域争霸并入第六十八大区',
  children: [] },

{
  value: '原末日亡灵电信并入第七十六大区',
  label: '原末日亡灵电信并入第七十六大区',
  children: [] },

{
  value: '第七十五大区（合作方专区）',
  label: '第七十五大区（合作方专区）',
  children: [
  {
    value: '百战雄狮',
    label: '百战雄狮' }] },



{
  value: '第七十六大区（倾城之恋电信）',
  label: '第七十六大区（倾城之恋电信）',
  children: [
  {
    value: '倾城一区电信',
    label: '倾城一区电信' },

  {
    value: '倾城二区电信',
    label: '倾城二区电信' },

  {
    value: '龙骑一区电信',
    label: '龙骑一区电信' },

  {
    value: '龙骑二区电信',
    label: '龙骑二区电信' },

  {
    value: '龙骑三十二电信',
    label: '龙骑三十二电信' },

  {
    value: '噬魂二十一电信',
    label: '噬魂二十一电信' }] },



{
  value: '第七十八大区（诸神复苏电信）',
  label: '第七十八大区（诸神复苏电信）',
  children: [
  {
    value: '诸神一区电信',
    label: '诸神一区电信' },

  {
    value: '诸神三区电信',
    label: '诸神三区电信' },

  {
    value: '神祇五区电信',
    label: '神祇五区电信' },

  {
    value: '神谕六区',
    label: '神谕六区' },

  {
    value: '神谕十八区',
    label: '神谕十八区' },

  {
    value: '神谕二十区',
    label: '神谕二十区' },

  {
    value: '神谕二十七区',
    label: '神谕二十七区' },

  {
    value: '神谕二十九区',
    label: '神谕二十九区' },

  {
    value: '神谕三十一区',
    label: '神谕三十一区' },

  {
    value: '神谕三十三区',
    label: '神谕三十三区' },

  {
    value: '神谕三十五区',
    label: '神谕三十五区' },

  {
    value: '神谕三十六区',
    label: '神谕三十六区' },

  {
    value: '神谕三十七区',
    label: '神谕三十七区' }] },



{
  value: '原暗黑龙骑电信并入第七十六大区',
  label: '原暗黑龙骑电信并入第七十六大区',
  children: [] },

{
  value: '第八十一大区（暗黑龙骑网通）',
  label: '第八十一大区（暗黑龙骑网通）',
  children: [
  {
    value: '众神一区网通',
    label: '众神一区网通' },

  {
    value: '龙骑二区网通',
    label: '龙骑二区网通' }] },



{
  value: '第八十二大区（合作方专区2）',
  label: '第八十二大区（合作方专区2）',
  children: [
  {
    value: '战神风云',
    label: '战神风云' }] },



{
  value: '第八十三大区（合作方专区3）',
  label: '第八十三大区（合作方专区3）',
  children: [
  {
    value: '迅雷浙闽大区',
    label: '迅雷浙闽大区' },

  {
    value: '迅雷津鲁大区',
    label: '迅雷津鲁大区' },

  {
    value: '轮回之境',
    label: '轮回之境' },

  {
    value: '末日魔劫',
    label: '末日魔劫' }] },




{
  value: 'QQ魔域第一大区（华南电信）',
  label: 'QQ魔域第一大区（华南电信）',
  children: [
  {
    value: '华南一区',
    label: '华南一区' },

  {
    value: '华南二区',
    label: '华南二区' },

  {
    value: '华南三区',
    label: '华南三区' },

  {
    value: '神域之乱',
    label: '神域之乱' },

  {
    value: '珠江二区',
    label: '珠江二区' }] },



{
  value: 'QQ魔域第三大区（华北网通）',
  label: 'QQ魔域第三大区（华北网通）',
  children: [
  {
    value: '华北一区',
    label: '华北一区' }] },



{
  value: '一战到底（三线大区）',
  label: '一战到底（三线大区）',
  children: [
  {
    value: '一战到底一区',
    label: '一战到底一区' }] },



{
  value: '血色暮光（三线大区）',
  label: '血色暮光（三线大区）',
  children: [
  {
    value: '血色暮光一区',
    label: '血色暮光一区' }] },



{
  value: '魔法圣坛（三线大区）',
  label: '魔法圣坛（三线大区）',
  children: [
  {
    value: '魔法圣坛一区',
    label: '魔法圣坛一区' }] },



{
  value: '冥夜禁域（三线大区）',
  label: '冥夜禁域（三线大区）',
  children: [
  {
    value: '冥夜禁域一区',
    label: '冥夜禁域一区' }] },



{
  value: '一骑绝尘（三线大区）',
  label: '一骑绝尘（三线大区）',
  children: [
  {
    value: '一骑绝尘一区',
    label: '一骑绝尘一区' }] },



{
  value: '幻宠无双（三线大区）',
  label: '幻宠无双（三线大区）',
  children: [
  {
    value: '幻宠无双一区',
    label: '幻宠无双一区' }] },



{
  value: '千面斗神（三线大区）',
  label: '千面斗神（三线大区）',
  children: [
  {
    value: '千面斗神一区',
    label: '千面斗神一区' }] },



{
  value: '三线互通（第一大区）',
  label: '三线互通（第一大区）',
  children: [
  {
    value: '天赋一区',
    label: '天赋一区' },

  {
    value: '王者之战二十三',
    label: '王者之战二十三' },

  {
    value: '王者之战三十九',
    label: '王者之战三十九' },

  {
    value: '圣光七区',
    label: '圣光七区' },

  {
    value: '圣光十区',
    label: '圣光十区' },

  {
    value: '圣光十八区',
    label: '圣光十八区' },

  {
    value: '圣光二十六区',
    label: '圣光二十六区' },

  {
    value: '圣光二十九区',
    label: '圣光二十九区' },

  {
    value: '圣光三十一区',
    label: '圣光三十一区' },

  {
    value: '圣光三十三区',
    label: '圣光三十三区' },

  {
    value: '圣光三十五区',
    label: '圣光三十五区' },

  {
    value: '圣光三十六区',
    label: '圣光三十六区' },

  {
    value: '圣光三十七区',
    label: '圣光三十七区' }] },



{
  value: '三线互通（第二大区）',
  label: '三线互通（第二大区）',
  children: [
  {
    value: '精英一区',
    label: '精英一区' }] },



{
  value: '三线互通（第三大区）',
  label: '三线互通（第三大区）',
  children: [
  {
    value: '女神一区',
    label: '女神一区' },

  {
    value: '女神二十五区',
    label: '女神二十五区' },

  {
    value: '创圣十区',
    label: '创圣十区' },

  {
    value: '创圣二十七区',
    label: '创圣二十七区' },

  {
    value: '创圣三十二区',
    label: '创圣三十二区' },

  {
    value: '创圣三十五区',
    label: '创圣三十五区' },

  {
    value: '创圣三十六区',
    label: '创圣三十六区' },

  {
    value: '创圣三十七区',
    label: '创圣三十七区' },

  {
    value: '创圣三十八区',
    label: '创圣三十八区' },

  {
    value: '创圣三十九区',
    label: '创圣三十九区' }] },



{
  value: '三线互通（第五大区）',
  label: '三线互通（第五大区）',
  children: [
  {
    value: '觉醒一区',
    label: '觉醒一区' },

  {
    value: '觉醒九区',
    label: '觉醒九区' },

  {
    value: '觉醒十八区',
    label: '觉醒十八区' },

  {
    value: '觉醒三十七区',
    label: '觉醒三十七区' },

  {
    value: '圣域五区',
    label: '圣域五区' },

  {
    value: '圣域十三区',
    label: '圣域十三区' },

  {
    value: '圣域二十一区',
    label: '圣域二十一区' },

  {
    value: '圣域二十二区',
    label: '圣域二十二区' },

  {
    value: '圣域二十六区',
    label: '圣域二十六区' },

  {
    value: '圣域二十七区',
    label: '圣域二十七区' },

  {
    value: '圣域二十八区',
    label: '圣域二十八区' },

  {
    value: '圣域二十九区',
    label: '圣域二十九区' },

  {
    value: '圣域三十区',
    label: '圣域三十区' }] },



{
  value: '三线互通（第六大区）',
  label: '三线互通（第六大区）',
  children: [
  {
    value: '试炼一区',
    label: '试炼一区' },

  {
    value: '试炼八区',
    label: '试炼八区' },

  {
    value: '试炼十二区',
    label: '试炼十二区' },

  {
    value: '试炼十五区',
    label: '试炼十五区' },

  {
    value: '试炼十七区',
    label: '试炼十七区' },

  {
    value: '试炼十九区',
    label: '试炼十九区' },

  {
    value: '试炼二十区',
    label: '试炼二十区' },

  {
    value: '试炼二十一区',
    label: '试炼二十一区' },

  {
    value: '试炼二十二区',
    label: '试炼二十二区' },

  {
    value: '试炼二十三区',
    label: '试炼二十三区' }] },



{
  value: '三线大区（箭破天穹）',
  label: '三线大区（箭破天穹）',
  children: [
  {
    value: '疾风一区',
    label: '疾风一区' },

  {
    value: '疾风三区',
    label: '疾风三区' },

  {
    value: '疾风八区',
    label: '疾风八区' },

  {
    value: '疾风十五区',
    label: '疾风十五区' },

  {
    value: '疾风三十二区',
    label: '疾风三十二区' },

  {
    value: '御风一区',
    label: '御风一区' },

  {
    value: '御风三区',
    label: '御风三区' },

  {
    value: '御风五区',
    label: '御风五区' },

  {
    value: '御风六区',
    label: '御风六区' },

  {
    value: '御风七区',
    label: '御风七区' },

  {
    value: '御风八区',
    label: '御风八区' },

  {
    value: '御风九区',
    label: '御风九区' }] },



{
  value: '三线大区（四海异界）',
  label: '三线大区（四海异界）',
  children: [
  {
    value: '轮回一区',
    label: '轮回一区' },

  {
    value: '轮回八区',
    label: '轮回八区' },

  {
    value: '轮回二十区',
    label: '轮回二十区' },

  {
    value: '轮回三十一区',
    label: '轮回三十一区' },

  {
    value: '轮回三十七区',
    label: '轮回三十七区' },

  {
    value: '轮回三十九区',
    label: '轮回三十九区' },

  {
    value: '四海二区',
    label: '四海二区' },

  {
    value: '四海三区',
    label: '四海三区' },

  {
    value: '四海五区',
    label: '四海五区' },

  {
    value: '四海六区',
    label: '四海六区' },

  {
    value: '四海七区',
    label: '四海七区' }] },



{
  value: '三线大区（战无止境）',
  label: '三线大区（战无止境）',
  children: [
  {
    value: '热血一区',
    label: '热血一区' },

  {
    value: '热血二区',
    label: '热血二区' },

  {
    value: '热血十区',
    label: '热血十区' },

  {
    value: '热血二十区',
    label: '热血二十区' },

  {
    value: '热血二十五区',
    label: '热血二十五区' },

  {
    value: '热血三十三区',
    label: '热血三十三区' },

  {
    value: '热血三十六区',
    label: '热血三十六区' },

  {
    value: '热血三十八区',
    label: '热血三十八区' },

  {
    value: '热血三十九区',
    label: '热血三十九区' },

  {
    value: '荣耀一区',
    label: '荣耀一区' },

  {
    value: '荣耀二区',
    label: '荣耀二区' },

  {
    value: '荣耀三区',
    label: '荣耀三区' }] },



{
  value: '三线大区（御剑天下）',
  label: '三线大区（御剑天下）',
  children: [
  {
    value: '御剑一区',
    label: '御剑一区' },

  {
    value: '御剑二区',
    label: '御剑二区' },

  {
    value: '御剑六区',
    label: '御剑六区' },

  {
    value: '御剑九区',
    label: '御剑九区' },

  {
    value: '御剑二十二区',
    label: '御剑二十二区' },

  {
    value: '御剑二十七区',
    label: '御剑二十七区' },

  {
    value: '御剑三十区',
    label: '御剑三十区' },

  {
    value: '御剑三十三区',
    label: '御剑三十三区' },

  {
    value: '御剑三十五区',
    label: '御剑三十五区' },

  {
    value: '御剑三十六区',
    label: '御剑三十六区' },

  {
    value: '御剑三十七区',
    label: '御剑三十七区' },

  {
    value: '御剑三十八区',
    label: '御剑三十八区' }] },



{
  value: '三线大区（末日魔劫）',
  label: '三线大区（末日魔劫）',
  children: [
  {
    value: '魔劫一区',
    label: '魔劫一区' },

  {
    value: '魔劫二区',
    label: '魔劫二区' },

  {
    value: '魔劫六区',
    label: '魔劫六区' },

  {
    value: '魔劫十七区',
    label: '魔劫十七区' },

  {
    value: '魔劫二十区',
    label: '魔劫二十区' },

  {
    value: '魔劫二十二区',
    label: '魔劫二十二区' },

  {
    value: '魔劫二十五区',
    label: '魔劫二十五区' },

  {
    value: '魔劫二十六区',
    label: '魔劫二十六区' },

  {
    value: '魔劫二十七区',
    label: '魔劫二十七区' },

  {
    value: '魔劫二十八区',
    label: '魔劫二十八区' },

  {
    value: '魔劫二十九区',
    label: '魔劫二十九区' }] },



{
  value: '三线大区（圣器现世）',
  label: '三线大区（圣器现世）',
  children: [
  {
    value: '神炼二区',
    label: '神炼二区' },

  {
    value: '神炼三区',
    label: '神炼三区' },

  {
    value: '神炼五区',
    label: '神炼五区' },

  {
    value: '神炼八区',
    label: '神炼八区' },

  {
    value: '神炼十区',
    label: '神炼十区' },

  {
    value: '神炼十六区',
    label: '神炼十六区' },

  {
    value: '神炼十七区',
    label: '神炼十七区' },

  {
    value: '神炼十九区',
    label: '神炼十九区' },

  {
    value: '神炼二十一区',
    label: '神炼二十一区' },

  {
    value: '神炼二十二区',
    label: '神炼二十二区' },

  {
    value: '神炼二十三区',
    label: '神炼二十三区' },

  {
    value: '神炼二十五区',
    label: '神炼二十五区' }] },



{
  value: '三线大区（神子降临）',
  label: '三线大区（神子降临）',
  children: [
  {
    value: '星辰一区',
    label: '星辰一区' },

  {
    value: '星辰二区',
    label: '星辰二区' },

  {
    value: '星辰三区',
    label: '星辰三区' },

  {
    value: '星辰九区',
    label: '星辰九区' },

  {
    value: '星辰十一区',
    label: '星辰十一区' },

  {
    value: '星辰十五区',
    label: '星辰十五区' },

  {
    value: '星辰十六区',
    label: '星辰十六区' },

  {
    value: '星辰十七区',
    label: '星辰十七区' },

  {
    value: '星辰十八区',
    label: '星辰十八区' },

  {
    value: '星辰十九区',
    label: '星辰十九区' },

  {
    value: '星辰二十区',
    label: '星辰二十区' }] },



{
  value: '三线大区（山海异界）',
  label: '三线大区（山海异界）',
  children: [
  {
    value: '山海一区',
    label: '山海一区' },

  {
    value: '山海二区',
    label: '山海二区' },

  {
    value: '山海五区',
    label: '山海五区' },

  {
    value: '山海八区',
    label: '山海八区' },

  {
    value: '山海九区',
    label: '山海九区' },

  {
    value: '山海十区',
    label: '山海十区' },

  {
    value: '山海十一区',
    label: '山海十一区' },

  {
    value: '山海十二区',
    label: '山海十二区' }] },



{
  value: '三线大区（神兽降世）',
  label: '三线大区（神兽降世）',
  children: [
  {
    value: '大荒一区',
    label: '大荒一区' },

  {
    value: '大荒二区',
    label: '大荒二区' },

  {
    value: '大荒三区',
    label: '大荒三区' },

  {
    value: '大荒五区',
    label: '大荒五区' },

  {
    value: '大荒六区',
    label: '大荒六区' },

  {
    value: '大荒七区',
    label: '大荒七区' },

  {
    value: '大荒八区',
    label: '大荒八区' },

  {
    value: '大荒九区',
    label: '大荒九区' },

  {
    value: '大荒十区',
    label: '大荒十区' }] },



{
  value: '三线大区（以家族之名）',
  label: '三线大区（以家族之名）',
  children: [
  {
    value: '永世一区',
    label: '永世一区' },

  {
    value: '永世二区',
    label: '永世二区' },

  {
    value: '永世三区',
    label: '永世三区' }] },



{
  value: '怀旧版第一大区（经典重现）',
  label: '怀旧版第一大区（经典重现）',
  children: [
  {
    value: '怀旧一区电信',
    label: '怀旧一区电信' },

  {
    value: '怀旧二区电信',
    label: '怀旧二区电信' },

  {
    value: '怀旧三区电信',
    label: '怀旧三区电信' },

  {
    value: '经典二十七电信',
    label: '经典二十七电信' },

  {
    value: '典藏五区电信',
    label: '典藏五区电信' },

  {
    value: '典藏十二区电信',
    label: '典藏十二区电信' },

  {
    value: '典藏十五区电信',
    label: '典藏十五区电信' },

  {
    value: '典藏十六区电信',
    label: '典藏十六区电信' },

  {
    value: '典藏十七区电信',
    label: '典藏十七区电信' }] },



{
  value: '怀旧版第二大区（经典重现）',
  label: '怀旧版第二大区（经典重现）',
  children: [
  {
    value: '怀旧一区网通',
    label: '怀旧一区网通' },

  {
    value: '怀旧新一区',
    label: '怀旧新一区' },

  {
    value: '怀旧新五区',
    label: '怀旧新五区' },

  {
    value: '怀旧新六区',
    label: '怀旧新六区' },

  {
    value: '怀旧新八区',
    label: '怀旧新八区' },

  {
    value: '怀旧新九区',
    label: '怀旧新九区' }] },



{
  value: '怀旧版第三大区（王者重生）',
  label: '怀旧版第三大区（王者重生）',
  children: [
  {
    value: '重生一区电信',
    label: '重生一区电信' },

  {
    value: '涅槃二十五区',
    label: '涅槃二十五区' },

  {
    value: '涅槃三十六区',
    label: '涅槃三十六区' },

  {
    value: '涅槃三十九区',
    label: '涅槃三十九区' },

  {
    value: '永恒二区',
    label: '永恒二区' },

  {
    value: '永恒三区',
    label: '永恒三区' },

  {
    value: '永恒六区',
    label: '永恒六区' },

  {
    value: '永恒七区',
    label: '永恒七区' }] },



{
  value: 'QQ魔域怀旧大区',
  label: 'QQ魔域怀旧大区',
  children: [
  {
    value: '怀旧一区',
    label: '怀旧一区' },

  {
    value: '怀旧八区',
    label: '怀旧八区' }] },



{
  value: '迅雷魔域怀旧大区',
  label: '迅雷魔域怀旧大区',
  children: [
  {
    value: '怀旧经典',
    label: '怀旧经典' }] },



{
  value: 'BOSS版第一大区',
  label: 'BOSS版第一大区',
  children: [
  {
    value: '战神一区电信',
    label: '战神一区电信' },

  {
    value: '战神二区电信',
    label: '战神二区电信' },

  {
    value: '圣印三十六电信',
    label: '圣印三十六电信' },

  {
    value: '传说五区',
    label: '传说五区' },

  {
    value: '传说七区',
    label: '传说七区' },

  {
    value: '传说八区',
    label: '传说八区' },

  {
    value: '传说九区',
    label: '传说九区' }] },



{
  value: 'BOSS版第二大区',
  label: 'BOSS版第二大区',
  children: [
  {
    value: '战神一区网通',
    label: '战神一区网通' },

  {
    value: '战神三十二网通',
    label: '战神三十二网通' },

  {
    value: '战神三十七网通',
    label: '战神三十七网通' },

  {
    value: '圣翼三区',
    label: '圣翼三区' },

  {
    value: '圣翼五区',
    label: '圣翼五区' },

  {
    value: '圣翼六区',
    label: '圣翼六区' }] },



{
  value: '掉钱版第一大区',
  label: '掉钱版第一大区',
  children: [
  {
    value: '掉钱一区电信',
    label: '掉钱一区电信' },

  {
    value: '掉钱三十六电信',
    label: '掉钱三十六电信' },

  {
    value: '掉钱三十八电信',
    label: '掉钱三十八电信' },

  {
    value: '掉钱新二区',
    label: '掉钱新二区' },

  {
    value: '掉钱新五区',
    label: '掉钱新五区' },

  {
    value: '掉钱新六区',
    label: '掉钱新六区' },

  {
    value: '掉钱新七区',
    label: '掉钱新七区' },

  {
    value: '掉钱新八区',
    label: '掉钱新八区' },

  {
    value: '掉钱新九区',
    label: '掉钱新九区' }] },



{
  value: '掉钱版第二大区',
  label: '掉钱版第二大区',
  children: [
  {
    value: '财富一区电信',
    label: '财富一区电信' },

  {
    value: '财富十九区电信',
    label: '财富十九区电信' },

  {
    value: '财富二十三电信',
    label: '财富二十三电信' },

  {
    value: '财富三十一电信',
    label: '财富三十一电信' },

  {
    value: '财富三十三电信',
    label: '财富三十三电信' },

  {
    value: '财富三十六电信',
    label: '财富三十六电信' },

  {
    value: '财富三十七电信',
    label: '财富三十七电信' },

  {
    value: '财富三十八电信',
    label: '财富三十八电信' },

  {
    value: '财富三十九电信',
    label: '财富三十九电信' },

  {
    value: '财富新一区',
    label: '财富新一区' }] },



{
  value: '掉钱版第三大区',
  label: '掉钱版第三大区',
  children: [
  {
    value: '掉钱一区网通',
    label: '掉钱一区网通' },

  {
    value: '掉钱十一区网通',
    label: '掉钱十一区网通' },

  {
    value: '掉钱十三区网通',
    label: '掉钱十三区网通' },

  {
    value: '掉钱二十三网通',
    label: '掉钱二十三网通' },

  {
    value: '掉钱二十五网通',
    label: '掉钱二十五网通' },

  {
    value: '掉钱二十七网通',
    label: '掉钱二十七网通' },

  {
    value: '掉钱二十八网通',
    label: '掉钱二十八网通' },

  {
    value: '掉钱二十九网通',
    label: '掉钱二十九网通' },

  {
    value: '掉钱三十网通',
    label: '掉钱三十网通' },

  {
    value: '掉钱三十一网通',
    label: '掉钱三十一网通' }] }];exports.VQUFU = VQUFU;





var vGENDER = [
{
  label: '男',
  value: '男' },

{
  label: '女',
  value: '女' }];exports.vGENDER = vGENDER;

/***/ }),

/***/ 94:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 34));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var s = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},r = s.lib = {},o = r.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,r = e.sigBytes;if (this.clamp(), s % 4) for (var o = 0; o < r; o++) {var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[s + o >>> 2] |= i << 24 - (s + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[s + o >>> 2] = n[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], r = function r(t) {t = t;var n = 987654321,s = 4294967295;return function () {var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push((o >>> 4).toString(16)), s.push((15 & o).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push(String.fromCharCode(o));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,r = n.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(s, h);}var l = s.splice(0, c);n.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 });r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} });var d = s.algo = {};return s;}(Math), n);}),r = (n(function (e, t) {var n;e.exports = (n = s, function (e) {var t = n,s = t.lib,r = s.WordArray,o = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,r = e[s];e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],k = e[t + 9],S = e[t + 10],v = e[t + 11],T = e[t + 12],A = e[t + 13],P = e[t + 14],I = e[t + 15],b = o[0],O = o[1],E = o[2],C = o[3];b = u(b, O, E, C, i, 7, a[0]), C = u(C, b, O, E, c, 12, a[1]), E = u(E, C, b, O, f, 17, a[2]), O = u(O, E, C, b, p, 22, a[3]), b = u(b, O, E, C, g, 7, a[4]), C = u(C, b, O, E, m, 12, a[5]), E = u(E, C, b, O, y, 17, a[6]), O = u(O, E, C, b, _, 22, a[7]), b = u(b, O, E, C, w, 7, a[8]), C = u(C, b, O, E, k, 12, a[9]), E = u(E, C, b, O, S, 17, a[10]), O = u(O, E, C, b, v, 22, a[11]), b = u(b, O, E, C, T, 7, a[12]), C = u(C, b, O, E, A, 12, a[13]), E = u(E, C, b, O, P, 17, a[14]), b = h(b, O = u(O, E, C, b, I, 22, a[15]), E, C, c, 5, a[16]), C = h(C, b, O, E, y, 9, a[17]), E = h(E, C, b, O, v, 14, a[18]), O = h(O, E, C, b, i, 20, a[19]), b = h(b, O, E, C, m, 5, a[20]), C = h(C, b, O, E, S, 9, a[21]), E = h(E, C, b, O, I, 14, a[22]), O = h(O, E, C, b, g, 20, a[23]), b = h(b, O, E, C, k, 5, a[24]), C = h(C, b, O, E, P, 9, a[25]), E = h(E, C, b, O, p, 14, a[26]), O = h(O, E, C, b, w, 20, a[27]), b = h(b, O, E, C, A, 5, a[28]), C = h(C, b, O, E, f, 9, a[29]), E = h(E, C, b, O, _, 14, a[30]), b = l(b, O = h(O, E, C, b, T, 20, a[31]), E, C, m, 4, a[32]), C = l(C, b, O, E, w, 11, a[33]), E = l(E, C, b, O, v, 16, a[34]), O = l(O, E, C, b, P, 23, a[35]), b = l(b, O, E, C, c, 4, a[36]), C = l(C, b, O, E, g, 11, a[37]), E = l(E, C, b, O, _, 16, a[38]), O = l(O, E, C, b, S, 23, a[39]), b = l(b, O, E, C, A, 4, a[40]), C = l(C, b, O, E, i, 11, a[41]), E = l(E, C, b, O, p, 16, a[42]), O = l(O, E, C, b, y, 23, a[43]), b = l(b, O, E, C, k, 4, a[44]), C = l(C, b, O, E, T, 11, a[45]), E = l(E, C, b, O, I, 16, a[46]), b = d(b, O = l(O, E, C, b, f, 23, a[47]), E, C, i, 6, a[48]), C = d(C, b, O, E, _, 10, a[49]), E = d(E, C, b, O, P, 15, a[50]), O = d(O, E, C, b, m, 21, a[51]), b = d(b, O, E, C, T, 6, a[52]), C = d(C, b, O, E, p, 10, a[53]), E = d(E, C, b, O, S, 15, a[54]), O = d(O, E, C, b, c, 21, a[55]), b = d(b, O, E, C, w, 6, a[56]), C = d(C, b, O, E, I, 10, a[57]), E = d(E, C, b, O, y, 15, a[58]), O = d(O, E, C, b, A, 21, a[59]), b = d(b, O, E, C, g, 6, a[60]), C = d(C, b, O, E, v, 10, a[61]), E = d(E, C, b, O, f, 15, a[62]), O = d(O, E, C, b, k, 21, a[63]), o[0] = o[0] + b | 0, o[1] = o[1] + O | 0, o[2] = o[2] + E | 0, o[3] = o[3] + C | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,r = 8 * t.sigBytes;n[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(s / 4294967296),i = s;n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, r, o, i) {var a = e + (t & n | ~t & s) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, n, s, r, o, i) {var a = e + (t & s | n & ~s) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, n, s, r, o, i) {var a = e + (t ^ n ^ s) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, n, s, r, o, i) {var a = e + (n ^ (t | ~s)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, r, o;e.exports = (r = (n = s).lib.Base, o = n.enc.Utf8, void (n.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = s.HmacMD5;}));var o = "FUNCTION",i = "OBJECT",a = "CLIENT_DB";function c(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function u(e) {return "object" === c(e);}function h(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var l = "development" === "development",d = "mp-weixin",f = h(undefined),p = h([]),g = true;var m = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 95).default || __webpack_require__(/*! uni-stat-config */ 95);m = _e2.appid;}} catch (e) {}var y = {};function _(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = y, s = e, Object.prototype.hasOwnProperty.call(n, s) || (y[e] = t), y[e];}"app-plus" === d && (y = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var w = ["invoke", "success", "fail", "complete"],k = _("_globalUniCloudInterceptor");function S(e, t) {k[e] || (k[e] = {}), u(t) && Object.keys(t).forEach(function (n) {w.indexOf(n) > -1 && function (e, t, n) {var s = k[e][t];s || (s = k[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function v(e, t) {k[e] || (k[e] = {}), u(t) ? Object.keys(t).forEach(function (n) {w.indexOf(n) > -1 && function (e, t, n) {var s = k[e][t];if (!s) return;var r = s.indexOf(n);r > -1 && s.splice(r, 1);}(e, n, t[n]);}) : delete k[e];}function T(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function A(e, t) {return k[e] && k[e][t] || [];}function P(e, t) {return t ? function (n) {var _this = this;var s,r = !1;if ("callFunction" === t) {var _e3 = n && n.type || o;r = _e3 !== o;}s = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var i = s.then(function () {return r ? Promise.resolve() : T(A(t, "invoke"), n);}).then(function () {return e.call(_this, n);}).then(function (e) {return r ? Promise.resolve(e) : T(A(t, "success"), e).then(function () {return T(A(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return r ? Promise.reject(e) : T(A(t, "fail"), e).then(function () {return T(A(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return i;i.then(function (e) {n.success && n.success(e), n.complete && n.complete(e);}, function (e) {n.fail && n.fail(e), n.complete && n.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var I = /*#__PURE__*/function (_Error) {_inherits(I, _Error);var _super = _createSuper(I);function I(e) {var _this2;_classCallCheck(this, I);_this2 = _super.call(this, e.message), _this2.errMsg = e.message || "", _this2.errCode = _this2.code = e.code, _this2.requestId = e.requestId, Object.defineProperties(_assertThisInitialized(_this2), { message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this2;}return I;}( /*#__PURE__*/_wrapNativeSuper(Error));var b;function O() {var e = uni.getLocale && uni.getLocale() || "en";if (b) return _objectSpread(_objectSpread({}, b), {}, { LOCALE: e });var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),t = _uni$getSystemInfoSyn.deviceId,n = _uni$getSystemInfoSyn.platform;return b = { PLATFORM: d, OS: n, APPID: m, DEVICEID: t, CLIENT_SDK_VERSION: "1.0.25" }, _objectSpread(_objectSpread({}, b), {}, { LOCALE: e });}var E = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), l && "h5" === d && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new I({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return s(new I({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, n(r);} }));});} };var C = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} },U = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };var _e4 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: U, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: U }, "zh-Hans"),x = _e4.t;var D = /*#__PURE__*/function () {function D(e) {_classCallCheck(this, D);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(x("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = C, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(D, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return E.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this3 = this;return Promise.resolve().then(function () {return _this3.hasAccessToken ? t ? _this3.requestWrapped(e) : _this3.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this3.getAccessToken();}).then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});}) : _this3.getAccessToken().then(function () {var t = _this3.rebuildRequest(e);return _this3.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = E.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = E.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this4 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this4.setAccessToken(e.result.accessToken), _this4._getAccessTokenPromiseStatus = "fulfilled", t(_this4.accessToken)) : (_this4._getAccessTokenPromiseStatus = "rejected", n(new I({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this4._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this5 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this5.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new I({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this6 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,r = _ref2.config;if ("string" !== c(t)) throw new I({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });if (!(t = t.trim())) throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });if (/:\/\//.test(t)) throw new I({ code: "INVALID_PARAM", message: "cloudPath不合法" });var o = r && r.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;i = r.id, a = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: i, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this6.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: s }));}).then(function () {return _this6.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new I({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return D;}();var q = { init: function init(e) {var t = new D(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var R = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var L;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(L || (L = {}));var F = function F() {};var N = function N() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t2 = function _t2() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t2 }), Object.defineProperty(e.promise, "catch", { get: _t2 }), e;}var t = new Promise(function (t, n) {e = function e(_e5, s) {return _e5 ? n(_e5) : t(s);};});return e.promise = t, e;};function $(e) {return void 0 === e;}function j(e) {return "[object Null]" === Object.prototype.toString.call(e);}var M;function B(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e6 = _step.value;var _t3 = _e6.isMatch,_n = _e6.genAdapter,_s = _e6.runtime;if (_t3()) return { adapter: _n(), runtime: _s };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(M || (M = {}));var K = { adapter: null, runtime: void 0 },H = ["anonymousUuidKey"];var W = /*#__PURE__*/function (_F) {_inherits(W, _F);var _super2 = _createSuper(W);function W() {var _this7;_classCallCheck(this, W);_this7 = _super2.call(this), K.adapter.root.tcbObject || (K.adapter.root.tcbObject = {});return _this7;}_createClass(W, [{ key: "setItem", value: function setItem(e, t) {K.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return K.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete K.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete K.adapter.root.tcbObject;} }]);return W;}(F);function z(e, t) {switch (e) {case "local":return t.localStorage || new W();case "none":return new W();default:return t.sessionStorage || new W();}}var J = /*#__PURE__*/function () {function J(e) {_classCallCheck(this, J);if (!this._storage) {this._persistence = K.adapter.primaryStorage || e.persistence, this._storage = z(this._persistence, K.adapter);var _t4 = "access_token_".concat(e.env),_n2 = "access_token_expire_".concat(e.env),_s2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t4, accessTokenExpireKey: _n2, refreshTokenKey: _s2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(J, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = z(e, K.adapter);for (var _e7 in this.keys) {var _s3 = this.keys[_e7];if (t && H.includes(_e7)) continue;var _r2 = this._storage.getItem(_s3);$(_r2) || j(_r2) || (n.setItem(_s3, _r2), this._storage.removeItem(_s3));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },r = JSON.stringify(s);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return J;}();var V = {},Y = {};function X(e) {return V[e];}var G = function G(e, t) {_classCallCheck(this, G);this.data = t || null, this.name = e;};var Q = /*#__PURE__*/function (_G) {_inherits(Q, _G);var _super3 = _createSuper(Q);function Q(e, t) {var _this8;_classCallCheck(this, Q);_this8 = _super3.call(this, "error", { error: e, data: t }), _this8.error = e;return _this8;}return Q;}(G);var Z = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s4 = n[e].indexOf(t);-1 !== _s4 && n[e].splice(_s4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof Q) return console.error(e.error), this;var n = "string" == typeof e ? new G(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e8 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e8),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t5 = _step2.value;_t5.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function ee(e, t) {Z.on(e, t);}function te(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};Z.fire(e, t);}function ne(e, t) {Z.off(e, t);}var se = "loginStateChanged",re = "loginStateExpire",oe = "loginTypeChanged",ie = "anonymousConverted",ae = "refreshAccessToken";var ce;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(ce || (ce = {}));var ue = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],he = { "X-SDK-Version": "1.3.5" };function le(e, t, n) {var s = e[t];e[t] = function (t) {var r = {},o = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(r, s), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e9 in r) {i.append(_e9, r[_e9]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), s.call(e, t);};}function de() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, he), {}, { "x-seqid": e }) };}var fe = /*#__PURE__*/function () {function fe() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, fe);var t;this.config = e, this._reqClass = new K.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = X(this.config.env), this._localCache = (t = this.config.env, Y[t]), le(this._reqClass, "post", [de]), le(this._reqClass, "upload", [de]), le(this._reqClass, "download", [de]);}_createClass(fe, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, r, o, i, a, _e10, _e11, _t6, _s5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(n);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e10 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e10 || "REFRESH_TOKEN_EXPIRED" === _e10 || "INVALID_REFRESH_TOKEN" === _e10)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === ce.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e10)) {_context5.next = 19;break;}_e11 = this._cache.getStore(r);_t6 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e11, refresh_token: _t6 });case 17:_s5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s5.refresh_token), this._refreshAccessToken()));case 19:te(re), this._cache.removeStore(n);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (te(ae), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:s = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!s || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, r, o, _e12, i, _e13, _e14, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === ue.indexOf(e))) {_context7.next = 10;break;}_e12 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e12);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e13 in i) {i.hasOwnProperty(_e13) && void 0 !== i[_e13] && i.append(_e13, o[_e13]);}r = "multipart/form-data";} else {r = "application/json", i = {};for (_e14 in o) {void 0 !== o[_e14] && (i[_e14] = o[_e14]);}}a = { headers: { "content-type": r } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var r = "";for (var _e15 in n) {"" === r ? !s && (t += "?") : r += "&", r += "".concat(_e15, "=").concat(encodeURIComponent(n[_e15]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(R, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(s, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === ue.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n3 = _context8.sent;if (!_n3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_n3.data.code, "] ").concat(_n3.data.message));case 12:return _context8.abrupt("return", _n3.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new Error("[".concat(n.data.code, "] ").concat(n.data.message));case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return fe;}();var pe = {};function ge(e) {return pe[e];}var me = /*#__PURE__*/function () {function me(e) {_classCallCheck(this, me);this.config = e, this._cache = X(e.env), this._request = ge(e.env);}_createClass(me, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return me;}();var ye = /*#__PURE__*/function () {function ye(e) {_classCallCheck(this, ye);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = X(this._envId), this._request = ge(this._envId), this.setUserInfo();}_createClass(ye, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this9 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this9[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ye;}();var _e = /*#__PURE__*/function () {function _e(e) {_classCallCheck(this, _e);if (!e) throw new Error("envId is not defined");this._cache = X(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ye(e);}_createClass(_e, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === ce.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === ce.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === ce.WECHAT || this.loginType === ce.WECHAT_OPEN || this.loginType === ce.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return _e;}();var we = /*#__PURE__*/function (_me) {_inherits(we, _me);var _super4 = _createSuper(we);function we() {_classCallCheck(this, we);return _super4.apply(this, arguments);}_createClass(we, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, r, _e16;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:te(se);te(oe, { env: this.config.env, loginType: ce.ANONYMOUS, persistence: "local" });_e16 = new _e(this.config.env);_context13.next = 19;return _e16.user.refresh();case 19:return _context13.abrupt("return", _e16);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);r = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:te(ie, { env: this.config.env });te(oe, { loginType: ce.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, ce.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return we;}(me);var ke = /*#__PURE__*/function (_me2) {_inherits(ke, _me2);var _super5 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super5.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:te(se);te(oe, { env: this.config.env, loginType: ce.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new _e(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return ke;}(me);var Se = /*#__PURE__*/function (_me3) {_inherits(Se, _me3);var _super6 = _createSuper(Se);function Se() {_classCallCheck(this, Se);return _super6.apply(this, arguments);}_createClass(Se, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;r = s.refresh_token;o = s.access_token;i = s.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:te(se);te(oe, { env: this.config.env, loginType: ce.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new _e(this.config.env));case 22:throw s.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Se;}(me);var ve = /*#__PURE__*/function (_me4) {_inherits(ve, _me4);var _super7 = _createSuper(ve);function ve() {_classCallCheck(this, ve);return _super7.apply(this, arguments);}_createClass(ve, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: ce.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;r = s.refresh_token;o = s.access_token_expire;i = s.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:te(se);te(oe, { env: this.config.env, loginType: ce.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new _e(this.config.env));case 23:throw s.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return ve;}(me);var Te = /*#__PURE__*/function () {function Te(e) {_classCallCheck(this, Te);this.config = e, this._cache = X(e.env), this._request = ge(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ee(oe, this._onLoginTypeChanged);}_createClass(Te, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new we(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new ke(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Se(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new ve(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new we(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Se(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new ve(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new we(this.config)), ee(ie, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === ce.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), te(se), te(oe, { env: this.config.env, loginType: ce.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this10 = this;ee(se, function () {var t = _this10.hasLoginState();e.call(_this10, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {ee(re, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {ee(ae, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {ee(ie, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this11 = this;ee(oe, function () {var t = _this11.hasLoginState();e.call(_this11, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new _e(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new ke(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Te;}();var Ae = function Ae(e, t) {t = t || N();var n = ge(this.config.env),s = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: r, name: s, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},Pe = function Pe(e, t) {t = t || N();var n = ge(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Ie = function Ie(_ref5, t) {var e = _ref5.fileList;if (t = t || N(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t7 = _step3.value;if (!_t7 || "string" != typeof _t7) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return ge(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},be = function be(_ref6, t) {var e = _ref6.fileList;t = t || N(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s6 = _step4.value;"object" == typeof _s6 ? (_s6.hasOwnProperty("fileID") && _s6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s6.fileID, max_age: _s6.maxAge })) : "string" == typeof _s6 ? n.push({ fileid: _s6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return ge(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Oe = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return be.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = ge(this.config.env);r = n.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Oe(_x26, _x27) {return _ref8.apply(this, arguments);};}(),Ee = function Ee(_ref9, o) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,r = _ref9.search;var i = o || N();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: n, parse: s, search: r, function_name: e, request_data: a };return ge(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t8 = e.data.response_data;if (s) i(null, { result: _t8, requestId: e.requestId });else try {_t8 = JSON.parse(e.data.response_data), i(null, { result: _t8, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},Ce = { timeout: 15e3, persistence: "session" },Ue = {};var xe = /*#__PURE__*/function () {function xe(e) {_classCallCheck(this, xe);this.config = e || this.config, this.authObj = void 0;}_createClass(xe, [{ key: "init", value: function init(e) {switch (K.adapter || (this.requestClient = new K.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, Ce), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new xe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || K.adapter.primaryStorage || Ce.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;V[t] = new J(e), Y[t] = new J(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, pe[n.env] = new fe(n), this.authObj = new Te(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return ee.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return ne.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return Ee.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Ie.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return be.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ae.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return Pe.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Ue[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Ue[e];if (n) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = B(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (K.adapter = t), n && (K.runtime = n);} }]);return xe;}();var De = new xe();function qe(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),r = "";for (var o in n) {"" === r ? !s && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(n[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Re = /*#__PURE__*/function () {function Re() {_classCallCheck(this, Re);}_createClass(Re, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, r) {C.request({ url: qe("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = C.uploadFile({ url: qe("https:", s), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {l && "mp-alipay" === d && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Re;}();var Le = { setItem: function setItem(e, t) {C.setStorageSync(e, t);}, getItem: function getItem(e) {return C.getStorageSync(e);}, removeItem: function removeItem(e) {C.removeStorageSync(e);}, clear: function clear() {C.clearStorageSync();} };var Fe = { genAdapter: function genAdapter() {return { root: {}, reqClass: Re, localStorage: Le, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };De.useAdapters(Fe);var Ne = De,$e = Ne.init;Ne.init = function (e) {e.env = e.spaceId;var t = $e.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = P(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var je = Ne;function Me() {return { token: C.getStorageSync("uni_id_token") || C.getStorageSync("uniIdToken"), tokenExpired: C.getStorageSync("uni_id_token_expired") };}function Be() {if (!l || "h5" !== d) return;uni.getStorageSync("__LAST_DCLOUD_APPID") !== m && (uni.setStorageSync("__LAST_DCLOUD_APPID", m), console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), C.removeStorageSync("uni_id_token"), C.removeStorageSync("uniIdToken"), C.removeStorageSync("uni_id_token_expired"));}var Ke = /*#__PURE__*/function (_D) {_inherits(Ke, _D);var _super8 = _createSuper(Ke);function Ke() {_classCallCheck(this, Ke);return _super8.apply(this, arguments);}_createClass(Ke, [{ key: "getAccessToken", value: function getAccessToken() {var _this12 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this12.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = E.sign(n, this.config.clientSecret);var r = O();s["x-client-info"] = JSON.stringify(r);var _Me = Me(),o = _Me.token;return s["x-client-token"] = o, { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this13 = this;var e = _ref12.url,t = _ref12.formData,n = _ref12.name,s = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this13.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new I({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this14 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,n = _ref13$fileType === void 0 ? "image" : _ref13$fileType,s = _ref13.onUploadProgress;if (!t) throw new I({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name;r = t.result.fileUrl;var c = { url: o, formData: i, name: a, filePath: e, fileType: n };return _this14.uploadFileToOSS(Object.assign({}, c, { onUploadProgress: s }));}).then(function () {return _this14.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: r }) : s(new I({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref14) {var e = _ref14.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref15.fileList;var t = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };return this.request(this.setupRequest(t));} }]);return Ke;}(D);var He = { init: function init(e) {var t = new Ke(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };function We(_ref16) {var e = _ref16.data;var t;t = O();var n = JSON.parse(JSON.stringify(e || {}));if (Object.assign(n, { clientInfo: t }), !n.uniIdToken) {var _Me2 = Me(),_e17 = _Me2.token;_e17 && (n.uniIdToken = _e17);}return n;}function ze(_ref17) {var _this15 = this;var e = _ref17.name,t = _ref17.data;var n = this.localAddress,s = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {C.request({ method: "POST", url: i, data: { name: e, platform: d, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref18.data;var _ref19 = e || {},t = _ref19.code,n = _ref19.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref20) {var n = _ref20.code,s = _ref20.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e18 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e18), new Error(_e18);}case "SWITCH_TO_CLOUD":break;default:{var _e19 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e19), new Error(_e19);}}return _this15._originCallFunction({ name: e, data: t });}return new Promise(function (e, n) {var s = We.call(_this15, { data: t });C.request({ method: "POST", url: a, data: { provider: r, platform: d, param: s }, success: function success() {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref21.statusCode,s = _ref21.data;return !t || t >= 400 ? n(new I({ code: s.code || "SYS_ERR", message: s.message || "request:fail" })) : e({ result: s });}, fail: function fail(e) {n(new I({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Je = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Ve = /[\\^$.*+?()[\]{}|]/g,Ye = RegExp(Ve.source);function Xe(e, t, n) {return e.replace(new RegExp((s = t) && Ye.test(s) ? s.replace(Ve, "\\$&") : s, "g"), n);var s;}function Ge(_ref22) {var e = _ref22.functionName,t = _ref22.result,n = _ref22.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _s7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s7, "[/").concat(n, "-request]"));}}function Qe(e) {var t = e.callFunction,n = function n(_n4) {var _this16 = this;var s = _n4.name;_n4.data = We.call(e, { data: _n4.data });var r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, _n4).then(function (e) {return Ge.call(_this16, { functionName: s, result: e, logPvd: r }), Promise.resolve(e);}, function (e) {return Ge.call(_this16, { functionName: s, result: e, logPvd: r }), e && e.message && (e.message = function () {var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$message = _ref23.message,e = _ref23$message === void 0 ? "" : _ref23$message,_ref23$extraInfo = _ref23.extraInfo,t = _ref23$extraInfo === void 0 ? {} : _ref23$extraInfo,_ref23$formatter = _ref23.formatter,n = _ref23$formatter === void 0 ? [] : _ref23$formatter;for (var _s8 = 0; _s8 < n.length; _s8++) {var _n$_s = n[_s8],_r3 = _n$_s.rule,_o2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Xe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Xe(_c, "{".concat(_e21, "}"), t[_e21]);}return "replace" === i ? _c : e + _c;}return e;}({ message: "[".concat(_n4.name, "]: ").concat(e.message), formatter: Je, extraInfo: { functionName: s } })), Promise.reject(e);});};e.callFunction = function (t) {var s;return l && e.debugInfo && !e.debugInfo.forceRemote && p ? (e._originCallFunction || (e._originCallFunction = n), s = ze.call(this, t)) : s = n.call(this, t), Object.defineProperty(s, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), s;};}var Ze = Symbol("CLIENT_DB_INTERNAL");function et(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = Ze, e.__ob__ = void 0, new Proxy(e, { get: function get(e, n, s) {if ("_uniClient" === n) return null;if (n in e || "string" != typeof n) {var _t9 = e[n];return "function" == typeof _t9 ? _t9.bind(e) : _t9;}return t.get(e, n, s);} });}function tt(e) {return { on: function on(t, n) {e[t] = e[t] || [], e[t].indexOf(n) > -1 || e[t].push(n);}, off: function off(t, n) {e[t] = e[t] || [];var s = e[t].indexOf(n);-1 !== s && e[t].splice(s, 1);} };}var nt = ["db.Geo", "db.command", "command.aggregate"];function st(e, t) {return nt.indexOf("".concat(e, ".").concat(t)) > -1;}function rt(e) {switch (c(e)) {case "array":return e.map(function (e) {return rt(e);});case "object":return e._internalType === Ze || Object.keys(e).forEach(function (t) {e[t] = rt(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}var ot = /*#__PURE__*/function () {function ot(e, t, n) {_classCallCheck(this, ot);this.content = e, this.prevStage = t || null, this.udb = null, this._database = n;}_createClass(ot, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: rt(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),s = this.getCommand();if (s.$db.push({ $method: e, $param: rt(t) }), l) {var _e22 = s.$db.find(function (e) {return "collection" === e.$method;}),_t10 = _e22 && _e22.$param;_t10 && 1 === _t10.length && "string" == typeof _e22.$param[0] && _e22.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");}return this._database._callCloudFunction({ action: n, command: s });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _n5 = e.content.$method;if ("aggregate" === _n5 || "pipeline" === _n5) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return it({ $method: "count", $param: rt(Array.from(arguments)) }, e, this._database);};} }]);return ot;}();function it(e, t, n) {return et(new ot(e, t, n), { get: function get(e, t) {var s = "db";return e && e.content && (s = e.content.$method), st(s, t) ? it({ $method: t }, e, n) : function () {return it({ $method: t, $param: rt(Array.from(arguments)) }, e, n);};} });}function at(_ref24) {var e = _ref24.path,t = _ref24.method;return /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);this.param = Array.from(arguments);}_createClass(_class2, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class2;}();}var ct = /*#__PURE__*/function (_ref25) {_inherits(ct, _ref25);var _super9 = _createSuper(ct);function ct() {_classCallCheck(this, ct);return _super9.apply(this, arguments);}_createClass(ct, [{ key: "_callCloudFunction", value: function _callCloudFunction(_ref26) {var _this17 = this;var e = _ref26.action,t = _ref26.command,n = _ref26.multiCommand,s = _ref26.queryList;function r(e, t) {if (n && s) for (var _n6 = 0; _n6 < s.length; _n6++) {var _r4 = s[_n6];_r4.udb && "function" == typeof _r4.udb.setResult && (t ? _r4.udb.setResult(t) : _r4.udb.setResult(e.result.dataList[_n6]));}}var o = T(A("database", "invoke")),i = this._uniClient;return o.then(function () {return i.callFunction({ name: "DCloud-clientDB", type: a, data: { action: e, command: t, multiCommand: n } });}).then(function (e) {var _e$result = e.result,t = _e$result.code,n = _e$result.message,s = _e$result.token,o = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,i = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (i) for (var _e23 = 0; _e23 < i.length; _e23++) {var _i$_e = i[_e23],_t11 = _i$_e.level,_n7 = _i$_e.message,_s9 = _i$_e.detail,_r5 = console["app-plus" === d && "warn" === _t11 ? "error" : _t11] || console.log;var _o3 = "[System Info]" + _n7;_s9 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s9)), _r5(_o3);}if (t) {var _s10 = new I({ message: n, code: t, requestId: e.requestId });return _this17._callback("error", [_s10]), Promise.reject(_s10);}s && o && (!function () {var _ref27 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref27.token,t = _ref27.tokenExpired;e && C.setStorageSync("uni_id_token", e), t && C.setStorageSync("uni_id_token_expired", t);}({ token: s, tokenExpired: o }), _this17._callbackAuth("refreshToken", [{ token: s, tokenExpired: o }]), _this17._callback("refreshToken", [{ token: s, tokenExpired: o }]));var a = e.result.affectedDocs;return "number" == typeof a && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), a;} }), T(A("database", "success"), e).then(function () {return T(A("database", "complete"), e);}).then(function () {return r(e, null), Promise.resolve(e);});}, function (e) {var t = new I({ code: e.code || "SYSTEM_ERROR", message: e.message, requestId: e.requestId });return _this17._callback("error", [t]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), T(A("database", "fail"), e).then(function () {return T(A("database", "complete"), e);}).then(function () {return r(null, e), Promise.reject(e);});});} }]);return ct;}( /*#__PURE__*/function () {function _class3() {var _ref28 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref28$uniClient = _ref28.uniClient,e = _ref28$uniClient === void 0 ? {} : _ref28$uniClient;_classCallCheck(this, _class3);this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = _("_globalUniCloudDatabaseCallback")), this.auth = tt(this._authCallBacks), Object.assign(this, tt(this._dbCallBacks)), this.env = et({}, { get: function get(e, t) {return { $env: t };} }), this.Geo = et({}, { get: function get(e, t) {return at({ path: ["Geo"], method: t });} }), this.serverDate = at({ path: [], method: "serverDate" }), this.RegExp = at({ path: [], method: "RegExp" });}_createClass(_class3, [{ key: "getCloudEnv", value: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };} }, { key: "_callback", value: function _callback(e, t) {var n = this._dbCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "_callbackAuth", value: function _callbackAuth(e, t) {var n = this._authCallBacks;n[e] && n[e].forEach(function (e) {e.apply(void 0, _toConsumableArray(t));});} }, { key: "multiSend", value: function multiSend() {var e = Array.from(arguments),t = e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };});return this._callCloudFunction({ multiCommand: t, queryList: e });} }]);return _class3;}());function ut(e) {e.database = function (t) {if (t && Object.keys(t).length > 0) return e.init(t).database();if (this._database) return this._database;var n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return et(new e(t), { get: function get(e, t) {return st("db", t) ? it({ $method: t }, null, e) : function () {return it({ $method: t, $param: rt(Array.from(arguments)) }, null, e);};} });}(ct, { uniClient: e });return this._database = n, n;};}var ht;var lt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",dt = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;function ft() {var e = Me().token || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(ht(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}ht = "function" != typeof atob ? function (e) {if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !dt.test(e)) throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");var t;e += "==".slice(2 - (3 & e.length));for (var n, s, r = "", o = 0; o < e.length;) {t = lt.indexOf(e.charAt(o++)) << 18 | lt.indexOf(e.charAt(o++)) << 12 | (n = lt.indexOf(e.charAt(o++))) << 6 | (s = lt.indexOf(e.charAt(o++))), r += 64 === n ? String.fromCharCode(t >> 16 & 255) : 64 === s ? String.fromCharCode(t >> 16 & 255, t >> 8 & 255) : String.fromCharCode(t >> 16 & 255, t >> 8 & 255, 255 & t);}return r;} : atob;var pt = t(n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref29) {var s = _ref29.onChooseFile,r = _ref29.onUploadProgress;return t.then(function (e) {if (s) {var _t12 = s(e);if (void 0 !== _t12) return Promise.resolve(_t12).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = o[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,n = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : o(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var gt = "manual";function mt(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, spaceInfo: { type: Object, default: function _default() {return {};} }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === gt) return;var n = !1;var s = [];for (var _r6 = 2; _r6 < e.length; _r6++) {e[_r6] !== t[_r6] && (s.push(e[_r6]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref30 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref30$getone = _ref30.getone,e = _ref30$getone === void 0 ? !1 : _ref30$getone,t = _ref30.success,n = _ref30.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,r = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var o = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var _n8;var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database(this.spaceInfo);var s = t.action || this.action;s && (n = n.action(s));var r = t.collection || this.collection;n = Array.isArray(r) ? (_n8 = n).collection.apply(_n8, _toConsumableArray(r)) : n.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (n = n.where(o));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var h = t.orderby || this.orderby;h && (n = n.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;} } };}function yt(e) {return function (t) {var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};n = function (e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};return e.customUI = t.customUI || e.customUI, Object.assign(e.loadingOptions, t.loadingOptions), Object.assign(e.errorOptions, t.errorOptions), e;}({ customUI: !1, loadingOptions: { text: "加载中...", mask: !0 }, errorOptions: { type: "modal", retry: !1 } }, n);var _n9 = n,s = _n9.customUI,r = _n9.loadingOptions,o = _n9.errorOptions,a = !s;return new Proxy({}, { get: function get(n, s) {return /*#__PURE__*/function () {var _n10 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32() {var u,_len,c,_key,_ref31,h,l,_yield,_e25,_e24,_args32 = arguments;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:a && uni.showLoading({ title: r.title, mask: r.mask });for (_len = _args32.length, c = new Array(_len), _key = 0; _key < _len; _key++) {c[_key] = _args32[_key];}_context32.prev = 2;_context32.next = 5;return e.callFunction({ name: t, type: i, data: { method: s, params: c } });case 5:u = _context32.sent;_context32.next = 11;break;case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](2);u = { result: _context32.t0 };case 11:_ref31 = u.result || {}, h = _ref31.errCode, l = _ref31.errMsg;if (!(a && uni.hideLoading(), h)) {_context32.next = 28;break;}if (!a) {_context32.next = 26;break;}if (!("toast" === o.type)) {_context32.next = 18;break;}uni.showToast({ title: l, icon: "none" });_context32.next = 26;break;case 18:if (!("modal" !== o.type)) {_context32.next = 20;break;}throw new Error("Invalid errorOptions.type: ".concat(o.type));case 20:_context32.next = 22;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31() {var _ref33,e,t,n,s,r,_args31 = arguments;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_ref33 = _args31.length > 0 && _args31[0] !== undefined ? _args31[0] : {}, e = _ref33.title, t = _ref33.content, n = _ref33.showCancel, s = _ref33.cancelText, r = _ref33.confirmText;return _context31.abrupt("return", new Promise(function (o, i) {uni.showModal({ title: e, content: t, showCancel: n, cancelText: s, confirmText: r, success: function success(e) {o(e);}, fail: function fail() {o({ confirm: !1, cancel: !0 });} });}));case 2:case "end":return _context31.stop();}}}, _callee31);}))({ title: "提示", content: l, showCancel: o.retry, cancelText: "取消", confirmText: o.retry ? "重试" : "确定" });case 22:_yield = _context32.sent;_e25 = _yield.confirm;if (!(o.retry && _e25)) {_context32.next = 26;break;}return _context32.abrupt("return", n.apply(void 0, c));case 26:_e24 = new I({ code: h, message: l, requestId: u.requestId });throw _e24.detail = u.result, _e24;case 28:return _context32.abrupt("return", u.result);case 29:case "end":return _context32.stop();}}}, _callee32, null, [[2, 8]]);}));function n() {return _n10.apply(this, arguments);}return n;}();} });};}function _t(_x30, _x31) {return _t13.apply(this, arguments);}function _t13() {_t13 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee34(e, t) {var n, _e28, s;return _regenerator.default.wrap(function _callee34$(_context34) {while (1) {switch (_context34.prev = _context34.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context34.prev = 1;_context34.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {C.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context34.sent;return _context34.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context34.prev = 8;_context34.t0 = _context34["catch"](1);return _context34.abrupt("return", !1);case 11:case "end":return _context34.stop();}}}, _callee34, null, [[1, 8]]);}));return _t13.apply(this, arguments);}function wt(e) {if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus) return;var t = Promise.resolve();var n;n = 1, t = new Promise(function (e, t) {setTimeout(function () {e();}, n);}), e.isReady = !1, e.isDefault = !1;var s = e.auth();e.initUniCloudStatus = "pending", e.initUniCloud = t.then(function () {return s.getLoginState();}).then(function (e) {return e ? Promise.resolve() : s.signInAnonymously();}).then(function () {if (!l) return Promise.resolve();if (l && e.debugInfo) {var _e$debugInfo = e.debugInfo,_t14 = _e$debugInfo.address,_n11 = _e$debugInfo.servePort;return function () {var _ref34 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee33(e, t) {var n, _s11, _r7;return _regenerator.default.wrap(function _callee33$(_context33) {while (1) {switch (_context33.prev = _context33.next) {case 0:_s11 = 0;case 1:if (!(_s11 < e.length)) {_context33.next = 11;break;}_r7 = e[_s11];_context33.next = 5;return _t(_r7, t);case 5:if (!_context33.sent) {_context33.next = 8;break;}n = _r7;return _context33.abrupt("break", 11);case 8:_s11++;_context33.next = 1;break;case 11:return _context33.abrupt("return", { address: n, port: t });case 12:case "end":return _context33.stop();}}}, _callee33);}));return function (_x32, _x33) {return _ref34.apply(this, arguments);};}()(_t14, _n11);}}).then(function () {var _ref35 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},t = _ref35.address,n = _ref35.port;if (!l) return Promise.resolve();if (t) e.localAddress = t, e.localPort = n;else if (e.debugInfo) {var _t15 = console["app-plus" === d ? "error" : "warn"];var _n12 = "";"remote" === e.debugInfo.initialLaunchType ? (e.debugInfo.forceRemote = !0, _n12 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs") : _n12 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs", "h5" === d && (_n12 += "\n- 部分浏览器开启节流模式之后访问本地地址受限，请检查是否启用了节流模式"), _t15(_n12);}}).then(function () {Be(), e.isReady = !0, e.initUniCloudStatus = "fulfilled";}).catch(function (t) {console.error(t), e.initUniCloudStatus = "rejected";});}var kt = new ( /*#__PURE__*/function () {function _class4() {_classCallCheck(this, _class4);}_createClass(_class4, [{ key: "init", value: function init(e) {var t = {};var n = !1 !== e.debugFunction && l && ("h5" === d && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === d);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":t = q.init(Object.assign(e, { useDebugFunction: n }));break;case "private":t = He.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}var s = f;l && s && !s.code && (t.debugInfo = s), wt(t), t.reInit = function () {wt(this);}, Qe(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {return t.call(this, e);};}(t), ut(t), function (e) {e.getCurrentUserInfo = ft, e.chooseAndUploadFile = pt.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return mt(e);} }), e.importObject = yt(e);}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {if (!t[e]) return;var n = t[e];t[e] = function () {return t.reInit(), n.apply(t, Array.from(arguments));}, t[e] = P(t[e], e).bind(t);}), t.init = this.init, t;} }]);return _class4;}())();(function () {{var e = p;var t = {};if (1 === e.length) t = e[0], kt = kt.init(t), kt.isDefault = !0;else {var _t16 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];var _n13;_n13 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : g ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t16.forEach(function (e) {kt[e] = function () {return console.error(_n13), Promise.reject(new I({ code: "SYS_ERR", message: _n13 }));};});}Object.assign(kt, { get mixinDatacom() {return mt(kt);} }), kt.addInterceptor = S, kt.removeInterceptor = v, l && "h5" === d && (window.uniCloud = kt);}})();var St = kt;exports.default = St;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 95:
/*!***********************************************!*\
  !*** D:/uniapp/魔域/pages.json?{"type":"stat"} ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__EB8546D" };exports.default = _default;

/***/ }),

/***/ 96:
/*!***********************************!*\
  !*** D:/uniapp/魔域/utils/login.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.wxLogin = wxLogin;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 34));var _auth = __webpack_require__(/*! ./auth */ 17);



var _user = __webpack_require__(/*! @/api/user */ 37);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


function wxLogin() {
  var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var userInfo;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              //判断是否存在信息
              userInfo = (0, _auth.getUserInfo)();
              //判断是否存在当前用户
              if (userInfo && userInfo.openId) {
                resolve('ok');
              } else {
                //微信登录 获取临时code
                uni.getUserProfile({
                  desc: '登录',
                  success: function success(loginRes) {
                    // uni.login({
                    // 	provider: 'weixin',
                    // 	success: function(loginRes) {
                    console.log('loginRes', loginRes);
                    var userInfo = loginRes.userInfo;
                    // 判断是否已授权
                    uni.getSetting({
                      success: function success(res) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                                  console.log("授权：", res);
                                  if (!res.authSetting['scope.userInfo']) {
                                    //这里调用授权
                                    resolve('authSetting');
                                  } else {
                                    //用户已经授权过了
                                    uni.login({
                                      provider: 'weixin',
                                      success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var result;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                                                  console.log("当前已授权");
                                                  //判断已授权调取接口并获取openId 
                                                  _context.next = 3;return (0, _user.getOpenid)({
                                                    js_code: res.code });case 3:result = _context.sent;

                                                  Object.assign(userInfo, {
                                                    openId: result.openid });

                                                  (0, _auth.setUserInfo)(userInfo);
                                                  resolve('ok');case 7:case "end":return _context.stop();}}}, _callee);}));function success(_x2) {return _success.apply(this, arguments);}return success;}(),

                                      fail: function fail(e) {
                                        _this.title = e;
                                      } });


                                  }case 2:case "end":return _context2.stop();}}}, _callee2);}))();
                      },
                      fail: function fail(res) {
                        console.log(res);
                        resolve('error');
                      } });

                  } });

              }case 2:case "end":return _context3.stop();}}}, _callee3);}));return function (_x) {return _ref.apply(this, arguments);};}());

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 97:
/*!************************************!*\
  !*** D:/uniapp/魔域/utils/upload.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.chooseImage = chooseImage;exports.weixin_img = weixin_img;exports.reverseImgData = reverseImgData;function chooseImage() {
  var that = this;
  uni.chooseImage({
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    count: 9, //默认9
    success: function success(rem) {
      that.tempFilePaths = rem.tempFilePaths;
      that.weixin_img(0, rem);
    } });

}
function weixin_img(num, rem) {
  var that = this;
  wx.getImageInfo({ //获取这个图片 图片压缩
    src: rem.tempFiles[num].path, //需要获取的图片 图片选择不用我说了吧
    success: function success(res) {
      var ctx = wx.createCanvasContext('attendCanvasId'); //使用一个canvas
      var canvasWidth = res.width; //原图宽度 
      var canvasHeight = res.height; //原图高度
      var ratio = 2;
      // 保证宽高均在200以内
      while (canvasWidth > 200 || canvasHeight > 200) {
        //比例取整
        canvasWidth = Math.trunc(res.width / ratio);
        canvasHeight = Math.trunc(res.height / ratio);
        ratio++;
      }
      //绘制新图
      ctx.drawImage(rem.tempFiles[num].path, 0, 0, canvasWidth, canvasHeight);
      ctx.draw(false, function () {
        //获取图像数据， API 1.9.0
        wx.canvasGetImageData({
          canvasId: 'attendCanvasId',
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          success: function success(res) {
            var platform = wx.getSystemInfoSync().platform;
            if (platform == 'ios') {
              // 兼容处理：ios获取的图片上下颠倒
              res = that.reverseImgData(res);
            }
            // 3. png编码
            var pngData = upng.encode([res.data.buffer], canvasWidth, canvasHeight);
            // 4. base64编码
            var base64 = wx.arrayBufferToBase64(pngData);
            // console.log('1111','data:image/jpeg;base64,'+base64)
            rem.tempFiles[num].Base64_Path = base64;
            that.materialList = that.materialList.concat(rem.tempFiles[num]);
            //利用递归循环来实现多张图片压缩
            if (num == rem.tempFiles.length - 1) {
              return;
            } else {
              that.weixin_img(num + 1, rem);
            }
            console.log('end', that.materialList);
          } });

      });
    } });



}
// 兼容处理：ios获取的图片上下颠倒
function reverseImgData(res) {
  var w = res.width;
  var h = res.height;
  var con = 0;
  for (var i = 0; i < h / 2; i++) {
    for (var j = 0; j < w * 4; j++) {
      con = res.data[i * w * 4 + j];
      res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j];
      res.data[(h - i - 1) * w * 4 + j] = con;
    }
  }
  return res;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map