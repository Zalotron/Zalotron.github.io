// ----- FRAME -----//

class Frame {
	constructor(
		img,
		position = [0, 0, 0],
		title = "Title"
	)
	// ----- CONSTRUCTOR -----//
	{
		const THAT = this;
		this.morphTarget = 0.2;
		this.tex0 = new THREE.TextureLoader().load("img/0.jpg");
		this.tex1 = new THREE.TextureLoader().load("img/1.jpg");
		this.img = img;
		let screenAlpha = new THREE.TextureLoader().load("img/screen alpha.jpg");

		this.mode = false
		this.position = position

		// ----- SCREEN ----- //
		//fbxLoader.load("meshes/screen16-9.fbx", object => {
		fbxLoader.load("meshes/jkl.fbx", object => {
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

			this.screen.addEventListener('onEnter', () => this.onEnter());
			this.screen.addEventListener('onLeave', () => this.onLeave());
		});

		// ----- PARTICLES ----- //
		fbxLoader.load("meshes/frame16-9.fbx", object => {
			let frameMaterial = new THREE.LineBasicMaterial({ color: 0xffbbbb, morphTargets: true })
			this.frame = new THREE.Mesh(object.children[0].geometry, frameMaterial)
			this.frame.position.set(this.position[0], this.position[1], this.position[2])
			this.frame.scale.set(1, 1, 1)
			this.frame.morphTargetInfluences[0] = this.morphTarget

			this.emitter = new THREE.Mesh(object.children[0].geometry, new THREE.LineBasicMaterial({ color: 0xffffff, morphTargets: true }))
			this.emitter.material.transparent = true
			this.emitter.material.opacity = 0.5
			this.emitter.position.set(0, 0, 5)
			this.emitter.scale.set(1.01, 1, 1)
			this.emitter.morphTargetInfluences[0] = this.morphTarget

			scene.add(this.frame);
			this.frame.add(this.screen)
			this.screen.add(this.emitter);

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
		});

		// ----- TEXT ----- //
		fontLoader.load('fonts/helvetiker_bold.typeface.json', font => {
			let textGeo = new THREE.TextBufferGeometry(title, {
				font: font,
				size: 6,
				height: 0
			})
			this.text = new THREE.Mesh(textGeo, new THREE.MeshLambertMaterial({ emissive: 0xffd0d0 }))
			this.text.position.set(-60, -45, 0)
			this.screen.add(this.text)
		})
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
			.to(this.text.material.emissive, { r: 1, g: 0.8274, b: 0.8274 }, 'start');

	}

	stop() {
		gsap.timeline({
			defaults: {
				duration: 0.5,
			},
			onComplete: () => {
				this.particles = new MeshParticle(this.emitter, {
					mode: false,
					particles: 0.1,
					velocity: [0, 0, 5],
					size: 3,
					color: 0xffffff,
					alpha: [this.tex0, this.tex1],
					map: true
				})
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
			.to(this.text.material.emissive, { r: 1, g: 0.8156, b: 0.8156 }, 'start');

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
