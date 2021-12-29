var camera, scene, renderer, geometry, material, mesh, container;

init();
animate();

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		50, // Field of view
		600 / 600, // Aspect ratio
		1, // Near
		5000 // Far
	);
	camera.position.z = 1000; // sets the camera's XYZ coordinates to -15, 10, and 15 respectively
	// camera.position.y = 0;
	// camera.position.x = 100;
	scene.add(camera);

	// create a shaded texture-mapped cube and add it to the scene
	// first, create the texture texture texture
	var mapUrl = '../images/record.jpg'
	var map = THREE.ImageUtils.loadTexture(mapUrl)

	geometry = new THREE.BoxGeometry(200, 200, 200);
	material = new THREE.MeshPhongMaterial({
		map: map
	});

	// material =     new THREE.MeshPhongMaterial({
	//   color: 0x0000bb
	// });    

	// new THREE.MeshNormalMaterial();

	// new THREE.MeshBasicMaterial({
	//   color: 0x003264
	// });

	// new THREE.MeshLambertMaterial({
	//     color: 0x0000bb
	// });

	var light = new THREE.PointLight();
	light.position.set(50, 150, 150);
	scene.add(light);

	mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer({
		alpha: true
	});

	renderer.setClearColor( 0xffffff, 0);
	renderer.setSize(600, 600);

	document.getElementById('shape-holder').appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	renderer.render(scene, camera);
}

// http://japhr.blogspot.com/2012/07/lights-and-materials-in-threejs.html

// http://mrdoob.github.io/three.js/docs/49/#PointLight

	// window.onload = function() {

	//     var renderer = new THREE.WebGLRenderer();
	//     renderer.setSize( 800, 600 );
	//     document.body.appendChild( renderer.domElement );

	//     var scene = new THREE.Scene();

	//     var camera = new THREE.PerspectiveCamera(
	//         35,             // Field of view
	//         800 / 600,      // Aspect ratio
	//         0.1,            // Near plane
	//         10000           // Far plane
	//     );
	//     camera.position.set( -15, 10, 10 );
	//     camera.lookAt( scene.position );

	//     var geometry = new THREE.BoxGeometry( 5, 5, 5 );
	//     var material = new THREE.MeshLambertMaterial( { color: 0xFF0000 } );
	//     var mesh = new THREE.Mesh( geometry, material );
	//     scene.add( mesh );

	//     var light = new THREE.PointLight( 0xFFFF00 );
	//     light.position.set( 10, 0, 10 );
	//     scene.add( light );

	//     renderer.render( scene, camera );

	// };