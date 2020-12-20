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
	composer.addPass(bokehPass);

// ----- OUTLINE ----- //

	const outlineEffect = new POSTPROCESSING.OutlineEffect(scene, camera, {
		blendFunction: POSTPROCESSING.BlendFunction.ADD,
		visibleEdgeColor: "#ff0000",
		hiddenEdgeColor: "#ff0000",
		edgeStrength: 0.5,
		resolutionScale: 0.5,
		kernelSize: POSTPROCESSING.KernelSize.HUGE
	});
	const outlinePass = new POSTPROCESSING.EffectPass(camera, outlineEffect);
	composer.addPass(outlinePass);

	var geometry = new THREE.BoxGeometry(0, 0, 0);
	var material = new THREE.MeshStandardMaterial({color: "#ffffff", depthWrite: false});
	var selection = new THREE.Mesh(geometry, material);
	selection.position.set(0, -5*wm, 0)
	scene.add(selection);
	outlineEffect.selectObject(selection)

// ----- BLOOM ----- //

	const bloomEffect = new POSTPROCESSING.BloomEffect({
		blendFunction: POSTPROCESSING.BlendFunction.ADD,
		luminanceThreshold: 0.85,
		luminanceSmoothing: 0.025,
		intensity: 2,
		resolutionScale: 1,
		width: width,
		height: height,
		kernelSize: POSTPROCESSING.KernelSize.LOW
	});
	const bloomPass = new POSTPROCESSING.EffectPass(camera, bloomEffect);

	const bloomEffect2 = new POSTPROCESSING.BloomEffect({
		blendFunction: POSTPROCESSING.BlendFunction.ADD,
		luminanceThreshold: 0.95,
		luminanceSmoothing: 0.025,
		intensity: 1,
		resolutionScale: 2,
		width: width,
		height: height,
		kernelSize: POSTPROCESSING.KernelSize.HUGE
	});
	const bloomPass2 = new POSTPROCESSING.EffectPass(camera, bloomEffect2);
	composer.addPass(bloomPass);
	composer.addPass(bloomPass2);
