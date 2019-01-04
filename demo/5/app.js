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

    const stm = new STM(app.renderer, TweenMax);

    app.ticker.add(function () {
        anim.rotation += 0.03;
        anim1.rotation -= 0.02;
    });

    scene1.on('pointerdown', () => {
        const trans = stm.createFadeTransition(scene1, scene2, {
            easing: twParams1.easing,
            duration: twParams1.duration
        });
        const lc = logComplete();
        trans.start().then(lc);
    });

    scene2.on('pointerdown', () => {
        const trans = stm.createFadeTransition(scene2, scene1, {
            easing: twParams2.easing,
            duration: twParams2.duration
        });
        const lc = logComplete();
        trans.start().then(lc);
    });
}
