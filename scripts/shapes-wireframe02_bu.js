var canvasWidth = $('#cube').width(),
	canvasHeight = $('#cube').width()

var camera, scene, renderer, geometry, material, mesh

var scene = init();
animate()

function init() {
	camera = new THREE.PerspectiveCamera(
		75, // Field of view
		canvasWidth/canvasHeight, // Aspect ratio
		1, // Near
		10000 // Far
	);

	camera.position.x = 0
	camera.position.y = 0
	camera.position.z = 400

	scene = new THREE.Scene()

	var shape = getShape('tetrahedron')
	scene.add(shape)

	// create the renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		// alpha: true
	});
	// sets the size
	renderer.setSize(canvasWidth, canvasHeight);
	// sets the bg color
	renderer.setClearColor( 0xffffff, 1);

	$('#cube').append(renderer.domElement)

	renderer.render(scene, camera)
	return scene
}

function getShape(shape){
	if(shape == 'cube'){
		// ( width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides );
		geometry = new THREE.CubeGeometry( 100, 200, 100 )
	} else if(shape == 'sphere') {
		// ( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength );
		geometry = new THREE.SphereGeometry( 100, 24, 24 );
	} else if(shape == 'circle') {
		// ( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength );
		geometry = new THREE.CircleGeometry( 100, 24, 24 );
	} else if(shape == 'cone') {
		// radius, height, segments
		geometry = new THREE.ConeGeometry( 100, 200, 50 );
	} else if(shape == 'cylinder') {
		// ( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded );
		geometry = new THREE.CylinderGeometry( 100, 200, 200, 24, 24, true );

	} else if(shape == 'dodecahedron') {
		// In geometry, a dodecahedron is any polyhedron with twelve flat faces
		// radius, detail
		geometry = new THREE.DodecahedronGeometry(100, 0)

	} else if(shape == 'icosahedron') {
		// In geometry, an icosahedron is a polyhedron with 20 faces.
		// radius, detail
		geometry = new THREE.IcosahedronGeometry(100, 0)

	} else if(shape == 'octahedron') {
		// In geometry, an icosahedron is a polyhedron with 20 faces.
		// radius, detail
		geometry = new THREE.OctahedronGeometry(100, 0)
		
	} else if(shape == 'ring') {
		// innerradius, outerradius, segments
		geometry = new THREE.RingGeometry(10, 100, 32)
	} else if(shape == 'tetrahedron') {
		// radius, segments
		geometry = new THREE.TetrahedronGeometry(100, 0)

	} else {
		geometry = new THREE.PlaneGeometry( 200, 200 )
	}

	material = new THREE.MeshBasicMaterial({ 
		color: 'rgba(0,50,100,1)', 
		wireframe: true 
	})

	mesh = new THREE.Mesh(geometry, material)
	return mesh
}

function animate() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate)

	mesh.rotation.x += 0.01
	mesh.rotation.y += 0.01

	renderer.render(scene, camera)
}