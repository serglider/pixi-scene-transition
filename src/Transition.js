import * as PIXI from "pixi.js";
import TWEEN from '@tweenjs/tween.js';
import TweensFactory from "./TweensFactory";

export default class Transition {

    constructor(app) {
        this.app = app;
        this.app.ticker.add(() => {
            TWEEN.update();
        });
        this._TweenFactory = new TweensFactory(app.renderer, app.stage);
    }

    transition(from, to, config) {

        const createTween = this._TweenFactory.create(from, to, config);
        const bounds = getBoundsList(this.app.screen, config);

        const tweens = bounds.map((rect, i) => {
                const arr = [
                    {y: 0, x: 1280 - rect[2], alpha: 0},
                    {y: 720 - rect[2], x: 0, alpha: 0},
                    {y: 0, x: 0, alpha: 0},
                    {y: 720 - rect[2], x: 1280 - rect[2], alpha: 0},
                ];
        //     const arr = [
        //         {y: 720, x: rect[0], alpha: 0},
        //         {y: -rect[3], x: rect[0], alpha: 0},
        //         {y: rect[1], x: 1280, alpha: 0},
        //         {y: rect[1], x: -rect[2], alpha: 0},
        //     ];
        //     const index = Math.floor(Math.random() * 4);
            const index = i%4;
            const to = arr[index];
            return createTween({
                rect,
                duration: config.duration,
                to
            });
        });
        from.visible = false;
        to.visible = true;
        return Promise.all(tweens).then(() => {
            from.cacheAsBitmap = false;
            console.log('DONE!');
        })
    }
}

function getBoundsList({width, height}, {rows = 1, columns = 1}) {
    const h = Math.ceil(height / rows);
    const w = Math.ceil(width / columns);
    return Array.from(Array(columns*rows), (_, i) => {
        const x = columns === 1 ? 0 : i % columns * w;
        const y = rows === 1 ? 0 : Math.floor(i / rows) * h;
        return [x, y, w, h];
    })
}
