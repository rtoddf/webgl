// lighting, gui, orbitcontrols, shadows

// check out other kinds of navigation controllers availbel inside the example folder
// https://github.com/mrdoob/three.js/tree/dev/examples
// https://github.com/mrdoob/three.js/tree/dev/examples/js
// https://github.com/mrdoob/three.js/tree/dev/examples/js/controls

var width = document.getElementById('shape-holder').offsetWidth,
	height = width

function init(){
	var scene = new THREE.Scene()
	var gui = new dat.GUI()

	var enableFog = false;

	if(enableFog){
		scene.fog = new THREE.FogExp2('rgba(255,255,255,1)', 0.2);
	}

	var box1 = getBox(1, 1, 1)
	var plane = getPlane(20)
	var pointLight = getPointLight(1)
	var sphere = getSphere(0.05)

	scene.add(box1)
	scene.add(plane)
	pointLight.add(sphere)
	scene.add(pointLight)

	var camera = new THREE.PerspectiveCamera(
		45, width/height, 1, 1000
	)

	box1.position.y = box1.geometry.parameters.height/2
	plane.rotation.x = Math.PI/2
	pointLight.position.y = 2
	pointLight.intensity = 2

	gui.add(pointLight, 'intensity', 0, 10)
	gui.add(pointLight.position, 'y', 0, 5)

	camera.position.x = 1
	camera.position.y = 2
	camera.position.z = 5

	camera.lookAt(new THREE.Vector3(0,0,0))

	var renderer = new THREE.WebGLRenderer()
	// shadows 1
	renderer.shadowMap.enabled = true
	renderer.setSize(width, height)
	renderer.setClearColor('rgba(120,120,120,1)')
	document.getElementById('shape-holder').append(renderer.domElement)

	var controls = new THREE.OrbitControls(camera, renderer.domElement)
	update(renderer, scene, camera, controls)

	return scene
}

function getBox(w, h, d){
	var geometry = new THREE.BoxGeometry(w, h, d)
	var material = new THREE.MeshPhongMaterial({
		color: 'rgba(120,120,120,1)'
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	// shadows 3
	mesh.castShadow = true
	return mesh
}

function getSphere(radius){
	var geometry = new THREE.SphereGeometry(radius, 24, 24)
	// three args - size, width, and height of the segments
	var material = new THREE.MeshBasicMaterial({
		color: 'rgba(255,255,255,1)'
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	return mesh
}

function getPlane(size){
	var geometry = new THREE.PlaneGeometry(size, size)
	var material = new THREE.MeshPhongMaterial({
		color: 'rgba(120,120,120,1)',
		side: THREE.DoubleSide
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	// shadows 4
	mesh.receiveShadow = true
	return mesh
}

function getPointLight(intensity){
	var light = new THREE.PointLight( 'rgba(255,255,255,1)', intensity );
	// shadows 2
	light.castShadow = true

	return light
}

function update(renderer, scene, camera, controls){
	renderer.render(
		scene,
		camera
	)

	controls.update()

	requestAnimationFrame(function(){
		update(renderer, scene, camera, controls)
	})
}

var scene = init();


















