// scene, container, camera, geometry,  material, light, mesh, renderer

var scene, container, camera, geometry, material, light, mesh, renderer
var π = Math.PI

init()
// update()

function init(){
	scene = new THREE.Scene()

	container = $('#example')

	camera = new THREE.PerspectiveCamera(
		1000, // field of view
		600 / 600, // aspect ratio
		1, // near
		5000 // far
	)
	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 200
	scene.add(camera)

	geometry = new THREE.CubeGeometry(100,100,100)
	material = new THREE.MeshPhongMaterial({
		color: 0xffffff
	})

	light = new THREE.PointLight(0x003264, 2, 2000)
	light.position.set(0, 0, 200)
	scene.add(light)

	mesh = new THREE.Mesh(geometry, material)
	mesh.rotation.z = π / 2
	scene.add(mesh)

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	renderer.setSize(600,600)
	container.get(0).appendChild(renderer.domElement)

	renderer.render(scene, camera)
}

function update(){
	animate()

	requestAnimationFrame(function(){
		update()
	})
}

function animate(){
	mesh.rotation.x += 0.02
	mesh.rotation.z += 0.02
	renderer.render(scene, camera)
}