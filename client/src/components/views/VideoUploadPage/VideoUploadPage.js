import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useSelector } from "react-redux";

const privacyOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];
const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vihicles" },
  { value: 2, label: "Education & Hobby" }
];

function VideoUploadPage(props) {
  const user = useSelector(state => state.user);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState("Private");
  const [Category, setCategory] = useState(0);
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescChange = e => {
    setDescription(e.currentTarget.value);
  };
  const onPrivacyChange = e => {
    setPrivacy(e.currentTarget.value);
  };
  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };
  const onDrop = acceptedFiles => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", acceptedFiles[0]);

    Axios.post("/api/video/uploadFiles", formData, config).then(res => {
      if (res.data.success) {
        let variable = {
          filePath: res.data.filePath,
          filename: res.data.filename
        };
        setFilePath(res.data.filePath);

        Axios.post("/api/video/thumbnail", variable).then(res => {
          if (res.data.success) {
            console.log(res.data);
            setThumbnailPath(res.data.filePath);
            setDuration(res.data.fileDuration);
          } else {
            alert("Fail to create Thumbmail");
          }
        });
      } else {
        alert("Failed to upload video");
      }
    });
  };
  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      privacy: Privacy,
      category: Category,
      filePath: FilePath,
      duration: Duration,
      thumbnail: ThumbnailPath
    };

    Axios.post("/api/video/uploadVideo", variables).then(res => {
      if (res.data.success) {
        console.log(res.data);
        message.success("Successed to upload video");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("Failed to upload video");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <input {...getInputProps()} />
                  <PlusOutlined style={{ fontSize: "3rem" }} />
                </div>
              </section>
            )}
          </Dropzone>
          {/* Thumbnail zone */}
          {ThumbnailPath !== "" && (
            <div>
              <img src={`http://localhost:5000/${ThumbnailPath}`} alt="haha" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivacyChange}>
          {privacyOptions &&
            privacyOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categoryOptions.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
