export default function init(renderer, tweenLib) {

    this._ticker = new PIXI.ticker.Ticker();
    this._ticker.stop();
    this._tweenLibName = tweenLib.Tween ? 'TWEEN' : 'GSAP';
    if (this._tweenLibName === 'TWEEN') {
        this._ticker.add(() => {
            tweenLib.update();
        });
    }
    this._tweenLib = tweenLib;
    this._renderer = renderer;
}
