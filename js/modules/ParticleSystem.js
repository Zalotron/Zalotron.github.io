class MeshParticle {
    constructor(
        mesh,
        options
    ) {

    // ----- DEFAULTS ----- //
        let defaults = {
            mode: true,
            color: 0xffffff,
            size: 1,
            alpha: null,
            map: false,
            particles: 1,
            life: 1,
            velocity: [1, 1, 1]
        }
        this.options = defaults

        if ( mesh == undefined) {
            console.log("Must provide a mesh")
            return
        }
        
        if ( options != undefined) {
            Object.keys(options).forEach(element => {
                this.options[element] = options[element]
            });
        }

        if ( Object.keys(mesh.geometry).includes("vertices") ) {
            this.geometry = mesh.geometry
        } else {
            this.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry)
        }
    
    // ----- INIT ----- //
        if (this.options.mode){
            this.start(mesh)
        }
    }

    start(mesh){
        this.options.mode = true
        this.geometry.vertices.forEach((element, index) => {
            let i = index
            for (let index = 0; index < this.options.particles; index++) {
                if (Math.random() < this.options.particles) {
                    
                    setTimeout(() => {
                        this.emit(i, mesh)
                    }, Math.random() * 1000);
                }
            }
        })
    }

    stop(){
        this.options.mode = false
    }

    emit(i, mesh) {
        if (this.options.mode){
            let life = this.options.life * (0.5 + (Math.random() * 0.5))
            let velocityX = Math.random() * 0.01 * this.options.velocity[0]
            let velocityY = Math.random() * 0.01 * this.options.velocity[1]
            let velocityZ = Math.random() * 0.01 * this.options.velocity[2]

            let v = new THREE.Vector3(this.geometry.vertices[i].x, this.geometry.vertices[i].y, this.geometry.vertices[i].z)
            let geo = new THREE.Geometry()
            let mat = new THREE.PointsMaterial({
                transparent: true,
                color: this.options.color,
                size: this.options.size,
            });

            if (Array.isArray(this.options.alpha)) {
                mat.alphaMap = this.options.alpha[Math.floor(Math.random() * this.options.alpha.length)]
            } else {
                mat.alphaMap = this.options.alpha
            }

            if (this.options.map) {
                mat.map = mat.alphaMap
                mat.color.set(0xffffff)
            } else {
                mat.color.set(this.options.color)
            }

            let m = new THREE.Points(geo, mat);
            geo.vertices.push(v)
            mesh.add(m);

            gsap.to(v, {
                x: v.x + velocityX * 60,
                y: v.y + velocityY * 60,
                z: v.z + velocityZ * 60,
                onComplete: () => {
                    mesh.remove(m);
                    m.geometry.dispose();
                    m.material.dispose();
                    m.geometry = undefined;
                    m.material = undefined;
                    m = undefined;
                    this.emit(i, mesh)
                },
                onUpdate: () => {
                    geo.verticesNeedUpdate = true
                },
                duration: life
            });

            gsap.to(mat, {
                opacity: 0,
                duration: life
            });
        }   
    }
}