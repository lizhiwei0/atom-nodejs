const zookeeper = require('node-zookeeper-client')

let client = zookeeper.createClient('localhost:2181')

let path = '/iris_services'

client.once('connected', function() {
   console.log('Connected to the server')
   client.create(path, function(error){
     if (error) {
       console.log('Failed to create path %s due to %s ', path , error)
     } else {
        console.log('Node: %s is successfully created', path)
     }
     client.close()

  })
})


client.connect()
