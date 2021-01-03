// envmap
const env_mat = CubeTextureLoader.load(genCubeUrls('cubemaps/cube1/', '.jpg'), function (cubeTexture) {
    cubeTexture.encoding = THREE.sRGBEncoding;
    lightProbe.copy(THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));
})
