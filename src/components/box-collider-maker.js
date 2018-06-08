AFRAME.registerComponent("box-collider-maker", {
  schema: {
    initialOffset: { default: { x: 0, y: 0, z: -1.5 } }
  },

  init() {
    this.onLoaded = this.onLoaded.bind(this);
    this.el.addEventListener("model-loaded", this.onLoaded);
  },

  onLoaded() {
    const box = new THREE.Box3().setFromObject(this.el.object3D);
    this.el.setAttribute("shape", {
      shape: "box",
      halfExtents: {
        x: (box.max.x - box.min.x) / 2,
        y: (box.max.y - box.min.y) / 2,
        z: (box.max.z - box.min.z) / 2
      },
      offset: {
        x: 0,
        y: (box.max.y - box.min.y) / 2,
        z: 0
      }
    });
    this.el.removeEventListener("model-loaded", this.onLoaded);
  }
});
