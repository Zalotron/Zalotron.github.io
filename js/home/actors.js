// Light
const mouseLight = new THREE.PointLight("#ff0000", 10, 100, 1);
mouseLight.castShadow = true;
mouseLight.shadow.mapSize.width = 1024;
mouseLight.shadow.mapSize.height = 1024;
mouseLight.shadow.radius = 5;
scene.add(mouseLight)

// Logo
const LOGO = new Logo()

const PATTERN = new MeshPattern({
	position: [54, -100, -100],
	rotation: [0, 0, -13],
	x: 32,
	y: 34,
	xSize: 20,
	ySize: 20,
	xDistance: 15,
	yDistance: -10.5,
	meshRotation: 45,
	offset: 13.7,
})
