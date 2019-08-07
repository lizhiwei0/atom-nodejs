const zookeeper = require('node-zookeeper-client')
const ServiceConfig = require('./ServiceConfig')
const serviceInfo = ServiceConfig.getServiceInfo()


function createServiceNode(client, path) {

   client.create(path, function(error) {
     if(error) {
        console.log('failed to create path %s due to %s', path, error)
     } else {
        console.log('service Node %s is created', path)
     }

   })
  
}

function createServiceInstanceNode(client, path, serviceInfo) {
   let ephemeralNode = path+'/instance'
   console.log('creating instance node '+ ephemeralNode)
   client.create(ephemeralNode,
             Buffer.from(JSON.stringify(serviceInfo)),
             zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
             function (error, ppath) {
                 if (error) {
                   console.log(error.stack)
                 }
                console.log('instance Node: %s is created', ppath)
             })

}

module.exports = {

registerService : function() {
  let client = zookeeper.createClient('localhost:2181')

  let path = '/atom' + '/' +  serviceInfo.serviceName

  client.once('connected', function() {
     console.log('Connected to the server')
     console.log('checking if '+path+" exists")
     client.exists(path, function(error, stat) {
       // console.log(error,'*** service node stat:',stat)
        if (stat == null) { // this means service node not exists
             createServiceNode(client, path)
        
        }
        createServiceInstanceNode(client, path, serviceInfo)
     })
     /*
     client.create(path, function(error){
       if (error) {
          console.log('Failed to create path %s due to %s ', path , error)
       } else {
          console.log('Node: %s is successfully created', path)
       }
       client.close()

     })*/
   })

   client.connect()
 }

}
