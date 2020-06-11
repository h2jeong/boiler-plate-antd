const express = require("express");
const router = express.Router();

const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  }
});
const upload = multer({ storage }).single("file");

router.post("/uploadFiles", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  // 파일을 서버에 저장 - multer, ffmpeg 설치
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    return res.json({
      success: true,
      url: res.req.file.path,
      filename: res.req.file.filename
    });
  });
});

router.post("/thumbnail", (req, res) => {
  console.log("/thumbnail");
  let filePath = "";
  let fileDuration = "";
  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, (err, metadata) => {
    console.log("metadata", metadata.format.duration);
    fileDuration = metadata.format.duration;
  });
  // 썸네일 생성 후 비디오 러닝타임도 가져오기
  ffmpeg(req.body.url)
    .on("filenames", filenames => {
      console.log("filenames", filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", () => {
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration
      });
    })
    .on("error", err => {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshot({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png"
    });
});

module.exports = router;
