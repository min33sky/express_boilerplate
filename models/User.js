const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt 자리수
const jwt = require('jsonwebtoken');

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

/**
 * Custom Document Instance Method
 * - 여기서 정의한 메서드는 모델의 인스턴스(다큐먼트)에서 호출할 수 있다
 * ! Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this,
 * ! so your method will not have access to the document and the above examples will not work.
 */

// Model의 save 메서드 시작 전에 실행되는 메서드
userSchema.pre('save', function(next) {
  const user = this; // ! Arrow Function 쓰지 말자.

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
  } else {
    next();
  }
});

// 로그인 시 비밀번호를 검사하는 메서드
userSchema.methods.comparePassword = function(planePassword, cb) {
  bcrypt.compare(planePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 로그인 시 인증 토큰을 발급하는 메서드
userSchema.methods.generateToken = function(cb) {
  // jsonwebtoken을 이용해서 token 생성
  const user = this;
  // ! _id 타입은 object이므로 toHexString() 메서드로 타입 변경
  // https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// 토큰 복호화 메서드
userSchema.statics.findByToken = function(token, cb) {
  const user = this;

  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해서 유저를 찾고
    // 클라이언트에서 가져온 토큰과 DB의 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
