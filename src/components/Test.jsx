import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [image, setImage] = useState(null);

  const data = new FormData();

  const handleImageTemplateChange = (e) => {
    const file = e.target.files[0];
    data.set("image_template", file);
  };

  const handleImageTargetChange = (e) => {
    const file = e.target.files[0];
    data.set("image_target", file);
  };

  console.log(process.env);

  const mergeImages = () => {
    const options = {
      method: "POST",
      url: "https://merge-portraits.p.rapidapi.com/face/effect/merge",
      headers: {
        "X-RapidAPI-Key": "f22512665dmsh71ce0531c33c4bfp12280bjsnd3b69c2743d2",
        "X-RapidAPI-Host": "merge-portraits.p.rapidapi.com",
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        setImage(response.data.result.merge_image);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <input type="file" onChange={handleImageTemplateChange} />
      <input type="file" onChange={handleImageTargetChange} />
      <button onClick={mergeImages}>Merge Images</button>
      {image ? <img src={`data:image/png;base64,${image}`} /> : null}
    </>
  );
};

export default Test;
