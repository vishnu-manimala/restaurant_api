const bcrypt = require('bcrypt');

const encryptPassword = async(password) => {
    return bcrypt.hash(password);
}

module.exports = {
    encryptPassword,
}