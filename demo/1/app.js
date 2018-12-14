

PIXI.loader
    .add('rock', '../../assets/rock01.jpg')
    .add('foo', '../../assets/clover.jpg')
    .add('anim', '../../assets/fighter.json')
    .load(setup);

function setup(loader, resources) {

    const app = new PIXI.Application(1280, 720, {backgroundColor: 0x1099bb});
    document.body.appendChild(app.view);
    const scene1 = new PIXI.Container();
    const scene2 = new PIXI.Container();
    app.stage.addChild(scene2);
    app.stage.addChild(scene1);

    const tilingSprite1 = new PIXI.extras.TilingSprite(
        resources.rock.texture,
        app.screen.width,
        app.screen.height
    );
    scene2.addChild(tilingSprite1);

    const tilingSprite = new PIXI.extras.TilingSprite(
        resources.foo.texture,
        app.screen.width,
        app.screen.height
    );
    scene1.addChild(tilingSprite);

    const frames = Object.keys(resources.anim.textures).map(x => PIXI.Texture.fromFrame(x));
    const anim = new PIXI.extras.AnimatedSprite(frames);
    anim.x = app.screen.width / 2 - 200;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();
    scene1.addChild(anim);


    const anim1 = new PIXI.extras.AnimatedSprite(frames);
    anim1.x = app.screen.width / 2 + 200;
    anim1.y = app.screen.height / 2;
    anim1.anchor.set(0.5);
    anim1.animationSpeed = 0.5;
    anim1.play();
    scene2.addChild(anim1);

    app.ticker.add(function () {
        anim.rotation += 0.01;
        anim.rotation -= 0.01;
    });

    const regs = PIXI.SceneTransitionManager.getRegions(scene1, [5, 1]);
    const stm = new PIXI.SceneTransitionManager(app.renderer, TWEEN);

    scene1.interactive = true;
    scene1.buttonMode = true;
    scene1.on('pointerdown', () => {
        const data = regs.map((bounds, i) => {
            const to = {
                y: i%2 ? -bounds[3] : 720,
                x: bounds[0],
                alpha: 0
            };
            return {
                bounds,
                duration: 1000,
                to
            };
        });
        const trans = stm.createTransition(scene1, scene2, data, PIXI.SceneTransitionManager.TYPES.OUT);
        trans.start().then(() => {
            console.log('FOO');
        })
    });

    scene2.interactive = true;
    scene2.buttonMode = true;
    scene2.on('pointerdown', () => {
        const data = regs.map((bounds, i) => {
            const from = {
                y: i%2 ? -bounds[3] : 720,
                x: bounds[0],
                alpha: 0
            };
            return {
                bounds,
                duration: 1000,
                from
            };
        });
        const trans = stm.createTransition(scene2, scene1, data, PIXI.SceneTransitionManager.TYPES.IN);
        trans.start().then(() => {
            console.log('BAR');
        })
    });
}

function drawRect(cont, rect) {
    const thing = new PIXI.Graphics();
    cont.addChild(thing);
    thing.beginFill (0x000000, 0.8);
    thing.position.x = rect[0] + 1;
    thing.position.y = rect[1] + 1;
    thing.drawRect(0, 0, rect[2] - 2, rect[3] - 2);
}