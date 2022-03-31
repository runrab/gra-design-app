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
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

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


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

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
      if (Object({"VUE_APP_NAME":"高校毕业生信息去向跟踪系统","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

/***/ 12:
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

/***/ 13:
/*!******************************************************!*\
  !*** D:/work/code/gra/gra-design-app/store/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));
var _api = _interopRequireDefault(__webpack_require__(/*! @/api/api */ 15));
var _MinCache = _interopRequireDefault(__webpack_require__(/*! @/common/util/MinCache.js */ 30));
var _constants = __webpack_require__(/*! @/common/util/constants */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);var _default =

new _vuex.default.Store({
  state: {
    token: '',
    userid: '',
    username: '',
    realname: '',
    welcome: '',
    avatar: '' },

  mutations: {
    SET_TOKEN: function SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_NAME: function SET_NAME(state, _ref) {var username = _ref.username,realname = _ref.realname,welcome = _ref.welcome;
      state.username = username;
      state.realname = realname;
      state.welcome = welcome;
    },
    SET_AVATAR: function SET_AVATAR(state, avatar) {
      state.avatar = avatar;
    } },

  actions: {
    // 登录
    mLogin: function mLogin(_ref2, userInfo) {var commit = _ref2.commit;
      return new Promise(function (resolve, reject) {
        _api.default.login(userInfo).then(function (response) {
          if (response.data.code == 200) {
            var result = response.data.result;
            var _userInfo = result.userInfo;
            uni.setStorageSync(_constants.ACCESS_TOKEN, result.token);
            uni.setStorageSync(_constants.USER_INFO, _userInfo);
            commit('SET_TOKEN', result.token);
            commit('SET_AVATAR', _userInfo.avatar);
            commit('SET_NAME', { username: _userInfo.username, realname: _userInfo.realname });
            resolve(response);
          } else {
            resolve(response);
          }
        }).catch(function (error) {
          console.log("catch===>response", response);
          reject(error);
        });
      });
    },
    //手机号登录
    PhoneLogin: function PhoneLogin(_ref3, userInfo) {var commit = _ref3.commit;
      return new Promise(function (resolve, reject) {
        _api.default.phoneNoLogin(userInfo).then(function (response) {
          if (response.data.code == 200) {
            var result = response.data.result;
            var _userInfo2 = result.userInfo;
            uni.setStorageSync(_constants.ACCESS_TOKEN, result.token);
            uni.setStorageSync(_constants.USER_INFO, _userInfo2);
            commit('SET_TOKEN', result.token);
            commit('SET_NAME', { username: _userInfo2.username, realname: _userInfo2.realname });
            commit('SET_AVATAR', _userInfo2.avatar);
            resolve(response);
          } else {
            reject(response);
          }
        }).catch(function (error) {
          reject(error);
        });
      });
    },
    // 登出
    Logout: function Logout(_ref4) {var commit = _ref4.commit,state = _ref4.state;
      return new Promise(function (resolve) {
        var logoutToken = state.token;
        commit('SET_TOKEN', '');
        uni.removeStorageSync(_constants.ACCESS_TOKEN);
        _api.default.logout(logoutToken).then(function () {
          resolve();
        }).catch(function () {
          resolve();
        });
      });
    } },


  getters: {
    token: function token(state) {return state.token;},
    username: function username(state) {state.userid = uni.getStorageSync(_constants.USER_INFO).username;return state.username;},
    nickname: function nickname(state) {state.userid = uni.getStorageSync(_constants.USER_INFO).realname;return state.user.realname;},
    avatar: function avatar(state) {state.userid = uni.getStorageSync(_constants.USER_INFO).avatar;return state.user.avatar;},
    userid: function userid(state) {state.userid = uni.getStorageSync(_constants.USER_INFO).id;return state.userid;} } });exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
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

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
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

/***/ 15:
/*!**************************************************!*\
  !*** D:/work/code/gra/gra-design-app/api/api.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _service = __webpack_require__(/*! @/common/service/service.js */ 16);
var _configService = _interopRequireDefault(__webpack_require__(/*! @/common/service/config.service.js */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var apiService = {

  /**
                    * 登录
                    */
  login: function login(params) {
    return _service.http.post('/sys/mLogin', params);
  },
  /**
       * 手机号码登录
       */
  phoneNoLogin: function phoneNoLogin(params) {
    return _service.http.post('/sys/phoneLogin', params);
  },
  /**
       * 退出
       */
  logout: function logout(params) {
    return _service.http.post('/sys/logout', params);
  },
  /**
      * 获取文件访问路径
      * @param avatar
      * @param subStr
      * @returns {*}
      */
  getFileAccessHttpUrl: function getFileAccessHttpUrl(avatar, subStr) {
    if (!subStr) subStr = 'http';
    if (avatar && avatar.startsWith(subStr)) {
      return avatar;
    } else {
      return _configService.default.staticDomainURL + "/" + avatar;
    }
  } };var _default =


apiService;exports.default = _default;

/***/ }),

/***/ 16:
/*!*****************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/service/service.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.http = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _index = _interopRequireDefault(__webpack_require__(/*! @/common/luch-request/index.js */ 20));
var _constants = __webpack_require__(/*! @/common/util/constants.js */ 27);
var _configService = _interopRequireDefault(__webpack_require__(/*! ./config.service.js */ 28));
var _tip = _interopRequireDefault(__webpack_require__(/*! @/common/util/tip.js */ 29));
var _index2 = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var apiUrl = _configService.default.apiUrl;

var getTokenStorage = function getTokenStorage() {
  var token = '';
  try {
    token = uni.getStorageSync(_constants.ACCESS_TOKEN);
  } catch (e) {
    //TODO handle the exception
    console.log("getTokenStorage", token);
  }
  return token;
};



var http = new _index.default();exports.http = http;
http.setConfig(function (config) {/* 设置全局配置 */
  config.baseUrl = apiUrl; /* 根域名不同 */
  config.header = _objectSpread({},
  config.header);

  return config;
});

/**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
// 有默认，非必写
http.validateStatus = function (statusCode) {
  return statusCode === 200;
};

http.interceptor.request(function (config, cancel) {/* 请求之前拦截器 */
  config.header = _objectSpread(_objectSpread({},
  config.header), {}, {
    'X-Access-Token': getTokenStorage() });

  /*
                                            if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
                                              cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
                                            }
                                            */
  return config;
});

// 必须使用异步函数，注意
http.interceptor.response( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(response) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt("return",



            response);case 1:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}(),
function (response) {
  // 请求错误做点什么
  console.log("请求错误做点什么", response);
  if (response) {
    var data = response.data;
    var token = uni.getStorageSync(_constants.ACCESS_TOKEN);
    console.log("------异常响应------", token);
    console.log("------异常响应------", data.status);
    switch (data.status) {
      case 403:
        _tip.default.error('拒绝访问');
        break;
      case 500:
        if (!token || data.message == "Token失效，请重新登录") {
          var timeout = setTimeout(_tip.default.alert('登录已过期'), 1000);
          _index2.default.dispatch('Logout').then(function () {
            clearTimeout(timeout);
            window.location.reload();
          });
        }
        break;
      case 404:
        break;
      case 504:
        break;
      case 401:
        if (token) {
          /* store.dispatch('Logout').then(() => {
                       setTimeout(() => {
                         window.location.reload()
                       }, 1500)
                     }) */
        }
        break;
      default:
        _tip.default.error({
          duration: 0,
          forbidClick: true,
          message: data.message });

        break;}

  }
  return response;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 18);

/***/ }),

/***/ 18:
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

module.exports = __webpack_require__(/*! ./runtime */ 19);

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

/***/ 19:
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

/***/ 20:
/*!********************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 21:
/*!***************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/core/Request.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));










var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 22));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ./buildFullPath */ 24));
var _utils = __webpack_require__(/*! ../utils */ 23);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var

Request = /*#__PURE__*/function () {function Request() {var _this = this;_classCallCheck(this, Request);_defineProperty(this, "config",
    {
      baseUrl: '',
      header: {},
      method: 'GET',
      dataType: 'json',

      responseType: 'text',

      custom: {},

      timeout: 30000 });_defineProperty(this, "interceptor",














    {
      /**
       * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
       */
      request: function request(cb) {
        if (cb) {
          _this.requestBeforeFun = cb;
        }
      },
      /**
          * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
          * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
          */
      response: function response(cb, ecb) {
        if (cb) {
          _this.requestComFun = cb;
        }
        if (ecb) {
          _this.requestComFail = ecb;
        }
      } });_defineProperty(this, "requestBeforeFun",


    function (config) {
      return config;
    });_defineProperty(this, "requestComFun",

    function (response) {
      return response;
    });_defineProperty(this, "requestComFail",

    function (response) {
      return response;
    });}_createClass(Request, [{ key: "validateStatus",

    /**
                                                         * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
                                                         * @param { Number } statusCode - 请求响应体statusCode（只读）
                                                         * @return { Boolean } 如果为true,则 resolve, 否则 reject
                                                         */value: function validateStatus(
    statusCode) {
      return statusCode === 200;
    }

    /**
       * @Function
       * @param {Request~setConfigCallback} f - 设置全局默认配置
       */ }, { key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    }

    /**
       * @Function
       * @param {Object} options - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var _this2 = this;var options,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};return _context.abrupt("return",
                new Promise(function (resolve, reject) {
                  options.baseUrl = _this2.config.baseUrl;
                  options.dataType = options.dataType || _this2.config.dataType;

                  options.responseType = options.responseType || _this2.config.responseType;


                  options.timeout = options.timeout || _this2.config.timeout;




                  options.url = options.url || '';
                  options.data = options.data || {};
                  options.params = options.params || {};
                  options.header = _objectSpread(_objectSpread({}, _this2.config.header), options.header || {});
                  options.method = options.method || _this2.config.method;
                  options.custom = _objectSpread(_objectSpread({}, _this2.config.custom), options.custom || {});



                  options.getTask = options.getTask || _this2.config.getTask;
                  var next = true;
                  var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options;
                    var err = {
                      errMsg: t,
                      config: config };

                    reject(err);
                    next = false;
                  };

                  var handleRe = _objectSpread({}, _this2.requestBeforeFun(options, cancel));
                  var _config = _objectSpread({}, handleRe);
                  if (!next) return;
                  var requestTask = uni.request({
                    url: (0, _buildURL.default)((0, _buildFullPath.default)(_config.baseUrl, _config.url), _config.params),
                    data: _config.data,
                    header: _config.header,
                    method: _config.method,

                    timeout: _config.timeout,

                    dataType: _config.dataType,

                    responseType: _config.responseType,







                    complete: function complete(response) {
                      response.config = handleRe;
                      if (_this2.validateStatus(response.statusCode)) {// 成功
                        response = _this2.requestComFun(response);
                        resolve(response);
                      } else {
                        response = _this2.requestComFail(response);
                        reject(response);
                      }
                    } });

                  if (handleRe.getTask) {
                    handleRe.getTask(requestTask, handleRe);
                  }
                }));case 2:case "end":return _context.stop();}}}, _callee);}));function request() {return _request.apply(this, arguments);}return request;}() }, { key: "get", value: function get(


    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.request(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url, _ref)
















    {var _this3 = this;var filePath = _ref.filePath,name = _ref.name,_ref$header = _ref.header,header = _ref$header === void 0 ? {} : _ref$header,_ref$formData = _ref.formData,formData = _ref$formData === void 0 ? {} : _ref$formData,_ref$custom = _ref.custom,custom = _ref$custom === void 0 ? {} : _ref$custom,_ref$params = _ref.params,params = _ref$params === void 0 ? {} : _ref$params,getTask = _ref.getTask;
      return new Promise(function (resolve, reject) {
        var next = true;
        var globalHeader = _objectSpread({}, _this3.config.header);
        delete globalHeader['content-type'];
        delete globalHeader['Content-Type'];
        var pubConfig = {
          baseUrl: _this3.config.baseUrl,
          url: url,



          filePath: filePath,
          method: 'UPLOAD',
          name: name,
          header: _objectSpread(_objectSpread({}, globalHeader), header),
          formData: formData,
          params: params,
          custom: _objectSpread(_objectSpread({}, _this3.config.custom), custom),
          getTask: getTask || _this3.config.getTask };











        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this3.requestBeforeFun(pubConfig, cancel));
        var _config = {
          url: (0, _buildURL.default)((0, _buildFullPath.default)(handleRe.baseUrl, handleRe.url), handleRe.params),



          filePath: handleRe.filePath,
          name: handleRe.name,
          header: handleRe.header,
          formData: handleRe.formData,
          complete: function complete(response) {
            response.config = handleRe;
            try {
              // 对可能字符串不是json 的情况容错
              if (typeof response.data === 'string') {
                response.data = JSON.parse(response.data);
              }
              // eslint-disable-next-line no-empty
            } catch (e) {
            }
            if (_this3.validateStatus(response.statusCode)) {// 成功
              response = _this3.requestComFun(response);
              resolve(response);
            } else {
              response = _this3.requestComFail(response);
              reject(response);
            }
          } };











        if (!next) return;
        var requestTask = uni.uploadFile(_config);
        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }, { key: "download", value: function download(

    url) {var _this4 = this;var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var next = true;
        var pubConfig = {
          baseUrl: _this4.config.baseUrl,
          url: url,
          method: 'DOWNLOAD',
          header: _objectSpread(_objectSpread({}, _this4.config.header), options.header || {}),
          params: options.params || {},
          custom: _objectSpread(_objectSpread({}, _this4.config.custom), options.custom || {}),
          getTask: options.getTask || _this4.config.getTask };

        var cancel = function cancel() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'handle cancel';var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pubConfig;
          var err = {
            errMsg: t,
            config: config };

          reject(err);
          next = false;
        };

        var handleRe = _objectSpread({}, _this4.requestBeforeFun(pubConfig, cancel));
        if (!next) return;
        var requestTask = uni.downloadFile({
          url: (0, _buildURL.default)((0, _buildFullPath.default)(handleRe.baseUrl, handleRe.url), handleRe.params),
          header: handleRe.header,
          complete: function complete(response) {
            response.config = handleRe;
            if (_this4.validateStatus(response.statusCode)) {// 成功
              response = _this4.requestComFun(response);
              resolve(response);
            } else {
              response = _this4.requestComFail(response);
              reject(response);
            }
          } });

        if (handleRe.getTask) {
          handleRe.getTask(requestTask, handleRe);
        }
      });
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */
/**
                                   * 请求拦截器回调
                                   * @return {Object} - 返回操作后的config
                                   * @callback Request~requestCallback
                                   * @param {Object} config - 全局config
                                   * @param {Function} [cancel] - 取消请求钩子，调用会取消本次请求
                                   */
/**
                                       * 响应拦截器回调
                                       * @return {Object} - 返回操作后的response
                                       * @callback Request~responseCallback
                                       * @param {Object} response - 请求结果 response
                                       */
/**
                                           * 响应错误拦截器回调
                                           * @return {Object} - 返回操作后的response
                                           * @callback Request~responseErrCallback
                                           * @param {Object} response - 请求结果 response
                                           */exports.default = Request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!*******************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/helpers/buildURL.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 23));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 23:
/*!********************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/utils.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/***/ }),

/***/ 24:
/*!*********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/core/buildFullPath.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 25));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 25:
/*!************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/helpers/isAbsoluteURL.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 26:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/luch-request/helpers/combineURLs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 27:
/*!****************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/constants.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.USER_INFO = exports.USER_NAME = exports.ACCESS_TOKEN = void 0;var ACCESS_TOKEN = 'Access-Token';exports.ACCESS_TOKEN = ACCESS_TOKEN;
var USER_NAME = 'login_username';exports.USER_NAME = USER_NAME;
var USER_INFO = 'login_user_info';exports.USER_INFO = USER_INFO;


var STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local' // storage name session, local, memory
};var _default =

STORAGE_OPTIONS;exports.default = _default;

/***/ }),

/***/ 28:
/*!************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/service/config.service.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var BASE_URL = '';


if (true) {
  BASE_URL = 'http://127.0.0.1:8180/jeecg-boot'; // 开发环境
  //http://127.0.0.1:8180/jeecg-boot

} else {}
var staticDomainURL = BASE_URL + '/sys/common/static';

var configService = {
  apiUrl: BASE_URL,
  staticDomainURL: staticDomainURL };var _default =


configService;exports.default = _default;

/***/ }),

/***/ 29:
/*!**********************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/tip.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 提示与加载工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */var
Tips = /*#__PURE__*/function () {
  function Tips() {_classCallCheck(this, Tips);
    this.isLoading = false;
  }
  /**
     * 弹出提示框
     */_createClass(Tips, null, [{ key: "success", value: function success(

    title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
      setTimeout(function () {
        uni.showToast({
          title: title,
          icon: "success",
          mask: true,
          duration: duration });

      }, 300);
      if (duration > 0) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve();
          }, duration);
        });
      }
    }

    /**
       * 弹出确认窗口
       */ }, { key: "confirm", value: function confirm(
    text, showCancel) {var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var title = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "提示";
      return new Promise(function (resolve, reject) {
        uni.showModal({
          title: title,
          content: text,
          showCancel: showCancel,
          success: function success(res) {
            if (res.confirm) {
              resolve(payload);
            } else if (res.cancel) {
              reject(payload);
            }
          },
          fail: function fail(res) {
            reject(payload);
          } });

      });
    } }, { key: "toast", value: function toast(

    title, onHide) {var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";
      setTimeout(function () {
        uni.showToast({
          title: title,
          icon: icon,
          mask: true,
          duration: 1000 });

      }, 300);

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
       * 警告框
       */ }, { key: "alert", value: function alert(
    title) {
      uni.showToast({
        title: title,
        image: "../../static/alert.png",
        mask: true,
        duration: 1500 });

    }

    /**
       * 错误框
       */ }, { key: "error", value: function error(

    title, onHide) {
      uni.showToast({
        title: title,
        image: "../../static/error.png",
        mask: true,
        duration: 1500 });

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
       * 弹出加载提示
       */ }, { key: "loading", value: function loading()
    {var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";
      if (Tips.isLoading) {
        return;
      }
      Tips.isLoading = true;
      uni.showLoading({
        title: title,
        mask: true });

    }

    /**
       * 加载完毕
       */ }, { key: "loaded", value: function loaded()
    {
      if (Tips.isLoading) {
        Tips.isLoading = false;
        uni.hideLoading();
      }
    } }]);return Tips;}();


/**
                            * 静态变量，是否加载中
                            */exports.default = Tips;
Tips.isLoading = false;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

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
 * (c) 2014-2021 Evan You
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
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
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
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
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
        if (Object({"VUE_APP_NAME":"高校毕业生信息去向跟踪系统","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_NAME":"高校毕业生信息去向跟踪系统","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"高校毕业生信息去向跟踪系统","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_NAME":"高校毕业生信息去向跟踪系统","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
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
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
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

/***/ 30:
/*!***************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/MinCache.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var cacheMap = new Map();
var timeoutDefault = 1200;

function isTimeout(name) {
  var data = cacheMap.get(name);
  if (!data) return true;
  if (data.timeout === 0) return false;
  var currentTime = Date.now();
  var overTime = (currentTime - data.createTime) / 1000;
  if (overTime > data.timeout) {
    cacheMap.delete(name);
    if (name.startsWith('_')) {
      try {
        uni.removeStorageSync(name);
      } catch (e) {
        console.log(e);
      }
    }
    return true;
  }
  return false;
}var

CacheCell =
function CacheCell(data, timeout) {_classCallCheck(this, CacheCell);
  this.data = data;
  this.timeout = timeout;
  this.createTime = Date.now();
};var


MinCache = /*#__PURE__*/function () {
  function MinCache(timeout) {_classCallCheck(this, MinCache);
    try {
      var res = uni.getStorageInfoSync();
      res.keys.forEach(function (name) {
        try {
          var value = uni.getStorageSync(name);
          cacheMap.set(name, value);
        } catch (e) {
          console.log(e);
        }
      });
    } catch (e) {
      console.log(e);
    }
    timeoutDefault = timeout;
  }_createClass(MinCache, [{ key: "set", value: function set(
    name, data) {var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : timeoutDefault;
      var cachecell = new CacheCell(data, timeout);
      var cache = null;
      if (name.startsWith('_')) {
        try {
          uni.setStorageSync(name, cachecell);
          cache = cacheMap.set(name, cachecell);
        } catch (e) {
          console.log(e);
        }
      } else {
        cache = cacheMap.set(name, cachecell);
      }
      return cache;
    } }, { key: "get", value: function get(
    name) {
      return isTimeout(name) ? null : cacheMap.get(name).data;
    } }, { key: "delete", value: function _delete(
    name) {
      var value = false;
      if (name.startsWith('_')) {
        try {
          uni.removeStorageSync(name);
          value = cacheMap.delete(name);
        } catch (e) {
          console.log(e);
        }
      } else {
        value = cacheMap.delete(name);
      }
      return value;
    } }, { key: "has", value: function has(
    name) {
      return !isTimeout(name);
    } }, { key: "clear", value: function clear()
    {
      var value = false;
      try {
        uni.clearStorageSync();
        cacheMap.clear();
        value = true;
      } catch (e) {
        console.log(e);
      }
      return value;
    } }]);return MinCache;}();


MinCache.install = function (Vue) {var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},_ref$timeout = _ref.timeout,timeout = _ref$timeout === void 0 ? 1200 : _ref$timeout;
  Vue.prototype.$cache = new MinCache(timeout);
};var _default =

MinCache;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!**************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/router/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _modules = _interopRequireDefault(__webpack_require__(/*! ./modules */ 32));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _index = _interopRequireDefault(__webpack_require__(/*! @/plugin/uni-simple-router/index.js */ 35));
var _constants = __webpack_require__(/*! @/common/util/constants.js */ 27);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_index.default);
//初始化
var router = new _index.default({
  encodeURI: true,
  routes: _toConsumableArray(_modules.default) //路由表
});

var whiteList = ['/pages/login/login'];
//全局路由前置守卫
router.beforeEach(function (to, from, next) {
  var token = uni.getStorageSync(_constants.ACCESS_TOKEN);
  if (token) {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next({ path: '/pages/login/login' });
    }
  }
});
// 全局路由后置守卫
router.afterEach(function (to, from) {
  console.log("afterEach");
});var _default =
router;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 318:
/*!*************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/vue-py.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constants = __webpack_require__(/*! ./constants.js */ 27);var _default =
{
  chineseToPinYin: function chineseToPinYin(l1) {
    var l2 = l1.length;
    var I1 = '';
    var reg = new RegExp('[a-zA-Z0-9]');
    for (var i = 0; i < l2; i++) {
      var val = l1.substr(i, 1);
      var name = this.arraySearch(val, _constants.pinyin);
      if (reg.test(val)) {
        I1 += val;
      } else if (name !== false) {
        I1 += name;
      }
    }
    I1 = I1.replace(/ /g, '-');
    while (I1.indexOf('--') > 0) {
      I1 = I1.replace('--', '-');
    }
    return I1;
  },
  arraySearch: function arraySearch(l1, l2) {
    for (var name in _constants.pinyin) {
      if (_constants.pinyin[name].indexOf(l1) !== -1) {
        return this.ucfirst(name);
      }
    }
    return false;
  },
  ucfirst: function ucfirst(l1) {
    if (l1.length > 0) {
      var first = l1.substr(0, 1).toUpperCase();
      var spare = l1.substr(1, l1.length);
      return first + spare;
    }
  } };exports.default = _default;

/***/ }),

/***/ 32:
/*!**********************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/router/modules/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var files = __webpack_require__(33);
var modules = [];

files.keys().forEach(function (key) {
  if (key === './index.js') return;
  var item = files(key).default;
  modules.push.apply(modules, _toConsumableArray(item));
});var _default =

modules;exports.default = _default;

/***/ }),

/***/ 33:
/*!*************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/router/modules sync nonrecursive \.js$ ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./index.js": 32,
	"./routes.js": 34
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 33;

/***/ }),

/***/ 34:
/*!***********************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/router/modules/routes.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var routes = [
{
  path: "/pages/login/login",
  name: 'login',
  meta: {
    title: '登录' } },


{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/index/index',
  name: 'index',
  meta: {
    title: '主页' } },


{
  //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
  path: '/pages/home/home',
  //aliasPath:'/',  //对于h5端你必须在首页加上aliasPath并设置为/
  name: 'home',
  meta: {
    title: '首页' } },


{
  path: '/pages/user/people',
  name: 'people',
  meta: {
    title: '个人中心' } },


{
  path: '/pages/user/userdetail',
  name: 'userdetail',
  meta: {
    title: '个人详情' } },


{
  path: '/pages/user/useredit',
  name: 'useredit',
  meta: {
    title: '个人编辑' } },


{
  path: '/pages/user/userexit',
  name: 'userexit',
  meta: {
    title: '退出' } },


{
  path: '/pages/user/location',
  name: 'location',
  meta: {
    title: '定位' } },


{
  path: '/pages/common/exit',
  name: 'exit',
  meta: {
    title: '退出' } },


{
  path: '/pages/common/success',
  name: 'success',
  meta: {
    title: 'success' } },

{
  path: '/pages/addressbook/address-book',
  name: 'addressBook',
  meta: {
    title: 'addressBook' } },


{
  path: '/pages/addressbook/level-address-book',
  name: 'levelAddressBook',
  meta: {
    title: 'levelAddressBook' } },


{
  path: '/pages/addressbook/member',
  name: 'member',
  meta: {
    title: 'member' } },


{
  path: '/pages/addressbook/address-detail',
  name: 'addressDetail',
  meta: {
    title: 'addressDetail' } },


{
  path: '/pages/annotation/annotationList',
  name: 'annotationList',
  meta: {
    title: '通知公告' } },


{
  path: '/pages/annotation/annotationDetail',
  name: 'annotationDetail',
  meta: {
    title: '通知详情' } },


{
  path: '/pages/common/helloWorld',
  name: 'helloWorld',
  meta: {
    title: 'helloWorld' } },


{
  path: '/pages/common/infoin',
  name: 'infoin',
  meta: {
    title: 'infoin' } },


{
  path: '/pages/common/message',
  name: 'message',
  meta: {
    title: 'message' } }];var _default =




routes;exports.default = _default;

/***/ }),

/***/ 349:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/components/mescroll-uni/mescroll-mixins.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // 非H5端无法通过mixin注册组件, 只能在main.js中注册全局组件或具体界面中注册
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调
    downCallback: function downCallback() {
      // mixin默认resetUpScroll
      this.mescroll.resetUpScroll();
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 35:
/*!*************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.RouterMount = exports.default = void 0;var _util = __webpack_require__(/*! ./helpers/util */ 36);
var _navJump = _interopRequireDefault(__webpack_require__(/*! ./helpers/navJump */ 40));
var _util2 = __webpack_require__(/*! ./vueRouter/util */ 49);
var _util3 = __webpack_require__(/*! ./appRouter/util */ 42);
var _util4 = __webpack_require__(/*! ./appletsRouter/util */ 45);
var _config = __webpack_require__(/*! ./helpers/config */ 37);
var _warn = __webpack_require__(/*! ./helpers/warn */ 39);
var _hooks = __webpack_require__(/*! ./lifeCycle/hooks */ 53);
var _base = __webpack_require__(/*! ./vueRouter/base */ 38);
var _appletsPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/applets-patch */ 54));
var _appPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/app-patch */ 55));
var _mixins = _interopRequireDefault(__webpack_require__(/*! ./helpers/mixins */ 56));
var _urlQuery = _interopRequireDefault(__webpack_require__(/*! ./helpers/urlQuery */ 60));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}




var H5PATCH = null;




var parseQuery = new _urlQuery.default();

_config.Global.H5RouterReady = new Promise(function (resolve) {return _config.Global.RouterReadyPromise = resolve;});var

Router = /*#__PURE__*/function () {
  function Router(arg) {_classCallCheck(this, Router);
    Router.$root = this;
    _config.Global.Router = this; // 全局缓存一个对象，不必使用时都传递
    _config.Global.$parseQuery = parseQuery;
    this.CONFIG = (0, _util.formatConfig)(arg);
    this.lifeCycle = _config.lifeCycle;
    _hooks.registerRouterHooks.call(this); // 注册全局Router生命钩子
    if ((0, _util.appPlatform)() === 'H5') {
      H5PATCH.setLoadingStatus(this.CONFIG.h5);
    }
  }_createClass(Router, [{ key: "push",




























    /** 动态的导航到一个新 URL 保留浏览历史
                                        * navigateTo
                                        * @param {Object} rule
                                        */value: function push(
    rule) {
      _navJump.default.call(this, rule, 'push');
    }

    /** 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
      * redirectTo
      * @param {Object} rule
      */ }, { key: "replace", value: function replace(
    rule) {
      _navJump.default.call(this, rule, 'replace');
    }

    /** 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
      * 	reLaunch
      * @param {Object} rule
      */ }, { key: "replaceAll", value: function replaceAll(
    rule) {
      _navJump.default.call(this, rule, 'replaceAll');
    }

    /** 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
      * @param {Object} rule
      */ }, { key: "pushTab", value: function pushTab(
    rule) {
      _navJump.default.call(this, rule, 'pushTab');
    }

    /**
      * 返回到指定层级页面上
       * @param {Number} backLayer 需要返回的页面层级 默认 1
       * @param {Object} delta 暂时无用
       * @param {enforce} 是否强制越过跳转加锁检查 默认 false
      */ }, { key: "back", value: function back()
    {var backLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;var delta = arguments.length > 1 ? arguments[1] : undefined;var enforce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (backLayer.constructor != Number) {
        return (0, _warn.err)("\u8FD4\u56DE\u5C42\u7EA7\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ANumber\u7C7B\u578B\u4E14\u5FC5\u987B\u5927\u4E8E1\uFF1A".concat(
        backLayer));

      }
      _navJump.default.call(this, {
        backLayer: backLayer, delta: delta, H5PATCH: H5PATCH },
      'back', true, enforce);
    }

    /**
      * 获取当前页面下的 Route 信息
      *
      * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
      */ }, { key: "getPageRoute", value: function getPageRoute(
    Vim) {
      var pages = getCurrentPages();
      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return _util2.H5GetPageRoute.call(this, pages, Vim);
        case 'APP':
          return (0, _util3.APPGetPageRoute)(pages, Vim);
        case 'APPLETS':
          return (0, _util4.AppletsPageRoute)(pages, Vim);
        default:
          break;}

    } }, { key: "beforeEach", value: function beforeEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.beforeHooks, fn);
    } }, { key: "afterEach", value: function afterEach(

    fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.afterHooks, fn);
    } }, { key: "$Route", get: function get() {return this.getPageRoute();} /**
                                                                             * 获取 url 参数帮助类实例
                                                                             */ }, { key: "$parseQuery", get: function get() {return _config.Global.$parseQuery;} /**
                                                                                                                                                                   * 获取当前是否处于正在跳转的状态
                                                                                                                                                                   * H5 状态下始终为false
                                                                                                                                                                   */ }, { key: "$lockStatus", get: function get() {return _config.Global.LockStatus;} /**
                                                                                                                                                                                                                                                        * 动态设置拦截状态
                                                                                                                                                                                                                                                        */, set: function set(status) {(0, _warn.warn)('你确定要这么做？你知道后果？', true);_config.Global.LockStatus = status;} }]);return Router;}();Router.install = function (Vue) {(0, _mixins.default)(Vue, Router);Object.defineProperty(Vue.prototype, '$Router', { get: function get() {return Router.$root;
    } });

  Object.defineProperty(Vue.prototype, '$Route', {
    get: function get() {
      return Router.$root.getPageRoute(this);
    } });

};var _default =
Router;
/**
         *
         * @param {VueComponent } Vim vue实例对象
         * @param {dom} el	dom节点选择器
         */exports.default = _default;
var RouterMount = function RouterMount(Vim, el) {
  switch ((0, _util.appPlatform)(true)) {
    case 'APP':
      (0, _appPatch.default)(Vim, el);
      break;
    case 'APPLETS':
      (0, _appletsPatch.default)(Vim, el);
      break;
    case 'H5':
      _base.vueMount.push({ Vim: Vim, el: el });
      break;
    default:
      (0, _warn.warn)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};exports.RouterMount = RouterMount;

/***/ }),

/***/ 36:
/*!********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/util.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.copyObject = exports.formatURLQuery = exports.resolveRule = exports.exactRule = exports.parseQuery = exports.parseQueryD = exports.parseQueryN = exports.filter = exports.formatConfig = exports.noop = exports.appPlatform = exports.isObject = exports.isH5 = void 0;var _config = __webpack_require__(/*! ./config */ 37);
var _base = __webpack_require__(/*! ../vueRouter/base */ 38);
var _warn = __webpack_require__(/*! ./warn */ 39);function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 当前是不是H5运行环境
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isH5 = function isH5() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};
/**
    * 判断当前变量是否为Object
    * @param {Object} strObj
    */exports.isH5 = isH5;
var isObject = function isObject(strObj) {
  return strObj.toString() === '[object Object]' && strObj.constructor === Object;
};
/**
    * 获取当前运行平台
    * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
    */exports.isObject = isObject;
var appPlatform = function appPlatform() {var applets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var platform = '';


























  platform = 'WEIXIN';






  if (applets) {

    platform = 'APPLETS';

  }

  return platform;
};
/**
    * 定义一个空方法 如果最后一个参数为true则打印所有参数
    * @param  {...any} args
    */exports.appPlatform = appPlatform;
var noop = function noop() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
  if (args[args.length - 1] === true) {
    (0, _warn.log)(args);
  }
};
/**
    * 格式化基础配置信息 通过new Router传递过来的参数
    */exports.noop = noop;
var formatConfig = function formatConfig(userConfig) {
  if (!userConfig.routes || userConfig.routes.constructor !== Array) {
    return (0, _warn.err)("\u8DEF\u7531\u53C2\u6570 'routes' \u5FC5\u987B\u4F20\u9012 \r\n\r\n".concat(JSON.stringify(userConfig)));
  }
  if (userConfig.h5 != null && userConfig.h5.constructor !== Object) {
    return (0, _warn.err)("h5\u53C2\u6570\u4F20\u9012\u9519\u8BEF\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 'Object' \u7C7B\u578B \u793A\u4F8B\uFF1A\r\n\r\n".concat(JSON.stringify(_config.baseConfig.h5)));
  }
  var config = Object.create(null);
  var baseConfigKeys = Object.keys(_config.baseConfig);
  for (var i = 0; i < baseConfigKeys.length; i += 1) {
    var key = baseConfigKeys[i];
    if (userConfig[key] != null) {
      if (userConfig[key].constructor === Object) {
        config[key] = _objectSpread(_objectSpread({},
        _config.baseConfig[key]),
        userConfig[key]);

      } else if (key == 'routes') {// 需要加入已知的白名单
        config[key] = [].concat(_toConsumableArray(_config.baseConfig[key]), _toConsumableArray(userConfig[key]), _toConsumableArray(_base.builtIn));
      } else {
        config[key] = userConfig[key];
      }
    } else {
      config[key] = _config.baseConfig[key];
    }
  }
  return config;
};exports.formatConfig = formatConfig;
var filter = function filter(str) {
  str += '';
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
};
/**
    * 使用encodeURI:true的情况	需要进行编码后再传递，解码等等 可以传递深度对象并会在路径后面加入一个query=
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.filter = filter;
var parseQueryN = function parseQueryN(routerName, query, Encode) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/, ''))) };

  }
  return {
    url: routerName,
    query: "query=".concat(encodeURIComponent(JSON.stringify(query))) };

};
/**
    * 使用encodeURI:false的情况 直接格式化为普通的queryURl参数形式传递即可 扁平深度对象
    *
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryN = parseQueryN;
var parseQueryD = function parseQueryD(routerName, query, Encode) {
  if (Encode) {
    var obj = {};
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return {
      url: routerName,
      query: obj };

  }
  var encodeArr = [];
  var queryKeys = Object.keys(query);
  for (var i = 0; i < queryKeys.length; i += 1) {
    var attr = queryKeys[i];
    var encodeStr = '';
    if (query[attr].constructor == Object) {
      encodeStr = parseQueryD(routerName, query[attr], Encode).query;
      encodeArr.push(encodeStr);
    } else {
      encodeStr = filter(query[attr]);
      encodeArr.push("".concat(attr, "=").concat(encodeStr));
    }
  }
  return {
    url: routerName,
    query: encodeArr.join('&') };

};
/**
    * @param {String} routerName //路径名称
    * @param {JSON} query 	//需要格式化参数
    * @param {Boolean} Encode 	//是获取还是编码后传递
    */exports.parseQueryD = parseQueryD;
var parseQuery = function parseQuery(routerName, query) {var Encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    return parseQueryN(routerName, query, Encode);
  }
  return parseQueryD(routerName, query, Encode);
};exports.parseQuery = parseQuery;

