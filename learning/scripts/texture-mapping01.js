var camera,
	scene,
	renderer

var π = Math.PI,
	canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = canvasWidth * .7

init();


function init() {
	renderer = new THREE.WebGLRenderer({
		alpha: true
	});

	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	document.getElementById('shape-holder').append(renderer.domElement)

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		1000, // field of view
		canvasWidth / canvasHeight, // aspect ratio
		1, // near
		5000 // far
	);

	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 350
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enableZoom = false;

	shape1 = createBox(200, 200, 200)
	scene.add(shape1)

	light1 = createLight('point', 0xffffff, 1)
	light1.position.set(200, 200, 100)
	light2 = createLight('spot', 0xffffff, 1)
	light2.position.set(0, -200, 200)

	scene.add(light1)
	scene.add(light2)
}

function createBox(w, h, d, col){
	if(col == undefined){ col = 0xffffff }
	var geometry = new THREE.BoxGeometry(w, h, d)

	var loader = new THREE.TextureLoader()
	var texture = loader.load('../images/materials/wood-floor.jpg')
	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping

	var material = new THREE.MeshStandardMaterial( {
		map: texture,
		roughness: .8
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

render();

function render(){
	animate()
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

function animate(){
	shape1.rotation.y += 0.01
	shape1.rotation.z += 0.02
}