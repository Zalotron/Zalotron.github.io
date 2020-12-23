// Light
//const ambientLight = new THREE.AmbientLight(bgColor, 1)
//scene.add(ambientLight)

// Frame
const objs = [
	{ img: emotionTexture, title: "4D E-Motion" },
	{ img: emotionTTexture, title: "4D E-Motion Trailer" },
	{ img: amdTexture, title: "AMD 360" },
	{ img: movieTexture, title: "Autocine Movie" },
	{ img: vueloramaTexture, title: "Vuelorama 360" },
	{ img: odisea1Texture, title: "Odisea espacial 360" }
]

const SHOWCASE = new Showcase(objs)
