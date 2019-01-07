import init from './components/init';
import createFadeTransition from './components/createFadeTransition';
import createShapeTransition from './components/createShapeTransition';
import createTransition from './components/createTransition';
import {
    _createGSAPTween,
    _startGSAPTween
} from './components/gsap-lib';
import {
    _createTWEENTween,
    _startTWEENTween
} from './components/tween-lib';
import {
    _getSprite,
    _getTransitionType,
    getRegions
} from './components/utils';

if (!PIXI) {
    throw new Error('This component does not work without PIXI');
}

PIXI.SceneTransitionManager = {
    init,
    getRegions,
    createFadeTransition,
    createShapeTransition,
    createTransition,

    _createGSAPTween,
    _startGSAPTween,
    _startTWEENTween,
    _createTWEENTween,
    _getSprite,
    _getTransitionType,
};