export class Move {
    constructor(params) {
        var _a, _b, _c, _d, _e, _f;
        this.name = params.name;
        this.type = params.type;
        this.category = params.category;
        this.power = (_a = params.power) !== null && _a !== void 0 ? _a : 0;
        this.accuracy = (_b = params.accuracy) !== null && _b !== void 0 ? _b : 1;
        this.pp = params.pp;
        this.maxPP = params.pp;
        this.effect = params.effect
            ? Object.assign(Object.assign({}, params.effect), { strength: (_c = params.effect.strength) !== null && _c !== void 0 ? _c : 1, chance: (_d = params.effect.chance) !== null && _d !== void 0 ? _d : 1 }) : undefined;
        this.priority = (_e = params.priority) !== null && _e !== void 0 ? _e : 0;
        this.critRatio = (_f = params.critRatio) !== null && _f !== void 0 ? _f : 1;
    }
}
//# sourceMappingURL=Move.js.map