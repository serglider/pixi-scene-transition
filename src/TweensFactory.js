import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";

export default class TweensFactory {

    constructor(renderer, stage) {
        this.renderer = renderer;
        this.stage = stage;
    }

    create(view, newView, config) {
        view.cacheAsBitmap = true;
        return (cfg) => {
            return new Promise(resolve => {
                const tw = this[`_createTween${config.type}`](this.renderer, this.stage, view, newView, cfg);
                tw.onComplete(resolve).start()
            });
        };
    }

    // TODO: remove hidden sprites

    _createTweenA(rend, stage, view, newView, config) {
        const thing = new PIXI.Graphics();
        stage.addChild(thing);
        thing.position.x = rend.width / 2;
        thing.position.y = rend.height / 2;
        thing.lineStyle(0);

        const texture = rend.generateTexture(view, 0, 1, new PIXI.Rectangle(...config.rect));
        const sprite = new PIXI.Sprite(texture);
        sprite.x = config.rect[0];
        sprite.y = config.rect[1];
        sprite.mask = thing;
        const toIndex = stage.getChildIndex(newView);
        stage.addChildAt (sprite, toIndex + 1);
        const radiusObj = {radius: 640};
        return new TWEEN.Tween(radiusObj).to({radius: 1}, config.duration).onUpdate(() => {
            thing.clear();
            thing.beginFill(0x000000);
            thing.drawCircle(0, 0, radiusObj.radius);
        });
    }

    _createTweenB(rend, stage, view, newView, config) {
        const texture = rend.generateTexture(view, 0, 1, new PIXI.Rectangle(...config.rect));
        const sprite = new PIXI.Sprite(texture);
        sprite.x = config.rect[0];
        sprite.y = config.rect[1];
        const toIndex = stage.getChildIndex(newView);
        stage.addChildAt (sprite, toIndex + 1);
        return new TWEEN.Tween(sprite).to(config.to, config.duration);
    }

    _createTweenC(rend, stage, view, newView, config) {
        const texture = rend.generateTexture(view, 0, 1, new PIXI.Rectangle(...config.rect));
        const sprite = new PIXI.Sprite(texture);
        sprite.x = config.rect[0];
        sprite.y = config.rect[1];
        const toIndex = stage.getChildIndex(newView);
        stage.addChildAt (sprite, toIndex + 1);
        return new TWEEN.Tween(sprite.position).to(config.to, config.duration);
    }

    _createTweenD(rend, stage, view, newView, config) {
        const texture = rend.generateTexture(view, 0, 1, new PIXI.Rectangle(...config.rect));
        const sprite = new PIXI.Sprite(texture);
        sprite.x = config.rect[0];
        sprite.y = config.rect[1];
        const toIndex = stage.getChildIndex(newView);
        stage.addChildAt (sprite, toIndex + 1);

        const {x, y, alpha} = sprite;
        const twObj = {x, y, alpha};
        return new TWEEN.Tween(twObj).to(config.to, config.duration).onUpdate(() => {
            sprite.x = twObj.x;
            sprite.y = twObj.y;
            sprite.alpha = twObj.alpha;
        });
    }
}


