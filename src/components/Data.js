import React, { useState, useEffect } from "react";
const convert = require("xml-js");

const data = () => {
  // const [json, setJson] = useState([]);
  const data = [];

  const proxyurl = "https://whispering-cove-30903.herokuapp.com/";
  const url = "http://www.bicikelj.si/service/carto";

  fetch(proxyurl + url)
    .then(response => response.text())
    .then(
      contents =>
        (data = JSON.parse(
          convert.xml2json(contents, { compact: true, spaces: 1 })
        ))
    )
    .catch(error =>
      console.log(
        "Can’t access " + url + " response. Blocked by browser? " + error
      )
    );

  console.log(data);
  return data;
};

export default data;
