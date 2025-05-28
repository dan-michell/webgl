import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geomety = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const cube = new THREE.Mesh(geomety, material);

const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];

points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(0, -10, 0));
points.push(new THREE.Vector3(-10, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(lineGeometry, lineMaterial);

// camera.position.z = 5;

const loader = new GLTFLoader();

// scene.add(cube);
scene.add(line);

let cubeGLTF = null;

loader.load(
    "./static/first_cube.glb",
    function (gltf) {
        cubeGLTF = gltf.scene;
        scene.add(cubeGLTF);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

scene.scale.set(10, 10, 10);

// make snake
function animate() {
    line.rotateX(0.01);
    line.rotateZ(0.01);
    line.scale.random();

    if (cubeGLTF) {
        cubeGLTF.rotation.x += Math.random() / 20;
        cubeGLTF.rotation.y += Math.random() / 30;
        cubeGLTF.rotation.z += Math.random() / 50;
    }

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
