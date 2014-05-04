var glm = require('gl-matrix');
var mat4 = glm.mat4, quat = glm.quat, vec3 = glm.vec3;

module.exports = Viewport;

function Viewport (shell, opts) {
    if (!(this instanceof Viewport)) return new Viewport(shell, opts);
    var self = this;
    if (!opts) opts = {};
    self.shell = shell;
    self.camera = opts.camera || 'ortho';
    
    var scratch0 = new Float32Array(16);
    var scratch1 = new Float32Array(16);
    
    self.ortho = mat4.create();
    self.view = mat4.create();
    
    shell.on('gl-render', function () {
        mat4.fromRotationTranslation(self.view,
            quat.conjugate(scratch0, shell.camera.rotation), scratch1
        );
        mat4.translate(
            self.view, self.view,
            vec3.negate(scratch0, shell.camera.center)
        );
        var d = shell.camera.distance;
        mat4.ortho(
            self.ortho, -d, d, -d, d,
            shell.zNear, shell.zFar
        );
    });
}

Viewport.prototype.draw = function (m, opts) {
    if (!opts) opts = {};
    if (!opts.projection) opts.projection = this.ortho;
    if (!opts.view) opts.view = this.view;
    return m.draw(opts);
};
