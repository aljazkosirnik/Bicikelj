import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { useGoogleMap, useMap } from "./Marker";
const API_KEY = "AIzaSyDjfCiAbexFHp5OujzznVrIYIwyJUPuNBo";

const mapInfo = {
  zoom: 13.4,
  center: { lat: 46.056946, lng: 14.505751 }
};

const MapComponent = () => {
  // Imported from Marker.js
  const googleMap = useGoogleMap(API_KEY);

  const mapContainerRef = useRef(null);
  useMap({ googleMap, mapContainerRef, mapInfo });
  return (
    <div
      style={{
        height: "100vh",
        width: "60%"
      }}
      ref={mapContainerRef}
    />
  );
};

export default MapComponent;
