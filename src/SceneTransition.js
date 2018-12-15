import * as PIXI from "pixi.js";

export default class SceneTransition {

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
            const sprite = this._getSprite(container1, item.bounds, item.from);
            if (item.from) {
                item.to = {
                    x: item.bounds[0],
                    y: item.bounds[1],
                    alpha: 1
                }
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
        const tweenObj = tweenKeys.reduce((acc, key) => {
            acc[key] = sprite[key];
            return acc;
        }, {});

        function update() {
            tweenKeys.forEach(key => {
                sprite[key] = tweenObj[key];
            });
        }
        const delay = data.delay || 0;
        const es = data.easing || this._TWEEN.Easing.Linear.None;
        return new this._TWEEN.Tween(tweenObj).to(data.to, data.duration).onUpdate(update).delay(delay).easing(es);
    }

    _getSprite(view, bounds, fromObj) {
        const texture = this._renderer.generateTexture(view, 0, 1, new PIXI.Rectangle(...bounds));
        const sprite = new PIXI.Sprite(texture);
        if (fromObj) {
            Object.keys(fromObj).forEach(key => {
                sprite[key] = fromObj[key];
            });
        } else {
            sprite.x = bounds[0];
            sprite.y = bounds[1];
        }

        return sprite;
    }

    static getTransitionType(list) {
        return list.every(item => item.from);
        // return isFrom ? this.TYPES.IN : this.TYPES.OUT;
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
