import * as THREE from "three";

import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";

import hello_world, { FOO } from "./local_modules/test";

console.log({ FOO });
hello_world();
// ------------ gui -------------------
/**
 * @description Debug UI - lil-ui
 */
const gui = new GUI({
  width: 340,
  title: "Tweak it",
  closeFolders: false,
});

/**
 * @description gui parmeters
 */
const parameters = {
  //
  // backgroundBluriness: 0.2,
  backgroundBluriness: 0,
  // backgroundIntensity: 5,
  backgroundIntensity: 1,
};
// gui.hide()
// ----------------------------------

//------------ canvas settings -----------
/**
 * @description canvas settings
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// ----------------------------------------

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (canvas) {
  // ---- loaders -------
  /**
   * @description loaders
   */

  // const gltfLoader = new GLTFLoader();
  // // const cubeTextureLoader = new THREE.CubeTextureLoader();

  // const rgbeLoader = new RGBELoader();

  const textureLoader = new THREE.TextureLoader();

  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------
  // -------------------------------------------------------------------

  // ------- Scene
  const scene = new THREE.Scene();

  //

  // -------- Camera -------------------------------
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(4, 1, -4);
  scene.add(camera);

  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  //------------------------------------------------
  // ----------    ENVIRONMENT MAP

  // we write this

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // FLOOR
  const floorColorTexture = textureLoader.load(
    "/textures/floor/wood_cabinet_worn_long_diff_1k.jpg"
  );
  const floorNormalTexture = textureLoader.load(
    "/textures/floor/wood_cabinet_worn_long_nor_gl_1k.png"
  );
  const floorAORoughnessMetalnessTexture = textureLoader.load(
    "/textures/floor/wood_cabinet_worn_long_arm_1k.jpg"
  );
  // WALL
  const wallColorTexture = textureLoader.load(
    "/textures/wall/castle_brick_broken_06_diff_1k.jpg"
  );
  const wallNormalTexture = textureLoader.load(
    "/textures/wall/castle_brick_broken_06_nor_gl_1k.png"
  );
  const wallAORoughnessMetalnessTexture = textureLoader.load(
    "/textures/wall/castle_brick_broken_06_arm_1k.jpg"
  );

  floorColorTexture.colorSpace = THREE.SRGBColorSpace;
  wallColorTexture.colorSpace = THREE.SRGBColorSpace;

  // ----------------------------------------------
  // ----------------------------------------------
  // Meshes, Geometries, Materials
  // ----------------------------------------------
  // ----------------------------------------------

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({
      map: floorColorTexture,
      normalMap: floorNormalTexture,
      aoMap: floorAORoughnessMetalnessTexture,
      roughnessMap: floorAORoughnessMetalnessTexture,
      metalnessMap: floorAORoughnessMetalnessTexture,
    })
  );

  floor.rotation.set(-Math.PI / 2, 0, 0);
  floor.position.y = -4;

  scene.add(floor);

  const wall = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshStandardMaterial({
      map: wallColorTexture,
      normalMap: wallNormalTexture,
      aoMap: wallAORoughnessMetalnessTexture,
      roughnessMap: wallAORoughnessMetalnessTexture,
      metalnessMap: wallAORoughnessMetalnessTexture,
    })
  );
  wall.position.z = -4;

  scene.add(wall);

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // ------------------------- LIGHTS ----------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  /**
   * @description Directional light
   */
  const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
  directionalLight.position.set(-4, 6.5, 2.5);
  scene.add(directionalLight);

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // -------------------------------------------------------------

  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------
  // ----------------------------------------------

  // -------- Controls and helpers

  const orbit_controls = new OrbitControls(camera, canvas);
  orbit_controls.enableDamping = true;

  // ----------------------------------------------
  // ----------------------------------------------

  // -------------- RENDERER
  // ----------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    //To make the edges of the objects more smooth (we are setting this in this lesson)
    antialias: true,
    // alpha: true,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // maybe this should be only inside       tick

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // -------------- SHADOWS ----------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  /**
   * Event Listeners
   */

  window.addEventListener("resize", (e) => {
    console.log("resizing");
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      gui.show(gui._hidden);
    }
  });

  const mouse = new THREE.Vector2();
  window.addEventListener("mousemove", (_event) => {
    mouse.x = (_event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(_event.clientY / sizes.height) * 2 + 1;

    // console.log({ mouse });
  });

  /* window.addEventListener("dblclick", () => {
    console.log("double click");

    // handling safari
    const fullscreenElement =
      // @ts-ignore webkit
      document.fullscreenElement || document.webkitFullScreenElement;
    //

    // if (!document.fullscreenElement) {
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        // go fullscreen
        canvas.requestFullscreen();

        // @ts-ignore webkit
      } else if (canvas.webkitRequestFullScreen) {
        // @ts-ignore webkit
        canvas.webkitRequestFullScreen();
      }
    } else {
      // @ts-ignore
      if (document.exitFullscreen) {
        document.exitFullscreen();

        // @ts-ignore webkit
      } else if (document.webkitExitFullscreen) {
        // @ts-ignore webkit
        document.webkitExitFullscreen();
      }
    }
  }); */

  // ---------------------- TICK -----------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  // ---------------------------------------------------------

  const clock = new THREE.Clock();

  /**
   * @description tick
   */
  function tick() {
    // for dumping to work
    orbit_controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  }

  tick();
}
