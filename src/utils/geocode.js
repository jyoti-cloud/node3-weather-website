const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoianlvdGkxNCIsImEiOiJjazM1bjJnOTUwa2duM25yemlxM3B1YXd1In0.CHpF0iwgjdfg_ZkiQjw1Ug&limit=1';

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('unable to find location. Try another search', undefined);
        }else{
            
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longtitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;