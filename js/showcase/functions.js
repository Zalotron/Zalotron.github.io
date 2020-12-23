function lerp(n, a, b) { return a + n * (b - a); }

function normalize(n, a, b) { return (n - (a + 1)) / ((b - 1) - (a + 1)); }

function clamp(n, a, b) { return n <= a + 1 ? (a + 1) : n >= (b - 1) ? (b - 1) : n; }

function toDegree(radians) {
	return radians * (180 / Math.PI);
}
function toRadian(degrees) {
	return degrees * (Math.PI / 180);
}

function float32toVector3(Float32) {
	let array = []
	let vector = new THREE.Vector3()
	let count = 0
	Float32.forEach(element => {
		if ( count == 0 ) {
			vector.x = element
			count += 1
		}
		else if (count == 1) {
			vector.y = element
			count += 1
		}
		else {
			vector.z = element
			count = 0;
			array.push(vector)
			vector = new THREE.Vector3()
		}
	})
	return array
}

function vector3add(vector1, vector2, multiplier = 1) {
	if (Array.isArray(vector1)) {
		let vectors = []
		vector1.forEach((element, i) => {
			let vector = new THREE.Vector3(element.x + vector2[i].x*multiplier, element.y + vector2[i].y*multiplier, element.z + vector2[i].z*multiplier)
			vectors.push(vector)
		});
		return vectors
	} else {
		let vector = new THREE.Vector3(vector1.x + vector2.x*multiplier, vector1.y + vector2.y*multiplier, vector1.z + vector2.z*multiplier)
		return vector
	}
}

function checkLeaving(array1, array2) {
	let response = []
	array1.forEach(element => {
		if (!array2.includes(element)) {
			response.push(element)
		}
	});
	return response;
}

function debounce(func, wait, immediate) {
	let timeout;
	return function () {
		let context = this, args = arguments;
		let later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX/window.innerWidth)*2-1;
	mouse.y = - (event.clientY/window.innerHeight)*2+1;

	camera.rotation.set(mouse.y * 0.05, (mouse.x * -1)*0.05, 0)

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);
	let newIntersects = []

	for ( var i = 0; i < intersects.length; i ++ ){
		newIntersects.push(intersects[i].object)
		intersects[i].object.dispatchEvent({type: "onEnter"})
	}

	checkLeaving(intersectObjects, newIntersects).forEach(element => {
		element.dispatchEvent({type: "onLeave"})
	});
	intersectObjects = newIntersects

}

function onMouseClick(event) {
	event.preventDefault();
	const intersects = raycaster.intersectObjects(scene.children, true);
	for ( var i = 0; i < intersects.length; i ++ ){
		intersects[i].object.dispatchEvent({type: 'onClick'})
	}
}

function onScroll(event) {
	let scrollY = event.path[1].scrollY
	camera.position.y = -scrollY * 0.1
}

function updateWindow(){
	width = window.innerWidth;
	height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width/height;
	camera.updateProjectionMatrix();
	composer.setSize(width, height)
	camera.position.z = lerp(width/height/2, 500, 120)
}

function render(){	
	composer.render();
	//renderer.render(scene, camera);
	rendererCss.render(sceneCss, camera);
	requestAnimationFrame(render);
}