var exactRule = function exactRule(cloneRule, routes, ruleKey) {var getRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var params = {};
  var i = 0;
  // eslint-disable-next-line
  while (true) {
    var item = routes[i];
    if (item == null) {
      if (!getRule) {
        (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u672A\u67E5\u627E\u5230 '".concat(ruleKey, "' \u4E3A '").concat(cloneRule[ruleKey], "'"));
      }
      return {
        path: '',
        name: '' };

    }
    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item.path;
        params.rule = item;
        if (isH5()) {// 如果是h5 则使用优先使用自定义路径名称
          params.url = item.aliasPath || item.path;
        }
        return params;
      }
      return item;
    }
    i += 1;
  }
};exports.exactRule = exactRule;

var resolveRule = function resolveRule(router, rule) {var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var ruleKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'path';
  var ruleInfo = (0, _config.route)(
  exactRule(_objectSpread({},
  rule),

  router.CONFIG.routes,
  ruleKey,
  router));

  return _objectSpread(_objectSpread({},
  ruleInfo), {}, {
    query: query });

};
/**
    * 把一些不必要的参数进行格式化掉，完成url的美观
    * @param {String} URLQuery URL中传递的参数
    */exports.resolveRule = resolveRule;
var formatURLQuery = function formatURLQuery(URLQuery) {
  switch (URLQuery.trim()) {
    case 'query=%7B%7D':
    case '%7B%7D':
    case '?query=%7B%7D':
    case '?':
    case '?[object Object]':
    case '?query={}':
      URLQuery = '';
      break;
    default:
      (0, _warn.warn)('url已经很完美啦，不需要格式化！');
      break;}

  return URLQuery;
};
/**
    * 拷贝对象
    * @param {Object} object
    */exports.formatURLQuery = formatURLQuery;
var copyObject = function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
};exports.copyObject = copyObject;

/***/ }),

/***/ 37:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/config.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.route = exports.appletsConfig = exports.uniAppHook = exports.Global = exports.lifeCycle = exports.H5FnTypeToggle = exports.methods = exports.baseConfig = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var baseConfig = {
  h5: {
    rewriteFun: true, // 是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
    paramsToQuery: false, // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
    loading: true, // 是否显示加载动画
    hinderTab: false, // 是否拦截uni-app自带底部菜单   TODO
    vueRouterDev: false, // 完全使用采用vue-router的开发模式
    useUniConfig: true, // 是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
    keepUniIntercept: false, // 保留uni-app使用vue-router的拦截器
    vueNext: false, // 在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle: false, // 是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle: function resetStyle() {return JSON.parse('{}');}, // 自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: function scrollBehavior(to, from, savedPostion) {return savedPostion;},
    fallback: true },

  APP: {
    holdTabbar: true, // 是否开启底部菜单拦截
    loddingPageStyle: function loddingPageStyle() {return JSON.parse('{"backgroundColor":"#FFF"}');}, // 当前等待页面的样式 必须返回一个json
    loddingPageHook: function loddingPageHook(view) {plus.navigator.closeSplashscreen();view.show();}, // 刚刚打开页面处于等待状态,会触发此事件
    animation: { animationType: 'pop-in', animationDuration: 300 }, // 页面切换动画
    switchPageOutTime: 1000 // 最高能忍耐的页面切换时间 达到此时间 不管切换有没有完成都会显示页面出来 这对启动页帮助很大
  },
  debugger: false, // 是否处于开发阶段 设置为true则打印日志
  encodeURI: true, // 是否对url传递的参数进行编码
  routerBeforeEach: function routerBeforeEach() {}, // router 前置路由函数 每次触发跳转前先会触发此函数
  routerAfterEach: function routerAfterEach() {}, // router 后置路由函数 每次触发跳转后会触发此函数
  routes: [] };exports.baseConfig = baseConfig;


var methods = {
  push: 'navigateTo',
  replace: 'redirectTo',
  replaceAll: 'reLaunch',
  pushTab: 'switchTab',
  back: 'navigateBack' };exports.methods = methods;


var H5FnTypeToggle = {
  push: 'push',
  replace: 'replace',
  replaceAll: 'replace',
  pushTab: 'replace' };exports.H5FnTypeToggle = H5FnTypeToggle;


var lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks: [], // 内部跳转前生命周期
  routerAfterHooks: [] // 内部跳转后生命周期
};exports.lifeCycle = lifeCycle;

var Global = { // 缓存一些必要的对象，作为全局可以访问的参数
  $parseQuery: null, // url query 帮助类实例
  Router: {},
  vueRouter: {},
  addedRoutes: [], // 用于缓存用户动态添加的路由
  RouterReadyPromise: function RouterReadyPromise() {},
  H5RouterReady: null, // 当前router是否就绪
  backLayerC: 1, // 返回api调用时开发者传递的 delta
  LockStatus: false // 当前是否正在进行跳转 正在跳转调用api是不给跳转的
};exports.Global = Global;

var uniAppHook = {
  indexVue: {}, // 首页 组件对象
  toutiaoIndexThis: {}, // 头条小程序Index this对象
  appVue: {}, // 同getApp()获取到的对象一毛一样的  其实就是app.vue组件
  onLaunch: { fun: [], args: {}, isHijack: false }, // 这两个是app.vue
  onShow: { fun: [], args: {}, isHijack: false },
  variationFuns: ['onReady', 'onUnload'], // 一些uni-app的变异方法 需要处理下
  waitHooks: {}, // 首页等待中的生命钩子 一些需要等待的Hooks,就是在页面没有进来之前一些提前触发的生命钩子 主要是用户已经声明好的
  indexCallHooks: ['onLoad', 'onReady', 'created', 'onShow'], // 在首页首次启动时需要触发的生命周期
  needHooks: ['onLoad', 'onReady', 'onShow', 'created', 'onHide', 'onUnload', 'onResize'], // 首页需要拦截的生命钩子
  pageReady: false,
  onLaunched: false // 否触发onLaunch事件
};exports.uniAppHook = uniAppHook;

var appletsConfig = { // 小程序端的一些路由所需配置
  onLaunchEd: false // 当前小程序端是否触发onLaunch事件
};exports.appletsConfig = appletsConfig;

var route = function route() {var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread(_objectSpread({},
  object), {}, {
    params: {},
    query: {} });

};exports.route = route;

/***/ }),

/***/ 38:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/base.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.vueMount = exports.vuelifeHooks = exports.builtIn = void 0;var builtIn = [{
  path: '/preview-image',
  name: 'previewImage',
  component: {
    render: function render() {} } },

{
  path: '/choose-location',
  name: 'chooseLocation',
  component: {
    render: function render() {} } },

{
  path: '/open-location',
  name: 'openLocation',
  component: {
    render: function render() {} } }];

// uni-app内置路由
exports.builtIn = builtIn;var vuelifeHooks = { // vueRouter的原始生命周期
  beforeHooks: [],
  afterHooks: [] };exports.vuelifeHooks = vuelifeHooks;

var vueMount = []; // 使用内部对象保留实例化下的appVue,并使用Router进行挂载触发第一次路由钩子
exports.vueMount = vueMount;

/***/ }),

/***/ 39:
/*!********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/warn.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.warnLock = exports.log = exports.warn = exports.err = void 0;var _config = __webpack_require__(/*! ./config */ 37);


var isLog = function isLog(type, errText, enforce) {
  if (!enforce) {
    var dev = _config.Global.Router.CONFIG.debugger;
    var isObject = dev.toString() === '[object Object]';
    if (dev === false) {
      return false;
    }if (dev === false) {
      return false;
    }if (isObject) {
      if (dev[type] === false) {
        return false;
      }
    }
  }
  /* eslint no-console:"off" */
  console[type](errText);
};
var err = function err(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('error', errInfo, enforce);
};exports.err = err;

var warn = function warn(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('warn', errInfo, enforce);
};exports.warn = warn;

var log = function log(errInfo) {var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('log', errInfo, enforce);
};exports.log = log;
var warnLock = function warnLock(errInfo) {
  console.warn(errInfo);
};exports.warnLock = warnLock;

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
/*!***********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/navJump.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _util = __webpack_require__(/*! ./util */ 36);
var _config = __webpack_require__(/*! ./config */ 37);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 41);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 44);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ../appRouter/uniNav */ 43));
var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/appletsNav */ 47));
var _warn = __webpack_require__(/*! ./warn */ 39);
var _routerNav = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/routerNav */ 48));
var compile = _interopRequireWildcard(__webpack_require__(/*! ./compile */ 46));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * 返回api 触发的公共函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {Object/String} rule  当前跳转规则
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * @param {String} fnType    跳转页面的类型方法
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 * this 为当前 Router 实例
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 */
var isBcakNav = function isBcakNav(_ref)



{var _this = this;var backLayer = _ref.backLayer,delta = _ref.delta,H5PATCH = _ref.H5PATCH;
  compile.H5(function () {
    H5PATCH.on('historyBack', {
      backLayer: backLayer,
      delta: delta });

  });
  compile.APP(function () {
    _config.Global.backLayerC = backLayer; // 告诉路由需要返回几层
    uni.navigateBack({
      delta: backLayer,
      complete: function complete() {
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
  compile.mp(function () {
    _hooks2.backCallHook.call(_this, backLayer, function () {
      uni.navigateBack({
        delta: backLayer });

    });
  });
};

/**
    * 非 返回api 触发的公共函数
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    *
    * this 为当前 Router 实例
    */

var notBackNav = function notBackNav(rule, fnType) {
  if (rule == null) {
    return (0, _warn.err)('跳转规则为空，不允许这样操作');
  }
  if (rule.constructor === String) {// 单独 path 的情况   允许？拼接参数
    var ruleArray = rule.split('?');
    if (ruleArray.length > 1) {
      rule = {
        path: ruleArray[0],
        query: _config.Global.$parseQuery.parse(ruleArray[1]) };

    }
  }
  switch ((0, _util.appPlatform)(true)) {
    case 'H5':
      return _routerNav.default.call(this, _config.H5FnTypeToggle[fnType], rule, _config.methods[fnType]);
    case 'APP':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks.transitionTo.call(this, rule, fnType, _uniNav.default);
    case 'APPLETS':
      _config.Global.LockStatus = true; // 设置为锁住状态
      return _hooks2.appletsTransitionTo.call(this, rule, fnType, _appletsNav.default);
    default:
      (0, _warn.err)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;}

};

/**
    * 处理正在跳转的公共api
    * @param {Object/String} rule  当前跳转规则
    * @param {String} fnType    跳转页面的类型方法
    * @param {Boolean} isBack  是否通过 back() api 调用的 默认为false
    * @param {Boolean} enforce 是否强制越过跳转加锁检查 默认false  目前只有back() api 传递了
    *
    * this 为当前 Router 实例
    */
var navjump = function navjump(rule, fnType) {var isBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var enforce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (_config.Global.LockStatus && !enforce) {// 正在跳转的状态下 给出提示正在跳转
    return (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
  }
  if (isBack) {// 是返回api触发的
    return isBcakNav.call(this, rule, fnType);
  }
  return notBackNav.call(this, rule, fnType);
};var _default =

navjump;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!***********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appRouter/hooks.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.beforeTabHooks = exports.triggerLifeCycle = exports.transitionTo = exports.backApiCallHook = exports.beforeBackHooks = exports.proxyIndexHook = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ./util */ 42);


var _util2 = __webpack_require__(/*! ../helpers/util */ 36);
var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _uniNav = _interopRequireDefault(__webpack_require__(/*! ./uniNav */ 43));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var startBack = false; // 主要是兼容低端手机返回卡 然后多次返回直接提示退出的问题

/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
 * @param {Boolean} callHome // 是否触发首页的生命周期
 *
 * this 为当前 page 对象
 */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              _loop = function _loop(_key) {// 还原 首页下的生命钩子
                var item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    var indeHooks = indexVue[_key];
                    // 修复 https://github.com/SilurianYang/uni-simple-router/issues/76
                    setTimeout(function () {// 异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }};for (_key in waitHooks) {_loop(_key);
              }
              resolve(variation);case 12:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};

/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var proxyIndexHook = function proxyIndexHook(Router) {var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  // eslint-disable-next-line
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyIndexHook = proxyIndexHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    * 触发返回事件公共方法
    * @param {Object} page	用getPages获取到的页面栈对象
    * @param {Object} options 	当前vue页面对象
    * @param {Object} backLayerC	需要返回页面的层级
      *
    * this 为当前 Router 对象
    */
var backCallHook = function backCallHook(page, options) {var _this5 = this;var backLayerC = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var route = (0, _util.APPGetPageRoute)([page]);
  var NAVTYPE = 'RouterBack';
  // eslint-disable-next-line
  transitionTo.call(this, { path: route.path, query: route.query }, NAVTYPE, function (finalRoute, fnType) {
    if (fnType != NAVTYPE) {// 返回时的api如果有next到其他页面 那么必须带上NAVTYPE  不相同则表示需要跳转到其他页面
      return (0, _uniNav.default)(finalRoute, fnType);
    }
    if (startBack) {// 如果当前处于正在返回的状态
      return (0, _warn.warn)('当前处于正在返回的状态，请稍后再试！');
    }
    startBack = true; // 标记开始返回
    options.onBackPress = [_util2.noop]; // 改回uni-app可执行的状态
    setTimeout(function () {
      _this5.back(backLayerC, undefined, true); // 越过加锁验证
      startBack = false; // 返回结束
    });
  });
};
/**
    * 处理返回按钮的生命钩子
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    *
    * this 为当前 Router 对象
    */
var beforeBackHooks = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(options, args) {var isNext, page;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:isNext = _context4.sent;if (!(
            isNext === false)) {_context4.next = 6;break;} // onBeforeBack  返回了true 阻止了跳转
            _config.Global.LockStatus = false; // 也需要解锁
            return _context4.abrupt("return", false);case 6:

            page = (0, _util.getPages)(-3); // 上一个页面对象
            backCallHook.call(this, page, options);case 8:case "end":return _context4.stop();}}}, _callee4, this);}));return function beforeBackHooks(_x4, _x5) {return _ref4.apply(this, arguments);};}();

/**
                                                                                                                                                                                                             * 处理back api的生命钩子
                                                                                                                                                                                                             * @param {Object} options 当前 vue 组件对象下的$options对象
                                                                                                                                                                                                             * @param {Array} args  当前页面是点击头部返回还是底部返回
                                                                                                                                                                                                             *
                                                                                                                                                                                                             * this 为当前 Router 对象
                                                                                                                                                                                                             */exports.beforeBackHooks = beforeBackHooks;
var backApiCallHook = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(options, args) {var backLayerC, pages, page;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _util.getPageOnBeforeBack)(args));case 2:
            backLayerC = _config.Global.backLayerC;
            pages = (0, _util.getPages)();
            page = null;
            if (backLayerC > pages.length - 1 || backLayerC == pages.length - 1) {// 返回的首页 我们需要显示tabbar拦截
              // eslint-disable-next-line
              page = pages[0];
            } else {
              page = pages[pages.length - 2];
            }
            backCallHook.call(this, page, options, backLayerC);case 7:case "end":return _context5.stop();}}}, _callee5, this);}));return function backApiCallHook(_x6, _x7) {return _ref5.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                         *  v1.5.4+
                                                                                                                                                                                                                         * beforeRouteLeave 生命周期
                                                                                                                                                                                                                         * @param {Object} to       将要去的那个页面 to对象
                                                                                                                                                                                                                         * @param {Object} from     从那个页面触发的 from对象
                                                                                                                                                                                                                         *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
                                                                                                                                                                                                                         * this 为当前 Router 对象
                                                                                                                                                                                                                         */exports.backApiCallHook = backApiCallHook;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise(function (resolve) {
    if (leaveHook) {// 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
      (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');
      return resolve();
    }
    if (from.path == to.path) {// 进入首页的时候不触发
      return resolve();
    }
    var currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
    var callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
    var beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
    if (beforeRouteLeave == null) {
      (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');
      return resolve();
    }
    if (beforeRouteLeave != null && beforeRouteLeave.constructor !== Function) {
      (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');
      return resolve();
    }
    beforeRouteLeave.call(callThis, to, from, resolve); // 执行生命钩子
  });
};

/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      // eslint-disable-next-line
      return transitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};
/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    *
    * this 为当前 Router 对象
    */
var transitionTo = /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args6 = arguments;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:leaveHook = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;_context6.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context6.prev = 6;_context6.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context6.sent;_context6.next = 12;return (
              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context6.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context6.sent;_context6.next = 17;return (
              isNext.call(this, beforeResult, fnType, navCB));case 17:_context6.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context6.sent;_context6.next = 22;return (
              isNext.call(this, enterResult, fnType, navCB));case 22:_context6.next = 28;break;case 24:_context6.prev = 24;_context6.t0 = _context6["catch"](6);

            (0, _warn.warn)(_context6.t0); // 打印开发者操作的日志
            return _context6.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context6.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context6.stop();}}}, _callee6, this, [[6, 24]]);}));return function transitionTo(_x8, _x9, _x10) {return _ref6.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                                      * 主动触发导航守卫
                                                                                                                                                                                                                                      * @param {Object} Router 当前路由对象
                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                      * this  当前vue页面组件对象
                                                                                                                                                                                                                                      */exports.transitionTo = transitionTo;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this7 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  transitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path)) {_context7.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context7.next = 5;return callwaitHooks.call(_this7, true);case 5:_context7.next = 12;break;case 7:_context7.next = 9;return (

                callwaitHooks.call(_this7, false));case 9:variation = _context7.sent;_context7.next = 12;return (
                (0, _uniNav.default)(finalRoute, fnType));case 12:

              plus.nativeObj.View.getViewById('router-loadding').close();
              callVariationHooks(variation);
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
            case 15:case "end":return _context7.stop();}}}, _callee7);}));return function (_x11, _x12) {return _ref7.apply(this, arguments);};}());
};

/**
    * 处理tabbar点击拦截事件
    * @param {Object} path 当前需要跳转的tab页面路径
    *
    * this 为当前 Router 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var beforeTabHooks = function beforeTabHooks(path) {
  transitionTo.call(this, { path: "/".concat(path), query: {} }, 'pushTab', function (finalRoute, fnType) {
    (0, _uniNav.default)(finalRoute, fnType);
  });
};exports.beforeTabHooks = beforeTabHooks;

/***/ }),

/***/ 42:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appRouter/util.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.assertCanBack = exports.getPageOnBeforeBack = exports.APPGetPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.getFormatQuery = exports.pathOrNameToRoute = exports.formatTo = exports.getPageVmOrMp = exports.isNvuePage = exports.getPages = exports.callAppHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _util = __webpack_require__(/*! ../helpers/util */ 36);
var _config = __webpack_require__(/*! ../helpers/config */ 37);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 触发指定生命钩子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Array} funList	//需要执行的方法列表
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * @param {Object} args //触发生命钩子传递的参数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */
var callAppHook = function callAppHook() {var funList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var args = arguments.length > 1 ? arguments[1] : undefined;
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.callAppHook = callAppHook;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 验证当前页面是否为nvue页面
    * @param {Object} page 当前页面对象
    */exports.getPages = getPages;
var isNvuePage = function isNvuePage(page) {
  var cstr = page.constructor.name;
  var pageType = {
    s: true,
    z: false };

  return pageType[cstr];
};

/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.isNvuePage = isNvuePage;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }
  if (page.$vm.$mp) {
    return page.$vm.$mp;
  }
  if (isNvuePage(page)) {// nvue 页面
    return {
      page: page,
      query: page.__displayReporter.query };

  }
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.getPageVmOrMp = getPageVmOrMp;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (_config.Global.Router.CONFIG.encodeURI) {
    try {
      query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
    } catch (e) {
      query = JSON.parse(query.query);
    }
  }
  return query;
};
/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.getFormatQuery = getFormatQuery;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};
/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {},animation = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
    animation = rule.animation || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  animation = _objectSpread(_objectSpread(_objectSpread({}, _config.Global.Router.CONFIG.APP.animation), route.animation || {}), animation); // 合并多种方式声明的动画效果
  route.animation = animation; // 这才是最终的页面切换效果
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var APPGetPageRoute = function APPGetPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    query = getFormatQuery(page.options, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};
/**
    * 获取当前页面下的 onBeforeBack 生命周期并执行
    *
    * @param {Object} args 当前返回页面时uni-app传递的参数
    */exports.APPGetPageRoute = APPGetPageRoute;
var getPageOnBeforeBack = function getPageOnBeforeBack(args) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var currPage, onBeforeBack, isNext;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              currPage = getPages(-2); // 获取到当前页面
              onBeforeBack = currPage.$vm.$options.onBeforeBack;if (!(
              onBeforeBack != null && onBeforeBack.constructor === Function)) {_context.next = 8;break;}_context.next = 5;return (
                onBeforeBack.call(currPage.$vm, args));case 5:isNext = _context.sent;if (!(
              isNext === true)) {_context.next = 8;break;}return _context.abrupt("return",
              resolve(false));case 8:return _context.abrupt("return",


              resolve(true));case 9:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 断言当前页面是否可返回上一级
    * @param {Object} page 当前页面webview对象
    */exports.getPageOnBeforeBack = getPageOnBeforeBack;
var assertCanBack = function assertCanBack(page) {
  var pageStyle = page.$getAppWebview().getStyle();
  if (pageStyle.titleNView != null && pageStyle.titleNView.autoBackButton) {// 只有处理有带返回按钮的页面
    return true;
  }
  // 两种情况 1.真的是顶级页面时  2.自定义头部
  var $page = page.$page;
  if ($page && $page.meta.isQuit === false) {// 自定义头部 不是顶级页面
    return true;
  }
  return false; // 不可返回 真的是顶级页面时 返回就直接退出app了
};exports.assertCanBack = assertCanBack;

/***/ }),

/***/ 422:
/*!*******************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/components/mescroll-uni/mescroll-uni.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.2.5
                                                                                                        * 2020-03-15 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.2.5'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    setTimeout(function () {// 延时确保先执行down的callback,再执行up的callback,因为部分小程序emit是异步,会导致isUpAutoLoad判断有误
      me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
    }, 100);
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 80, // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 9990, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* 简单判断是否配置了颜色 (非透明,非白色) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {




  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    if (!me.moveTimeDiff) me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var angle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }




      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.optDown.showLoading && this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
  }
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    !me.isScrollBody && me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};

/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束下拉刷新
  if (me.isDownScrolling) me.endDownScroll();

  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {




































































};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 423:
/*!**************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/components/mescroll-uni/mescroll-uni-option.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- END --', // 没有更多数据的提示文本
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 暂无相关数据 ~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 43:
/*!************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appRouter/uniNav.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ../helpers/util */ 36);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var stop = null;

/**
                  * @param {Object} finalRoute 格式化后的路由跳转规则
                  * @param {Object} NAVTYPE 需要调用的跳转方法
                  */
var uniPushTo = function uniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    APP = _config.baseConfig.APP;var
    url = finalRoute.uniRoute.url;
    stop = setTimeout(function () {
      resolve(url);
      resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
      _config.Global.LockStatus = false; // 跳转完成解锁状态
    }, APP.switchPageOutTime);

    uni[_config.methods[NAVTYPE]](_objectSpread(_objectSpread({
      url: url + query },
    finalRoute.route.animation), {}, {
      complete: function complete() {
        clearTimeout(stop);
        resolve(url);
        resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } }),
    true); // 这里传递true 主要是兼容重写 uni.switchTab
  });
};var _default =

uniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 44:
/*!***************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appletsRouter/hooks.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.appletsProxyIndexHook = exports.triggerLifeCycle = exports.backCallHook = exports.appletsTransitionTo = exports.proxyLaunchHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ./util */ 45);


var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ./appletsNav */ 47));
var _util2 = __webpack_require__(/*! ../helpers/util */ 36);
var _warn = __webpack_require__(/*! ../helpers/warn */ 39);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {String} key
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        * @param {Function} hook 需要执行及还原的生命周期函数
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        */
var toutiaoIndexHookCall = function toutiaoIndexHookCall(key, hook) {var
  indexVue = _config.uniAppHook.indexVue;
  var indeHooks = indexVue[key];
  indeHooks.splice(indeHooks.length - 1, 1, hook);
};

/**
    * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
    * @param {Boolean} callHome // 是否触发首页的生命周期
    *
    * this 为当前 page 对象
    */
var callwaitHooks = function callwaitHooks(callHome) {var _this = this;
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {var variation, appVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _key, item;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue =
              _config.uniAppHook.appVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;_context.next = 5;return (
                onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args));case 5: // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个
              if (callHome) {// 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {// 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }
              if (onLaunch.isHijack) {// 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }
              if (onShow.isHijack) {// 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              }
              // eslint-disable-next-line
              for (_key in waitHooks) {// 还原 首页下的生命钩子
                item = waitHooks[_key];
                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {// 变异方法
                    variation.push({ key: _key, fun: item.fun[0] });
                  } else {
                    toutiaoIndexHookCall(_key, item.fun[0]);
                  }
                }
              }
              resolve(variation);case 11:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * 还原剩下的奇葩生命钩子
    * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
    */
var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {var _variation$i =
    variation[i],key = _variation$i.key,fun = _variation$i.fun;
    toutiaoIndexHookCall(key, fun);
  }
};

/**
    * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
    *
    * this 为当前 page 对象
    */
var proxyLaunchHook = function proxyLaunchHook() {var _this2 = this;var _this$$options =



  this.$options,onLaunch = _this$$options.onLaunch,onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象
  if (onLaunch.length > 1) {// 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }
  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;
      if (_config.uniAppHook.pageReady) {// 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};
/**
    * 触发全局beforeHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */exports.proxyLaunchHook = proxyLaunchHook;
var beforeHooks = function beforeHooks(_from, _to) {var _this3 = this;
  return new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var beforeHooksFun;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];if (!(
              beforeHooksFun == null)) {_context2.next = 3;break;}return _context2.abrupt("return",
              resolve());case 3:_context2.next = 5;return (

                beforeHooksFun.call(_this3, _to, _from, resolve));case 5:case "end":return _context2.stop();}}}, _callee2);}));return function (_x2) {return _ref2.apply(this, arguments);};}());

};
/**
    * 触发全局afterEachHooks 生命钩子
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];
  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
    * 触发全局 beforeEnter 生命钩子
    * @param {Object} finalRoute 	// 当前格式化后的路由参数
    * @param {Object} _from // from  参数
    * @param {Object} _to  // to 参数
    *
    * this 为当前 Router 对象
    */
var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {var _this4 = this;
  return new Promise( /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {var beforeEnter;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
              beforeEnter = finalRoute.route.beforeEnter;if (!(
              beforeEnter == null || beforeEnter.constructor !== Function)) {_context3.next = 3;break;}return _context3.abrupt("return",
              resolve());case 3:_context3.next = 5;return (

                beforeEnter.call(_this4, _to, _from, resolve));case 5:case "end":return _context3.stop();}}}, _callee3);}));return function (_x3) {return _ref3.apply(this, arguments);};}());

};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 to对象
    * @param {Object} from     从那个页面触发的 from对象
    *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    */
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {var currentPage, callThis, beforeRouteLeave;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:if (!
              leaveHook) {_context4.next = 3;break;} // 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
              (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');return _context4.abrupt("return",
              resolve());case 3:if (!(

              from.path == to.path)) {_context4.next = 5;break;}return _context4.abrupt("return",
              resolve());case 5:

              currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象
              callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象
              beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明
              if (!(beforeRouteLeave == null)) {_context4.next = 11;break;}
              (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');return _context4.abrupt("return",
              resolve());case 11:if (!(

              beforeRouteLeave != null && beforeRouteLeave.constructor !== Function)) {_context4.next = 14;break;}
              (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');return _context4.abrupt("return",
              resolve());case 14:_context4.next = 16;return (

                beforeRouteLeave.call(callThis, to, from, resolve));case 16:case "end":return _context4.stop();}}}, _callee4);}));return function (_x4) {return _ref4.apply(this, arguments);};}());

};

/**
    * 核心方法 处理一系列的跳转配置
    * @param {Object} rule 当前跳转规则
    * @param {Object} fnType 跳转页面的类型方法
    * @param {Object} navCB:? 回调函数
    * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
    * this 为当前 Router 对象
    *
    */
var appletsTransitionTo = /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(rule, fnType, navCB) {var leaveHook,finalRoute,_from,_to,leaveResult,beforeResult,enterResult,_args5 = arguments;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:leaveHook = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;_context5.next = 3;return (
              this.lifeCycle.routerbeforeHooks[0].call(this));case 3: // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象
            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据
            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据
            _context5.prev = 6;_context5.next = 9;return (
              beforeRouteLeaveHooks.call(this, _from, _to, leaveHook));case 9:leaveResult = _context5.sent;_context5.next = 12;return (

              isNext.call(this, leaveResult, fnType, navCB, true));case 12:_context5.next = 14;return (

              beforeHooks.call(this, _from, _to));case 14:beforeResult = _context5.sent;_context5.next = 17;return (

              isNext.call(this, beforeResult, fnType, navCB));case 17:_context5.next = 19;return (

              beforeEnterHooks.call(this, finalRoute, _from, _to));case 19:enterResult = _context5.sent;_context5.next = 22;return (

              isNext.call(this, enterResult, fnType, navCB));case 22:_context5.next = 28;break;case 24:_context5.prev = 24;_context5.t0 = _context5["catch"](6);

            (0, _warn.warn)(_context5.t0); // 打印开发者操作的日志
            return _context5.abrupt("return", false);case 28:

            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }
            afterEachHooks.call(this, _from, _to);_context5.next = 32;return (
              this.lifeCycle.routerAfterHooks[0].call(this));case 32:case "end":return _context5.stop();}}}, _callee5, this, [[6, 24]]);}));return function appletsTransitionTo(_x5, _x6, _x7) {return _ref5.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                            * 触发全局 返回事件
                                                                                                                                                                                                                                            * @param {Number} backLayer 需要返回的页面层级
                                                                                                                                                                                                                                            * @param {Function} next 正真的回调函数
                                                                                                                                                                                                                                            *
                                                                                                                                                                                                                                            * this 为当前 Router 对象
                                                                                                                                                                                                                                            */exports.appletsTransitionTo = appletsTransitionTo;
var backCallHook = function backCallHook(backLayer, next) {
  var pages = (0, _util.getPages)(); // 获取到全部的页面对象
  var toPage = pages.reverse()[backLayer];
  if (toPage == null) {// 没有匹配到的时候
    return (0, _warn.warn)('亲爱的开发者，你确定页面栈中有这么多历史记录给你返回？');
  }var _getPageVmOrMp =
  (0, _util.getPageVmOrMp)(toPage, false),query = _getPageVmOrMp.query,page = _getPageVmOrMp.page;
  var beforeFntype = 'RouterBack';
  appletsTransitionTo.call(this, { path: page.route, query: query }, beforeFntype, function (finalRoute, fnType) {
    var toPath = finalRoute.uniRoute.url;
    if ("/".concat(page.route) == toPath || page.route == toPath) {// 直接调用返回api
      next();
    } else {// 有拦截到其他页面时
      if (fnType == beforeFntype) {
        return (0, _warn.warn)('调用返回api被拦截到其他页面需要指定合理的 ‘NAVTYPE’ ');
      }
      (0, _appletsNav.default)(finalRoute, fnType);
    }
  });
};

/**
    * 主动触发导航守卫
    * @param {Object} Router 当前路由对象
    *
    */exports.backCallHook = backCallHook;
var triggerLifeCycle = function triggerLifeCycle(Router) {var _this5 = this;
  var topPage = getCurrentPages()[0];
  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }var _getPageVmOrMp2 =
  (0, _util.getPageVmOrMp)(topPage, false),query = _getPageVmOrMp2.query,page = _getPageVmOrMp2.page;
  appletsTransitionTo.call(Router, { path: page.route, query: query }, 'push', /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(finalRoute, fnType) {var variation;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
              variation = [];if (!(
              "/".concat(page.route) == finalRoute.route.path || page.route == finalRoute.route.path)) {_context6.next = 7;break;} // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              _context6.next = 5;return callwaitHooks.call(_this5, true);case 5:_context6.next = 12;break;case 7:_context6.next = 9;return (

                callwaitHooks.call(_this5, false));case 9:variation = _context6.sent;_context6.next = 12;return (
                (0, _appletsNav.default)(finalRoute, fnType));case 12:

              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞
              callVariationHooks(variation);case 14:case "end":return _context6.stop();}}}, _callee6);}));return function (_x8, _x9) {return _ref6.apply(this, arguments);};}());

};
/**
    * 把指定页面的生命钩子函数保存并替换
    * this 为当前 page 对象
    */exports.triggerLifeCycle = triggerLifeCycle;
var appletsProxyIndexHook = function appletsProxyIndexHook(Router) {
  if (false) {}var
  needHooks = _config.uniAppHook.needHooks,waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;
  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];
    if (options[key] != null) {// 只劫持开发者声明的生命周期
      var length = options[key].length;
      // eslint-disable-next-line
      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
      whObject.isHijack = true;
    }
  }
  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
    * 验证当前 next() 管道函数是否支持下一步
    *
    * @param {Object} Intercept 拦截到的新路由规则
    * @param {Object} fnType 跳转页面的类型方法 原始的
    * @param {Object} navCB 回调函数 原始的
    * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
    * this 为当前 Router 对象
    *
    */exports.appletsProxyIndexHook = appletsProxyIndexHook;
var isNext = function isNext(Intercept, fnType, navCB) {var _this6 = this;var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {// 什么也不做 直接执行下一个钩子
      return resolve();
    }
    if (Intercept === false) {// 路由中断 我们需要把防抖设置为false
      _config.Global.LockStatus = false; // 解锁跳转状态
      return reject('路由终止');
    }
    if (Intercept.constructor === String) {// 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }
    if (Intercept.constructor === Object) {// 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};

/***/ }),

/***/ 45:
/*!**************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appletsRouter/util.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.AppletsPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.formatTo = exports.pathOrNameToRoute = exports.getPages = exports.getFormatQuery = exports.getPageVmOrMp = exports.callAppHook = void 0;var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ../helpers/util */ 36);
var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _compile = __webpack_require__(/*! ../helpers/compile */ 46);
/**
                                               * 触发指定生命钩子
                                               * @param {Array} funList	//需要执行的方法列表
                                               * @param {Object} args //触发生命钩子传递的参数
                                               */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
    * @param {Object} page //当前顶级页面对象
    * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
    */exports.callAppHook = callAppHook;
var getPageVmOrMp = function getPageVmOrMp(page) {var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (vim) {
    return page.$vm;
  }var
  $mp = page.$vm.$mp;
  (0, _compile.baiduApple)(function () {// 百度小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  (0, _compile.touTiao)(function () {// 头条小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  return $mp;
};
/**
    * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
    *
    * @param {Object} query 当前的路由参数
    * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
    */exports.getPageVmOrMp = getPageVmOrMp;
var getFormatQuery = function getFormatQuery() {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_config.Global.Router.CONFIG.encodeURI) {
    if (getter) {
      try {// 除去微信小程序都不需要 decodeURIComponent
        query = JSON.parse(decodeURIComponent(query.query) || '{}');
      } catch (e) {// 其他小程序
        query = JSON.parse(query.query || '{}');
      }
    } else {
      try {
        query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(query.query);
      }
    }
  }
  return query;
};
/**
    * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
    * @param {Boolean} all //是否获取全部的页面
    */exports.getFormatQuery = getFormatQuery;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  if (index === -1) {
    return pages;
  }
  if (index === -2) {
    return pages[pages.length - 1];
  }
  if (index === -3) {
    return pages[pages.length - 2];
  }
  return pages[index];
};
/**
    * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
    * @param {string} type   //path 或者 name
    * @param {Object} routes //当前对象的所有路由表
    */exports.getPages = getPages;
var pathOrNameToRoute = function pathOrNameToRoute(type) {var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }
  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};

/**
    * 获取 to 的配置参数
    * @param {Object} rule 当前跳转的规则
    */exports.pathOrNameToRoute = pathOrNameToRoute;
var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);var
  rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};

/**
    * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
    *
    * @param {Object} routes //当前对象的所有路由表
    */exports.formatTo = formatTo;
var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);var _getPageVmOrMp =
  getPageVmOrMp(topPage, false),page = _getPageVmOrMp.page,query = _getPageVmOrMp.query;
  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route
  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
  return route;
};

/**
    *
    * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
    *
    * @param {Object} rule  //当前用户跳转的路由规则
    * @param {Object} routes //当前simple-router 下的路由表
    */exports.formatFrom = formatFrom;
var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  }
  // eslint-disable-next-line
  var navType = 'path',route = null,query = {};
  if (rule.constructor === String) {// 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {// 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理
    query = rule.query || rule.params || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }
  // 路径处理完后   开始格式化参数
  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则
  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute };

};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.ruleToUniNavInfo = ruleToUniNavInfo;
var AppletsPageRoute = function AppletsPageRoute(pages, Vim) {var
  query = {},path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面
  if (pages.length > 0) {
    var uniQuery = getPageVmOrMp(page, false).query;
    query = getFormatQuery(uniQuery, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }
  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};exports.AppletsPageRoute = AppletsPageRoute;

/***/ }),

