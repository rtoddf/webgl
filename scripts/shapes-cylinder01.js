// cylinder docs: https://threejs.org/docs/#api/geometries/CylinderGeometry

var scene,
	container,
	camera,
	light,
	renderer,
	cylinder

var π = Math.PI,
	container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width() * .7

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})

	renderer.setSize(canvasWidth, canvasHeight)
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	container.append(renderer.domElement)

	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera(
		50, // field of view
		canvasWidth / canvasHeight, // aspect ratio
		1, //near
		5000 // far
	)
	camera.position.z = 300
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createCylinder(30, 60, 100, 100, 30, false)
	scene.add(shape1)
	// shape1.rotation.x = π / 5
	// shape1.rotation.z = π / 3

	light1 = createLight('point', 0xae0000, 2)
	light1.position.set(500, 0, 200)
	scene.add(light1)
	light2 = createLight('point', 0xffff00, 2)
	light2.position.set(-500, 0, 200)
	scene.add(light2)
}

function createCylinder(radTop, radBottom, h, sRad, sHeight, open, col){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.CylinderGeometry(radTop, radBottom, h, sRad, sHeight, open)

	//shiny
	var material = new THREE.MeshPhongMaterial({
		color: col,
		// emissive: 0x003264,
		// emissiveIntensity: 0.5
		// wireframe: true 
	})

	var mesh  = new THREE.Mesh(geometry, material)
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

render()

function render(){
	requestAnimationFrame(render)
	animate()
	renderer.render(scene, camera)
}

function animate(){
	shape1.rotation.x += 0.03
	// shape1.rotation.y += 0.01;
	// shape1.rotation.z += 0.02;
}