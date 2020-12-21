// Light

	const ambientLight = new THREE.AmbientLight(bgColor, 1)
	scene.add(ambientLight)

// Frame

	// const emotionFrame = new Frame(emotionTexture, [-140, 60, -50], "4D E-Motion")
	// const emotionTFrame = new Frame(emotionTTexture, [0, 60, -50], "4D E-Motion Trailer")
	// const amdFrame = new Frame(amdTexture, [140, 60, -50], "AMD 360")
	// const movieFrame = new Frame(movieTexture, [-140, -50, -50], "Autocine Movie")
	// const vueloramaFrame = new Frame(vueloramaTexture, [0, -50, -50], "Vuelorama 360")
	// const emotodisea1FrameionFrame = new Frame(odisea1Texture, [140, -50, -50], "Odisea espacial 360")

	const objs = [
		{ img: emotionTexture, title: "4D E-Motion" },
		{ img: emotionTTexture, title: "4D E-Motion Trailer" },
		{ img: amdTexture, title: "AMD 360" },
		{ img: movieTexture, title: "Autocine Movie" },
		{ img: vueloramaTexture, title: "Vuelorama 360" },
		{ img: odisea1Texture, title: "Odisea espacial 360" }
	]

const SHOWCASE = new Showcase(objs)