import { useEffect } from "react";

const useMap = ({
	// All this data is from App.js
	googleMap,
	mapContainerRef,
	mapInfo,
	data,
	stations,
	loading
}) => {
	function wait() {
		if (!googleMap || !mapContainerRef.current) {
			return;
		}

		// Init map & markers
		const map = new googleMap.maps.Map(mapContainerRef.current, mapInfo);
		const markers = [];
		const infoWindows = [];

		data.carto.markers.marker.map(marker => {
			// For each station push markers position to markers array
			markers.push(
				new googleMap.maps.Marker({
					position: {
						lat: parseFloat(marker._attributes.lat),
						lng: parseFloat(marker._attributes.lng)
					},
					map: map
				})
			);

			// For each station push info window with address, free bikes & free space
			infoWindows.push(
				new googleMap.maps.InfoWindow({
					content: `<div className="infoWindow">
                      <h5>${marker._attributes.fullAddress}</h5>
                      <h5>Število kole: ${
												stations[marker._attributes.number - 1].station
													.available._text
											}</h5>
                      <h5>Število prostih mest: ${
												stations[marker._attributes.number - 1].station.free
													._text
											}</h5>
                    </div>`
				})
			);
		});

		// Loop trough markers array, if mouseover, display info window on that marker
		for (let i = 0; i < markers.length; i++) {
			markers[i].addListener("mouseover", () => {
				infoWindows[i].open(map, markers[i]);
			});
			// If mouseout, close the info window
			markers[i].addListener("mouseout", () => {
				infoWindows[i].close(map, markers[i]);
			});
		}

		// Return map to App.js
		return map;
	}

	// Run wait() when loading changes value - loading will be set to false when App.js gets all the data
	useEffect(() => {
		wait();
	}, [loading]);
};

export { useMap };
