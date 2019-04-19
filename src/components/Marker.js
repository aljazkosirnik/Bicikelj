import React, { useState, useEffect } from "react";
import GoogleMapsApiLoader from "google-maps-api-loader";

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

const useMap = ({ googleMap, mapContainerRef, mapInfo, data, loading }) => {
  const [map, setMap] = useState(null);
  const [infoToggle, setInfoToggle] = useState(false);

  // wait for data
  function wait() {
    if (!googleMap || !mapContainerRef.current) {
      return;
    }
    // Init map
    const map = new googleMap.maps.Map(mapContainerRef.current, mapInfo);

    // markers
    const markers = [];
    const infoWindows = [];
    data.carto.markers.marker.map(marker => {
      markers.push(
        new googleMap.maps.Marker({
          position: {
            lat: parseFloat(marker._attributes.lat),
            lng: parseFloat(marker._attributes.lng)
          },
          map: map
        })
      );
      infoWindows.push(
        new googleMap.maps.InfoWindow({
          content: `<div className="infoWindow">
                      <h5>${marker._attributes.address}</h5>
                    </div>`
        })
      );
    });

    // loop trough markers array, if mouseover display info windows on that marker
    for (let i = 0; i < markers.length; i++) {
      markers[i].addListener("mouseover", () => {
        infoWindows[i].open(map, markers[i]);
      });
      markers[i].addListener("mouseout", () => {
        infoWindows[i].close(map, markers[i]);
      });
    }

    setMap(map);

    return map;
  }

  // this will run wait() when loading changes value, and it will change to false which means data was sent
  useEffect(() => {
    wait();
  }, [loading]);
};

export { useGoogleMap, useMap };
