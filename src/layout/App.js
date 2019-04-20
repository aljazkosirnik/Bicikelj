import React, { useState, useEffect, useRef } from "react";
import List from "../components/List";
import { useMap } from "../components/Marker";
import { useGoogleMap, mapInfo } from "../components/GoogleMap";
import axios from "axios";
import convert from "xml-js";
import { Grid, Segment } from "semantic-ui-react";

const App = () => {
	const [data, setData] = useState(null);
	const [stations, setStations] = useState([]);
	const [loading, setLoading] = useState(true);

	// links for fetching data
	const proxyurl = "https://whispering-cove-30903.herokuapp.com/";
	const url = "http://www.bicikelj.si/service/carto";
	const stationUrl = "http://www.bicikelj.si/service/stationdetails/ljubljana/";

	// Get station location and name
	async function fetchData() {
		await fetch(proxyurl + url)
			.then(response => response.text())
			.then(contents =>
				setData(
					// Since Bicikelj uses XML, convert it to json
					JSON.parse(convert.xml2json(contents, { compact: true, spaces: 1 }))
				)
			)
			.catch(error =>
				console.log(
					"Can’t access " + url + " response. Blocked by browser? or " + error
				)
			);
	}

	// Get station information about how many bikes and locks are free
	const fetchStationInfo = async () => {
		let i;
		let stationArray = [];
		// make request for all 59 stations
		for (i = 1; i <= 59; i++) {
			const result = await axios(proxyurl + stationUrl + i);
			let finalResult = JSON.parse(
				convert.xml2json(result.data, { compact: true, spaces: 1 })
			);
			stationArray.push(finalResult);
		}
		// Set the stationArray with information to state
		setStations(stationArray);
		// Set the loading state to false, to pass it for loading spinner
		setLoading(false);
	};

	// Call useEffect, only once
	useEffect(() => {
		fetchData();
		fetchStationInfo();
	}, []);

	// Map information
	const googleMap = useGoogleMap("AIzaSyDjfCiAbexFHp5OujzznVrIYIwyJUPuNBo");
	const mapContainerRef = useRef(null);
	// Init map
	useMap({ googleMap, mapContainerRef, mapInfo, data, stations, loading });

	return (
		<Grid columns="equal">
			<Grid.Column>
				<Segment>
					<div className="map" ref={mapContainerRef} />
				</Segment>
			</Grid.Column>
			<Grid.Column>
				<Segment>
					<List data={data} loading={loading} stations={stations} />
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

export default App;
