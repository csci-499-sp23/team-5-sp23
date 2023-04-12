import axios from "axios";

const options = {
  method: "GET",
  url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`,
};

export const getMap = async () => {
  try {
    const data = await fetch(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`
    );
    const res = data.json();
    console.log(res, "asdasdasdasdasdasa");
    console.log(data);
  } catch (error) {}
};

//Google Places Detail API
// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -33.866, lng: 151.196 },
//     zoom: 15,
//   });
//   const request = {
//     placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
//     fields: ["name", "formatted_address", "place_id", "geometry"],
//   };
//   const infowindow = new google.maps.InfoWindow();
//   const service = new google.maps.places.PlacesService(map);

//   service.getDetails(request, (place, status) => {
//     if (
//       status === google.maps.places.PlacesServiceStatus.OK &&
//       place &&
//       place.geometry &&
//       place.geometry.location
//     ) {
//       const marker = new google.maps.Marker({
//         map,
//         position: place.geometry.location,
//       });

//       google.maps.event.addListener(marker, "click", () => {
//         const content = document.createElement("div");
//         const nameElement = document.createElement("h2");

//         nameElement.textContent = place.name;
//         content.appendChild(nameElement);

//         const placeIdElement = document.createElement("p");

//         placeIdElement.textContent = place.place_id;
//         content.appendChild(placeIdElement);

//         const placeAddressElement = document.createElement("p");

//         placeAddressElement.textContent = place.formatted_address;
//         content.appendChild(placeAddressElement);
//         infowindow.setContent(content);
//         infowindow.open(map, marker);
//       });
//     }
//   });
// }

// window.initMap = initMap;
