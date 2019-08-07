let express = require('express')
let app = express()
let ServiceConfig = require('../base/ServiceConfig')

let ServiceDiscoveryClient = require('../base/ServiceDiscoveryClient')

//console.log('--',ServiceConfig.getIp())

//console.log('------', JSON.stringify(ServiceConfig.getServiceInfo()))

ServiceDiscoveryClient.loadServices()



app.get('/:id', (req, res) => {

    console.log(req.params.id)
    //ServiceDiscoveryClient.loadServices()
    let svrs = ServiceDiscoveryClient.getServices(req.params.id)
    console.log(JSON.stringify(svrs))

    res.send(JSON.stringify(svrs))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))