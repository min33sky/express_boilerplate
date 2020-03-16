const { User } = require('../models/User');

// 인증 미들웨어
const auth = (req, res, next) => {
  const token = req.cookies.x_auth;

  // 토큰 복호화 메서드 호출
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    // 토큰과 유저정보를 req 객체에 저장한다.
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
