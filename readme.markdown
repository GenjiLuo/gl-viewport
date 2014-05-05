# gl-viewport

toggle between orthographic and perspective projection camera views

# example

``` js
var shell = require('mesh-viewer')();
var vport = require('gl-viewport')(shell, { viewMode: 'ortho' });

window.addEventListener('keydown', function (ev) {
    if (String.fromCharCode(ev.which) === 'P') {
        var mode = vport.viewMode === 'ortho' ? 'perspective' : 'ortho';
        vport.setViewMode(mode);
    }
});

var mesh;
shell.on('viewer-init', function () {
    mesh = shell.createMesh(require('bunny'));
    shell.camera.distance = 10;
    shell.camera.center = [ 0, 5, 0 ];
});

shell.on('gl-render', function () {
    vport.draw(mesh);
});
```

Run this demo on [requirebin](http://requirebin.com/?gist=11529820).

# methods

``` js
var viewport = require('gl-viewport')
```

## var vport = viewport(shell, opts)

Create a viewport instance `vport` from a
[game-shell](https://www.npmjs.org/package/game-shell) `shell`.

Set the view mode with `opts.viewMode`. Either `'perspective'` or `'ortho'`.
Default: `'ortho'`.

You can also set the initial `opts.view` and `opts.projection` matricies.

## vport.setViewMode(mode)

Change the view `mode`: `'ortho'` and `'perspective'` are supported.

## vport.draw(mesh)

Draw `mesh` with the viewport projection and view matrix.

# install

With [npm](https://npmjs.org) do:

```
npm install gl-viewport
```

# license

MIT
