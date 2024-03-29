var margins = {top: 20, right: 20, bottom: 20, left: 70},
	width = document.getElementById('display').offsetWidth,
	height = document.getElementById('display').offsetWidth * .5,
	radius = 228,
	mesh,
	graticule,
	scene = new THREE.Scene,
	camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000),
	renderer = new THREE.WebGLRenderer({alpha: true});

var vis,
	vis_group,
	aspect

camera.position.z = 500;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.getElementById('map').append(renderer.domElement);

d3.json('../data/world-50m.json', function(error, topology) {
	if (error) throw error;
	scene.add(graticule = wireframe(graticule10(), new THREE.LineBasicMaterial({
		color: 0x666666
	})));
	scene.add(
		mesh = wireframe(topojson.mesh(topology, topology.objects.land), new THREE.LineBasicMaterial({color: 0x009900})));
	d3.timer(function(t) {
		graticule.rotation.x = mesh.rotation.x = Math.sin(t / 11000) * Math.PI / 3 - Math.PI / 2;
		graticule.rotation.z = mesh.rotation.z = t / 20000;
		renderer.render(scene, camera);
	});
});

// Converts a point [longitude, latitude] in degrees to a THREE.Vector3.
function vertex(point) {
	var lambda = point[0] * Math.PI / 180,
		phi = point[1] * Math.PI / 180,
		cosPhi = Math.cos(phi);
	return new THREE.Vector3(
		radius * cosPhi * Math.cos(lambda),
		radius * cosPhi * Math.sin(lambda),
		radius * Math.sin(phi)
	);
}

// Converts a GeoJSON MultiLineString in spherical coordinates to a THREE.LineSegments.
function wireframe(multilinestring, material) {
	var geometry = new THREE.Geometry;
	multilinestring.coordinates.forEach(function(line) {
		d3.pairs(line.map(vertex), function(a, b) {
			geometry.vertices.push(a, b);
		});
	});
	return new THREE.LineSegments(geometry, material);
}

// See https://github.com/d3/d3-geo/issues/95
function graticule10() {
	var epsilon = 1e-6,
		x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10,
		X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360,
		x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5),
		X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

	function graticuleX(y0, y1, dy) {
		var y = d3.range(y0, y1 - epsilon, dy).concat(y1);
		return function(x) {
			return y.map(function(y) {
				return [x, y];
			});
		};
	}

	function graticuleY(x0, x1, dx) {
		var x = d3.range(x0, x1 - epsilon, dx).concat(x1);
		return function(y) {
			return x.map(function(x) {
				return [x, y];
			});
		};
	}

	return {
		type: 'MultiLineString',
		coordinates: d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
			.concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
			.concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
				return Math.abs(x % DX) > epsilon;
			}).map(x))
			.concat(d3.range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(function(y) {
				return Math.abs(y % DY) > epsilon;
			}).map(y))
	};
}