const bcrypt = require('bcrypt');

const encryptPassword = async(password) => {
    return bcrypt.hash(password, 10);
}

const matchPassword = async( password, userPassword) => {
    return await bcrypt.compare( password, userPassword );
}

module.exports = {
    encryptPassword,
    matchPassword,
}