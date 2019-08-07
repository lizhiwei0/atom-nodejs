var SenecaWeb = require('seneca-web')
var Express = require('express')
var Router = Express.Router
var context = new Router()

var senecaWebConfig = {

   context: context,
   adapter: require('seneca-web-adapter-express'),
   options: { parseBody: false}

}

console.log(JSON.stringify(process.argv))
console.log(JSON.stringify(process.env))

var serviceInfo = require('./base/ServiceConfig').getServiceInfo()
var serviceRegister = require('./base/ServiceRegisterClient')
serviceRegister.registerService()
var app =  Express()
    .use(require('body-parser').json())
    .use(context)
    .listen(serviceInfo.port)


var seneca = require('seneca')()
    .use(SenecaWeb, senecaWebConfig)
    .use('api')
    .client({ type: 'tcp', pin: 'role:math'})
    
