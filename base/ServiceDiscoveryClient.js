const zookeeper = require('node-zookeeper-client')
const ServiceConfig = require('./ServiceConfig')


let client = zookeeper.createClient('localhost:2181')

//let path = '/atom' 

let serviceCache = {}

client.connect()


function getServices() {

    client.getChildren('/atom',(event)=>{
        console.log('service node event: ' +JSON.stringify(event))
        getServices();
    },(error, children, stats) => {
        if (error) {
            console.log(error.stack)
            return;
        }
        console.log(JSON.stringify(children))
        for(var i =0; i < children.length;i++) {
            console.log("children--"+ children[i])
            inspectServiceNodes(children[i])
        }
    })

}

function inspectServiceNodes(serviceName) {
    client.getChildren('/atom/'+serviceName, (event)=> {
        console.log('service instance node event:' + JSON.stringify(event));
        
        inspectServiceNodes(serviceName)
        
    },function(error, children, stats) {

        let serverNodeList = [];
        for (var i = 0; i < children.length;i++) {
            client.getData('/atom/'+serviceName+'/'+children[i], function(error, data, stat ) {
                if (error) {
                    console.log(error.stack)
                    return
                } 
                serverNodeList.push(JSON.parse(data))
            });
        }

        serviceCache[serviceName] = serverNodeList

    })
}

module.exports = {

    getServices : function(serviceName) {
        return serviceCache[serviceName];
    },

    loadServices : function() {

        //client.connect()

        console.log('start loading services ')

        getServices()
        

    }

}
