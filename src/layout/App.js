import React, { useState, useEffect } from "react";
import List from "../components/List";
import MapComponent from "../components/Map";
import Header from "./Header";
import Footer from "./Footer";
import "../layout/style.css";
const convert = require("xml-js");

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const proxyurl = "https://whispering-cove-30903.herokuapp.com/";
  const url = "http://www.bicikelj.si/service/carto";

  // Wait for the data, then change loading to false for components to start displaying data
  async function fetchData() {
    await fetch(proxyurl + url)
      .then(response => response.text())
      .then(contents =>
        setData(
          JSON.parse(convert.xml2json(contents, { compact: true, spaces: 1 }))
        )
      )
      .catch(error =>
        console.log(
          "Can’t access " + url + " response. Blocked by browser? " + error
        )
      );
    setLoading(false);
  }

  // Call useEffect only once, thats why there is an empty array on line 36 (no dependencies)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="body">
        <List data={data} loading={loading} />
        <MapComponent />
      </div>
      <Footer />
    </div>
  );
}

export default App;
