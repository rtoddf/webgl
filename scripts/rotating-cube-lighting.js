var scene, container, camera, geometry, material, light, mesh, renderer,
	π = Math.PI

init()
animate()

function init(){
	console.log('sccgmlmr')

	scene = new THREE.Scene()

	container = $('#example')

	camera = new THREE.PerspectiveCamera(
		50, // feild of view
		600 / 600, // aspect ratio
		1, // near
		5000 // far
	)
	camera.position.z = 500
	scene.add(camera)

	geometry = new THREE.CubeGeometry(200,200,200)
	material = new THREE.MeshPhongMaterial({
		color: 0xbaba71,
		wireframe: false
	})

	// new THREE.CubeGeometry(200,200,200)

	// new THREE.SphereGeometry(100,100,16)

	// new THREE.CylinderGeometry(60,30,300,20,4,false)
	// new THREE.OctahedronGeometry(100,0)
	// new THREE.TetrahedronGeometry( 40, 0 )
	// new THREE.PlaneGeometry(500, 500, 10, 10)

	// radius, tube, radialSegments, tubularSegments, arc
	// new THREE.TorusGeometry( 50, 10, 6, 8 )

	light = new THREE.PointLight()
	// x with a negative will go to left of the geom
	// y is reversed - negative is below
	// z is 0 at the camera
	light.position.set(50, 0, 1000)
	scene.add(light)

	mesh = new THREE.Mesh(geometry, material)
	// you rotate the mesh, not the geom
	mesh.rotation.y = π / 3
	mesh.rotation.z = π / 5
	scene.add(mesh)

	renderer = new THREE.WebGLRenderer({
		antialias: true
	})

	renderer.setClearColor( 0xffffff, 0);
	renderer.setSize(600,600)
	container.get(0).appendChild(renderer.domElement)
}

function animate(){
	requestAnimationFrame(animate)
	render()
}

function render(){
	mesh.rotation.x += 0.02
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.02;

	renderer.render(scene, camera)
}