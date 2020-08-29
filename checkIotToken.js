const request = require('request')
const { getToken } = require('./token')
const { cuid, botId, restfulApi: url } = require('./utils')

const checkIotToken = access_token => new Promise(resolve => {
    const json = {
        method: 'checkIotToken',
        botId,
        iotAccessToken: '121.ad98f30dcaf5d5c3ed7f67d33e11dc6c.YDswbJcsDydtk6TptD24nCSvHL4Zq3ncKX8SJz5.u8S8xw'
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
    const res = await getToken();
    const { access_token } = res.data;
    const data = await checkIotToken(access_token);
    console.log(JSON.parse(data));
})();