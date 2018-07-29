// set the scene size
var width = 400,
	height = 300

// set some camera attributes
var view_angle = 45,
	aspect = width/height,
	near = 0.1,
	far = 10000

// get the com element to attaach
var $container = $('#example')

// create a webgl renderer, camera, and a scene
var renderer = new THREE.WebGLRenderer();	

var camera = 
	new THREE.PerspectiveCamera(
		view_angle,
		aspect,
		near,
		far
	)

var scene = new THREE.Scene()

// add the camera to te scene
scene.add(camera)

// the camera starts at 0, 0, 0
// so pull it back
camera.position.z = 300

// start the renderer
renderer.setSize(width, height)

// attach the render-supplied dom element
$container.append(renderer.domElement)

// For now, however, let's apply a lambert material to the sphere:
// create a sphere's material
var sphereMaterial = 
	new THREE.MeshLambertMaterial({
		color: 0xffffff
	})

/* Primitives are geometric meshes, 
relatively basic ones like Spheres, 
Planes, Cubes and Cylinders. */

// set up the sphere vars
var radius = 50, segments = 16, rings = 16

// create a new mesh with sphere geometry
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(radius, segments, rings),
	sphereMaterial
)

//add the sphere to the scene
scene.add(sphere)

// add the camera
scene.add(camera)

// create a point light
var pointLight = 
	new THREE.PointLight(0xFFFFFF)

// set its position
pointLight.position.x = 10
pointLight.position.y = 50
pointLight.position.z = 130

// add to the scene
scene.add(pointLight)

// draw!!
renderer.render(scene, camera)