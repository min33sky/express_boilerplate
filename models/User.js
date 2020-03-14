const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt 자리수

const userSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    maxLength: 50,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// Model의 save 메서드 시작 전에 실행되는 메서드
userSchema.pre('save', function(next) {
  const user = this; // ! arrow function 쓰지 말자.

  // 비밀번호를 저장 혹은 변경할 때 비밀번호를 암호화 시킨다.
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
