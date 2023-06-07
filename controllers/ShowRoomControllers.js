const ShowRoomModels = require('../models/ShowRoom')
// const { verifyToken } = require('./controllers')

const getData = async(req, res) => {
    try {
        const response = await ShowRoomModels.findAll()
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg:'data not found'})
    }
}

module.exports = getData;