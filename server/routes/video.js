const express = require("express");
const router = express.Router();

const multer = require("multer");
let ffmpeg = require("fluent-ffmpeg");
const { Video } = require("../models/Video");

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
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  }
});

var upload = multer({ storage: storage }).single("file");

router.post("/uploadFiles", (req, res) => {
  // 파일을 서버에 저장 - multer, ffmpeg 설치
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    console.log(res.req.file);
    return res.json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.file.filename
    });
  });
});

router.post("/thumbnail", (req, res) => {
  console.log("/thumbnail");
  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {
    console.log("metadata", metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성 후 비디오 러닝타임도 가져오기
  ffmpeg(req.body.filePath)
    .on("filenames", function(filenames) {
      console.log("Will generate filenames - ", filenames.join(", "));
      filePath = "uploads/thumbNails/" + filenames[0];
    })
    .on("end", function() {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        filePath: filePath,
        fileDuration: fileDuration
      });
    })
    // .on("error", function(err) {
    //   console.log(err);
    //   return res.json({ success: false, err });
    // })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbNails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png"
    });
});

router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);
  console.log("video:", video);
  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  console.log(req.body);
  let videoId = req.body.videoId;
  Video.findOne({ _id: videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

module.exports = router;
