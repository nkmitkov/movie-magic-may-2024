const jwt = require("jsonwebtoken");

function sign(payload, secretOrPrivateKey, options = {}) {
    const promies = new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        })
    });

    return promies;
}

module.exports = {
    sign,
};