/***/ 46:
/*!***********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/compile.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.mp = exports.touTiao = exports.baiduApple = exports.notH5 = exports.applets = exports.APP = exports.H5 = void 0;var H5 = function H5(fn) {



};exports.H5 = H5;
var APP = function APP(fn) {



};exports.APP = APP;
var applets = function applets(fn) {

  fn();

};exports.applets = applets;
var notH5 = function notH5(fn) {

  fn();

};exports.notH5 = notH5;
var baiduApple = function baiduApple(fn) {



};exports.baiduApple = baiduApple;
var touTiao = function touTiao(fn) {



};exports.touTiao = touTiao;
var mp = function mp(fn) {

  fn();

};exports.mp = mp;

/***/ }),

/***/ 47:
/*!********************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appletsRouter/appletsNav.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ../helpers/util */ 36);


/**
                                         * @param {Object} finalRoute 格式化后的路由跳转规则
                                         * @param {Object} NAVTYPE 需要调用的跳转方法
                                         */
var appletsUniPushTo = function appletsUniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));var
    url = finalRoute.uniRoute.url;
    uni[_config.methods[NAVTYPE]]({
      url: url + query,
      complete: function complete() {
        resolve(url);
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      } });

  });
};var _default =
appletsUniPushTo;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!***************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/routerNav.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _util = __webpack_require__(/*! ./util */ 49);

/**
                                * @param {Object} replace vue-router的跳转方式
                                * @param {Object} rule 需要跳转到的路由匹配规则
                                * @param {Object} type 对应的官方跳转模式
                                *
                                * this 为当前 Router 实例
                                */
var H5PushTo = function H5PushTo(replace, rule, type) {
  if (this.$route == null) {
    return (0, _warn.err)('h5端路由为就绪，请检查调用代码');
  }
  rule = (0, _util.formatUserRule)(rule, this.selfRoutes, this.CONFIG);
  var objPath = (0, _util.strPathToObjPath)(rule);
  objPath.type = type;
  this.$route[replace](objPath);
};var _default =

H5PushTo;exports.default = _default;

/***/ }),

/***/ 49:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/util.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.diffRouter = exports.H5GetPageRoute = exports.getPages = exports.strPathToObjPath = exports.encodeURLQuery = exports.vueDevRouteProxy = exports.getRouterNextInfo = exports.formatUserRule = exports.nameToRute = exports.pathToRute = exports.getFuntionConfig = exports.fromatRoutes = exports.resloveChildrenPath = exports.resolveRender = void 0;var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _util = __webpack_require__(/*! ../helpers/util */ 36);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 50);
var _config = __webpack_require__(/*! ../helpers/config */ 37);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var pagesConfigReg = /props:\s*\(.*\)\s*(\([\s\S]*\))\s*},/;
var pagesConfigRegCli = /props:\s*Object\.assign\s*(\([\s\S]*\))\s*},/; // 脚手架项目
var defRoutersReg = /props:\s*{([\s\S]+)}\s*},/;

/**
                                                  * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
                                                  * @param {Function|Object} component
                                                  * @param {Object} item
                                                  * @param {Boolean} useUniConfig
                                                  */
var resolveRender = function resolveRender(_ref,


item, useUniConfig) {var component = _ref.component,components = _ref.components;
  if (components != null) {
    (0, _warn.warn)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018components\u2019 \u65E0\u6548\uFF0C\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (useUniConfig == true) {// 采用uni-pages.json中的配置时component可以为空
    return false;
  }
  if (item.path == '*') {// 唯独这个情况在vue-router中可以不用component
    return true;
  }
  if (component == null) {
    return (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u4E2D \u2018component\u2019 \u9009\u9879\u4E0D\u80FD\u4E3A\u7A7A\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }
  if (component.constructor === Function) {
    item.component = {
      render: component };

  } else if (component.constructor === Object) {
    if (component.render == null || component.render.constructor !== Function) {
      (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018render\u2019 \u51FD\u6570\u7F3A\u5931\u6216\u7C7B\u578B\u4E0D\u6B63\u786E\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
    }
  } else {
    (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018component\u2019 \u9009\u9879\u4EC5\u652F\u6301 Function\u3001Object \u7C7B\u578B\u3002\u5E76\u786E\u4FDD Object \u7C7B\u578B\u65F6\u4F20\u9012\u4E86 \u2018render\u2019 \u51FD\u6570  \uFF1A\r\n\r\n ".concat(
    JSON.stringify(item)));

  }
};
/**
    * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
    * @param {Object} objRoutes
    * @param {Array} children
    * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
    */exports.resolveRender = resolveRender;
var resloveChildrenPath = function resloveChildrenPath(objRoutes, children, useUniConfig) {
  for (var i = 0; i < children.length; i += 1) {
    var item = children[i];
    resolveRender(item, item, useUniConfig);
    if (item.path != null) {
      objRoutes[item.path] = _objectSpread(_objectSpread({},
      item),
      {
        _ROUTERPATH: true // 使用page.json中的path为路径
      });

    } else {
      objRoutes[item.aliasPath] = _objectSpread(_objectSpread({},
      item),
      {
        _ROUTERPATH: false });


    }
    if (item.children && item.children.constructor === Array) {
      resloveChildrenPath(objRoutes, item.children, useUniConfig);
    }
  }
};
/**
    * 格式化原始路由表
    * @param {Object} routes  路由表
    * @param {Boolean} userRoute  是否为用户自己配置的路由表
    * @param {Boolean} H5CONFIG
    */exports.resloveChildrenPath = resloveChildrenPath;
var fromatRoutes = function fromatRoutes(routes, userRoute, _ref2)


{var vueRouterDev = _ref2.vueRouterDev,useUniConfig = _ref2.useUniConfig;
  if (userRoute && vueRouterDev) {// 如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
    return routes;
  }
  var objRoutes = {};
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var path = item.path === '/' ? item.alias : item.path;
    if (userRoute) {
      if (item.children && item.children.constructor === Array) {
        resloveChildrenPath(objRoutes, item.children, useUniConfig);
      }
      resolveRender(item, item, useUniConfig); // 是否使用pages.json下的页面配置
    }
    objRoutes[path] = _objectSpread(_objectSpread({},
    item),
    {
      _PAGEPATH: path.substring(1) });


  }
  return objRoutes;
};

/**
    * 解析vueRouter中 component 下 render函数中的配置信息
    * @param {String} FunStr
    */exports.fromatRoutes = fromatRoutes;
var getFuntionConfig = function getFuntionConfig(FunStr) {
  var matchText = FunStr.match(pagesConfigReg);
  var prefix = '';
  if (matchText == null) {// 是uni-app自带的默认路由及配置 也可能是脚手架项目
    matchText = FunStr.match(pagesConfigRegCli);
    if (matchText == null) {// 确认不是脚手架项目
      try {
        // eslint-disable-next-line
        matchText = FunStr.match(defRoutersReg)[1];
        // eslint-disable-next-line
        matchText = eval("Object.assign({".concat(matchText, "})"));
        prefix = 'system-';
      } catch (error) {
        (0, _warn.err)("\u8BFB\u53D6uni-app\u9875\u9762\u6784\u5EFA\u65B9\u6CD5\u914D\u7F6E\u9519\u8BEF \r\n\r\n ".concat(error));
      }
    } else {
      // eslint-disable-next-line
      matchText = eval("Object.assign".concat(matchText[1]));
    }
  } else {
    // eslint-disable-next-line
    matchText = eval("Object.assign".concat(matchText[1]));
  }
  return {
    config: matchText,
    prefix: prefix,
    FunStr: FunStr };

};
/**
    * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
    * @param {String} path //不管是aliasPath名的路径还是path名的路径
    * @param {Object} routes//当前对象的所有路由表
    */exports.getFuntionConfig = getFuntionConfig;
var pathToRute = function pathToRute(path, routes) {
  var PATHKEY = '';
  var rute = {};
  var routeKeys = Object.keys(routes);
  for (var i = 0; i < routeKeys.length; i += 1) {
    var key = routeKeys[i];
    var item = routes[key];
    rute = item;
    if (item.aliasPath == path) {// path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
      PATHKEY = 'aliasPath';
      break;
    }
    // eslint-disable-next-line
    if ("/".concat(item._PAGEPATH) == path) {// 路径相同
      PATHKEY = 'path';
      break;
    }
  }
  return {
    PATHKEY: _defineProperty({},
    PATHKEY, path),

    rute: rute };

};
/**
    * 通过一个路径name 在路由表中查找指定路由表 并返回
    * @param {String} name//实例化路由时传递的路径表中所匹配的对应路由name
    * @param {Object} routes//当前对象的所有路由表
    */exports.pathToRute = pathToRute;
var nameToRute = function nameToRute(name, routes) {
  var routesKeys = Object.keys(routes);
  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];
    if (item.name == name) {
      return item;
    }
  }

  (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230 name\u4E3A:'".concat(name, "' \u7684\u8DEF\u7531"));
};
/**
    * 根据用户传入的路由规则 格式化成正确的路由规则
    * @param {Object} rule 用户需要跳转的路由规则
    * @param {Object} selfRoutes simple-router下的所有routes对象
    * @param {Object} CONFIG 当前路由下的所有配置信息
    */exports.nameToRute = nameToRute;
var formatUserRule = function formatUserRule(rule, selfRoutes, CONFIG) {
  var type = '';
  var ruleQuery = (type = 'query', rule.query || (type = 'params', rule.params)) || (type = '', {});
  var rute = {}; // 默认在router中的配置
  if (type == '' && rule.name != null) {// 那就是可能没有穿任何值咯
    type = 'params';
  }
  if (type != 'params') {
    var route = pathToRute(rule.path || rule, selfRoutes);
    if (Object.keys(route.PATHKEY)[0] == '') {
      (0, _warn.err)("'".concat(route.PATHKEY[''], "' \u8DEF\u5F84\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230"));
      return null;
    }
    rute = route.rute;
    if (rule.path) {
      rule.path = rute.path;
    }
  }
  if (type != '') {// 当然是对象啦 这个主要是首页H5PushTo调用时的
    if (type == 'params' && CONFIG.h5.paramsToQuery) {// 如果是name规则并且设置了转query,那么就转path跳转了
      var _nameToRute =


      nameToRute(rule.name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      delete rule.name;
      delete rule.params;
      rule.path = aliasPath || path;
      type = 'query';
    }
    var query = _config.Global.$parseQuery.transfer(ruleQuery);
    if (CONFIG.encodeURI) {
      if (query != '') {
        rule[type] = {
          query: query.replace(/^query=/, '') };

      }
    } else {
      rule[type] = ruleQuery;
    }
  } else {// 纯字符串,那就只有是path啦
    rule = rute.path;
  }
  return rule;
};

/**
    * 根据是否获取非vue-Router next管道参数，来进行格式化
    *
    * @param {Object} to
    * @param {Object} from
    * @param {Router} Router  //router当前实例对象
    */exports.formatUserRule = formatUserRule;
var getRouterNextInfo = function getRouterNextInfo(to, from, Router) {var
  toRoute = to,fromRoute = from;
  var H5 = Router.CONFIG.h5;
  if (H5.vueNext === false && H5.vueRouterDev === false) {// 不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
    var toPath = {},fromPath = {};
    toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? "/".concat(to.meta.pagePath) : "".concat(to.path);
    fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? "/".concat(from.meta.pagePath) : "".concat(from.path);

    if (to.meta.PATHKEY == null) {// 未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
      toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
    }
    if (from.meta.PATHKEY == null) {
      fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
    }

    var isEmptyTo = Object.keys(to.query).length != 0 ? (0, _util.copyObject)(to.query) : (0, _util.copyObject)(to.params);
    var isEmptyFrom = Object.keys(from.query).length != 0 ? (0, _util.copyObject)(from.query) : (0, _util.copyObject)(from.params);
    /* eslint-disable */
    delete isEmptyTo.__id__; // 删除uni-app下的内置属性
    delete isEmptyFrom.__id__;
    /* eslint-enable */
    var toQuery = _config.Global.$parseQuery.queryGet(isEmptyTo).decode;
    var fromQuery = _config.Global.$parseQuery.queryGet(isEmptyFrom).decode;
    toRoute = (0, _util.resolveRule)(Router, toPath, toQuery, Object.keys(toPath)[0]);
    fromRoute = (0, _util.resolveRule)(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
  } else {
    if (fromRoute.name == null && toRoute.name != null) {// 这种情况是因为uni-app在使用vue-router时搞了骚操作。
      fromRoute = _objectSpread(_objectSpread({},
      fromRoute),
      {
        name: toRoute.name });

      // 这个情况一般出现在首次加载页面
    }
  }
  return {
    toRoute: toRoute,
    fromRoute: fromRoute };

};exports.getRouterNextInfo = getRouterNextInfo;
var vueDevRouteProxy = function vueDevRouteProxy(routes, Router) {
  var proxyRoutes = [];
  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var childrenRoutes = Reflect.get(item, 'children');
    if (childrenRoutes != null) {
      var childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
      item.children = childrenProxy;
    }
    var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
    proxyRoutes.push(ProxyRoute);
  }
  return proxyRoutes;
};
/**
    * 组装成编码后的路由query传递信息
    * @param {Object} CONFIG simple-router 对象配置
    * @param {Object} query 传递的参数
    * @param {Object} mode 路由模式
    */exports.vueDevRouteProxy = vueDevRouteProxy;

var encodeURLQuery = function encodeURLQuery(CONFIG, query, mode) {
  if (Object.keys(query).length == 0) {// 没有传值的时候 我们啥都不管
    return '';
  }
  if (CONFIG.h5.vueRouterDev === false) {// 没有采取完全模式开发时 才转换
    var _Global$$parseQuery$q = _config.Global.$parseQuery.queryGet(query),strQuery = _Global$$parseQuery$q.strQuery,historyObj = _Global$$parseQuery$q.historyObj;
    if (mode === 'history') {
      return historyObj;
    }
    return strQuery;
  } // 完全彩种 vue-router 开发的时候 我们不用管
  if (mode === 'history') {// 此模式下 需要的就是对象
    return query;
  }
  return _config.Global.$parseQuery.stringify(query); // hash转成字符串拼接
};
/**
    * 把一个未知的路由跳转规则进行格式化为 hash、history 可用的,主要表现在 history模式下直接传入path会报错__id__错误的问题
    * @param {*} path 需要判断修改的路径规则
    */exports.encodeURLQuery = encodeURLQuery;
var strPathToObjPath = function strPathToObjPath(path) {
  if (path == null) {// 我们也不用管啦,这个情况是路由守卫中传递的
    return path;
  }
  if ((0, _util.isObject)(path)) {// 是对象我们不用管
    return path;
  }
  return { // 这种情况就是只有path时,直接返回path对象了
    path: path };

};
/**
    * 通过 getCurrentPages() api 获取指定页面的 page 对象 默认是获取当前页面page对象
    * @param {Number} index //需要获取的页面索引
    * @param {Boolean} all //是否获取全部的页面
    */exports.strPathToObjPath = strPathToObjPath;
var getPages = function getPages() {var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  return pages.reverse()[index];
};
/**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} pages 获取页面对象集合
    * @param {Object} Vim 用户传递的当前页面对象
    */exports.getPages = getPages;
var H5GetPageRoute = function H5GetPageRoute(pages, Vim) {
  if (pages.length > 0) {// 直接取当前页面的对象
    var currentRoute = pages[pages.length - 1].$route;
    return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
  }if (Vim && Vim.$route) {
    return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
  }
  return {};
};

/**
    * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
    * @param {Router} Router//unis-simple-router 路由对象
    * @param {vueRouter} vueRouter//vue-router对象
    * @param {Boolean} useUniConfig//是否采用uni-page.json中的配置选项
    * @param {Array} routes//需要循环的routes表
    */exports.H5GetPageRoute = H5GetPageRoute;
var diffRouter = function diffRouter(Router, vueRouter, useUniConfig, routes) {
  var newRouterMap = [];
  if (useUniConfig) {// 使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
    var Routes = routes || vueRouter.options.routes;
    var cloneSelfRoutes = (0, _util.copyObject)(Router.selfRoutes); // copy一个对象随便搞xxoo
    Routes.forEach(function (item) {
      var path = item.path === '/' ? item.alias : item.path;
      var vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path] || Router.selfRoutes[path];
      var CselfRoute = Router.selfRoutes[path];
      delete cloneSelfRoutes[path]; // 移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了
      if (CselfRoute == null) {
        return (0, _warn.err)("\u8BFB\u53D6 \u2018pages.json\u2019 \u4E2D\u9875\u9762\u914D\u7F6E\u9519\u8BEF\u3002\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\u8DEF\u5F84\u4E3A\uFF1A".concat(
        path, " \r\n\r\n \u53EF\u4EE5\u5C1D\u8BD5\u628A \u2018useUniConfig\u2019 \u8BBE\u7F6E\u4E3A \u2018false\u2019\u3002\u6216\u8005\u914D\u7F6E\u6B63\u786E\u7684\u8DEF\u5F84\u3002\u5982\u679C\u4F60\u662F\u52A8\u6001\u6DFB\u52A0\u7684\u5219\u4E0D\u7528\u7406\u4F1A"));

      }
      var pageConfigJson = {
        config: {} };

      if (vueRoute.component) {
        pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
        CselfRoute.component = {
          render: function render(h) {return vueRoute.component.render(h);} };

      }
      delete CselfRoute.components; // useUniConfig:true 时不允许携带components
      delete CselfRoute.children; // useUniConfig:true 时不允许携带children
      CselfRoute.meta = _objectSpread(_objectSpread(_objectSpread({},
      pageConfigJson.config),
      item.meta || {}), {}, {
        PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
        pagePath: CselfRoute.path.substring(1) });

      CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
      item.alias = item.path === '/' ? item.alias : CselfRoute.path; // 重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断
      var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, CselfRoute);
      newRouterMap.push(ProxyRoute);
    });
    if (Object.keys(cloneSelfRoutes).length > 0) {// 确实page.json中没有，而实例化时传递了
      var testG = cloneSelfRoutes['*']; // 全局通配符,他是个例外'通配符'可以被添加
      if (testG && routes == null) {
        var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, Router.selfRoutes['*']);
        newRouterMap.push(ProxyRoute);
      }
      if (routes == null) {// 非动态添加时才打印警告
        var cloneSelfRoutesKeys = Object.keys(cloneSelfRoutes);
        for (var i = 0; i < cloneSelfRoutesKeys.length; i += 1) {
          var key = cloneSelfRoutesKeys[i];
          if (key !== '*') {// 通配符不警告
            (0, _warn.warn)("\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684routes\u53C2\u6570\uFF1A\r\n\r\n ".concat(JSON.stringify(cloneSelfRoutes[key]), " \r\n\r\n \u5728pages.json\u4E2D\u672A\u627E\u5230\u3002\u81EA\u5B9A\u6392\u9664\u6389\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u5230\u8DEF\u7531\u4E2D"));
          }
        }
      }
    }
  } else {// 不使用任何的uni配置完全使用 完全使用component作为页面使用
    var _Routes = routes || Router.selfRoutes;
    var RoutesKeys = Object.keys(_Routes);
    for (var _i = 0; _i < RoutesKeys.length; _i += 1) {
      var _key = RoutesKeys[_i];
      var item = _Routes[_key];
      // eslint-disable-next-line
      if (item._ROUTERPATH != null) {// 不寻找children下的路径，只取第一层
        continue;
      }
      delete item.components;
      delete item.children;
      item.path = item.aliasPath || item.path; // 优先获取别名为路径
      if (item.path !== '*') {
        item.component = item.component.render || item.component; // render可能是用户使用addRoutes api进行动态添加的
      }
      item.meta = _objectSpread(_objectSpread({},
      item.meta || {}), {}, {
        PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
        pagePath: item.path.substring(1) });

      var _ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
      newRouterMap.push(_ProxyRoute);
    }
  }
  return newRouterMap;
};exports.diffRouter = diffRouter;

/***/ }),

/***/ 5:
/*!**************************************************!*\
  !*** D:/work/code/gra/gra-design-app/pages.json ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 50:
/*!*****************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/proxy/proxy.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.proxyEachHooks = exports.proxyBeforeEnter = void 0;var _concat = __webpack_require__(/*! ../concat */ 51);
var _base = __webpack_require__(/*! ../base */ 38);
var _myArray = _interopRequireDefault(__webpack_require__(/*! ../extends/myArray */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                    * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
                                                                                                                                                                    * @param {Router} Router  路由实例对象
                                                                                                                                                                    * @param {Object} BeProxy 需要代理的路由表
                                                                                                                                                                    */
var proxyBeforeEnter = function proxyBeforeEnter(Router, BeProxy) {
  var proxyDc = Object.create(null); // 创建没有继承的属性
  var BeProxyKeys = Object.keys(BeProxy);var _loop = function _loop(
  i) {
    var key = BeProxyKeys[i];
    Object.defineProperty(proxyDc, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        var value = BeProxy[key];
        if (key == 'beforeEnter' && value !== undefined) {
          return function (to, from, next) {
            (0, _concat.beforeEnterHooks)(to, from, next, value, Router);
          };
        }
        return value;
      },
      set: function set(v) {
        BeProxy[key] = v;
      } });};for (var i = 0; i < BeProxyKeys.length; i += 1) {_loop(i);

  }
  return proxyDc;
};

/**
    * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
    * @param {Object} Router
    * @param {Object} key
    * @param {Funtion} hookFun
    */exports.proxyBeforeEnter = proxyBeforeEnter;
var proxyEachHooks = function proxyEachHooks(Router, key, hookFun) {
  var vueOldHooks = _base.vuelifeHooks[key];
  return new _myArray.default(Router, vueOldHooks, hookFun);
};exports.proxyEachHooks = proxyEachHooks;

/***/ }),

