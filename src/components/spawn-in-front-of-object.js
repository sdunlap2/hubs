AFRAME.registerComponent("spawn-in-front-of-object", {
  schema: {},
  init() {
    this.onLoaded = this.onLoaded.bind(this);
    this.el.addEventListener("model-loaded", this.onLoaded);
  },
  onLoaded() {
    const billboardTarget = document.querySelector("#player-camera").object3D;
    const worldPos = new THREE.Vector3().copy({ x: 0, y: 0, z: -1.5 });
    billboardTarget.localToWorld(worldPos);
    this.el.object3D.position.copy(worldPos);
    billboardTarget.getWorldQuaternion(this.el.object3D.quaternion);
  }
});

AFRAME.registerComponent("update-wireframe", {
  init() {
    this.timer = 0;
    this.timerMax = 100;
  },

  tick(t, dt) {
    this.timer = this.timer + dt;
    if (this.timer > this.timerMax) {
      this.timer = 0;
      this.el.components.body.shouldUpdateWireframe = true;
    }
  }
});
