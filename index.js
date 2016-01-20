var path = require('path')
var through = require('through2')
var spy = require('through2-spy')
var fromArray = require('from2-array')
var map = require('through2-map')
var sliced = require('sliced')
var fs = require('fs')
var os = require('os')

var src = path.join(os.homedir(), '.dotfiles', 'home')
var dest = os.homedir()

fs.readdir(src, function (err, fileNames) {
  if (err) throw (err)
  fromArray.obj(fileNames)
    .pipe(log())
    .pipe(genPather)
    .pipe(log())
})

var log = spy.objCtor(function log (obj) {
  console.log(obj)
})

function genPaths (srcDir, destDir, fileName) {
  var src = resolveJoin(srcDir, fileName)
  var dest = resolveJoin(destDir, '.' + fileName)
  var relative = path.relative(path.dirname(dest), src)
  var link = relative.indexOf('../..') === -1 ? relative : src

  return {
    name: fileName,
    src: src,
    dest: dest,
    relative: relative,
    link: link
  }
}

//
// resolveJoin
// join and resolve n segments
function resolveJoin (segment1, segment2 /* etc */) {
  var paths = sliced(arguments)
  return path.resolve(path.join.apply(null, paths))
}

var genPather = map.obj(genPaths.bind(null, src, dest))