/***/ 506:
/*!********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/components/w-picker/areadata/areadata.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var cityData = [{ value: '110000', label: '北京市', children: [{ value: "110100", label: "北京市", children: [{ value: "110101", label: "东城区" }, { value: "110102", label: "西城区" }, { value: "110105", label: "朝阳区" }, { value: "110106", label: "丰台区" }, { value: "110107", label: "石景山区" }, { value: "110108", label: "海淀区" }, { value: "110109", label: "门头沟区" }, { value: "110111", label: "房山区" }, { value: "110112", label: "通州区" }, { value: "110113", label: "顺义区" }, { value: "110114", label: "昌平区" }, { value: "110115", label: "大兴区" }, { value: "110116", label: "怀柔区" }, { value: "110117", label: "平谷区" }, { value: "110118", label: "密云区" }, { value: "110119", label: "延庆区" }] }] }, { value: '120000', label: '天津市', children: [{ value: "120100", label: "天津市", children: [{ value: "120101", label: "和平区" }, { value: "120102", label: "河东区" }, { value: "120103", label: "河西区" }, { value: "120104", label: "南开区" }, { value: "120105", label: "河北区" }, { value: "120106", label: "红桥区" }, { value: "120110", label: "东丽区" }, { value: "120111", label: "西青区" }, { value: "120112", label: "津南区" }, { value: "120113", label: "北辰区" }, { value: "120114", label: "武清区" }, { value: "120115", label: "宝坻区" }, { value: "120116", label: "滨海新区" }, { value: "120117", label: "宁河区" }, { value: "120118", label: "静海区" }, { value: "120119", label: "蓟州区" }] }] }, { value: '130000', label: '河北省', children: [{ value: "130100", label: "石家庄市", children: [{ value: "130102", label: "长安区" }, { value: "130104", label: "桥西区" }, { value: "130105", label: "新华区" }, { value: "130107", label: "井陉矿区" }, { value: "130108", label: "裕华区" }, { value: "130109", label: "藁城区" }, { value: "130110", label: "鹿泉区" }, { value: "130111", label: "栾城区" }, { value: "130121", label: "井陉县" }, { value: "130123", label: "正定县" }, { value: "130125", label: "行唐县" }, { value: "130126", label: "灵寿县" }, { value: "130127", label: "高邑县" }, { value: "130128", label: "深泽县" }, { value: "130129", label: "赞皇县" }, { value: "130130", label: "无极县" }, { value: "130131", label: "平山县" }, { value: "130132", label: "元氏县" }, { value: "130133", label: "赵县" }, { value: "130181", label: "辛集市" }, { value: "130183", label: "晋州市" }, { value: "130184", label: "新乐市" }, { value: "130172", label: "石家庄循环化工园区" }, { value: "130171", label: "石家庄高新技术产业开发区" }] }, { value: "130200", label: "唐山市", children: [{ value: "130202", label: "路南区" }, { value: "130203", label: "路北区" }, { value: "130204", label: "古冶区" }, { value: "130205", label: "开平区" }, { value: "130207", label: "丰南区" }, { value: "130208", label: "丰润区" }, { value: "130209", label: "曹妃甸区" }, { value: "130223", label: "滦县" }, { value: "130224", label: "滦南县" }, { value: "130225", label: "乐亭县" }, { value: "130227", label: "迁西县" }, { value: "130229", label: "玉田县" }, { value: "130281", label: "遵化市" }, { value: "130283", label: "迁安市" }, { value: "130271", label: "唐山市芦台经济技术开发区" }, { value: "130272", label: "唐山市汉沽管理区" }, { value: "130273", label: "唐山高新技术产业开发区" }, { value: "130274", label: "河北唐山海港经济开发区" }] }, { value: "130300", label: "秦皇岛市", children: [{ value: "130302", label: "海港区" }, { value: "130303", label: "山海关区" }, { value: "130304", label: "北戴河区" }, { value: "130321", label: "青龙满族自治县" }, { value: "130322", label: "昌黎县" }, { value: "130306", label: "抚宁区" }, { value: "130324", label: "卢龙县" }, { value: "130371", label: "秦皇岛市经济技术开发区" }, { value: "130372", label: "北戴河新区" }] }, { value: "130400", label: "邯郸市", children: [{ value: "130402", label: "邯山区" }, { value: "130403", label: "丛台区" }, { value: "130404", label: "复兴区" }, { value: "130406", label: "峰峰矿区" }, { value: "130421", label: "邯郸县" }, { value: "130423", label: "临漳县" }, { value: "130424", label: "成安县" }, { value: "130425", label: "大名县" }, { value: "130426", label: "涉县" }, { value: "130427", label: "磁县" }, { value: "130407", label: "肥乡区" }, { value: "130408", label: "永年区" }, { value: "130430", label: "邱县" }, { value: "130431", label: "鸡泽县" }, { value: "130432", label: "广平县" }, { value: "130433", label: "馆陶县" }, { value: "130434", label: "魏县" }, { value: "130435", label: "曲周县" }, { value: "130481", label: "武安市" }, { value: "130471", label: "邯郸经济技术开发区" }, { value: "130473", label: "邯郸冀南新区" }] }, { value: "130500", label: "邢台市", children: [{ value: "130502", label: "桥东区" }, { value: "130503", label: "桥西区" }, { value: "130521", label: "邢台县" }, { value: "130522", label: "临城县" }, { value: "130523", label: "内丘县" }, { value: "130524", label: "柏乡县" }, { value: "130525", label: "隆尧县" }, { value: "130526", label: "任县" }, { value: "130527", label: "南和县" }, { value: "130528", label: "宁晋县" }, { value: "130529", label: "巨鹿县" }, { value: "130530", label: "新河县" }, { value: "130531", label: "广宗县" }, { value: "130532", label: "平乡县" }, { value: "130533", label: "威县" }, { value: "130534", label: "清河县" }, { value: "130535", label: "临西县" }, { value: "130581", label: "南宫市" }, { value: "130582", label: "沙河市" }, { value: "130571", label: "河北邢台经济开发区" }] }, { value: "130600", label: "保定市", children: [{ value: "130602", label: "竞秀区" }, { value: "130606", label: "莲池区" }, { value: "130607", label: "满城区" }, { value: "130608", label: "清苑区" }, { value: "130623", label: "涞水县" }, { value: "130624", label: "阜平县" }, { value: "130609", label: "徐水区" }, { value: "130626", label: "定兴县" }, { value: "130627", label: "唐县" }, { value: "130628", label: "高阳县" }, { value: "130629", label: "容城县" }, { value: "130630", label: "涞源县" }, { value: "130631", label: "望都县" }, { value: "130632", label: "安新县" }, { value: "130633", label: "易县" }, { value: "130634", label: "曲阳县" }, { value: "130635", label: "蠡县" }, { value: "130636", label: "顺平县" }, { value: "130637", label: "博野县" }, { value: "130638", label: "雄县" }, { value: "130681", label: "涿州市" }, { value: "130682", label: "定州市" }, { value: "130683", label: "安国市" }, { value: "130684", label: "高碑店市" }, { value: "130671", label: "保定高新技术产业开发区" }, { value: "130672", label: "保定白沟新城" }] }, { value: "130700", label: "张家口市", children: [{ value: "130702", label: "桥东区" }, { value: "130703", label: "桥西区" }, { value: "130705", label: "宣化区" }, { value: "130706", label: "下花园区" }, { value: "130708", label: "万全区" }, { value: "130709", label: "崇礼区" }, { value: "130722", label: "张北县" }, { value: "130723", label: "康保县" }, { value: "130724", label: "沽源县" }, { value: "130725", label: "尚义县" }, { value: "130726", label: "蔚县" }, { value: "130727", label: "阳原县" }, { value: "130728", label: "怀安县" }, { value: "130730", label: "怀来县" }, { value: "130731", label: "涿鹿县" }, { value: "130732", label: "赤城县" }, { value: "130733", label: "崇礼县" }, { value: "130771", label: "张家口市高新技术产业开发区" }, { value: "130772", label: "张家口市察北管理区" }, { value: "130773", label: "张家口市塞北管理区" }] }, { value: "130800", label: "承德市", children: [{ value: "130802", label: "双桥区" }, { value: "130803", label: "双滦区" }, { value: "130804", label: "鹰手营子矿区" }, { value: "130821", label: "承德县" }, { value: "130822", label: "兴隆县" }, { value: "130881", label: "平泉市" }, { value: "130824", label: "滦平县" }, { value: "130825", label: "隆化县" }, { value: "130826", label: "丰宁满族自治县" }, { value: "130827", label: "宽城满族自治县" }, { value: "130828", label: "围场满族蒙古族自治县" }, { value: "130871", label: "承德高新技术产业开发区" }] }, { value: "130900", label: "沧州市", children: [{ value: "130902", label: "新华区" }, { value: "130903", label: "运河区" }, { value: "130921", label: "沧县" }, { value: "130922", label: "青县" }, { value: "130923", label: "东光县" }, { value: "130924", label: "海兴县" }, { value: "130925", label: "盐山县" }, { value: "130926", label: "肃宁县" }, { value: "130927", label: "南皮县" }, { value: "130928", label: "吴桥县" }, { value: "130929", label: "献县" }, { value: "130930", label: "孟村回族自治县" }, { value: "130981", label: "泊头市" }, { value: "130982", label: "任丘市" }, { value: "130983", label: "黄骅市" }, { value: "130984", label: "河间市" }, { value: "130971", label: "河北沧州经济开发区" }, { value: "130972", label: "沧州高新技术产业开发区" }, { value: "130973", label: "沧州渤海新区" }] }, { value: "131000", label: "廊坊市", children: [{ value: "131002", label: "安次区" }, { value: "131003", label: "广阳区" }, { value: "131022", label: "固安县" }, { value: "131023", label: "永清县" }, { value: "131024", label: "香河县" }, { value: "131025", label: "大城县" }, { value: "131026", label: "文安县" }, { value: "131028", label: "大厂回族自治县" }, { value: "131071", label: "廊坊经济技术开发区" }, { value: "131081", label: "霸州市" }, { value: "131082", label: "三河市" }] }, { value: "131100", label: "衡水市", children: [{ value: "131102", label: "桃城区" }, { value: "131121", label: "枣强县" }, { value: "131122", label: "武邑县" }, { value: "131123", label: "武强县" }, { value: "131124", label: "饶阳县" }, { value: "131125", label: "安平县" }, { value: "131126", label: "故城县" }, { value: "131127", label: "景县" }, { value: "131128", label: "阜城县" }, { value: "131103", label: "冀州区" }, { value: "131182", label: "深州市" }, { value: "131172", label: "衡水滨湖新区" }, { value: "131171", label: "河北衡水经济开发区" }] }] }, { value: '140000', label: '山西省', children: [{ value: "140100", label: "太原市", children: [{ value: "140105", label: "小店区" }, { value: "140106", label: "迎泽区" }, { value: "140107", label: "杏花岭区" }, { value: "140108", label: "尖草坪区" }, { value: "140109", label: "万柏林区" }, { value: "140110", label: "晋源区" }, { value: "140121", label: "清徐县" }, { value: "140122", label: "阳曲县" }, { value: "140123", label: "娄烦县" }, { value: "140181", label: "古交市" }, { value: "140171", label: "山西转型综合改革示范区" }] }, { value: "140200", label: "大同市", children: [{ value: "140202", label: "城区" }, { value: "140203", label: "矿区" }, { value: "140211", label: "南郊区" }, { value: "140212", label: "新荣区" }, { value: "140221", label: "阳高县" }, { value: "140222", label: "天镇县" }, { value: "140223", label: "广灵县" }, { value: "140224", label: "灵丘县" }, { value: "140225", label: "浑源县" }, { value: "140226", label: "左云县" }, { value: "140227", label: "大同县" }, { value: "140271", label: "山西大同经济开发区" }] }, { value: "140300", label: "阳泉市", children: [{ value: "140302", label: "城区" }, { value: "140303", label: "矿区" }, { value: "140311", label: "郊区" }, { value: "140321", label: "平定县" }, { value: "140322", label: "盂县" }, { value: "140371", label: "山西阳泉经济开发区" }] }, { value: "140400", label: "长治市", children: [{ value: "140421", label: "长治县" }, { value: "140423", label: "襄垣县" }, { value: "140424", label: "屯留县" }, { value: "140425", label: "平顺县" }, { value: "140426", label: "黎城县" }, { value: "140427", label: "壶关县" }, { value: "140428", label: "长子县" }, { value: "140429", label: "武乡县" }, { value: "140430", label: "沁县" }, { value: "140431", label: "沁源县" }, { value: "140481", label: "潞城市" }, { value: "140402", label: "城区" }, { value: "140411", label: "郊区" }, { value: "140471", label: "山西长治高新技术产业园区" }] }, { value: "140500", label: "晋城市", children: [{ value: "140502", label: "城区" }, { value: "140521", label: "沁水县" }, { value: "140522", label: "阳城县" }, { value: "140524", label: "陵川县" }, { value: "140525", label: "泽州县" }, { value: "140581", label: "高平市" }] }, { value: "140600", label: "朔州市", children: [{ value: "140602", label: "朔城区" }, { value: "140603", label: "平鲁区" }, { value: "140621", label: "山阴县" }, { value: "140622", label: "应县" }, { value: "140623", label: "右玉县" }, { value: "140624", label: "怀仁县" }, { value: "140671", label: "山西朔州经济开发区" }] }, { value: "140700", label: "晋中市", children: [{ value: "140702", label: "榆次区" }, { value: "140721", label: "榆社县" }, { value: "140722", label: "左权县" }, { value: "140723", label: "和顺县" }, { value: "140724", label: "昔阳县" }, { value: "140725", label: "寿阳县" }, { value: "140726", label: "太谷县" }, { value: "140727", label: "祁县" }, { value: "140728", label: "平遥县" }, { value: "140729", label: "灵石县" }, { value: "140781", label: "介休市" }] }, { value: "140800", label: "运城市", children: [{ value: "140802", label: "盐湖区" }, { value: "140821", label: "临猗县" }, { value: "140822", label: "万荣县" }, { value: "140823", label: "闻喜县" }, { value: "140824", label: "稷山县" }, { value: "140825", label: "新绛县" }, { value: "140826", label: "绛县" }, { value: "140827", label: "垣曲县" }, { value: "140828", label: "夏县" }, { value: "140829", label: "平陆县" }, { value: "140830", label: "芮城县" }, { value: "140881", label: "永济市" }, { value: "140882", label: "河津市" }] }, { value: "140900", label: "忻州市", children: [{ value: "140902", label: "忻府区" }, { value: "140921", label: "定襄县" }, { value: "140922", label: "五台县" }, { value: "140923", label: "代县" }, { value: "140924", label: "繁峙县" }, { value: "140925", label: "宁武县" }, { value: "140926", label: "静乐县" }, { value: "140927", label: "神池县" }, { value: "140928", label: "五寨县" }, { value: "140929", label: "岢岚县" }, { value: "140930", label: "河曲县" }, { value: "140931", label: "保德县" }, { value: "140932", label: "偏关县" }, { value: "140981", label: "原平市" }, { value: "140971", label: "五台山风景名胜区" }] }, { value: "141000", label: "临汾市", children: [{ value: "141002", label: "尧都区" }, { value: "141021", label: "曲沃县" }, { value: "141022", label: "翼城县" }, { value: "141023", label: "襄汾县" }, { value: "141024", label: "洪洞县" }, { value: "141025", label: "古县" }, { value: "141026", label: "安泽县" }, { value: "141027", label: "浮山县" }, { value: "141028", label: "吉县" }, { value: "141029", label: "乡宁县" }, { value: "141030", label: "大宁县" }, { value: "141031", label: "隰县" }, { value: "141032", label: "永和县" }, { value: "141033", label: "蒲县" }, { value: "141034", label: "汾西县" }, { value: "141081", label: "侯马市" }, { value: "141082", label: "霍州市" }] }, { value: "141100", label: "吕梁市", children: [{ value: "141102", label: "离石区" }, { value: "141121", label: "文水县" }, { value: "141122", label: "交城县" }, { value: "141123", label: "兴县" }, { value: "141124", label: "临县" }, { value: "141125", label: "柳林县" }, { value: "141126", label: "石楼县" }, { value: "141127", label: "岚县" }, { value: "141128", label: "方山县" }, { value: "141129", label: "中阳县" }, { value: "141130", label: "交口县" }, { value: "141181", label: "孝义市" }, { value: "141182", label: "汾阳市" }] }] }, { value: '150000', label: '内蒙古', children: [{ value: "150100", label: "呼和浩特市", children: [{ value: "150102", label: "新城区" }, { value: "150103", label: "回民区" }, { value: "150104", label: "玉泉区" }, { value: "150105", label: "赛罕区" }, { value: "150121", label: "土默特左旗" }, { value: "150122", label: "托克托县" }, { value: "150123", label: "和林格尔县" }, { value: "150124", label: "清水河县" }, { value: "150125", label: "武川县" }, { value: "150171", label: "呼和浩特金海工业园区" }, { value: "150172", label: "呼和浩特经济技术开发区" }] }, { value: "150200", label: "包头市", children: [{ value: "150202", label: "东河区" }, { value: "150203", label: "昆都仑区" }, { value: "150204", label: "青山区" }, { value: "150205", label: "石拐区" }, { value: "150206", label: "白云矿区" }, { value: "150207", label: "九原区" }, { value: "150221", label: "土默特右旗" }, { value: "150222", label: "固阳县" }, { value: "150223", label: "达尔罕茂明安联合旗" }, { value: "150271", label: "包头稀土高新技术产业开发区" }] }, { value: "150300", label: "乌海市", children: [{ value: "150302", label: "海勃湾区" }, { value: "150303", label: "海南区" }, { value: "150304", label: "乌达区" }] }, { value: "150400", label: "赤峰市", children: [{ value: "150402", label: "红山区" }, { value: "150403", label: "元宝山区" }, { value: "150404", label: "松山区" }, { value: "150421", label: "阿鲁科尔沁旗" }, { value: "150422", label: "巴林左旗" }, { value: "150423", label: "巴林右旗" }, { value: "150424", label: "林西县" }, { value: "150425", label: "克什克腾旗" }, { value: "150426", label: "翁牛特旗" }, { value: "150428", label: "喀喇沁旗" }, { value: "150429", label: "宁城县" }, { value: "150430", label: "敖汉旗" }] }, { value: "150500", label: "通辽市", children: [{ value: "150502", label: "科尔沁区" }, { value: "150521", label: "科尔沁左翼中旗" }, { value: "150522", label: "科尔沁左翼后旗" }, { value: "150523", label: "开鲁县" }, { value: "150524", label: "库伦旗" }, { value: "150525", label: "奈曼旗" }, { value: "150526", label: "扎鲁特旗" }, { value: "150581", label: "霍林郭勒市" }, { value: "150571", label: "通辽经济技术开发区" }] }, { value: "150600", label: "鄂尔多斯市", children: [{ value: "150602", label: "东胜区" }, { value: "150621", label: "达拉特旗" }, { value: "150622", label: "准格尔旗" }, { value: "150623", label: "鄂托克前旗" }, { value: "150624", label: "鄂托克旗" }, { value: "150625", label: "杭锦旗" }, { value: "150626", label: "乌审旗" }, { value: "150627", label: "伊金霍洛旗" }, { value: "150603", label: "康巴什区" }] }, { value: "150700", label: "呼伦贝尔市", children: [{ value: "150702", label: "海拉尔区" }, { value: "150721", label: "阿荣旗" }, { value: "150722", label: "莫力达瓦达斡尔族自治旗" }, { value: "150723", label: "鄂伦春自治旗" }, { value: "150724", label: "鄂温克族自治旗" }, { value: "150725", label: "陈巴尔虎旗" }, { value: "150726", label: "新巴尔虎左旗" }, { value: "150727", label: "新巴尔虎右旗" }, { value: "150781", label: "满洲里市" }, { value: "150782", label: "牙克石市" }, { value: "150783", label: "扎兰屯市" }, { value: "150784", label: "额尔古纳市" }, { value: "150785", label: "根河市" }, { value: "150703", label: "扎赉诺尔区" }] }, { value: "150800", label: "巴彦淖尔市", children: [{ value: "150802", label: "临河区" }, { value: "150821", label: "五原县" }, { value: "150822", label: "磴口县" }, { value: "150823", label: "乌拉特前旗" }, { value: "150824", label: "乌拉特中旗" }, { value: "150825", label: "乌拉特后旗" }, { value: "150826", label: "杭锦后旗" }] }, { value: "150900", label: "乌兰察布市", children: [{ value: "150902", label: "集宁区" }, { value: "150921", label: "卓资县" }, { value: "150922", label: "化德县" }, { value: "150923", label: "商都县" }, { value: "150924", label: "兴和县" }, { value: "150925", label: "凉城县" }, { value: "150926", label: "察哈尔右翼前旗" }, { value: "150927", label: "察哈尔右翼中旗" }, { value: "150928", label: "察哈尔右翼后旗" }, { value: "150929", label: "四子王旗" }, { value: "150981", label: "丰镇市" }] }, { value: "152200", label: "兴安盟", children: [{ value: "152201", label: "乌兰浩特市" }, { value: "152202", label: "阿尔山市" }, { value: "152221", label: "科尔沁右翼前旗" }, { value: "152222", label: "科尔沁右翼中旗" }, { value: "152223", label: "扎赉特旗" }, { value: "152224", label: "突泉县" }] }, { value: "152500", label: "锡林郭勒盟", children: [{ value: "152501", label: "二连浩特市" }, { value: "152502", label: "锡林浩特市" }, { value: "152522", label: "阿巴嘎旗" }, { value: "152523", label: "苏尼特左旗" }, { value: "152524", label: "苏尼特右旗" }, { value: "152525", label: "东乌珠穆沁旗" }, { value: "152526", label: "西乌珠穆沁旗" }, { value: "152527", label: "太仆寺旗" }, { value: "152528", label: "镶黄旗" }, { value: "152529", label: "正镶白旗" }, { value: "152530", label: "正蓝旗" }, { value: "152531", label: "多伦县" }, { value: "152571", label: "乌拉盖管委会" }] }, { value: "152900", label: "阿拉善盟", children: [{ value: "152921", label: "阿拉善左旗" }, { value: "152922", label: "阿拉善右旗" }, { value: "152923", label: "额济纳旗" }, { value: "152971", label: "内蒙古阿拉善经济开发区" }] }] }, { value: '210000', label: '辽宁省', children: [{ value: "210100", label: "沈阳市", children: [{ value: "210102", label: "和平区" }, { value: "210103", label: "沈河区" }, { value: "210104", label: "大东区" }, { value: "210105", label: "皇姑区" }, { value: "210106", label: "铁西区" }, { value: "210111", label: "苏家屯区" }, { value: "210112", label: "东陵区" }, { value: "210113", label: "新城子区" }, { value: "210114", label: "于洪区" }, { value: "210115", label: "辽中区" }, { value: "210123", label: "康平县" }, { value: "210124", label: "法库县" }, { value: "210181", label: "新民市" }, { value: "210112", label: "浑南区" }, { value: "210113", label: "沈北新区" }] }, { value: "210200", label: "大连市", children: [{ value: "210202", label: "中山区" }, { value: "210203", label: "西岗区" }, { value: "210204", label: "沙河口区" }, { value: "210211", label: "甘井子区" }, { value: "210212", label: "旅顺口区" }, { value: "210213", label: "金州区" }, { value: "210224", label: "长海县" }, { value: "210251", label: "开发区" }, { value: "210281", label: "瓦房店市" }, { value: "210214", label: "普兰店区" }, { value: "210283", label: "庄河市" }] }, { value: "210300", label: "鞍山市", children: [{ value: "210302", label: "铁东区" }, { value: "210303", label: "铁西区" }, { value: "210304", label: "立山区" }, { value: "210311", label: "千山区" }, { value: "210321", label: "台安县" }, { value: "210323", label: "岫岩满族自治县" }, { value: "210381", label: "海城市" }] }, { value: "210400", label: "抚顺市", children: [{ value: "210402", label: "新抚区" }, { value: "210403", label: "东洲区" }, { value: "210404", label: "望花区" }, { value: "210411", label: "顺城区" }, { value: "210421", label: "抚顺县" }, { value: "210422", label: "新宾满族自治县" }, { value: "210423", label: "清原满族自治县" }] }, { value: "210500", label: "本溪市", children: [{ value: "210502", label: "平山区" }, { value: "210503", label: "溪湖区" }, { value: "210504", label: "明山区" }, { value: "210505", label: "南芬区" }, { value: "210521", label: "本溪满族自治县" }, { value: "210522", label: "桓仁满族自治县" }] }, { value: "210600", label: "丹东市", children: [{ value: "210602", label: "元宝区" }, { value: "210603", label: "振兴区" }, { value: "210604", label: "振安区" }, { value: "210624", label: "宽甸满族自治县" }, { value: "210681", label: "东港市" }, { value: "210682", label: "凤城市" }] }, { value: "210700", label: "锦州市", children: [{ value: "210702", label: "古塔区" }, { value: "210703", label: "凌河区" }, { value: "210711", label: "太和区" }, { value: "210726", label: "黑山县" }, { value: "210727", label: "义县" }, { value: "210781", label: "凌海市" }, { value: "210782", label: "北镇市" }] }, { value: "210800", label: "营口市", children: [{ value: "210802", label: "站前区" }, { value: "210803", label: "西市区" }, { value: "210804", label: "鲅鱼圈区" }, { value: "210811", label: "老边区" }, { value: "210881", label: "盖州市" }, { value: "210882", label: "大石桥市" }] }, { value: "210900", label: "阜新市", children: [{ value: "210902", label: "海州区" }, { value: "210903", label: "新邱区" }, { value: "210904", label: "太平区" }, { value: "210905", label: "清河门区" }, { value: "210911", label: "细河区" }, { value: "210921", label: "阜新蒙古族自治县" }, { value: "210922", label: "彰武县" }] }, { value: "211000", label: "辽阳市", children: [{ value: "211002", label: "白塔区" }, { value: "211003", label: "文圣区" }, { value: "211004", label: "宏伟区" }, { value: "211005", label: "弓长岭区" }, { value: "211011", label: "太子河区" }, { value: "211021", label: "辽阳县" }, { value: "211081", label: "灯塔市" }] }, { value: "211100", label: "盘锦市", children: [{ value: "211102", label: "双台子区" }, { value: "211103", label: "兴隆台区" }, { value: "211121", label: "大洼县" }, { value: "211122", label: "盘山县" }] }, { value: "211200", label: "铁岭市", children: [{ value: "211202", label: "银州区" }, { value: "211204", label: "清河区" }, { value: "211221", label: "铁岭县" }, { value: "211223", label: "西丰县" }, { value: "211224", label: "昌图县" }, { value: "211281", label: "调兵山市" }, { value: "211282", label: "开原市" }] }, { value: "211300", label: "朝阳市", children: [{ value: "211302", label: "双塔区" }, { value: "211303", label: "龙城区" }, { value: "211321", label: "朝阳县" }, { value: "211322", label: "建平县" }, { value: "211324", label: "喀喇沁左翼蒙古族自治县" }, { value: "211381", label: "北票市" }, { value: "211382", label: "凌源市" }] }, { value: "211400", label: "葫芦岛市", children: [{ value: "211402", label: "连山区" }, { value: "211403", label: "龙港区" }, { value: "211404", label: "南票区" }, { value: "211421", label: "绥中县" }, { value: "211422", label: "建昌县" }, { value: "211481", label: "兴城市" }] }] }, { value: '220000', label: '吉林省', children: [{ value: "220100", label: "长春市", children: [{ value: "220102", label: "南关区" }, { value: "220103", label: "宽城区" }, { value: "220104", label: "朝阳区" }, { value: "220105", label: "二道区" }, { value: "220106", label: "绿园区" }, { value: "220112", label: "双阳区" }, { value: "220122", label: "农安县" }, { value: "220181", label: "九台市" }, { value: "220182", label: "榆树市" }, { value: "220183", label: "德惠市" }, { value: "220171", label: "长春经济技术开发区" }, { value: "220172", label: "长春净月高新技术产业开发区" }, { value: "220173", label: "长春高新技术产业开发区" }, { value: "220174", label: "长春汽车经济技术开发区" }] }, { value: "220200", label: "吉林市", children: [{ value: "220202", label: "昌邑区" }, { value: "220203", label: "龙潭区" }, { value: "220204", label: "船营区" }, { value: "220211", label: "丰满区" }, { value: "220221", label: "永吉县" }, { value: "220281", label: "蛟河市" }, { value: "220282", label: "桦甸市" }, { value: "220283", label: "舒兰市" }, { value: "220284", label: "磐石市" }, { value: "220271", label: "吉林经济开发区" }, { value: "220272", label: "吉林高新技术产业开发区" }, { value: "220273", label: "吉林中国新加坡食品区" }] }, { value: "220300", label: "四平市", children: [{ value: "220302", label: "铁西区" }, { value: "220303", label: "铁东区" }, { value: "220322", label: "梨树县" }, { value: "220323", label: "伊通满族自治县" }, { value: "220381", label: "公主岭市" }, { value: "220382", label: "双辽市" }] }, { value: "220400", label: "辽源市", children: [{ value: "220402", label: "龙山区" }, { value: "220403", label: "西安区" }, { value: "220421", label: "东丰县" }, { value: "220422", label: "东辽县" }] }, { value: "220500", label: "通化市", children: [{ value: "220502", label: "东昌区" }, { value: "220503", label: "二道江区" }, { value: "220521", label: "通化县" }, { value: "220523", label: "辉南县" }, { value: "220524", label: "柳河县" }, { value: "220581", label: "梅河口市" }, { value: "220582", label: "集安市" }] }, { value: "220600", label: "白山市", children: [{ value: "220602", label: "八道江区" }, { value: "220621", label: "抚松县" }, { value: "220622", label: "靖宇县" }, { value: "220623", label: "长白朝鲜族自治县" }, { value: "220605", label: "江源区" }, { value: "220681", label: "临江市" }, { value: "220602", label: "浑江区" }] }, { value: "220700", label: "松原市", children: [{ value: "220702", label: "宁江区" }, { value: "220721", label: "前郭尔罗斯蒙古族自治县" }, { value: "220722", label: "长岭县" }, { value: "220723", label: "乾安县" }, { value: "220781", label: "扶余市" }, { value: "220771", label: "吉林松原经济开发区" }] }, { value: "220800", label: "白城市", children: [{ value: "220802", label: "洮北区" }, { value: "220821", label: "镇赉县" }, { value: "220822", label: "通榆县" }, { value: "220881", label: "洮南市" }, { value: "220882", label: "大安市" }, { value: "220871", label: "吉林白城经济开发区" }] }, { value: "222400", label: "延边朝鲜族自治州", children: [{ value: "222401", label: "延吉市" }, { value: "222402", label: "图们市" }, { value: "222403", label: "敦化市" }, { value: "222404", label: "珲春市" }, { value: "222405", label: "龙井市" }, { value: "222406", label: "和龙市" }, { value: "222424", label: "汪清县" }, { value: "222426", label: "安图县" }] }] }, { value: '230000', label: '黑龙江省', children: [{ value: "230100", label: "哈尔滨市", children: [{ value: "230102", label: "道里区" }, { value: "230103", label: "南岗区" }, { value: "230104", label: "道外区" }, { value: "230110", label: "香坊区" }, { value: "230107", label: "动力区" }, { value: "230108", label: "平房区" }, { value: "230109", label: "松北区" }, { value: "230111", label: "呼兰区" }, { value: "230123", label: "依兰县" }, { value: "230124", label: "方正县" }, { value: "230125", label: "宾县" }, { value: "230126", label: "巴彦县" }, { value: "230127", label: "木兰县" }, { value: "230128", label: "通河县" }, { value: "230129", label: "延寿县" }, { value: "230112", label: "阿城区" }, { value: "230113", label: "双城区" }, { value: "230183", label: "尚志市" }, { value: "230184", label: "五常市" }] }, { value: "230200", label: "齐齐哈尔市", children: [{ value: "230202", label: "龙沙区" }, { value: "230203", label: "建华区" }, { value: "230204", label: "铁锋区" }, { value: "230205", label: "昂昂溪区" }, { value: "230206", label: "富拉尔基区" }, { value: "230207", label: "碾子山区" }, { value: "230208", label: "梅里斯达斡尔族区" }, { value: "230221", label: "龙江县" }, { value: "230223", label: "依安县" }, { value: "230224", label: "泰来县" }, { value: "230225", label: "甘南县" }, { value: "230227", label: "富裕县" }, { value: "230229", label: "克山县" }, { value: "230230", label: "克东县" }, { value: "230231", label: "拜泉县" }, { value: "230281", label: "讷河市" }] }, { value: "230300", label: "鸡西市", children: [{ value: "230302", label: "鸡冠区" }, { value: "230303", label: "恒山区" }, { value: "230304", label: "滴道区" }, { value: "230305", label: "梨树区" }, { value: "230306", label: "城子河区" }, { value: "230307", label: "麻山区" }, { value: "230321", label: "鸡东县" }, { value: "230381", label: "虎林市" }, { value: "230382", label: "密山市" }] }, { value: "230400", label: "鹤岗市", children: [{ value: "230402", label: "向阳区" }, { value: "230403", label: "工农区" }, { value: "230404", label: "南山区" }, { value: "230405", label: "兴安区" }, { value: "230406", label: "东山区" }, { value: "230407", label: "兴山区" }, { value: "230421", label: "萝北县" }, { value: "230422", label: "绥滨县" }] }, { value: "230500", label: "双鸭山市", children: [{ value: "230502", label: "尖山区" }, { value: "230503", label: "岭东区" }, { value: "230505", label: "四方台区" }, { value: "230506", label: "宝山区" }, { value: "230521", label: "集贤县" }, { value: "230522", label: "友谊县" }, { value: "230523", label: "宝清县" }, { value: "230524", label: "饶河县" }] }, { value: "230600", label: "大庆市", children: [{ value: "230602", label: "萨尔图区" }, { value: "230603", label: "龙凤区" }, { value: "230604", label: "让胡路区" }, { value: "230605", label: "红岗区" }, { value: "230606", label: "大同区" }, { value: "230621", label: "肇州县" }, { value: "230622", label: "肇源县" }, { value: "230623", label: "林甸县" }, { value: "230624", label: "杜尔伯特蒙古族自治县" }, { value: "230671", label: "大庆高新技术产业开发区" }] }, { value: "230700", label: "伊春市", children: [{ value: "230702", label: "伊春区" }, { value: "230703", label: "南岔区" }, { value: "230704", label: "友好区" }, { value: "230705", label: "西林区" }, { value: "230706", label: "翠峦区" }, { value: "230707", label: "新青区" }, { value: "230708", label: "美溪区" }, { value: "230709", label: "金山屯区" }, { value: "230710", label: "五营区" }, { value: "230711", label: "乌马河区" }, { value: "230712", label: "汤旺河区" }, { value: "230713", label: "带岭区" }, { value: "230714", label: "乌伊岭区" }, { value: "230715", label: "红星区" }, { value: "230716", label: "上甘岭区" }, { value: "230722", label: "嘉荫县" }, { value: "230781", label: "铁力市" }] }, { value: "230800", label: "佳木斯市", children: [{ value: "230803", label: "向阳区" }, { value: "230804", label: "前进区" }, { value: "230805", label: "东风区" }, { value: "230811", label: "郊区" }, { value: "230822", label: "桦南县" }, { value: "230826", label: "桦川县" }, { value: "230828", label: "汤原县" }, { value: "230833", label: "抚远市" }, { value: "230881", label: "同江市" }, { value: "230882", label: "富锦市" }] }, { value: "230900", label: "七台河市", children: [{ value: "230902", label: "新兴区" }, { value: "230903", label: "桃山区" }, { value: "230904", label: "茄子河区" }, { value: "230921", label: "勃利县" }] }, { value: "231000", label: "牡丹江市", children: [{ value: "231002", label: "东安区" }, { value: "231003", label: "阳明区" }, { value: "231004", label: "爱民区" }, { value: "231005", label: "西安区" }, { value: "231086", label: "东宁市" }, { value: "231025", label: "林口县" }, { value: "231081", label: "绥芬河市" }, { value: "231083", label: "海林市" }, { value: "231084", label: "宁安市" }, { value: "231085", label: "穆棱市" }, { value: "231071", label: "牡丹江经济技术开发区" }] }, { value: "231100", label: "黑河市", children: [{ value: "231102", label: "爱辉区" }, { value: "231121", label: "嫩江县" }, { value: "231123", label: "逊克县" }, { value: "231124", label: "孙吴县" }, { value: "231181", label: "北安市" }, { value: "231182", label: "五大连池市" }] }, { value: "231200", label: "绥化市", children: [{ value: "231202", label: "北林区" }, { value: "231221", label: "望奎县" }, { value: "231222", label: "兰西县" }, { value: "231223", label: "青冈县" }, { value: "231224", label: "庆安县" }, { value: "231225", label: "明水县" }, { value: "231226", label: "绥棱县" }, { value: "231281", label: "安达市" }, { value: "231282", label: "肇东市" }, { value: "231283", label: "海伦市" }] }, { value: "232700", label: "大兴安岭地区", children: [{ value: "232721", label: "呼玛县" }, { value: "232722", label: "塔河县" }, { value: "232723", label: "漠河县" }, { value: "232701", label: "加格达奇区" }, { value: "232704", label: "呼中区" }, { value: "232703", label: "新林区" }] }] }, { value: '310000', label: '上海市', children: [{ value: '310100', label: '上海市', children: [{ value: "310101", label: "黄浦区" }, { value: "310104", label: "徐汇区" }, { value: "310105", label: "长宁区" }, { value: "310106", label: "静安区" }, { value: "310107", label: "普陀区" }, { value: "310109", label: "虹口区" }, { value: "310110", label: "杨浦区" }, { value: "310112", label: "闵行区" }, { value: "310113", label: "宝山区" }, { value: "310114", label: "嘉定区" }, { value: "310115", label: "浦东新区" }, { value: "310116", label: "金山区" }, { value: "310117", label: "松江区" }, { value: "310118", label: "青浦区" }, { value: "310120", label: "奉贤区" }, { value: "310151", label: "崇明区" }] }] }, { value: '320000', label: '江苏省', children: [{ value: "320100", label: "南京市", children: [{ value: "320102", label: "玄武区" }, { value: "320104", label: "秦淮区" }, { value: "320105", label: "建邺区" }, { value: "320106", label: "鼓楼区" }, { value: "320111", label: "浦口区" }, { value: "320113", label: "栖霞区" }, { value: "320114", label: "雨花台区" }, { value: "320115", label: "江宁区" }, { value: "320116", label: "六合区" }, { value: "320117", label: "溧水区" }, { value: "320118", label: "高淳区" }] }, { value: "320200", label: "无锡市", children: [{ value: "320205", label: "锡山区" }, { value: "320206", label: "惠山区" }, { value: "320211", label: "滨湖区" }, { value: "320281", label: "江阴市" }, { value: "320282", label: "宜兴市" }, { value: "320213", label: "梁溪区" }, { value: "320214", label: "新吴区" }] }, { value: "320300", label: "徐州市", children: [{ value: "320302", label: "鼓楼区" }, { value: "320303", label: "云龙区" }, { value: "320305", label: "贾汪区" }, { value: "320311", label: "泉山区" }, { value: "320321", label: "丰县" }, { value: "320322", label: "沛县" }, { value: "320324", label: "睢宁县" }, { value: "320381", label: "新沂市" }, { value: "320382", label: "邳州市" }, { value: "320371", label: "徐州经济技术开发区" }] }, { value: "320400", label: "常州市", children: [{ value: "320402", label: "天宁区" }, { value: "320404", label: "钟楼区" }, { value: "320411", label: "新北区" }, { value: "320412", label: "武进区" }, { value: "320481", label: "溧阳市" }, { value: "320413", label: "金坛区" }] }, { value: "320500", label: "苏州市", children: [{ value: "320505", label: "虎丘区" }, { value: "320506", label: "吴中区" }, { value: "320507", label: "相城区" }, { value: "320581", label: "常熟市" }, { value: "320582", label: "张家港市" }, { value: "320583", label: "昆山市" }, { value: "320509", label: "吴江区" }, { value: "320585", label: "太仓市" }, { value: "320508", label: "姑苏区" }, { value: "320571", label: "苏州工业园区" }] }, { value: "320600", label: "南通市", children: [{ value: "320602", label: "崇川区" }, { value: "320611", label: "港闸区" }, { value: "320612", label: "通州区" }, { value: "320621", label: "海安县" }, { value: "320623", label: "如东县" }, { value: "320681", label: "启东市" }, { value: "320682", label: "如皋市" }, { value: "320684", label: "海门市" }, { value: "320671", label: "南通经济技术开发区" }] }, { value: "320700", label: "连云港市", children: [{ value: "320703", label: "连云区" }, { value: "320706", label: "海州区" }, { value: "320707", label: "赣榆区" }, { value: "320722", label: "东海县" }, { value: "320723", label: "灌云县" }, { value: "320724", label: "灌南县" }, { value: "320771", label: "连云港经济技术开发区" }, { value: "320772", label: "连云港高新技术产业开发区" }] }, { value: "320800", label: "淮安市", children: [{ value: "320804", label: "淮阴区" }, { value: "320812", label: "清江浦区" }, { value: "320826", label: "涟水县" }, { value: "320813", label: "洪泽区" }, { value: "320830", label: "盱眙县" }, { value: "320831", label: "金湖县" }, { value: "320803", label: "淮安区" }, { value: "320871", label: "淮安经济技术开发区" }] }, { value: "320900", label: "盐城市", children: [{ value: "320902", label: "亭湖区" }, { value: "320903", label: "盐都区" }, { value: "320921", label: "响水县" }, { value: "320922", label: "滨海县" }, { value: "320904", label: "大丰区" }, { value: "320923", label: "阜宁县" }, { value: "320924", label: "射阳县" }, { value: "320925", label: "建湖县" }, { value: "320981", label: "东台市" }, { value: "320971", label: "盐城经济技术开发区" }] }, { value: "321000", label: "扬州市", children: [{ value: "321002", label: "广陵区" }, { value: "321003", label: "邗江区" }, { value: "321011", label: "维扬区" }, { value: "321023", label: "宝应县" }, { value: "321081", label: "仪征市" }, { value: "321084", label: "高邮市" }, { value: "321012", label: "江都区" }, { value: "321071", label: "扬州经济技术开发区" }] }, { value: "321100", label: "镇江市", children: [{ value: "321102", label: "京口区" }, { value: "321111", label: "润州区" }, { value: "321112", label: "丹徒区" }, { value: "321181", label: "丹阳市" }, { value: "321182", label: "扬中市" }, { value: "321183", label: "句容市" }, { value: "321171", label: "镇江新区" }] }, { value: "321200", label: "泰州市", children: [{ value: "321202", label: "海陵区" }, { value: "321203", label: "高港区" }, { value: "321281", label: "兴化市" }, { value: "321282", label: "靖江市" }, { value: "321283", label: "泰兴市" }, { value: "321204", label: "姜堰区" }, { value: "321271", label: "泰州医药高新技术产业开发区" }] }, { value: "321300", label: "宿迁市", children: [{ value: "321302", label: "宿城区" }, { value: "321311", label: "宿豫区" }, { value: "321322", label: "沭阳县" }, { value: "321323", label: "泗阳县" }, { value: "321324", label: "泗洪县" }] }] }, { value: '330000', label: '浙江省', children: [{ value: "330100", label: "杭州市", children: [{ value: "330102", label: "上城区" }, { value: "330103", label: "下城区" }, { value: "330104", label: "江干区" }, { value: "330105", label: "拱墅区" }, { value: "330106", label: "西湖区" }, { value: "330108", label: "滨江区" }, { value: "330109", label: "萧山区" }, { value: "330110", label: "余杭区" }, { value: "330122", label: "桐庐县" }, { value: "330127", label: "淳安县" }, { value: "330182", label: "建德市" }, { value: "330111", label: "富阳区" }, { value: "330112", label: "临安区" }, { value: "330186", label: "其它区" }] }, { value: "330200", label: "宁波市", children: [{ value: "330203", label: "海曙区" }, { value: "330205", label: "江北区" }, { value: "330206", label: "北仑区" }, { value: "330211", label: "镇海区" }, { value: "330212", label: "鄞州区" }, { value: "330225", label: "象山县" }, { value: "330226", label: "宁海县" }, { value: "330281", label: "余姚市" }, { value: "330282", label: "慈溪市" }, { value: "330213", label: "奉化区" }] }, { value: "330300", label: "温州市", children: [{ value: "330302", label: "鹿城区" }, { value: "330303", label: "龙湾区" }, { value: "330304", label: "瓯海区" }, { value: "330305", label: "洞头区" }, { value: "330324", label: "永嘉县" }, { value: "330326", label: "平阳县" }, { value: "330327", label: "苍南县" }, { value: "330328", label: "文成县" }, { value: "330329", label: "泰顺县" }, { value: "330381", label: "瑞安市" }, { value: "330382", label: "乐清市" }, { value: "330371", label: "温州经济技术开发区" }] }, { value: "330400", label: "嘉兴市", children: [{ value: "330402", label: "南湖区" }, { value: "330411", label: "秀洲区" }, { value: "330421", label: "嘉善县" }, { value: "330424", label: "海盐县" }, { value: "330481", label: "海宁市" }, { value: "330482", label: "平湖市" }, { value: "330483", label: "桐乡市" }] }, { value: "330500", label: "湖州市", children: [{ value: "330502", label: "吴兴区" }, { value: "330503", label: "南浔区" }, { value: "330521", label: "德清县" }, { value: "330522", label: "长兴县" }, { value: "330523", label: "安吉县" }] }, { value: "330600", label: "绍兴市", children: [{ value: "330602", label: "越城区" }, { value: "330621", label: "柯桥区" }, { value: "330681", label: "诸暨市" }, { value: "330604", label: "上虞区" }, { value: "330683", label: "嵊州市" }, { value: "330624", label: "新昌县" }] }, { value: "330700", label: "金华市", children: [{ value: "330702", label: "婺城区" }, { value: "330703", label: "金东区" }, { value: "330723", label: "武义县" }, { value: "330726", label: "浦江县" }, { value: "330727", label: "磐安县" }, { value: "330781", label: "兰溪市" }, { value: "330782", label: "义乌市" }, { value: "330783", label: "东阳市" }, { value: "330784", label: "永康市" }] }, { value: "330800", label: "衢州市", children: [{ value: "330802", label: "柯城区" }, { value: "330803", label: "衢江区" }, { value: "330822", label: "常山县" }, { value: "330824", label: "开化县" }, { value: "330825", label: "龙游县" }, { value: "330881", label: "江山市" }] }, { value: "330900", label: "舟山市", children: [{ value: "330902", label: "定海区" }, { value: "330903", label: "普陀区" }, { value: "330921", label: "岱山县" }, { value: "330922", label: "嵊泗县" }] }, { value: "331000", label: "台州市", children: [{ value: "331002", label: "椒江区" }, { value: "331003", label: "黄岩区" }, { value: "331004", label: "路桥区" }, { value: "331083", label: "玉环市" }, { value: "331022", label: "三门县" }, { value: "331023", label: "天台县" }, { value: "331024", label: "仙居县" }, { value: "331081", label: "温岭市" }, { value: "331082", label: "临海市" }] }, { value: "331100", label: "丽水市", children: [{ value: "331102", label: "莲都区" }, { value: "331121", label: "青田县" }, { value: "331122", label: "缙云县" }, { value: "331123", label: "遂昌县" }, { value: "331124", label: "松阳县" }, { value: "331125", label: "云和县" }, { value: "331126", label: "庆元县" }, { value: "331127", label: "景宁畲族自治县" }, { value: "331181", label: "龙泉市" }] }] }, { value: '340000', label: '安徽省', children: [{ value: "340100", label: "合肥市", children: [{ value: "340111", label: "包河区" }, { value: "340104", label: "蜀山区" }, { value: "340103", label: "庐阳区" }, { value: "340102", label: "瑶海区" }, { value: "340171", label: "合肥高新技术产业开发区" }, { value: "340172", label: "合肥经济技术开发区" }, { value: "340173", label: "合肥新站高新技术产业开发区" }, { value: "340121", label: "长丰县" }, { value: "340122", label: "肥东县" }, { value: "340123", label: "肥西县" }, { value: "340124", label: "庐江县" }, { value: "340181", label: "巢湖市" }] }, { value: "340200", label: "芜湖市", children: [{ value: "340202", label: "镜湖区" }, { value: "340203", label: "弋江区" }, { value: "340207", label: "鸠江区" }, { value: "340208", label: "三山区" }, { value: "340221", label: "芜湖县" }, { value: "340222", label: "繁昌县" }, { value: "340223", label: "南陵县" }, { value: "340225", label: "无为县" }, { value: "340272", label: "安徽芜湖长江大桥经济开发区" }, { value: "340271", label: "芜湖经济技术开发区" }] }, { value: "340300", label: "蚌埠市", children: [{ value: "340302", label: "龙子湖区" }, { value: "340303", label: "蚌山区" }, { value: "340304", label: "禹会区" }, { value: "340311", label: "淮上区" }, { value: "340321", label: "怀远县" }, { value: "340322", label: "五河县" }, { value: "340323", label: "固镇县" }, { value: "340371", label: "蚌埠市高新技术开发区" }, { value: "340372	", label: "蚌埠市经济开发区" }] }, { value: "340400", label: "淮南市", children: [{ value: "340402", label: "大通区" }, { value: "340403", label: "田家庵区" }, { value: "340404", label: "谢家集区" }, { value: "340405", label: "八公山区" }, { value: "340406", label: "潘集区" }, { value: "340421", label: "凤台县" }, { value: "340422", label: "寿县" }] }, { value: "340500", label: "马鞍山市", children: [{ value: "340503", label: "花山区" }, { value: "340504", label: "雨山区" }, { value: "340521", label: "当涂县" }, { value: "340506", label: "博望区" }, { value: "340522", label: "含山县" }, { value: "340523", label: "和县" }] }, { value: "340600", label: "淮北市", children: [{ value: "340602", label: "杜集区" }, { value: "340603", label: "相山区" }, { value: "340604", label: "烈山区" }, { value: "340621", label: "濉溪县" }] }, { value: "340700", label: "铜陵市", children: [{ value: "340705", label: "铜官区" }, { value: "340706", label: "义安区" }, { value: "340711", label: "郊区" }, { value: "340722", label: "枞阳县" }] }, { value: "340800", label: "安庆市", children: [{ value: "340802", label: "迎江区" }, { value: "340803", label: "大观区" }, { value: "340811", label: "宜秀区" }, { value: "340822", label: "怀宁县" }, { value: "340824", label: "潜山县" }, { value: "340825", label: "太湖县" }, { value: "340826", label: "宿松县" }, { value: "340827", label: "望江县" }, { value: "340828", label: "岳西县" }, { value: "340881", label: "桐城市" }, { value: "340871", label: "安徽安庆经济开发区" }] }, { value: "341000", label: "黄山市", children: [{ value: "341002", label: "屯溪区" }, { value: "341003", label: "黄山区" }, { value: "341004", label: "徽州区" }, { value: "341021", label: "歙县" }, { value: "341022", label: "休宁县" }, { value: "341023", label: "黟县" }, { value: "341024", label: "祁门县" }] }, { value: "341100", label: "滁州市", children: [{ value: "341102", label: "琅琊区" }, { value: "341103", label: "南谯区" }, { value: "341122", label: "来安县" }, { value: "341124", label: "全椒县" }, { value: "341125", label: "定远县" }, { value: "341126", label: "凤阳县" }, { value: "341181", label: "天长市" }, { value: "341182", label: "明光市" }, { value: "341171", label: "苏滁现代产业园" }, { value: "341172", label: "滁州经济技术开发区" }] }, { value: "341200", label: "阜阳市", children: [{ value: "341202", label: "颍州区" }, { value: "341203", label: "颍东区" }, { value: "341204", label: "颍泉区" }, { value: "341221", label: "临泉县" }, { value: "341222", label: "太和县" }, { value: "341225", label: "阜南县" }, { value: "341226", label: "颍上县" }, { value: "341282", label: "界首市" }, { value: "341272", label: "阜阳经济技术开发区" }, { value: "341271", label: "阜阳合肥现代产业园区" }] }, { value: "341300", label: "宿州市", children: [{ value: "341302", label: "埇桥区" }, { value: "341321", label: "砀山县" }, { value: "341322", label: "萧县" }, { value: "341323", label: "灵璧县" }, { value: "341324", label: "泗县" }, { value: "341371", label: "宿州马鞍山现代产业园区" }, { value: "341372", label: "宿州经济技术开发区" }] }, { value: "341500", label: "六安市", children: [{ value: "341502", label: "金安区" }, { value: "341503", label: "裕安区" }, { value: "341504", label: "叶集区" }, { value: "341522", label: "霍邱县" }, { value: "341523", label: "舒城县" }, { value: "341524", label: "金寨县" }, { value: "341525", label: "霍山县" }] }, { value: "341600", label: "亳州市", children: [{ value: "341602", label: "谯城区" }, { value: "341621", label: "涡阳县" }, { value: "341622", label: "蒙城县" }, { value: "341623", label: "利辛县" }] }, { value: "341700", label: "池州市", children: [{ value: "341702", label: "贵池区" }, { value: "341721", label: "东至县" }, { value: "341722", label: "石台县" }, { value: "341723", label: "青阳县" }] }, { value: "341800", label: "宣城市", children: [{ value: "341802", label: "宣州区" }, { value: "341821", label: "郎溪县" }, { value: "341822", label: "广德县" }, { value: "341823", label: "泾县" }, { value: "341824", label: "绩溪县" }, { value: "341825", label: "旌德县" }, { value: "341881", label: "宁国市" }, { value: "341871", label: "宣城市经济开发区" }] }] }, { value: '350000', label: '福建省', children: [{ value: "350100", label: "福州市", children: [{ value: "350102", label: "鼓楼区" }, { value: "350103", label: "台江区" }, { value: "350104", label: "仓山区" }, { value: "350105", label: "马尾区" }, { value: "350111", label: "晋安区" }, { value: "350121", label: "闽侯县" }, { value: "350122", label: "连江县" }, { value: "350123", label: "罗源县" }, { value: "350124", label: "闽清县" }, { value: "350125", label: "永泰县" }, { value: "350128", label: "平潭县" }, { value: "350181", label: "福清市" }, { value: "350182", label: "长乐市" }] }, { value: "350200", label: "厦门市", children: [{ value: "350203", label: "思明区" }, { value: "350205", label: "海沧区" }, { value: "350206", label: "湖里区" }, { value: "350211", label: "集美区" }, { value: "350212", label: "同安区" }, { value: "350213", label: "翔安区" }] }, { value: "350300", label: "莆田市", children: [{ value: "350302", label: "城厢区" }, { value: "350303", label: "涵江区" }, { value: "350304", label: "荔城区" }, { value: "350305", label: "秀屿区" }, { value: "350322", label: "仙游县" }] }, { value: "350400", label: "三明市", children: [{ value: "350402", label: "梅列区" }, { value: "350403", label: "三元区" }, { value: "350421", label: "明溪县" }, { value: "350423", label: "清流县" }, { value: "350424", label: "宁化县" }, { value: "350425", label: "大田县" }, { value: "350426", label: "尤溪县" }, { value: "350427", label: "沙县" }, { value: "350428", label: "将乐县" }, { value: "350429", label: "泰宁县" }, { value: "350430", label: "建宁县" }, { value: "350481", label: "永安市" }] }, { value: "350500", label: "泉州市", children: [{ value: "350502", label: "鲤城区" }, { value: "350503", label: "丰泽区" }, { value: "350504", label: "洛江区" }, { value: "350505", label: "泉港区" }, { value: "350521", label: "惠安县" }, { value: "350524", label: "安溪县" }, { value: "350525", label: "永春县" }, { value: "350526", label: "德化县" }, { value: "350527", label: "金门县" }, { value: "350581", label: "石狮市" }, { value: "350582", label: "晋江市" }, { value: "350583", label: "南安市" }] }, { value: "350600", label: "漳州市", children: [{ value: "350602", label: "芗城区" }, { value: "350603", label: "龙文区" }, { value: "350622", label: "云霄县" }, { value: "350623", label: "漳浦县" }, { value: "350624", label: "诏安县" }, { value: "350625", label: "长泰县" }, { value: "350626", label: "东山县" }, { value: "350627", label: "南靖县" }, { value: "350628", label: "平和县" }, { value: "350629", label: "华安县" }, { value: "350681", label: "龙海市" }] }, { value: "350700", label: "南平市", children: [{ value: "350702", label: "延平区" }, { value: "350721", label: "顺昌县" }, { value: "350722", label: "浦城县" }, { value: "350723", label: "光泽县" }, { value: "350724", label: "松溪县" }, { value: "350725", label: "政和县" }, { value: "350781", label: "邵武市" }, { value: "350782", label: "武夷山市" }, { value: "350783", label: "建瓯市" }, { value: "350703", label: "建阳区" }] }, { value: "350800", label: "龙岩市", children: [{ value: "350802", label: "新罗区" }, { value: "350821", label: "长汀县" }, { value: "350803", label: "永定区" }, { value: "350823", label: "上杭县" }, { value: "350824", label: "武平县" }, { value: "350825", label: "连城县" }, { value: "350881", label: "漳平市" }] }, { value: "350900", label: "宁德市", children: [{ value: "350902", label: "蕉城区" }, { value: "350921", label: "霞浦县" }, { value: "350922", label: "古田县" }, { value: "350923", label: "屏南县" }, { value: "350924", label: "寿宁县" }, { value: "350925", label: "周宁县" }, { value: "350926", label: "柘荣县" }, { value: "350981", label: "福安市" }, { value: "350982", label: "福鼎市" }] }] }, { value: '360000', label: '江西省', children: [{ value: "360100", label: "南昌市", children: [{ value: "360102", label: "东湖区" }, { value: "360103", label: "西湖区" }, { value: "360104", label: "青云谱区" }, { value: "360105", label: "湾里区" }, { value: "360111", label: "青山湖区" }, { value: "360121", label: "南昌县" }, { value: "360112", label: "新建区" }, { value: "360123", label: "安义县" }, { value: "360124", label: "进贤县" }] }, { value: "360200", label: "景德镇市", children: [{ value: "360202", label: "昌江区" }, { value: "360203", label: "珠山区" }, { value: "360222", label: "浮梁县" }, { value: "360281", label: "乐平市" }] }, { value: "360300", label: "萍乡市", children: [{ value: "360302", label: "安源区" }, { value: "360313", label: "湘东区" }, { value: "360321", label: "莲花县" }, { value: "360322", label: "上栗县" }, { value: "360323", label: "芦溪县" }] }, { value: "360400", label: "九江市", children: [{ value: "360402", label: "濂溪区" }, { value: "360403", label: "浔阳区" }, { value: "360404", label: "柴桑区" }, { value: "360423", label: "武宁县" }, { value: "360424", label: "修水县" }, { value: "360425", label: "永修县" }, { value: "360426", label: "德安县" }, { value: "360428", label: "都昌县" }, { value: "360429", label: "湖口县" }, { value: "360430", label: "彭泽县" }, { value: "360481", label: "瑞昌市" }, { value: "360482", label: "共青城市" }, { value: "360483", label: "庐山市" }] }, { value: "360500", label: "新余市", children: [{ value: "360502", label: "渝水区" }, { value: "360521", label: "分宜县" }] }, { value: "360600", label: "鹰潭市", children: [{ value: "360602", label: "月湖区" }, { value: "360622", label: "余江县" }, { value: "360681", label: "贵溪市" }] }, { value: "360700", label: "赣州市", children: [{ value: "360702", label: "章贡区" }, { value: "360704", label: "赣县区" }, { value: "360722", label: "信丰县" }, { value: "360723", label: "大余县" }, { value: "360724", label: "上犹县" }, { value: "360725", label: "崇义县" }, { value: "360726", label: "安远县" }, { value: "360727", label: "龙南县" }, { value: "360728", label: "定南县" }, { value: "360729", label: "全南县" }, { value: "360730", label: "宁都县" }, { value: "360731", label: "于都县" }, { value: "360732", label: "兴国县" }, { value: "360733", label: "会昌县" }, { value: "360734", label: "寻乌县" }, { value: "360735", label: "石城县" }, { value: "360781", label: "瑞金市" }, { value: "360703", label: "南康区" }] }, { value: "360800", label: "吉安市", children: [{ value: "360802", label: "吉州区" }, { value: "360803", label: "青原区" }, { value: "360821", label: "吉安县" }, { value: "360822", label: "吉水县" }, { value: "360823", label: "峡江县" }, { value: "360824", label: "新干县" }, { value: "360825", label: "永丰县" }, { value: "360826", label: "泰和县" }, { value: "360827", label: "遂川县" }, { value: "360828", label: "万安县" }, { value: "360829", label: "安福县" }, { value: "360830", label: "永新县" }, { value: "360881", label: "井冈山市" }] }, { value: "360900", label: "宜春市", children: [{ value: "360902", label: "袁州区" }, { value: "360921", label: "奉新县" }, { value: "360922", label: "万载县" }, { value: "360923", label: "上高县" }, { value: "360924", label: "宜丰县" }, { value: "360925", label: "靖安县" }, { value: "360926", label: "铜鼓县" }, { value: "360981", label: "丰城市" }, { value: "360982", label: "樟树市" }, { value: "360983", label: "高安市" }] }, { value: "361000", label: "抚州市", children: [{ value: "361002", label: "临川区" }, { value: "361021", label: "南城县" }, { value: "361022", label: "黎川县" }, { value: "361023", label: "南丰县" }, { value: "361024", label: "崇仁县" }, { value: "361025", label: "乐安县" }, { value: "361026", label: "宜黄县" }, { value: "361027", label: "金溪县" }, { value: "361028", label: "资溪县" }, { value: "361003", label: "东乡区" }, { value: "361030", label: "广昌县" }] }, { value: "361100", label: "上饶市", children: [{ value: "361102", label: "信州区" }, { value: "361121", label: "上饶县" }, { value: "361103", label: "广丰区" }, { value: "361123", label: "玉山县" }, { value: "361124", label: "铅山县" }, { value: "361125", label: "横峰县" }, { value: "361126", label: "弋阳县" }, { value: "361127", label: "余干县" }, { value: "361128", label: "鄱阳县" }, { value: "361129", label: "万年县" }, { value: "361130", label: "婺源县" }, { value: "361181", label: "德兴市" }] }] }, { value: '370000', label: '山东省', children: [{ value: "370100", label: "济南市", children: [{ value: "370102", label: "历下区" }, { value: "370103", label: "市中区" }, { value: "370104", label: "槐荫区" }, { value: "370105", label: "天桥区" }, { value: "370112", label: "历城区" }, { value: "370113", label: "长清区" }, { value: "370124", label: "平阴县" }, { value: "370125", label: "济阳县" }, { value: "370126", label: "商河县" }, { value: "370114", label: "章丘区" }, { value: "370171", label: "济南高新技术产业开发区" }] }, { value: "370200", label: "青岛市", children: [{ value: "370202", label: "市南区" }, { value: "370203", label: "市北区" }, { value: "370211", label: "黄岛区" }, { value: "370212", label: "崂山区" }, { value: "370213", label: "李沧区" }, { value: "370214", label: "城阳区" }, { value: "370281", label: "胶州市" }, { value: "370215", label: "即墨区" }, { value: "370283", label: "平度市" }, { value: "370285", label: "莱西市" }, { value: "370271", label: "青岛高新技术产业开发区" }] }, { value: "370300", label: "淄博市", children: [{ value: "370302", label: "淄川区" }, { value: "370303", label: "张店区" }, { value: "370304", label: "博山区" }, { value: "370305", label: "临淄区" }, { value: "370306", label: "周村区" }, { value: "370321", label: "桓台县" }, { value: "370322", label: "高青县" }, { value: "370323", label: "沂源县" }] }, { value: "370400", label: "枣庄市", children: [{ value: "370402", label: "市中区" }, { value: "370403", label: "薛城区" }, { value: "370404", label: "峄城区" }, { value: "370405", label: "台儿庄区" }, { value: "370406", label: "山亭区" }, { value: "370481", label: "滕州市" }] }, { value: "370500", label: "东营市", children: [{ value: "370502", label: "东营区" }, { value: "370503", label: "河口区" }, { value: "370521", label: "垦利县" }, { value: "370522", label: "利津县" }, { value: "370523", label: "广饶县" }, { value: "370589", label: "西城区" }, { value: "370571", label: "东营经济技术开发区" }, { value: "370572", label: "东营港经济开发区" }] }, { value: "370600", label: "烟台市", children: [{ value: "370602", label: "芝罘区" }, { value: "370611", label: "福山区" }, { value: "370612", label: "牟平区" }, { value: "370613", label: "莱山区" }, { value: "370634", label: "长岛县" }, { value: "370681", label: "龙口市" }, { value: "370682", label: "莱阳市" }, { value: "370683", label: "莱州市" }, { value: "370684", label: "蓬莱市" }, { value: "370685", label: "招远市" }, { value: "370686", label: "栖霞市" }, { value: "370687", label: "海阳市" }, { value: "370671", label: "烟台高新技术产业开发区" }, { value: "370672", label: "烟台经济技术开发区" }] }, { value: "370700", label: "潍坊市", children: [{ value: "370702", label: "潍城区" }, { value: "370703", label: "寒亭区" }, { value: "370704", label: "坊子区" }, { value: "370705", label: "奎文区" }, { value: "370724", label: "临朐县" }, { value: "370725", label: "昌乐县" }, { value: "370772", label: "潍坊滨海经济技术开发区" }, { value: "370781", label: "青州市" }, { value: "370782", label: "诸城市" }, { value: "370783", label: "寿光市" }, { value: "370784", label: "安丘市" }, { value: "370785", label: "高密市" }, { value: "370786", label: "昌邑市" }] }, { value: "370800", label: "济宁市", children: [{ value: "370811", label: "任城区" }, { value: "370826", label: "微山县" }, { value: "370827", label: "鱼台县" }, { value: "370828", label: "金乡县" }, { value: "370829", label: "嘉祥县" }, { value: "370830", label: "汶上县" }, { value: "370831", label: "泗水县" }, { value: "370832", label: "梁山县" }, { value: "370881", label: "曲阜市" }, { value: "370812", label: "兖州区" }, { value: "370883", label: "邹城市" }, { value: "370871", label: "济宁高新技术产业开发区" }] }, { value: "370900", label: "泰安市", children: [{ value: "370902", label: "泰山区" }, { value: "370903", label: "岱岳区" }, { value: "370921", label: "宁阳县" }, { value: "370923", label: "东平县" }, { value: "370982", label: "新泰市" }, { value: "370983", label: "肥城市" }] }, { value: "371000", label: "威海市", children: [{ value: "371002", label: "环翠区" }, { value: "371003", label: "文登区" }, { value: "371082", label: "荣成市" }, { value: "371083", label: "乳山市" }, { value: "371071", label: "威海火炬高技术产业开发区" }, { value: "371072", label: "威海经济技术开发区" }, { value: "371073", label: "威海临港经济技术开发区" }] }, { value: "371100", label: "日照市", children: [{ value: "371102", label: "东港区" }, { value: "371103", label: "岚山区" }, { value: "371121", label: "五莲县" }, { value: "371122", label: "莒县" }, { value: "371171", label: "日照经济技术开发区" }, { value: "371172", label: "日照国际海洋城" }] }, { value: "371200", label: "莱芜市", children: [{ value: "371202", label: "莱城区" }, { value: "371203", label: "钢城区" }] }, { value: "371300", label: "临沂市", children: [{ value: "371302", label: "兰山区" }, { value: "371311", label: "罗庄区" }, { value: "371312", label: "河东区" }, { value: "371321", label: "沂南县" }, { value: "371322", label: "郯城县" }, { value: "371323", label: "沂水县" }, { value: "371324", label: "兰陵县" }, { value: "371325", label: "费县" }, { value: "371326", label: "平邑县" }, { value: "371327", label: "莒南县" }, { value: "371328", label: "蒙阴县" }, { value: "371329", label: "临沭县" }, { value: "371371", label: "临沂高新技术产业开发区" }, { value: "371373", label: "临沂临港经济开发区" }, { value: "371372", label: "临沂经济技术开发区" }] }, { value: "371400", label: "德州市", children: [{ value: "371402", label: "德城区" }, { value: "371403", label: "陵城区" }, { value: "371422", label: "宁津县" }, { value: "371423", label: "庆云县" }, { value: "371424", label: "临邑县" }, { value: "371425", label: "齐河县" }, { value: "371426", label: "平原县" }, { value: "371427", label: "夏津县" }, { value: "371428", label: "武城县" }, { value: "371481", label: "乐陵市" }, { value: "371482", label: "禹城市" }, { value: "371471", label: "德州经济技术开发区" }, { value: "371472", label: "德州运河经济开发区" }] }, { value: "371500", label: "聊城市", children: [{ value: "371502", label: "东昌府区" }, { value: "371521", label: "阳谷县" }, { value: "371522", label: "莘县" }, { value: "371523", label: "茌平县" }, { value: "371524", label: "东阿县" }, { value: "371525", label: "冠县" }, { value: "371526", label: "高唐县" }, { value: "371581", label: "临清市" }] }, { value: "371600", label: "滨州市", children: [{ value: "371602", label: "滨城区" }, { value: "371621", label: "惠民县" }, { value: "371622", label: "阳信县" }, { value: "371623", label: "无棣县" }, { value: "371603", label: "沾化区" }, { value: "371625", label: "博兴县" }, { value: "371626", label: "邹平县" }] }, { value: "371700", label: "菏泽市", children: [{ value: "371702", label: "牡丹区" }, { value: "371721", label: "曹县" }, { value: "371722", label: "单县" }, { value: "371723", label: "成武县" }, { value: "371724", label: "巨野县" }, { value: "371725", label: "郓城县" }, { value: "371726", label: "鄄城县" }, { value: "371727", label: "定陶区" }, { value: "371728", label: "东明县" }, { value: "371771", label: "菏泽经济技术开发区" }, { value: "371772", label: "菏泽高新技术开发区" }] }] }, { value: '410000', label: '河南省', children: [{ value: "410100", label: "郑州市", children: [{ value: "410102", label: "中原区" }, { value: "410103", label: "二七区" }, { value: "410104", label: "管城回族区" }, { value: "410105", label: "金水区" }, { value: "410106", label: "上街区" }, { value: "410108", label: "惠济区" }, { value: "410122", label: "中牟县" }, { value: "410181", label: "巩义市" }, { value: "410182", label: "荥阳市" }, { value: "410183", label: "新密市" }, { value: "410184", label: "新郑市" }, { value: "410185", label: "登封市" }, { value: "410171", label: "郑州经济技术开发区" }, { value: "410172", label: "郑州高新技术产业开发区" }, { value: "410173", label: "郑州航空港经济综合实验区" }] }, { value: "410200", label: "开封市", children: [{ value: "410202", label: "龙亭区" }, { value: "410203", label: "顺河回族区" }, { value: "410204", label: "鼓楼区" }, { value: "410205", label: "禹王台区" }, { value: "410211", label: "金明区" }, { value: "410221", label: "杞县" }, { value: "410222", label: "通许县" }, { value: "410223", label: "尉氏县" }, { value: "410225", label: "兰考县" }, { value: "410212", label: "祥符区" }] }, { value: "410300", label: "洛阳市", children: [{ value: "410302", label: "老城区" }, { value: "410303", label: "西工区" }, { value: "410304", label: "廛河回族区" }, { value: "410305", label: "涧西区" }, { value: "410306", label: "吉利区" }, { value: "410307", label: "洛龙区" }, { value: "410322", label: "孟津县" }, { value: "410323", label: "新安县" }, { value: "410324", label: "栾川县" }, { value: "410325", label: "嵩县" }, { value: "410326", label: "汝阳县" }, { value: "410327", label: "宜阳县" }, { value: "410328", label: "洛宁县" }, { value: "410329", label: "伊川县" }, { value: "410381", label: "偃师市" }, { value: "410371", label: "洛阳高新技术产业开发区" }, { value: "471005", label: "其它区" }] }, { value: "410400", label: "平顶山市", children: [{ value: "410402", label: "新华区" }, { value: "410403", label: "卫东区" }, { value: "410404", label: "石龙区" }, { value: "410411", label: "湛河区" }, { value: "410421", label: "宝丰县" }, { value: "410422", label: "叶县" }, { value: "410423", label: "鲁山县" }, { value: "410425", label: "郏县" }, { value: "410481", label: "舞钢市" }, { value: "410482", label: "汝州市" }, { value: "410471", label: "平顶山高新技术产业开发区" }, { value: "410472", label: "平顶山市新城区" }] }, { value: "410500", label: "安阳市", children: [{ value: "410502", label: "文峰区" }, { value: "410503", label: "北关区" }, { value: "410505", label: "殷都区" }, { value: "410506", label: "龙安区" }, { value: "410522", label: "安阳县" }, { value: "410523", label: "汤阴县" }, { value: "410526", label: "滑县" }, { value: "410527", label: "内黄县" }, { value: "410581", label: "林州市" }, { value: "410571", label: "安阳高新技术产业开发区" }] }, { value: "410600", label: "鹤壁市", children: [{ value: "410602", label: "鹤山区" }, { value: "410603", label: "山城区" }, { value: "410611", label: "淇滨区" }, { value: "410621", label: "浚县" }, { value: "410622", label: "淇县" }, { value: "410671", label: "鹤壁经济技术开发区" }] }, { value: "410700", label: "新乡市", children: [{ value: "410702", label: "红旗区" }, { value: "410703", label: "卫滨区" }, { value: "410704", label: "凤泉区" }, { value: "410711", label: "牧野区" }, { value: "410721", label: "新乡县" }, { value: "410724", label: "获嘉县" }, { value: "410725", label: "原阳县" }, { value: "410726", label: "延津县" }, { value: "410727", label: "封丘县" }, { value: "410728", label: "长垣县" }, { value: "410781", label: "卫辉市" }, { value: "410782", label: "辉县市" }, { value: "410771", label: "新乡高新技术产业开发区" }, { value: "410773", label: "新乡市平原城乡一体化示范区" }, { value: "410772", label: "新乡经济技术开发区" }] }, { value: "410800", label: "焦作市", children: [{ value: "410802", label: "解放区" }, { value: "410803", label: "中站区" }, { value: "410804", label: "马村区" }, { value: "410811", label: "山阳区" }, { value: "410821", label: "修武县" }, { value: "410822", label: "博爱县" }, { value: "410823", label: "武陟县" }, { value: "410825", label: "温县" }, { value: "410882", label: "沁阳市" }, { value: "410883", label: "孟州市" }, { value: "410871", label: "焦作城乡一体化示范区" }] }, { value: "410900", label: "濮阳市", children: [{ value: "410902", label: "华龙区" }, { value: "410922", label: "清丰县" }, { value: "410923", label: "南乐县" }, { value: "410926", label: "范县" }, { value: "410927", label: "台前县" }, { value: "410928", label: "濮阳县" }, { value: "410971", label: "河南濮阳工业园区" }, { value: "410972", label: "濮阳经济技术开发区" }] }, { value: "411000", label: "许昌市", children: [{ value: "411002", label: "魏都区" }, { value: "411003", label: "建安区" }, { value: "411024", label: "鄢陵县" }, { value: "411025", label: "襄城县" }, { value: "411081", label: "禹州市" }, { value: "411082", label: "长葛市" }, { value: "411071", label: "许昌经济技术开发区" }] }, { value: "411100", label: "漯河市", children: [{ value: "411102", label: "源汇区" }, { value: "411103", label: "郾城区" }, { value: "411104", label: "召陵区" }, { value: "411121", label: "舞阳县" }, { value: "411122", label: "临颍县" }, { value: "411171", label: "漯河经济技术开发区" }] }, { value: "411200", label: "三门峡市", children: [{ value: "411202", label: "湖滨区" }, { value: "411221", label: "渑池县" }, { value: "411222", label: "陕县" }, { value: "411224", label: "卢氏县" }, { value: "411281", label: "义马市" }, { value: "411282", label: "灵宝市" }, { value: "411203", label: "陕州区" }, { value: "411271", label: "河南三门峡经济开发区" }] }, { value: "411300", label: "南阳市", children: [{ value: "411302", label: "宛城区" }, { value: "411303", label: "卧龙区" }, { value: "411321", label: "南召县" }, { value: "411322", label: "方城县" }, { value: "411323", label: "西峡县" }, { value: "411324", label: "镇平县" }, { value: "411325", label: "内乡县" }, { value: "411326", label: "淅川县" }, { value: "411327", label: "社旗县" }, { value: "411328", label: "唐河县" }, { value: "411329", label: "新野县" }, { value: "411330", label: "桐柏县" }, { value: "411381", label: "邓州市" }, { value: "411371", label: "南阳高新技术产业开发区" }, { value: "411372", label: "南阳市城乡一体化示范区" }] }, { value: "411400", label: "商丘市", children: [{ value: "411402", label: "梁园区" }, { value: "411403", label: "睢阳区" }, { value: "411421", label: "民权县" }, { value: "411422", label: "睢县" }, { value: "411423", label: "宁陵县" }, { value: "411424", label: "柘城县" }, { value: "411425", label: "虞城县" }, { value: "411426", label: "夏邑县" }, { value: "411481", label: "永城市" }, { value: "411471", label: "豫东综合物流产业聚集区" }, { value: "411472", label: "河南商丘经济开发" }] }, { value: "411500", label: "信阳市", children: [{ value: "411502", label: "浉河区" }, { value: "411503", label: "平桥区" }, { value: "411521", label: "罗山县" }, { value: "411522", label: "光山县" }, { value: "411523", label: "新县" }, { value: "411524", label: "商城县" }, { value: "411525", label: "固始县" }, { value: "411526", label: "潢川县" }, { value: "411527", label: "淮滨县" }, { value: "411528", label: "息县" }, { value: "411571", label: "信阳高新技术产业开发区" }] }, { value: "411600", label: "周口市", children: [{ value: "411602", label: "川汇区" }, { value: "411621", label: "扶沟县" }, { value: "411622", label: "西华县" }, { value: "411623", label: "商水县" }, { value: "411624", label: "沈丘县" }, { value: "411625", label: "郸城县" }, { value: "411626", label: "淮阳县" }, { value: "411627", label: "太康县" }, { value: "411628", label: "鹿邑县" }, { value: "411681", label: "项城市" }, { value: "411671", label: "河南周口经济开发区" }] }, { value: "411700", label: "驻马店市", children: [{ value: "411702", label: "驿城区" }, { value: "411721", label: "西平县" }, { value: "411722", label: "上蔡县" }, { value: "411723", label: "平舆县" }, { value: "411724", label: "正阳县" }, { value: "411725", label: "确山县" }, { value: "411726", label: "泌阳县" }, { value: "411727", label: "汝南县" }, { value: "411628", label: "遂平县" }, { value: "411729", label: "新蔡县" }, { value: "411771", label: "河南驻马店经济开发区" }] }] }, { value: '420000', label: '湖北省', children: [{ value: "420100", label: "武汉市", children: [{ value: "420101", label: "市辖区" }, { value: "420102", label: "江岸区" }, { value: "420103", label: "江汉区" }, { value: "420104", label: "硚口区" }, { value: "420105", label: "汉阳区" }, { value: "420106", label: "武昌区" }, { value: "420107", label: "青山区" }, { value: "420111", label: "洪山区" }, { value: "420112", label: "东西湖区" }, { value: "420113", label: "汉南区" }, { value: "420114", label: "蔡甸区" }, { value: "420115", label: "江夏区" }, { value: "420116", label: "黄陂区" }, { value: "420117", label: "新洲区" }] }, { value: "420200", label: "黄石市", children: [{ value: "420201", label: "市辖区" }, { value: "420202", label: "黄石港区" }, { value: "420203", label: "西塞山区" }, { value: "420204", label: "下陆区" }, { value: "420205", label: "铁山区" }, { value: "420222", label: "阳新县" }, { value: "420281", label: "大冶市" }] }, { value: "420300", label: "十堰市", children: [{ value: "420301", label: "市辖区" }, { value: "420302", label: "茅箭区" }, { value: "420303", label: "张湾区" }, { value: "420304", label: "郧阳区" }, { value: "420322", label: "郧西县" }, { value: "420323", label: "竹山县" }, { value: "420324", label: "竹溪县" }, { value: "420325", label: "房县" }, { value: "420381", label: "丹江口市" }] }, { value: "420500", label: "宜昌市", children: [{ value: "420501", label: "市辖区" }, { value: "420502", label: "西陵区" }, { value: "420503", label: "伍家岗区" }, { value: "420504", label: "点军区" }, { value: "420505", label: "猇亭区" }, { value: "420506", label: "夷陵区" }, { value: "420525", label: "远安县" }, { value: "420526", label: "兴山县" }, { value: "420527", label: "秭归县" }, { value: "420528", label: "长阳土家族自治县" }, { value: "420529", label: "五峰土家族自治县" }, { value: "420581", label: "宜都市" }, { value: "420582", label: "当阳市" }, { value: "420583", label: "枝江市" }] }, { value: "420600", label: "襄阳市", children: [{ value: "420601", label: "市辖区" }, { value: "420602", label: "襄城区" }, { value: "420606", label: "樊城区" }, { value: "420607", label: "襄州区" }, { value: "420624", label: "南漳县" }, { value: "420625", label: "谷城县" }, { value: "420626", label: "保康县" }, { value: "420682", label: "老河口市" }, { value: "420683", label: "枣阳市" }, { value: "420684", label: "宜城市" }] }, { value: "420700", label: "鄂州市", children: [{ value: "420701", label: "市辖区" }, { value: "420702", label: "梁子湖区" }, { value: "420703", label: "华容区" }, { value: "420704", label: "鄂城区" }] }, { value: "420800", label: "荆门市", children: [{ value: "420801", label: "市辖区" }, { value: "420802", label: "东宝区" }, { value: "420804", label: "掇刀区" }, { value: "420821", label: "京山县" }, { value: "420822", label: "沙洋县" }, { value: "420881", label: "钟祥市" }] }, { value: "420900", label: "孝感市", children: [{ value: "420901", label: "市辖区" }, { value: "420902", label: "孝南区" }, { value: "420921", label: "孝昌县" }, { value: "420922", label: "大悟县" }, { value: "420923", label: "云梦县" }, { value: "420981", label: "应城市" }, { value: "420982", label: "安陆市" }, { value: "420984", label: "汉川市" }] }, { value: "421000", label: "荆州市", children: [{ value: "421001", label: "市辖区" }, { value: "421002", label: "沙市区" }, { value: "421003", label: "荆州区" }, { value: "421022", label: "公安县" }, { value: "421023", label: "监利县" }, { value: "421024", label: "江陵县" }, { value: "421071", label: "荆州经济技术开发区" }, { value: "421081", label: "石首市" }, { value: "421083", label: "洪湖市" }, { value: "421087", label: "松滋市" }] }, { value: "421100", label: "黄冈市", children: [{ value: "421101", label: "市辖区" }, { value: "421102", label: "黄州区" }, { value: "421121", label: "团风县" }, { value: "421122", label: "红安县" }, { value: "421123", label: "罗田县" }, { value: "421124", label: "英山县" }, { value: "421125", label: "浠水县" }, { value: "421126", label: "蕲春县" }, { value: "421127", label: "黄梅县" }, { value: "421171", label: "龙感湖管理区" }, { value: "421181", label: "麻城市" }, { value: "421182", label: "武穴市" }] }, { value: "421200", label: "咸宁市", children: [{ value: "421201", label: "市辖区" }, { value: "421202", label: "咸安区" }, { value: "421221", label: "嘉鱼县" }, { value: "421222", label: "通城县" }, { value: "421223", label: "崇阳县" }, { value: "421224", label: "通山县" }, { value: "421281", label: "赤壁市" }] }, { value: "421300", label: "随州市", children: [{ value: "421301", label: "市辖区" }, { value: "421303", label: "曾都区" }, { value: "421321", label: "随县" }, { value: "421381", label: "广水市" }] }, { value: "422800", label: "恩施土家族苗族自治州", children: [{ value: "422801", label: "恩施市" }, { value: "422802", label: "利川市" }, { value: "422822", label: "建始县" }, { value: "422823", label: "巴东县" }, { value: "422825", label: "宣恩县" }, { value: "422826", label: "咸丰县" }, { value: "422827", label: "来凤县" }, { value: "422828", label: "鹤峰县" }] }, { value: "429000", label: "省直辖县级行政区划", children: [{ value: "429004", label: "仙桃市" }, { value: "429005", label: "潜江市" }, { value: "429006", label: "天门市" }, { value: "429021", label: "神农架林区" }] }] }, { value: '430000', label: '湖南省', children: [{ value: "430100", label: "长沙市", children: [{ value: "430101", label: "市辖区" }, { value: "430102", label: "芙蓉区" }, { value: "430103", label: "天心区" }, { value: "430104", label: "岳麓区" }, { value: "430105", label: "开福区" }, { value: "430111", label: "雨花区" }, { value: "430112", label: "望城区" }, { value: "430121", label: "长沙县" }, { value: "430181", label: "浏阳市" }, { value: "430182", label: "宁乡市" }] }, { value: "430200", label: "株洲市", children: [{ value: "430201", label: "市辖区" }, { value: "430202", label: "荷塘区" }, { value: "430203", label: "芦淞区" }, { value: "430204", label: "石峰区" }, { value: "430211", label: "天元区" }, { value: "430221", label: "株洲县" }, { value: "430223", label: "攸县" }, { value: "430224", label: "茶陵县" }, { value: "430225", label: "炎陵县" }, { value: "430271", label: "云龙示范区" }, { value: "430281", label: "醴陵市" }] }, { value: "430300", label: "湘潭市", children: [{ value: "430301", label: "市辖区" }, { value: "430302", label: "雨湖区" }, { value: "430304", label: "岳塘区" }, { value: "430321", label: "湘潭县" }, { value: "430371", label: "湖南湘潭高新技术产业园区" }, { value: "430372", label: "湘潭昭山示范区" }, { value: "430373", label: "湘潭九华示范区" }, { value: "430381", label: "湘乡市" }, { value: "430382", label: "韶山市" }] }, { value: "430400", label: "衡阳市", children: [{ value: "430401", label: "市辖区" }, { value: "430405", label: "珠晖区" }, { value: "430406", label: "雁峰区" }, { value: "430407", label: "石鼓区" }, { value: "430408", label: "蒸湘区" }, { value: "430412", label: "南岳区" }, { value: "430421", label: "衡阳县" }, { value: "430422", label: "衡南县" }, { value: "430423", label: "衡山县" }, { value: "430424", label: "衡东县" }, { value: "430426", label: "祁东县" }, { value: "430471", label: "衡阳综合保税区" }, { value: "430472", label: "湖南衡阳高新技术产业园区" }, { value: "430473", label: "湖南衡阳松木经济开发区" }, { value: "430481", label: "耒阳市" }, { value: "430482", label: "常宁市" }] }, { value: "430500", label: "邵阳市", children: [{ value: "430501", label: "市辖区" }, { value: "430502", label: "双清区" }, { value: "430503", label: "大祥区" }, { value: "430511", label: "北塔区" }, { value: "430521", label: "邵东县" }, { value: "430522", label: "新邵县" }, { value: "430523", label: "邵阳县" }, { value: "430524", label: "隆回县" }, { value: "430525", label: "洞口县" }, { value: "430527", label: "绥宁县" }, { value: "430528", label: "新宁县" }, { value: "430529", label: "城步苗族自治县" }, { value: "430581", label: "武冈市" }] }, { value: "430600", label: "岳阳市", children: [{ value: "430601", label: "市辖区" }, { value: "430602", label: "岳阳楼区" }, { value: "430603", label: "云溪区" }, { value: "430611", label: "君山区" }, { value: "430621", label: "岳阳县" }, { value: "430623", label: "华容县" }, { value: "430624", label: "湘阴县" }, { value: "430626", label: "平江县" }, { value: "430671", label: "岳阳市屈原管理区" }, { value: "430681", label: "汨罗市" }, { value: "430682", label: "临湘市" }] }, { value: "430700", label: "常德市", children: [{ value: "430701", label: "市辖区" }, { value: "430702", label: "武陵区" }, { value: "430703", label: "鼎城区" }, { value: "430721", label: "安乡县" }, { value: "430722", label: "汉寿县" }, { value: "430723", label: "澧县" }, { value: "430724", label: "临澧县" }, { value: "430725", label: "桃源县" }, { value: "430726", label: "石门县" }, { value: "430771", label: "常德市西洞庭管理区" }, { value: "430781", label: "津市市" }] }, { value: "430800", label: "张家界市", children: [{ value: "430801", label: "市辖区" }, { value: "430802", label: "永定区" }, { value: "430811", label: "武陵源区" }, { value: "430821", label: "慈利县" }, { value: "430822", label: "桑植县" }] }, { value: "430900", label: "益阳市", children: [{ value: "430901", label: "市辖区" }, { value: "430902", label: "资阳区" }, { value: "430903", label: "赫山区" }, { value: "430921", label: "南县" }, { value: "430922", label: "桃江县" }, { value: "430923", label: "安化县" }, { value: "430971", label: "益阳市大通湖管理区" }, { value: "430972", label: "湖南益阳高新技术产业园区" }, { value: "430981", label: "沅江市" }] }, { value: "431000", label: "郴州市", children: [{ value: "431001", label: "市辖区" }, { value: "431002", label: "北湖区" }, { value: "431003", label: "苏仙区" }, { value: "431021", label: "桂阳县" }, { value: "431022", label: "宜章县" }, { value: "431023", label: "永兴县" }, { value: "431024", label: "嘉禾县" }, { value: "431025", label: "临武县" }, { value: "431026", label: "汝城县" }, { value: "431027", label: "桂东县" }, { value: "431028", label: "安仁县" }, { value: "431081", label: "资兴市" }] }, { value: "431100", label: "永州市", children: [{ value: "431101", label: "市辖区" }, { value: "431102", label: "零陵区" }, { value: "431103", label: "冷水滩区" }, { value: "431121", label: "祁阳县" }, { value: "431122", label: "东安县" }, { value: "431123", label: "双牌县" }, { value: "431124", label: "道县" }, { value: "431125", label: "江永县" }, { value: "431126", label: "宁远县" }, { value: "431127", label: "蓝山县" }, { value: "431128", label: "新田县" }, { value: "431129", label: "江华瑶族自治县" }, { value: "431171", label: "永州经济技术开发区" }, { value: "431172", label: "永州市金洞管理区" }, { value: "431173", label: "永州市回龙圩管理区" }] }, { value: "431200", label: "怀化市", children: [{ value: "431201", label: "市辖区" }, { value: "431202", label: "鹤城区" }, { value: "431221", label: "中方县" }, { value: "431222", label: "沅陵县" }, { value: "431223", label: "辰溪县" }, { value: "431224", label: "溆浦县" }, { value: "431225", label: "会同县" }, { value: "431226", label: "麻阳苗族自治县" }, { value: "431227", label: "新晃侗族自治县" }, { value: "431228", label: "芷江侗族自治县" }, { value: "431229", label: "靖州苗族侗族自治县" }, { value: "431230", label: "通道侗族自治县" }, { value: "431271", label: "怀化市洪江管理区" }, { value: "431281", label: "洪江市" }] }, { value: "431300", label: "娄底市", children: [{ value: "431301", label: "市辖区" }, { value: "431302", label: "娄星区" }, { value: "431321", label: "双峰县" }, { value: "431322", label: "新化县" }, { value: "431381", label: "冷水江市" }, { value: "431382", label: "涟源市" }] }, { value: "433100", label: "湘西土家族苗族自治州", children: [{ value: "433101", label: "吉首市" }, { value: "433122", label: "泸溪县" }, { value: "433123", label: "凤凰县" }, { value: "433124", label: "花垣县" }, { value: "433125", label: "保靖县" }, { value: "433126", label: "古丈县" }, { value: "433127", label: "永顺县" }, { value: "433130", label: "龙山县" }, { value: "433172", label: "湖南吉首经济开发区" }, { value: "433173", label: "湖南永顺经济开发区" }] }] }, { value: '440000', label: '广东省', children: [{ value: "440100", label: "广州市", children: [{ value: "440101", label: "市辖区" }, { value: "440103", label: "荔湾区" }, { value: "440104", label: "越秀区" }, { value: "440105", label: "海珠区" }, { value: "440106", label: "天河区" }, { value: "440111", label: "白云区" }, { value: "440112", label: "黄埔区" }, { value: "440113", label: "番禺区" }, { value: "440114", label: "花都区" }, { value: "440115", label: "南沙区" }, { value: "440117", label: "从化区" }, { value: "440118", label: "增城区" }] }, { value: "440200", label: "韶关市", children: [{ value: "440201", label: "市辖区" }, { value: "440203", label: "武江区" }, { value: "440204", label: "浈江区" }, { value: "440205", label: "曲江区" }, { value: "440222", label: "始兴县" }, { value: "440224", label: "仁化县" }, { value: "440229", label: "翁源县" }, { value: "440232", label: "乳源瑶族自治县" }, { value: "440233", label: "新丰县" }, { value: "440281", label: "乐昌市" }, { value: "440282", label: "南雄市" }] }, { value: "440300", label: "深圳市", children: [{ value: "440301", label: "市辖区" }, { value: "440303", label: "罗湖区" }, { value: "440304", label: "福田区" }, { value: "440305", label: "南山区" }, { value: "440306", label: "宝安区" }, { value: "440307", label: "龙岗区" }, { value: "440308", label: "盐田区" }, { value: "440309", label: "龙华区" }, { value: "440310", label: "坪山区" }] }, { value: "440400", label: "珠海市", children: [{ value: "440401", label: "市辖区" }, { value: "440402", label: "香洲区" }, { value: "440403", label: "斗门区" }, { value: "440404", label: "金湾区" }] }, { value: "440500", label: "汕头市", children: [{ value: "440501", label: "市辖区" }, { value: "440507", label: "龙湖区" }, { value: "440511", label: "金平区" }, { value: "440512", label: "濠江区" }, { value: "440513", label: "潮阳区" }, { value: "440514", label: "潮南区" }, { value: "440515", label: "澄海区" }, { value: "440523", label: "南澳县" }] }, { value: "440600", label: "佛山市", children: [{ value: "440601", label: "市辖区" }, { value: "440604", label: "禅城区" }, { value: "440605", label: "南海区" }, { value: "440606", label: "顺德区" }, { value: "440607", label: "三水区" }, { value: "440608", label: "高明区" }] }, { value: "440700", label: "江门市", children: [{ value: "440701", label: "市辖区" }, { value: "440703", label: "蓬江区" }, { value: "440704", label: "江海区" }, { value: "440705", label: "新会区" }, { value: "440781", label: "台山市" }, { value: "440783", label: "开平市" }, { value: "440784", label: "鹤山市" }, { value: "440785", label: "恩平市" }] }, { value: "440800", label: "湛江市", children: [{ value: "440801", label: "市辖区" }, { value: "440802", label: "赤坎区" }, { value: "440803", label: "霞山区" }, { value: "440804", label: "坡头区" }, { value: "440811", label: "麻章区" }, { value: "440823", label: "遂溪县" }, { value: "440825", label: "徐闻县" }, { value: "440881", label: "廉江市" }, { value: "440882", label: "雷州市" }, { value: "440883", label: "吴川市" }] }, { value: "440900", label: "茂名市", children: [{ value: "440901", label: "市辖区" }, { value: "440902", label: "茂南区" }, { value: "440904", label: "电白区" }, { value: "440981", label: "高州市" }, { value: "440982", label: "化州市" }, { value: "440983", label: "信宜市" }] }, { value: "441200", label: "肇庆市", children: [{ value: "441201", label: "市辖区" }, { value: "441202", label: "端州区" }, { value: "441203", label: "鼎湖区" }, { value: "441204", label: "高要区" }, { value: "441223", label: "广宁县" }, { value: "441224", label: "怀集县" }, { value: "441225", label: "封开县" }, { value: "441226", label: "德庆县" }, { value: "441284", label: "四会市" }] }, { value: "441300", label: "惠州市", children: [{ value: "441301", label: "市辖区" }, { value: "441302", label: "惠城区" }, { value: "441303", label: "惠阳区" }, { value: "441322", label: "博罗县" }, { value: "441323", label: "惠东县" }, { value: "441324", label: "龙门县" }] }, { value: "441400", label: "梅州市", children: [{ value: "441401", label: "市辖区" }, { value: "441402", label: "梅江区" }, { value: "441403", label: "梅县区" }, { value: "441422", label: "大埔县" }, { value: "441423", label: "丰顺县" }, { value: "441424", label: "五华县" }, { value: "441426", label: "平远县" }, { value: "441427", label: "蕉岭县" }, { value: "441481", label: "兴宁市" }] }, { value: "441500", label: "汕尾市", children: [{ value: "441501", label: "市辖区" }, { value: "441502", label: "城区" }, { value: "441521", label: "海丰县" }, { value: "441523", label: "陆河县" }, { value: "441581", label: "陆丰市" }] }, { value: "441600", label: "河源市", children: [{ value: "441601", label: "市辖区" }, { value: "441602", label: "源城区" }, { value: "441621", label: "紫金县" }, { value: "441622", label: "龙川县" }, { value: "441623", label: "连平县" }, { value: "441624", label: "和平县" }, { value: "441625", label: "东源县" }] }, { value: "441700", label: "阳江市", children: [{ value: "441701", label: "市辖区" }, { value: "441702", label: "江城区" }, { value: "441704", label: "阳东区" }, { value: "441721", label: "阳西县" }, { value: "441781", label: "阳春市" }] }, { value: "441800", label: "清远市", children: [{ value: "441801", label: "市辖区" }, { value: "441802", label: "清城区" }, { value: "441803", label: "清新区" }, { value: "441821", label: "佛冈县" }, { value: "441823", label: "阳山县" }, { value: "441825", label: "连山壮族瑶族自治县" }, { value: "441826", label: "连南瑶族自治县" }, { value: "441881", label: "英德市" }, { value: "441882", label: "连州市" }] }, { value: "441900", label: "东莞市" }, { value: "442000", label: "中山市" }, { value: "445100", label: "潮州市", children: [{ value: "445101", label: "市辖区" }, { value: "445102", label: "湘桥区" }, { value: "445103", label: "潮安区" }, { value: "445122", label: "饶平县" }] }, { value: "445200", label: "揭阳市", children: [{ value: "445201", label: "市辖区" }, { value: "445202", label: "榕城区" }, { value: "445203", label: "揭东区" }, { value: "445222", label: "揭西县" }, { value: "445224", label: "惠来县" }, { value: "445281", label: "普宁市" }] }, { value: "445300", label: "云浮市", children: [{ value: "445301", label: "市辖区" }, { value: "445302", label: "云城区" }, { value: "445303", label: "云安区" }, { value: "445321", label: "新兴县" }, { value: "445322", label: "郁南县" }, { value: "445381", label: "罗定市" }] }] }, { value: '450000', label: '广西壮族', children: [{ value: "450100", label: "南宁市", children: [{ value: "450101", label: "市辖区" }, { value: "450102", label: "兴宁区" }, { value: "450103", label: "青秀区" }, { value: "450105", label: "江南区" }, { value: "450107", label: "西乡塘区" }, { value: "450108", label: "良庆区" }, { value: "450109", label: "邕宁区" }, { value: "450110", label: "武鸣区" }, { value: "450123", label: "隆安县" }, { value: "450124", label: "马山县" }, { value: "450125", label: "上林县" }, { value: "450126", label: "宾阳县" }, { value: "450127", label: "横县" }] }, { value: "450200", label: "柳州市", children: [{ value: "450201", label: "市辖区" }, { value: "450202", label: "城中区" }, { value: "450203", label: "鱼峰区" }, { value: "450204", label: "柳南区" }, { value: "450205", label: "柳北区" }, { value: "450206", label: "柳江区" }, { value: "450222", label: "柳城县" }, { value: "450223", label: "鹿寨县" }, { value: "450224", label: "融安县" }, { value: "450225", label: "融水苗族自治县" }, { value: "450226", label: "三江侗族自治县" }] }, { value: "450300", label: "桂林市", children: [{ value: "450301", label: "市辖区" }, { value: "450302", label: "秀峰区" }, { value: "450303", label: "叠彩区" }, { value: "450304", label: "象山区" }, { value: "450305", label: "七星区" }, { value: "450311", label: "雁山区" }, { value: "450312", label: "临桂区" }, { value: "450321", label: "阳朔县" }, { value: "450323", label: "灵川县" }, { value: "450324", label: "全州县" }, { value: "450325", label: "兴安县" }, { value: "450326", label: "永福县" }, { value: "450327", label: "灌阳县" }, { value: "450328", label: "龙胜各族自治县" }, { value: "450329", label: "资源县" }, { value: "450330", label: "平乐县" }, { value: "450331", label: "荔浦县" }, { value: "450332", label: "恭城瑶族自治县" }] }, { value: "450400", label: "梧州市", children: [{ value: "450401", label: "市辖区" }, { value: "450403", label: "万秀区" }, { value: "450405", label: "长洲区" }, { value: "450406", label: "龙圩区" }, { value: "450421", label: "苍梧县" }, { value: "450422", label: "藤县" }, { value: "450423", label: "蒙山县" }, { value: "450481", label: "岑溪市" }] }, { value: "450500", label: "北海市", children: [{ value: "450501", label: "市辖区" }, { value: "450502", label: "海城区" }, { value: "450503", label: "银海区" }, { value: "450512", label: "铁山港区" }, { value: "450521", label: "合浦县" }] }, { value: "450600", label: "防城港市", children: [{ value: "450601", label: "市辖区" }, { value: "450602", label: "港口区" }, { value: "450603", label: "防城区" }, { value: "450621", label: "上思县" }, { value: "450681", label: "东兴市" }] }, { value: "450700", label: "钦州市", children: [{ value: "450701", label: "市辖区" }, { value: "450702", label: "钦南区" }, { value: "450703", label: "钦北区" }, { value: "450721", label: "灵山县" }, { value: "450722", label: "浦北县" }] }, { value: "450800", label: "贵港市", children: [{ value: "450801", label: "市辖区" }, { value: "450802", label: "港北区" }, { value: "450803", label: "港南区" }, { value: "450804", label: "覃塘区" }, { value: "450821", label: "平南县" }, { value: "450881", label: "桂平市" }] }, { value: "450900", label: "玉林市", children: [{ value: "450901", label: "市辖区" }, { value: "450902", label: "玉州区" }, { value: "450903", label: "福绵区" }, { value: "450921", label: "容县" }, { value: "450922", label: "陆川县" }, { value: "450923", label: "博白县" }, { value: "450924", label: "兴业县" }, { value: "450981", label: "北流市" }] }, { value: "451000", label: "百色市", children: [{ value: "451001", label: "市辖区" }, { value: "451002", label: "右江区" }, { value: "451021", label: "田阳县" }, { value: "451022", label: "田东县" }, { value: "451023", label: "平果县" }, { value: "451024", label: "德保县" }, { value: "451026", label: "那坡县" }, { value: "451027", label: "凌云县" }, { value: "451028", label: "乐业县" }, { value: "451029", label: "田林县" }, { value: "451030", label: "西林县" }, { value: "451031", label: "隆林各族自治县" }, { value: "451081", label: "靖西市" }] }, { value: "451100", label: "贺州市", children: [{ value: "451101", label: "市辖区" }, { value: "451102", label: "八步区" }, { value: "451103", label: "平桂区" }, { value: "451121", label: "昭平县" }, { value: "451122", label: "钟山县" }, { value: "451123", label: "富川瑶族自治县" }] }, { value: "451200", label: "河池市", children: [{ value: "451201", label: "市辖区" }, { value: "451202", label: "金城江区" }, { value: "451203", label: "宜州区" }, { value: "451221", label: "南丹县" }, { value: "451222", label: "天峨县" }, { value: "451223", label: "凤山县" }, { value: "451224", label: "东兰县" }, { value: "451225", label: "罗城仫佬族自治县" }, { value: "451226", label: "环江毛南族自治县" }, { value: "451227", label: "巴马瑶族自治县" }, { value: "451228", label: "都安瑶族自治县" }, { value: "451229", label: "大化瑶族自治县" }] }, { value: "451300", label: "来宾市", children: [{ value: "451301", label: "市辖区" }, { value: "451302", label: "兴宾区" }, { value: "451321", label: "忻城县" }, { value: "451322", label: "象州县" }, { value: "451323", label: "武宣县" }, { value: "451324", label: "金秀瑶族自治县" }, { value: "451381", label: "合山市" }] }, { value: "451400", label: "崇左市", children: [{ value: "451401", label: "市辖区" }, { value: "451402", label: "江州区" }, { value: "451421", label: "扶绥县" }, { value: "451422", label: "宁明县" }, { value: "451423", label: "龙州县" }, { value: "451424", label: "大新县" }, { value: "451425", label: "天等县" }, { value: "451481", label: "凭祥市" }] }] }, { value: '460000', label: '海南省', children: [{ value: "460100", label: "海口市", children: [{ value: "460101", label: "市辖区" }, { value: "460105", label: "秀英区" }, { value: "460106", label: "龙华区" }, { value: "460107", label: "琼山区" }, { value: "460108", label: "美兰区" }] }, { value: "460200", label: "三亚市", children: [{ value: "460201", label: "市辖区" }, { value: "460202", label: "海棠区" }, { value: "460203", label: "吉阳区" }, { value: "460204", label: "天涯区" }, { value: "460205", label: "崖州区" }] }, { value: "460300", label: "三沙市", children: [{ value: "460321", label: "西沙群岛" }, { value: "460322", label: "南沙群岛" }, { value: "460323", label: "中沙群岛的岛礁及其海域" }] }, { value: "460400", label: "儋州市" }, { value: "469000", label: "省直辖县级行政区划", children: [{ value: "469001", label: "五指山市" }, { value: "469002", label: "琼海市" }, { value: "469005", label: "文昌市" }, { value: "469006", label: "万宁市" }, { value: "469007", label: "东方市" }, { value: "469021", label: "定安县" }, { value: "469022", label: "屯昌县" }, { value: "469023", label: "澄迈县" }, { value: "469024", label: "临高县" }, { value: "469025", label: "白沙黎族自治县" }, { value: "469026", label: "昌江黎族自治县" }, { value: "469027", label: "乐东黎族自治县" }, { value: "469028", label: "陵水黎族自治县" }, { value: "469029", label: "保亭黎族苗族自治县" }, { value: "469030", label: "琼中黎族苗族自治县" }] }] }, { value: '500000', label: '重庆', children: [{ value: "500100", label: "市辖区", children: [{ value: "500101", label: "万州区" }, { value: "500102", label: "涪陵区" }, { value: "500103", label: "渝中区" }, { value: "500104", label: "大渡口区" }, { value: "500105", label: "江北区" }, { value: "500106", label: "沙坪坝区" }, { value: "500107", label: "九龙坡区" }, { value: "500108", label: "南岸区" }, { value: "500109", label: "北碚区" }, { value: "500110", label: "綦江区" }, { value: "500111", label: "大足区" }, { value: "500112", label: "渝北区" }, { value: "500113", label: "巴南区" }, { value: "500114", label: "黔江区" }, { value: "500115", label: "长寿区" }, { value: "500116", label: "江津区" }, { value: "500117", label: "合川区" }, { value: "500118", label: "永川区" }, { value: "500119", label: "南川区" }, { value: "500120", label: "璧山区" }, { value: "500151", label: "铜梁区" }, { value: "500152", label: "潼南区" }, { value: "500153", label: "荣昌区" }, { value: "500154", label: "开州区" }, { value: "500155", label: "梁平区" }, { value: "500156", label: "武隆区" }] }, { value: "500200", label: "县", children: [{ value: "500229", label: "城口县" }, { value: "500230", label: "丰都县" }, { value: "500231", label: "垫江县" }, { value: "500233", label: "忠县" }, { value: "500235", label: "云阳县" }, { value: "500236", label: "奉节县" }, { value: "500237", label: "巫山县" }, { value: "500238", label: "巫溪县" }, { value: "500240", label: "石柱土家族自治县" }, { value: "500241", label: "秀山土家族苗族自治县" }, { value: "500242", label: "酉阳土家族苗族自治县" }, { value: "500243", label: "彭水苗族土家族自治县" }] }] }, { value: '510000', label: '四川省', children: [{ value: "510100", label: "成都市", children: [{ value: "510101", label: "市辖区" }, { value: "510104", label: "锦江区" }, { value: "510105", label: "青羊区" }, { value: "510106", label: "金牛区" }, { value: "510107", label: "武侯区" }, { value: "510108", label: "成华区" }, { value: "510112", label: "龙泉驿区" }, { value: "510113", label: "青白江区" }, { value: "510114", label: "新都区" }, { value: "510115", label: "温江区" }, { value: "510116", label: "双流区" }, { value: "510117", label: "郫都区" }, { value: "510121", label: "金堂县" }, { value: "510129", label: "大邑县" }, { value: "510131", label: "蒲江县" }, { value: "510132", label: "新津县" }, { value: "510181", label: "都江堰市" }, { value: "510182", label: "彭州市" }, { value: "510183", label: "邛崃市" }, { value: "510184", label: "崇州市" }, { value: "510185", label: "简阳市" }] }, { value: "510300", label: "自贡市", children: [{ value: "510301", label: "市辖区" }, { value: "510302", label: "自流井区" }, { value: "510303", label: "贡井区" }, { value: "510304", label: "大安区" }, { value: "510311", label: "沿滩区" }, { value: "510321", label: "荣县" }, { value: "510322", label: "富顺县" }] }, { value: "510400", label: "攀枝花市", children: [{ value: "510401", label: "市辖区" }, { value: "510402", label: "东区" }, { value: "510403", label: "西区" }, { value: "510411", label: "仁和区" }, { value: "510421", label: "米易县" }, { value: "510422", label: "盐边县" }] }, { value: "510500", label: "泸州市", children: [{ value: "510501", label: "市辖区" }, { value: "510502", label: "江阳区" }, { value: "510503", label: "纳溪区" }, { value: "510504", label: "龙马潭区" }, { value: "510521", label: "泸县" }, { value: "510522", label: "合江县" }, { value: "510524", label: "叙永县" }, { value: "510525", label: "古蔺县" }] }, { value: "510600", label: "德阳市", children: [{ value: "510601", label: "市辖区" }, { value: "510603", label: "旌阳区" }, { value: "510604", label: "罗江区" }, { value: "510623", label: "中江县" }, { value: "510681", label: "广汉市" }, { value: "510682", label: "什邡市" }, { value: "510683", label: "绵竹市" }] }, { value: "510700", label: "绵阳市", children: [{ value: "510701", label: "市辖区" }, { value: "510703", label: "涪城区" }, { value: "510704", label: "游仙区" }, { value: "510705", label: "安州区" }, { value: "510722", label: "三台县" }, { value: "510723", label: "盐亭县" }, { value: "510725", label: "梓潼县" }, { value: "510726", label: "北川羌族自治县" }, { value: "510727", label: "平武县" }, { value: "510781", label: "江油市" }] }, { value: "510800", label: "广元市", children: [{ value: "510801", label: "市辖区" }, { value: "510802", label: "利州区" }, { value: "510811", label: "昭化区" }, { value: "510812", label: "朝天区" }, { value: "510821", label: "旺苍县" }, { value: "510822", label: "青川县" }, { value: "510823", label: "剑阁县" }, { value: "510824", label: "苍溪县" }] }, { value: "510900", label: "遂宁市", children: [{ value: "510901", label: "市辖区" }, { value: "510903", label: "船山区" }, { value: "510904", label: "安居区" }, { value: "510921", label: "蓬溪县" }, { value: "510922", label: "射洪县" }, { value: "510923", label: "大英县" }] }, { value: "511000", label: "内江市", children: [{ value: "511001", label: "市辖区" }, { value: "511002", label: "市中区" }, { value: "511011", label: "东兴区" }, { value: "511024", label: "威远县" }, { value: "511025", label: "资中县" }, { value: "511071", label: "内江经济开发区" }, { value: "511083", label: "隆昌市" }] }, { value: "511100", label: "乐山市", children: [{ value: "511101", label: "市辖区" }, { value: "511102", label: "市中区" }, { value: "511111", label: "沙湾区" }, { value: "511112", label: "五通桥区" }, { value: "511113", label: "金口河区" }, { value: "511123", label: "犍为县" }, { value: "511124", label: "井研县" }, { value: "511126", label: "夹江县" }, { value: "511129", label: "沐川县" }, { value: "511132", label: "峨边彝族自治县" }, { value: "511133", label: "马边彝族自治县" }, { value: "511181", label: "峨眉山市" }] }, { value: "511300", label: "南充市", children: [{ value: "511301", label: "市辖区" }, { value: "511302", label: "顺庆区" }, { value: "511303", label: "高坪区" }, { value: "511304", label: "嘉陵区" }, { value: "511321", label: "南部县" }, { value: "511322", label: "营山县" }, { value: "511323", label: "蓬安县" }, { value: "511324", label: "仪陇县" }, { value: "511325", label: "西充县" }, { value: "511381", label: "阆中市" }] }, { value: "511400", label: "眉山市", children: [{ value: "511401", label: "市辖区" }, { value: "511402", label: "东坡区" }, { value: "511403", label: "彭山区" }, { value: "511421", label: "仁寿县" }, { value: "511423", label: "洪雅县" }, { value: "511424", label: "丹棱县" }, { value: "511425", label: "青神县" }] }, { value: "511500", label: "宜宾市", children: [{ value: "511501", label: "市辖区" }, { value: "511502", label: "翠屏区" }, { value: "511503", label: "南溪区" }, { value: "511521", label: "宜宾县" }, { value: "511523", label: "江安县" }, { value: "511524", label: "长宁县" }, { value: "511525", label: "高县" }, { value: "511526", label: "珙县" }, { value: "511527", label: "筠连县" }, { value: "511528", label: "兴文县" }, { value: "511529", label: "屏山县" }] }, { value: "511600", label: "广安市", children: [{ value: "511601", label: "市辖区" }, { value: "511602", label: "广安区" }, { value: "511603", label: "前锋区" }, { value: "511621", label: "岳池县" }, { value: "511622", label: "武胜县" }, { value: "511623", label: "邻水县" }, { value: "511681", label: "华蓥市" }] }, { value: "511700", label: "达州市", children: [{ value: "511701", label: "市辖区" }, { value: "511702", label: "通川区" }, { value: "511703", label: "达川区" }, { value: "511722", label: "宣汉县" }, { value: "511723", label: "开江县" }, { value: "511724", label: "大竹县" }, { value: "511725", label: "渠县" }, { value: "511771", label: "达州经济开发区" }, { value: "511781", label: "万源市" }] }, { value: "511800", label: "雅安市", children: [{ value: "511801", label: "市辖区" }, { value: "511802", label: "雨城区" }, { value: "511803", label: "名山区" }, { value: "511822", label: "荥经县" }, { value: "511823", label: "汉源县" }, { value: "511824", label: "石棉县" }, { value: "511825", label: "天全县" }, { value: "511826", label: "芦山县" }, { value: "511827", label: "宝兴县" }] }, { value: "511900", label: "巴中市", children: [{ value: "511901", label: "市辖区" }, { value: "511902", label: "巴州区" }, { value: "511903", label: "恩阳区" }, { value: "511921", label: "通江县" }, { value: "511922", label: "南江县" }, { value: "511923", label: "平昌县" }, { value: "511971", label: "巴中经济开发区" }] }, { value: "512000", label: "资阳市", children: [{ value: "512001", label: "市辖区" }, { value: "512002", label: "雁江区" }, { value: "512021", label: "安岳县" }, { value: "512022", label: "乐至县" }] }, { value: "513200", label: "阿坝藏族羌族自治州", children: [{ value: "513201", label: "马尔康市" }, { value: "513221", label: "汶川县" }, { value: "513222", label: "理县" }, { value: "513223", label: "茂县" }, { value: "513224", label: "松潘县" }, { value: "513225", label: "九寨沟县" }, { value: "513226", label: "金川县" }, { value: "513227", label: "小金县" }, { value: "513228", label: "黑水县" }, { value: "513230", label: "壤塘县" }, { value: "513231", label: "阿坝县" }, { value: "513232", label: "若尔盖县" }, { value: "513233", label: "红原县" }] }, { value: "513300", label: "甘孜藏族自治州", children: [{ value: "513301", label: "康定市" }, { value: "513322", label: "泸定县" }, { value: "513323", label: "丹巴县" }, { value: "513324", label: "九龙县" }, { value: "513325", label: "雅江县" }, { value: "513326", label: "道孚县" }, { value: "513327", label: "炉霍县" }, { value: "513328", label: "甘孜县" }, { value: "513329", label: "新龙县" }, { value: "513330", label: "德格县" }, { value: "513331", label: "白玉县" }, { value: "513332", label: "石渠县" }, { value: "513333", label: "色达县" }, { value: "513334", label: "理塘县" }, { value: "513335", label: "巴塘县" }, { value: "513336", label: "乡城县" }, { value: "513337", label: "稻城县" }, { value: "513338", label: "得荣县" }] }, { value: "513400", label: "凉山彝族自治州", children: [{ value: "513401", label: "西昌市" }, { value: "513422", label: "木里藏族自治县" }, { value: "513423", label: "盐源县" }, { value: "513424", label: "德昌县" }, { value: "513425", label: "会理县" }, { value: "513426", label: "会东县" }, { value: "513427", label: "宁南县" }, { value: "513428", label: "普格县" }, { value: "513429", label: "布拖县" }, { value: "513430", label: "金阳县" }, { value: "513431", label: "昭觉县" }, { value: "513432", label: "喜德县" }, { value: "513433", label: "冕宁县" }, { value: "513434", label: "越西县" }, { value: "513435", label: "甘洛县" }, { value: "513436", label: "美姑县" }, { value: "513437", label: "雷波县" }] }] }, { value: '520000', label: '贵州省', children: [{ value: "520100", label: "贵阳市", children: [{ value: "520101", label: "市辖区" }, { value: "520102", label: "南明区" }, { value: "520103", label: "云岩区" }, { value: "520111", label: "花溪区" }, { value: "520112", label: "乌当区" }, { value: "520113", label: "白云区" }, { value: "520115", label: "观山湖区" }, { value: "520121", label: "开阳县" }, { value: "520122", label: "息烽县" }, { value: "520123", label: "修文县" }, { value: "520181", label: "清镇市" }] }, { value: "520200", label: "六盘水市", children: [{ value: "520201", label: "钟山区" }, { value: "520203", label: "六枝特区" }, { value: "520221", label: "水城县" }, { value: "520281", label: "盘州市" }] }, { value: "520300", label: "遵义市", children: [{ value: "520301", label: "市辖区" }, { value: "520302", label: "红花岗区" }, { value: "520303", label: "汇川区" }, { value: "520304", label: "播州区" }, { value: "520322", label: "桐梓县" }, { value: "520323", label: "绥阳县" }, { value: "520324", label: "正安县" }, { value: "520325", label: "道真仡佬族苗族自治县" }, { value: "520326", label: "务川仡佬族苗族自治县" }, { value: "520327", label: "凤冈县" }, { value: "520328", label: "湄潭县" }, { value: "520329", label: "余庆县" }, { value: "520330", label: "习水县" }, { value: "520381", label: "赤水市" }, { value: "520382", label: "仁怀市" }] }, { value: "520400", label: "安顺市", children: [{ value: "520401", label: "市辖区" }, { value: "520402", label: "西秀区" }, { value: "520403", label: "平坝区" }, { value: "520422", label: "普定县" }, { value: "520423", label: "镇宁布依族苗族自治县" }, { value: "520424", label: "关岭布依族苗族自治县" }, { value: "520425", label: "紫云苗族布依族自治县" }] }, { value: "520500", label: "毕节市", children: [{ value: "520501", label: "市辖区" }, { value: "520502", label: "七星关区" }, { value: "520521", label: "大方县" }, { value: "520522", label: "黔西县" }, { value: "520523", label: "金沙县" }, { value: "520524", label: "织金县" }, { value: "520525", label: "纳雍县" }, { value: "520526", label: "威宁彝族回族苗族自治县" }, { value: "520527", label: "赫章县" }] }, { value: "520600", label: "铜仁市", children: [{ value: "520601", label: "市辖区" }, { value: "520602", label: "碧江区" }, { value: "520603", label: "万山区" }, { value: "520621", label: "江口县" }, { value: "520622", label: "玉屏侗族自治县" }, { value: "520623", label: "石阡县" }, { value: "520624", label: "思南县" }, { value: "520625", label: "印江土家族苗族自治县" }, { value: "520626", label: "德江县" }, { value: "520627", label: "沿河土家族自治县" }, { value: "520628", label: "松桃苗族自治县" }] }, { value: "522300", label: "黔西南布依族苗族自治州", children: [{ value: "522301", label: "兴义市" }, { value: "522322", label: "兴仁县" }, { value: "522323", label: "普安县" }, { value: "522324", label: "晴隆县" }, { value: "522325", label: "贞丰县" }, { value: "522326", label: "望谟县" }, { value: "522327", label: "册亨县" }, { value: "522328", label: "安龙县" }] }, { value: "522600", label: "黔东南苗族侗族自治州", children: [{ value: "522601", label: "凯里市" }, { value: "522622", label: "黄平县" }, { value: "522623", label: "施秉县" }, { value: "522624", label: "三穗县" }, { value: "522625", label: "镇远县" }, { value: "522626", label: "岑巩县" }, { value: "522627", label: "天柱县" }, { value: "522628", label: "锦屏县" }, { value: "522629", label: "剑河县" }, { value: "522630", label: "台江县" }, { value: "522631", label: "黎平县" }, { value: "522632", label: "榕江县" }, { value: "522633", label: "从江县" }, { value: "522634", label: "雷山县" }, { value: "522635", label: "麻江县" }, { value: "522636", label: "丹寨县" }] }, { value: "522700", label: "黔南布依族苗族自治州", children: [{ value: "522701", label: "都匀市" }, { value: "522702", label: "福泉市" }, { value: "522722", label: "荔波县" }, { value: "522723", label: "贵定县" }, { value: "522725", label: "瓮安县" }, { value: "522726", label: "独山县" }, { value: "522727", label: "平塘县" }, { value: "522728", label: "罗甸县" }, { value: "522729", label: "长顺县" }, { value: "522730", label: "龙里县" }, { value: "522731", label: "惠水县" }, { value: "522732", label: "三都水族自治县" }] }] }, { value: '530000', label: '云南省', children: [{ value: "530100", label: "昆明市", children: [{ value: "530101", label: "市辖区" }, { value: "530102", label: "五华区" }, { value: "530103", label: "盘龙区" }, { value: "530111", label: "官渡区" }, { value: "530112", label: "西山区" }, { value: "530113", label: "东川区" }, { value: "530114", label: "呈贡区" }, { value: "530115", label: "晋宁区" }, { value: "530124", label: "富民县" }, { value: "530125", label: "宜良县" }, { value: "530126", label: "石林彝族自治县" }, { value: "530127", label: "嵩明县" }, { value: "530128", label: "禄劝彝族苗族自治县" }, { value: "530129", label: "寻甸回族彝族自治县" }, { value: "530181", label: "安宁市" }] }, { value: "530300", label: "曲靖市", children: [{ value: "530301", label: "市辖区" }, { value: "530302", label: "麒麟区" }, { value: "530303", label: "沾益区" }, { value: "530321", label: "马龙县" }, { value: "530322", label: "陆良县" }, { value: "530323", label: "师宗县" }, { value: "530324", label: "罗平县" }, { value: "530325", label: "富源县" }, { value: "530326", label: "会泽县" }, { value: "530381", label: "宣威市" }] }, { value: "530400", label: "玉溪市", children: [{ value: "530401", label: "市辖区" }, { value: "530402", label: "红塔区" }, { value: "530403", label: "江川区" }, { value: "530422", label: "澄江县" }, { value: "530423", label: "通海县" }, { value: "530424", label: "华宁县" }, { value: "530425", label: "易门县" }, { value: "530426", label: "峨山彝族自治县" }, { value: "530427", label: "新平彝族傣族自治县" }, { value: "530428", label: "元江哈尼族彝族傣族自治县" }] }, { value: "530500", label: "保山市", children: [{ value: "530501", label: "市辖区" }, { value: "530502", label: "隆阳区" }, { value: "530521", label: "施甸县" }, { value: "530523", label: "龙陵县" }, { value: "530524", label: "昌宁县" }, { value: "530581", label: "腾冲市" }] }, { value: "530600", label: "昭通市", children: [{ value: "530601", label: "市辖区" }, { value: "530602", label: "昭阳区" }, { value: "530621", label: "鲁甸县" }, { value: "530622", label: "巧家县" }, { value: "530623", label: "盐津县" }, { value: "530624", label: "大关县" }, { value: "530625", label: "永善县" }, { value: "530626", label: "绥江县" }, { value: "530627", label: "镇雄县" }, { value: "530628", label: "彝良县" }, { value: "530629", label: "威信县" }, { value: "530630", label: "水富县" }] }, { value: "530700", label: "丽江市", children: [{ value: "530701", label: "市辖区" }, { value: "530702", label: "古城区" }, { value: "530721", label: "玉龙纳西族自治县" }, { value: "530722", label: "永胜县" }, { value: "530723", label: "华坪县" }, { value: "530724", label: "宁蒗彝族自治县" }] }, { value: "530800", label: "普洱市", children: [{ value: "530801", label: "市辖区" }, { value: "530802", label: "思茅区" }, { value: "530821", label: "宁洱哈尼族彝族自治县" }, { value: "530822", label: "墨江哈尼族自治县" }, { value: "530823", label: "景东彝族自治县" }, { value: "530824", label: "景谷傣族彝族自治县" }, { value: "530825", label: "镇沅彝族哈尼族拉祜族自治县" }, { value: "530826", label: "江城哈尼族彝族自治县" }, { value: "530827", label: "孟连傣族拉祜族佤族自治县" }, { value: "530828", label: "澜沧拉祜族自治县" }, { value: "530829", label: "西盟佤族自治县" }] }, { value: "530900", label: "临沧市", children: [{ value: "530901", label: "市辖区" }, { value: "530902", label: "临翔区" }, { value: "530921", label: "凤庆县" }, { value: "530922", label: "云县" }, { value: "530923", label: "永德县" }, { value: "530924", label: "镇康县" }, { value: "530925", label: "双江拉祜族佤族布朗族傣族自治县" }, { value: "530926", label: "耿马傣族佤族自治县" }, { value: "530927", label: "沧源佤族自治县" }] }, { value: "532300", label: "楚雄彝族自治州", children: [{ value: "532301", label: "楚雄市" }, { value: "532322", label: "双柏县" }, { value: "532323", label: "牟定县" }, { value: "532324", label: "南华县" }, { value: "532325", label: "姚安县" }, { value: "532326", label: "大姚县" }, { value: "532327", label: "永仁县" }, { value: "532328", label: "元谋县" }, { value: "532329", label: "武定县" }, { value: "532331", label: "禄丰县" }] }, { value: "532500", label: "红河哈尼族彝族自治州", children: [{ value: "532501", label: "个旧市" }, { value: "532502", label: "开远市" }, { value: "532503", label: "蒙自市" }, { value: "532504", label: "弥勒市" }, { value: "532523", label: "屏边苗族自治县" }, { value: "532524", label: "建水县" }, { value: "532525", label: "石屏县" }, { value: "532527", label: "泸西县" }, { value: "532528", label: "元阳县" }, { value: "532529", label: "红河县" }, { value: "532530", label: "金平苗族瑶族傣族自治县" }, { value: "532531", label: "绿春县" }, { value: "532532", label: "河口瑶族自治县" }] }, { value: "532600", label: "文山壮族苗族自治州", children: [{ value: "532601", label: "文山市" }, { value: "532622", label: "砚山县" }, { value: "532623", label: "西畴县" }, { value: "532624", label: "麻栗坡县" }, { value: "532625", label: "马关县" }, { value: "532626", label: "丘北县" }, { value: "532627", label: "广南县" }, { value: "532628", label: "富宁县" }] }, { value: "532800", label: "西双版纳傣族自治州", children: [{ value: "532801", label: "景洪市" }, { value: "532822", label: "勐海县" }, { value: "532823", label: "勐腊县" }] }, { value: "532900", label: "大理白族自治州", children: [{ value: "532901", label: "大理市" }, { value: "532922", label: "漾濞彝族自治县" }, { value: "532923", label: "祥云县" }, { value: "532924", label: "宾川县" }, { value: "532925", label: "弥渡县" }, { value: "532926", label: "南涧彝族自治县" }, { value: "532927", label: "巍山彝族回族自治县" }, { value: "532928", label: "永平县" }, { value: "532929", label: "云龙县" }, { value: "532930", label: "洱源县" }, { value: "532931", label: "剑川县" }, { value: "532932", label: "鹤庆县" }] }, { value: "533100", label: "德宏傣族景颇族自治州", children: [{ value: "533102", label: "瑞丽市" }, { value: "533103", label: "芒市" }, { value: "533122", label: "梁河县" }, { value: "533123", label: "盈江县" }, { value: "533124", label: "陇川县" }] }, { value: "533300", label: "怒江傈僳族自治州", children: [{ value: "533301", label: "泸水市" }, { value: "533323", label: "福贡县" }, { value: "533324", label: "贡山独龙族怒族自治县" }, { value: "533325", label: "兰坪白族普米族自治县" }] }, { value: "533400", label: "迪庆藏族自治州", children: [{ value: "533401", label: "香格里拉市" }, { value: "533422", label: "德钦县" }, { value: "533423", label: "维西傈僳族自治县" }] }] }, { value: '540000', label: '西藏', children: [{ value: "540100", label: "拉萨市", children: [{ value: "540101", label: "市辖区" }, { value: "540102", label: "城关区" }, { value: "540103", label: "堆龙德庆区" }, { value: "540121", label: "林周县" }, { value: "540122", label: "当雄县" }, { value: "540123", label: "尼木县" }, { value: "540124", label: "曲水县" }, { value: "540126", label: "达孜县" }, { value: "540127", label: "墨竹工卡县" }, { value: "540171", label: "格尔木藏青工业园区" }, { value: "540172", label: "拉萨经济技术开发区" }, { value: "540173", label: "西藏文化旅游创意园区" }, { value: "540174", label: "达孜工业园区" }] }, { value: "540200", label: "日喀则市", children: [{ value: "540202", label: "桑珠孜区" }, { value: "540221", label: "南木林县" }, { value: "540222", label: "江孜县" }, { value: "540223", label: "定日县" }, { value: "540224", label: "萨迦县" }, { value: "540225", label: "拉孜县" }, { value: "540226", label: "昂仁县" }, { value: "540227", label: "谢通门县" }, { value: "540228", label: "白朗县" }, { value: "540229", label: "仁布县" }, { value: "540230", label: "康马县" }, { value: "540231", label: "定结县" }, { value: "540232", label: "仲巴县" }, { value: "540233", label: "亚东县" }, { value: "540234", label: "吉隆县" }, { value: "540235", label: "聂拉木县" }, { value: "540236", label: "萨嘎县" }, { value: "540237", label: "岗巴县" }] }, { value: "540300", label: "昌都市", children: [{ value: "540302", label: "卡若区" }, { value: "540321", label: "江达县" }, { value: "540322", label: "贡觉县" }, { value: "540323", label: "类乌齐县" }, { value: "540324", label: "丁青县" }, { value: "540325", label: "察雅县" }, { value: "540326", label: "八宿县" }, { value: "540327", label: "左贡县" }, { value: "540328", label: "芒康县" }, { value: "540329", label: "洛隆县" }, { value: "540330", label: "边坝县" }] }, { value: "540400", label: "林芝市", children: [{ value: "540402", label: "巴宜区" }, { value: "540421", label: "工布江达县" }, { value: "540422", label: "米林县" }, { value: "540423", label: "墨脱县" }, { value: "540424", label: "波密县" }, { value: "540425", label: "察隅县" }, { value: "540426", label: "朗县" }] }, { value: "540500", label: "山南市", children: [{ value: "540501", label: "市辖区" }, { value: "540502", label: "乃东区" }, { value: "540521", label: "扎囊县" }, { value: "540522", label: "贡嘎县" }, { value: "540523", label: "桑日县" }, { value: "540524", label: "琼结县" }, { value: "540525", label: "曲松县" }, { value: "540526", label: "措美县" }, { value: "540527", label: "洛扎县" }, { value: "540528", label: "加查县" }, { value: "540529", label: "隆子县" }, { value: "540530", label: "错那县" }, { value: "540531", label: "浪卡子县" }] }, { value: "542400", label: "那曲地区", children: [{ value: "542421", label: "那曲县" }, { value: "542422", label: "嘉黎县" }, { value: "542423", label: "比如县" }, { value: "542424", label: "聂荣县" }, { value: "542425", label: "安多县" }, { value: "542426", label: "申扎县" }, { value: "542427", label: "索县" }, { value: "542428", label: "班戈县" }, { value: "542429", label: "巴青县" }, { value: "542430", label: "尼玛县" }, { value: "542431", label: "双湖县" }] }, { value: "542500", label: "阿里地区", children: [{ value: "542521", label: "普兰县" }, { value: "542522", label: "札达县" }, { value: "542523", label: "噶尔县" }, { value: "542524", label: "日土县" }, { value: "542525", label: "革吉县" }, { value: "542526", label: "改则县" }, { value: "542527", label: "措勤县" }] }] }, { value: '610000', label: '陕西省', children: [{ value: "610100", label: "西安市", children: [{ value: "610101", label: "市辖区" }, { value: "610102", label: "新城区" }, { value: "610103", label: "碑林区" }, { value: "610104", label: "莲湖区" }, { value: "610111", label: "灞桥区" }, { value: "610112", label: "未央区" }, { value: "610113", label: "雁塔区" }, { value: "610114", label: "阎良区" }, { value: "610115", label: "临潼区" }, { value: "610116", label: "长安区" }, { value: "610117", label: "高陵区" }, { value: "610118", label: "鄠邑区" }, { value: "610122", label: "蓝田县" }, { value: "610124", label: "周至县" }] }, { value: "610200", label: "铜川市", children: [{ value: "610201", label: "市辖区" }, { value: "610202", label: "王益区" }, { value: "610203", label: "印台区" }, { value: "610204", label: "耀州区" }, { value: "610222", label: "宜君县" }] }, { value: "610300", label: "宝鸡市", children: [{ value: "610301", label: "市辖区" }, { value: "610302", label: "渭滨区" }, { value: "610303", label: "金台区" }, { value: "610304", label: "陈仓区" }, { value: "610322", label: "凤翔县" }, { value: "610323", label: "岐山县" }, { value: "610324", label: "扶风县" }, { value: "610326", label: "眉县" }, { value: "610327", label: "陇县" }, { value: "610328", label: "千阳县" }, { value: "610329", label: "麟游县" }, { value: "610330", label: "凤县" }, { value: "610331", label: "太白县" }] }, { value: "610400", label: "咸阳市", children: [{ value: "610401", label: "市辖区" }, { value: "610402", label: "秦都区" }, { value: "610403", label: "杨陵区" }, { value: "610404", label: "渭城区" }, { value: "610422", label: "三原县" }, { value: "610423", label: "泾阳县" }, { value: "610424", label: "乾县" }, { value: "610425", label: "礼泉县" }, { value: "610426", label: "永寿县" }, { value: "610427", label: "彬县" }, { value: "610428", label: "长武县" }, { value: "610429", label: "旬邑县" }, { value: "610430", label: "淳化县" }, { value: "610431", label: "武功县" }, { value: "610481", label: "兴平市" }] }, { value: "610500", label: "渭南市", children: [{ value: "610501", label: "市辖区" }, { value: "610502", label: "临渭区" }, { value: "610503", label: "华州区" }, { value: "610522", label: "潼关县" }, { value: "610523", label: "大荔县" }, { value: "610524", label: "合阳县" }, { value: "610525", label: "澄城县" }, { value: "610526", label: "蒲城县" }, { value: "610527", label: "白水县" }, { value: "610528", label: "富平县" }, { value: "610581", label: "韩城市" }, { value: "610582", label: "华阴市" }] }, { value: "610600", label: "延安市", children: [{ value: "610601", label: "市辖区" }, { value: "610602", label: "宝塔区" }, { value: "610603", label: "安塞区" }, { value: "610621", label: "延长县" }, { value: "610622", label: "延川县" }, { value: "610623", label: "子长县" }, { value: "610625", label: "志丹县" }, { value: "610626", label: "吴起县" }, { value: "610627", label: "甘泉县" }, { value: "610628", label: "富县" }, { value: "610629", label: "洛川县" }, { value: "610630", label: "宜川县" }, { value: "610631", label: "黄龙县" }, { value: "610632", label: "黄陵县" }] }, { value: "610700", label: "汉中市", children: [{ value: "610701", label: "市辖区" }, { value: "610702", label: "汉台区" }, { value: "610703", label: "南郑区" }, { value: "610722", label: "城固县" }, { value: "610723", label: "洋县" }, { value: "610724", label: "西乡县" }, { value: "610725", label: "勉县" }, { value: "610726", label: "宁强县" }, { value: "610727", label: "略阳县" }, { value: "610728", label: "镇巴县" }, { value: "610729", label: "留坝县" }, { value: "610730", label: "佛坪县" }] }, { value: "610800", label: "榆林市", children: [{ value: "610801", label: "市辖区" }, { value: "610802", label: "榆阳区" }, { value: "610803", label: "横山区" }, { value: "610822", label: "府谷县" }, { value: "610824", label: "靖边县" }, { value: "610825", label: "定边县" }, { value: "610826", label: "绥德县" }, { value: "610827", label: "米脂县" }, { value: "610828", label: "佳县" }, { value: "610829", label: "吴堡县" }, { value: "610830", label: "清涧县" }, { value: "610831", label: "子洲县" }, { value: "610881", label: "神木市" }] }, { value: "610900", label: "安康市", children: [{ value: "610901", label: "市辖区" }, { value: "610902", label: "汉滨区" }, { value: "610921", label: "汉阴县" }, { value: "610922", label: "石泉县" }, { value: "610923", label: "宁陕县" }, { value: "610924", label: "紫阳县" }, { value: "610925", label: "岚皋县" }, { value: "610926", label: "平利县" }, { value: "610927", label: "镇坪县" }, { value: "610928", label: "旬阳县" }, { value: "610929", label: "白河县" }] }, { value: "611000", label: "商洛市", children: [{ value: "611001", label: "市辖区" }, { value: "611002", label: "商州区" }, { value: "611021", label: "洛南县" }, { value: "611022", label: "丹凤县" }, { value: "611023", label: "商南县" }, { value: "611024", label: "山阳县" }, { value: "611025", label: "镇安县" }, { value: "611026", label: "柞水县" }] }] }, { value: '620000', label: '甘肃省', children: [{ value: "620100", label: "兰州市", children: [{ value: "620101", label: "市辖区" }, { value: "620102", label: "城关区" }, { value: "620103", label: "七里河区" }, { value: "620104", label: "西固区" }, { value: "620105", label: "安宁区" }, { value: "620111", label: "红古区" }, { value: "620121", label: "永登县" }, { value: "620122", label: "皋兰县" }, { value: "620123", label: "榆中县" }, { value: "620171", label: "兰州新区" }] }, { value: "620200", label: "嘉峪关市", children: [{ value: "620201", label: "市辖区" }] }, { value: "620300", label: "金昌市", children: [{ value: "620301", label: "市辖区" }, { value: "620302", label: "金川区" }, { value: "620321", label: "永昌县" }] }, { value: "620400", label: "白银市", children: [{ value: "620401", label: "市辖区" }, { value: "620402", label: "白银区" }, { value: "620403", label: "平川区" }, { value: "620421", label: "靖远县" }, { value: "620422", label: "会宁县" }, { value: "620423", label: "景泰县" }] }, { value: "620500", label: "天水市", children: [{ value: "620501", label: "市辖区" }, { value: "620502", label: "秦州区" }, { value: "620503", label: "麦积区" }, { value: "620521", label: "清水县" }, { value: "620522", label: "秦安县" }, { value: "620523", label: "甘谷县" }, { value: "620524", label: "武山县" }, { value: "620525", label: "张家川回族自治县" }] }, { value: "620600", label: "武威市", children: [{ value: "620601", label: "市辖区" }, { value: "620602", label: "凉州区" }, { value: "620621", label: "民勤县" }, { value: "620622", label: "古浪县" }, { value: "620623", label: "天祝藏族自治县" }] }, { value: "620700", label: "张掖市", children: [{ value: "620701", label: "市辖区" }, { value: "620702", label: "甘州区" }, { value: "620721", label: "肃南裕固族自治县" }, { value: "620722", label: "民乐县" }, { value: "620723", label: "临泽县" }, { value: "620724", label: "高台县" }, { value: "620725", label: "山丹县" }] }, { value: "620800", label: "平凉市", children: [{ value: "620801", label: "市辖区" }, { value: "620802", label: "崆峒区" }, { value: "620821", label: "泾川县" }, { value: "620822", label: "灵台县" }, { value: "620823", label: "崇信县" }, { value: "620824", label: "华亭县" }, { value: "620825", label: "庄浪县" }, { value: "620826", label: "静宁县" }, { value: "620871", label: "平凉工业园区" }] }, { value: "620900", label: "酒泉市", children: [{ value: "620901", label: "市辖区" }, { value: "620902", label: "肃州区" }, { value: "620921", label: "金塔县" }, { value: "620922", label: "瓜州县" }, { value: "620923", label: "肃北蒙古族自治县" }, { value: "620924", label: "阿克塞哈萨克族自治县" }, { value: "620981", label: "玉门市" }, { value: "620982", label: "敦煌市" }] }, { value: "621000", label: "庆阳市", children: [{ value: "621001", label: "市辖区" }, { value: "621002", label: "西峰区" }, { value: "621021", label: "庆城县" }, { value: "621022", label: "环县" }, { value: "621023", label: "华池县" }, { value: "621024", label: "合水县" }, { value: "621025", label: "正宁县" }, { value: "621026", label: "宁县" }, { value: "621027", label: "镇原县" }] }, { value: "621100", label: "定西市", children: [{ value: "621101", label: "市辖区" }, { value: "621102", label: "安定区" }, { value: "621121", label: "通渭县" }, { value: "621122", label: "陇西县" }, { value: "621123", label: "渭源县" }, { value: "621124", label: "临洮县" }, { value: "621125", label: "漳县" }, { value: "621126", label: "岷县" }] }, { value: "621200", label: "陇南市", children: [{ value: "621201", label: "市辖区" }, { value: "621202", label: "武都区" }, { value: "621221", label: "成县" }, { value: "621222", label: "文县" }, { value: "621223", label: "宕昌县" }, { value: "621224", label: "康县" }, { value: "621225", label: "西和县" }, { value: "621226", label: "礼县" }, { value: "621227", label: "徽县" }, { value: "621228", label: "两当县" }] }, { value: "622900", label: "临夏回族自治州", children: [{ value: "622901", label: "临夏市" }, { value: "622921", label: "临夏县" }, { value: "622922", label: "康乐县" }, { value: "622923", label: "永靖县" }, { value: "622924", label: "广河县" }, { value: "622925", label: "和政县" }, { value: "622926", label: "东乡族自治县" }, { value: "622927", label: "积石山保安族东乡族撒拉族自治县" }] }, { value: "623000", label: "甘南藏族自治州", children: [{ value: "623001", label: "合作市" }, { value: "623021", label: "临潭县" }, { value: "623022", label: "卓尼县" }, { value: "623023", label: "舟曲县" }, { value: "623024", label: "迭部县" }, { value: "623025", label: "玛曲县" }, { value: "623026", label: "碌曲县" }, { value: "623027", label: "夏河县" }] }] }, { value: '630000', label: '青海省', children: [{ value: "630100", label: "西宁市", children: [{ value: "630101", label: "市辖区" }, { value: "630102", label: "城东区" }, { value: "630103", label: "城中区" }, { value: "630104", label: "城西区" }, { value: "630105", label: "城北区" }, { value: "630121", label: "大通回族土族自治县" }, { value: "630122", label: "湟中县" }, { value: "630123", label: "湟源县" }] }, { value: "630200", label: "海东市", children: [{ value: "630202", label: "乐都区" }, { value: "630203", label: "平安区" }, { value: "630222", label: "民和回族土族自治县" }, { value: "630223", label: "互助土族自治县" }, { value: "630224", label: "化隆回族自治县" }, { value: "630225", label: "循化撒拉族自治县" }] }, { value: "632200", label: "海北藏族自治州", children: [{ value: "632221", label: "门源回族自治县" }, { value: "632222", label: "祁连县" }, { value: "632223", label: "海晏县" }, { value: "632224", label: "刚察县" }] }, { value: "632300", label: "黄南藏族自治州", children: [{ value: "632321", label: "同仁县" }, { value: "632322", label: "尖扎县" }, { value: "632323", label: "泽库县" }, { value: "632324", label: "河南蒙古族自治县" }] }, { value: "632500", label: "海南藏族自治州", children: [{ value: "632521", label: "共和县" }, { value: "632522", label: "同德县" }, { value: "632523", label: "贵德县" }, { value: "632524", label: "兴海县" }, { value: "632525", label: "贵南县" }] }, { value: "632600", label: "果洛藏族自治州", children: [{ value: "632621", label: "玛沁县" }, { value: "632622", label: "班玛县" }, { value: "632623", label: "甘德县" }, { value: "632624", label: "达日县" }, { value: "632625", label: "久治县" }, { value: "632626", label: "玛多县" }] }, { value: "632700", label: "玉树藏族自治州", children: [{ value: "632701", label: "玉树市" }, { value: "632722", label: "杂多县" }, { value: "632723", label: "称多县" }, { value: "632724", label: "治多县" }, { value: "632725", label: "囊谦县" }, { value: "632726", label: "曲麻莱县" }] }, { value: "632800", label: "海西蒙古族藏族自治州", children: [{ value: "632801", label: "格尔木市" }, { value: "632802", label: "德令哈市" }, { value: "632821", label: "乌兰县" }, { value: "632822", label: "都兰县" }, { value: "632823", label: "天峻县" }, { value: "632857", label: "大柴旦行政委员会" }, { value: "632858", label: "冷湖行政委员会" }, { value: "632859", label: "茫崖行政委员会" }] }] }, { value: '640000', label: '宁夏', children: [{ value: "640100", label: "银川市", children: [{ value: "640101", label: "市辖区" }, { value: "640104", label: "兴庆区" }, { value: "640105", label: "西夏区" }, { value: "640106", label: "金凤区" }, { value: "640121", label: "永宁县" }, { value: "640122", label: "贺兰县" }, { value: "640181", label: "灵武市" }] }, { value: "640200", label: "石嘴山市", children: [{ value: "640201", label: "市辖区" }, { value: "640202", label: "大武口区" }, { value: "640205", label: "惠农区" }, { value: "640221", label: "平罗县" }] }, { value: "640300", label: "吴忠市", children: [{ value: "640301", label: "市辖区" }, { value: "640302", label: "利通区" }, { value: "640303", label: "红寺堡区" }, { value: "640323", label: "盐池县" }, { value: "640324", label: "同心县" }, { value: "640381", label: "青铜峡市" }] }, { value: "640400", label: "固原市", children: [{ value: "640401", label: "市辖区" }, { value: "640402", label: "原州区" }, { value: "640422", label: "西吉县" }, { value: "640423", label: "隆德县" }, { value: "640424", label: "泾源县" }, { value: "640425", label: "彭阳县" }] }, { value: "640500", label: "中卫市", children: [{ value: "640501", label: "市辖区" }, { value: "640502", label: "沙坡头区" }, { value: "640521", label: "中宁县" }, { value: "640522", label: "海原县" }] }] }, { value: '650000', label: '新疆', children: [{ value: "650100", label: "乌鲁木齐市", children: [{ value: "650101", label: "市辖区" }, { value: "650102", label: "天山区" }, { value: "650103", label: "沙依巴克区" }, { value: "650104", label: "新市区" }, { value: "650105", label: "水磨沟区" }, { value: "650106", label: "头屯河区" }, { value: "650107", label: "达坂城区" }, { value: "650109", label: "米东区" }, { value: "650121", label: "乌鲁木齐县" }, { value: "650171", label: "乌鲁木齐经济技术开发区" }, { value: "650172", label: "乌鲁木齐高新技术产业开发区" }] }, { value: "650200", label: "克拉玛依市", children: [{ value: "650201", label: "市辖区" }, { value: "650202", label: "独山子区" }, { value: "650203", label: "克拉玛依区" }, { value: "650204", label: "白碱滩区" }, { value: "650205", label: "乌尔禾区" }] }, { value: "650400", label: "吐鲁番市", children: [{ value: "650402", label: "高昌区" }, { value: "650421", label: "鄯善县" }, { value: "650422", label: "托克逊县" }] }, { value: "650500", label: "哈密市", children: [{ value: "650502", label: "伊州区" }, { value: "650521", label: "巴里坤哈萨克自治县" }, { value: "650522", label: "伊吾县" }] }, { value: "652300", label: "昌吉回族自治州", children: [{ value: "652301", label: "昌吉市" }, { value: "652302", label: "阜康市" }, { value: "652323", label: "呼图壁县" }, { value: "652324", label: "玛纳斯县" }, { value: "652325", label: "奇台县" }, { value: "652327", label: "吉木萨尔县" }, { value: "652328", label: "木垒哈萨克自治县" }] }, { value: "652700", label: "博尔塔拉蒙古自治州", children: [{ value: "652701", label: "博乐市" }, { value: "652702", label: "阿拉山口市" }, { value: "652722", label: "精河县" }, { value: "652723", label: "温泉县" }] }, { value: "652800", label: "巴音郭楞蒙古自治州", children: [{ value: "652801", label: "库尔勒市" }, { value: "652822", label: "轮台县" }, { value: "652823", label: "尉犁县" }, { value: "652824", label: "若羌县" }, { value: "652825", label: "且末县" }, { value: "652826", label: "焉耆回族自治县" }, { value: "652827", label: "和静县" }, { value: "652828", label: "和硕县" }, { value: "652829", label: "博湖县" }, { value: "652871", label: "库尔勒经济技术开发区" }] }, { value: "652900", label: "阿克苏地区", children: [{ value: "652901", label: "阿克苏市" }, { value: "652922", label: "温宿县" }, { value: "652923", label: "库车县" }, { value: "652924", label: "沙雅县" }, { value: "652925", label: "新和县" }, { value: "652926", label: "拜城县" }, { value: "652927", label: "乌什县" }, { value: "652928", label: "阿瓦提县" }, { value: "652929", label: "柯坪县" }] }, { value: "653000", label: "克孜勒苏柯尔克孜自治州", children: [{ value: "653001", label: "阿图什市" }, { value: "653022", label: "阿克陶县" }, { value: "653023", label: "阿合奇县" }, { value: "653024", label: "乌恰县" }] }, { value: "653100", label: "喀什地区", children: [{ value: "653101", label: "喀什市" }, { value: "653121", label: "疏附县" }, { value: "653122", label: "疏勒县" }, { value: "653123", label: "英吉沙县" }, { value: "653124", label: "泽普县" }, { value: "653125", label: "莎车县" }, { value: "653126", label: "叶城县" }, { value: "653127", label: "麦盖提县" }, { value: "653128", label: "岳普湖县" }, { value: "653129", label: "伽师县" }, { value: "653130", label: "巴楚县" }, { value: "653131", label: "塔什库尔干塔吉克自治县" }] }, { value: "653200", label: "和田地区", children: [{ value: "653201", label: "和田市" }, { value: "653221", label: "和田县" }, { value: "653222", label: "墨玉县" }, { value: "653223", label: "皮山县" }, { value: "653224", label: "洛浦县" }, { value: "653225", label: "策勒县" }, { value: "653226", label: "于田县" }, { value: "653227", label: "民丰县" }] }, { value: "654000", label: "伊犁哈萨克自治州", children: [{ value: "654002", label: "伊宁市" }, { value: "654003", label: "奎屯市" }, { value: "654004", label: "霍尔果斯市" }, { value: "654021", label: "伊宁县" }, { value: "654022", label: "察布查尔锡伯自治县" }, { value: "654023", label: "霍城县" }, { value: "654024", label: "巩留县" }, { value: "654025", label: "新源县" }, { value: "654026", label: "昭苏县" }, { value: "654027", label: "特克斯县" }, { value: "654028", label: "尼勒克县" }] }, { value: "654200", label: "塔城地区", children: [{ value: "654201", label: "塔城市" }, { value: "654202", label: "乌苏市" }, { value: "654221", label: "额敏县" }, { value: "654223", label: "沙湾县" }, { value: "654224", label: "托里县" }, { value: "654225", label: "裕民县" }, { value: "654226", label: "和布克赛尔蒙古自治县" }] }, { value: "654300", label: "阿勒泰地区", children: [{ value: "654301", label: "阿勒泰市" }, { value: "654321", label: "布尔津县" }, { value: "654322", label: "富蕴县" }, { value: "654323", label: "福海县" }, { value: "654324", label: "哈巴河县" }, { value: "654325", label: "青河县" }, { value: "654326", label: "吉木乃县" }] }, { value: "659000", label: "自治区直辖县级行政区划", children: [{ value: "659001", label: "石河子市" }, { value: "659002", label: "阿拉尔市" }, { value: "659003", label: "图木舒克市" }, { value: "659004", label: "五家渠市" }, { value: "659006", label: "铁门关市" }] }] }, { value: '660000', label: '台湾省', children: [{ value: "660100", label: "台北市", children: [{ value: "660101", label: "中正区" }, { value: "660102", label: "大同区" }, { value: "660103", label: "中山区" }, { value: "660104", label: "松山区" }, { value: "660105", label: "大安区" }, { value: "660106", label: "万华区" }, { value: "660107", label: "信义区" }, { value: "660108", label: "士林区" }, { value: "660109", label: "北投区" }, { value: "660110", label: "内湖区" }, { value: "660111", label: "南港区" }, { value: "660112", label: "文山区" }] }, { value: "660200", label: "高雄市", children: [{ value: "660201", label: "新兴区" }, { value: "660202", label: "前金区" }, { value: "660203", label: "芩雅区" }, { value: "660204", label: "盐埕区" }, { value: "660205", label: "鼓山区" }, { value: "660206", label: "旗津区" }, { value: "660207", label: "前镇区" }, { value: "660208", label: "三民区" }, { value: "660209", label: "左营区" }, { value: "660210", label: "楠梓区" }, { value: "660211", label: "小港区" }] }, { value: "660300", label: "台南市", children: [{ value: "660301", label: "中西区" }, { value: "660302", label: "东区" }, { value: "660303", label: "南区" }, { value: "660304", label: "北区" }, { value: "660305", label: "安平区" }, { value: "660306", label: "安南区" }] }, { value: "660400", label: "台中市", children: [{ value: "660401", label: "中区" }, { value: "660402", label: "东区" }, { value: "660403", label: "南区" }, { value: "660404", label: "西区" }, { value: "660405", label: "北区" }, { value: "660406", label: "北屯区" }, { value: "660407", label: "西屯区" }, { value: "660408", label: "南屯区" }] }, { value: "660500", label: "金门县", children: [{ value: "660501", label: "金门县" }] }, { value: "660600", label: "南投县", children: [{ value: "660601", label: "南投县" }] }, { value: "660700", label: "基隆市", children: [{ value: "660701", label: "仁爱区" }, { value: "660702", label: "信义区" }, { value: "660703", label: "中正区" }, { value: "660704", label: "中山区" }, { value: "660705", label: "安乐区" }, { value: "660706", label: "暖暖区" }, { value: "660707", label: "七堵区" }] }, { value: "660800", label: "新竹市", children: [{ value: "660801", label: "东区" }, { value: "660802", label: "北区" }, { value: "660803", label: "香山区" }] }, { value: "660900", label: "嘉义市", children: [{ value: "660901", label: "东区" }, { value: "660902", label: "西区" }] }, { value: "661000", label: "新北市", children: [{ value: "661001", label: "新北市" }] }, { value: "661100", label: "宜兰县", children: [{ value: "661100", label: "宜兰县" }] }, { value: "661200", label: "新竹县", children: [{ value: "661201", label: "新竹县" }] }, { value: "661300", label: "桃园县", children: [{ value: "661301", label: "桃园县" }] }, { value: "661400", label: "苗栗县", children: [{ value: "661401", label: "苗栗县" }] }, { value: "661500", label: "彰化县", children: [{ value: "661501", label: "彰化县" }] }, { value: "661600", label: "嘉义县", children: [{ value: "661601", label: "嘉义县" }] }, { value: "661700", label: "云林县", children: [{ value: "661701", label: "云林县" }] }, { value: "661800", label: "屏东县", children: [{ value: "661801", label: "屏东县" }] }, { value: "661900", label: "台东县", children: [{ value: "661901", label: "台东县" }] }, { value: "662000", label: "花莲县", children: [{ value: "662001", label: "花莲县" }] }, { value: "662100", label: "澎湖县", children: [{ value: "662101", label: "澎湖县" }] }] }, { value: '670000', label: '香港', children: [{ value: "670100", label: "香港岛", children: [{ value: "670101", label: "中西区" }, { value: "670102", label: "湾仔区" }, { value: "670103", label: "东区" }, { value: "670104", label: "南区" }] }, { value: "670200", label: "九龙半岛", children: [{ value: "670201", label: "九龙城区" }, { value: "670202", label: "油尖旺区" }, { value: "670203", label: "深水埗区" }, { value: "670204", label: "黄大仙区" }, { value: "670205", label: "观塘区" }] }, { value: "670300", label: "新界", children: [{ value: "670301", label: "北区" }, { value: "670302", label: "大埔区" }, { value: "670303", label: "沙田区" }, { value: "670304", label: "西贡区" }, { value: "670305", label: "元朗区" }, { value: "670306", label: "屯门区" }, { value: "670307", label: "荃湾区" }, { value: "670308", label: "葵青区" }, { value: "670309", label: "离岛区" }] }] }, { value: '680000', label: '澳门', children: [{ value: "680100", label: "澳门半岛", children: [{ value: "680101", label: "花地玛堂区" }, { value: "680102", label: "圣安多尼堂区" }, { value: "680103", label: "大堂区" }, { value: "680104", label: "望德堂区" }, { value: "680105", label: "风顺堂区" }] }, { value: "680200", label: "离岛", children: [{ value: "680201", label: "嘉模堂区" }, { value: "680202", label: "圣方济各堂区" }] }] }];var _default = cityData;exports.default = _default;

/***/ }),

