const twParams1 = {
    easing: 'Linear.easeNone',
    duration: 1000
};
const twParams2 = {
    easing: 'Linear.easeNone',
    duration: 1000
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
f1.add(twParams1, 'duration', 0, 5000).step(50);
f1.add(twParams1, 'easing', esList);
const f2 = gui.addFolder('transition 2');
f2.add(twParams2, 'duration', 0, 5000).step(50);
f2.add(twParams2, 'easing', esList);

app(onFirstSceneClick, onSecondSceneClick, TweenMax);

function onFirstSceneClick(scene1, scene2) {
    const trans = PIXI.SceneTransitionManager.createFadeTransition(scene1, scene2, {
        easing: twParams1.easing,
        duration: twParams1.duration
    });
    scene1.interactive = false;
    scene1.buttonMode = false;
    trans.start().then(() => {
        scene1.interactive = true;
        scene1.buttonMode = true;
    });
}

function onSecondSceneClick(scene1, scene2) {
    const trans = PIXI.SceneTransitionManager.createFadeTransition(scene2, scene1, {
        easing: twParams2.easing,
        duration: twParams2.duration
    });
    scene2.interactive = false;
    scene2.buttonMode = false;
    trans.start().then(() => {
        scene2.interactive = true;
        scene2.buttonMode = true;
    });
}
