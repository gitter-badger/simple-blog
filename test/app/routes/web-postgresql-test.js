'use strict';

var buster     = require('buster'),
    assert     = buster.assert,
    express    = require('express'),
    request    = require('request'),
    webRouter = require(__dirname + '/../../../app/routes/web');

var photoPath       = __dirname + '/../../content/images/';

var config = require(__dirname + '/../../../config/config-integration-postgresql.js');
webRouter.setConfig(config, {
    workerId: 1,
    photoPath: photoPath
});

var port = 4321;
var app = express();
app.use('/web', webRouter);
var server;

// jscs:disable
var art = {
    tagValues: {
        toc: '<div class="toc" id="toc"><span class="toc-indent-1">&bull; <a href="#simple-title-1">Simple title 1' +
            '</a></span><span class="toc-indent-2">&bull; <a href="#simple-sub-title-1">Simple sub title 1</a></span>' +
            '<span class="toc-indent-1">&bull; <a href="#simple-title-2">Simple title 2</a></span><span ' +
            'class="toc-indent-2">&bull; <a href="#simple-sub-title-1">Simple sub title 1</a></span><span ' +
            'class="toc-indent-3">&bull; <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div>',
        fact: '',
        artlist: '<div class="artlist"><div class="artlist-art"><div class="artlist-image" ' +
            'style="background-image: url(\'/pho/simple-blog.jpg?w=500\');"><a href="/simple-blog/index">' +
            '<img src="/images/pix.gif" style="height:100%; width:100%;"></a></div><h3><a href="/simple-blog/index">' +
            'Simple Blog Server</a></h3></div><div class="artlist-art"><div class="artlist-image" ' +
            'style="background-image: url(\'/pho/simple-blog.jpg?w=500\');"><a href="/simple-blog/simple-blog">' +
            '<img src="/images/pix.gif" style="height:100%; width:100%;"></a></div><h3><a ' +
            'href="/simple-blog/simple-blog">Simple blog 2</a></h3></div></div><br class="clear">',
        menu: '<ul class="catlist"><li><a href="/">Frontpage</a></li><li><a href="/simple-blog/">simple-blog</a>' +
            '</li></ul>',
        menuOnepage: '<ul class="catlist"><li><a href="/">Frontpage</a></li><li><a href="#simple-blog">' +
            'simple-blog</a></li></ul>',
        'artlist-block': '<div class="artlist"><div class="artlist-art"><h3><a href="simple-blog/index">' +
            'Simple Blog Server</a></h3></div></div><br class="clear">',
        artlistOnepage: '<p><ul class="artlist"><li><a href="#/simple-blog/index">Simple Blog Server</a></li>' +
            '<li><a href="#/simple-blog/simple-blog">Simple blog 2</a></li></ul></p>'
    },
    title: 'Simple Blog Server',
    file: undefined,
    filename: '<p>./test/content/articles/simple-blog/index.md</p>' + "\n",
    tag: ['simple,blog'],
    body: '<h1 class="toc-1"><a name="simple-title-1" class="anchor" href="#simple-title-1"><span class="header-link"></span></a>Simple title 1</h1><h2 class="toc-2"><a name="simple-sub-title-1" class="anchor" href="#simple-sub-title-1"><span class="header-link"></span></a>Simple sub title 1</h2><p>My simple blog text.</p>' + "\n" +
    '      <h1 class="toc-1"><a name="simple-title-2" class="anchor" href="#simple-title-2"><span class="header-link"></span></a>Simple title 2</h1><h2 class="toc-2"><a name="simple-sub-title-1" class="anchor" href="#simple-sub-title-1"><span class="header-link"></span></a>Simple sub title 1</h2><h3 class="toc-3"><a name="simple-sub-sub-title-1" class="anchor" href="#simple-sub-sub-title-1"><span class="header-link"></span></a>Simple sub sub title 1</h3><pre><code class="lang-javascript">' + "\n" +
    '      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">\'hello world\'</span>)<span class="hljs-comment">;</span>' + "\n" +
    '      </code></pre>' + "\n" +
    '      <p><p class="image_inline"><a href="simple-blog.jpg?w=600" data-smoothzoom="group1"><img src="simple-blog.jpg?w=600" alt="Simple blog image" title="My image text"></a></p></p>' + "\n" +
    '      <p><div class="toc" id="toc"><span class="toc-indent-1">&bull; <a href="#simple-title-1">Simple title 1</a></span><span class="toc-indent-2">&bull; <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-1">&bull; <a href="#simple-title-2">Simple title 2</a></span><span class="toc-indent-2">&bull; <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-3">&bull; <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div></p>',
    body2: '<p>This is a test of body 2.\n<div class="toc" id="toc"><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-1">Simple title 1</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-2">Simple title 2</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-3">&bull;' +
        ' <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div></p>' + "\n",
    body3: '<p>This is a test of body 3.\n<div class="toc" id="toc"><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-1">Simple title 1</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-2">Simple title 2</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-3">&bull;' +
        ' <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div></p>' + "\n",
    body4: '<p>This is a test of body 4.\n<div class="toc" id="toc"><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-1">Simple title 1</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-2">Simple title 2</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-3">&bull;' +
        ' <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div></p>' + "\n",
    body5: '<p>This is a test of body 5.\n<div class="toc" id="toc"><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-1">Simple title 1</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-1">&bull;' +
        ' <a href="#simple-title-2">Simple title 2</a></span><span class="toc-indent-2">&bull;' +
        ' <a href="#simple-sub-title-1">Simple sub title 1</a></span><span class="toc-indent-3">&bull;' +
        ' <a href="#simple-sub-sub-title-1">Simple sub sub title 1</a></span></div></p>' + "\n"
};
// jscs:enable

buster.testCase('app/routes/web', {
    setUp: function () {
        // TODO: Start webserver and use routes.
        this.timeout = 2000;
        server = app.listen(port);
    },
    tearDown: function (done) {
        // TODO: Shutdown webserver.
        server.close(function() {
            delete require.cache[require.resolve(__dirname + '/../../../app/routes/web')];
            done();
        });
    },
    'Test web routes:': {
        '/': function (done) {
            request('http://127.0.0.1:' + port + '/web/', function (error, response, body) {
                assert.equals(response.statusCode, 200);
                assert.match(body, art.tagValues.menu);
                //assert.match(body, art.tagValues.artlist);
                //assert.match(body, art.body);
                assert.match(body, art.title);
                assert.match(body, art.tagValues.toc);
                //assert.match(body, art.tagValues.artlistOnepage);
                //assert.match(body, art.tagValues.menuOnepage);
                assert.match(body, '/pho/simple-blog.jpg');
                assert.match(body, '/pho/test.jpg');
                done();
            });
        },

        '// /this-should-not-be-found': function (done) {
            request('http://127.0.0.1:' + port + '/web/this-should-not-be-found', function (error, response, body) {
                assert.equals(response.statusCode, 404);
                assert.match(body, art.tagValues.menu);
                assert.match(body, art.tagValues.artlist);
                done();
            });

        },

        '// simple-blog/index': function (done) {
            request('http://127.0.0.1:' + port + '/web/simple-blog/index', function (error, response, body) {
                assert.equals(response.statusCode, 200);
                assert.match(body, art.tagValues.menu);
                assert.match(body, art.tagValues.artlist);
                done();
            });

        },

        '// simple-blog/': function (done) {
            request('http://127.0.0.1:' + port + '/web/simple-blog/', function (error, response, body) {
                assert.equals(response.statusCode, 200);
                assert.match(body, art.tagValues.menu);
                assert.match(body, art.tagValues.artlist);
                done();
            });

        }

    }
});
