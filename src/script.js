import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//loading
const textTrueLoader = new THREE.TextureLoader();

const normalText = textTrueLoader.load("./NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects shape
const geometry1 = new THREE.BoxGeometry(1, 1);

const geometry2 = new THREE.SphereBufferGeometry(0.5, 20, 50, 100);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.6;
material.roughness = 0.5;
material.normalMap = normalText;
material.color = new THREE.Color(0xffffff);

const material2 = new THREE.MeshStandardMaterial();
material2.color = new THREE.Color(0xe0e0e0);

// Mesh
const sphere = new THREE.Mesh(geometry2, material);
scene.add(sphere);

const sphere2 = new THREE.Mesh(geometry1, material2);
// scene.add(sphere2);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.2);
pointLight.position.set(2, 1, 7);
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 2);
pointLight.intensity = 0.4;
scene.add(camera);

gui.add(pointLight.position, `y`).min(-5).max(5).step(0.01);
gui.add(pointLight.position, `x`).min(-5).max(5).step(0.01);
gui.add(pointLight.position, `z`).min(0).max(10).step(0.01);
gui.add(pointLight, `intensity`).min(0).max(10).step(0.01);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", mouseMoveHandler);
window.addEventListener("scroll", scrollHandler);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function mouseMoveHandler(e) {
  mouseX = e.clientX - windowX;
  mouseY = e.clientY - windowY;
}
function scrollHandler() {
  sphere.rotation.x = window.scrollY * 0.005;
  console.log(window.scrollY);
}

const clock = new THREE.Clock();
console.log(clock);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * 0.005;
  targetY = mouseY * 0.005;

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.y += 0.6 * (targetX - sphere.rotation.x);

  sphere.position.z = 0.25 * (targetY - sphere.rotation.x);

  // sphere2.rotation.y = 0. 5 * elapsedTime;
  // sphere2.rotation.x = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
