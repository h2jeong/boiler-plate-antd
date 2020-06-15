const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.post("/register", (req, res) => {
  // User 인스턴스 생성 전에 비밀번호 암호화 하기
  const user = new User(req.body);
  console.log(req.body, user);

  user.save((err, doc) => {
    if (err) return res.status(400).json({ registerSuccess: false, err });
    return res.status(200).json({ registerSuccess: true });
  });
});

router.post("/login", (req, res) => {
  // 아이디가 존재하는지, 비밀번호가 맞는지, 토큰을 생성하여 응답해준다.
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ loginSuccess: false, err });
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "User by this email does not exist"
      });

    console.log("user:", user);
    // 비밀번호 비교, but hash와 비교 불가
    // if(user.password === req.body.password)

    // plainPassword 1234567 암호화된 비밀번호 $2b$10$X/DS6vCsugMFQhQ1x/RvcOXwnpm5KIhRPo19LEnYhiGSFK1mSOjlu
    // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // // result == true or false
    // });
    // => user model에서 메소드 생성하여 처리
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.json({ loginSuccess: false, err });
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      // 토큰생성
      // jsonwebtoken을 이용하여 token 생성하기, 데이터베이스의 _id로 생성
      // 스키마에 넣어주기 => user model에서 메소드 생성하여 처리
      user.generateToken((err, user) => {
        if (err) return res.status(400).json({ loginSuccess: false, err });
        // 토큰과 유효기간을 저장한다. 어디에? 스토리지 : 쿠키, 로컬스토리지
        // res.cookie('name', token)

        res
          .cookie("w_auth", user.token, { maxAge: 60 * 60 * 60 })
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.post("/logout", (req, res) => {
  // 로그인 유저 정보 확인 - _id, token 정보를 체크해야 로그아웃 가능
  // => middleware : auth
  // 로그인한 유저의 데이터베이스의 토큰을 지워준다.
  // 토큰을 decode한다.
  // 유저 아이디를 이용해서 유저(decoded)를 찾은 다음에
  // 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
});
module.exports = router;
