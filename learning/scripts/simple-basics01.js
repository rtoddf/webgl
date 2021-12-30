var canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = document.getElementById('shape-holder').offsetWidth * .6

var renderer = new THREE.WebGLRenderer({
	// canvas: document.getElementById('example')
	// canvas: $('#example').get(0),
	antialias: true
});
renderer.setClearColor(0xffffff)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(canvasWidth, canvasHeight)

document.getElementById('shape-holder').append(renderer.domElement)

var camera = new THREE.PerspectiveCamera( 35, canvasWidth/canvasHeight, 0.1, 3000 );
var scene = new THREE.Scene();

var light = new THREE.AmbientLight( 0xffffff, .5 );
scene.add(light)

var light2 = new THREE.PointLight( 0xffffff, .5 );
scene.add(light2)

var geometry = new THREE.BoxGeometry( 300,100,200 );
var material = new THREE.MeshLambertMaterial({
	color: 0xae0000
});
var mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0,0,-1000)

scene.add(mesh)

render()

function render(){
	mesh.rotation.x += .01
	mesh.rotation.y += .05

	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

