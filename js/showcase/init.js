updateWindow();
render();

document.querySelector('#css').appendChild(rendererCss.domElement);
document.querySelector('#webgl').appendChild(renderer.domElement);

// ----- LISTENERS -----//

	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('click', onMouseClick);
	window.addEventListener('resize', updateWindow);
	window.addEventListener('scroll', onScroll);
