var scene, camera, renderer

var π = Math.PI,
	container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width() * .5,
	lightHelpers = false,
	lightType = 'spot'

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.shadowMap.enabled = true
	renderer.setSize(canvasWidth, canvasHeight)
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	container.append(renderer.domElement)

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		1000,
		canvasWidth/canvasHeight,
		1,
		5000
	);

	camera.position.z = 300
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );

	shape1 = createBox(100, 100, 100)
	shape1.position.y = shape1.geometry.parameters.height/2 - 1
	shape1.castShadow = true
	scene.add(shape1)

	plane = createPlane(2000, 1000)
	plane.rotation.x = π/2
	plane.position.y = 100
	plane.receiveShadow = true
	scene.add(plane)

	backPlane = createPlane(2000, 1000)
	backPlane.position.z = -100
	backPlane.receiveShadow = true
	scene.add(backPlane)

	var light1 = createLight(lightType, 0xffffff, .5, 0)
	light1.position.set(100, -50, 200)
	light1.castShadow = true
	light1.shadow.bias = 0.001
	light1.penumbra = .5
	// light1.shadow.mapSize.width = 2048
	// light1.shadow.mapSize.height = 2048
	scene.add(light1)

	var light2 = createLight(lightType, 0xff9102, .5, 0)
	light2.position.set(-100, -50, 200)
	light2.castShadow = true
	light2.shadow.bias = 0.001
	light2.penumbra = .5
	// light2.shadow.mapSize.width = 2048
	// light2.shadow.mapSize.height = 2048
	scene.add(light2)


	if(lightHelpers){
		var lightHelper1 = new THREE.PointLightHelper(light1)
		scene.add(lightHelper1)
		var lightHelper2 = new THREE.PointLightHelper(light2)
		scene.add(lightHelper2)
	}
	
}

render()

function render(){
	renderer.render(scene, camera)
	animate()
	requestAnimationFrame(render)
}

function animate(){
	shape1.rotation.y += 0.02;
	shape1.position.y -= 0.06;
	// shape1.rotation.y += 0.02;
}

function createPlane(w, d, col){
	if(col == undefined){ col = 0xffffff }
	geometry = new THREE.PlaneGeometry(w, d);

	material = new THREE.MeshPhongMaterial({
		color: col,
		side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material)

	// mesh.receiveShadow = true
	return mesh
}

function createBox(w, h, d, col){
	if(col == undefined){ col = 0xffffff }
	geometry = new THREE.BoxGeometry( w, h, d );

	material = new THREE.MeshPhongMaterial({
		color: col,
		side: THREE.DoubleSide
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
	case 'directional':
	    var lightType = new THREE.DirectionalLight(color, int)
	    break;
	case 'spot':
	    var lightType = new THREE.SpotLight(color, int);
	    break;
	  default:
	    var lightType = new THREE.PointLight(color, int, dist)
	}

	return lightType
}