/***/ 51:
/*!************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/concat.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouter = exports.triggerLifeCycle = exports.beforeHooks = exports.afterHooks = exports.beforeEnterHooks = exports.forMatNext = exports.appMount = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _util = __webpack_require__(/*! ./util */ 49);


var _util2 = __webpack_require__(/*! ../helpers/util */ 36);
var _base = __webpack_require__(/*! ./base */ 38);
var _config = __webpack_require__(/*! ../helpers/config */ 37);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var beforeEachCount = 0;
var afterEachCount = 0;
var resolveLaunch = null;
var beforeEnterDep = []; // 记录当前是否有重复的页面进入 避免重复触发
var beforeEachLaunch = new Promise(function (resolve) {return resolveLaunch = resolve;});

/**
                                                                                           * 把vue实例进行挂载到dom下
                                                                                           * @param {Router} Router uni-simple-router实例对象
                                                                                           */
var appMount = function appMount() {
  if (_base.vueMount.length == 0) {
    return (0, _warn.err)('检测到您未进行dom模型挂载操作，请调用api\r\n\r\n RouterMount(Vim: any, el: any): void');
  }var _vueMount$ =



  _base.vueMount[0],Vim = _vueMount$.Vim,el = _vueMount$.el;
  var formatEl = el;
  if (el == null) {
    formatEl = '#app'; // 这是uni-app在h5中的官方节点
  }
  try {
    Vim.$mount(formatEl);
  } catch (error) {
    (0, _warn.warn)("\u6302\u8F7Dvue\u8282\u70B9\u65F6\u9519\u8BEF\u5566".concat(error));
  }
};

