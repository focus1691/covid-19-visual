import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from 'react';
import Countrys from "./components/countries/Countrys";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { mapChartTimeLine } from "./utils/ChartHelper";
import _ from "lodash";
import { LOCATION_API } from "./api/Endpoints";

function App() {
  const [chart, setChart] = useState(null);
  const chartRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [currCountry, setCurrCountry] = useState(403);
  const [countries, setCountries] = useState([]);
  const [lines] = useState({});
  const [mode, setMode] = useState(4);

  useEffect(() => {
    if (chartRef.current) {
      const createdChart = createChart(chartRef.current, {
        width: window.innerWidth / 2,
        height: 500,
        priceScale: {
          mode: mode,
          invertScale: false,
        }
      });
      setChart(createdChart);
    }
    fetch(LOCATION_API).then(res => res.json().then(res => setCountries(res.locations)));
  }, []);

  //* When mode (log / scale) is changed we update the chart scale
  //* 1 = logarithm, 4 = normal
  useEffect(() => {
    if (chart) {
      chart.applyOptions({
        priceScale: {
          mode: mode
        }
      });
    }
  }, [mode]);

  //* Fetch the country timeline for selection and update stats
  useEffect(() => {
    !_.isEmpty(lines["confirmed"]) && chart.removeSeries(lines["confirmed"]);
    !_.isEmpty(lines["deaths"]) && chart.removeSeries(lines["deaths"]);
    !_.isEmpty(lines["recovered"]) && chart.removeSeries(lines["recovered"]);

    fetch(`${LOCATION_API}/${currCountry}`).then(res => res.json()).then(res => setStats(res));
  }, [currCountry]);

  useEffect(() => {
    if (chart && chartRef.current && stats) {
      const { timelines, province } = stats.location;

      lines["confirmed"] = chart.addLineSeries({ color: "orange", title: 'Confirmed' });
      lines["confirmed"].setData(mapChartTimeLine(timelines.confirmed.timeline));

      lines["deaths"] = chart.addLineSeries({ color: "red", title: 'Deaths' });
      lines["deaths"].setData(mapChartTimeLine(timelines.deaths.timeline));

      lines["recovered"] = chart.addLineSeries({ color: "green", title: 'Recovered' });
      lines["recovered"].setData(mapChartTimeLine(timelines.recovered.timeline));

      chart.timeScale().fitContent();
    };
  }, [stats]);

  return (
    <>
      <FormControl>
        <InputLabel id="country-select-label">Country</InputLabel>
        <Select
          native
          value={currCountry}
          onChange={e => setCurrCountry(e.target.value)}
          inputProps={{
            name: 'Country',
            id: 'country-native-simple',
          }}
        >
          {_.isEmpty(countries) ? null : <Countrys countries={countries} />}
        </Select>

        <Select
          native
          value={mode}
          onChange={e => setMode(parseInt(e.target.value))}
          inputProps={{
            name: 'Scale',
            id: 'scale-native-simple',
          }}
        >
          <option value={4} key={"Linear"}>Linear</option>
          <option value={1} key={"Logarithm"}>Logarithm</option>
        </Select>
      </FormControl>
      <h2><u>Daily confirmed cases, deaths, recoveries</u></h2>
      <div ref={chartRef}></div>
    </>
  );
}

export default App;