import React, { useState } from "react";
import axios from "axios";

const Match = () => {
  const [image, setImage] = useState(null);

  const img = null;
  /*
  const setImg = (image) => {
    img = image;
  }
   */

  const data = new FormData();
  data.append("image_template");
  data.append("image_target");

  const options = {
    method: "POST",
    url: "https://merge-portraits.p.rapidapi.com/face/effect/merge",
    headers: {
      "X-RapidAPI-Key": process.env,
      "X-RapidAPI-Host": "merge-portraits.p.rapidapi.com",
      ...data.getHeaders(),
    },
    data: data,
  };

  const onClick = axios
    .request(options)
    .then(function (response) {
      setImage(response.data.result.merge_image);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <>
      <button onClick={() => onClick()}>Merge Images</button>
      {image ? <img src={`data:image/png;base64,${image}`} /> : null}
    </>
  );
};

export default Match;
