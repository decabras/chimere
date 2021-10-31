import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// grid.material.depthTest = false; // avoid z-fighting
// var url = "https://source.unsplash.com/random/200x200?sig=" + Math.floor(Math.random() * 100);

class App {
    constructor() {
        this.images = [];
        // Create container for 3D canvas
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        // Create camera
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 50);
        this.camera.position.set(0, 1.6, 3);
        // Create camera controls
        this.controls = new OrbitControls(this.camera, this.container);
        this.controls.target.set(0, 1.6, 0);
        this.controls.update();
        // Create grid
        const grid = new THREE.GridHelper(10, 20, 0x111111, 0x111111);
        this.scene.add(grid);
        // Create lights
        const light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(0, 4, 0);
        this.scene.add(light);
        this.scene.add(new THREE.HemisphereLight(0x888877, 0x777788));
        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.xr.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        // Add renderer to body
        document.body.appendChild(VRButton.createButton(this.renderer));
        // Set events
        window.addEventListener('resize', () => this.resize());
    }
    load() {

    }
    loadImage(path) {
        var map = new THREE.TextureLoader().load(path);
        var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
        var image = new THREE.Sprite(material);
        let vector = new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
        vector = vector.normalize().multiplyScalar(10);
        vector.add(camera.position);
        image.position.set(vector.x, vector.y, vector.z);
        scene.add(image);
        this.images.push(image);
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate() {
        this.renderer.setAnimationLoop(() =>  this.render());
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

let app = new App();
app.animate();