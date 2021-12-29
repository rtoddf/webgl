var canvasWidth = document.getElementById('shape-holder').offsetWidth,
	canvasHeight = document.getElementById('shape-holder').offsetWidth

var settings = {
	camera: {
		fieldOfView: 75,
		aspectRatio: canvasWidth/canvasHeight,
		nearClipping: 1,
		farClipping: 10000
	},
	cube: {
		width: 200,
		height: 300,
		depth: 200,
		segmentsWidth: 24,
		segmentsHeight: 24,
		yRotation: 0.005
	},
	sphere: {
		radius: 200,
		segmentsWidth: 24,
		segmentsHeight: 24,
		yRotation: 0.005
	},
	circle: {
		radius: 200,
		segmentsWidth: 50,
		segmentsHeight: 10,
		yRotation: 0.005
	},
	cone: {
		radius: 100,
		height: 200,
		segments: 50,
		yRotation: 0.005
	},
	cylinder: {
		radiusTop: 100,
		radiusBottom: 200,
		height: 200,
		segmentsRadius: 24,
		segmentsHeight: 24,
		openEnded: false,
		yRotation: 0.005
	},
	plane: {
		width: 300,
		depth: 300,
		segmentsWidth: 10,
		segmentsDepth: 10,
		yRotation: 0.005
	},
	dodecahedron: {
		radius: 200,
		detail: 0,
		yRotation: 0.005
	},
	icosahedron: {
		radius: 200,
		detail: 0,
		yRotation: 0.005
	},
	octahedron: {
		radius: 200,
		detail: 0,
		yRotation: 0.005
	},
	tetrahedron: {
		radius: 200,
		detail: 3,
		yRotation: 0.005
	},
	ring: {
		innerRadius: 100,
		outerRadius: 200,
		segments: 32,
		yRotation: 0.005
	}
	
}

// cube
// ( width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides );

// sphere
// ( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength );

// circle
// ( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength );

// cone
// radius, height, segments

// cylinder
// ( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded );

// plane
// ( width, depth, segmentsWidth, segmentsDepth )







// ring
// innerradius, outerradius, segments