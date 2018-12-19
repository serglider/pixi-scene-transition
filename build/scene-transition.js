(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sceneTransition"] = factory();
	else
		root["sceneTransition"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SceneTransition.js":
/*!********************************!*\
  !*** ./src/SceneTransition.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SceneTransition; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SceneTransition =
/*#__PURE__*/
function () {
  function SceneTransition(renderer, tweenLib) {
    _classCallCheck(this, SceneTransition);

    this._ticker = new PIXI.ticker.Ticker();

    this._ticker.stop();

    this._tweenLibName = tweenLib.Tween ? 'TWEEN' : 'GSAP';

    if (this._tweenLibName === 'TWEEN') {
      this._ticker.add(function () {
        tweenLib.update();
      });
    }

    this._tweenLib = tweenLib;
    this._renderer = renderer;
  }

  _createClass(SceneTransition, [{
    key: "createTransition",
    value: function createTransition(fromView, toView, data) {
      var _this = this;

      var createTween = this["_create".concat(this._tweenLibName, "Tween")].bind(this);
      var startTween = this["_start".concat(this._tweenLibName, "Tween")].bind(this);
      var isFrom = SceneTransition.getTransitionType(data);
      var container1, container2;

      if (!isFrom) {
        container1 = fromView;
        container2 = toView;
      } else {
        container1 = toView;
        container2 = fromView;
      }

      var toIndex = container2.parent.getChildIndex(container2);
      var transitionContainer = new PIXI.Container();
      container2.parent.addChildAt(transitionContainer, toIndex + 1);
      transitionContainer.visible = false;
      container1.visible = true;
      var tweens = data.map(function (item) {
        var sprite = _this._getSprite(container1, item.anchor, item.bounds, item.from);

        if (item.from) {
          item.to = {
            x: item.bounds[0] + item.bounds[2] * sprite.anchor.x,
            y: item.bounds[1] + item.bounds[3] * sprite.anchor.y,
            alpha: 1,
            rotation: 0,
            scale: 1
          };
        }

        transitionContainer.addChild(sprite);
        return createTween(sprite, item);
      });
      return {
        start: function start() {
          container1.visible = false;
          transitionContainer.visible = true;
          container2.visible = true;

          _this._ticker.start();

          var promises = tweens.map(startTween);
          return Promise.all(promises).then(function () {
            if (isFrom) {
              container1.visible = true;
              container2.visible = false;
            }

            _this._ticker.stop();

            transitionContainer.destroy(true);
            return Promise.resolve();
          });
        }
      };
    }
  }, {
    key: "_startTWEENTween",
    value: function _startTWEENTween(tw) {
      return new Promise(function (resolve) {
        tw.onComplete(resolve).start();
      });
    }
  }, {
    key: "_startGSAPTween",
    value: function _startGSAPTween(tw) {
      return new Promise(function (resolve) {
        tw.eventCallback('onComplete', resolve);
        tw.play();
      });
    }
  }, {
    key: "_createTWEENTween",
    value: function _createTWEENTween(sprite, data) {
      var tweenKeys = Object.keys(data.to);
      var tweenObj = tweenKeys.reduce(addToTweenObj, {});
      var delay = data.delay || 0;
      var easing = data.easing || this._tweenLib.Easing.Linear.None;
      return new this._tweenLib.Tween(tweenObj).to(data.to, data.duration).onUpdate(update).delay(delay).easing(easing);

      function addToTweenObj(obj, key) {
        if (key === 'scale') {
          obj[key] = data.from && 'scale' in data.from ? data.from.scale : 1;
        } else {
          obj[key] = sprite[key];
        }

        return obj;
      }

      function update() {
        tweenKeys.forEach(function (key) {
          if (key === 'scale') {
            sprite.scale.set(tweenObj[key]);
          } else {
            sprite[key] = tweenObj[key];
          }
        });
      }
    }
  }, {
    key: "_createGSAPTween",
    value: function _createGSAPTween(sprite, data) {
      var tweenKeys = Object.keys(data.to);
      var tweenObj = tweenKeys.reduce(addToTweenObj, {});
      var delay = data.delay / 1000 || 0;
      var ease = data.easing || 'Linear.easeNone';
      var vars = Object.assign({}, data.to, {
        paused: true,
        delay: delay,
        ease: ease,
        onUpdate: update
      });
      return this._tweenLib.to(tweenObj, data.duration / 1000, vars);

      function addToTweenObj(obj, key) {
        if (key === 'scale') {
          obj[key] = data.from && 'scale' in data.from ? data.from.scale : 1;
        } else {
          obj[key] = sprite[key];
        }

        return obj;
      }

      function update() {
        tweenKeys.forEach(function (key) {
          if (key === 'scale') {
            sprite.scale.set(tweenObj[key]);
          } else {
            sprite[key] = tweenObj[key];
          }
        });
      }
    }
  }, {
    key: "_getSprite",
    value: function _getSprite(view, anchor, bounds, fromObj) {
      var texture = this._renderer.generateTexture(view, 0, 1, _construct(PIXI.Rectangle, _toConsumableArray(bounds)));

      var sprite = new PIXI.Sprite(texture);

      if (anchor) {
        sprite.anchor.set(anchor);
      }

      if (fromObj) {
        Object.keys(fromObj).forEach(function (key) {
          if (key === 'scale') {
            sprite.scale.set(fromObj[key]);
          } else {
            sprite[key] = fromObj[key];
          }
        });
      } else {
        sprite.x = bounds[0] + bounds[2] * sprite.anchor.x;
        sprite.y = bounds[1] + bounds[3] * sprite.anchor.y;
      }

      return sprite;
    }
  }], [{
    key: "getTransitionType",
    value: function getTransitionType(list) {
      return list.every(function (item) {
        return item.from;
      });
    }
  }, {
    key: "getRegions",
    value: function getRegions(_ref) {
      var width = _ref.width,
          height = _ref.height;
      var dims = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1, 1];

      var _dims = _slicedToArray(dims, 2),
          columns = _dims[0],
          rows = _dims[1];

      if (!columns || !rows) return [];
      var h = Math.ceil(height / rows);
      var w = Math.ceil(width / columns);
      return Array.from(Array(columns * rows), getBounds);

      function getBounds(_, i) {
        var x = i % columns * w;
        var y = Math.floor(i / columns) * h;
        return [x, y, w, h];
      }
    }
  }]);

  return SceneTransition;
}();


SceneTransition.TYPES = {
  OUT: 0,
  IN: 1
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SceneTransition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SceneTransition */ "./src/SceneTransition.js");


if (!PIXI) {
  throw new Error('foobar');
}

PIXI.SceneTransitionManager = _SceneTransition__WEBPACK_IMPORTED_MODULE_0__["default"];

/***/ })

/******/ });
});
//# sourceMappingURL=scene-transition.js.map