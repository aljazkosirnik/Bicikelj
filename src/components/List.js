import React from "react";

function List(data) {
  if (data.loading === true) {
    return (
      <div className="list">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="list">
        {data.data.carto.markers.marker.map(marker => {
          return (
            <div className="list-item" key={marker._attributes.number}>
              <h1>Postaja: {marker._attributes.address}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
