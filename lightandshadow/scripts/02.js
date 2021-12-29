// https://threejs.org/docs/#api/lights/SpotLight

var scene, camera, renderer

var π = Math.PI,
	canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = document.getElementById('shape-holder').offsetWidth * .5,
	lightHelpers = true,
	lightType = 'point'

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.shadowMap.enabled = true
	// renderer.shadowMap.type = THREE.PCFShadowMap;
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	document.getElementById('shape-holder').append(renderer.domElement)

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		1000,
		canvasWidth/canvasHeight,
		1,
		5000
	);

	camera.position.z = 300
	scene.add(camera)

	// camera.position.x = 0
	// camera.position.y = -720
	// camera.lookAt(new THREE.Vector3(0,0,100))

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	// orbit.enableZoom = false;

	shape1 = createBox(100, 100, 100)
	shape1.position.z = 50
	shape1.castShadow = true
	scene.add(shape1)
	// shape1.position.y = shape1.geometry.parameters.height/2 - 35

	plane = createPlane(1000, 1000)
	plane.rotation.x = π/2
	plane.position.y = 100
	plane.receiveShadow = true
	scene.add(plane)

	var light1 = createLight(lightType, 0xffffff, 1, 0)
	light1.position.set(100, 0, 200)
	light1.castShadow = true
	scene.add(light1)
	

	var light2 = createLight(lightType, 0xffffff, 1, 0)
	light2.position.set(-100, 0, 200)
	light2.castShadow = true
	scene.add(light2)
	

	if(lightHelpers){
		var pointLightHelper1 = new THREE.PointLightHelper(light1)
		scene.add(pointLightHelper1)
		var pointLightHelper2 = new THREE.PointLightHelper(light2)
		scene.add(pointLightHelper2)
	}
}

render()

function render(){
	renderer.render(scene, camera)
	animate()
	requestAnimationFrame(render)
}

function animate(){
	shape1.rotation.x += 0.02;
	shape1.rotation.y += 0.02;
}

function createPlane(w, d){
	geometry = new THREE.PlaneGeometry(w, d);

	material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material)
	return mesh
}

function createBox(w, h, d, col){
	if(col == undefined){ col = 0xae0000 }
	geometry = new THREE.BoxGeometry( w, h, d );

	material = new THREE.MeshStandardMaterial({
		color: col,
		// side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material)
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
	case 'spot':
		var lightType = new THREE.SpotLight(color, int)
		break;
	default:
		var lightType = new THREE.PointLight(color, int, dist)
	}

	return lightType
}