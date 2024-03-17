import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

function init() {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; 
    document.getElementById('container').appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 3); 
    scene.add(ambientLight);

    // Camera position
    camera.position.set(0, 5, 5);  

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Audio (Background Music)
  const listener = new THREE.AudioListener;
  camera.add(listener);
  const audioLoader = new THREE.AudioLoader;
  const backgroundSound = new THREE.Audio(listener);

  audioLoader.load('/audio/OMORI OST - WHITE SPACE.mp3', function(buffer){
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true);
    backgroundSound.setVolume(0.5);
    backgroundSound.play();
  })

    // MEWO THE CAT
    // cat body
    const bodyGeometry = new THREE.SphereGeometry(0.25, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7); // Cut off 25% of the sphere
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.75;
    body.position.x = -1.4;
    body.position.z = 1.4;
    body.scale.y = 0.75;
    scene.add(body);

    // cat tail
    const tailCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),  
        new THREE.Vector3(-0.25, 0, 0.1),
        new THREE.Vector3(0.15, 0, 0.45)
    ]);
    const tubeRadius = 0.05;
    const tailGeometry = new THREE.TubeGeometry(tailCurve, 30, tubeRadius, 8, false);
    const tailMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.FrontSide, transparent: false });
    const tail = new THREE.Mesh(tailGeometry, tailMaterial);
    tail.position.set(-0.20, -0.1, 0);
    body.add(tail);

    // cat tail end
    const tailEndGeometry = new THREE.SphereGeometry(0.05, 30, 30);
    const tailEndMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const tailEnd = new THREE.Mesh(tailEndGeometry, tailEndMaterial);
    tailEnd.position.set(-0.05, -0.1, 0.45);
    body.add(tailEnd);

    // cat eyes
    const catEyes = new THREE.Group();
    
    const eye1Geometry = new THREE.SphereGeometry(0.015, 30, 30);
    const eye1Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eye1 = new THREE.Mesh(eye1Geometry, eye1Material);
    eye1.position.set(0.3, 0, 0);
    eye1.scale.y = 2;
    catEyes.add(eye1);

    const eye2Geometry = new THREE.SphereGeometry(0.015, 30, 30);
    const eye2Material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eye2 = new THREE.Mesh(eye2Geometry, eye2Material);
    eye2.position.set(0.3, 0, 0.15);
    eye2.scale.y = 2;
    catEyes.add(eye2);

    body.add(catEyes);
    catEyes.position.set(-0.07, 0, -0.07);

    // cat ears
    const earShape = new THREE.Shape();
    earShape.moveTo(0, 0);
    earShape.lineTo(0.1, 0.2);
    earShape.lineTo(-0.1, 0.2);
    earShape.lineTo(0, 0);
    const extrudeSettings = {
        depth: 0.05,  
        bevelEnabled: false
    };

    const earGeometry = new THREE.ExtrudeGeometry(earShape, extrudeSettings);
    const earMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const earMesh = new THREE.Mesh(earGeometry, earMaterial);

    earMesh.rotateX(-Math.PI);
    earMesh.rotateY(Math.PI / 2);
    earMesh.position.set(0.3, 0.8, -0.3);
    earMesh.scale.y = 1.5;
    body.add(earMesh);

    // inner cat ears
    const innerEarShape = new THREE.Shape();
    innerEarShape.moveTo(0, 0);
    innerEarShape.lineTo(0.05, 0.1);
    innerEarShape.lineTo(-0.05, 0.1);
    innerEarShape.lineTo(0, 0);

    const innerEarGeometry = new THREE.ExtrudeGeometry(innerEarShape, extrudeSettings);
    const innerEarMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const innerEarMesh = new THREE.Mesh(innerEarGeometry, innerEarMaterial);

    innerEarMesh.rotateX(-Math.PI);
    innerEarMesh.rotateY(Math.PI / 2);
    innerEarMesh.position.set(0.31, 0.7, -0.3);
    innerEarMesh.scale.y = 1.25;
    earMesh.add(innerEarMesh);

    // other ear
    const ear1 = new THREE.Group();
    ear1.add(earMesh);
    ear1.add(innerEarMesh);
    const ear2 = ear1.clone();
    ear2.position.set(0, 0, 0.18);
    scene.add(ear1);
    scene.add(ear2);

    // group ears
    const catEars = new THREE.Group();
    catEars.add(ear1);
    catEars.add(ear2);
    catEars.position.set(-0.2, -0.44, 0.21); //-0.2, -0.45, 0.21
    body.add(catEars);

    // TISSUE BOX
    // box
    const tissueBoxGeometry = new THREE.BoxGeometry(0.4, 0.25, 0.3);
    const tissueBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const tissueBoxEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const tissueBoxMesh = new THREE.Mesh(tissueBoxGeometry, tissueBoxMaterial);
    const tissueBoxEdges = new THREE.EdgesGeometry(tissueBoxGeometry);
    const tissueBoxSegments = new THREE.LineSegments(tissueBoxEdges, tissueBoxEdgeMaterial);
    const tissueBox = new THREE.Group();
    tissueBox.add(tissueBoxMesh);
    tissueBox.add(tissueBoxSegments);
    scene.add(tissueBox);
    tissueBox.position.y = -0.72;
    tissueBox.position.x = 1.6;
    tissueBox.position.z = 1.6;

    // tissue
    const tissuePaperGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.01);
    const tissuePaperMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tissueEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const tissuePaperMesh = new THREE.Mesh(tissuePaperGeometry, tissuePaperMaterial);
    const tissueEdges = new THREE.EdgesGeometry(tissuePaperGeometry);
    const tissueSegments = new THREE.LineSegments(tissueEdges, tissueEdgeMaterial);
    const tissuePaper = new THREE.Group();
    tissuePaper.add(tissuePaperMesh);
    tissuePaper.add(tissueSegments);
    tissuePaper.rotation.y = Math.PI; 
    tissuePaper.position.y = 0.15;
    tissueBox.add(tissuePaper);

    //LAPTOP
    const laptopGroup = new THREE.Group();

   // laptop base
    const laptopGeometry = new THREE.BoxGeometry(0.95, 0.6, 0.025); 
    const laptopEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const laptopEdges = new THREE.EdgesGeometry(laptopGeometry);
    const laptopLine = new THREE.LineSegments(laptopEdges, laptopEdgeMaterial);
    laptopGroup.add(laptopLine);

    const laptopMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial);
    laptopLine.add(laptop);

    // laptop screen
    const laptopScreenGeometry = new THREE.PlaneGeometry(0.85, 0.5);
    const laptopScreenMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    const laptopScreenTextureLoader = new THREE.TextureLoader();
    laptopScreenTextureLoader.load('textures/laptop_screen.jpg', function (texture) {
    laptopScreenMaterial.map = texture;
    laptopScreenMaterial.needsUpdate = true;
    });
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
    laptopScreen.position.z = 0.013;
    laptop.add(laptopScreen);

    // laptop bottom
    const laptopBottomGeometry = new THREE.BoxGeometry(0.95, 0.6, 0.025); 
    const laptopBottomEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const laptopBottomEdges = new THREE.EdgesGeometry(laptopBottomGeometry);
    const laptopBottomLine = new THREE.LineSegments(laptopBottomEdges, laptopBottomEdgeMaterial);
    laptopGroup.add(laptopBottomLine);
    laptopBottomLine.rotation.x = Math.PI / 2;
    laptopBottomLine.position.y = -0.29;
    laptopBottomLine.position.z = 0.29;

    const laptopBottomMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const laptopBottom = new THREE.Mesh(laptopBottomGeometry, laptopBottomMaterial);
    laptopGroup.add(laptopBottom);
    laptopBottom.rotation.x = Math.PI / 2;
    laptopBottom.position.y = -0.29;
    laptopBottom.position.z = 0.29;

    // laptop keyboard
    const laptopKeyboardGeometry = new THREE.PlaneGeometry(0.85, 0.45);
    const laptopKeyboardMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
    const laptopKeyboardTextureLoader = new THREE.TextureLoader();
    laptopKeyboardTextureLoader.load('textures/keyboard.png', function (texture) {
    laptopKeyboardMaterial.map = texture;
    laptopKeyboardMaterial.needsUpdate = true;
    });
    const laptopKeyboard = new THREE.Mesh(laptopKeyboardGeometry, laptopKeyboardMaterial);
    laptopKeyboard.position.z = 0.06;
    laptopKeyboard.rotation.x = -Math.PI / 2;
    laptopKeyboard.position.y = -0.27;
    laptopKeyboard.position.z = 0.32;
    laptop.add(laptopKeyboard);

    scene.add(laptopGroup);
    laptopGroup.position.y = -0.54;
    laptopGroup.position.x = 0;
    laptopGroup.position.z = -1.7;

    // NOTEBOOK
    const notebookGroup = new THREE.Group();

    // notebook base
    const notebookWidth = 0.35;
    const notebookHeight = 0.45;
    const notebookThickness = 0.05;
    const notebookGeometry = new THREE.BoxGeometry(notebookWidth, notebookHeight, notebookThickness);

    const notebookEdgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const notebookEdges = new THREE.EdgesGeometry(notebookGeometry);
    const notebookLine = new THREE.LineSegments(notebookEdges, notebookEdgeMaterial);
    notebookGroup.add(notebookLine);

    const notebookMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const notebookCover = new THREE.Mesh(notebookGeometry, notebookMaterial);
    notebookGroup.add(notebookCover);

    // notebook print cover
    const circleRadius = 0.05;
    const circleSegments = 32;
    const circleGeometry = new THREE.CircleGeometry(circleRadius, circleSegments);

    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.position.set(0, 0, notebookThickness / 2 + 0.01);
    notebookGroup.add(circle);

    // binder
    const binderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.01, 32);
    const binderMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const binder1 = new THREE.Mesh(binderGeometry, binderMaterial);
    binder1.position.set(-0.15, -0.15, 0);
    notebookGroup.add(binder1);

    const binder2 = binder1.clone();
    binder2.position.set(-0.15, -0.10, 0);
    notebookGroup.add(binder2);

    const binder3 = binder1.clone();
    binder3.position.set(-0.15, -0.05, 0);
    notebookGroup.add(binder3);

    const binder4 = binder1.clone();
    binder4.position.set(-0.15, 0, 0);
    notebookGroup.add(binder4);

    const binder5 = binder1.clone();
    binder5.position.set(-0.15, 0.05, 0);
    notebookGroup.add(binder5);

    const binder6 = binder1.clone();
    binder6.position.set(-0.15, 0.10, 0);
    notebookGroup.add(binder6);

    const binder7 = binder1.clone();
    binder7.position.set(-0.15, 0.15, 0);
    notebookGroup.add(binder7);

    scene.add(notebookGroup);
    notebookGroup.rotation.x = -Math.PI / 2;
    notebookGroup.position.y = -0.8;
    notebookGroup.position.x = 1.6;
    notebookGroup.position.z = -1.6;
    
    // DOOR
    const doorTextureLoader = new THREE.TextureLoader();
    const doorTexture = doorTextureLoader.load('textures/white_door.jpg');
    const doorMaterial = new THREE.MeshBasicMaterial({ map: doorTexture });
    const boxWidth = 1;
    const boxHeight = 1.75;
    const boxDepth = 0.1;
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const boxMesh = new THREE.Mesh(boxGeometry, doorMaterial);
    const wireframeGeometry = new THREE.EdgesGeometry(boxGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    const doorGroup = new THREE.Group();
    doorGroup.add(boxMesh);
    doorGroup.add(wireframe);
    doorGroup.position.set(-1.5, 0.04, -2.15);
    scene.add(doorGroup);

    // LIGHT BULB
    // parameters for light bulb
    const bulbRadius = 0.1; 
    const baseRadius = 0.05; 
    const baseHeight = 0.1; 
    const threadRadius = 0.005; 
    const threadLength = 10;
    const x = 0; 
    const y = 3; 
    const z = 0; 

    // light bulb
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
    const bulbGeometry = new THREE.SphereGeometry(bulbRadius, 32, 32);
    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMaterial);
    bulbMesh.position.y = -1.18;
    // base
    const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight, 32);
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -1.05;

    // thread
    const threadMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const threadGeometry = new THREE.CylinderGeometry(threadRadius, threadRadius, threadLength, 32);
    const threadMesh = new THREE.Mesh(threadGeometry, threadMaterial);
    threadMesh.position.y = 4;

    // group
    const lightBulbGroup = new THREE.Group();
    lightBulbGroup.add(bulbMesh);
    lightBulbGroup.add(baseMesh);
    lightBulbGroup.add(threadMesh);
    lightBulbGroup.position.set(x, y, z);

    scene.add(lightBulbGroup);

    // FLOOR
    // Create floor
    const floorGeometry = new THREE.BoxGeometry(4, 4, 0.10);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.9;
    floor.receiveShadow = true;
    scene.add(floor);

    // Create floor border
    const borderGeometry = new THREE.BoxGeometry(4.15, 4.15, 0.09);
    const borderMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.rotation.x = -Math.PI / 2;
    border.position.y = -0.9; // Slightly above the floor
    scene.add(border);

    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    // Start rendering
    render();
}

// Run
window.onload = init;