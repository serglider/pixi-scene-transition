PIXI.loader
    .add('rock', '../../assets/rock01.jpg')
    .add('clover', '../../assets/clover.jpg')
    .add('anim', '../../assets/fighter.json')
    .load(setup);

function setup(loader, resources) {

    const app = new PIXI.Application(1000, 618);
    const wrapper = document.querySelector('.demo');
    wrapper.appendChild(app.view);
    const STM = PIXI.SceneTransitionManager;
    const W = app.screen.width;
    const H = app.screen.height;
    const scene1 = createScene(app.stage, resources.clover, {w: W, h: H});
    const scene2 = createScene(app.stage, resources.rock, {w: W, h: H});
    const anim = createAnimation(scene1, resources.anim, {x: W / 2 - 200, y: H / 2});
    const anim1 = createAnimation(scene2, resources.anim, {x: W / 2 + 200, y: H / 2});

    const regs = STM.getRegions(scene1, [5, 1]);
    const stm = new STM(app.renderer, TWEEN);

    app.ticker.add(function () {
        anim.rotation += 0.01;
        anim1.rotation -= 0.01;
    });

    scene1.on('pointerdown', () => {

        const data = regs.map((bounds, i) => {
            const to = {
                y: i % 2 ? -bounds[3] : 618,
                x: bounds[0],
                alpha: 0
            };
            return {
                bounds,
                duration: 500,
                to
            };
        });
        const trans = stm.createTransition(scene1, scene2, data);
        const lc = logComplete();
        trans.start().then(lc);
    });

    scene2.on('pointerdown', () => {
        const data = regs.map((bounds, i) => {
            const from = {
                y: i % 2 ? -bounds[3] : 720,
                x: bounds[0],
                alpha: 0
            };
            return {
                bounds,
                duration: 1000,
                from
            };
        });
        const trans = stm.createTransition(scene2, scene1, data);
        const lc = logComplete();
        trans.start().then(lc);
    });
}
