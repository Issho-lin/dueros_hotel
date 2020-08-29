const request = require('request');
const { getToken } = require('./token')
const { cuid, restfulApi: url } = require('./utils')

const welcome = (access_token, outputSpeechText, cardContent) => new Promise(resolve => {
    // -----------------欢迎语------------------
    const json = {
        method: 'welcome',
        cuid,
        outputSpeechText,
        cardContent,
        backgroundMusic: ' '
    }
    // ----------------多样式推送---------------
    // templateType: AllText | AllImage | TextRight | TextBottom | AudioPlayer | VideoPlayer
    // const json = {
    //     'method': 'multiPush',
    //     'templateType': 'AllImage',
    //     'imageSrc': 'http://dumi-dueros-bj-tob.bj.bcebos.com/1f6b57e0a0ea358ea933a609af8182b2/1920.jpg',
    //     'imageThumb': 'http://dumi-dueros-bj-tob.bj.bcebos.com/1f6b57e0a0ea358ea933a609af8182b2/1920.jpg'
    // }
    // const json = {
    //     method: 'multiPush',
    //     templateType: 'TextBottom',
    //     title: '托尔泰斯格言',
    //     content: '托尔斯泰 - 理想的书籍，是智慧的钥匙',
    //     image: 'http://dumi-dueros-bj-tob.bj.bcebos.com/b85a27d36cb472c045e5342c52dd5f4d/chuangshangyongpin-300-300.jpg'
    // }
    // const json = {
    //     method: 'multiPush',
    //     templateType: 'AudioPlayer',
    //     streamUrl: 'http://duer-music.cdn.bcebos.com/video/upload/1654810166.mp4?authorization=bce-auth-v1/d3af5aaafadb4603b04c30e2acb194a6/2019-08-13T05:18:09Z/86400//42aa1a1900312e8c76fb6af09edabcf679cdf5faa577614529b53b85b797fb2f',
    //     title: '告白气球',
    //     titleSubtext1: '周杰伦',
    //     titleSubtext2: '周杰伦的床边故事',
    //     artSrc: 'http://dumi-dueros-bj-tob.bj.bcebos.com/eaf05703b8cf93cedd949aabbd2be4af/告白气球.jpg'
    // }
    // const json = {
    //     method: 'multiPush',
    //     templateType: 'VideoPlayer',
    //     streamUrl: 'http://vd3.bdstatic.com/mda-jepwkz1c89pv8x0t/sc/mda-jepwkz1c89pv8x0t.mp4'
    // }
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
    console.log(res);
    const { access_token } = res.data;
    const text = '欢迎入住C-Life智慧酒店';
    const data = await welcome(access_token, text, text);
    console.log(JSON.parse(data));
})();