const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fab61068a05690ff90d1bd21cfd983d8&query=' + longitude + ',' + latitude + '&units=f';
    console.log(latitude+'  '+longitude);
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out but it feels like ' + body.current.feelslike+'. The humidity is '+body.current.humidity);
        }
    })
}
module.exports = forecast