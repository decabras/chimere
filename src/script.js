import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TubePainter } from 'three/examples/jsm/misc/TubePainter.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

let camera, scene, renderer;
let controller1, controller2;

const cursor = new THREE.Vector3();

let controls;

init();
animate();

function init() {

    const container = document.createElement( 'div' );
    document.body.appendChild( container );

    // Scenes and controls
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222 );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 50 );
    camera.position.set( 0, 1.6, 3 );
    controls = new OrbitControls( camera, container );
    controls.target.set( 0, 1.6, 0 );
    controls.update();

    // Grid
    const grid = new THREE.GridHelper( 10, 20, 0x111111, 0x111111 );
    // grid.material.depthTest = false; // avoid z-fighting
    scene.add( grid );  

    var randomImages = [];

    // Add image
    function addRandomImage() {
        var url = "https://source.unsplash.com/random/200x200?sig=" + Math.floor(Math.random() * 100);
        var map = new THREE.TextureLoader().load(url);
        var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
        var sprite = new THREE.Sprite( material );

        let vector = new THREE.Vector3(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
        );
        vector = vector.normalize().multiplyScalar(10);
        vector.add(camera.position);
        sprite.position.set(vector.x, vector.y, vector.z);
        scene.add(sprite);

        randomImages.push({
            animation: 0,
            object: sprite
        });
    }
    for(let i = 0; i < 10; i++) {
        addRandomImage();
    }
    

    // Lights
    scene.add( new THREE.HemisphereLight( 0x888877, 0x777788 ) );
    const light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 0, 4, 0 );
    scene.add( light );

    // Renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;
    container.appendChild( renderer.domElement );

    document.body.appendChild( VRButton.createButton( renderer ) );
    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    renderer.setAnimationLoop( render );

}

function render() {
    renderer.render( scene, camera );
}