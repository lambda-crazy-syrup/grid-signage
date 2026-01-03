class AppletFrames {
    constructor() {
        this.frames = [];
    }
    push(iframe) {
        this.frames.push(iframe);
    }

    getIframeByWindow(window) {
        return this.frames.find(iframe => iframe.contentWindow === window); // undefined otherwise
    }
}
