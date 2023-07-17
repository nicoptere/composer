import {
  LinearFilter,
  RGBAFormat,
  RepeatWrapping,
  WebGLRenderTarget,
} from "three";
export default class RenderTarget extends WebGLRenderTarget {
  constructor(w = 512, h = 512) {
    super(w, h, {
      format: RGBAFormat,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      wrapS: RepeatWrapping,
      wrapT: RepeatWrapping,
    });
  }
}
