require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/users')

function verifyToken(req, res, next){
    const token = req.headers.auth;

    if(!token){
        return res.status(401).json({ msg: 'Missing Token '})
    }

    jwt.verify(token, process.env.secretKey, (err, decodeToken) => {
        if(err){
            return res.status(401).json({msg:'Invalid Token'})
        }
    req.userId = decodeToken.id;
    next();
    })
}

const getUsers = async(req, res) => {
    try {
        const response = await userModel.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg:"data not retrieve"})
    }
}

const getUsersById = async(req,res) => {
    try {
        const response = await userModel.findOne({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg:"data not retrieve"})
    }
}

const createUser = async(req, res) => {
    const {username, password, confirmPass} = req.body;

                if(password === confirmPass){
                    bcrypt.hash(password, 10, (err, hashedPassword) => {
                        if(err){
                            res.status(500).json({msg: "Internal Server Error"});
                        }
                         
                        try {
                            userModel.create({username, password: hashedPassword})
                            res.status(201).json({msg:'Data Created'})
                        } catch (error) {
                            res.status(404).json({msg:"data not created"})
                        }
                    })
                }
}

const destroyUser = async(req, res) => {
    try {
        await userModel.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({msg: "Data Success Deleted"})
    } catch (error) {
        res.status(401).json({msg: "Data Can't Delete"})
    }
}
        

    


const loginUser = async(req, res) => {
    const {username, password} = req.body;

    userModel.findOne({where:{username}})
        .then(user => {
            if(!user){
                return res.status(401).json({msg: "Invalid username or password"})
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if(err || !result){
                 return res.status(401).json({msg:"Invalid username or password"})
                }
                
                const token = jwt.sign({id: user.id }, process.env.secretKey, {expiresIn: '1h'});
                res.json({token});
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500),json({msg:"Internal server error"})
        })
      

}

module.exports = { getUsers, getUsersById, createUser, verifyToken, loginUser, destroyUser};