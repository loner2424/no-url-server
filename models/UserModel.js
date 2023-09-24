const mongoose = require('mongoose');
const {isEmail} = require('validator')
const validator = require('validator')
const bcrypt = require('bcrypt')


const UserSchema  = new mongoose.Schema({
 username: {
    type: String,
    unique:true,
    required:[true,'Please enter a username']
 },
 email:{
    type: String,
    unique:true,
    required:[true,'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
 },
 password:{
    type:String,
    required: [true,'Please enter a password'],
    minLength: [6,'Your password must be atleast 6 characters long']
 }
}) 

UserSchema.statics.signup = async function(username, email, password) {

    if (!email || !password||!username) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Please use a valid e-mail')
    }
    
  
    const existsEmail = await this.findOne({ email })
    const existsUsername = await this.findOne({ username })
  
    if (existsEmail) {
      throw Error('Email already in use')
    }
    if (existsUsername) {
      throw Error('Username already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ username ,email, password: hash })
  
    return user
  }

  UserSchema.statics.login = async function(email, password) {
  
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('You have not registered with us! Register Now!')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }
  

const User = mongoose.model('User', UserSchema);

module.exports = User;