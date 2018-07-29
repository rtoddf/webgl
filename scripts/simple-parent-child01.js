var renderer,
	scene,
	camera,
	light,
	cube1,
	sphere1

var π = Math.PI,
	container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width()

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

	sphere1 = getSphere(40, 48, 48)
	cube1 = getCube(150, 1, 1)
	cube2 = getCube(150, 1, 1)
	cube3 = getCube(150, 1, 1)
	cube1.rotation.z = π / 2
	cube3.rotation.y = π / 2

	sphere1.position.z = 50
	
	scene.add(sphere1)
	sphere1.add(cube1)
	sphere1.add(cube2)
	sphere1.add(cube3)

	light1 = getLight('point', 0x003264, 1.5, 1000)
	light1.position.set(200, 0, 600)
	light2 = getLight('point', 0xbaba71, 1.5)
	light2.position.set(-200, 0, 200)

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
	sphere1.rotation.x += 0.05
	sphere1.rotation.y += 0.05
	// sphere1.rotation.z += 0.05
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

function getSphere(rad, sWidth, sHeight, col){
	if(col == undefined){ col = 0xffffff }

	var geometry = new THREE.SphereGeometry(rad, sWidth, sHeight)

	// create a shiny material
	var material = getMaterial('lambert')

	//create a mesh, which takes a geometry and a material
	var mesh = new THREE.Mesh(geometry, material)

	return mesh
}

function getMaterial(type, col){
	if(col == undefined){ col = 0xffffff }

	switch (type) {
		case 'phong':
			var materialType = new THREE.MeshPhongMaterial({
				color: col
			})
			break;
		case 'lambert':
		    var materialType = new THREE.MeshLambertMaterial({
				color: col
			})
		    break;
		  default:
		    var materialType = new THREE.MeshLambertMaterial({
				color: col
			})
	}

	return materialType
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