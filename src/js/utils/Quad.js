import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

import vs from "../glsl/quad_vs.glsl";
import fs from "../glsl/quad_fs.glsl";

// fullscreen quad that renders a texure
export default class Quad extends Mesh {
  constructor(texture = null, fragment = fs, params = {}) {
    // merge additional uniformsto the uniforms object
    const uniforms = Object.assign(params, {
      diffuse: { value: texture },
    });
    //create a fullscreen plane
    super(
      new PlaneGeometry(2, 2),
      new ShaderMaterial({
        uniforms,
        vertexShader: vs,
        fragmentShader: fragment,
      })
    );
  }

  // getter / setter for the diffuse texture
  set texture(texture) {
    this.material.uniforms.diffuse.value = texture;
  }
  get texture() {
    return this.material.uniforms.diffuse.value;
  }
}
