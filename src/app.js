import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { SCENE }  from './scene.js'
import { Vector3 } from 'three';

// grid.material.depthTest = false; // avoid z-fighting
// let url = "https://source.unsplash.com/random/200x200?sig=" + Math.floor(Math.random() * 100);

class App {
    constructor() {
        this.objects = [];
        this.time =  Date.now();
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
        const grid = new THREE.GridHelper(10, 20, 0xff0000, 0x222222);
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
        this.load();
    }
    load() {
        SCENE.IMAGES.forEach(settings => {
            let group = new THREE.Group();
            settings.path.forEach((path, index) => {
                let image = this.loadImage(path);
                image.position.set(0, 0, index * settings.paralaxDistance);
                group.add(image);
            });
            this.scene.add(group);
            this.objects.push({
                settings: settings,
                reference: group
            });
        })
    }
    loadImage(path) {
        let map = new THREE.TextureLoader().load('./medias/images/' + path);
        let material = new THREE.MeshBasicMaterial({map: map, color: 0xffffff, transparent: true});
        let image = new THREE.Sprite(material);
        return image;
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate() {
        this.renderer.setAnimationLoop(() =>  this.render());
    }
    getTimeMethod(method, value) {
        switch(method) {
            case "CONSTANT": return 1.0;
            case "LINEAR": return value;
            case "EASE_IN_OUT": return -(Math.cos(Math.PI * value) - 1) / 2;
        }
    }
    getKeyInterpolation(timePercent, keys) {
        let keyNumber = keys.length;
        if(keyNumber == 0) return {alpha: -1};
        if(keyNumber == 1 || timePercent <= 0) return {k1: 0, alpha: 0};
        if(timePercent >= 1) return {k1: keyNumber - 1,  alpha: 0};
        let i = 1;
        for(; i < keyNumber - 1 && timePercent >= keys[i].t; i++);
        let time = (timePercent - keys[i - 1].t) / (keys[i].t - keys[i - 1].t);
        return {
            k1: i - 1,
            k2: i,
            alpha: this.getTimeMethod(keys[i-1].m, time)
        };
    }
    arrayToVector3(array) {
        let v = new Vector3();
        v.x = array.length > 0 ? array[0] : 0;
        v.y = array.length > 1 ? array[1] : 0;
        v.z = array.length > 2 ? array[2] : 0;
        return v;
    }
    computeAnimation(timePercent, keys) {
        let interpolation = this.getKeyInterpolation(timePercent, keys);
        let value = new Vector3();
        if(interpolation.alpha == 0) {
            value = this.arrayToVector3(keys[interpolation.k1].v);
        } else if(interpolation.alpha > 0) {
            let v1 = this.arrayToVector3(keys[interpolation.k1].v);
            let v2 = this.arrayToVector3(keys[interpolation.k2].v);
            value = v1.lerp(v2, interpolation.alpha);
        }
        return value;
    }
    render() {
        let time = (Date.now() - this.time) / 1000;
        this.objects.forEach(object => {
            let animation = object.settings.animation;
            let timePercent = (time - animation.start) / animation.duration;

            let position = this.computeAnimation(timePercent, animation.position);
            object.reference.position.set(position.x, position.y, position.z);
            object.reference.lookAt(0, 0, 0);

            let opacity = this.computeAnimation(timePercent, animation.opacity);
            object.reference.children.forEach(object => object.material.opacity = opacity.x);            
        });
        this.renderer.render(this.scene, this.camera);
    }
}

let app = new App();
app.animate();