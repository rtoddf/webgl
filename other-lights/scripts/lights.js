var renderer,
    scene,
    camera,
    myCanvas = document.getElementById('myCanvas');

//RENDERER
renderer = new THREE.WebGLRenderer({
canvas: myCanvas, 
antialias: true
});
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//SCENE
scene = new THREE.Scene();



//MATERIAL

var material = new THREE.MeshLambertMaterial();
var material2 = new THREE.MeshPhongMaterial();
var material3 = new THREE.MeshStandardMaterial();


//GEOMETRY

var geometry = new THREE.BoxGeometry(100, 100, 100, 10, 10, 10);
var geometry2 = new THREE.SphereGeometry(50, 20, 20);
var geometry3 = new THREE.PlaneGeometry(10000, 10000, 100, 100);


var mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -500;
mesh.position.x = -100;
mesh.position.y = -50;
scene.add(mesh);


var mesh2 = new THREE.Mesh(geometry2, material2);
mesh2.position.z = -500;
mesh2.position.x = 100;
mesh2.position.y = -50;
scene.add(mesh2);


var mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.rotation.x = -90 * (Math.PI / 180);
mesh3.position.y = -100;
scene.add(mesh3);


//LIGHTS

//ambient light
// var light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);


// pointlight
// var light = new THREE.PointLight(0xffffff, 2.0, 600);
// scene.add(light);
//
// var pointLightHelper = new THREE.PointLightHelper(light);
// scene.add(pointLightHelper);

// directionallight
// var light = new THREE.DirectionalLight(0xffffff, 2.0, 1000);
// light.target = mesh;
// scene.add(light);
//
// var directionalLightHelper = new THREE.DirectionalLightHelper(light, 100);
// scene.add(directionalLightHelper);


// spotlight
var light = new THREE.SpotLight(0xffffff, 2.0, 1000);
light.target = mesh2;
scene.add(light);

var spotLightHelper = new THREE.SpotLightHelper(light);
scene.add(spotLightHelper);


// hemisphere light
// var light = new THREE.HemisphereLight(0xffffbb, 0x0808dd, 1);
// scene.add(light);
//
// var hemisphereLightHelper = new THREE.HemisphereLightHelper(light, 100);
// scene.add(hemisphereLightHelper);


//shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

var light = new THREE.SpotLight(0xffffff, 4.0, 3000);
light.position.y = 100;
light.target = mesh;
//
light.castShadow = true;
light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 100, 1, 500, 1000 ) );

light.shadow.bias = 0.0001;    
light.shadow.mapSize.width = 2048 * 2;
light.shadow.mapSize.height = 2048 * 2;
scene.add(light);

mesh.castShadow = true;
mesh2.castShadow = true;
mesh3.receiveShadow = true;
//
//
// var shadowMapViewer = new THREE.ShadowMapViewer( light );  
// shadowMapViewer.position.x = 10;
// shadowMapViewer.position.y = 10;
// shadowMapViewer.size.width = 2048 / 4;
// shadowMapViewer.size.height = 1024 / 4;
// shadowMapViewer.update();



//cameras


//perspective camera
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

//orthographic camera
// camera = new THREE.OrthographicCamera(-300, 300, 200, -200, 0.1, 10000);


//camera helper
// newCamera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 1000 );

// newCamera = new THREE.OrthographicCamera(-300, 300, 200, -200, 0.1, 1000);

// var cameraHelper = new THREE.CameraHelper(newCamera);
// scene.add(cameraHelper);


//RENDER LOOP
render();


var delta = 0;
function render() {


    delta += 0.01;

    spotLightHelper.update();
    // directionalLightHelper.update();


    camera.lookAt(light.position);
    camera.position.x = Math.sin(delta) * 2000;
    camera.position.z = Math.cos(delta) * 2000;

    renderer.render(scene, camera);
    // shadowMapViewer.render(renderer);

    requestAnimationFrame(render);
}