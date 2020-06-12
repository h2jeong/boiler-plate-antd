import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Meta from "antd/lib/card/Meta";
import { Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideos").then(res => {
      if (res.data.success) {
        console.log(res.data);
        setVideos(res.data.videos);
      } else {
        alert("비디오 리스트 불러오기를 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Videos.map((video, idx) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />

            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views}</span> -{" "}
        <span>{moment(video.createAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recomanded</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default withRouter(LandingPage);
