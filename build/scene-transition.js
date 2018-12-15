/******/ (function(modules) { // webpackBootstrap
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
class SceneTransition {

    constructor(renderer, TWEEN) {
        this._ticker = new PIXI.ticker.Ticker();
        this._ticker.stop();
        this._ticker.add(() => {
            TWEEN.update();
        });
        this._TWEEN = TWEEN;
        this._renderer = renderer;
    }

    createTransition(fromView, toView, data) {

        const isFrom = SceneTransition.getTransitionType(data);
        let container1, container2;
        if (!isFrom) {
            container1 = fromView;
            container2 = toView;
        } else {
            container1 = toView;
            container2 = fromView;
        }
        const toIndex = container2.parent.getChildIndex(container2);
        const transitionContainer = new PIXI.Container();
        container2.parent.addChildAt(transitionContainer, toIndex + 1);
        transitionContainer.visible = false;
        container1.visible = true;
        const tweens = data.map(item => {
            const sprite = this._getSprite(container1, item.anchor, item.bounds, item.from);
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
            return this._createTween(sprite, item);
        });

        return {
            start: () => {
                container1.visible = false;
                transitionContainer.visible = true;
                container2.visible = true;
                this._ticker.start();
                const promises = tweens.map(this._startTween);
                return Promise.all(promises).then(() => {
                    if (isFrom) {
                        container1.visible = true;
                        container2.visible = false;
                    }
                    this._ticker.stop();
                    transitionContainer.destroy(true);
                    return Promise.resolve();
                });
            }
        }
    }

    _startTween(tw) {
        return new Promise(resolve => {
            tw.onComplete(resolve).start();
        });
    }

    _createTween(sprite, data) {
        const tweenKeys = Object.keys(data.to);
        const tweenObj = tweenKeys.reduce(addToTweenObj, {});
        const delay = data.delay || 0;
        const easing = data.easing || this._TWEEN.Easing.Linear.None;
        return new this._TWEEN.Tween(tweenObj)
                        .to(data.to, data.duration)
                        .onUpdate(update)
                        .delay(delay)
                        .easing(easing);

        function addToTweenObj(obj, key) {
            if (key === 'scale') {
                obj[key] = data.from && ('scale' in data.from) ? data.from.scale : 1;
            } else {
                obj[key] = sprite[key];
            }
            return obj;
        }

        function update() {
            tweenKeys.forEach(key => {
                if (key === 'scale') {
                    sprite.scale.set(tweenObj[key]);
                } else {
                    sprite[key] = tweenObj[key];
                }
            });
        }
    }

    _getSprite(view, anchor, bounds, fromObj) {
        const texture = this._renderer.generateTexture(view, 0, 1, new PIXI.Rectangle(...bounds));
        const sprite = new PIXI.Sprite(texture);
        if (anchor) {
            sprite.anchor.set(anchor);
        }
        if (fromObj) {
            Object.keys(fromObj).forEach(key => {
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

    static getTransitionType(list) {
        return list.every(item => item.from);
    }

    static getRegions({width, height}, dims = [1, 1]) {
        const [columns, rows] = dims;
        if (!columns || !rows) return [];
        const h = Math.ceil(height / rows);
        const w = Math.ceil(width / columns);
        return Array.from(Array(columns * rows), getBounds);

        function getBounds(_, i) {
            const x = i % columns * w;
            const y = Math.floor(i / columns) * h;
            return [x, y, w, h];
        }
    }
}

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
//# sourceMappingURL=scene-transition.js.map