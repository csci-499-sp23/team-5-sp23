import axios from "axios";

const options = {
  method: "GET",
  url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`,
};

export const getMap = async () => {
  try {
    const data = await fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCWVAQh0hgp61dBjz63ehaEEsZD9mUyFSY&libraries=places&callback=initMap`);
    const res = data.json();
    console.log(res, "asdasdasdasdasdasa");
    console.log(data);
  } catch (error) {
  }
};

