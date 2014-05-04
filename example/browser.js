var shell = require('mesh-viewer')({ zNear: -1000*1000, zFar: 1000*1000 });
var vport = require('../')(shell, { camera: 'ortho' });

shell.on('viewer-init', function () {
    mesh = shell.createMesh(require('bunny'));
});
shell.on('gl-render', function () {
    vport.draw(mesh);
});
