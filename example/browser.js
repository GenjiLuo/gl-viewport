var shell = require('mesh-viewer')();
var vport = require('../')(shell, { viewMode: 'perspective' });
window.vport = vport;

shell.on('viewer-init', function () {
    mesh = shell.createMesh(require('bunny'));
});
shell.on('gl-render', function () {
    vport.draw(mesh);
});
