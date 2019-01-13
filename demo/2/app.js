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
const f2 = gui.addFolder('transition 2');
f2.add(twParams2, 'columns', 1, 30).step(1);
f2.add(twParams2, 'rows', 1, 30).step(1);
f2.add(twParams2, 'rotation', 0, 31.4).step(0.02);
f2.add(twParams2, 'delay', 0, 5000).step(50);
f2.add(twParams2, 'duration', 0, 5000).step(50);
const ctrl2 = f2.add(twParams2, 'easing', esList);

app(onFirstSceneClick, onSecondSceneClick, TweenMax);

function onFirstSceneClick(scene1, scene2) {
    const STM = PIXI.SceneTransitionManager;
    const regs = STM.getRegions(scene1, [twParams1.columns, twParams1.rows]);
    const data = regs.map((bounds, i) => {
        const to = {
            x: bounds[0] + bounds[2]/2,
            y: bounds[1] + bounds[3]/2,
            scale: 0.01,
            rotation: twParams1.rotation
        };
        const delay = i%2 ? 0 : 300;
        return {
            anchor: 0.5,
            bounds,
            easing: twParams1.easing,
            delay,
            duration: twParams1.duration,
            to
        };
    });
    const trans = STM.createTransition(scene1, scene2, data);
    trans.start().then(() => {
        // do your stuff on transition complete
    });
}

function onSecondSceneClick(scene1, scene2) {
    const STM = PIXI.SceneTransitionManager;
    const regs = STM.getRegions(scene1, [twParams2.columns, twParams2.rows]);
    const data = regs.map(bounds => {
        const from = {
            x: bounds[0] + bounds[2]/2,
            y: bounds[1] + bounds[3]/2,
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
    const trans = STM.createTransition(scene2, scene1, data);
    trans.start().then(() => {
        // do your stuff on transition complete
    });
}
