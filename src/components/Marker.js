import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GoogleMapsApiLoader from "google-maps-api-loader";
const convert = require("xml-js");

// Exported to Map.js
const useGoogleMap = apiKey => {
  const [googleMap, setGoogleMap] = useState(null);
  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then(google => {
      setGoogleMap(google);
    });
  }, []);
  return googleMap;
};

const useMap = ({ googleMap, mapContainerRef, mapInfo }) => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (!googleMap || !mapContainerRef.current) {
      return;
    }
    // Map init
    const map = new googleMap.maps.Map(mapContainerRef.current, mapInfo);

    // marker
    const marker = new googleMap.maps.Marker({
      position: mapInfo.center,
      map: map
    });
    const InfoWindow = new googleMap.maps.InfoWindow({
      content: `<div id="content">
                    <button id="onBtn" class="btn btn-sm">
                      按鈕
                    </button>
                  </div>`
    });
    marker.addListener("click", () => {
      InfoWindow.open(map, marker);
    });
    setMap(map);
  }, [googleMap, mapContainerRef]);
  return map;
};

export { useGoogleMap, useMap };
