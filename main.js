import './style.css'

import * as three from 'three';
import { PointLightHelper } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new three.Scene();

const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new three.TorusGeometry(10, 3, 16, 100);
const material = new three.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new three.Mesh(geometry, material);

scene.add(torus);

const pointLight = new three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new three.AmbientLight(0xffffff);


scene.add(pointLight, ambientLight);

const lightHelper = new three.PointLightHelper(pointLight);
const gridHelper = new three.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new three.SphereGeometry(0.25, 24, 24);
  const material = new three.MeshStandardMaterial({ color: 0xffffff })
  const sphere = new three.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => three.MathUtils.randFloatSpread(100));

  sphere.position.set(x, y, z)
  scene.add(sphere)
}

Array(200).fill().forEach(addStar)

const bgTexture = new three.TextureLoader().load('BorpleM1.png');
scene.background = bgTexture;


// space cat box

const spaceCatTexture = new three.TextureLoader().load('Space_Cat.png');

const spaceCat = new three.Mesh(
  new three.BoxGeometry(5, 5, 5),
  new three.MeshBasicMaterial({ map: spaceCatTexture })
);

scene.add(spaceCat);

// Gren Sphere Thingy

const greenSphereTexture = new three.TextureLoader().load('GreenStuffTexture.png');
const greenSphereNorm = new three.TextureLoader().load('GreenStuffNorm.png');

const greenSphere = new three.Mesh(
  new three.SphereGeometry(5, 25, 25),
  new three.MeshBasicMaterial({
    map: greenSphereTexture,
    normalMap: greenSphereNorm
  })
);

scene.add(greenSphere)

greenSphere.position.z = -15;
greenSphere.position.setX(-30);

function moveCamera() {
  greenSphere.rotation.x += 0.05;
  greenSphere.rotation.y += 0.075;
  greenSphere.rotation.z += 0.05;

  spaceCat.rotation.y += 0.01;
  spaceCat.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01 / 2;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();