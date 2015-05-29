'use strict';

var path = require('path'),
    SourceNode = require('source-map').SourceNode,
    SourceMapConsumer = require('source-map').SourceMapConsumer,
    makeIdentitySourceMap = require('./makeIdentitySourceMap');


var ANGULAR_DIRECTIVE_RE = /angular\.module\(([\"\'\w\.\-]+)\)[.\n]*\.directive\((.*\s[\s\S]*)\)/g;

module.exports = function (source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  if (!source.match(ANGULAR_DIRECTIVE_RE)) {
    return this.callback(null, source, map);
  }

  var resourcePath = this.resourcePath,
      filename = path.basename(resourcePath),
      separator = '\n\n',
      prependText,
      processedSource,
      node,
      result;

  prependText = [
    'module.hot.accept();',
    'var hotAngular = require("angular-hmr-loader/hot-angular/main.js");'
  ].join(' ');

  //console.log(source.replace(ANGULAR_DIRECTIVE_RE, 'hotAngular.module($1).directive($2)'));
  processedSource = source.replace(ANGULAR_DIRECTIVE_RE, 'hotAngular.module($1).directive($2)');

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependText,
      processedSource
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependText),
    SourceNode.fromStringWithSourceMap(processedSource, new SourceMapConsumer(map))
  ]).join(separator);

  result = node.toStringWithSourceMap();

  this.callback(null, result.code, result.map.toString());
};
