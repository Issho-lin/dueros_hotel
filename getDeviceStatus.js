const request = require('request');
const { getToken } = require('./token')
const { cuid, restfulApi: url } = require('./utils')

const getDeviceStatus = access_token => new Promise(resolve => {
    const json = {
        method: 'getDeviceStatus',
        cuid
    };
    const form = {
        timestamp: new Date().getTime(),
        v: '2.0',
        cuid,
        source: 'baidu',
        paramJson: JSON.stringify(json)
    };
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${access_token}`,
    };
    request.post({ url, form, headers }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);
        };
    }); 
});

(async () => {
    const res = await getToken()
    const { access_token } = res.data;
    const data = await getDeviceStatus(access_token);
    console.log(JSON.parse(data));
})();