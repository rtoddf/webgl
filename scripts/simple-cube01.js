var renderer,
	scene,
	camera,
	light,
	cube

var π = Math.PI,
	container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width() * .7

init()

function init(){
	// create a renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	
	renderer.setClearColor(0x333333)
	renderer.setPixelRatio(devicePixelRatio)
	renderer.setSize(canvasWidth, canvasHeight)
	container.append(renderer.domElement)

	// create a scene
	scene = new THREE.Scene()

	// create a camera
	camera = new THREE.PerspectiveCamera(
		1000, // field of view
		canvasWidth / canvasHeight, // aspect ratio
		1, // near
		5000 // far
	)

	// position the camera so you're not on top of the geometry
	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 200
	scene.add(camera)

	cube = getCube(100,100,100)
	// mesh.rotation.z = π / 2
	scene.add(cube)

	light1 = getLight('point', 0xff7700, 2)
	light1.position.set(200, 0, 200)
	light2 = getLight('point', 0xae0000, 2)
	light2.position.set(0, 0, 200)

	scene.add(light1)
	scene.add(light2)
}

render()

function render(){
	animate()
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

function animate(){
	cube.rotation.x += 0.02
	cube.rotation.z += 0.02
}

function getCube(w, h, d, col){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.CubeGeometry(w, h, d)

	// create a shiny material
	var material = new THREE.MeshPhongMaterial({
		color: col
	})

	//create a mesh, which takes a geometry and a material
	var mesh = new THREE.Mesh(geometry, material)

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