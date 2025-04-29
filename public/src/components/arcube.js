AFRAME.registerComponent('arcube', {
    schema: {
        enabled: { type: 'boolean', default: true },
        scale: { type: 'number', default: 1 },
        timeout: { type: 'number', default: 500 }
    },

    init: function () {
        // Apply initial scale and hide the object
        this.el.setAttribute('scale', `${this.data.scale} ${this.data.scale} ${this.data.scale}`);
        this.el.setAttribute('visible', false);
        this.visibleUntil = 0;

        // Handle marker detection
        this.el.addEventListener('markerFound', () => {
            if (!this.data.enabled) return;
            this.el.object3D.visible = true;
            this.visibleUntil = performance.now() + this.data.timeout;
        });

        // Handle marker loss
        this.el.addEventListener('markerLost', () => {
            // Keep visible for timeout duration after loss
        });
    },

    tick: function (time) {
        // Hide the object after the timeout if the marker is no longer visible
        if (this.el.object3D.visible && time > this.visibleUntil) {
            this.el.object3D.visible = false;
        }
    }
});
