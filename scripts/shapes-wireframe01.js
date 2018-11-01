var camera, renderer, mesh,
	scene = new THREE.Scene(),
	yRotation  = 0.005,
	meshColor = 'rgba(255,255,255,1)'

init();

$('#shape').change(function() {
    $('#shape option:selected').each(function() {
    	if($(this).attr('value') !== ''){
    		var shapeName = $(this).attr('value')
			var shape = getShape(shapeName)

			if(shape !== undefined){
				scene.remove(scene.children[0])
			}

			scene.add(shape)

			animate(shapeName)
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
	renderer.setClearColor(0x333333, 1);

	$('#cube').append(renderer.domElement)

	renderer.render(scene, camera)
	return scene
}

function getShape(shape){
	var geometry, material

	if(shape == 'cube'){
		geometry = new THREE.CubeGeometry(
			settings[shape].width,
			settings[shape].height,
			settings[shape].depth
		)
	} else if(shape == 'sphere') {
		geometry = new THREE.SphereGeometry(
			settings[shape].radius,
			settings[shape].segmentsWidth,
			settings[shape].segmentsHeight
		);
	} else if(shape == 'circle') {
		geometry = new THREE.CircleGeometry(
			settings[shape].radius,
			settings[shape].segmentsWidth,
			settings[shape].segmentsHeight
		);
	} else if(shape == 'cone') {
		geometry = new THREE.ConeGeometry(
			settings[shape].radius,
			settings[shape].height,
			settings[shape].segments
		);
	} else if(shape == 'cylinder') {
		geometry = new THREE.CylinderGeometry(
			settings[shape].radiusTop,
			settings[shape].radiusBottom,
			settings[shape].height,
			settings[shape].segmentsRadius,
			settings[shape].segmentsHeight,
			settings[shape].openEnded
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

function animate(shapeName) {
	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame(animate)

	// mesh.rotation.x += 0.01
	mesh.rotation.y += yRotation

	renderer.render(scene, camera)
}