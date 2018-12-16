const twParams1 = {
    delay: 0,
    rotation: 0,
    easing: 'Linear.easeNone',
    duration: 1000,
    columns: 1,
    rows: 1
};
const twParams2 = {
    delay: 0,
    rotation: 0,
    easing: 'Linear.easeNone',
    duration: 1000,
    columns: 1,
    rows: 1
};
const easeNames = [
    'Elastic',
    'Back',
    'Bounce',
    'SlowMo',
    'SteppedEase',
    'Rough',
    'Circ',
    'Expo',
    'Sine',
    'Power0.',
    'Power2',
    'Power4',
    'Quad',
    'Cubic',
    'Quart',
    'Cubic',
    'Strong',
].reduce((acc, name) => {
    acc.push(`${name}.easeIn`, `${name}.easeOut`, `${name}.easeInOut`);
    return acc;
}, []);
const esList = ['Linear.easeNone'].concat(easeNames);

const gui = new dat.GUI();
const f1 = gui.addFolder('transition 1');
f1.add(twParams1, 'columns', 1, 30).step(1);
f1.add(twParams1, 'rows', 1, 30).step(1);
f1.add(twParams1, 'rotation', 0, 31.4).step(0.02);
f1.add(twParams1, 'delay', 0, 5000).step(50);
f1.add(twParams1, 'duration', 0, 5000).step(50);
const ctrl1 = f1.add(twParams1, 'easing', esList);
// f1.open();
const f2 = gui.addFolder('transition 2');
f2.add(twParams2, 'columns', 1, 30).step(1);
f2.add(twParams2, 'rows', 1, 30).step(1);
f2.add(twParams2, 'rotation', 0, 31.4).step(0.02);
f2.add(twParams2, 'delay', 0, 5000).step(50);
f2.add(twParams2, 'duration', 0, 5000).step(50);
const ctrl2 = f2.add(twParams2, 'easing', esList);
// f2.open();

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

    const stm = new STM(app.renderer, TweenLite);

    app.ticker.add(function () {
        anim.rotation += 0.01;
        anim1.rotation -= 0.01;
    });

    scene1.on('pointerdown', () => {
        const regs1 = STM.getRegions(scene1, [twParams1.columns, twParams1.rows]);
        const data = regs1.map((bounds, i) => {

            const _x = bounds[0] + bounds[2] / 2;
            const _y = bounds[1] + bounds[3] / 2;
            const to = {
                x: _x,
                y: _y,
                scale: 0.01,
                rotation: twParams1.rotation
            };
            const delay = Math.random() > 0.5 ? 0 : 600;
            return {
                anchor: 0.5,
                bounds,
                easing: twParams1.easing,
                delay,
                duration: twParams1.duration,
                to
            };
        });
        const trans = stm.createTransition(scene1, scene2, data);
        const lc = logComplete();
        trans.start().then(lc);
    });

    scene2.on('pointerdown', () => {
        const regs2 = STM.getRegions(scene1, [twParams2.columns, twParams2.rows]);
        const data = regs2.map((bounds, i) => {
            const _x = bounds[0] + bounds[2] / 2;
            const _y = bounds[1] + bounds[3] / 2;
            const from = {
                x: _x,
                y: _y,
                scale: 0.01,
                rotation: twParams2.rotation
            };
            const delay = twParams2.delay;
            return {
                anchor: 0.5,
                bounds,
                easing: twParams2.easing,
                delay,
                duration: twParams2.duration,
                from
            };
        });
        const trans = stm.createTransition(scene2, scene1, data);
        const lc = logComplete();
        trans.start().then(lc);
    });
}
