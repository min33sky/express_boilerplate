const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');
const config = require('./config/key');

require('dotenv').config();

const PORT = process.env.PORT;

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected....😂😂😂'))
  .catch(err => console.error(err));

// ***** Middleware ******************************************

// application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// application/json
app.use(bodyparser.json());
app.use(cookieParser());

// ***** Router **********************************************

app.get('/', (req, res) => res.send('Hello World!~~ 안녕하세요'));

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // 이메일이 존재하는 지 확인
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: '해당 이메일에 해당하는 유저가 없습니다.',
        });
      }

      // 암호화된 비밀번호와 일치하는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: '비밀번호가 틀렸습니다.',
          });
        }
        // jwt 토큰 발급
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          // 토큰을 쿠키에 저장한다.
          res
            .cookie('x_auth', user.token)
            .status(200)
            .json({
              loginSuccess: true,
              userId: user._id,
            });
        });
      });
    },
  );
});

// 인증 확인
app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
  // DB의 토큰을 삭제해서 인증에 실패하도록 만든다.
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      token: '',
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    },
  );
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
