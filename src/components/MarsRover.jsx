import React, { useEffect, useState } from "react";

const MarsRover = () => {
  const apiKey = "WoGj5OiYurzgawyALRCcqVuoU279rbFlQaviHMke";

  const [MarsPhoto, setMarsPhoto] = useState([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`)
      .then((response) => response.json())
      .then((result) => {
        setMarsPhoto(result);
      })
      .catch((err) => console.error(err));
  }, []);
  return <div className="text-center">
    <h2>
        {MarsPhoto.camera}
    </h2>
  </div>;

};

export default MarsRover;
