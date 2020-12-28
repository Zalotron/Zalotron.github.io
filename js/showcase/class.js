// ----- FRAME -----//

class Frame {
	constructor(
		img,
		title = "Title",
		position = [0, 0, 0],
		rotation = [0, 0, 0],
		parent = scene,
		parentCss = sceneCss
	)
	// ----- CONSTRUCTOR -----//
	{
		const THAT = this;
		this.morphTarget = 0.2;
		this.tex0 = new THREE.TextureLoader().load("img/0.jpg");
		this.tex1 = new THREE.TextureLoader().load("img/1.jpg");
		this.img = img;
		let screenAlpha = new THREE.TextureLoader().load("img/screen alpha.jpg");

		this.mode = false;
		this.parent = parent;
		this.parentCss = parentCss;
		this.position = position;
		this.positionCss = position;
		this.rotation = rotation;

		// ----- SCREEN ----- //
		fbxLoader.load("meshes/screen16-9.fbx", object => {
			this.screen = new THREE.Mesh(object.children[0].geometry, new THREE.MeshLambertMaterial({
				morphTargets: true,
				transparent: true,
				emissiveMap: this.img,
				emissive: 0xffffff,
				emissiveIntensity: 1,
				alphaMap: screenAlpha
			}))
			this.screen.morphTargetInfluences[0] = this.morphTarget
			this.screen.position.set(0, 0, -4)
			this.screen.scale.set(0.99, 0.99, 0.99)
			
		});

		// ----- PARTICLES ----- //
		fbxLoader.load("meshes/frame16-9.fbx", object => {
			let frameMaterial = new THREE.LineBasicMaterial({ color: 0xffbbbb, morphTargets: true })
			this.frame = new THREE.Mesh(object.children[0].geometry, frameMaterial)
			this.frame.position.set(this.position[0], this.position[1], this.position[2])
			this.frame.rotation.set(this.rotation[0], this.rotation[1], this.rotation[2])
			this.frame.scale.set(1, 1, 1)
			this.frame.morphTargetInfluences[0] = this.morphTarget

			this.emitter = new THREE.Mesh(object.children[0].geometry, new THREE.LineBasicMaterial({ color: 0xffffff, morphTargets: true }))
			this.emitter.material.transparent = true
			this.emitter.material.opacity = 0.5
			this.emitter.position.set(0, 0, 5)
			this.emitter.scale.set(1.01, 1, 1)
			this.emitter.morphTargetInfluences[0] = this.morphTarget;			

			// ----- TEXT ----- //
			this.parent.add(this.frame);
			this.frame.add(this.screen)
			this.screen.add(this.emitter);

			let frameElement = document.createElement('div');
			frameElement.setAttribute("class", "videoFrame")
			frameElement.style.width = '120px';
			frameElement.style.height = '67px';

			this.domFrame = new THREE.CSS3DObject(frameElement);
			this.parentCss.add(this.domFrame);

			let textElement = document.createElement('div');
			textElement.setAttribute("class", "videoTitle")
			textElement.textContent = title

			this.domText = new THREE.CSS3DObject(textElement);
			this.domText.position.y = -42;
			this.domFrame.add(this.domText);

			// ----- PARTICLES ----- //
			this.particles = new MeshParticle(this.emitter, {
				mode: false,
				particles: 0.1,
				velocity: [0, 0, 5],
				size: 3,
				color: 0xffffff,
				alpha: [this.tex0, this.tex1],
				map: true
			})

			function testMorph() {
				if (THAT.emitter.geometry.attributes.morphTarget0 != undefined) {
					THAT.particles.geometry.vertices = vector3add(
						float32toVector3(THAT.emitter.geometry.attributes.position.array),
						float32toVector3(THAT.emitter.geometry.attributes.morphTarget0.array),
						THAT.morphTarget
					)
					THAT.particles.start(THAT.emitter)
				} else {
					setTimeout(() => { testMorph(); }, 20);
				}
			}
			testMorph();

			frameElement.addEventListener('mouseenter', () => this.onEnter());
			frameElement.addEventListener('mouseleave', () => this.onLeave());
		});
	}
	

	start() {
		gsap.timeline({
			defaults: {
				duration: 0.25,
			},
			onStart: () => {
				this.particles = new MeshParticle(this.emitter, {
					mode: false,
					particles: 0.5,
					velocity: [0, 0, 25],
					size: 3,
					color: 0xffffff,
					alpha: [this.tex0, this.tex1],
					map: false
				})
				this.particles.geometry.vertices = float32toVector3(this.emitter.geometry.attributes.position.array)
				this.particles.start(this.emitter)
			}
		})
			.to(this.frame.position, { z: this.position[2] - 2 }, 'start')
			.to(this.frame.scale, { x: 1.03, y: 1.03, z: 1.03 }, 'start')
			.to(this.frame.material.color, { r: 1, g: 1, b: 1 }, 'start')
			.to(this.frame.morphTargetInfluences, { 0: 0 }, 'start')

			.to(this.screen.position, { z: 7 }, 'start')
			.to(this.screen.scale, { x: 0.97, y: 0.97, z: 0.97 }, 'start')
			.to(this.screen.material, { emissiveIntensity: 1.12 }, 'start')
			.to(this.screen.morphTargetInfluences, { 0: 0 }, 'start')

			.to(this.emitter.position, { z: 1 }, 'start')
			.to(this.emitter.material, { opacity: 1 }, 'start')
			.to(this.emitter.morphTargetInfluences, { 0: 0 }, 'start')

			.to(this.domFrame.position, { z: this.positionCss[2] + 10 }, 'start')
			.to(this.domText.position, { z: 3 }, 'start')

	}