/**
    * 格式化 next传递过来的参数 作为vue-router可用的
    * @param {Object} to//即将跳转到的路由页面
    * @param {*} Intercept
    * @param {Funtion} next//路由连接管道
    * @param {Router} Router//路由对象
    */exports.appMount = appMount;
var forMatNext = function forMatNext(to, Intercept, next, Router) {var
  CONFIG = Router.CONFIG,selfRoutes = Router.selfRoutes;
  if (CONFIG.h5.vueRouterDev) {// 完全使用vue-router开发的时候 vueRouterDev:true 不用做啥直接略过
    next(Intercept);
    return Intercept;
  }
  if (typeof Intercept === 'object') {// 只有是对象类型的时候 我们才进行格式化
    var navType = Reflect.get(Intercept, 'NAVTYPE');
    delete Intercept.NAVTYPE;
    if (navType == 'push') {
      Intercept.replace = false;
      Intercept.type = 'navigateTo';
    } else {
      Intercept.replace = true; // uni-app导航api所谓的NAVTYPE取值在h5都是replace:true
      Intercept.type = 'reLaunch';
    }
    var name = Reflect.get(Intercept, 'name'); // 统一格式化path
    Intercept.query = Intercept.params || Intercept.query;
    delete Intercept.name;
    delete Intercept.params;
    if (Intercept.query == null) {
      Intercept.query = {};
    }
    if (name != null) {var _nameToRute =
      (0, _util.nameToRute)(name, selfRoutes),aliasPath = _nameToRute.aliasPath,path = _nameToRute.path;
      Intercept.path = aliasPath || path;
    } else {// 当设置别名时可以是别名跳转也可以path跳转
      Intercept.path = Reflect.get(Intercept, 'path');
      var rute = (0, _util.formatUserRule)(Intercept.path, selfRoutes, CONFIG);
      if (rute == null) {
        return false;
      }
      Intercept.path = rute;
    }
    if (CONFIG.encodeURI) {// 如果设置的编码传递则进行编码后传递
      var query = encodeURIComponent(JSON.stringify(Intercept.query));
      var formatQuery = (0, _util2.formatURLQuery)(query);
      Intercept.query = {};
      if (formatQuery != '') {
        Intercept.query.query = formatQuery;
      }
    }
  } else if (Intercept != null && Intercept.constructor === String) {
    Intercept = (0, _util.formatUserRule)(Intercept, selfRoutes, CONFIG);
  }
  var objPath = Intercept;
  if (Intercept != null && Intercept.constructor !== Boolean) {
    objPath = (0, _util.strPathToObjPath)(Intercept);
    if (objPath != null) {
      var type = Reflect.get(objPath, 'type');
      if (type == null) {// 当next()是一个路径时
        objPath.type = 'navigateTo';
      }
    }
  } else if (Intercept === false) {
    Router.lifeCycle.routerAfterHooks[0].call(Router, { H5Intercept: true });
  }
  next(objPath); // 统一格式化为对象的方式传递
  return Intercept;
};
/**
    *  v1.5.4+
    * beforeRouteLeave 生命周期
    * @param {Object} to       将要去的那个页面 vue-router to对象
    * @param {Object} from     从那个页面触发的 vue-router from对象
    * @param {Object} next      vue-router beforeEach next管道函数
    * @param {Object} Router   Router路由对象
    */exports.forMatNext = forMatNext;
