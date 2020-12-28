// envmap
const env_mat = CubeTextureLoader.load(genCubeUrls('cubemaps/cube3/', '.jpg'), function (cubeTexture) {
    cubeTexture.encoding = THREE.sRGBEncoding;
    lightProbe.copy(THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));
})

const emotionTexture = new THREE.TextureLoader().load("img/4D E-Motion.jpg");
const emotionTTexture = new THREE.TextureLoader().load("img/4D E-Motion Trailer.jpg");
const amdTexture = new THREE.TextureLoader().load("img/AMD 360.jpg");
const movieTexture = new THREE.TextureLoader().load("img/Autocine Movie.jpg");
const vueloramaTexture = new THREE.TextureLoader().load("img/Vuelorama 360.jpg");
const odisea1Texture = new THREE.TextureLoader().load("img/Odisea espacial 360 (Planetario).jpg");
const odisea2Texture = new THREE.TextureLoader().load("img/Odisea espacial 2 (Planetario).jpg");