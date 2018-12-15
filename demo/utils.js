function createAnimation(parent, resource, {x, y}) {
    const frames = Object.keys(resource.textures).map(x => PIXI.Texture.fromFrame(x));
    const anim = new PIXI.extras.AnimatedSprite(frames);
    anim.x = x;
    anim.y = y;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();
    parent.addChild(anim);
    return anim;
}


function createScene(parent, tileResource, {w, h}) {
    const scene = new PIXI.Container();
    parent.addChild(scene);
    const bg = new PIXI.extras.TilingSprite(tileResource.texture, w, h);
    scene.addChild(bg);
    scene.interactive = true;
    scene.buttonMode = true;
    return scene;
}