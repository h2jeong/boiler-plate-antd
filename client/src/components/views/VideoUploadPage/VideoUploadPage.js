import React, { useState } from "react";
import Title from "antd/lib/typography/Title";
import { Input, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

const privateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];
const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vihicles" },
  { value: 2, label: "Education & Hobby" }
];

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Private, setPrivate] = useState("Private");
  const [Category, setCategory] = useState(0);
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = e => {
    console.log(e.currentTarget);
    setVideoTitle(e.currentTarget.value);
  };
  const onDescChange = e => {
    console.log(e.currentTarget);
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = e => {
    console.log(e.currentTarget);
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = e => {
    console.log(e.currentTarget);
    setCategory(e.currentTarget.value);
  };
  const onDrop = acceptedFiles => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-datas" }
    };
    formData.append("file", acceptedFiles[0]);

    Axios.post("/api/video/uploadFiles", formData, config).then(res => {
      if (res.data.success) {
        let variable = {
          url: res.data.url,
          path: res.data.filename
        };
        Axios.post("/api/video/thumbnail", variable).then(res => {
          if (res.data.success) {
            console.log(res.data);
            setThumbnailPath(res.data.url);
          } else {
            alert("Fail to create Thumbmail");
          }
        });
      } else {
        alert("Failed to upload video");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title Level={2}>Upload Video</Title>
      </div>
      <form onSubmit>
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
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
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
        <select onChange={onPrivateChange} selected={Private}>
          {privateOptions &&
            privateOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange} selected={Category}>
          {categoryOptions.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default VideoUploadPage;
