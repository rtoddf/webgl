// box docs: https://threejs.org/docs/#api/geometries/BoxGeometry

var renderer,
	scene,
	camera,
	light

var π = Math.PI,
	container = $('#shape-holder'),
	canvasWidth = container.width(),
	canvasHeight = container.width() * .7

init()

function init(){
	// create a renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	container.append(renderer.domElement)

	// create a scene
	scene = new THREE.Scene()

	// create a camera
	camera = new THREE.PerspectiveCamera(
		1000, // field of view
		canvasWidth / canvasHeight, // aspect ratio
		1, // near
		5000 // far
	)

	// position the camera so you're not on top of the geometry
	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 200
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createBox(100,100,100)
	// shape1.rotation.z = π / 2
	scene.add(shape1)

	light1 = createLight('point', 0xff7700, 2)
	light1.position.set(200, 0, 200)
	light2 = createLight('point', 0xae0000, 2)
	light2.position.set(0, 0, 200)

	scene.add(light1)
	scene.add(light2)
}

render()

function render(){
	animate()
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

function animate(){
	shape1.rotation.x += 0.02
	shape1.rotation.z += 0.02
}

function createBox(w, h, d, col){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.BoxGeometry(w, h, d)

	// create a shiny material
	var material = new THREE.MeshPhongMaterial({
		color: col
	})

	//create a mesh, which takes a geometry and a material
	var mesh = new THREE.Mesh(geometry, material)

	return mesh
}

function createLight(type, color, int, dist){
	if(int == undefined){ int = 2 }
	if(dist == undefined){ dist = 2000 }

	switch (type) {
	  case 'point':
	    var lightType = new THREE.PointLight(color, int, dist)
	    break;
	case 'ambient':
	    var lightType = new THREE.AmbientLight(color, int)
	    break;
	  default:
	    var lightType = new THREE.PointLight(color, int, dist)
	}

	return lightType
}