history.scrollRestoration = 'manual';

// Loading Manager
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    gsap.to("#loadingScreen", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        delay: 1,
        onComplete: () => {
            document.getElementById("loadingScreen").style.display = "none"
        }
    })
};

loadingManager.onLoad = function () {
    console.log('Loading complete!');
    gsap.to("#loadingScreen", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
        delay: 1,
        onComplete: () => {
            document.getElementById("loadingScreen").style.display = "none"
        }
    })
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    //let element = document.getElementById("loadingProgress");
    //document.getElementById("loadingProgress").style.width = itemsLoaded / itemsTotal * 100 + "%";
    gsap.to("#loadingProgress", {
        width: itemsLoaded / itemsTotal*100+"%",
        duration: 0.5,
        ease: "power1.inOut"
    })
    //console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};

loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

// WebGL
renderer.setClearColor(bgColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// CSS3D
//rendererCss.setSize(window.innerWidth, window.innerHeight);
//rendererCss.domElement.style.position = 'absolute';
//rendererCss.domElement.style.top = 0;

// CAMERA
camera.position.z = 100 * wm
camera.lookAt(0, 0, 0)
//controls.update();
camera.add(listener);

// PROBE
scene.add(lightProbe);

//scene.background = env_mat;

var intersectObjects = []