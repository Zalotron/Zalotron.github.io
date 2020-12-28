// ----- COMPOSER ----- //
	
	const composer = new POSTPROCESSING.EffectComposer(renderer, { multisampling: 4 });
	composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
	composer.setSize(window.innerWidth, window.innerHeight)

// ----- RENDER PASS ----- //

	const renderPass = new POSTPROCESSING.RenderPass(scene, camera);
	composer.addPass(renderPass);

// ----- BOKEH ----- //

	const bokehEffect = new POSTPROCESSING.BokehEffect({
		focus: 0.53,
		aperture: 1.5,
		bokehScale: 1,
		dof: 0.5,
		maxBlur: 1
	});
	const bokehPass = new POSTPROCESSING.EffectPass(camera, bokehEffect);
	//composer.addPass(bokehPass);

// ----- DOF ----- //

	const dofEffect = new POSTPROCESSING.DepthOfFieldEffect(camera, {
		focusDistance: 0.15,
		focalLength: 0.1,
		bokehScale: 1,
	});
	const dofPass = new POSTPROCESSING.EffectPass(camera, dofEffect);
	//composer.addPass(dofPass);

// ----- BLOOM ----- //

	const bloomEffect = new POSTPROCESSING.BloomEffect({
		blendFunction: POSTPROCESSING.BlendFunction.ADD,
		luminanceSmoothing: 0.025,
		resolutionScale: 1,
		width: width,
		height: height,
		kernelSize: POSTPROCESSING.KernelSize.LOW
	});
	const bloomPass = new POSTPROCESSING.EffectPass(camera, bloomEffect);
	composer.addPass(bloomPass);
