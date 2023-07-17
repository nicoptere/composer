import { Scene, WebGLRenderer, OrthographicCamera } from "three";
import Effect from "./js/Effect";
import Quad from "./js/utils/Quad";
import Source from "./js/Source";
export const ORTHO = new OrthographicCamera(-1, 1, 1, -1, 0.0001, 100000);

let scene, renderer;
export default class Composer {
  constructor() {
    // main scene where the result will be displayed
    scene = new Scene();

    // renderer
    renderer = new WebGLRenderer({
      alpha: true, //our effect needs transparency but this is not mandatory
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // the source scene: a spinning cube
    this.source = new Source(renderer);

    // effect: keep trails of the cube
    this.effect = new Effect(renderer);

    //the final quad to display the result to screen
    this.display = new Quad();
    scene.add(this.display);

    //start render loop
    this.update();
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    // render the source scene to render target (RT) and get the RT's texture
    let result = this.source.render();

    // pass the result texture to the effect
    // render the effect and get back the effect's result as a texture
    result = this.effect.render(result);

    // now the result texture stores the effect's result
    // we can display it to screen
    this.display.texture = result;

    // the display quad now shows the effect's result texture
    // display it to screen
    renderer.render(scene, ORTHO);
  }
}

//instantiate the composer
new Composer();
