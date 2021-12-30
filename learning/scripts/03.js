// lighting, shadows

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
	var pointLight = getspotLight(1)
	var spotLight = getSpotLight(1)

	var sphere = getSphere(0.05)
	var boxGrid = getBoxGrid(10, 1.5)

	// scene.add(box1)
	scene.add(plane)
	spotLight.add(sphere)
	scene.add(spotLight)
	scene.add(boxGrid)

	var camera = new THREE.PerspectiveCamera(
		45, width/height, 1, 1000
	)

	// box1.position.y = box1.geometry.parameters.height/2
	plane.rotation.x = Math.PI/2
	spotLight.position.y = 4
	spotLight.intensity = 2
	spotLight.penumbra = .5

	gui.add(spotLight, 'intensity', 0, 10)
	gui.add(spotLight.position, 'x', 0, 20)
	gui.add(spotLight.position, 'y', 0, 20)
	gui.add(spotLight.position, 'z', 0, 20)
	gui.add(spotLight, 'penumbra', 0, 1)

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

function getspotLight(intensity){
	var light = new THREE.SpotLight( 'rgba(255,255,255,1)', intensity );
	light.castShadow = true

	return light
}

function getSpotLight(intensity){
	var light = new THREE.SpotLight( 'rgba(255,255,255,1)', intensity );
	light.castShadow = true
	// takes care of unwanted issue with shadow maps - case by case basis
	// could be more or less
	light.shadow.bias = 0.001
	// default is 1024. setting it higher can cause performace issues
	light.shadow.mapSize.width = 2048
	light.shadow.mapSize.height = 2048

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


















