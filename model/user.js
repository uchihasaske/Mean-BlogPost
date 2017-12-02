var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
  if(!email){
    return false;
  } else {
    if(email.length <5 || email.length >30) {
      return false;
    } else {
      return true;
    }
  }
};

let validEmailChecker = (email) => {
  if (!email) {
    return false;
  } else {
    const regExp = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email);
  }
};
const emailValidators = [
  {
    validator: emailLengthChecker, message: 'Email must be at least 5 character'
  },
  {
    validator :validEmailChecker, message: 'Must be a valid Email'
  }
]
let usernameLengthChecker = (username) => {
  if(!username){
    return false;
  } else {
    if(username.length <3 || username.length >10) {
      return false;
    } else {
      return true;
    }
  }
};
let validUsername = (username) => {
  if (!username) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
};
const usernameValidators = [
  {
    validator: usernameLengthChecker, message: 'Username must be at least 3 character'
  },
  {
    validator :validUsername, message: 'Must be a valid Username'
  }
];
let passwordLengthChecker = (password) => {
  if(!password){
    return false;
  } else {
    if(password.length <6 || password.length >10) {
      return false;
    } else {
      return true;
    }
  }
};
let validPassword = (password) => {
  if (!password) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9!@#$%^&*]{6,10}$/);
    return regExp.test(password);
  }
};
const passwordValidators = [
  {
    validator: passwordLengthChecker, message: 'Password must be at least 6 character should contain atleast one number and one special character'
  },
  {
    validator :validPassword, message: 'Must be a valid password'
  }
]
var userSchema = new Schema({
  email:{ type: String, required: true, unique: true, lowercase: true,validate: emailValidators},
  username:{ type: String, required: true, unique: true, lowercase: true,validate : usernameValidators},
  password:{ type: String, required: true,validate: passwordValidators}
});

userSchema.pre('save',function (next) {
  if (!this.isModified('password'))
  return next();
  bcrypt.hash(this.password,null,null,(err,hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});
userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User',userSchema);
