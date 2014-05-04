var glm = require('gl-matrix');
var mat4 = glm.mat4, quat = glm.quat, vec3 = glm.vec3;
var shell = require('mesh-viewer')({
    zNear: -1000*1000,
    zFar: 1000*1000
});

var scratch0 = new Float32Array(16);
var scratch1 = new Float32Array(16);

shell.on('viewer-init', function () {
    var ortho = mat4.ortho(
        mat4.create(),
        -100, 100,
        -100, 100,
        Number.MIN_VALUE, Number.MAX_VALUE
    );
    var mesh = shell.createMesh(require('bunny'));
    var view = mat4.create();
    
    shell.on('gl-render', function () {
        mat4.fromRotationTranslation(view,
            quat.conjugate(scratch0, shell.camera.rotation), scratch1
        );
        mat4.translate(view, view, vec3.negate(scratch0, shell.camera.center));
        
        var d = shell.camera.distance;
        ortho = mat4.ortho(
            ortho, -d, d, -d, d,
            shell.zNear, shell.zFar
        );
        mesh.draw({ projection: ortho, view: view });
    });
});
