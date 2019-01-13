function app(onFirstClick, onSecondClick, TweenLib) {

    PIXI.loader
        .add('rock', '../assets/rock.jpg')
        .add('starfield', '../assets/starfield.jpg')
        .add('goblins', '../assets/goblins.json')
        .load(setup);

    function setup(loader, resources) {

        const app = new PIXI.Application(1000, 618);
        document.body.appendChild(app.view);
        const W = app.screen.width;
        const H = app.screen.height;
        const [scene2, bg2] = createScene(2, app.stage, resources.rock, {w: W, h: H});
        const [scene1, bg1] = createScene(1, app.stage, resources.starfield, {w: W, h: H});
        const goblinGirl = createSpineAnim(scene1, resources.goblins.spineData, {x: 1150, y: 626}, 'goblingirl');
        const goblin = createSpineAnim(scene2, resources.goblins.spineData, {x: -150, y: 626}, 'goblin');

        PIXI.SceneTransitionManager.init(app.renderer, TweenLib);
        goblin.play('walk');
        goblinGirl.play('walk');

        app.ticker.add(function () {
            bg1.tilePosition.x += 0.25;
            bg2.tilePosition.x -= 0.25;
            goblin.moveX(2);
            goblinGirl.moveX(3);
        });

        scene1.on('pointerdown', onFirstClick.bind(null, scene1, scene2));
        scene2.on('pointerdown', onSecondClick.bind(null, scene1, scene2));
    }
}

function createSpineAnim(parent, data, {x, y}, skin) {

    let dir = 1;
    const anim = new PIXI.spine.Spine(data);
    anim.skeleton.setSkinByName(skin);
    anim.skeleton.setSlotsToSetupPose();
    anim.x = x;
    anim.y = y;
    parent.addChild(anim);
    return {play, moveX};

    function play(animName) {
        anim.state.setAnimation(0, animName, true);
    }

    function moveX(dx) {
        anim.x += dir * dx;

        if (anim.x > 900) {
            dir = -1;
            anim.skeleton.flipX = true;
        }else if (anim.x < 100) {
            dir = 1;
            anim.skeleton.flipX = false;
        }
    }
}


function createScene(num, parent, tileResource, {w, h}) {
    const scene = new PIXI.Container();
    parent.addChild(scene);
    const bg = new PIXI.extras.TilingSprite(tileResource.texture, w, h);
    scene.addChild(bg);
    scene.interactive = true;
    scene.buttonMode = true;

    const style = new PIXI.TextStyle({
        fontFamily: 'fantasy',
        fontSize: 42,
        fontWeight: 'bold',
        fill: '#ffffff', // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6
    });

    const richText = new PIXI.Text(`Scene ${num}`, style);
    richText.x = w/2;
    richText.y = 30;
    richText.anchor.set(0.5);
    scene.addChild(richText);

    return [scene, bg];
}

function logComplete() {
    console.time('transition complete');
    return function () {
        console.timeEnd('transition complete');
    };
}