const request = require('request');
const { tokenApi } = require('./utils')

const app_id = 'xTn5shr6qrcqrn9ZuNZH1Gv7GTEVCpkK';

const getToken = () => {
    return new Promise(resolve => {
        const grant_type = 'client_credentials';
        const app_secret = 'c3CaxTtFAXmyUbczjqXAbUiGwRQUjCCF';
        const url = `${tokenApi}/token?grant_type=${grant_type}&app_id=${app_id}&app_secret=${app_secret}`;
        request.get(url, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                resolve(JSON.parse(body));
            };
        })
    })
}

const refreshToken = refresh_token => {
    return new Promise(resolve => {
        const grant_type = 'refresh_token';
        const url = `${tokenApi}/refresh_token?grant_type=${grant_type}&app_id=${app_id}&refresh_token=${refresh_token}`;
        request.get(url, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                resolve(JSON.parse(body));
            };
        })
    })
}

module.exports = {
    getToken,
    refreshToken
}