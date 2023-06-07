const { db, Sequelize } = require('../config/db');

const ShowRoomModels = db.define('tbl_car', {
    car:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image:{
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = ShowRoomModels;

(async() => {
    await db.sync()
    const cars = [
        { car: 'Mitsubishi Xpander Cross', price: 'Rp 316.750.000', image:'https://assets.mitsubishi-motors.co.id/products/colors/1660197956-1660134172-cross-2022-quartz-white-pearl-at-2xjpgjpg.jpg' },
        { car: 'Mitsubishi Pajero Sport', price: 'Rp 552.000.000', image:'https://assets.mitsubishi-motors.co.id/products/colors/1627575723-pajero-4x4-greypng.png' },
        // Add more sample data as needed
      ];
      
      for (const Car of cars){
        await ShowRoomModels.findOrCreate({
            where: { car: Car.car},
            defaults: Car
        })
      }
      
})();