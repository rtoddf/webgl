var container = $('#example'),
	canvasWidth = container.width(),
	canvasHeight = container.width()

var scene, container, camera, geometry, material, mesh, renderer, cube, plane

var π = Math.PI

init()

function init(){
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		1000,
		canvasWidth/canvasHeight,
		1,
		5000
	);

	camera.position.x = 0
	camera.position.y = -50
	camera.position.z = 200

	camera.lookAt(new THREE.Vector3(0,0,100))

	scene.add(camera)

	cube = getCube(100, 100, 100)
	cube.position.y = cube.geometry.parameters.height/2

	plane = getPlane(1000, 500)
	plane.rotation.x = π/2
	plane.position.y = 100

	var pointLight1 = getPointLight(0xffffff, 1, 200);
	var spotLight1 = getSpotLight(0xae0000, 2, 0)
	var spotLight2 = getSpotLight(0x003264, 2, 0)
	// pointLight1.position.set(0,0,100)
	spotLight1.position.set(-100,50,200)
	spotLight2.position.set(100,-100,200)
	
	scene.add(plane)
	scene.add(cube)
	// scene.add(pointLight1)
	scene.add(spotLight1)
	scene.add(spotLight2)

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setSize(canvasWidth, canvasHeight)
	renderer.setClearColor('rgba(60,60,60,1)')
	container.append(renderer.domElement)

	renderer.render(scene, camera)
}

function getPlane(w, d){
	geometry = new THREE.PlaneGeometry(w, d);

	material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material)

	return mesh
}

function getCube(w, h, d){
	geometry = new THREE.CubeGeometry( w, h, d );

	material = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		side: THREE.DoubleSide
	});

	mesh = new THREE.Mesh(geometry, material)
	// mesh.rotation.x = π / 1.35
	mesh.rotation.y = π / 1.55

	return mesh
}

function getPointLight(color, intensity, distance){
	var plight = new THREE.PointLight( color, intensity, distance);
	return plight
}

function getSpotLight(color, intensity, distance){
	var slight = new THREE.SpotLight(color, intensity, distance);
	return slight
}




