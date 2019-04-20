import React from "react";
import { Table } from "semantic-ui-react";

const List = data => {
	// If App.js is still fetching data, wait
	if (data.loading == false) {
		return (
			<Table celled inverted selectable className="list">
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Postaja</Table.HeaderCell>
						<Table.HeaderCell>Število koles</Table.HeaderCell>
						<Table.HeaderCell>Število prostih mest</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{/* For each station display table row */}
					{data.data.carto.markers.marker.map(marker => {
						return (
							<Table.Row key={marker._attributes.number}>
								<Table.Cell>{marker._attributes.address}</Table.Cell>
								<Table.Cell>
									{
										data.stations[marker._attributes.number - 1].station
											.available._text
									}
								</Table.Cell>
								<Table.Cell>
									{
										data.stations[marker._attributes.number - 1].station.free
											._text
									}
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		);
	}
};

export default List;
