import React from "react";

const List = data => {
	// If App.js is still fetching data, display loader
	if (data.loading === true) {
		return (
			<div className="list">
				<h1>Loading...</h1>
			</div>
		);
	} else {
		return (
			<div className="list">
				{/* For each station display table row */}
				{data.data.carto.markers.marker.map(marker => {
					return (
						<div className="list-item" key={marker._attributes.number}>
							<h1>Postaja: {marker._attributes.address}</h1>
							<h3>
								Število koles:{" "}
								{
									data.stations[marker._attributes.number - 1].station.available
										._text
								}
							</h3>
							<h3>
								Število prostih mest:{" "}
								{
									data.stations[marker._attributes.number - 1].station.free
										._text
								}
							</h3>
						</div>
					);
				})}
			</div>
		);
	}
};

export default List;
