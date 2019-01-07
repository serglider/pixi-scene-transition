export function _createTWEENTween(sprite, data) {
    const tweenKeys = Object.keys(data.to);
    const tweenObj = tweenKeys.reduce(addToTweenObj, {});
    const delay = data.delay || 0;
    const duration = data.duration || 500;
    const easing = data.easing || this._tweenLib.Easing.Linear.None;
    return new this._tweenLib.Tween(tweenObj)
        .to(data.to, duration)
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

export function _startTWEENTween(tw) {
    return new Promise(resolve => {
        tw.onComplete(resolve).start();
    });
}