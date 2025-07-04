//importing 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

//creating objects for pane(input), 
// scene(viewable to user), 
// camera(pov of viewable content), 
// renderer(would constantly display objects into HTML doc), 
// textureloader(used to load texture through a map which is implemented in planets)
const pane = new Pane(); 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas'), antialias: true });
const textureLoader = new THREE.TextureLoader();

//positioning the camera
camera.position.z = 66;

//orbit controls - allow us to orbit around an object in this case- camera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//sets size of window to current window width and height
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Responsive viewport handling
//update camera aspect ratio and renderer dimensions
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// creating Sun mesh which consists of geometry, material and texture, and adding it to the scene 
// sun will be at the centermost position i.e, (0,0,0)
const sunTexture = textureLoader.load('/textures/2k_sun.jpg');
const sunGeometry = new THREE.SphereGeometry(7, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ 
  map: sunTexture,
  color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// creating mercury mesh which consists of geometry, material and texture, and adding it to the scene 
const mercuryTexture = textureLoader.load('/textures/mercury.jpg')
const mercuryGeometry = new THREE.SphereGeometry(5, 32, 32); 
const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0x909090,
  map: mercuryTexture
 });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial); 
mercury.scale.setScalar(0.05); // Size relative to Sun
mercury.position.x = 10; // Distance from Sun
scene.add(mercury);

// creating venus mesh which consists of geometry, material and texture, and adding it to the scene 
const venusTexture = textureLoader.load('/textures/venus.jpg')
const venusGeometry = new THREE.SphereGeometry(5, 32, 32); 
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xeeddaa, map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial); 
venus.scale.setScalar(0.08); // Size relative to Sun
venus.position.x = 15; // Distance from Sun
scene.add(venus);

// creating earth mesh which consists of geometry, material and texture, and adding it to the scene 
const earthTexture = textureLoader.load('/textures/earth.jpg')
const earthGeometry = new THREE.SphereGeometry(5, 32, 32); 
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x2a7fff, map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial); 
earth.scale.setScalar(0.13); // Size relative to Sun
earth.position.x = 20; // Distance from Sun
scene.add(earth);

// creating moon mesh which consists of geometry, material and texture, and adding it to the scene 
const moonTexture = textureLoader.load('/textures/moon.jpg')
const moonGeometry = new THREE.SphereGeometry(5, 32, 32); 
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: moonTexture });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.scale.setScalar(0.05); // Size relative to Sun
moon.position.x = 19;
moon.position.y = 1 // Distance from Sun
scene.add(moon);

// creating mars mesh which consists of geometry, material and texture, and adding it to the scene 
const marsTexture = textureLoader.load('/textures/mars.jpg')
const marsGeometry = new THREE.SphereGeometry(5, 32, 32); 
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xff5500, map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial); 
mars.scale.setScalar(0.15); // Size relative to Sun
mars.position.x = 25; // Distance from Sun
scene.add(mars);

// creating jupiter mesh which consists of geometry, material and texture, and adding it to the scene 
const jupiterTexture = textureLoader.load('/textures/jupiter.png')
const jupiterGeometry = new THREE.SphereGeometry(5, 32, 32); 
const jupiterMaterial = new THREE.MeshBasicMaterial({ color: 0xd2b48c, map:jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial); 
jupiter.scale.setScalar(0.55); // Size relative to Sun
jupiter.position.x = 35; // Distance from Sun
scene.add(jupiter);

// creating Saturn mesh which consists of geometry, material and texture, and adding it to the scene 
const saturnTexture = textureLoader.load('/textures/saturn.png')
const saturnGeometry = new THREE.SphereGeometry(5, 32, 32); 
const saturnMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99, map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial); 
saturn.scale.setScalar(0.3); // Size relative to Sun
saturn.position.x = 45; // Distance from Sun
scene.add(saturn);

