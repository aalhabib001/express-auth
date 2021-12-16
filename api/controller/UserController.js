const UserModel = require('../model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    UserModel.findOne({email})
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {

                    if (err) {
                        res.status(500).json({
                            message: 'Error Occurred'
                        });
                    }

                    if (result) {
                        let token = jwt.sign({email: user.email, name: user.name}, 'SECRET', {expiresIn: '240h'})
                        res.status(200).json({
                            message: 'Login Successful',
                            data: {
                                tokenType: 'Bearer',
                                token
                            }
                        });
                    } else {
                        res.status(401).json({
                            message: 'Password Does not match'
                        });
                    }
                })

            } else {
                res.status(404).json({
                    message: 'User Not found'
                });
            }
        })
        .catch(err => {
            res.json({
                message: err
            });
        })
}

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(400).json({
                error: err
            })
        }

        let user = new UserModel({
            email: req.body.email,
            name: req.body.name,
            password: hash
        })

        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Registered',
                })
            })
            .catch(error => {
                res.status(400).json({
                    error
                })
            })
    })

}

const getUser = (req, res) => {
    let jwtToken = req.headers.authorization.split(' ')[1]

    let tokenData = jwt.verify(jwtToken, 'SECRET');
    console.log(new Date().toISOString().slice(0, 10))

    UserModel.findOne({email: "aalhabib001@gmail.com"})
        .then(user => {
            if (user) {

                let userDetails = {
                    email: user.email,
                    name: user.name
                };

                res.json({
                    user: userDetails
                })

            } else {
                res.status(200).json({
                    message: 'User Not found'
                });
            }
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: err
            });
        })

}

module.exports = {
    loginController,
    registerController,
    getUser
}
