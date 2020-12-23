history.scrollRestoration = 'manual';

const Inflate = Zlib.Inflate

var width = window.innerWidth;
var height = window.innerHeight;
const wm = 1
const bgColor = 0x000000

// WebGL
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(bgColor);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// CSS3D
const rendererCss = new THREE.CSS3DRenderer();
rendererCss.setSize(window.innerWidth, window.innerHeight);
rendererCss.domElement.style.position = 'absolute';
rendererCss.domElement.style.top = 0;

const scene = new THREE.Scene();
const sceneCss = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
camera.position.z = 120 * wm

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const listener = new THREE.AudioListener();
camera.add(listener);

const fbxLoader = new THREE.FBXLoader();
const fontLoader = new THREE.FontLoader();

var intersectObjects = []