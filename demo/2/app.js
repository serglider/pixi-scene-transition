const twParams1 = {
    delay: 0,
    eas: 'Linear.None',
    easing: TWEEN.Easing.Linear.None,
    duration: 1000,
    columns: 1,
    rows: 1
};
const twParams2 = {
    delay: 0,
    eas: 'Linear.None',
    easing: TWEEN.Easing.Linear.None,
    duration: 1000,
    columns: 1,
    rows: 1
};
const esList = [
    'Linear.None',
    'Exponential.In',
    'Exponential.Out',
    'Exponential.InOut',
    'Circular.In',
    'Circular.Out',
    'Circular.InOut',
    'Elastic.In',
    'Elastic.Out',
    'Elastic.InOut',
    'Back.In',
    'Back.Out',
    'Back.InOut',
    'Bounce.In',
    'Bounce.Out',
    'Bounce.InOut',
    'Quadratic.In',
    'Quadratic.Out',
    'Quadratic.InOut',
    'Cubic.In',
    'Cubic.Out',
    'Cubic.InOut',
    'Quartic.In',
    'Quartic.Out',
    'Quartic.InOut',
    'Quintic.In',
    'Quintic.Out',
    'Quintic.InOut',
    'Sinusoidal.In',
    'Sinusoidal.Out',
    'Sinusoidal.InOut',
];
const gui = new dat.GUI();
const f1 = gui.addFolder('transition 1');
f1.add(twParams1, 'columns', 1, 30).step(1);
f1.add(twParams1, 'rows', 1, 30).step(1);
f1.add(twParams1, 'delay', 0, 5000).step(50);
f1.add(twParams1, 'duration', 0, 5000).step(50);
const ctrl1 = f1.add(twParams1, 'eas', esList);
ctrl1.onFinishChange(setEasing.bind(twParams1));
f1.open();
const f2 = gui.addFolder('transition 2');
f2.add(twParams2, 'columns', 1, 30).step(1);
f2.add(twParams2, 'rows', 1, 30).step(1);
f2.add(twParams2, 'delay', 0, 5000).step(50);
f2.add(twParams2, 'duration', 0, 5000).step(50);
const ctrl2 = f2.add(twParams2, 'eas', esList);
ctrl2.onFinishChange(setEasing.bind(twParams2));
f2.open();

function setEasing(val) {
    const [k1, k2] = val.split('.');
    this.easing = TWEEN.Easing[k1][k2];
}

PIXI.loader
    .add('rock', '../assets/rock01.jpg')
    .add('clover', '../assets/clover.jpg')
    .add('anim', '../assets/fighter.json')
    .load(setup);

function setup(loader, resources) {

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

    STM.init(app.renderer, TWEEN);

    app.ticker.add(function () {
        anim.rotation += 0.01;
        anim1.rotation -= 0.01;
    });

    scene1.on('pointerdown', () => {
        const regs1 = STM.getRegions(scene1, [twParams1.columns, twParams1.rows]);
        const data = regs1.map((bounds, i) => {
            const from = {
                y: bounds[1],
                x: i % 2 ? -1000 : 1000
            };
            const delay = twParams1.delay;
            return {
                bounds,
                easing: twParams1.easing,
                delay,
                duration: twParams1.duration,
                from
            };
        });
        const trans = STM.createTransition(scene1, scene2, data);
        const lc = logComplete();
        trans.start().then(lc);
    });

    scene2.on('pointerdown', () => {
        const regs2 = STM.getRegions(scene1, [twParams2.columns, twParams2.rows]);
        const data = regs2.map((bounds, i) => {
            const to = {
                y: bounds[1],
                x: i % 2 ? -1000 : 1000
            };
            const delay = twParams2.delay;
            return {
                bounds,
                easing: twParams2.easing,
                delay,
                duration: twParams2.duration,
                to
            };
        });
        const trans = STM.createTransition(scene2, scene1, data);
        const lc = logComplete();
        trans.start().then(lc);
    });
}
