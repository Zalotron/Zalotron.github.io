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
	position: [0, 10, -100],
	x: 50,
	y: 15,
	xDistance: 13.5,
	yDistance: 22.5,
	offset: 12.5,
	meshSize: 0.75
})
