/*
 * https://github.com/5orenso
 *
 * Copyright (c) 2015 Øistein Sørensen
 * Licensed under the MIT license.
 */
'use strict';

var _    = require('underscore'),
    opts;

function MyReplacer(opt, mockServices) {
    opts = opt || {
        regexp: /^(\/\/\s+)(.+?)$/gm
    };
    mockServices = mockServices || {};
}

MyReplacer.prototype.set = function set(key, value) {
    opts[key] = value;
    return true;
};

MyReplacer.prototype.get = function get(key) {
    return opts[key];
};

MyReplacer.prototype.replacer = function replacer(match, p1, p2) {
	return '<span class="comment">' + p1 + p2 + '</span>';
};

module.exports = MyReplacer;