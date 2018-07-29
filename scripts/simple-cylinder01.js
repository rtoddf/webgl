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
animate()

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
	camera.position.z = 200
	scene.add(camera)

	cylinder = getCylinder(30, 60, 100, 100, 30, false)
	scene.add(cylinder)
	// cylinder.rotation.x = π / 5
	// cylinder.rotation.z = π / 3

	light1 = getLight('point', 0xae0000, 2)
	light1.position.set(500, 0, 200)
	scene.add(light1)
	light2 = getLight('point', 0xffff00, 2)
	light2.position.set(-500, 0, 200)
	scene.add(light2)
}

function getCylinder(radTop, radBottom, h, sRad, sHeight, open, col){
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

function getLight(type, color, int, dist){
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
	cylinder.rotation.x += 0.03
	// cylinder.rotation.y += 0.01;
	// cylinder.rotation.z += 0.02;
}