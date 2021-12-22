var camera, renderer, mesh,
	scene = new THREE.Scene(),
	yRotation  = 0.03,
	meshColor = 'rgba(255,255,255,1)'

init();

$('#shape-select').change(function() {
    $('#shape-select option:selected').each(function() {
    	if($(this).attr('value') !== ''){
    		var shapeName = $(this).attr('value')
			var shape = getShape(shapeName)

			if(shape !== undefined){
				scene.remove(scene.children[0])
			}

			scene.add(shape)

			animate()
		}
    });
});

function init() {
	camera = new THREE.PerspectiveCamera(
		settings['camera'].fieldOfView, // Field of view
		settings['camera'].aspectRatio, // Aspect ratio
		settings['camera'].nearClipping, // Near
		settings['camera'].farClipping // Far
	);

	// camera.position.x = 0
	// camera.position.y = 0
	camera.position.z = 400

	// create the renderer
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		// alpha: true
	});
	// sets the size
	renderer.setSize(canvasWidth, canvasHeight);
	// sets the bg color
	renderer.setClearColor( 0x333333, 1);

	$('#shape-holder').append(renderer.domElement)

	renderer.render(scene, camera)
	return scene
}

function getShape(shape){
	var geometry, material

	if(shape == 'dodecahedron'){
		geometry = new THREE.DodecahedronGeometry(
			settings[shape].radius,
			settings[shape].detail
		);
	} else if(shape == 'icosahedron') {
		geometry = new THREE.IcosahedronGeometry(
			settings[shape].radius,
			settings[shape].detail
		);
	} else if(shape == 'octahedron') {
		geometry = new THREE.OctahedronGeometry(
			settings[shape].radius,
			settings[shape].detail
		);
	} else if(shape == 'tetrahedron') {
		geometry = new THREE.CylinderGeometry(
			settings[shape].radius,
			settings[shape].detail
		);
	} else if(shape == 'ring') {
		geometry = new THREE.RingGeometry(
			settings[shape].innerRadius,
			settings[shape].outerRadius,
			settings[shape].segments
		);
	} else {
		geometry = new THREE.PlaneGeometry(
			settings[shape].width,
			settings[shape].depth,
			settings[shape].segmentsWidth,
			settings[shape].segmentsDepth
		)
	}

	material = new THREE.MeshBasicMaterial({ 
		color: meshColor, 
		wireframe: true 
	})

	mesh = new THREE.Mesh(geometry, material)
	return mesh
}

function animate() {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate)

	// mesh.rotation.x += 0.01
	mesh.rotation.y += yRotation

	renderer.render(scene, camera)
}