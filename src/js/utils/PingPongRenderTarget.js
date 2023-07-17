import RenderTarget from "./RenderTarget";

// create 2 render targets to swap
export default class PingPongRenderTarget {
  constructor(w = 512, h = 512) {
    this.renderTargetA = new RenderTarget(w, h);
    this.renderTargetB = new RenderTarget(w, h);
  }

  setSize(w, h) {
    this.renderTargetA.setSize(w, h);
    this.renderTargetA.texture.needsUpdate = true;
    this.renderTargetB.setSize(w, h);
    this.renderTargetB.texture.needsUpdate = true;
  }

  swap() {
    let T = this.renderTargetA;
    this.renderTargetA = this.renderTargetB;
    this.renderTargetB = T;
  }

  get read() {
    return this.renderTargetA;
  }

  get write() {
    return this.renderTargetB;
  }
}
