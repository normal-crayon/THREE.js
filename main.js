import './style.css'

import * as three from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const scene = new three.Scene();

const cam = new three.PerspectiveCamera(100, (window.innerWidth/window.innerHeight), 0.1, 1000);

const renderer = new three.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight );
cam.position.setZ(150);

renderer.render(scene, cam);

//sun spawn
const sunView = new three.TextureLoader().load('../images/sun-view.png');
const sunTexture = new three.TextureLoader().load('../images/sun-texture.jpg')
const geometry = new three.SphereGeometry(30, 32, 16);
const material = new three.MeshStandardMaterial({ map: sunView, normalMap: sunTexture});
const sun = new three.Mesh(geometry, material);
scene.add( sun );

//mercury spawn
const mercuryOrbit = 35;
const mercuryView = new three.TextureLoader().load('../images/mercury-view.jpg');
const mercuryGeometry = new three.SphereGeometry(1, 32, 16);
const mercuryMaterial = new three.MeshStandardMaterial({ map: mercuryView });
const mercury = new three.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.set(0, 0, mercuryOrbit)
scene.add( mercury );

//venus spawn
const venusOrbit = 50;
const venusGeometry = new three.SphereGeometry(2, 32, 16);
const venusMaterial = new three.MeshStandardMaterial({ map: new three.TextureLoader().load('../images/venus-view.jpg'), normalMap: new three.TextureLoader().load('../images/venus-texture.jpg')});
const venus = new three.Mesh(venusGeometry, venusMaterial);
venus.position.set(0, 0, venusOrbit)
scene.add( venus );

//earth spawn
const earthOrbit = 70;
const earthGeometry = new three.SphereGeometry(2.5, 32, 16);
const earthMaterial = new three.MeshStandardMaterial({ map: new three.TextureLoader().load('../images/earth-spherical.jpg'), normalMap: new three.TextureLoader().load('../images/earth-normal.png')});
const earth = new three.Mesh(earthGeometry, earthMaterial);
earth.position.set(0, 0, earthOrbit)
scene.add( earth );

//mars spawn
const marsOrbit = 90;
const marsGeometry = new three.SphereGeometry(3, 32, 16);
const marsMaterial = new three.MeshStandardMaterial({ map: new three.TextureLoader().load('../images/mars-view.jpg'), normalMap: new three.TextureLoader().load('../images/mars-texture.jpg')});
const mars = new three.Mesh(marsGeometry, marsMaterial);
mars.position.set(0, 0, marsOrbit)
scene.add( mars );

//space background
const spaceTexture = new three.TextureLoader().load('../images/stars-bg2.jpg');
scene.background = spaceTexture;

//light source
// const pointLight = new three.PointLight(0xffffff);
// pointLight.position.set(0, 0, 0);
const ambientLight = new three.AmbientLight(0xffffff);
scene.add(ambientLight);
// scene.add(pointLight);

//helper
// const lightHelper = new three.PointLightHelper(pointLight)
// scene.add(lightHelper);

// orbit cam control
const controls = new OrbitControls(cam, renderer.domElement);

//revolution math
let mercuryTheta = 0;
let mercuryDtheta = 2*Math.PI / 200;

let venusTheta = 0;
let venusDtheta = 2*Math.PI / 500;

let earthTheta = 0;
let earthDtheta = 2*Math.PI / 700;

let marsTheta = 0;
let marsDtheta = 2*Math.PI / 800;

function animation() {

  requestAnimationFrame( animation );
  mercuryTheta += mercuryDtheta;
  venusTheta += venusDtheta;
  earthTheta += earthDtheta;
  marsTheta += marsDtheta
  //mercury
  mercury.position.x = mercuryOrbit*Math.cos(mercuryTheta);
  mercury.position.z = mercuryOrbit*Math.sin(mercuryTheta); 
  mercury.rotation.y += 0.5;
  //venus
  venus.position.x = venusOrbit*Math.cos(venusTheta);
  venus.position.z = venusOrbit*Math.sin(venusTheta);
  venus.rotation.y += 0.2;
  //earth
  earth.position.x = earthOrbit*Math.cos(earthTheta);
  earth.position.z = earthOrbit*Math.sin(earthTheta);
  earth.rotation.y += 0.08;
  //mars
  mars.position.x = marsOrbit*Math.cos(marsTheta);
  mars.position.z = marsOrbit*Math.sin(marsTheta);
  mars.rotation.y += 0.05; 
   
  //sun
  sun.rotation.y +=0.0001;
  controls.update();
  renderer.render(scene, cam);
}

animation();