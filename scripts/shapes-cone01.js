// cone docs: https://threejs.org/docs/#api/geometries/ConeGeometry

var scene,
	container,
	camera,
	light,
	renderer,
	shape1

var π = Math.PI,
	container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width() * .7

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setSize(canvasWidth, canvasHeight)
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	container.append(renderer.domElement)

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		50,
		canvasWidth/canvasHeight,
		1,
		5000
	);
	camera.position.z = 600
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createCone(50, 350, 50, 50, 0x003264)
	scene.add(shape1)

	light1 = createLight('point', 0xffffff, 1)
	light2 = createLight('point', 0xffffff, 1)
	light3 = createLight('point', 0xffffff, 1)

	light1.position.set(0, 200, 0)
	light2.position.set(100, 200, 100)
	light3.position.set(-100, -200, -100)

	scene.add(light1)
	scene.add(light2)
	scene.add(light3)
}

render()

function createCone(rad, h, radsSegments, hSegments, col, open){
	if(col == undefined){ col = 0xffffff }
	if(open == undefined){ open = false }

	var coneType = new THREE.ConeGeometry(rad, h, radsSegments, hSegments, open)

	var material = new THREE.MeshLambertMaterial({
		color: col,
		// wireframe: true
	});

	var mesh = new THREE.Mesh(coneType, material)

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
	requestAnimationFrame(render)
	animate()
	renderer.render(scene, camera)
}

function animate(){
	shape1.rotation.x += 0.02;
	shape1.rotation.z += 0.02;
}