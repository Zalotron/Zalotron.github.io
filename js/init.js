updateWindow();
render();

document.body.insertBefore(renderer.domElement, document.body.firstChild);

// ----- LISTENERS -----//

	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('click', onMouseClick);
	window.addEventListener('resize', updateWindow);
	window.addEventListener('scroll', onScroll);
