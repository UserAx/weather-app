const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmlzaGtuaWdodCIsImEiOiJjazRlNDV1MmQwOXV3M3FxZGhubnRxcnV4In0.BLLTa4w3-cso6fUYUZf9oA";
    request({url: url, json:true}, (error, response) => {

        if(error){
            callback("Unable to connect.", undefined);
        }else if(!response.body.features[0]){
            callback("Unable to find location.", undefined);
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })

}

const forecast = (logitude, latitude, callback) =>{
    const url = "https://api.darksky.net/forecast/87be68521181f367543df3478e58193b/" + 
                    logitude+","+ latitude+"?units=si";
    request({url: url, json:true}, (error, response) =>{
        if(error){
            callback("Unable to connect.", undefined);
        }else if(response.body.error){
            callback("Unable to find location.", undefined);
        }else{
        const current = response.body.currently;
        callback(undefined, {Temperature: current.temperature,
                             Percipitation: current.precipProbability});}
    });
}

module.exports = {geocode: geocode, 
                  forecast: forecast};