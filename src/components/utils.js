export function _getSprite(view, anchor, bounds, fromObj) {
    const texture = this._renderer.generateTexture(view, 0, 1, new PIXI.Rectangle(...bounds));
    const sprite = new PIXI.Sprite(texture);
    if (anchor) {
        sprite.anchor.set(anchor);
    }
    if (fromObj) {
        Object.keys(fromObj).forEach(key => {
            if (key === 'scale') {
                sprite.scale.set(fromObj[key]);
            } else {
                sprite[key] = fromObj[key];
            }
        });
    } else {
        sprite.x = bounds[0] + bounds[2] * sprite.anchor.x;
        sprite.y = bounds[1] + bounds[3] * sprite.anchor.y;
    }


    return sprite;
}

export function _getTransitionType(list) {
    return list.every(item => item.from);
}

export function getRegions({width, height}, dims = [1, 1]) {
    const [columns, rows] = dims;
    if (!columns || !rows) return [];
    const h = Math.ceil(height / rows);
    const w = Math.ceil(width / columns);
    return Array.from(Array(columns * rows), getBounds);

    function getBounds(_, i) {
        const x = i % columns * w;
        const y = Math.floor(i / columns) * h;
        return [x, y, w, h];
    }
}
