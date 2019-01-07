export default function createTransition(fromView, toView, data) {

    const createTween = this[`_create${this._tweenLibName}Tween`].bind(this);
    const startTween = this[`_start${this._tweenLibName}Tween`].bind(this);

    const isFrom = this._getTransitionType(data);

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
        return createTween(sprite, item);
    });

    return {
        start: () => {
            container1.visible = false;
            transitionContainer.visible = true;
            container2.visible = true;
            this._ticker.start();
            const promises = tweens.map(startTween);
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
    };
}
