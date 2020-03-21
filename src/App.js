import React, { useState, useEffect } from 'react';
import ThreeFactorChart from "./components/charts/ThreeFactorChart";
import Histogram from "./components/charts/Hisogram";
import { LOCATION_API } from "./api/Endpoints";

function App() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(LOCATION_API).then(res => res.json().then(res => setCountries(res.locations)));
  }, []);

  return (
    <>
      <ThreeFactorChart countries={countries} />
      <Histogram />
    </>
  )
}

export default App;