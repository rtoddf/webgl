// lighting - starting with directional and including shadow camera helper
// at a later date, look into rectangular area lights

var width = document.getElementById('shape-holder').offsetWidth,
	height = width

function init(){
	var scene = new THREE.Scene()
	var gui = new dat.GUI()

	var enableFog = false;

	if(enableFog){
		scene.fog = new THREE.FogExp2('rgba(255,255,255,1)', 0.2);
	}

	// var box1 = getBox(1, 1, 1)
	var plane = getPlane(30)
	var directionalLight = getDirectionalLight(1)
	var directionalLight = getDirectionalLight(1)

	var sphere = getSphere(0.05)
	var boxGrid = getBoxGrid(10, 1.5)
	var helper = new THREE.CameraHelper(directionalLight.shadow.camera);

	scene.add(plane)
	directionalLight.add(sphere)
	scene.add(directionalLight)
	scene.add(boxGrid)
	scene.add(helper)

	var camera = new THREE.PerspectiveCamera(
		45, width/height, 1, 1000
	)

	plane.rotation.x = Math.PI/2
	directionalLight.position.y = 4
	directionalLight.intensity = 2
	directionalLight.penumbra = .5

	gui.add(directionalLight, 'intensity', 0, 10)
	gui.add(directionalLight.position, 'x', 0, 20)
	gui.add(directionalLight.position, 'y', 0, 20)
	gui.add(directionalLight.position, 'z', 0, 20)

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
	var material = new THREE.MeshBasicMaterial({
		color: 'rgba(255,255,255,1)'
	})

	var mesh = new THREE.Mesh(
		geometry,
		material
	)

	return mesh
}

function getBoxGrid(amount, separationMultiplier){
	var group = new THREE.Group()

	for(var i=0; i<amount; i++){
		var obj = getBox(1, 1, 1);
		obj.position.x = i * separationMultiplier;
		obj.position.y = obj.geometry.parameters.height/2;
		group.add(obj);

		for(var j=1;j<amount;j++){
			var obj = getBox(1,1,1)
			obj.position.x = i * separationMultiplier
			obj.position.y = obj.geometry.parameters.height/2
			obj.position.z = j * separationMultiplier
			group.add(obj);
		}
	}

	group.position.x = -(separationMultiplier * (amount-1))/2
	group.position.z = -(separationMultiplier * (amount-1))/2

	return group
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

function getDirectionalLight(intensity	){
	var light = new THREE.DirectionalLight( 0xffffff, intensity );
	light.castShadow = true

	// defaults are -5 and 5 - set these larger to get a wider field
	light.shadow.camera.left = -10
	light.shadow.camera.bottom = -10
	light.shadow.camera.right = 10
	light.shadow.camera.top = 10

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


















