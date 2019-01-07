export function _createGSAPTween(sprite, data) {
    const tweenKeys = Object.keys(data.to);
    const tweenObj = tweenKeys.reduce(addToTweenObj, {});
    const duration = data.duration / 1000 || 0.5;
    const delay = data.delay / 1000 || 0;
    const ease = data.easing || 'Linear.easeNone';
    const vars = Object.assign({}, data.to, {
        paused: true,
        delay,
        ease,
        onUpdate: update
    });
    return this._tweenLib.to(tweenObj, duration, vars);

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

export function _startGSAPTween(tw) {
    return new Promise(resolve => {
        tw.eventCallback('onComplete', resolve);
        tw.play();
    });
}