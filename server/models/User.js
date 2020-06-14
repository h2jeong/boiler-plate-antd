const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: 1,
    trim: true
  },
  password: { type: String, minlength: 5 },
  name: { type: String, maxlength: 50 },
  role: { type: Number, default: 0 },
  image: { type: String },
  token: { type: String },
  tokenExp: { type: Number }
});

userSchema.pre("save", function(next) {
  // req.body로 받는 데이터를 모델에서 가져오기 위해 this로 선언
  // 유저 정보를 수정할 때가 아니라 비밀번호가 변경될 때만 처리한다.
  // Document.prototype.isModified() - Returns true if this document was modified, else false.
  // SALT를 이용하여 암호화하기 : salt생성 - saltRounds = (글자수)
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
