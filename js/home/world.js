history.scrollRestoration = 'manual';

// WebGL
renderer.setClearColor(bgColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// CSS3D
rendererCss.setSize(window.innerWidth, window.innerHeight);
rendererCss.domElement.style.position = 'absolute';
rendererCss.domElement.style.top = 0;

// CAMERA
camera.position.z = 100 * wm
camera.lookAt(0, 0, 0)
//controls.update();
camera.add(listener);

// PROBE
scene.add(lightProbe);

//scene.background = env_mat;

var intersectObjects = []