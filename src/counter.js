// Import Three.js library
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Set the scene size
const WIDTH = 600;
const HEIGHT = 600;

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 60;
scene.add(camera);

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
renderer.shadowMap.enabled = true;
document.getElementById("container").appendChild(renderer.domElement);

// Add lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
scene.add(ambientLight);

// Load textures suitable for children
const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load("https://example.com/texture1.jpg"), // Replace with actual texture URLs
  textureLoader.load("https://example.com/texture2.jpg"),
  textureLoader.load("https://example.com/texture3.jpg"),
  textureLoader.load("https://example.com/texture4.jpg"),
];

// Create a box geometry and assign textures to each face
const geometry = new THREE.BoxGeometry();
const materials = textures.map(
  (texture) => new THREE.MeshStandardMaterial({ map: texture })
);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Add controls for rotation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth rotation
controls.dampingFactor = 0.1;

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the cube clockwise
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
};

animate();

// Event listeners for manual rotation
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      cube.rotation.x -= 0.1;
      break;
    case "ArrowDown":
      cube.rotation.x += 0.1;
      break;
    case "ArrowLeft":
      cube.rotation.y -= 0.1;
      break;
    case "ArrowRight":
      cube.rotation.y += 0.1;
      break;
  }
});

// Resize event listener
window.addEventListener("resize", () => {
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize(WIDTH, HEIGHT);
});
