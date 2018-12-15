PIXI.loader
    .add('rock', '../assets/rock01.jpg')
    .add('clover', '../assets/clover.jpg')
    .add('anim', '../assets/fighter.json')
    .load(setup);

function setup(loader, resources) {

    // TODO: add dat GUI
    // TODO: add rotate and scale
    // TODO: try other tween libs
    // TODO: PIXI.SceneTransitionManager.TweenItem class ??

    const app = new PIXI.Application(1000, 618);
    const wrapper = document.querySelector('.demo');
    wrapper.appendChild(app.view);
    const STM = PIXI.SceneTransitionManager;
    const W = app.screen.width;
    const H = app.screen.height;
    const scene2 = createScene(app.stage, resources.rock, {w: W, h: H});
    const scene1 = createScene(app.stage, resources.clover, {w: W, h: H});
    const anim = createAnimation(scene1, resources.anim, {x: W / 2 - 200, y: H / 2});
    const anim1 = createAnimation(scene2, resources.anim, {x: W / 2 + 200, y: H / 2});

    const regs = STM.getRegions(scene1, [1, 30]);
    const stm = new STM(app.renderer, TWEEN);

    app.ticker.add(function () {
        anim.rotation += 0.01;
        anim1.rotation -= 0.01;
    });

    scene1.on('pointerdown', () => {

        const data = regs.map((bounds, i) => {
            const from = {
                y: bounds[1],
                x: i % 2 ? -1000 : 1000
            };
            const delay = i % 2 ? 0 : 300;
            return {
                bounds,
                easing: TWEEN.Easing.Back.Out,
                // delay,
                duration: 1000,
                from
            };
        });
        const trans = stm.createTransition(scene1, scene2, data);
        const lc = logComplete();
        trans.start().then(lc);
    });

    // Linear
    // Quadratic
    // Cubic
    // Quartic
    // Quintic
    // Sinusoidal
    // Exponential
    // Circular
    // Elastic
    // Back
    // Bounce

    scene2.on('pointerdown', () => {
        const data = regs.map((bounds, i) => {
            const to = {
                y: bounds[1],
                x: i % 2 ? -1000 : 1000
            };
            return {
                easing: TWEEN.Easing.Bounce.In,
                bounds,
                duration: 1000,
                to
            };
        });
        const trans = stm.createTransition(scene2, scene1, data);
        const lc = logComplete();
        trans.start().then(lc);
    });
}
