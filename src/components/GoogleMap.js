import { useState, useEffect } from "react";
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

const mapInfo = {
	zoom: 14,
	center: { lat: 46.056946, lng: 14.505751 }
};

export { useGoogleMap, mapInfo };
