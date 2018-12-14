import SceneTransition from "./SceneTransition";

if (!PIXI) {
    throw new Error('foobar');
}

PIXI.SceneTransitionManager = SceneTransition;