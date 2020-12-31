// ----- FRAME -----//

class Logo {
	constructor(
		options
	) {
	// ----- DEFAULTS ----- //
		let defaults = {
			position: [0, 0, 0],
			rotation: [0, 0, 0]
		}
		this.options = defaults

		if (options != undefined) {
			Object.keys(options).forEach(element => {
				this.options[element] = options[element]
			});
		}
	// ----- MATERIALS ----- // new THREE.TextureLoader().load("img/0.jpg");
		let metalBg_mat = new THREE.MeshPhysicalMaterial({
			map: new THREE.TextureLoader().load("meshes/logo/textures/BlackBG_BaseColor.jpg"),
			roughnessMap: new THREE.TextureLoader().load("meshes/logo/textures/BlackBG_Roughness.jpg"),
			normalMap: new THREE.TextureLoader().load("meshes/logo/textures/BlackBG_Normal.jpg"),
			reflectivity: 1,
			envMap: env_mat,
			envMapIntensity: 1,
			emissive: 0x222222,
			emissiveIntensity: 0
		})
		let red_mat = new THREE.MeshPhysicalMaterial({
			color: 0xff0000,
			map: new THREE.TextureLoader().load("meshes/logo/textures/Red_BaseColor.jpg"),
			roughnessMap: new THREE.TextureLoader().load("meshes/logo/textures/Red_Roughness.jpg"),
			normalMap: new THREE.TextureLoader().load("meshes/logo/textures/Red_Normal.jpg"),
			reflectivity: 1,
			metalness: 0.5,
			envMap: env_mat,
			envMapIntensity: 1,
			emissive: 0xff0000,
			emissiveIntensity: 0
		})
		let border_mat = new THREE.MeshPhysicalMaterial({
			color: 0xffffff,
			roughness: 0.8,
			//map: new THREE.TextureLoader().load("meshes/logo/textures/Border_BaseColor.jpg"),
			//roughnessMap: new THREE.TextureLoader().load("meshes/logo/textures/Border_Roughness.jpg"),
			//normalMap: new THREE.TextureLoader().load("meshes/logo/textures/Border_Normal.jpg"),
			reflectivity: 2,
			envMap: env_mat,
			envMapIntensity: 2,
			emissive: 0xffffff,
			emissiveIntensity: 0
		})
		let white_mat = new THREE.MeshPhysicalMaterial({
			map: new THREE.TextureLoader().load("meshes/logo/textures/White_BaseColor.jpg"),
			roughnessMap: new THREE.TextureLoader().load("meshes/logo/textures/White_Roughness.jpg"),
			normalMap: new THREE.TextureLoader().load("meshes/logo/textures/White_Normal.jpg"),
			reflectivity: 1,
			envMap: env_mat,
			envMapIntensity: 1,
			emissive: 0xffffff,
			emissiveIntensity: 0
		})
		let black_mat = new THREE.MeshPhysicalMaterial({
			map: new THREE.TextureLoader().load("meshes/logo/textures/Black_BaseColor.jpg"),
			roughnessMap: new THREE.TextureLoader().load("meshes/logo/textures/Black_Roughness.jpg"),
			normalMap: new THREE.TextureLoader().load("meshes/logo/textures/Black_Normal.jpg"),
			reflectivity: 1,
			envMap: env_mat,
			envMapIntensity: 1,
			emissive: 0x222222,
			emissiveIntensity: 0
		})

	// ----- LOGO ----- //
		this.logo = new THREE.Group();
		this.logo.position.set(this.options.position[0], this.options.position[1], this.options.position[2]);
		this.logo.rotation.set(toRadian(this.options.rotation[0]), toRadian(this.options.rotation[1]), toRadian(this.options.rotation[2]));
		scene.add(this.logo);

		fbxLoader.load("meshes/logo/redUp.txt", object => {
			this.redUp = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.redUp.material[0].copy(metalBg_mat)
			this.redUp.rotation.set(toRadian(-90), 0, 0);
			this.redUp.scale.set(2, 2, 2);
			this.redUp.receiveShadow = true;
			this.redUp.castShadow = true;
			this.logo.add(this.redUp);

			this.redUp.addEventListener('onClick', () => this.onClick(this.redUp));
		});

		fbxLoader.load("meshes/logo/whiteUp.txt", object => {
			this.whiteUp = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.whiteUp.rotation.set(toRadian(-90), 0, 0);
			this.whiteUp.scale.set(2, 2, 2);
			this.whiteUp.receiveShadow = true;
			this.whiteUp.castShadow = true;
			this.logo.add(this.whiteUp);

			this.whiteUp.addEventListener('onClick', () => this.onClick(this.whiteUp));
		});

		fbxLoader.load("meshes/logo/blackUp.txt", object => {
			this.blackUp = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.blackUp.rotation.set(toRadian(-90), 0, 0);
			this.blackUp.scale.set(2, 2, 2);
			this.blackUp.receiveShadow = true;
			this.blackUp.castShadow = true;
			this.logo.add(this.blackUp);

			this.blackUp.addEventListener('onClick', () => this.onClick(this.blackUp));
		});

		fbxLoader.load("meshes/logo/redDown.txt", object => {
			this.redDown = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.redDown.rotation.set(toRadian(-90), 0, 0);
			this.redDown.scale.set(2, 2, 2);
			this.redDown.receiveShadow = true;
			this.redDown.castShadow = true;
			this.logo.add(this.redDown);

			this.redDown.addEventListener('onClick', () => this.onClick(this.redDown));
		});

		fbxLoader.load("meshes/logo/whiteDown.txt", object => {
			this.whiteDown = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.whiteDown.rotation.set(toRadian(-90), 0, 0);
			this.whiteDown.scale.set(2, 2, 2);
			this.whiteDown.receiveShadow = true;
			this.whiteDown.castShadow = true;
			this.logo.add(this.whiteDown);

			this.whiteDown.addEventListener('onClick', () => this.onClick(this.whiteDown));
		});

		fbxLoader.load("meshes/logo/blackDown.txt", object => {
			this.blackDown = new THREE.Mesh(object.children[0].geometry, [
				new THREE.MeshPhysicalMaterial().copy(metalBg_mat),
				new THREE.MeshPhysicalMaterial().copy(red_mat),
				new THREE.MeshPhysicalMaterial().copy(border_mat),
				new THREE.MeshPhysicalMaterial().copy(white_mat),
				new THREE.MeshPhysicalMaterial().copy(black_mat),
			]);
			this.blackDown.rotation.set(toRadian(-90), 0, 0);
			this.blackDown.scale.set(2, 2, 2);
			this.blackDown.receiveShadow = true;
			this.blackDown.castShadow = true;
			this.logo.add(this.blackDown);

			this.blackDown.addEventListener('onClick', () => this.onClick(this.blackDown));
		});
	}

