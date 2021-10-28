const { createHmac } = require('crypto');

exports.genId = function (str, secret) {
    const unique = createHmac('sha256', secret)
                 .update(str)
                 .digest('hex');
    return unique;
}