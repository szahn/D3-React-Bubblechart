"use strict";
class WindowSize {
    static getSize() {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        const height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        return [width, height];
    }
}

export = WindowSize;