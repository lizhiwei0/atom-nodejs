function getIp() {
  const os = require('os')
  const netInfo = os.networkInterfaces()
  let ip = ''
  // console.log(JSON.stringify(netInfo))
  for (var i in netInfo) { 
 //  console.log(i)
   if (i != 'lo') {
    // console.log(JSON.stringify(netInfo[i]))
    ip = netInfo[i][0].address;
    break;  
   } 
}
  return ip;

}

const serviceName = process.argv[3]||'demoService'
const servicePort = process.argv[2]||8888
module.exports = {
 //serviceName : 'demoService',
 //servicePort : 8888,
 getIp : function() {
  const os = require('os')
  const netInfo = os.networkInterfaces()
  let ip = ''
  for (var i in netInfo) {
   if (i != 'lo') {
    ip = netInfo[i][0].address;
    break;
   }
  } 
  return ip;
 },
 getServiceInfo : function() {

   return {
         serviceName: serviceName,
         port: servicePort,
         host: getIp()
     }
  } 

 }

//exports.getIp = getIp
