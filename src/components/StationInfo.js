import React, { useState, useEffect } from "react";
const convert = require("xml-js");

function StationInfo({ stationNumber }) {
  const proxyurl = "https://whispering-cove-30903.herokuapp.com/";
  const url = `http://www.bicikelj.si/service/stationdetails/ljubljana/${stationNumber}`;
  const data = [];

  fetch(proxyurl + url)
    .then(response => response.text())
    .then(
      contents =>
        (data = JSON.parse(
          convert.xml2json(contents, { compact: true, spaces: 1 })
        ))
    )
    .catch(() =>
      console.log("Can’t access " + url + " response. Blocked by browser?")
    );

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default Station;
