import React, { useState } from "react";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

const PostImage = (props) => {
  const [imageState, setImageState] = useState({
    image_url: "",
  });
  console.log(imageState);
  return (
    <>
      <WidgetLoader />
      <Widget
        sources={["local", "camera"]}
        cloudName={"kkhunt"}
        uploadPreset={"nhww67ae"}
        buttonText={"Upload Image"}
        showAdvancedOptions={false}
        style={{
          color: "white",
          border: "none",
          width: "120px",
          backgroundColor: "green",
          borderRadius: "4px",
          height: "25px",
        }}
        onSuccess={props.successHandler}
        onFailure={(res) => console.log(res)}
        logging={true}
        apiKey={"636996674271316"}
        accepts={"application/json"}
        contentType={"application/json"}
        withCredentials={true}
        unique_filename={true}
        resourceType={"image"}
        imageState={imageState}
      />
    </>
  );
};

export default PostImage;
