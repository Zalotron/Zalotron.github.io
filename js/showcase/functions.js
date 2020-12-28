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
	rendererCss.setSize(width, height);
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