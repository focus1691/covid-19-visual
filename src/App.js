import React, { useState, useEffect } from 'react';
import ThreeFactorChart from "./components/charts/ThreeFactorChart";
import Histogram from "./components/charts/Histogram";
import { LOCATION_API } from "./api/Endpoints";
import _ from "lodash";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(LOCATION_API).then(res => res.json().then(res => {
      const sortedLocations = _.sortBy(res.locations, o => _.isEmpty(o.province) ? o.country : o.province);
      setCountries(sortedLocations);
    }));
  }, []);

  return (
    <>
      <ThreeFactorChart countries={countries} />
      <Histogram countries={countries} />
    </>
  )
}

export default App;