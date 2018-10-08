const request = require('request');
const yargs = require('yargs');

const argv = yargs.options({
    a: {
        demand: true,
        alis: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.alias('help', 'h')
.argv;

var encodeduri = encodeURIComponent(argv.a);

request({
    //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=av%2068%20av%20esperanza%20bogota',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeduri}&key=AIzaSyDj_KvaEEL77lR4-1w51iy0zt_idTUkWpY`,
    //url: 'http://www.mapquestapi.com/geocoding/v1/address?key=qPnL7l2jaGwmbSQJ1NleMWNjNKKGzo1b&location=1301%20lombard%20street%20philadelphia',
    json: true // the response would be a json object ready to read
}, (error, response, body) => {
    if (error) console.log(error);
    if (body){
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
});
