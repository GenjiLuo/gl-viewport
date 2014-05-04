var shell = require('mesh-viewer')();
var vport = require('../')(shell, { viewMode: 'ortho' });

window.addEventListener('keydown', function (ev) {
    if (String.fromCharCode(ev.which) === 'P') {
        var mode = vport.viewMode === 'ortho' ? 'perspective' : 'ortho';
        vport.setViewMode(mode);
    }
});

var mesh;
shell.on('viewer-init', function () {
    mesh = shell.createMesh(require('bunny'));
});

shell.on('gl-render', function () {
    vport.draw(mesh);
});
