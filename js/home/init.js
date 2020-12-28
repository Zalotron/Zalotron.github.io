updateWindow();
render();

//document.querySelector('#css').appendChild(rendererCss.domElement);
//document.querySelector('#webgl').appendChild(renderer.domElement);
document.body.insertBefore(renderer.domElement, document.querySelector('#webgl'));

// ----- LISTENERS -----//

	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('click', onMouseClick);
	window.addEventListener('resize', updateWindow);

