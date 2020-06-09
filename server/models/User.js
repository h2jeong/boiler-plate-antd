const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLengh: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5
  },
  lastname: {
    type: String,
    maxLengh: 50
  },
  role: { type: Number, default: 0 },
  image: String,
  token: { type: String },
  tokenExp: { type: Number }
});

userSchema.pre("save", function(next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  let user = this;

  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  let user = this;

  let token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save((err, user) => {
    if (err) return cd(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  let user = this;

  jwt.verify(token, "secretToken", (err, decoded) => {
    user.findOne({ _id: decoded, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
