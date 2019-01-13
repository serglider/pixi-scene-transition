export default function createShapeTransition(fromView, toView, common = {}, fadeOut = {}, fadeIn = {}) {
    const {width, height} = fromView;
    const bounds = [0, 0, width, height];
    const defaults = {
        color: 0x000000,
        sprite: null
    };
    const commonOptions = Object.assign({}, defaults, common);
    const fadeOutOptions = Object.assign({}, commonOptions, fadeOut);
    const fadeInOptions = Object.assign({}, commonOptions, fadeIn);
    fadeOutOptions.bounds = fadeInOptions.bounds = bounds;
    fadeOutOptions.from = {alpha: 0};
    fadeInOptions.to = {alpha: 0};

    const interimContainer = createFadeMask(fromView, bounds, commonOptions.color);
    const fadeOutTrans = this.createTransition(fromView, interimContainer, [fadeOutOptions]);
    const fadeInTrans = this.createTransition(interimContainer, toView, [fadeInOptions]);

    return {
        start: () => {
            return fadeOutTrans.start().then(() => fadeInTrans.start());
        }
    };
}

function createFadeMask(fromView, bounds, color) {
    const toIndex = fromView.parent.getChildIndex(fromView);
    const container = new PIXI.Container();
    container.visible = false;
    fromView.parent.addChildAt(container, toIndex + 1);
    const fadeMask = new PIXI.Graphics();
    container.addChild(fadeMask);
    fadeMask.lineStyle(0);
    fadeMask.beginFill(color);
    fadeMask.drawRect(...bounds);
    return container;
}