// creating uranus mesh which consists of geometry, material and texture, and adding it to the scene 
const uranusTexture = textureLoader.load('/textures/uranus.png')
const uranusGeometry = new THREE.SphereGeometry(5, 32, 32); 
const uranusMaterial = new THREE.MeshBasicMaterial({ color: 0x66ffff, map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial); 
uranus.scale.setScalar(0.2); // Size relative to Sun
uranus.position.x = 55; // Distance from Sun
scene.add(uranus);

// creating neptune mesh which consists of geometry, material and texture, and adding it to the scene 
const neptuneTexture = textureLoader.load('/textures/neptune.png')
const neptuneGeometry = new THREE.SphereGeometry(5, 32, 32); 
const neptuneMaterial = new THREE.MeshBasicMaterial({ color: 	0x0000cc, map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial); 
neptune.scale.setScalar(0.45); // Size relative to Sun
neptune.position.x = 65; // Distance from Sun
scene.add(neptune);

//creating stars in the background
//buffergeometry
const starGeometry = new THREE.BufferGeometry();

//saving random positions for stars in an array 
const starVertices = [];
for (let i = 0; i < 3000; i++) {
  starVertices.push(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  );
}

//setting position for each star using setAttribute
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(
  starGeometry,
  new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
); 
//adding stars to scene
scene.add(stars);

// adding toggle ui (dark/light) 
//creating pane.addfoler for buttons 
const toggleFolder = pane.addFolder({ title: 'Toggle' });

//event handling (on click) on button 'Dark'
//stars will be visible with dark background
toggleFolder.addButton({ title: 'Dark' }).on('click', () => {
  stars.visible = true;
  renderer.setClearColor(0x000000);
});

//event handling (on click) on button 'White'
//stars will not be visible, white background
toggleFolder.addButton({ title: 'White' }).on('click', () => {
  stars.visible = false;
  renderer.setClearColor(0xfffdd0);
});

//defining an array for orbits of the planets
let orbitData = [
  { mesh: mercury, angle: 0, speed: 0.047, radius: 10 },
  { mesh: venus, angle: 0, speed: 0.018, radius: 15 },
  { mesh: earth, angle: 0, speed: 0.01, radius: 20 },
  { mesh: mars, angle: 0, speed: 0.0053, radius: 25 },
  { mesh: jupiter, angle: 0, speed: 0.00084, radius: 35 },
  { mesh: saturn, angle: 0, speed: 0.00034, radius: 45 },
  { mesh: uranus, angle: 0, speed: 0.00012, radius: 55 },
  { mesh: neptune, angle: 0, speed: 0.00006, radius: 65 },
];

// Creating a folder for planet speeds
const planetFolder = pane.addFolder({
  title: 'Planet Speeds',
  expanded: true
});

// Adding speed controls for each planet
orbitData.forEach(planet => {
  planetFolder.addBinding(planet, 'speed', {
    label: planet.name,
    min: 0,
    max: 0.05,
    step: 0.0001
  });
});

//the moon will revolve around earth
let moonAngle = 0;
const moonOrbitRadius = 1; // Small orbit radius around Earth

//creating input sliders using pane.addFolder for animation pause and start buttons
let start = true; //boolean constant which will control animation
const controlsFolder = pane.addFolder({
  title: 'Animation Controls',
  expanded: true
});

//adding start button 
controlsFolder.addButton({
  title: '▶ Start',
}).on('click', () => { //event handling: on true rotation will not stop
  start = true;
});

// Pause Button
controlsFolder.addButton({
  title: '⏸ Pause',
}).on('click', () => { // on false, rotation will stop
  start = false;
});
 
//creating visible orbit lines of each planet revolving around the sun
function createOrbitPath(radius) {
  const points = [];
  const segments = 64;
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ));
  }

//defining orbit with buffer geometry and lineBasicMaterial
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    linewidth: 1
  });

  return { line: new THREE.Line(geometry, material), material };
}

// Created orbit paths with opacity control
const orbits = [10, 15, 20, 25, 35, 45, 55, 65].map(radius => {
  const orbit = createOrbitPath(radius);
  scene.add(orbit.line);
  return orbit;
});

//adding saturn ring mesh with texture
const saturnringtexture = textureLoader.load('/textures/saturn_ring.png')
const saturnRingGeometry = new THREE.RingGeometry(10, 15, 64); // Relative to Saturn's size
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    color: 0xC0C0C0,
    side: THREE.DoubleSide, //visible from both sides (front,back)
    map:saturnringtexture
});
const saturnRings = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRings.rotation.x = Math.PI / 2.5; // Slightly tilted like real Saturn
saturn.add(saturnRings); 

// Adding lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
scene.add(ambientLight);
const sunLight = new THREE.PointLight(0xffcc00, 1, 100); 
sun.add(sunLight); // Attached to sun object

//function for constant rendering of scene and camera
function animate() {
  //requests for animation from browser
  requestAnimationFrame(animate);

  //sun self rotating speed
  sun.rotation.y += 0.01;

  //planets revolving around sun
  if (start == true){ //animation OR rotation continues
  
  orbitData.forEach((planet) => { //defining angle 
    planet.angle += planet.speed; 
    planet.mesh.position.x = Math.cos(planet.angle) * planet.radius; //position changes continuously through math function
    planet.mesh.position.z = Math.sin(planet.angle) * planet.radius;
    planet.mesh.rotation.y += 0.01; // spins on axis
  });
  
  // Moon orbiting around earth
  moonAngle += 0.05; // moon speed 
  const earthPos = orbitData.find(p => p.mesh === earth); 

  //position of moon when earth's position changes(rotates)
  moon.position.x = earthPos.mesh.position.x + Math.cos(moonAngle) * moonOrbitRadius;
  moon.position.z = earthPos.mesh.position.z + Math.sin(moonAngle) * moonOrbitRadius;
  moon.position.y = earthPos.mesh.position.y + 0.3; 
  moon.rotation.y += 0.01;}

  //get camera direction in order to determine orbit visibility 
  const viewAngle = Math.abs(camera.getWorldDirection(new THREE.Vector3()).dot(new THREE.Vector3(1, 0, 1)));
  
  // opacity of orbits
  const minOpacity = 0; // Minimum visibility when window is parallel to XZ plane
  const maxOpacity = 1; // Maximum visibility when window is not parallel to XZ plane
  const opacity = minOpacity + (maxOpacity - minOpacity) * (1 - viewAngle);
  
  orbits.forEach(orbit => {
    orbit.material.opacity = opacity;
  });

  controls.update();
  renderer.render(scene, camera);
}
animate(); //recursive loop for continous rendering