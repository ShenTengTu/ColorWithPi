/*reference https://github.com/QingWei-Li/docsify-cli/blob/master/lib/commands/serve.js*/
'use strict'

const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const lrserver = require('livereload')
const open = require('open')
const chalk = require('chalk')
var fs = require('fs');

var exists = function (path) {
  if (fs.existsSync(path)) {
    return path
  }
  return undefined
}

var resolve = require('path').resolve;

 function serve(path, openInBrowser, port, livereloadPort) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exists(indexFile)) {
    const msg = '\nNo docs found, please run ' + chalk.green('docsify init') + ' first.\n'
    console.log(msg)
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(port)
  lrserver.createServer({
    exts: ['md'],
    exclusions: ['node_modules/'],
    port: livereloadPort
  }).watch(path)

  if (openInBrowser) {
    open(`http://localhost:${port}`)
  }

  const msg = '\nServing ' + chalk.green(`${path}`) + ' now.\n' +
              'Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'
  console.log(msg)
}

serve("./docs",true,3000,35729);
