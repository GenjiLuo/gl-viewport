var glm = require('gl-matrix');
var mat4 = glm.mat4, quat = glm.quat, vec3 = glm.vec3;

module.exports = Viewport;

function Viewport (shell, opts) {
    if (!(this instanceof Viewport)) return new Viewport(shell, opts);
    var self = this;
    if (!opts) opts = {};
    self.shell = shell;
    self.viewMode = opts.viewMode || 'ortho';
    
    var scratch0 = new Float32Array(16);
    var scratch1 = new Float32Array(16);
    
    self.projection = mat4.create();
    self.view = mat4.create();
}

Viewport.prototype.draw = function (m, opts) {
    if (!opts) opts = {};
    if (!opts.projection) {
        if (this.viewMode === 'ortho') {
            var d = this.shell.camera.distance;
            var ar = this.shell.width / this.shell.height;
            mat4.ortho(
                this.projection, -d, d, -d / ar, d / ar,
                this.shell.zNear, this.shell.zFar
            );
        }
        else if (this.viewMode === 'perspective') {
            mat4.perspective(
                this.projection,
                this.shell.fov,
                this.shell.width / this.shell.height,
                this.shell.zNear,
                this.shell.zFar
            );
        }
        opts.projection = this.projection;
    }
    if (!opts.view) {
        this.shell.camera.view(this.view);
        opts.view = this.view;
    }
    return m.draw(opts);
};

Viewport.prototype.setViewMode = function (name) {
    if (name === 'perspective') {
        this.projection = mat4.create();
        this.view = this.shell.camera.view();
    }
    else if (name === 'ortho') {
        this.projection = mat4.create();
        this.view = mat4.create();
    }
    else {
        throw new Error('view mode not recognized: ' + name);
    }
    this.viewMode = name;
};
