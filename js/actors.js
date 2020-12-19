// Light

	var ambientLight = new THREE.AmbientLight(bgColor, 1)
	scene.add(ambientLight)

// Frame

	var emotionFrame = new THREE.TextureLoader().load("img/4D E-Motion.jpg");
	var emotionTFrame = new THREE.TextureLoader().load("img/4D E-Motion Trailer.jpg");
	var amdFrame = new THREE.TextureLoader().load("img/AMD 360.jpg");
	var movieFrame = new THREE.TextureLoader().load("img/Autocine Movie.jpg");
	var vueloramaFrame = new THREE.TextureLoader().load("img/Vuelorama 360.jpg");
	var odisea1Frame = new THREE.TextureLoader().load("img/Odisea espacial 360 (Planetario).jpg");
	var odisea2Frame = new THREE.TextureLoader().load("img/Odisea espacial 2 (Planetario).jpg");

	var emotionFrame = new Frame(emotionFrame, [-140, 60, -50], "4D E-Motion")
	var emotionTFrame = new Frame(emotionTFrame, [0, 60, -50], "4D E-Motion Trailer")
	var amdFrame = new Frame(amdFrame, [140, 60, -50], "AMD 360")
	var movieFrame = new Frame(movieFrame, [-140, -50, -50], "Autocine Movie")
	var vueloramaFrame = new Frame(vueloramaFrame, [0, -50, -50], "Vuelorama 360")
	var emotodisea1FrameionFrame = new Frame(odisea1Frame, [140, -50, -50], "Odisea espacial 360")
