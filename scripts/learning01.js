// https://threejs.org/editor/
// research the traverse function - exercise 2.3

var width = $('#example').width(),
	height = width

function init(){
	var scene = new THREE.Scene()

	scene.fog = new THREE.FogExp2('rgba(255,255,255,1)', 0.2 );

	var box1 = getBox(1, 1, 1)
	var plane = getPlane(20)

	scene.add(box1)
	scene.add(plane)

	// objects have three attrs called position, rotation and scale
	// objects have a method called geometry.parameters where you can get width, height, etc

	var camera = new THREE.PerspectiveCamera(
		45, width/height, 1, 1000
	)

	box1.position.y = box1.geometry.parameters.height/2
	plane.rotation.x = Math.PI/2
	// radians

	camera.position.x = 1
	camera.position.y = 1
	camera.position.z = 5
	// point the camera
	camera.lookAt(new THREE.Vector3(0,0,0))

	var renderer = new THREE.WebGLRenderer()
	// look up Canvas and SVGRenderer just for info purposes
	renderer.setSize(width, height)
	renderer.setClearColor('rgba(255,255,255,1)')

	$('#example').append(renderer.domElement)

	update(renderer, scene, camera)

	return scene
}

function getBox(w, h, d){
	var geometry = new THREE.BoxGeometry(w, h, d)
	var material = new THREE.MeshBasicMaterial({
		color: 0xff0000
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	return mesh
}

function getPlane(size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var material = new THREE.MeshBasicMaterial({
		color: 0x0000ff,
		side: THREE.DoubleSide
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	return mesh
}

// lynda lesson 2-1 and 2-2 explain why
function update(renderer, scene, camera){
	renderer.render(
		scene,
		camera
	)
	requestAnimationFrame(function(){
		update(renderer, scene, camera)
	})
}

var scene = init();


















