var scene, camera, renderer

var π = Math.PI,
	canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = document.getElementById('shape-holder').offsetWidth * .5,
	lightHelpers = false,
	lightType = 'point'

init()

function init(){
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.shadowMap.enabled = true
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	document.getElementById('shape-holder').append(renderer.domElement)

	scene = new THREE.Scene()

	camera = new THREE.PerspectiveCamera(
		1000,
		canvasWidth/canvasHeight,
		1,
		5000
	);
	camera.position.z = 400
	scene.add(camera)

	var orbit = new THREE.OrbitControls( camera, renderer.domElement );
	// orbit.enableZoom = false;

	mainCylinder = createCylinder(50, 50, 250, 100, 30, false, 0xffffff, true)
	mainCylinder.castShadow = true

	shape1 = createCylinder(60, 60, 30, 100, 30, false, 0xffffff)
	shape1.position.y = 50
	shape1.castShadow = true
	shape2 = createCylinder(60, 60, 30, 100, 30, false, 0xffffff)
	shape2.position.y = -50
	shape2.castShadow = true

	group1 = new THREE.Group();
	group1.add(mainCylinder, shape1, shape2)
	group1.castShadow = true
	scene.add(group1)

	floor = createPlane(3000, 700)
	floor.receiveShadow = true
	floor.rotation.x = π/2
	floor.position.y = 150
	scene.add(floor)

	var light1 = createLight(lightType, 0xffffff, 1, 0)
	light1.position.set(100, 0, 200)
	light1.castShadow = true
	scene.add(light1)

	var light2 = createLight(lightType, 0xae0000, 3, 0)
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
	// group1.rotation.x += 0.04;
	// group1.rotation.y += 0.04;
	group1.rotation.z += 0.04;
}

function createCylinder(radTop, radBottom, h, sRad, sHeight, open, col, texture){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.CylinderGeometry(radTop, radBottom, h, sRad, sHeight, open)

	if(texture){
		var loader = new THREE.TextureLoader()
		var texture = loader.load('../images/materials/checkerboard.jpg')
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping

		var material = new THREE.MeshStandardMaterial( {
			map: texture,
			roughness: .8
		});
	} else {
		var material = new THREE.MeshStandardMaterial({
			color: col,
			// side: THREE.DoubleSide
		});
	}

	var mesh  = new THREE.Mesh(geometry, material)
	return mesh
}

function createPlane(w, d){
	geometry = new THREE.PlaneGeometry(w, d);

	var loader = new THREE.TextureLoader()
	var texture = loader.load('../images/materials/stone-wall.jpg')
	texture.wrapS = THREE.RepeatWrapping
	texture.wrapT = THREE.RepeatWrapping

	var material = new THREE.MeshStandardMaterial( {
		map: texture,
		roughness: .8
	});

	mesh = new THREE.Mesh(geometry, material)

	// mesh.receiveShadow = true
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