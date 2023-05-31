const { db, Sequelize } = require('../config/db')

const userModel = db.define('users', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    // confirmPass: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
})

module.exports = userModel;

(async() => {
    await db.sync();
})();