var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(to, from, next, Router) {
  return new Promise(function (resolve) {var
    currentRoute = Router.$route.currentRoute;
    if (currentRoute.path == to.path) {// 如果是同一个页面直接返回  不执行页面中的Leave事件
      return resolve();
    }
    var page = (0, _util.getPages)(); // 获取到当前的页面对象
    if (page == null || page._HHYANGbeforeRouteLeaveCalled) {
      (0, _warn.warn)('当前环境下无须执行 beforeRouteLeave。 原因：1.page等于null  2.真的的无须执行');
      return resolve();
    }
    var beforeRouteLeaveArray = page.$options.beforeRouteLeave; // 获取到页面下的 beforeRouteLeave 路由守卫
    if (beforeRouteLeaveArray == null) {// 当前页面没有预设 beforeRouteLeave 啥都不做
      return resolve();
    }var _getRouterNextInfo =
    (0, _util.getRouterNextInfo)(to, from, Router),toRoute = _getRouterNextInfo.toRoute,fromRoute = _getRouterNextInfo.fromRoute;
    var beforeRouteLeave = beforeRouteLeaveArray[0]; // 不管怎么样 只执行第一个钩子  其他都不管
    beforeRouteLeave.call(page, toRoute, fromRoute, function (Intercept) {// 开始执行生命周期
      if (Intercept == null) {// 放行状态  直接返回
        return resolve();
      }
      page._HHYANGbeforeRouteLeaveCalled = true; // 标记一下当前已经做过 beforeRouteLeave 啦
      forMatNext(to, Intercept, next, Router); // 直接交给vue-router 处理
    });
  });
};

