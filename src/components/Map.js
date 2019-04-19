// import React, { useRef } from "react";
// import { useGoogleMap, useMap } from "./Marker";
// const API_KEY = "AIzaSyDjfCiAbexFHp5OujzznVrIYIwyJUPuNBo";

// const mapInfo = {
//   zoom: 13.4,
//   center: { lat: 46.056946, lng: 14.505751 }
// };

// const MapComponent = data => {
//   // Imported from Marker.js
//   const googleMap = useGoogleMap(API_KEY);
//   const mapContainerRef = useRef(null);

//   if (data.loading === true) {
//     console.log(data);
//     useMap({ googleMap, mapContainerRef, mapInfo });
//     return (
//       <div className="map">
//         <h1>Loading...</h1>
//       </div>
//     );
//   } else {
//     useMap({ googleMap, mapContainerRef, mapInfo });
//     return <div className="map" ref={mapContainerRef} />;
//   }
// };

// export default MapComponent;
