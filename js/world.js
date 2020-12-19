const Inflate = Zlib.Inflate

const width = window.innerWidth;
const height = window.innerHeight;
let wm = 1
let bgColor = 0x000000

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor(bgColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
// let controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 100 * wm)
// controls.update();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const listener = new THREE.AudioListener();
camera.add(listener);

const fbxLoader = new THREE.FBXLoader();
const fontLoader = new THREE.FontLoader();

let intersectObjects = []