/**
    * 修复首页beforeEnter执行两次的问题 https://github.com/SilurianYang/uni-simple-router/issues/67
    *
    * beforeEnter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} userHooks
    * @param {Object} Router
    */
var beforeEnterHooks = function beforeEnterHooks(to, from, next, userHooks, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {var res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!

              beforeEnterDep.includes(to.path)) {_context2.next = 3;break;}
              next();return _context2.abrupt("return",
              resolve());case 3:

              beforeEnterDep = [to.path];if (!

              Reflect.get(Router, 'H5RouterReady')) {_context2.next = 11;break;}_context2.next = 7;return (
                new Promise( /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolveNext) {var _getRouterNextInfo2, toRoute, fromRoute;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_getRouterNextInfo2 =



                            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo2.toRoute, fromRoute = _getRouterNextInfo2.fromRoute;_context.next = 3;return (
                              userHooks(toRoute, fromRoute, resolveNext));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x2) {return _ref2.apply(this, arguments);};}()));case 7:res = _context2.sent;

              forMatNext(to, res, next, Router);_context2.next = 12;break;case 11:

              next();case 12:

              resolve();case 13:case "end":return _context2.stop();}}}, _callee2);}));return function (_x) {return _ref.apply(this, arguments);};}());

};
/**
    * vueAfter 生命周期
    * @param {Object} to
    * @param {Object} from
    * @param {Object} next
    * @param {Object} Router
    */exports.beforeEnterHooks = beforeEnterHooks;
var afterHooks = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(to, from, next, Router) {var _getRouterNextInfo3, toRoute, fromRoute;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            _base.vuelifeHooks.afterHooks[0](to, from);if (!
            _config.lifeCycle.afterHooks[0]) {_context3.next = 10;break;}if (!(
            afterEachCount === 0)) {_context3.next = 6;break;}_context3.next = 5;return (
              beforeEachLaunch);case 5:
            appMount(Router);case 6:_getRouterNextInfo3 =




            (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo3.toRoute, fromRoute = _getRouterNextInfo3.fromRoute;
            _config.lifeCycle.afterHooks[0](toRoute, fromRoute);_context3.next = 11;break;case 10:
            if (afterEachCount === 0) {
              appMount(Router);
            }case 11:
            afterEachCount += 1;
            Router.lifeCycle.routerAfterHooks[0].call(Router);case 13:case "end":return _context3.stop();}}}, _callee3);}));return function afterHooks(_x3, _x4, _x5, _x6) {return _ref3.apply(this, arguments);};}();

/**
                                                                                                                                                                                                                        * vueBefore 生命周期
                                                                                                                                                                                                                        * @param {Object} to       将要去的那个页面 vue-router to对象
                                                                                                                                                                                                                        * @param {Object} from     从那个页面触发的 vue-router from对象
                                                                                                                                                                                                                        * @param {Object} next      vue-router beforeEach next管道函数
                                                                                                                                                                                                                        * @param {Object} H5Config
                                                                                                                                                                                                                        */exports.afterHooks = afterHooks;
var beforeHooks = function beforeHooks(to, from, next, Router) {
  return new Promise( /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve) {var H5;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                Router.lifeCycle.routerbeforeHooks[0].call(Router));case 2:_context6.next = 4;return (
                beforeRouteLeaveHooks(to, from, next, Router));case 4: // 执行1.5.4+ beforeRouteLeave生命钩子
              H5 = Router.CONFIG.h5;
              _base.vuelifeHooks.beforeHooks[0](to, from, /*#__PURE__*/function () {var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(Intercept) {var res, beforeIntercept, selfRoutes, beforeEnter;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:if (!(
                          Intercept != null && H5.keepUniIntercept === true && H5.vueRouterDev === false)) {_context5.next = 5;break;}
                          next(Intercept);
                          (0, _warn.warn)('uni-app 内部强制触发跳转拦截');
                          beforeEachCount += 1;return _context5.abrupt("return",
                          resolve());case 5:if (


                          _config.lifeCycle.beforeHooks[0]) {_context5.next = 10;break;}
                          next();
                          beforeEachCount += 1;
                          resolveLaunch();return _context5.abrupt("return",
                          resolve());case 10:_context5.next = 12;return (

                            new Promise( /*#__PURE__*/function () {var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolveNext) {var _getRouterNextInfo4, toRoute, fromRoute;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_getRouterNextInfo4 =



                                        (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo4.toRoute, fromRoute = _getRouterNextInfo4.fromRoute;_context4.next = 3;return (
                                          _config.lifeCycle.beforeHooks[0](toRoute, fromRoute, resolveNext));case 3:case "end":return _context4.stop();}}}, _callee4);}));return function (_x9) {return _ref6.apply(this, arguments);};}()));case 12:res = _context5.sent;

                          beforeIntercept = forMatNext(to, res, next, Router);if (!(
                          beforeEachCount == 0 && beforeIntercept == null && to.meta.isTabBar)) {_context5.next = 20;break;} // 首次触发beforeEach，并且首页没有进行跳转的情况下才触发beforeEnter 主要是keep-alive

                          selfRoutes =
                          Router.selfRoutes;
                          beforeEnter = Reflect.get(selfRoutes["/".concat(to.meta.pagePath)], 'beforeEnter');if (!
                          beforeEnter) {_context5.next = 20;break;}_context5.next = 20;return (
                            beforeEnterHooks(to, from, next, beforeEnter, Router));case 20:


                          beforeEachCount += 1;
                          resolveLaunch();
                          resolve();case 23:case "end":return _context5.stop();}}}, _callee5);}));return function (_x8) {return _ref5.apply(this, arguments);};}());case 6:case "end":return _context6.stop();}}}, _callee6);}));return function (_x7) {return _ref4.apply(this, arguments);};}());


};
/**
    * 通过自动调用router api来完成触发生命周期
    * 修复 history 模式下报错的问题  https://github.com/SilurianYang/uni-simple-router/issues/38
    * 修复 history 模式下刷新页面参数丢失的问题 https://github.com/SilurianYang/uni-simple-router/issues/45
    * 修复 history 模式下首次打开页面url错误时不走 path:* 的匹配项  https://github.com/SilurianYang/uni-simple-router/issues/58
    *
    * @param {Object} Router //当前simple-router 对象
    * @param {Object} vueRouter vue-router对象
    */exports.beforeHooks = beforeHooks;
var triggerLifeCycle = function triggerLifeCycle(Router, vueRouter) {var
  CONFIG = Router.CONFIG;
  var currRoute = vueRouter.currentRoute;
  if (vueRouter.mode === 'hash') {var

    query =

    currRoute.query,path = currRoute.path;

    var URLQuery = (0, _util.encodeURLQuery)(CONFIG, query, 'hash');

    vueRouter.replace("".concat(path).concat(URLQuery));
  } else {var _getRouterNextInfo5 =


    (0, _util.getRouterNextInfo)(currRoute, currRoute, Router),toRoute = _getRouterNextInfo5.toRoute;
    var _URLQuery = (0, _util.encodeURLQuery)(CONFIG, currRoute.query, 'history');
    vueRouter.replace({
      path: toRoute.aliasPath || toRoute.path || currRoute.path,
      query: _URLQuery,
      type: 'redirectTo' });

  }
};

/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
    * @param {Object} Router
    * @param {Object} vueRouter
    * @param {Boolean} vueRouterDev
    */exports.triggerLifeCycle = triggerLifeCycle;
var registerRouter = function registerRouter(Router, vueRouter, vueRouterDev) {
  var routeMap = [];
  if (!vueRouterDev) {// 则进行对比两个路由表  主要工作是做路径的优化
    routeMap = (0, _util.diffRouter)(Router, vueRouter, Router.CONFIG.h5.useUniConfig);
  } else {// 完全使用vue-router开发时直接采用开发者的路由表
    routeMap = (0, _util.vueDevRouteProxy)(Router.CONFIG.routes, Router);
  }
  var createRouter = function createRouter() {return new vueRouter.constructor({
      base: vueRouter.options.base,
      mode: vueRouter.options.mode,
      routes: routeMap });};

  var router = createRouter();
  vueRouter.matcher = router.matcher;
  _config.Global.vueRouter = vueRouter; // 把当前vueRouter缓存到全局对象中
  _config.Global.RouterReadyPromise(); // router已经准备就绪 调用promise.resolve();
  Router.H5RouterReady = true; // 并挂载到Router对象下
  // 注册完成所有的钩子及相关参数，手动触发Router的生命周期
  setTimeout(function () {
    triggerLifeCycle(Router, vueRouter);
  });
};exports.registerRouter = registerRouter;

/***/ }),

/***/ 52:
/*!*********************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/extends/myArray.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       * 实现一个继承的 数组类  代理掉 vue-router 生命钩子的数据
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       */var
MyArray = /*#__PURE__*/function (_Array) {_inherits(MyArray, _Array);var _super = _createSuper(MyArray);
  function MyArray(Router, vueOldHooks, hookFun) {var _this;_classCallCheck(this, MyArray);
    _this = _super.call(this);
    _this.Router = Router;
    _this.vueOldHooks = vueOldHooks;
    _this.hookFun = hookFun;return _this;
  }_createClass(MyArray, [{ key: "push", value: function push(

    v) {var _this2 = this;
      this.vueOldHooks.splice(0, 1, v); // 把vue-router路由生命钩子保存起来
      this[this.length] = function (to, from, next) {
        _this2.hookFun(to, from, next, _this2.Router);
      };
    } }]);return MyArray;}( /*#__PURE__*/_wrapNativeSuper(Array));var _default =


MyArray;exports.default = _default;

/***/ }),

/***/ 53:
/*!***********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/lifeCycle/hooks.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.registerRouterHooks = exports.registerHook = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 17));var _util = __webpack_require__(/*! ../helpers/util */ 36);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}







var registerHook = function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
/**
    * 注册全局Router生命钩子
    */exports.registerHook = registerHook;
var registerRouterHooks = function registerRouterHooks() {
  registerHook(this.lifeCycle.routerbeforeHooks, function () {var _this = this;
    return new Promise( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                _this.CONFIG.routerBeforeEach(); // 触发暴露给开发者的生命钩子
                if ((0, _util.appPlatform)(true) === 'H5') {
                  H5PATCH.on('toogle', 'startLodding');
                }return _context.abrupt("return",
                resolve(true));case 3:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());

  });
  registerHook(this.lifeCycle.routerAfterHooks, function () {var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (res.H5Intercept !== true) {
      this.CONFIG.routerAfterEach(); // 触发暴露给开发者的生命钩子
    }
    if ((0, _util.appPlatform)(true) === 'H5') {
      H5PATCH.on('toogle', 'stopLodding');
    }
    return true;
  });
};exports.registerRouterHooks = registerRouterHooks;

/***/ }),

/***/ 54:
/*!***************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/patch/applets-patch.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
/**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appletsMount = function appletsMount(Vim) {
  Vim.$mount();
};var _default =

appletsMount;exports.default = _default;

/***/ }),

/***/ 55:
/*!***********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/patch/app-patch.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 截止 1.3.5 版本 不做任何操作
                                                                                                      * @param {element} el dom节点
                                                                                                      */
var appMount = function appMount(Vim) {
  Vim.$mount();
};var _default =
appMount;exports.default = _default;

/***/ }),

/***/ 56:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/mixins.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 37);
var _init = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/init */ 57));
var _init2 = __webpack_require__(/*! ../appRouter/init */ 58);
var _init3 = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/init */ 59));
var _util = __webpack_require__(/*! ./util */ 36);
var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 41);
var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 44);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 获取一些需要在各个平台混入的事件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router 当前原始路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var getMixins = function getMixins(Router) {
  return {
    H5: {
      beforeCreate: function beforeCreate() {
        if (this.$options.router) {
          (0, _init.default)(Router.$root, this.$options.router, this);
        }
      } },

    APP: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init2.appInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        // 第一个页面 拦截所有生命周期
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          _config.uniAppHook.onLaunched = false;
          _hooks.proxyIndexHook.call(this, Router.$root);
        }
        (0, _init2.removeBackPressEvent)(this.$mp.page, this.$options); // 移除页面的onBackPress事件
      },
      onBackPress: function onBackPress() {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
        return _init2.pageIsHeadBack.call(Router.$root, this.$mp.page, this.$options, args);
      } },

    APPLETS: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件
        _init3.default.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {// 必须是第一个页面
          _config.uniAppHook.onLaunched = false;
          _hooks2.appletsProxyIndexHook.call(this, Router.$root);
        }
      } } };


};

var initMixins = function initMixins(Vue, Router) {
  Vue.mixin(_objectSpread({},
  getMixins(Router)[(0, _util.appPlatform)(true)]));

};var _default =

initMixins;exports.default = _default;

/***/ }),

/***/ 57:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/vueRouter/init.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _concat = __webpack_require__(/*! ./concat */ 51);
var _util = __webpack_require__(/*! ./util */ 49);
var _warn = __webpack_require__(/*! ../helpers/warn */ 39);
var _proxy = __webpack_require__(/*! ./proxy/proxy */ 50);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * 重写掉H5端 uni-app原始存在的bug
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   * @param {Object} Router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   */
var rewriteUniFun = function rewriteUniFun(Router) {
  if (Router.CONFIG.h5.rewriteFun === false) {// 不需要重写
    return false;
  }
  uni.reLaunch = function (_ref)

  {var url = _ref.url;
    if (url === '/') {
      (0, _warn.warn)('H5端 uni.reLaunch(\'/\')时 默认被重写了! 你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch(\'/\'?xxx)');
      // eslint-disable-next-line
      if (history.length > 1) {// 只有在有历史记录的时候才返回  不然直接返回首页
        return Router.back();
      }
      return Router.replaceAll('/');
    }
    var path = url.match(/^[^?]+|(\/)/)[0];
    try {
      var query = {};
      url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        query[v] = decodeURIComponent(k);
        return "".concat(k, "=").concat(v);
      });
      Router.replaceAll({
        path: path,
        query: query });

    } catch (e) {
      (0, _warn.err)("".concat(url, "\u89E3\u6790\u5931\u8D25\u4E86....  \u8BD5\u8BD5 this.$Router.replaceAll() \u5427"));
    }
  };
  uni.navigateBack = function (delta) {
    var backLayer = delta;
    if (delta.constructor === Object) {// 这种可能就只是uni-app自带的返回按钮,还有种可能就是开发者另类传递的
      backLayer = 1;
    }
    Router.back(backLayer, delta);
  };
};
/**
    * 拦截并注册vueRouter中的生命钩子，路由表解析
    * @param {Object} Router
    * @param {vueRouter} vueRouter
    */
var init = function init(Router, vueRouter) {
  var CONFIG = Router.CONFIG.h5;
  vueRouter.afterHooks = (0, _proxy.proxyEachHooks)(Router, 'afterHooks', _concat.afterHooks);
  vueRouter.beforeHooks = (0, _proxy.proxyEachHooks)(Router, 'beforeHooks', _concat.beforeHooks);
  var objVueRoutes = (0, _util.fromatRoutes)(vueRouter.options.routes, false, {}); // 返回一个格式化好的routes 键值对的形式
  var objSelfRoutes = (0, _util.fromatRoutes)(Router.CONFIG.routes, true, CONFIG);
  Router.vueRoutes = objVueRoutes; // 挂载vue-routes到当前的路由下
  Router.selfRoutes = _objectSpread(_objectSpread({},
  Router.selfRoutes || {}),
  objSelfRoutes);
  // 挂载self-routes到当前路由下
  Router.$route = vueRouter; // 挂载vue-router到$route
  rewriteUniFun(Router); // 重新掉uniapp上的一些有异常的方法
  (0, _concat.registerRouter)(Router, vueRouter, CONFIG.vueRouterDev);
};var _default =
init;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 58:
/*!**********************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appRouter/init.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.appInit = exports.pageIsHeadBack = exports.removeBackPressEvent = exports.registerLoddingPage = exports.rewriteUniFun = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 41);


var _config = __webpack_require__(/*! ../helpers/config */ 37);
var _util = __webpack_require__(/*! ./util */ 42);
var _warn = __webpack_require__(/*! ../helpers/warn */ 39);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 重写掉uni-app的 uni.getLocation 和 uni.chooseLocation APi
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} Router  当前路由对象
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var rewriteUniFun = function rewriteUniFun(Router) {
  var oldSwitchTab = uni.switchTab; // 缓存 跳转到 tabBar 页面
  uni.switchTab = function (_ref) {var url = _ref.url,args = _objectWithoutProperties(_ref, ["url"]);var normal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (normal === true || _config.uniAppHook.pageReady === false) {// 调用原始的uni-app  api
      oldSwitchTab(_objectSpread({
        url: url },
      args));

    } else {
      if (_config.uniAppHook.pageReady) {// 只有在路由守卫等  处理完所有操作后才能触发
        var path = Router.$Route.path; // 获取当前路径
        if (path == url) {// 路径相同不执行
          return (0, _warn.warn)("\u5F53\u524D\u8DF3\u8F6C\u8DEF\u5F84\uFF1A".concat(url, "  \u5DF2\u5728\u672C\u9875\u9762\u65E0\u987B\u8DF3\u8F6C"));
        }
        _hooks.beforeTabHooks.call(Router, url.substring(1)); // 不要 /
      } else {
        (0, _warn.warn)('路由守卫正在忙碌中 不允许执行 ‘uni.switchTab’');
      }
    }
  };
};

/**
    * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
    * @param {Object} Router 当前路由对象
    */exports.rewriteUniFun = rewriteUniFun;
var registerLoddingPage = function registerLoddingPage(Router) {var _Router$CONFIG$APP =
  Router.CONFIG.APP,loddingPageHook = _Router$CONFIG$APP.loddingPageHook,loddingPageStyle = _Router$CONFIG$APP.loddingPageStyle; // 获取app所有配置
  var view = new plus.nativeObj.View('router-loadding', _objectSpread({
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%' },
  loddingPageStyle.call(Router)));

  loddingPageHook.call(Router, view); // 触发等待页面生命周期
};
/**
    * 移除当前 页面上 非router 声明的 onBackPress 事件
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options	当前page对象的 $options
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/106
    */exports.registerLoddingPage = registerLoddingPage;
var removeBackPressEvent = function removeBackPressEvent(page, options) {
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    options.onBackPress = [options.onBackPress[0]]; // 路由混入的都干掉
  }
};
/**
    * 判断当前页面是否需要拦截返回
    *
    * @param {Object} page 当前 vue 组件对象
    * @param {Object} options 当前 vue 组件对象下的$options对象
    * @param {Array} args  当前页面是点击头部返回还是底部返回
    * 修复 https://github.com/SilurianYang/uni-simple-router/issues/66
    *
    * this 为当前 Router 对象
    */exports.removeBackPressEvent = removeBackPressEvent;
var pageIsHeadBack = function pageIsHeadBack(page, options, args) {
  if (args[0].from == 'navigateBack') {// 调用api返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.backApiCallHook.call(this, options, args);
    return true;
  }
  var isBack = (0, _util.assertCanBack)(page);
  if (isBack) {// 可返回
    if (_config.Global.LockStatus) {// 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }
    _config.Global.LockStatus = true; // 设置为锁住状态
    _hooks.beforeBackHooks.call(this, options, args);
    return true;
  }
  return false;
};

/**
    * 开始初始化app端路由配置
    *
    * @param {Object} Router
    *
    * this 为当前 page 对象
    */exports.pageIsHeadBack = pageIsHeadBack;
var appInit = function appInit(Router) {
  _hooks.proxyLaunchHook.call(this);var
  holdTabbar = Router.CONFIG.APP.holdTabbar;
  if (holdTabbar) {// 开启tab拦截时
    rewriteUniFun(Router);
  }
  registerLoddingPage(Router);
};exports.appInit = appInit;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!**************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/appletsRouter/init.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _hooks = __webpack_require__(/*! ./hooks */ 44);

/**
                                                                                                                                      * 开始初始化app端路由配置
                                                                                                                                      *
                                                                                                                                      * @param {Object} Router 	当前Router对象
                                                                                                                                      *
                                                                                                                                      * this 为当前 page 对象
                                                                                                                                      */
var appletsInit = function appletsInit() {
  _hooks.proxyLaunchHook.call(this);
};var _default =
appletsInit;exports.default = _default;

/***/ }),

/***/ 60:
/*!************************************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/plugin/uni-simple-router/helpers/urlQuery.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 37);
var _warn = __webpack_require__(/*! ./warn */ 39);function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var nodeURL = __webpack_require__(/*! query-string */ 61);var

ParseQuery = /*#__PURE__*/function () {function ParseQuery() {_classCallCheck(this, ParseQuery);}_createClass(ParseQuery, [{ key: "isDepthObject",




    /**
                                                                                                                                                    * 判断当前这个对象是否为深度对象
                                                                                                                                                    * @param {Object} obj
                                                                                                                                                    */value: function isDepthObject(
    obj) {
      var str = JSON.stringify(obj);
      return str.match(/}/g).length > 1;
    }

    /**
       * 从URL中提取查询字符串
       * @param {String} url
       */ }, { key: "extract", value: function extract(
    url) {
      return nodeURL.extract(url);
    }

    /**
       * 把一个 key=value&key1=value 的字符串转成对象
       * @param {string} strQuery key=value&key1=value 类型的字符串
       */ }, { key: "parse", value: function parse(
    strQuery) {
      return nodeURL.parse(strQuery);
    }

    /**
       * 把一个对象转成 key=value&key1=value 类型的字符串
       * @param {Object} ObjQuery 符合js标注的对象
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "stringify", value: function stringify(
    ObjQuery) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var strQuery = nodeURL.stringify(ObjQuery);
      if (intact) {
        return "?".concat(strQuery);
      }
      return strQuery;
    }

    /**
       * 把一个对象或者 key=value&key1=value 类型的数据加密成 query=encodeURIComponent(value)
       * @param {Object|String} query 符合js标注的对象 或者 key=value&key1=value 字符串
       * @param {Boolean} intact 是否在转成的字符串前添加？号
       */ }, { key: "encode", value: function encode(
    query) {var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var
      strQuery = '',formatQuery = '';
      if (query == null) {
        (0, _warn.warn)('加密参数没有传递，你知道？', true);
        return '';
      }
      if (query.constructor === String) {// 字符串 尝试 转成 对象
        strQuery = JSON.stringify(this.parse(query));
      } else if (query.constructor === Object) {// 直接转成字符串对象即可
        if (Object.keys(query).length === 0) {
          (0, _warn.warn)('当前参数不满足加密规范！');
          return '';
        }
        strQuery = JSON.stringify(query);
      }
      if (intact) {
        formatQuery = '?';
      }
      formatQuery += "query=".concat(encodeURIComponent(strQuery));
      return formatQuery;
    }

    /**
       * 把一个已经加密好的字符串 query=encodeURIComponent(value) 解密成 对象
       * @param {string} strQuery  已经加密好的字符串 query=encodeURIComponent(value)
       */ }, { key: "decode", value: function decode(
    strQuery) {
      if (strQuery == null) {
        (0, _warn.warn)('解密参数没有传递，你知道？', true);
        return {};
      }
      var jsonQuery = strQuery;
      if (strQuery.constructor === Object) {// 如果是对象 看能不能满足要求
        jsonQuery = strQuery.query;
        if (jsonQuery == null) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
          return {};
        }
        jsonQuery = "query=".concat(jsonQuery);
      }
      var decode = {};
      // query 长这个样  query=encodeURIComponent(value)
      var decodeStr = decodeURIComponent(jsonQuery);var _this$parse =
      this.parse(decodeStr),query = _this$parse.query; // 转成 json 获取到正真的json字符串
      if (query == null) {
        (0, _warn.warn)('当前解密参数不满足编码规则');
      } else {
        try {
          decode = JSON.parse(query);
        } catch (error) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
        }
      }
      return decode;
    } }, { key: "queryGet", value: function queryGet(

    query) {var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      var decode = query,historyObj = query,strQuery = '';
      switch (encodeURI) {
        case true:{// 加密模式
            decode = this.decode(query);
            strQuery = this.encode(decode);
            historyObj = {
              query: encodeURIComponent(JSON.stringify(decode)) };

            break;
          }
        case false:{// 不加密模式
            strQuery = this.stringify(query);
            break;
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\'', true);
          }}

      return { strQuery: strQuery, historyObj: historyObj, decode: decode };
    }


    /**
       * 对需要传递的参数进行加密解密
       * @param {Object|String} query get为false 必须为 Object 类型
       * @param {String} get 是取值 还是通过api传值
       */ }, { key: "transfer", value: function transfer()
    {var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var
      encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置
      switch (encodeURI) {
        case true:{
            // 加密模式
            return this.encode(query, false);
          }
        case false:{
            // 不加密模式
            return this.stringify(query);
          }
        default:{
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\' ', true);
          }}

    } }, { key: "queryName", get: function get() {return nodeURL;} }]);return ParseQuery;}();var _default =


ParseQuery;exports.default = _default;

/***/ }),

/***/ 61:
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 62);
var objectAssign = __webpack_require__(/*! object-assign */ 63);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ 62:
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 63:
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 69:
/*!***********************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/work.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.os = exports.us = void 0; /**
                                                                                                              * 常用服务
                                                                                                              * useful server
                                                                                                              */
var icon_prefix = "/static/home/128/";

var us = {
  data: [
  {
    title: "信息填写",
    icon: icon_prefix + "richang.png",
    description: "填写毕业去向信息",
    useCount: 1000,
    page: 'infoin' },
  {
    title: "信息修改",
    icon: icon_prefix + "zhoubao.png",
    description: "修改毕业去向信息",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "招聘信息",
    icon: icon_prefix + "kaoqin.png",
    description: "发现新工作",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "留言板",
    icon: icon_prefix + "richeng.png",
    description: "留言板",
    useCount: 10000,
    page: 'message' },
  {
    title: "管理后台",
    icon: icon_prefix + "qingjia1.png",
    description: "管理后台",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "个人信息修改",
    icon: icon_prefix + "chuchai.png",
    description: "个人信息修改",
    useCount: 10000,
    page: 'userdetail' },
  {
    title: "帮助",
    icon: icon_prefix + "gongwen.png",
    description: "帮助",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "通知公告",
    icon: icon_prefix + "tongzhi.png",
    description: "通知公告",
    useCount: 10000,
    page: 'annotationList' },
  {
    title: "个人邮件",
    icon: icon_prefix + "youjian.png",
    description: "个人邮件",
    useCount: 10000,
    dot: false,
    page: 'helloWorld' },
  {
    title: "通讯录",
    icon: icon_prefix + "tongxun.png",
    description: "查看部门，组员",
    useCount: 10000,
    page: 'levelAddressBook' }] };





/**
                                    * other server 其他服务
                                    */exports.us = us;
var os = {
  data: [
  {
    title: "新闻中心",
    icon: icon_prefix + "xinwen.png",
    description: "新闻中心",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "投票中心",
    icon: icon_prefix + "toupiao.png",
    description: "投票中心",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "任务中心",
    icon: icon_prefix + "renwu.png",
    description: "任务中心",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "文档中心",
    icon: icon_prefix + "wendang.png",
    description: "文档中心",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "密码修改",
    icon: icon_prefix + "hetong.png",
    description: "密码修改",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "身份切换",
    icon: icon_prefix + "huiyi.png",
    description: "身份切换",
    useCount: 10000,
    page: 'login' },
  {
    title: "客户关系",
    icon: icon_prefix + "tongzhi.png",
    description: "客户关系",
    useCount: 10000,
    page: 'helloWorld' },
  {
    title: "定位",
    icon: icon_prefix + "tongzhi.png",
    description: "定位",
    useCount: 10000,
    page: 'location' }] };exports.os = os;

/***/ }),

/***/ 70:
/*!**********************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/js-sdk/socket/socket.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _configService = _interopRequireDefault(__webpack_require__(/*! @/common/service/config.service.js */ 28));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/index.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
socket = /*#__PURE__*/function () {
  function socket(options) {_classCallCheck(this, socket);
    this.socketUrl = _configService.default.apiUrl;
    this.socketStart = false;
    this.monitorSocketError();
    this.monitorSocketClose();
    this.socketReceive();
  }_createClass(socket, [{ key: "init", value: function init(
    socket_type, callback) {var _this2 = this;
      var _this = this;
      if (_configService.default.apiUrl) {
        if (this.socketStart) {
          console.log('webSocket已经启动了');
        } else {
          var userid = _index.default.state.userid ? _index.default.state.userid : _index.default.getters.userid;
          var url = this.socketUrl.replace("https://", "wss://").replace("http://", "ws://") + "/" + socket_type + "/" + userid + "_app";
          console.log("启动this.socketUrl连接地址:", url);

          uni.connectSocket({
            url: url,
            method: 'GET' });

          uni.onSocketOpen(function (res) {
            _this2.socketStart = true;
            callback && callback();
            console.log('WebSocket连接已打开！');
          });
          /*setTimeout(() => {
                 _this.getHeartbeat();
              }, 5000);*/
        }
      } else {
        console.log('config/baseUrl socketUrl为空');
      }
    }
    //Socket给服务器发送消息
  }, { key: "send", value: function send(data, callback) {
      var _this = this;
      if (_index.default.state.userid) {
        data.userUid = _index.default.state.userid;
      }
      console.log(data);
      uni.sendSocketMessage({
        data: JSON.stringify(data),
        success: function success() {
          callback && callback(true);
        },
        fail: function fail() {
          callback && callback(false);
        } });

    }
    //Socket接收服务器发送过来的消息
  }, { key: "socketReceive", value: function socketReceive() {
      var _this = this;
      uni.onSocketMessage(function (res) {
        console.log("APP:----》收到服务器内容:", res);
        var data = JSON.parse(res.data);
        //console.log('收到服务器内容：', data);
        _this.acceptMessage && _this.acceptMessage(data);
      });
    }
    //关闭Socket
  }, { key: "closeSocket", value: function closeSocket() {
      var _this = this;
      uni.closeSocket();
      _this.socketStart = false;
    }
    //监听Socket关闭
  }, { key: "monitorSocketClose", value: function monitorSocketClose() {
      var _this = this;
      uni.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！');
        _this.socketStart = false;
        setTimeout(function () {
          //_this.init();
        }, 3000);
      });
    }
    //监听Socket错误
  }, { key: "monitorSocketError", value: function monitorSocketError() {
      var _this = this;
      uni.onSocketError(function (res) {
        _this.socketStart = false;
        console.log('WebSocket连接打开失败，请检查！');
      });
    }
    //心跳
  }, { key: "getHeartbeat", value: function getHeartbeat() {
      var _this = this;
      this.send({
        type: "心跳",
        userUid: _index.default.state.userid },
      function (val) {
        setTimeout(function () {
          if (val) {
            //_this.getHeartbeat();
          } else {
            if (!_this.socketStart) {
              //_this.init();
            }
          }
        }, 10000);
      });
    } }]);return socket;}();
;
var mySocket = new socket();var _default =
mySocket;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 9:
/*!****************************************************************!*\
  !*** D:/work/code/gra/gra-design-app/common/util/appUpdate.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = appUpdate; //APP更新

function appUpdate() {
  uni.request({
    url: 'http://app.jeecg.com/update.json', //检查更新的服务器地址
    data: {
      appid: plus.runtime.appid,
      version: plus.runtime.version,
      imei: plus.device.imei },

    success: function success(res) {
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        var client_version = wgtinfo.version;
        var flag_update = client_version.split(".").splice(0, 2).join(".") != res.data.version.split(".").splice(0, 2).
        join(".");
        var flag_hot = Number(client_version.split(".")[2]) < Number(res.data.version.split(".")[2]) & !flag_update;
        console.log(client_version);
        console.log(flag_update);
        console.log(flag_hot);

        if (flag_update) {
          // 提醒用户更新
          uni.showModal({
            title: '更新提示',
            content: res.data.note,
            success: function success(showResult) {
              if (showResult.confirm) {
                plus.nativeUI.toast("正在准备环境，请稍后!");
                console.log(res.data.url);
                var dtask = plus.downloader.createDownload(res.data.url, {
                  method: 'GET',
                  filename: '_doc/update/' },
                function (d, status) {
                  if (status == 200) {
                    var path = d.filename; //下载apk
                    plus.runtime.install(path); // 自动安装apk文件
                  } else {
                    plus.nativeUI.alert('版本更新失败:' + status);
                  }
                });
                dtask.start();
              }
            } });

        } else if (flag_hot) {
          uni.downloadFile({
            url: res.data.wgtUrl,
            success: function success(downloadResult) {
              console.log(downloadResult.tempFilePath);
              if (downloadResult.statusCode === 200) {
                plus.nativeUI.toast("\u6B63\u5728\u70ED\u66F4\u65B0!".concat(res.data.versionCode));
                plus.runtime.install(downloadResult.tempFilePath, {
                  force: false },
                function () {
                  plus.nativeUI.toast("热更新成功");
                  plus.runtime.restart();
                }, function (e) {
                  console.log(e);
                  plus.nativeUI.toast("\u70ED\u66F4\u65B0\u5931\u8D25:".concat(e.message));
                });
              }
            } });

        }

      });




    } });

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map