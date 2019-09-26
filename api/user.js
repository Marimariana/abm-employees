'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: Number,
    email: String,
    gender: {type: String, enum:['Female', 'Male', 'Others']}

})

/*userSchema.pre('save', function(next){
    let user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) =>{
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})*/

/*userSchema.methods.gravatar = function () {
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}*/

 module.exports = mongoose.model('User', userSchema)