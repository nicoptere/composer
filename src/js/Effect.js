import { OrthographicCamera, Scene, Vector2 } from "three";

import Quad from "./utils/Quad";
import effectFragment from "./glsl/effect_fs.glsl";
import PingPongRenderTarget from "./utils/PingPongRenderTarget";

export const ORTHO = new OrthographicCamera(-1, 1, 1, -1, 0.0001, 100000);
export default class Effect extends Scene {
  constructor(renderer) {
    super();
    //store the renderer ref
    this.renderer = renderer;

    // get renderer size
    const resolution = new Vector2();
    const size = renderer.getSize(resolution);

    //create a pingpong texture
    this.pingpong = new PingPongRenderTarget(size.width, size.height);

    // create a quad geometry to render the effect
    // we'll need an input texture & a time uniform
    const uniforms = {
      source: { value: this.pingpong.write.texture },
      time: { value: 0 },
    };
    this.quad = new Quad(null, effectFragment, uniforms);
    this.add(this.quad);
  }

  render(sourceTexture) {
    // update the quad material to apply the effect
    //
    //pass a time uniform
    this.quad.material.uniforms.time.value = performance.now() * 0.001;

    //pass the source image
    this.quad.material.uniforms.source.value = sourceTexture;

    //swap the pingpong textures
    this.pingpong.swap();

    //pass the current state of the ping pong texture as a source
    this.quad.texture = this.pingpong.read.texture;

    // and draw the result of the effect into the destination pingpong texture
    this.renderer.setRenderTarget(this.pingpong.write);

    //render
    this.renderer.render(this, ORTHO);

    // release render target
    this.renderer.setRenderTarget(null);

    //return the result texture
    return this.pingpong.write.texture;
  }
}
