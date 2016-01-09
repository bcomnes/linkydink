var path = require('path')
var through = require('through2')
var fromArray = require('from2-array')
var fs = require('fs')

var src = path.join(os.homedir(), '.dotfiles', 'home')
var dest = os.homedir()

fs.readDir(src, function (err, fileNames) {
  fromArray.obj(fileNames).pipe(through.obj(function (obj, enc, cb) {
    console.log(obj)
    cb()
  }))
})
