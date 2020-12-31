
function onMouseMove(event) {
	event.preventDefault();
	mouse.x = (event.clientX/window.innerWidth)*2-1;
	mouse.y = - (event.clientY/window.innerHeight)*2+1;

	camera.rotation.set(mouse.y * 0.05, (mouse.x * -1)*0.05, 0)
	mouseLight.position.set(mouse.x*325, mouse.y*162, -85)

	raycaster.setFromCamera(mouse, camera);
	const intersects = raycaster.intersectObjects(scene.children, true);
	let newIntersects = [intersects[0].object]

	//for ( var i = 0; i < intersects.length; i ++ ){
	//	newIntersects.push(intersects[i].object)
	//	//intersects[i].object.dispatchEvent({type: "onEnter"})
	//};
	newIntersects[0].dispatchEvent({ type: "onEnter" })

	checkLeaving(intersectObjects, newIntersects).forEach(element => {
		element.dispatchEvent({type: "onLeave"})
	});
	intersectObjects = newIntersects

}

function onMouseClick(event) {
	const intersects = raycaster.intersectObjects(scene.children, true);
	for ( var i = 0; i < intersects.length; i ++ ){
		intersects[i].object.dispatchEvent({type: 'onClick'})
	}
}

function updateWindow(){
	width = window.innerWidth;
	height = window.innerHeight;
	renderer.setSize(width, height);
	rendererCss.setSize(width, height);
	camera.aspect = width/height;
	camera.updateProjectionMatrix();
	composer.setSize(width, height)
}

function render(){	
	composer.render();
	//renderer.render(scene, camera);
	rendererCss.render(sceneCss, camera);
	requestAnimationFrame(render);
}