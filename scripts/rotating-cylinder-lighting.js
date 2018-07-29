var scene, container, camera, geometry, material, light, mesh, renderer
var π = Math.PI

init()
animate()

function init(){
	scene = new THREE.Scene()

	container = $('#example')

	camera = new THREE.PerspectiveCamera(
		50, // field of view
		600 / 600, // aspect ratio
		1, //near
		5000 // far
	)
	camera.position.z = 500
	scene.add(camera)

	geometry = new THREE.CylinderGeometry(30, 30, 200, 30, 4)
	material = new THREE.MeshPhongMaterial({
		color: 0xd37f07
	})

	light = new THREE.PointLight()
	light.position.y = 5000
	light.position.z = 5000
	scene.add(light)

	mesh  = new THREE.Mesh(geometry, material)
	mesh.rotation.x = π / 5
	mesh.rotation.z = π / 3
	scene.add(mesh)



	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	})
	renderer.setSize(700, 700)
	// renderer.setSize( $('#example').width() / 2, $('#example').width() / 2 )
	container.get(0).appendChild(renderer.domElement)

	renderer.render(scene, camera)
}

function animate(){
	requestAnimationFrame(animate)
	render()
}

function render(){
	mesh.rotation.x += 0.02
	// mesh.rotation.y += 0.01;
	mesh.rotation.z += 0.02;

	renderer.render(scene, camera)
}