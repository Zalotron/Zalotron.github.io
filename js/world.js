history.scrollRestoration = 'manual';

const Inflate = Zlib.Inflate

const width = window.innerWidth;
const height = window.innerHeight;
const wm = 1
const bgColor = 0x000000

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(bgColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.setPixelRatio(2);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
// let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 100 * wm)
// controls.update();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const listener = new THREE.AudioListener();
camera.add(listener);

const fbxLoader = new THREE.FBXLoader();
const fontLoader = new THREE.FontLoader();

var intersectObjects = []