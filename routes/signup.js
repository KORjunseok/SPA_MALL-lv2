// routes/signup.js
const express = require("express");
const router = express.Router();

const signup = require("../schemas/signup");

// 회원가입 API  email 제외함 
router.post("/signup", async (req, res) => {
  const { nickname, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(412).json({
      errorMessage: "패스워드가 일치하지 않습니다.",
    });
    return;
  }

  // email 또는 nickname이 동일한 데이터가 있는지 확인하기 위해 가져온다.
  const existssignups = await signup.findOne({
    $or: [{ email }, { nickname }],
  });
  if (existssignups) {
    // NOTE: 보안을 위해 인증 메세지는 자세히 설명하지 않습니다.
    res.status(400).json({
      errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
    });
    return;
  }

  const signup = new signup({ email, nickname, password });
  await signup.save();

  res.status(201).json({});
});


module.exports = router;