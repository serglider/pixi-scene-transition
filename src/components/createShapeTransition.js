export default function createShapeTransition(fromView, toView, data) {

    const defaults = {
        duration: 1,
        delay: 0,
        easing: 'Linear.easeNone',
        path:[
            550, 100,
            570, 150,
            630, 155,
            585, 195,
            600, 250,
            550, 220,
            500, 250,
            515, 195,
            470, 155,
            530, 150
        ],
        scaleFrom: 3,
        scaleTo: 0.01
    };
    const options = Object.assign({}, defaults, data);
    const mask = new PIXI.Graphics();
    fromView.parent.addChild(mask);
    // mask.scale.x = options.scaleFrom;
    const tweenObj = {
        x: 10
    };
    const vars = {
        x: 0.01,
        paused: true,
        // delay: options.delay,
        // ease: options.easing,
        onUpdate: update
    };
    const tw = this._tweenLib.to(tweenObj, 1, vars);

    return {
        start: () => {
            fromView.mask = mask;
            return new Promise(resolve => {
                tw.eventCallback('onComplete', resolve);
                tw.play();
            })
        }
    };

    function update() {
        console.log(tweenObj.x);
        mask.scale.set(tweenObj.scale);

        mask.clear();
        mask.beginFill(0x000000);
        mask.drawPolygon(options.path);

    }
}
