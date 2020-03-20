import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from 'react';
import useSWR from 'swr';

const API = "https://coronavirus-tracker-api.herokuapp.com/v2/locations/403";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function App() {
  const chartRef = useRef(null);
  const [stats, setStats] = useState(null);

  const { data, error } = useSWR(API, fetcher);

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
    <div ref={chartRef}></div>
  );
}

export default App;