// Import Three.js library and OrbitControls for interactive camera control
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Set the size of the scene (canvas dimensions in pixels)
const WIDTH = 600;
const HEIGHT = 600;

// Create a new Three.js scene where all objects, lights, and cameras will exist
const scene = new THREE.Scene();

// Initialize the camera with perspective projection
// Parameters: field of view, aspect ratio, near clipping plane, far clipping plane
const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
camera.position.z = 60; // Set the camera position to observe the scene
scene.add(camera); // Add the camera to the scene

// Create the WebGL renderer, responsible for rendering the scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT); // Set the renderer size
renderer.shadowMap.enabled = true; // Enable shadow rendering for more realistic lighting
document.getElementById("container").appendChild(renderer.domElement); // Attach the renderer to a DOM element

// Add a point light source to illuminate the scene
const light = new THREE.PointLight(0xffffff, 1, 100); // White light with intensity and range
light.position.set(10, 10, 10); // Position the light in the scene
scene.add(light); // Add the light to the scene

// Add an ambient light to soften shadows and illuminate all objects evenly
const ambientLight = new THREE.AmbientLight(0xffffff); // Dim soft white light
scene.add(ambientLight); // Add ambient light to the scene

// Load textures for the cube using a texture loader
const textureLoader = new THREE.TextureLoader();
const textures = [
  textureLoader.load("/image1.png"),
  textureLoader.load("/image2.png"),
  textureLoader.load("/image3.png"),
  textureLoader.load("/image4.png"),
];

// Create a box geometry for the cube (default dimensions 1x1x1)
const geometry = new THREE.BoxGeometry(10, 10, 10);

// Assign a different texture to each face of the cube
const materials = textures.map(
  (texture) => new THREE.MeshStandardMaterial({ map: texture })
);

// Combine the geometry and materials to create a textured cube mesh
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube); // Add the cube to the scene

// Add OrbitControls to allow user interaction with the camera (e.g., zoom, rotate)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth motion damping
controls.dampingFactor = 0.1; // Set the damping intensity

// Define the animation loop to render the scene continuously
const animate = () => {
  requestAnimationFrame(animate); // Call the animate function recursively

  // Automatically rotate the cube for a dynamic effect
  cube.rotation.x += 0.01; // Increment rotation around the X-axis
  cube.rotation.y += 0.01; // Increment rotation around the Y-axis

  controls.update(); // Update the controls for smooth camera movements
  renderer.render(scene, camera); // Render the scene from the camera's perspective
};

animate(); // Start the animation loop

// Add keyboard event listeners for manual cube rotation
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp": // Rotate the cube up
      cube.rotation.x -= 0.1;
      break;
    case "ArrowDown": // Rotate the cube down
      cube.rotation.x += 0.1;
      break;
    case "ArrowLeft": // Rotate the cube left
      cube.rotation.y -= 0.1;
      break;
    case "ArrowRight": // Rotate the cube right
      cube.rotation.y += 0.1;
      break;
  }
});

// Handle window resize events to maintain proper aspect ratio and renderer size
window.addEventListener("resize", () => {
  camera.aspect = WIDTH / HEIGHT; // Update the camera's aspect ratio
  camera.updateProjectionMatrix(); // Apply the aspect ratio change
  renderer.setSize(WIDTH, HEIGHT); // Update the renderer size
});
