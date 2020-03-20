import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import Select from '@material-ui/core/Select';

const API = "https://coronavirus-tracker-api.herokuapp.com/v2/locations/403";
const LOCATION_API = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function App() {
  const chartRef = useRef(null);
  const [stats, setStats] = useState(null);
  const [country, setCountry] = useState("gb");

  const { data, error } = useSWR(API, fetcher);
  // const { locations, error2 } = useSWR(LOCATION_API, fetcher);

  fetch(LOCATION_API).then(res => res.json().then(res => console.log(res)));

  // console.log(locations);

  const mapChartTimeLine = data => {
    const timeline = [];
    Object.keys(data).forEach((v, key) => {
      timeline.push({
        time: v,
        value: data[v]
      });
    });
    return timeline
  };

  useEffect(() => {
    setStats(data);
  }, [data]);

  useEffect(() => {
    if (chartRef.current && stats) {
      const { timelines, province } = stats.location;

      const chart = createChart(chartRef.current, { width: 1000, height: 500 });

      const confirmedLine = chart.addLineSeries({ color: "orange", title: 'Confirmed' });
      confirmedLine.setData(mapChartTimeLine(timelines.confirmed.timeline));

      const deathsLine = chart.addLineSeries({ color: "red", title: 'Deaths' });
      deathsLine.setData(mapChartTimeLine(timelines.deaths.timeline));

      const recoveredLine = chart.addLineSeries({ color: "green", title: 'Recovered' });
      recoveredLine.setData(mapChartTimeLine(timelines.recovered.timeline));
    }
  }, [stats]);

  return (
    <>
        <Select
          native
          value={1}
          onChange={null}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
    <div ref={chartRef}></div>
    </>
  );
}

export default App;