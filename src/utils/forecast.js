const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d2a85c0b672e1c95241ab206f56deaf0/' + latitude + ',' + longtitude;

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('unable to connect with weather service', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {

            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain. use this site to check weather in your area.');
        }
    })

}


module.exports = forecast;