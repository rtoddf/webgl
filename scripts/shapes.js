var canvasWidth = $('#shape-holder').width(),
	canvasHeight = $('#shape-holder').width()

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
		segmentsHeight: 24
	},
	sphere: {
		radius: 200,
		segmentsWidth: 24,
		segmentsHeight: 24
	},
	circle: {
		radius: 200,
		segmentsWidth: 50,
		segmentsHeight: 10
	},
	cone: {
		radius: 100,
		height: 200,
		segments: 50
	},
	cylinder: {
		radiusTop: 100,
		radiusBottom: 200,
		height: 200,
		segmentsRadius: 24,
		segmentsHeight: 24,
		openEnded: false
	},
	plane: {
		width: 300,
		depth: 300,
		segmentsWidth: 10,
		segmentsDepth: 10
	},
	dodecahedron: {
		radius: 200,
		detail: 0
	},
	icosahedron: {
		radius: 200,
		detail: 0
	},
	octahedron: {
		radius: 200,
		detail: 0
	},
	tetrahedron: {
		radius: 200,
		detail: 0
	},
	ring: {
		innerRadius: 100,
		outerRadius: 200,
		segments: 32
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