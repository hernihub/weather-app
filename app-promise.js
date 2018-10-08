const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
    })
    .help()
    .alias('help', 'h')
    .argv;


var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDj_KvaEEL77lR4-1w51iy0zt_idTUkWpY`

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.forecast.io/forecast/a029b6224077b1f240f212561cb1ee50/${lat},${lng}`;
    console.log(weatherUrl);
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature
    console.log(`It's currently ${temperature}; it feels like ${apparentTemperature}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND')
    console.log('Unable to connect to API servers');
    else
    console.log(e.message);
});
