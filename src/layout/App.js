import React, { useState, useEffect, useRef } from "react";
import List from "../components/List";
import MapComponent from "../components/Map";
import { useGoogleMap, useMap } from "../components/Marker";
import Header from "./Header";
import Footer from "./Footer";
import "../layout/style.css";
const convert = require("xml-js");

const API_KEY = "AIzaSyDjfCiAbexFHp5OujzznVrIYIwyJUPuNBo";

const mapInfo = {
  zoom: 13.4,
  center: { lat: 46.056946, lng: 14.505751 }
};

const App = () => {
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
          "Can’t access " + url + " response. Blocked by browser? or " + error
        )
      );
    setLoading(false);
  }

  // Call useEffect only once, thats why there is an empty array (no dependencies)
  useEffect(() => {
    fetchData();
  }, []);

  const googleMap = useGoogleMap(API_KEY);
  const mapContainerRef = useRef(null);
  useMap({ googleMap, mapContainerRef, mapInfo, data, loading });

  return (
    <div>
      <Header />
      <div className="body">
        <List data={data} loading={loading} />
        <div className="map" ref={mapContainerRef} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
