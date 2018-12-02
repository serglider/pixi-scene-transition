import * as PIXI from 'pixi.js'
import Transition from "./Transition";

const app = new PIXI.Application(1280, 720, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);
const trans = new Transition(app);
const scene1 = new PIXI.Container();
const scene2 = new PIXI.Container();
app.stage.addChild(scene2);
app.stage.addChild(scene1);


PIXI.loader
    .add('rock', 'assets/rock01.jpg')
    .add('foo', 'assets/clover.jpg')
    .add('anim', 'assets/fighter.json')
    .load(setup);

function setup(loader, resources) {

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
    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();
    scene1.addChild(anim);

    app.ticker.add(function () {
        anim.rotation += 0.01;
    });

    scene1.interactive = true;
    scene1.buttonMode = true;
    scene1.on('pointerdown', () => {
        trans.transition(scene1, scene2, {
            duration: 500,
            type: 'D',
            columns: 20,
            rows: 20
        });
    });

    scene2.interactive = true;
    scene2.buttonMode = true;
    scene2.on('pointerdown', () => {
        trans.transition(scene2, scene1, {
            duration: 500,
            type: 'A',
            // columns: 20,
            // rows: 20
        });
    });
}

