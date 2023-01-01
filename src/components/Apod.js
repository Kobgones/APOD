import React, { useEffect, useState } from "react";

const Apod = () => {
  const apiKey = "WoGj5OiYurzgawyALRCcqVuoU279rbFlQaviHMke";

  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((result) => {
        setPhoto(result);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-center text-4xl text-white font-automn pt-4">
          {photo.title}
        </h1>
        <img className="w-3/4 h-3/4" src={photo.hdurl} alt={photo.title} />
        <p className="text-center text-white font-automn">
          {photo.explanation}
        </p>
      </div>
    </div>
  );
};

export default Apod;
