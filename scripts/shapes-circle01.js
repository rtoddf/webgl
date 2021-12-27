var renderer,
	scene,
	camera,
	light

var π = Math.PI,
	container = document.getElementById('shape-holder'),
	canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = canvasWidth * .7

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	renderer.setClearColor(0xffffff)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	container.append(renderer.domElement)

	scene = new THREE.Scene();

	camera =  new THREE.PerspectiveCamera( 1000, canvasWidth/canvasHeight, 1, 5000 );
	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 200
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createCircle(100, 100, 0x002200, 0, 6.3)
	scene.add(shape1)

	light1 = createLight('point', 0xffff00, 2)
	light1.position.set(200, 0, 200)
	light2 = createLight('point', 0xffffff, 2)
	light2.position.set(-200, 0, -200)

	scene.add(light1)
	scene.add(light2)
}

render()

function createCircle(r, segments, col, thetaStart, thetaEnd){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.CircleGeometry(r, segments, thetaStart, thetaEnd)

	var material = new THREE.MeshPhongMaterial({
		color: col
	})

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