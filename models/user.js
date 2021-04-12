const mongoose = require('mongoose');
const crypto = require ('crypto');
const {v1:uuid} = require('uuid');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    hash_password:{
        type: String,
        required: true,
    },
    salt:{
        type: String

    },
    adresse:{
        type: String,
        trim:true

    },
    role:{
        type: Number,
        default: 0
    },


},{timestamps: true})

userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuid();
    this.hash_password = this.cryptPassword (password)
})
.get(function (){
    return this._password;
})

userSchema.methods = {
    authenticate: function(plainText){

      return this.cryptPassword(plainText) === this.hash_password;

    },
    cryptPassword: function (password){
        if(!password) return ''

        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');

        }
        catch (error){
            return ''

        }
    }
}

module.exports = mongoose.model('User', userSchema)