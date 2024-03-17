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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);

    /* Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25); 
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight); */

    /* Shadow properties
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 10; */

    // Camera position
    camera.position.set(0, 5, 5);  

    // Create OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

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
    tissueBox.position.x = 1.55;
    tissueBox.position.z = 1.55;

    // tissue
    const tissuePaperGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.01);
    const tissuePaperMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const tissuePaperMesh = new THREE.Mesh(tissuePaperGeometry, tissuePaperMaterial);
    const edges = new THREE.EdgesGeometry(tissuePaperGeometry);
    const lineSegments = new THREE.LineSegments(edges, edgeMaterial);
    const tissuePaper = new THREE.Group();
    tissuePaper.add(tissuePaperMesh);
    tissuePaper.add(lineSegments);
    tissuePaper.rotation.y = Math.PI; 
    tissuePaper.position.y = 0.15;
    tissueBox.add(tissuePaper);

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
