import {
  BoxGeometry,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
} from "three";
import RenderTarget from "./utils/RenderTarget";

const RAD = Math.PI / 180;
export default class Source extends Scene {
  constructor(renderer) {
    super();

    //store a reference to the renderer
    this.renderer = renderer;

    // get renderer size
    const resolution = new Vector2();
    const size = renderer.getSize(resolution);

    // create a camera to render the scene
    this.camera = new PerspectiveCamera(
      60,
      size.width / size.height,
      0.001,
      100
    );
    this.camera.position.z = 2;

    // create our mesh
    this.mesh = new Mesh(
      new IcosahedronGeometry(0.5),
      new MeshNormalMaterial()
    );
    this.add(this.mesh);

    // render target to store the render
    this.renderTarget = new RenderTarget(size.width, size.height);
  }

  render() {
    //transform the object

    this.mesh.rotation.x += RAD;
    this.mesh.rotation.y += RAD * 0.5;

    const time = performance.now() * 0.001;
    this.mesh.position.x = Math.cos(time) * 0.5;
    this.mesh.position.y = Math.sin(time) * 0.5;

    const s = 0.1 + 0.4 - Math.sin(time) * 0.4;
    this.mesh.scale.set(s, s, s);

    //set render target
    this.renderer.setRenderTarget(this.renderTarget);

    //render the scene (this) with this camera
    this.renderer.render(this, this.camera);

    // release render target
    this.renderer.setRenderTarget(null);

    //return the result texture
    return this.renderTarget.texture;
  }
}