	onClick(mesh) {
		gsap.timeline()
		.to(mesh.material, { emissiveIntensity: 1, duration: 0.1 })
		.to(mesh.material, { emissiveIntensity: 0, duration: 1 })
	}
}

class MovingBox {
	constructor(
		options
	) {
		// ----- DEFAULTS ----- //
		let defaults = {
			position: [0, 0, 0],
			rotation: [0, 0, 0],
			x: 10,
			y: 10,
			z: 20,
			parent: scene
		};
		this.options = defaults

		if (options != undefined) {
			Object.keys(options).forEach(element => {
				this.options[element] = options[element]
			});
		};
		this.mode = false;

		this.mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(this.options.x, this.options.y, this.options.z), new THREE.MeshStandardMaterial({
			color: 0x000000,
			roughness: 0.9,
			emissive: 0xffffff,
			emissiveMap: new THREE.TextureLoader().load("img/BoxLight.jpg"),
			emissiveIntensity: 0
		}));
		this.mesh.position.set(this.options.position[0], this.options.position[1], this.options.position[2]);
		this.mesh.rotation.set(toRadian(this.options.rotation[0]),toRadian(this.options.rotation[1]),toRadian(this.options.rotation[2]));
		this.options.parent.add(this.mesh);

		this.move();
		this.flick();

		this.mesh.addEventListener('onEnter', () => this.onEnter());
		this.mesh.addEventListener('onLeave', () => this.onLeave());
	}

	move() {
		if (!this.mode) {
			gsap.to(this.mesh.position, {
				z: lerp(Math.random(), 0, 5),
				duration: lerp(Math.random(), 1, 2),
				onComplete: () => { this.move() }
			});
		}
	};

	flick() {
		if (!this.mode) {
			gsap.to(this.mesh.material, {
				emissiveIntensity: lerp(Math.random(), 0, 0.1),
				duration: lerp(Math.random(), 1, 2),
				onComplete: () => { this.flick() }
			});
		}
	};

	onEnter() {
		if (!this.mode){
			this.mode = true;
			gsap.killTweensOf(this.mesh.position, "z");
			gsap.killTweensOf(this.mesh.material, "emissiveIntensity");

			gsap.to(this.mesh.position, {
				z: 10,
				duration: 0.1,
			});
			gsap.to(this.mesh.material, {
				emissiveIntensity: 1,
				duration: 0.1,
			})
		}
	};

	onLeave() {
		if (this.mode){
			gsap.killTweensOf(this.mesh.position, "z");
			gsap.killTweensOf(this.mesh.material, "emissiveIntensity");

			this.mode = false;
			this.move();
			this.flick();
		}
	}
}

class MeshPattern {
	constructor(
		options
	) {
		// ----- DEFAULTS ----- //
		let defaults = {
			position: [0, 0, 0],
			rotation: [0, 0, 0],
			x: 10,
			y: 10,
			xSize: 10,
			ySize: 10,
			xDistance: 0,
			yDistance: 0,
			offset: 13.8,
			meshRotation: 45
		};
		this.options = defaults

		if (options != undefined) {
			Object.keys(options).forEach(element => {
				this.options[element] = options[element]
			});
		};

		// ----- GROUP ----- //
		this.group = new THREE.Group();
		this.group.position.set(this.options.position[0], this.options.position[1], this.options.position[2]);
		this.group.rotation.set(toRadian(this.options.rotation[0]), toRadian(this.options.rotation[1]), toRadian(this.options.rotation[2]));
		scene.add(this.group);

		// ----- PATTERN ----- //
		for (let indexY = 0; indexY < this.options.y; indexY++) {			
			for (let indexX = 0; indexX < this.options.x; indexX++){
				let pair = (Number.isInteger(indexY / 2)) ? 0: 1;
				let mesh = new MovingBox({
					parent: this.group,
					position: [
						lerp(indexX / this.options.x, (this.options.xSize + this.options.xDistance) * this.options.x / 2 * -1, this.options.xSize * this.options.x / 2) + lerp(pair, 0, this.options.offset),
						lerp(indexY / this.options.y, (this.options.ySize + this.options.yDistance) * this.options.y / 2 * -1, this.options.ySize * this.options.y / 2),
						lerp(Math.random(), 0, 5)
					],
					rotation: [0, 0, this.options.meshRotation],
					x: this.options.xSize,
					y: this.options.ySize
				})				
			}			
		}
	}
}