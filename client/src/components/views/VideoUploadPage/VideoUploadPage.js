import React from "react";
import { Input, Button, Form, message } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

const privacyOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];
const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vihicles" },
  { value: 2, label: "Educations & Hobbies" }
];

function VideoUploadPage() {
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
  const onDrop = acceptedFiles => {};

  const onSubmit = e => {};

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
            )}
          </Dropzone>
          {/* Thumbnail zone */}

          <div>
            <img src alt="haha" />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescChange} value />
        <br />
        <br />
        <select onChange={onPrivacyChange}>
          <option key value>
            option
          </option>
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          <option key value>
            option
          </option>
        </select>
        <br />
        <br />
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