	stop() {
		gsap.timeline({
				defaults: {
					duration: 0.5,
				},
				onStart: () => {
					this.particles = new MeshParticle(this.emitter, {
						mode: false,
						particles: 0.1,
						velocity: [0, 0, 5],
						size: 3,
						color: 0xffffff,
						alpha: [this.tex0, this.tex1],
						map: true
					})
				},
				onComplete: () => {
					this.particles.geometry.vertices = vector3add(
						float32toVector3(this.emitter.geometry.attributes.position.array),
						float32toVector3(this.emitter.geometry.attributes.morphTarget0.array),
						this.morphTarget
					)
					this.particles.start(this.emitter)
				}
			})
			.to(this.frame.position, { z: this.position[2] }, 'start')
			.to(this.frame.scale, { x: 1, y: 1, z: 1 }, 'start')
			.to(this.frame.material.color, { r: 1, g: 0.73, b: 0.73 }, 'start')
			.to(this.frame.morphTargetInfluences, { 0: this.morphTarget }, 'start')

			.to(this.screen.position, { z: -4 }, 'start')
			.to(this.screen.scale, { x: 1, y: 1, z: 1 }, 'start')
			.to(this.screen.material, { emissiveIntensity: 1 }, 'start')
			.to(this.screen.morphTargetInfluences, { 0: this.morphTarget }, 'start')

			.to(this.emitter.position, { z: 5 }, 'start')
			.to(this.emitter.material, { opacity: 0.5 }, 'start')
			.to(this.emitter.morphTargetInfluences, { 0: this.morphTarget }, 'start')

			.to(this.domFrame.position, { z: this.positionCss[2] }, 'start')
			.to(this.domText.position, { z: 0 }, 'start')

	}

	onEnter() {
		if (!this.mode) {
			this.mode = true;
			this.particles.stop();
			this.particles = undefined;
			this.start();
		};
	}

	onLeave() {
		if (this.mode) {
			this.mode = false;
			this.particles.stop();
			this.particles = undefined;
			this.stop();
		};
	}
}

class Showcase {
	constructor (
		objects,
		position = [0, 50, -530]
	) {
		this.position = position;

		this.group = new THREE.Group();
		this.group.position.set(this.position[0], this.position[1], this.position[2])
		this.groupCss = new THREE.Group();
		this.groupCss.position.set(this.position[0], this.position[1], this.position[2])
		
		this.objects = [];
		scene.add(this.group)
		sceneCss.add(this.groupCss)

		objects.forEach((element) => {
			let object = new Frame(
				element.img,
				element.title,
				[0, 0, 0],
				[0, 0, 0],
				this.group,
				this.groupCss
			);
			this.objects.push(object);
		});

		this.setPositions();

		window.addEventListener("resize", (event) => this.setPositions(event))
		window.scrollTo(lerp(0.5, 0, document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth), 0)
		window.addEventListener("scroll", (event) => this.onMove(event))
	};

	setPositions(event) {
		let maxX = (window.innerWidth / window.innerHeight > 1) ? 2 : 1;
		let dX = (window.innerWidth / window.innerHeight > 1) ? 140 : 75;
		let dZ = (window.innerWidth / window.innerHeight > 1) ? 15 : 0;
		let rot = (window.innerWidth / window.innerHeight > 1) ? 0.2 : 0.1;
		let countX = 0;
		let countY = 0;
		if(this.objects[this.objects.length - 1] != undefined) {
			if (this.objects[this.objects.length - 1].frame != undefined) {
				this.objects.forEach((element) => {
					element.position = [lerp(countX / maxX, -dX, dX), countY * -100, Math.abs(lerp(countX / maxX, -dZ, dZ)) * -1 + 500];
					element.frame.position.set(lerp(countX / maxX, -dX, dX), countY * -100, Math.abs(lerp(countX / maxX, -dZ, dZ)) * -1 + 500);
					element.positionCss = [lerp(countX / maxX, -dX, dX), countY * -100, Math.abs(lerp(countX / maxX, -dZ, dZ)) * -1 + 495]
					element.domFrame.position.set(element.positionCss[0], element.positionCss[1], element.positionCss[2])
					element.frame.rotation.set(0, lerp(countX / maxX, -rot, rot), 0);
					element.domFrame.rotation.set(0, lerp(countX / maxX, -rot, rot), 0);
					countY = (countX >= maxX) ? countY + 1 : countY;
					countX = (countX >= maxX) ? 0 : countX + 1;
				})
			} else {
				setTimeout(() => { this.setPositions(); }, 20);
			}
		} else {
			setTimeout(() => { this.setPositions(); }, 20);
		};
		let posY = this.position[1] + lerp(window.innerWidth / window.innerHeight / 2, 200, 0);
		this.group.position.set(this.position[0], posY, this.position[2])
		this.groupCss.position.set(this.position[0], posY, this.position[2])
	}

	onMove(event) {
		let scrollX = event.path[1].scrollX;
		let scrollElement = event.target.scrollingElement
		let percent = normalize(scrollX, 0, scrollElement.scrollWidth - scrollElement.clientWidth)
		if (this.group) this.group.rotation.set(0, lerp(percent, 0.15, -0.15), 0);
		if (this.groupCss) this.groupCss.rotation.set(0, lerp(percent, 0.15, -0.15), 0);
	}
}