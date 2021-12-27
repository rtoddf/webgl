// https://www.youtube.com/watch?v=HsE_7C1tRTo

var canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = document.getElementById('shape-holder').offsetWidth * .6

var π = Math.PI

// renderer
var renderer = new THREE.WebGLRenderer({
	// canvas: document.getElementById('example')
	// canvas: $('#example').get(0),
	antialias: true
});
renderer.setClearColor(0x333333)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvasWidth, canvasHeight)

document.getElementById('shape-holder').append(renderer.domElement)

// camera
var camera = new THREE.PerspectiveCamera( 35, canvasWidth/canvasHeight, 0.1, 3000 );
var scene = new THREE.Scene();

// lights
var light = new THREE.AmbientLight( 0xffffff, .5 );
scene.add(light)

var light2 = new THREE.PointLight( 0xffffff, .5 );
scene.add(light2)

// materials
// mixes phong and lambert
// var material = new THREE.MeshStandardMaterial({
// 	color: 0xf3ffe2,
// 	roughness: 0.2,
// 	metalness: 0.8
// });

// shiny
var material = new THREE.MeshPhongMaterial({
	color: 0xf3ffe2,
	// specular: 0xff0000,
	// shininess: 100,
	// map: new THREE.TextureLoader().load('wool.jpg'),
	// applies texture and bumps and physical abrasions
	// normalMap: new THREE.TextureLoader().load('normal.jpg')
});

// non-shiny
// var material = new THREE.MeshLambertMaterial({
// 	color: 0xf3ffe2,
// 	emissive: 0x003264,
// 	emissiveIntensity: 0.5
// 	side: THREE.FrontSide
// 	side: THREE.BackSide
// 	side: THREE.DoubleSide
// 	map: new THREE.TextureLoader().load('wool.jpg')
// });

// var material = new THREE.MeshNormalMaterial();

// var material = new THREE.MeshBasicMaterial({
// 	color: 0x00ff00,
// 	transparent: true,
// 	opacity: 1,
// 	wireframe: true,
// 	wireframeLinewidth: 10,
// 	wireframeLinejoin: 'round',
// 	wireframeLinecap: 'round'
// });

//geometry


var geometry1 = new THREE.CubeGeometry( 100, 100, 100 );
var mesh1 = new THREE.Mesh(geometry1, material)
mesh1.position.z = -500
mesh1.position.x = -100
scene.add(mesh1)

var geometry2 = new THREE.SphereGeometry( 50, 20, 20 );
var mesh2 = new THREE.Mesh(geometry2, material)
mesh2.position.z = -500
mesh2.position.x = 100
scene.add(mesh2)

var geometry3 = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
var mesh3 = new THREE.Mesh(geometry3, material)
mesh3.rotation.x = -90 * π/180
mesh3.position.y = -100
mesh3.position.z = -800
scene.add(mesh3)

// render loop
render()

function render(){
	mesh1.rotation.x += .01
	mesh1.rotation.y += .05

	renderer.render(scene, camera)
	requestAnimationFrame(render)
}