// cone docs: https://threejs.org/docs/#api/geometries/SphereGeometry

var scene,
	container,
	camera,
	light,
	renderer,
	shape1

var π = Math.PI,
	container = $('#shape-holder'),
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
	camera.position.z = 500
	scene.add(camera)

	shape1 = createSphere(100, 10, 10)
	scene.add(shape1)

	light1 = createLight('spot', 0x17bee2, 1)
	light1.position.set(100, 0, 100, 3000)
	light2 = createLight('spot', 0x003264, 1)
	light2.position.set(-100, -200, 100)
	light3 = createLight('spot', 0xff9102, .75)
	light3.position.set(-100, 200, 100)
	scene.add(light1)
	scene.add(light2)
	scene.add(light3)
}

render()

function createSphere(rad, wSegments, hSegements, col){
	if(col == undefined){ col = 0xffffff }

	var coneType = new THREE.SphereGeometry(rad, wSegments, hSegements)

	var material = new THREE.MeshLambertMaterial({
		color: col
	});

	var mesh = new THREE.Mesh(coneType, material)

	return mesh
}

function createLight(type, color, int, dist){
	if(int == undefined){ int = 2 }
	if(dist == undefined){ dist = 2000 }

		console.log('type: ', type)

	switch (type) {
	  case 'point':
	    var lightType = new THREE.PointLight(color, int, dist)
	    break;
	case 'ambient':
	    var lightType = new THREE.AmbientLight(color, int)
	    break;
	case 'spot':
	    var lightType = new THREE.SpotLight(color, int)
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