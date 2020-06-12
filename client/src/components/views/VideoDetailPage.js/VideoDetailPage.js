import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, List, Avatar } from "antd";

function VideoDetailPage(props) {
  const variable = { videoId: props.match.params.videoId };
  const [Video, setVideo] = useState({});

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setVideo(res.data.videoDetail);
      } else {
        alert("비디오 상세보기 페이지를 불러 올 수 없습니다.");
      }
    });
  }, []);

  if (Video.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            />
            <List.Item actions>
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              />
            </List.Item>
            {/* comment */}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          side video
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
