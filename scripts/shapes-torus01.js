// cylinder docs: https://threejs.org/docs/#api/geometries/TorusGeometry

var scene,
	container,
	camera,
	light,
	renderer

var π = Math.PI,
	container = $('#shape-holder'),
	canvasWidth = container.width(),
	canvasHeight = container.width()

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
	camera.position.z = 175
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createTorus(50, 20, 50, 100)
	scene.add(shape1)

	light1 = createLight('point', 0x003264, 2)
	light1.position.set(400, 0, 100)
	scene.add(light1)
	light2 = createLight('point', 0x8403a9, 2)
	light2.position.set(-700, 0, 200)
	scene.add(light2)
}

render()

function createTorus(rad, tube, radSegements, tubSegments, col){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.TorusGeometry( rad, tube, radSegements, tubSegments);

	var material = new THREE.MeshPhongMaterial({
		color: col
	});

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

function render(){
	renderer.render(scene, camera)
	animate()
	requestAnimationFrame(render)
}

function animate(){
	shape1.rotation.x += 0.02;
	shape1.rotation.y += 0.02;
}